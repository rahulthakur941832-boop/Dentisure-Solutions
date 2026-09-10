import type { IncomingMessage, ServerResponse } from 'http';
import { getCloudCms, saveCloudCms, resetCloudCms } from '../server/cloudCms.ts';

export default async function handler(req: any, res: any) {
  // CORS & Cache Invalidation Headers (Crucial for Vercel & Incognito browsers)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Cache-Control, Authorization');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      const result = await getCloudCms();
      return res.status(200).json({
        success: true,
        data: result.data,
        provider: result.provider,
        instructions: result.instructions,
        timestamp: Date.now(),
      });
    }

    if (req.method === 'POST') {
      const isReset = req.query?.reset === 'true' || req.body?.reset === true;
      if (isReset) {
        const resetResult = await resetCloudCms();
        return res.status(200).json(resetResult);
      }

      const incoming = req.body?.data || req.body;
      if (!incoming || typeof incoming !== 'object') {
        return res.status(400).json({ error: 'Invalid CMS payload provided' });
      }

      const saveResult = await saveCloudCms(incoming);
      return res.status(saveResult.success ? 200 : 500).json(saveResult);
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (err: any) {
    console.error('[API /api/cms Handler Error]:', err);
    return res.status(500).json({
      error: 'Internal server error in /api/cms: ' + (err.message || 'Unknown error'),
    });
  }
}
