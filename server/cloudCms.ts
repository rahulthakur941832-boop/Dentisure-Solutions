import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';

/**
 * Universal Cloud Storage & Database Manager for DentiSure CMS
 * Supports:
 * 1. Supabase (PostgreSQL Database + Storage Bucket) - Primary for Vercel
 * 2. Cloudinary (Cloud Image & Asset CDN) - Optional image provider
 * 3. Local Ephemeral/Disk Fallback (For local dev and safety when env vars aren't provided)
 */

// 1. Supabase Client Setup (Database + Storage)
const supabaseUrl =
  process.env.SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.VITE_SUPABASE_URL ||
  '';

const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY ||
  '';

let supabaseClient: SupabaseClient | null = null;
if (supabaseUrl && supabaseKey) {
  try {
    supabaseClient = createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false },
    });
    console.log('[Cloud CMS] Supabase client initialized for project:', supabaseUrl);
  } catch (err) {
    console.error('[Cloud CMS] Failed to initialize Supabase client:', err);
  }
}

// 2. Cloudinary Setup (Alternative Image CDN)
const cloudinaryCloudName = process.env.CLOUDINARY_CLOUD_NAME || '';
const cloudinaryApiKey = process.env.CLOUDINARY_API_KEY || '';
const cloudinaryApiSecret = process.env.CLOUDINARY_API_SECRET || '';

let isCloudinaryConfigured = false;
if (cloudinaryCloudName && cloudinaryApiKey && cloudinaryApiSecret) {
  try {
    cloudinary.config({
      cloud_name: cloudinaryCloudName,
      api_key: cloudinaryApiKey,
      api_secret: cloudinaryApiSecret,
      secure: true,
    });
    isCloudinaryConfigured = true;
    console.log('[Cloud CMS] Cloudinary image storage initialized for cloud:', cloudinaryCloudName);
  } catch (err) {
    console.error('[Cloud CMS] Failed to configure Cloudinary:', err);
  }
}

// 3. Local fallback directory
const dataDir = path.join(process.cwd(), 'data');
const localCmsPath = path.join(dataDir, 'cms-content.json');

// In-memory cache for fast response and fallback
let inMemoryCmsData: any = null;

// Ensure local file can be loaded if exists
if (fs.existsSync(localCmsPath)) {
  try {
    inMemoryCmsData = JSON.parse(fs.readFileSync(localCmsPath, 'utf8'));
  } catch (_) {}
}

/**
 * Report current Cloud Database & Storage status
 */
export function getCloudStatus() {
  const hasSupabase = Boolean(supabaseClient);
  const hasCloudinary = isCloudinaryConfigured;
  return {
    databaseProvider: hasSupabase ? 'Supabase (PostgreSQL)' : 'Local File / Memory (Vercel requires Supabase env vars)',
    storageProvider: hasSupabase ? 'Supabase Storage Bucket (cms_assets)' : hasCloudinary ? 'Cloudinary CDN' : 'Local /uploads (Ephemeral on Vercel)',
    isConfigured: hasSupabase || hasCloudinary,
    supabaseConfigured: hasSupabase,
    cloudinaryConfigured: hasCloudinary,
  };
}

/**
 * Fetch authoritative CMS data from Cloud Database
 */
export async function getCloudCms(): Promise<{
  success: boolean;
  data: any;
  provider: string;
  isFallback?: boolean;
  instructions?: string;
}> {
  // Option A: Supabase PostgreSQL table 'cms_content'
  if (supabaseClient) {
    try {
      const { data, error } = await supabaseClient
        .from('cms_content')
        .select('data')
        .eq('id', 'default')
        .maybeSingle();

      if (error) {
        console.warn('[Cloud CMS] Supabase query error (table might not exist yet):', error.message);
        return {
          success: true,
          data: inMemoryCmsData,
          provider: 'supabase-table-missing',
          isFallback: true,
          instructions:
            'Table cms_content not found in Supabase. Run: CREATE TABLE cms_content (id TEXT PRIMARY KEY, data JSONB NOT NULL, updated_at TIMESTAMPTZ DEFAULT NOW());',
        };
      }

      if (data && data.data) {
        inMemoryCmsData = data.data;
        return {
          success: true,
          data: data.data,
          provider: 'supabase',
        };
      } else {
        // No record yet; return in-memory or null
        return {
          success: true,
          data: inMemoryCmsData,
          provider: 'supabase-empty',
        };
      }
    } catch (err: any) {
      console.error('[Cloud CMS] Unexpected error querying Supabase:', err);
    }
  }

  // Option B: Local fallback
  return {
    success: true,
    data: inMemoryCmsData,
    provider: 'local-fallback',
    isFallback: true,
  };
}

/**
 * Save authoritative CMS data to Cloud Database
 */
export async function saveCloudCms(incomingData: any): Promise<{
  success: boolean;
  provider: string;
  message: string;
  error?: string;
}> {
  inMemoryCmsData = incomingData;

  // Always attempt to mirror locally if filesystem permits
  try {
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(localCmsPath, JSON.stringify(incomingData, null, 2), 'utf8');
  } catch (localErr) {
    // Expected on read-only environments like Vercel Lambda
    console.log('[Cloud CMS] Note: Local filesystem write skipped (normal on Vercel):', (localErr as any)?.message);
  }

  // Option A: Save to Supabase
  if (supabaseClient) {
    try {
      const { error } = await supabaseClient.from('cms_content').upsert(
        {
          id: 'default',
          data: incomingData,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'id' }
      );

      if (error) {
        console.error('[Cloud CMS] Supabase save error:', error.message);
        return {
          success: false,
          provider: 'supabase',
          message: 'Failed to write to Supabase table cms_content',
          error: error.message,
        };
      }

      console.log('[Cloud CMS] Successfully persisted CMS data to Supabase table cms_content');
      return {
        success: true,
        provider: 'supabase',
        message: 'Successfully saved to Supabase Cloud Database (Live across all browsers & Vercel)',
      };
    } catch (err: any) {
      console.error('[Cloud CMS] Exception saving to Supabase:', err);
      return {
        success: false,
        provider: 'supabase',
        message: 'Exception saving to Supabase: ' + err.message,
        error: err.message,
      };
    }
  }

  return {
    success: true,
    provider: 'local-fallback',
    message: 'Saved to local memory/disk (Warning: For permanent Vercel persistence, set SUPABASE_URL & SUPABASE_SERVICE_ROLE_KEY)',
  };
}

