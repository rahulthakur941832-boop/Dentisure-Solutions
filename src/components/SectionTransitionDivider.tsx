import React from 'react';

export type TransitionVariant =
  | 'wave-dark-to-light'
  | 'wave-light-to-dark'
  | 'stream-ribbon'
  | 'slant-accent';

interface SectionTransitionDividerProps {
  variant: TransitionVariant;
  className?: string;
  badgeText?: string;
}

export const SectionTransitionDivider: React.FC<SectionTransitionDividerProps> = ({
  variant,
  className = '',
  badgeText,
}) => {
  // Wave transition from Deep Navy (#001B31) to Light Canvas (#F8FAFB)
  if (variant === 'wave-dark-to-light') {
    return (
      <div className={`relative w-full overflow-hidden leading-none z-10 ${className}`}>
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-8 sm:h-12 md:h-16 text-[#F8FAFB] preserve-3d"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0,0 C320,60 720,10 1140,50 L1440,20 L1440,80 L0,80 Z"
            fill="currentColor"
          />
        </svg>
        {badgeText && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200/80 text-[#006A68] text-[10px] sm:text-xs font-mono font-bold shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#16A6A3] animate-pulse" />
              <span>{badgeText}</span>
            </span>
          </div>
        )}
      </div>
    );
  }

  // Wave transition from Light Canvas (#F8FAFB / White) to Deep Command Dark (#0B1B2B)
  if (variant === 'wave-light-to-dark') {
    return (
      <div className={`relative w-full overflow-hidden leading-none z-10 ${className}`}>
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-8 sm:h-12 md:h-16 text-[#0B1B2B] preserve-3d"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0,40 C360,10 780,70 1200,30 L1440,50 L1440,80 L0,80 Z"
            fill="currentColor"
          />
        </svg>
      </div>
    );
  }

  // Continuous subtle looping horizontal visual element connecting sections
  if (variant === 'stream-ribbon') {
    const pulseItems = [
      'Encrypted Remote PMS Sync',
      '23-Point Insurance Verification',
      'CDT Claim Scrubbing & X-Ray Review',
      'Zero Timely Filing Denials',
      'Daily ERA/EFT Payment Reconciliation',
      '88% Overturned Carrier Appeals',
    ];

    return (
      <div className={`relative w-full overflow-hidden bg-gradient-to-r from-[#00101E] via-[#001B31] to-[#042B46] border-y border-slate-800/80 py-2.5 z-10 ${className}`}>
        <div className="flex items-center gap-6 whitespace-nowrap animate-marquee select-none motion-reduce:animate-none">
          {[...pulseItems, ...pulseItems].map((item, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-2 text-[11px] font-mono font-medium text-slate-300"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#7EF5F1] shadow-[0_0_6px_#7EF5F1]" />
              <span>{item}</span>
              <span className="text-slate-600 ml-4 font-normal">/</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Slanted clean architectural divider
  return (
    <div className={`relative w-full h-6 sm:h-10 overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5 pointer-events-none" />
    </div>
  );
};
