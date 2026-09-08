import React from 'react';
import { useCms } from '../context/CmsContext';
import {
  TrendingUp,
  ShieldCheck,
  Building,
  CheckCircle,
  Clock,
  DollarSign,
  Activity,
} from 'lucide-react';

export const HeroSecondarySlider: React.FC = () => {
  const { cmsData } = useCms();
  const sliderCards = cmsData.secondarySlider || [];

  const getIcon = (idx: number) => {
    const icons = [
      <TrendingUp key="1" className="w-4 h-4 text-emerald-600" />,
      <Clock key="2" className="w-4 h-4 text-teal-600" />,
      <CheckCircle key="3" className="w-4 h-4 text-blue-600" />,
      <Building key="4" className="w-4 h-4 text-[#12304A]" />,
      <ShieldCheck key="5" className="w-4 h-4 text-teal-700" />,
      <DollarSign key="6" className="w-4 h-4 text-emerald-600" />,
    ];
    return icons[idx % icons.length] || <Activity className="w-4 h-4 text-teal-600" />;
  };

  if (sliderCards.length === 0) return null;

  return (
    <div className="bg-slate-100/90 border-y border-slate-200/90 py-3 overflow-hidden select-none">
      <div className="flex w-max animate-marquee-reverse hover:[animation-play-state:paused]">
        {[...sliderCards, ...sliderCards].map((item, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3.5 mx-3 px-4 py-3 bg-white rounded-xl border border-slate-200 shadow-xs hover:border-[#16A6A3]/60 transition-colors w-[320px] sm:w-[360px] md:w-[390px] flex-shrink-0 overflow-hidden box-border"
          >
            <div className="w-8 h-8 rounded-lg bg-teal-50/80 flex items-center justify-center border border-teal-100 flex-shrink-0 mt-0.5">
              {getIcon(idx)}
            </div>
            <div className="flex flex-col text-left flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#16A6A3] bg-teal-50/90 px-1.5 py-0.5 rounded border border-teal-100/60 whitespace-nowrap">
                  {item.category}
                </span>
              </div>
              <h4 className="text-xs font-bold text-[#12304A] leading-tight mb-1 break-words line-clamp-1">
                {item.title}
              </h4>
              <p className="text-[11px] text-slate-500 leading-snug break-words line-clamp-2">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
