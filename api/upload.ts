import { uploadCloudAsset } from '../server/cloudCms';
import path from 'path';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Cache-Control, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (_) {}
    }

    const rawData = body?.image || body?.data;
    if (!rawData || typeof rawData !== 'string') {
      return res.status(400).json({ success: false, error: 'No image data provided in request body' });
    }

    let base64Data = rawData;
    let detectedExt = 'png';
    let detectedMime = 'image/png';

    // Parse Data URL format (data:image/png;base64,...)
    const matches = rawData.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (matches && matches.length === 3) {
      detectedMime = matches[1];
      base64Data = matches[2];
      if (detectedMime === 'image/svg+xml') detectedExt = 'svg';
      else if (detectedMime === 'image/jpeg' || detectedMime === 'image/jpg') detectedExt = 'jpg';
      else if (detectedMime === 'image/webp') detectedExt = 'webp';
      else if (detectedMime === 'image/gif') detectedExt = 'gif';
      else if (detectedMime === 'image/x-icon' || detectedMime === 'image/vnd.microsoft.icon') detectedExt = 'ico';
    } else if (body?.filename) {
      const ext = path.extname(body.filename).toLowerCase().replace('.', '');
      if (['png', 'jpg', 'jpeg', 'svg', 'webp', 'gif', 'ico'].includes(ext)) {
        detectedExt = ext === 'jpeg' ? 'jpg' : ext;
      }
    }

    const buffer = Buffer.from(base64Data, 'base64');
    if (buffer.length === 0) {
      return res.status(400).json({ success: false, error: 'Invalid or empty image buffer' });
    }

    const tag = body?.tag || 'logo';
    const filename = body?.filename || `upload.${detectedExt}`;

    const uploadResult = await uploadCloudAsset(buffer, filename, detectedMime, tag);

    return res.status(uploadResult.success ? 200 : 500).json(uploadResult);
  } catch (err: any) {
    console.error('[API /api/upload Error]:', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to upload image to Supabase Storage: ' + (err.message || 'Unknown error'),
    });
  }
}
