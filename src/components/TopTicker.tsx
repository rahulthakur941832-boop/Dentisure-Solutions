import React from 'react';
import { useCms } from '../context/CmsContext';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

export const TopTicker: React.FC = () => {
  const { cmsData } = useCms();
  const tickerItems = cmsData.topTickerItems || [];

  if (tickerItems.length === 0) return null;

  return (
    <div className="bg-[#0c1e2e] text-slate-200 border-b border-slate-800 text-[11px] sm:text-xs overflow-hidden select-none py-1.5 relative z-50">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {/* Render twice for continuous loop */}
        {[...tickerItems, ...tickerItems].map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-2 mx-5 text-slate-300 whitespace-nowrap font-medium"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
            <span className="text-white font-semibold">{item.category}:</span>
            <span className="text-slate-200">{item.title}</span>
            <span className="px-1.5 py-0.5 rounded bg-teal-900/80 text-teal-200 text-[10px] font-bold uppercase tracking-wider border border-teal-500/30">
              {item.badge}
            </span>
            <span className="text-slate-600 ml-3">•</span>
          </div>
        ))}
      </div>
    </div>
  );
};
