import React from 'react';

export type LogoVariant =
  | 'full'                 // Transparent background, standard navy & teal text
  | 'transparent'          // Transparent background PNG/SVG
  | 'white-bg'              // White card background with subtle ground shadow
  | 'white'                 // Light/white text for dark backgrounds (e.g. navy footer)
  | 'favicon-white'         // Square icon with white background
  | 'favicon-transparent'   // Square icon with transparent background
  | 'symbol-only';          // Just the tooth symbol with growth chart & arrow

interface LogoProps {
  variant?: LogoVariant;
  showTagline?: boolean;
  className?: string;
  height?: number | string;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'full',
  showTagline = true,
  className = '',
  height = 42,
}) => {
  // If variant is white-bg, display the official white-background card logo
  if (variant === 'white-bg') {
    return (
      <div className={`inline-flex items-center select-none ${className}`}>
        <img
          src="/logo-white.png"
          alt="DentiSure Solutions"
          className="h-auto max-h-[52px] w-auto object-contain drop-shadow-xs"
          style={{ height }}
          onError={(e) => {
            // Fallback to SVG
            (e.currentTarget as HTMLImageElement).src = '/logo-white.svg';
          }}
        />
      </div>
    );
  }

  // If variant is favicon-white (the exact client white-background favicon)
  if (variant === 'favicon-white') {
    return (
      <div className={`inline-flex items-center justify-center select-none ${className}`}>
        <img
          src="/DentiSure_Favicon_White_Background.png"
          alt="DentiSure Favicon"
          className="h-auto w-auto object-contain rounded-xl shadow-xs border border-slate-200"
          style={{ height, width: height }}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = '/favicon-white.png';
          }}
        />
      </div>
    );
  }

  // If variant is favicon-transparent
  if (variant === 'favicon-transparent') {
    return (
      <div className={`inline-flex items-center justify-center select-none ${className}`}>
        <img
          src="/favicon-transparent.png"
          alt="DentiSure Symbol"
          className="h-auto w-auto object-contain"
          style={{ height, width: height }}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = '/favicon-transparent.svg';
          }}
        />
      </div>
    );
  }

  // If variant is symbol-only
  if (variant === 'symbol-only') {
    return (
      <div className={`inline-flex items-center justify-center select-none ${className}`}>
        <svg
          viewBox="0 0 140 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ height, width: height }}
          className="w-auto h-auto drop-shadow-xs"
        >
          <defs>
            <linearGradient id="logoToothGradSymbol" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0A2239" />
              <stop offset="50%" stopColor="#0D3B66" />
              <stop offset="80%" stopColor="#00838F" />
              <stop offset="100%" stopColor="#00A8A8" />
            </linearGradient>
            <linearGradient id="logoChartGradSymbol" x1="0%" y1="100%" x2="50%" y2="0%">
              <stop offset="0%" stopColor="#00838F" />
              <stop offset="100%" stopColor="#00B4B6" />
            </linearGradient>
          </defs>

          {/* Tooth outline */}
          <path
            d="M 38 24 C 22 28, 14 44, 15 62 C 16 78, 22 92, 28 108 C 31 116, 36 122, 42 120 C 48 118, 51 106, 53 96 C 54 88, 57 82, 65 82 C 73 82, 76 88, 77 96 C 79 106, 82 118, 88 120 C 94 122, 99 116, 102 108 C 108 92, 114 78, 115 62 C 116 44, 108 28, 92 24 C 82 21, 74 25, 65 25 C 56 25, 48 21, 38 24 Z"
            fill="none"
            stroke="url(#logoToothGradSymbol)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Swoop Arc */}
          <path
            d="M 28 88 C 36 94, 46 95, 56 86 C 68 75, 78 58, 88 42"
            fill="none"
            stroke="url(#logoChartGradSymbol)"
            strokeWidth="4.5"
            strokeLinecap="round"
          />

          {/* Bars */}
          <rect x="42" y="74" width="6.5" height="15" rx="1" fill="url(#logoChartGradSymbol)" />
          <rect x="52" y="63" width="6.5" height="23" rx="1" fill="url(#logoChartGradSymbol)" />
          <rect x="62" y="52" width="6.5" height="28" rx="1" fill="url(#logoChartGradSymbol)" />
          <rect x="72" y="39" width="6.5" height="34" rx="1" fill="url(#logoChartGradSymbol)" />

          {/* Arrow */}
          <path
            d="M 86 44 C 90 38, 93 33, 96 27"
            fill="none"
            stroke="url(#logoChartGradSymbol)"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <polygon points="96,22 86,29 93,34" fill="#00A8A8" />
        </svg>
      </div>
    );
  }

  // If variant is white (for dark backgrounds like navy footer or dark banners)
  if (variant === 'white') {
    return (
      <div className={`inline-flex items-center select-none ${className}`}>
        <div className="bg-white rounded-xl px-3.5 py-2 shadow-sm border border-white/20 inline-flex items-center hover:opacity-95 transition-opacity">
          <img
            src="/logo-transparent.png"
            alt="DentiSure Solutions — Your Certainty in Dental Revenue"
            className="h-auto w-auto object-contain max-h-[44px] sm:max-h-[48px]"
            style={{ height }}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/logo-white.png';
            }}
          />
        </div>
      </div>
    );
  }

  // Default: 'full' or 'transparent' -> The official client transparent PNG logo
  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <img
        src="/logo-transparent.png"
        alt="DentiSure Solutions — Your Certainty in Dental Revenue"
        className="h-auto w-auto object-contain max-h-[46px] sm:max-h-[50px]"
        style={{ height }}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = '/logo-transparent.svg';
        }}
      />
    </div>
  );
};
