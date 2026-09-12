import React, { useState } from 'react';
import { useCms } from '../context/CmsContext';
import { getGoogleDriveDirectImageUrl } from '../utils/googleDrive';

export type LogoVariant =
  | 'full'                 // Header variant
  | 'transparent'          // Transparent background
  | 'white-bg'             // White card background
  | 'white'                // Dark backgrounds (e.g. navy footer)
  | 'favicon-white'        // Square favicon
  | 'favicon-transparent'  // Square transparent favicon
  | 'symbol-only';         // Symbol only

interface LogoProps {
  variant?: LogoVariant;
  showTagline?: boolean;
  className?: string;
  height?: number | string;
  customUrl?: string;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'full',
  showTagline = true,
  className = '',
  height,
  customUrl,
}) => {
  const { cmsData } = useCms();
  const [imgError, setImgError] = useState(false);

  // Favicon specific renderings (if requested explicitly for favicon previews)
  if (variant === 'favicon-white' || variant === 'favicon-transparent') {
    const driveFaviconRaw = cmsData?.branding?.googleDriveFaviconUrl || cmsData?.branding?.customFaviconUrl;
    const directFaviconUrl = driveFaviconRaw ? getGoogleDriveDirectImageUrl(driveFaviconRaw) : null;
    const favHeight = height || 40;

    if (directFaviconUrl) {
      return (
        <div className={`inline-flex items-center justify-center select-none ${className}`}>
          <img
            src={directFaviconUrl}
            alt="DentiSure Favicon"
            className="h-auto w-auto object-contain rounded-xl shadow-xs border border-slate-200"
            style={{ height: favHeight, width: favHeight }}
            referrerPolicy="no-referrer"
          />
        </div>
      );
    }
    // Clean lettermark badge fallback
    return (
      <div
        style={{ height: favHeight, width: favHeight }}
        className="rounded-xl bg-gradient-to-br from-[#12304A] to-[#16A6A3] text-white font-black flex items-center justify-center text-sm shadow-xs border border-white/20 select-none"
      >
        DS
      </div>
    );
  }

  const isDark = variant === 'white';

  // Determine logo URL and height based on variant (Footer vs Header)
  const configuredLogo = isDark
    ? (customUrl || cmsData?.footer?.logoUrl || cmsData?.branding?.footerLogoUrl || cmsData?.branding?.googleDriveLogoUrl || cmsData?.branding?.customLogoUrl)
    : (customUrl || cmsData?.header?.logoUrl || cmsData?.branding?.headerLogoUrl || cmsData?.branding?.googleDriveLogoUrl || cmsData?.branding?.customLogoUrl);

  const configuredHeight = height !== undefined
    ? height
    : isDark
      ? (cmsData?.footer?.logoHeight || 40)
      : (cmsData?.header?.logoHeight || 44);

  const directLogoUrl = configuredLogo ? getGoogleDriveDirectImageUrl(configuredLogo) : null;

  // Reset image error state whenever logo URL changes
  React.useEffect(() => {
    setImgError(false);
  }, [directLogoUrl]);

  // 1. If a custom uploaded / URL / Google Drive logo exists and hasn't errored
  if (directLogoUrl && !imgError) {
    return (
      <div className={`inline-flex items-center select-none ${className}`}>
        <img
          src={directLogoUrl}
          alt="DentiSure Solutions Logo"
          className="h-auto w-auto object-contain transition-all"
          style={{ height: configuredHeight, maxHeight: typeof configuredHeight === 'number' ? configuredHeight * 1.25 : undefined }}
          onError={() => setImgError(true)}
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  // 2. Default Official White Logo for Dark Backgrounds (Footer)
  if (isDark) {
    return (
      <div className={`inline-flex items-center select-none ${className}`}>
        <img
          src="/logo-dentisure-white.svg"
          alt="DentiSure Solutions — Your Certainty in Dental Revenue"
          className="h-auto w-auto object-contain"
          style={{ height: configuredHeight }}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = '/logo-transparent.png';
          }}
        />
      </div>
    );
  }

  // 3. Default Official Color Logo for Light Backgrounds (Header)
  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <img
        src="/logo-dentisure.svg"
        alt="DentiSure Solutions — Your Certainty in Dental Revenue"
        className="h-auto w-auto object-contain"
        style={{ height: configuredHeight }}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = '/logo-transparent.png';
        }}
      />
    </div>
  );
};
