/**
 * Helper to convert Google Drive sharing links or file IDs into direct image URLs
 * that can be displayed in <img> tags and favicon links.
 */
export function extractGoogleDriveFileId(input: string): string | null {
  if (!input) return null;
  const trimmed = input.trim();

  // Pattern 1: https://drive.google.com/file/d/FILE_ID/view...
  const fileMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch && fileMatch[1]) {
    return fileMatch[1];
  }

  // Pattern 2: id=FILE_ID in query params (e.g. uc?id=..., open?id=...)
  const idMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (idMatch && idMatch[1]) {
    return idMatch[1];
  }

  // Pattern 3: Direct file ID (typically 28 to 44 alphanumeric chars)
  if (/^[a-zA-Z0-9_-]{25,}$/.test(trimmed) && !trimmed.startsWith('http')) {
    return trimmed;
  }

  return null;
}

export function getGoogleDriveDirectImageUrl(urlOrId: string | undefined): string {
  if (!urlOrId || !urlOrId.trim()) return '';

  const trimmed = urlOrId.trim();
  const fileId = extractGoogleDriveFileId(trimmed);

  if (fileId) {
    // lh3.googleusercontent.com is Google's fast, direct public image CDN for Drive files
    return `https://lh3.googleusercontent.com/d/${fileId}`;
  }

  // If it's already a standard direct URL (e.g., https://...), return as-is
  return trimmed;
}

export function updateDocumentFavicon(url: string) {
  if (!url) return;
  const directUrl = getGoogleDriveDirectImageUrl(url);
  if (!directUrl) return;

  const link = (document.querySelector("link[rel*='icon']") as HTMLLinkElement) || document.createElement('link');
  link.type = 'image/x-icon';
  link.rel = 'shortcut icon';
  link.href = directUrl;
  document.getElementsByTagName('head')[0].appendChild(link);
}
