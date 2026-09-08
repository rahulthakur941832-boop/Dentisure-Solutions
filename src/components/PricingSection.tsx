import React, { useState } from 'react';
import { useCms } from '../context/CmsContext';
import { Check, DollarSign, ArrowRight, ShieldCheck } from 'lucide-react';

interface PricingSectionProps {
  onOpenAuditModal: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenAuditModal }) => {
  const { cmsData } = useCms();
  const pricingConfig = cmsData.pricing;
  const tiers = pricingConfig.tiers && pricingConfig.tiers.length > 0 ? pricingConfig.tiers : [];

  const [sliderVal, setSliderVal] = useState<number>(60000);

  // Contingency calculation: 3.2% of insurance collections
  const estimatedBillingFee = Math.round(sliderVal * 0.032);
  const estimatedExtraCollected = Math.round(sliderVal * 0.09); // +9% collected from fewer denials
  const netPracticeGain = estimatedExtraCollected - estimatedBillingFee;

  const formatUsd = (num: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(num);

  return (
    <section id="pricing" className="py-16 sm:py-24 bg-[#F8FAFB] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F7F6] text-[#12304A] text-xs font-bold uppercase tracking-wider mb-3">
            <DollarSign className="w-3.5 h-3.5 text-[#16A6A3]" />
            <span>Radical Transparency</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#12304A] tracking-tight mb-4">
            {pricingConfig.title || 'Transparent Pricing. Aligned With Your Cash Flow.'}
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            {pricingConfig.subtitle || 'No hidden setup surcharges. No multi-year lock-in traps. We earn our fee when your dental practice collects its money.'}
          </p>
          {pricingConfig.guaranteeText && (
            <div className="inline-block mt-3 px-3 py-1 bg-teal-50 border border-teal-200 rounded-lg text-xs font-bold text-[#16A6A3]">
              {pricingConfig.guaranteeText}
            </div>
          )}
        </div>

        {/* 3 Pricing Tier Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 items-stretch">
          {tiers.map((tier, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all relative ${
                tier.highlight
                  ? 'bg-white border-2 border-[#16A6A3] shadow-xl ring-4 ring-[#16A6A3]/10'
                  : 'bg-white border border-slate-200/90 shadow-sm hover:shadow-md'
              }`}
            >
              {tier.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#12304A] to-[#16A6A3] text-white text-[11px] font-extrabold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-sm">
                  Recommended for Most Practices
                </div>
              )}

              <div>
                <div className="mb-4">
                  <span className="text-xs font-bold text-[#16A6A3] block uppercase tracking-wider mb-1">
                    {tier.tag}
                  </span>
                  <h3 className="text-xl font-extrabold text-[#12304A]">
                    {tier.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 min-h-[32px]">
                    {tier.idealFor}
                  </p>
                </div>

                {/* Price Display */}
                <div className="py-4 my-2 border-y border-slate-100">
                  <div className="text-3xl sm:text-4xl font-black text-[#12304A]">
                    {tier.price}
                  </div>
                  <span className="text-xs font-semibold text-slate-500 block mt-1">
                    {tier.unit}
                  </span>
                </div>

                {/* Feature Bullets */}
                <div className="space-y-3 my-6">
                  {tier.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <Check className="w-4 h-4 text-[#16A6A3] flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={onOpenAuditModal}
                className={`w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer mt-4 ${
                  tier.highlight
                    ? 'bg-[#12304A] hover:bg-[#16A6A3] text-white'
                    : 'bg-slate-100 hover:bg-slate-200 text-[#12304A]'
                }`}
              >
                <span>{tier.cta}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Interactive Contingency Fee Simulator */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm max-w-4xl mx-auto">
          <div className="flex items-center gap-2.5 mb-2">
            <ShieldCheck className="w-5 h-5 text-[#16A6A3]" />
            <h3 className="text-lg sm:text-xl font-extrabold text-[#12304A]">
              Live Contingency Cost &amp; Profit Simulator
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mb-6">
            See how the 3.2% average contingency fee pays for itself by capturing uncollected insurance dollars:
          </p>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs sm:text-sm font-bold text-slate-700">
                  Monthly Insurance Collections:
                </span>
                <span className="text-base sm:text-lg font-black text-[#12304A] font-mono">
                  {formatUsd(sliderVal)} / month
                </span>
              </div>
              <input
                type="range"
                min="20000"
                max="200000"
                step="5000"
                value={sliderVal}
                onChange={(e) => setSliderVal(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#16A6A3]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#F8FAFB] p-4 rounded-2xl border border-slate-200 text-center">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase">
                  DentiSure Service Fee (3.2%)
                </span>
                <div className="text-lg sm:text-xl font-black text-slate-800 font-mono mt-0.5">
                  {formatUsd(estimatedBillingFee)}
                </div>
                <span className="text-[10px] text-slate-500">Only paid upon collection</span>
              </div>

              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase">
                  Extra Revenue Captured (~9%)
                </span>
                <div className="text-lg sm:text-xl font-black text-emerald-600 font-mono mt-0.5">
                  +{formatUsd(estimatedExtraCollected)}
                </div>
                <span className="text-[10px] text-slate-500">From appeals &amp; zero-day claims</span>
              </div>

              <div className="border-t sm:border-t-0 sm:border-l border-slate-200 pt-2 sm:pt-0">
                <span className="text-[11px] font-bold text-[#16A6A3] uppercase">
                  Estimated Net Monthly Gain
                </span>
                <div className="text-lg sm:text-xl font-black text-[#12304A] font-mono mt-0.5">
                  +{formatUsd(netPracticeGain)} / mo
                </div>
                <span className="text-[10px] text-emerald-700 font-bold">
                  + Reclaims 80 hrs of staff time
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
