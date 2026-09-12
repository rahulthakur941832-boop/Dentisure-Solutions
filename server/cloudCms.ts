import { createClient, SupabaseClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

/**
 * Universal Supabase Cloud Database & Storage Manager for DentiSure CMS
 * Single Source of Truth:
 * - PostgreSQL table: 'cms_content' (id: 'default', data: JSONB)
 * - Storage Bucket: 'cms_assets' (Public CDN for logos and images)
 */

function getBestSupabaseKey(): string {
  const candidates = [
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    process.env.SUPABASE_ANON_KEY,
    process.env.SUPABASE_KEY,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    process.env.VITE_SUPABASE_ANON_KEY,
  ].filter(Boolean) as string[];

  // Priority 1: Check JWT token payload for role: "service_role"
  for (const k of candidates) {
    try {
      const parts = k.split('.');
      if (parts.length === 3) {
        const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString());
        if (payload && payload.role === 'service_role') {
          return k;
        }
      }
    } catch (_) {}
  }

  // Priority 2: Fallback to first available key
  return candidates[0] || '';
}

const supabaseUrl =
  process.env.SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.VITE_SUPABASE_URL ||
  '';

let supabaseClient: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  if (supabaseClient) return supabaseClient;
  const key = getBestSupabaseKey();
  if (supabaseUrl && key) {
    try {
      supabaseClient = createClient(supabaseUrl, key, {
        auth: { persistSession: false },
      });
      console.log('[Cloud CMS] Supabase client initialized for:', supabaseUrl);
      return supabaseClient;
    } catch (err) {
      console.error('[Cloud CMS] Failed to initialize Supabase client:', err);
      return null;
    }
  }
  return null;
}

// Local fallback path for initial seeding
const dataDir = path.join(process.cwd(), 'data');
const defaultCmsPath = path.join(dataDir, 'defaultCms.json');
const localCmsPath = path.join(dataDir, 'cms-content.json');

function getDefaultFallbackData(): any {
  if (fs.existsSync(defaultCmsPath)) {
    try {
      return JSON.parse(fs.readFileSync(defaultCmsPath, 'utf8'));
    } catch (_) {}
  }
  if (fs.existsSync(localCmsPath)) {
    try {
      return JSON.parse(fs.readFileSync(localCmsPath, 'utf8'));
    } catch (_) {}
  }
  return null;
}

/**
 * Report current Cloud Database & Storage status
 */
export function getCloudStatus() {
  const client = getSupabaseClient();
  const isConfigured = Boolean(client);
  return {
    databaseProvider: isConfigured ? 'Supabase (PostgreSQL - cms_content)' : 'None (SUPABASE_URL / key missing)',
    storageProvider: isConfigured ? 'Supabase Storage Bucket (cms_assets)' : 'None',
    isConfigured,
    supabaseConfigured: isConfigured,
    cloudinaryConfigured: false,
  };
}

/**
 * Fetch authoritative CMS data directly from Supabase Cloud Database.
 * No stale in-memory caching: queries table 'cms_content' on every request.
 */
export async function getCloudCms(): Promise<{
  success: boolean;
  data: any;
  provider: string;
  isFallback?: boolean;
  instructions?: string;
  error?: string;
}> {
  const client = getSupabaseClient();
  if (!client) {
    console.warn('[Cloud CMS] Supabase client not configured.');
    const fallback = getDefaultFallbackData();
    return {
      success: true,
      data: fallback,
      provider: 'local-fallback',
      isFallback: true,
      instructions: 'SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variable is missing.',
    };
  }

  try {
    const { data, error } = await client
      .from('cms_content')
      .select('data, updated_at')
      .eq('id', 'default')
      .maybeSingle();

    if (error) {
      console.error('[Cloud CMS] Supabase query error:', error.message);
      return {
        success: false,
        data: null,
        provider: 'supabase',
        error: error.message,
        instructions:
          'Run in Supabase SQL Editor: CREATE TABLE IF NOT EXISTS cms_content (id TEXT PRIMARY KEY, data JSONB NOT NULL, updated_at TIMESTAMPTZ DEFAULT NOW());',
      };
    }

    if (data && data.data && typeof data.data === 'object' && data.data.brand) {
      return {
        success: true,
        data: data.data,
        provider: 'supabase',
      };
    }

    // Record is missing or incomplete; seed database with default content
    const fallback = getDefaultFallbackData();
    if (fallback) {
      console.log('[Cloud CMS] Seeding empty Supabase cms_content with default content...');
      await client.from('cms_content').upsert(
        {
          id: 'default',
          data: fallback,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'id' }
      );
      return {
        success: true,
        data: fallback,
        provider: 'supabase-seeded',
      };
    }

    return {
      success: true,
      data: data?.data || null,
      provider: 'supabase-empty',
    };
  } catch (err: any) {
    console.error('[Cloud CMS] Unexpected error querying Supabase:', err);
    return {
      success: false,
      data: null,
      provider: 'supabase',
      error: err.message || 'Unknown Supabase connection error',
    };
  }
}

/**
 * Save authoritative CMS data directly to Supabase Cloud Database.
 */