/**
 * Reset CMS data
 */
export async function resetCloudCms(): Promise<{ success: boolean; provider: string }> {
  inMemoryCmsData = null;

  if (fs.existsSync(localCmsPath)) {
    try {
      fs.unlinkSync(localCmsPath);
    } catch (_) {}
  }

  if (supabaseClient) {
    try {
      await supabaseClient.from('cms_content').delete().eq('id', 'default');
      return { success: true, provider: 'supabase' };
    } catch (err) {
      console.error('[Cloud CMS] Error resetting Supabase CMS:', err);
    }
  }

  return { success: true, provider: 'local' };
}

/**
 * Upload Image/Asset to Cloud CDN Bucket
 * Order of priority:
 * 1. Supabase Storage (Bucket 'cms_assets')
 * 2. Cloudinary CDN
 * 3. Local disk fallback
 */
export async function uploadCloudAsset(
  buffer: Buffer,
  filename: string,
  mimeType: string,
  tag: string
): Promise<{
  success: boolean;
  url: string;
  provider: string;
  filename: string;
  size: number;
  error?: string;
}> {
  const sanitizedTag = tag ? tag.replace(/[^a-zA-Z0-9_-]/g, '') : 'logo';
  const ext = path.extname(filename).toLowerCase() || '.png';
  const uniqueKey = `${sanitizedTag}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}${ext}`;

  // 1. Try Supabase Storage (bucket: 'cms_assets')
  if (supabaseClient) {
    try {
      const bucketName = 'cms_assets';

      // Upload buffer to Supabase Storage
      const { error: uploadError } = await supabaseClient.storage
        .from(bucketName)
        .upload(uniqueKey, buffer, {
          contentType: mimeType,
          upsert: true,
          cacheControl: '31536000', // 1 year cache for CDN
        });

      if (uploadError) {
        console.warn('[Cloud CMS] Supabase upload failed, bucket might need creation:', uploadError.message);
      } else {
        // Get public CDN URL
        const { data: publicUrlData } = supabaseClient.storage
          .from(bucketName)
          .getPublicUrl(uniqueKey);

        if (publicUrlData && publicUrlData.publicUrl) {
          console.log('[Cloud CMS] Image uploaded to Supabase Storage:', publicUrlData.publicUrl);
          return {
            success: true,
            url: publicUrlData.publicUrl,
            provider: 'supabase-storage',
            filename: uniqueKey,
            size: buffer.length,
          };
        }
      }
    } catch (err: any) {
      console.warn('[Cloud CMS] Supabase storage exception:', err.message);
    }
  }

  // 2. Try Cloudinary
  if (isCloudinaryConfigured) {
    try {
      const base64DataUri = `data:${mimeType};base64,${buffer.toString('base64')}`;
      const uploadResult = await cloudinary.uploader.upload(base64DataUri, {
        folder: 'dentisure_cms',
        public_id: `${sanitizedTag}_${Date.now()}`,
        resource_type: 'auto',
      });

      if (uploadResult && uploadResult.secure_url) {
        console.log('[Cloud CMS] Image uploaded to Cloudinary CDN:', uploadResult.secure_url);
        return {
          success: true,
          url: uploadResult.secure_url,
          provider: 'cloudinary',
          filename: uniqueKey,
          size: uploadResult.bytes || buffer.length,
        };
      }
    } catch (err: any) {
      console.warn('[Cloud CMS] Cloudinary upload exception:', err.message);
    }
  }

  // 3. Fallback to local /public/uploads (for local dev / containers with persistent disk)
  try {
    const publicUploadDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(publicUploadDir)) {
      fs.mkdirSync(publicUploadDir, { recursive: true });
    }
    const localFilePath = path.join(publicUploadDir, uniqueKey);
    fs.writeFileSync(localFilePath, buffer);

    const distUploadDir = path.join(process.cwd(), 'dist', 'uploads');
    if (fs.existsSync(path.join(process.cwd(), 'dist'))) {
      if (!fs.existsSync(distUploadDir)) {
        fs.mkdirSync(distUploadDir, { recursive: true });
      }
      fs.writeFileSync(path.join(distUploadDir, uniqueKey), buffer);
    }

    const localUrl = `/uploads/${uniqueKey}`;
    console.log('[Cloud CMS] Image saved to local fallback disk:', localUrl);
    return {
      success: true,
      url: localUrl,
      provider: 'local-fallback',
      filename: uniqueKey,
      size: buffer.length,
    };
  } catch (err: any) {
    console.error('[Cloud CMS] Local upload fallback failed:', err);
    // As an absolute last resort, return data URI so image is NEVER lost
    const dataUri = `data:${mimeType};base64,${buffer.toString('base64')}`;
    return {
      success: true,
      url: dataUri,
      provider: 'data-uri-fallback',
      filename: uniqueKey,
      size: buffer.length,
    };
  }
}
