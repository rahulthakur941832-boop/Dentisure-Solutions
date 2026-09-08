import React, { useState, useId } from 'react';
import {
  Calculator,
  DollarSign,
  Clock,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react';

interface RoiCalculatorProps {
  onOpenAuditWithData?: (production: string, estimatedGain: string) => void;
}

export const RoiCalculator: React.FC<RoiCalculatorProps> = ({ onOpenAuditWithData }) => {
  const [monthlyProduction, setMonthlyProduction] = useState<number>(85000);
  const [denialRate, setDenialRate] = useState<number>(11);
  const [arOver90, setArOver90] = useState<number>(45000);
  const [weeklyHours, setWeeklyHours] = useState<number>(20);

  const monthlyId = useId();
  const denialId = useId();
  const arId = useId();
  const hoursId = useId();

  // Calculations
  // Average insurance is roughly 50-65% of dental production
  const estimatedInsuranceCollections = monthlyProduction * 0.55;
  // Denials average 11%; DentiSure cuts this to <4% (saving ~7% of insurance revenue)
  const monthlyDenialLossRecovered = estimatedInsuranceCollections * ((denialRate - 4) / 100);
  const annualDenialRecovery = Math.max(0, monthlyDenialLossRecovered * 12);

  // 90+ Day AR: DentiSure historically cleans up 50%+ within 90 days
  const recoveredAgingAr = arOver90 * 0.55;

  // Hours: Reclaim 80% of front desk billing phone hours
  const hoursReclaimedMonthly = Math.round(weeklyHours * 4.33 * 0.85);
  const annualHoursReclaimed = hoursReclaimedMonthly * 12;
  // Staff time value calculated at modest $24/hr
  const staffTimeValueAnnual = annualHoursReclaimed * 24;

  const totalAnnualGain = Math.round(
    annualDenialRecovery + recoveredAgingAr + staffTimeValueAnnual
  );

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);

  return (
    <section id="roi-calculator" className="py-16 sm:py-24 bg-[#12304A] text-white relative overflow-hidden">
      {/* Background Accent Gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-900/60 border border-teal-500/40 text-teal-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Practice Financial Modeling</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Calculate Your Practice’s Revenue Leakage & Potential ROI
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Adjust the sliders below to mirror your practice’s current volume. Discover how much trapped cash and wasted front-desk time DentiSure can systematically unlock for you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Controls Form (7 Cols) */}
          <div className="lg:col-span-7 bg-white/5 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/10 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Input 1: Monthly Production */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor={monthlyId} className="text-xs sm:text-sm font-bold text-slate-200">
                    Monthly Practice Production / Collections
                  </label>
                  <span className="text-sm sm:text-base font-extrabold text-teal-300 font-mono">
                    {formatCurrency(monthlyProduction)}
                  </span>
                </div>
                <input
                  id={monthlyId}
                  type="range"
                  min="30000"
                  max="350000"
                  step="5000"
                  value={monthlyProduction}
                  onChange={(e) => setMonthlyProduction(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#16A6A3]"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>$30k/mo (Solo)</span>
                  <span>$150k/mo (Group)</span>
                  <span>$350k+/mo (DSO)</span>
                </div>
              </div>

              {/* Input 2: Current Denial Rate */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor={denialId} className="text-xs sm:text-sm font-bold text-slate-200">
                    Estimated Claim Denial / Rejection Rate
                  </label>
                  <span className="text-sm sm:text-base font-extrabold text-teal-300 font-mono">
                    {denialRate}%
                  </span>
                </div>
                <input
                  id={denialId}
                  type="range"
                  min="4"
                  max="22"
                  step="1"
                  value={denialRate}
                  onChange={(e) => setDenialRate(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#16A6A3]"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>4% (Optimized)</span>
                  <span>11% (National Dental Avg)</span>
                  <span>22% (Severe Backlog)</span>
                </div>
              </div>

              {/* Input 3: Aging 90+ Day AR */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor={arId} className="text-xs sm:text-sm font-bold text-slate-200">
                    Current Uncollected AR Older Than 90 Days
                  </label>
                  <span className="text-sm sm:text-base font-extrabold text-teal-300 font-mono">
                    {formatCurrency(arOver90)}
                  </span>
                </div>
                <input
                  id={arId}
                  type="range"
                  min="5000"
                  max="150000"
                  step="2500"
                  value={arOver90}
                  onChange={(e) => setArOver90(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#16A6A3]"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>$5,000</span>
                  <span>$45,000</span>
                  <span>$150,000+</span>
                </div>
              </div>

              {/* Input 4: Weekly Front-Desk Phone Hours */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor={hoursId} className="text-xs sm:text-sm font-bold text-slate-200">
                    Front-Desk Hours/Week on Insurance Holds & Appeals
                  </label>
                  <span className="text-sm sm:text-base font-extrabold text-teal-300 font-mono">
                    {weeklyHours} Hours / Week
                  </span>
                </div>
                <input
                  id={hoursId}
                  type="range"
                  min="5"
                  max="40"
                  step="1"
                  value={weeklyHours}
                  onChange={(e) => setWeeklyHours(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#16A6A3]"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>5 hrs</span>
                  <span>20 hrs (Typical 1 FTE)</span>
                  <span>40 hrs (2+ Staff)</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-teal-400 flex-shrink-0" />
              <span>Calculated based on ADA industry benchmarks and audited DentiSure client outcomes.</span>
            </div>
          </div>

          {/* Results Display (5 Cols) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-[#16A6A3] to-[#0f7a77] rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/20 mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-100">
                  Estimated Financial Impact
                </span>
                <span className="text-xs font-semibold bg-white/20 px-2.5 py-0.5 rounded-full">
                  Annualized
                </span>
              </div>

              {/* Big Impact Total */}
              <div className="mb-6">
                <span className="text-xs text-teal-100 block mb-1">
                  Total Estimated Recoverable Cash & Value:
                </span>
                <div className="text-3xl sm:text-4xl font-black tracking-tight text-white font-mono">
                  {formatCurrency(totalAnnualGain)}
                </div>
                <span className="text-xs text-teal-200 mt-1 block">
                  ~ {formatCurrency(Math.round(totalAnnualGain / 12))} / month in added liquidity
                </span>
              </div>

              {/* Metric Breakdown */}
              <div className="space-y-3.5 mb-8">
                <div className="bg-black/15 p-3.5 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <DollarSign className="w-4 h-4 text-emerald-300" />
                    <div>
                      <div className="text-xs font-bold">Annual Denials Prevented</div>
                      <div className="text-[11px] text-teal-100">From &gt;98% first-pass clean rate</div>
                    </div>
                  </div>
                  <div className="text-sm font-extrabold font-mono">
                    {formatCurrency(annualDenialRecovery)}
                  </div>
                </div>

                <div className="bg-black/15 p-3.5 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <TrendingUp className="w-4 h-4 text-teal-200" />
                    <div>
                      <div className="text-xs font-bold">Aging 90+ AR Unlocked</div>
                      <div className="text-[11px] text-teal-100">Targeted 90-day recovery sprint</div>
                    </div>
                  </div>
                  <div className="text-sm font-extrabold font-mono">
                    {formatCurrency(recoveredAgingAr)}
                  </div>
                </div>

                <div className="bg-black/15 p-3.5 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-amber-300" />
                    <div>
                      <div className="text-xs font-bold">Staff Hours Reclaimed</div>
                      <div className="text-[11px] text-teal-100">For patient care & case presentation</div>
                    </div>
                  </div>
                  <div className="text-sm font-extrabold font-mono">
                    {annualHoursReclaimed} hrs/yr
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Action Button */}
            <div>
              <button
                onClick={() => {
                  if (onOpenAuditWithData) {
                    onOpenAuditWithData(
                      formatCurrency(monthlyProduction),
                      formatCurrency(totalAnnualGain)
                    );
                  }
                }}
                className="w-full py-4 px-6 rounded-2xl bg-white text-[#12304A] hover:bg-teal-50 font-extrabold text-sm transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer group"
              >
                <Calculator className="w-4 h-4 text-[#16A6A3]" />
                <span>Verify These Numbers With a Free Audit</span>
                <ArrowRight className="w-4 h-4 text-[#12304A] group-hover:translate-x-1 transition-transform" />
              </button>
              <div className="text-[11px] text-teal-100 text-center mt-2">
                We review your actual PMS aging reports confidentially.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
