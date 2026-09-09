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
  height = 42,
  customUrl,
}) => {
  const { cmsData } = useCms();
  const [imgError, setImgError] = useState(false);

  // Check if custom Google Drive logo or direct logo URL has been configured
  const driveLogoRaw = customUrl || cmsData?.branding?.googleDriveLogoUrl || cmsData?.branding?.customLogoUrl;
  const directLogoUrl = driveLogoRaw ? getGoogleDriveDirectImageUrl(driveLogoRaw) : null;

  // 1. If a custom Google Drive / user-provided logo URL exists and hasn't errored
  if (directLogoUrl && !imgError) {
    const isDark = variant === 'white';
    return (
      <div className={`inline-flex items-center select-none ${className}`}>
        <div className={isDark ? "bg-white/10 p-1.5 rounded-xl border border-white/20 inline-flex items-center" : "inline-flex items-center"}>
          <img
            src={directLogoUrl}
            alt="DentiSure Solutions Logo"
            className="h-auto w-auto object-contain max-h-[46px] sm:max-h-[50px]"
            style={{ height }}
            onError={() => setImgError(true)}
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    );
  }

  // 2. Favicon specific renderings (if requested explicitly for favicon previews)
  if (variant === 'favicon-white' || variant === 'favicon-transparent') {
    const driveFaviconRaw = cmsData?.branding?.googleDriveFaviconUrl || cmsData?.branding?.customFaviconUrl;
    const directFaviconUrl = driveFaviconRaw ? getGoogleDriveDirectImageUrl(driveFaviconRaw) : null;

    if (directFaviconUrl) {
      return (
        <div className={`inline-flex items-center justify-center select-none ${className}`}>
          <img
            src={directFaviconUrl}
            alt="DentiSure Favicon"
            className="h-auto w-auto object-contain rounded-xl shadow-xs border border-slate-200"
            style={{ height, width: height }}
            referrerPolicy="no-referrer"
          />
        </div>
      );
    }
    // Clean lettermark badge fallback
    return (
      <div
        style={{ height, width: height }}
        className="rounded-xl bg-gradient-to-br from-[#12304A] to-[#16A6A3] text-white font-black flex items-center justify-center text-sm shadow-xs border border-white/20 select-none"
      >
        DS
      </div>
    );
  }

  // 3. Original Logo PNG requested by user for Header and Footer:
  if (variant === 'white') {
    // White card background for dark navy footer
    return (
      <div className={`inline-flex items-center select-none ${className}`}>
        <div className="bg-white rounded-xl px-3.5 py-2 shadow-sm border border-white/20 inline-flex items-center hover:opacity-95 transition-opacity">
          <img
            src="/logo-transparent.png"
            alt="DentiSure Solutions — Your Certainty in Dental Revenue"
            className="h-auto w-auto object-contain max-h-[44px] sm:max-h-[48px]"
            style={{ height }}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/logo-transparent.svg';
            }}
          />
        </div>
      </div>
    );
  }

  // Header / light background variant: Full original logo PNG
  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <img
        src="/logo-transparent.png"
        alt="DentiSure Solutions — Your Certainty in Dental Revenue"
        className="h-auto w-auto object-contain max-h-[46px] sm:max-h-[52px]"
        style={{ height }}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = '/logo-transparent.svg';
        }}
      />
    </div>
  );
};