export async function saveCloudCms(incomingData: any): Promise<{
  success: boolean;
  provider: string;
  data?: any;
  message: string;
  error?: string;
}> {
  if (!incomingData || typeof incomingData !== 'object') {
    return {
      success: false,
      provider: 'none',
      message: 'Invalid payload: data object is required',
      error: 'Invalid payload',
    };
  }

  const client = getSupabaseClient();
  if (!client) {
    return {
      success: false,
      provider: 'none',
      message: 'Supabase credentials missing. Please configure SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.',
      error: 'Supabase not configured',
    };
  }

  try {
    const now = new Date().toISOString();
    const { data: upsertData, error } = await client
      .from('cms_content')
      .upsert(
        {
          id: 'default',
          data: incomingData,
          updated_at: now,
        },
        { onConflict: 'id' }
      )
      .select('data, updated_at')
      .maybeSingle();

    if (error) {
      console.error('[Cloud CMS] Supabase save error:', error.message);
      return {
        success: false,
        provider: 'supabase',
        message: 'Failed to write to Supabase table cms_content: ' + error.message,
        error: error.message,
      };
    }

    // Also mirror to local disk if running in persistent container (best-effort)
    try {
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      fs.writeFileSync(localCmsPath, JSON.stringify(incomingData, null, 2), 'utf8');
    } catch (_) {}

    console.log('[Cloud CMS] Successfully persisted CMS data to Supabase table cms_content');
    return {
      success: true,
      provider: 'supabase',
      data: upsertData?.data || incomingData,
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

/**
 * Reset CMS data in Supabase
 */
export async function resetCloudCms(): Promise<{ success: boolean; provider: string; data?: any; error?: string }> {
  const fallback = getDefaultFallbackData();
  const client = getSupabaseClient();

  if (client && fallback) {
    try {
      await client.from('cms_content').upsert(
        {
          id: 'default',
          data: fallback,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'id' }
      );
      return { success: true, provider: 'supabase', data: fallback };
    } catch (err: any) {
      console.error('[Cloud CMS] Error resetting Supabase CMS:', err);
      return { success: false, provider: 'supabase', error: err.message };
    }
  }

  return { success: true, provider: 'local', data: fallback };
}

/**
 * Upload Image/Logo directly to Supabase Storage Bucket ('cms_assets')
 * Returns full public CDN URL:
 * https://<project-ref>.supabase.co/storage/v1/object/public/cms_assets/<filename>
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
  const client = getSupabaseClient();
  if (!client) {
    return {
      success: false,
      url: '',
      provider: 'none',
      filename,
      size: buffer.length,
      error: 'Supabase storage is not configured. Missing SUPABASE_URL or keys.',
    };
  }

  const sanitizedTag = tag ? tag.replace(/[^a-zA-Z0-9_-]/g, '') : 'logo';
  const ext = path.extname(filename).toLowerCase() || '.png';
  const uniqueKey = `${sanitizedTag}-${Date.now()}-${Math.random().toString(36).substring(2, 8)}${ext}`;
  const bucketName = 'cms_assets';

  try {
    // 1. Ensure bucket exists and is public
    try {
      const { data: buckets } = await client.storage.listBuckets();
      const hasBucket = buckets?.some((b) => b.name === bucketName || b.id === bucketName);
      if (!hasBucket) {
        await client.storage.createBucket(bucketName, { public: true });
        console.log('[Cloud CMS] Created public bucket:', bucketName);
      }
    } catch (bErr: any) {
      console.warn('[Cloud CMS] Bucket list/create check warning (continuing upload):', bErr?.message);
    }

    // 2. Upload to Supabase Storage
    const { error: uploadError } = await client.storage
      .from(bucketName)
      .upload(uniqueKey, buffer, {
        contentType: mimeType,
        upsert: true,
        cacheControl: '31536000', // 1 year CDN cache
      });

    if (uploadError) {
      console.error('[Cloud CMS] Supabase upload failed:', uploadError.message);
      return {
        success: false,
        url: '',
        provider: 'supabase-storage',
        filename: uniqueKey,
        size: buffer.length,
        error: uploadError.message,
      };
    }

    // 3. Obtain the public CDN URL
    const { data: publicUrlData } = client.storage
      .from(bucketName)
      .getPublicUrl(uniqueKey);

    const publicUrl = publicUrlData?.publicUrl || '';
    if (!publicUrl) {
      return {
        success: false,
        url: '',
        provider: 'supabase-storage',
        filename: uniqueKey,
        size: buffer.length,
        error: 'Failed to retrieve public URL from Supabase Storage',
      };
    }

    console.log('[Cloud CMS] Asset uploaded to Supabase Storage CDN:', publicUrl);
    return {
      success: true,
      url: publicUrl,
      provider: 'supabase-storage',
      filename: uniqueKey,
      size: buffer.length,
    };
  } catch (err: any) {
    console.error('[Cloud CMS] Supabase Storage exception:', err);
    return {
      success: false,
      url: '',
      provider: 'supabase-storage',
      filename: uniqueKey,
      size: buffer.length,
      error: err.message || 'Unknown storage upload error',
    };
  }
}
