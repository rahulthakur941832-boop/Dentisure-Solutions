import { getCloudStatus } from '../server/cloudCms.ts';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-store, no-cache');
  const status = getCloudStatus();
  return res.status(200).json({
    status: 'ok',
    service: 'DentiSure Cloud CMS & Storage',
    ...status,
    timestamp: new Date().toISOString(),
  });
}
