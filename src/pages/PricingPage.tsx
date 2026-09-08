import React, { useState } from 'react';
import { PRICING_TIERS } from '../data/contentData';
import { useCms } from '../context/CmsContext';
import {
  Check,
  DollarSign,
  ArrowRight,
  ShieldCheck,
  Calculator,
  CalendarCheck,
  TrendingUp,
  Clock,
  CheckCircle2,
  X,
  HelpCircle,
} from 'lucide-react';
import { NavigationPage } from '../types';

interface PricingPageProps {
  onOpenAuditModal: (production?: string, gain?: string) => void;
  onNavigate: (page: NavigationPage) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({
  onOpenAuditModal,
  onNavigate,
}) => {
  const { cmsData } = useCms();
  const pricingTiers = cmsData.pricing?.tiers && cmsData.pricing.tiers.length > 0
    ? cmsData.pricing.tiers
    : PRICING_TIERS;
  const pricingTitle = cmsData.pricing?.title || 'Transparent Pricing with Zero Long-Term Lock-In';
  const pricingSubtitle = cmsData.pricing?.subtitle || 'We only earn when cash is deposited into your practice bank account. No upfront retainers, no hidden software fees, and 30-day simple cancellation.';

  // Calculator State
  const [monthlyProduction, setMonthlyProduction] = useState<number>(95000);
  const [currentCollectionRate, setCurrentCollectionRate] = useState<number>(90);
  const [arOver90, setArOver90] = useState<number>(45000);
  const [weeklyHours, setWeeklyHours] = useState<number>(22);

  // Calculations
  const targetCollectionRate = 98.2;
  const collectionGapPct = Math.max(0, targetCollectionRate - currentCollectionRate) / 100;
  const annualLostCollections = monthlyProduction * 12 * collectionGapPct;
  const recoverableAgingAr = arOver90 * 0.65; // realistic 65% recovery on 90+ day AR
  const totalAnnualGain = Math.round(annualLostCollections + recoverableAgingAr);
  const monthlyCashBoost = Math.round(totalAnnualGain / 12);
  const monthlyHoursSaved = weeklyHours * 4;

  const handleLaunchAuditWithData = () => {
    onOpenAuditModal(
      `$${monthlyProduction.toLocaleString()}/mo (${currentCollectionRate}% collection rate)`,
      `+$${totalAnnualGain.toLocaleString()}/yr`
    );
  };

  const comparisonData = [
    {
      metric: 'Base Compensation',
      inHouse: '$52,000 – $75,000/yr salary',
      dentisure: 'Contingency fee (2.9% – 3.8% of collections)',
      highlight: true,
    },
    {
      metric: 'Benefits, 401(k) & Payroll Taxes',
      inHouse: '+$12,000 – $18,000/yr overhead',
      dentisure: '$0 overhead',
      highlight: true,
    },
    {
      metric: 'Biller Vacation, Sick Days & Turnover',
      inHouse: 'Billing stops or falls behind',
      dentisure: '365-day continuity & zero backlog',
      highlight: true,
    },
    {
      metric: 'First-Pass Clean Claim Acceptance',
      inHouse: '78% – 85% industry average',
      dentisure: '98.4%+ first-pass accepted',
      highlight: false,
    },
    {
      metric: 'Days in Accounts Receivable (DSO)',
      inHouse: '45 – 65 days average',
      dentisure: '24 – 32 days',
      highlight: false,
    },
    {
      metric: 'Front-Desk Phone Hold Time',
      inHouse: '20+ hours/week spent on carrier hold',
      dentisure: '0 hours (we handle 100% of calls)',
      highlight: true,
    },
    {
      metric: 'Contract Commitment',
      inHouse: 'Severance, unemployment risk',
      dentisure: '30-day notice, no lock-in',
      highlight: false,
    },
  ];

  return (
    <div className="bg-[#F8FAFB] text-[#12304A]">
      {/* 1. Hero */}
      <section className="bg-white border-b border-slate-200 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#E8F7F6] text-[#12304A] text-xs font-bold uppercase tracking-wider mb-4">
            <DollarSign className="w-3.5 h-3.5 text-[#16A6A3]" />
            <span>Contingency-Based Model</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#12304A] tracking-tight mb-6">
            {pricingTitle}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6">
            {pricingSubtitle}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-slate-700">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Pay on Insurance Collections
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Mutual BAA Included
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Cancel with 30 Days Notice
            </span>
          </div>
        </div>
      </section>

      {/* 2. Three Pricing Tiers */}
      <section className="py-16 bg-[#F8FAFB] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all ${
                  tier.highlight
                    ? 'bg-[#12304A] text-white shadow-xl ring-2 ring-[#16A6A3] relative'
                    : 'bg-white text-[#12304A] border border-slate-200 shadow-xs'
                }`}
              >
                {tier.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#16A6A3] text-white text-[11px] font-extrabold uppercase tracking-wider py-1 px-3.5 rounded-full shadow-sm">
                    {tier.tag}
                  </div>
                )}

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-extrabold">{tier.name}</h3>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                        {tier.price}
                      </span>
                    </div>
                    <span
                      className={`text-xs block mt-1 ${
                        tier.highlight ? 'text-slate-300' : 'text-slate-500'
                      }`}
                    >
                      {tier.unit}
                    </span>
                  </div>

                  <p
                    className={`text-xs leading-relaxed mb-6 ${
                      tier.highlight ? 'text-slate-300' : 'text-slate-600'
                    }`}
                  >
                    {tier.idealFor}
                  </p>

                  <div
                    className={`pt-4 border-t mb-6 ${
                      tier.highlight ? 'border-slate-700' : 'border-slate-100'
                    }`}
                  >
                    <span
                      className={`text-[11px] font-bold uppercase tracking-wider block mb-3 ${
                        tier.highlight ? 'text-teal-300' : 'text-slate-500'
                      }`}
                    >
                      What&apos;s Included:
                    </span>
                    <ul className="space-y-2.5">
                      {tier.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs">
                          <Check
                            className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                              tier.highlight ? 'text-teal-300' : 'text-[#16A6A3]'
                            }`}
                          />
                          <span
                            className={
                              tier.highlight ? 'text-slate-200' : 'text-slate-700'
                            }
                          >
                            {feat}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  onClick={() => onOpenAuditModal()}
                  className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    tier.highlight
                      ? 'bg-[#16A6A3] hover:bg-teal-500 text-white shadow-md'
                      : 'bg-[#12304A] hover:bg-[#16A6A3] text-white shadow-xs'
                  }`}
                >
                  <span>{tier.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Full Interactive Practice ROI & Revenue Leakage Calculator */}
      <section className="py-16 bg-white border-b border-slate-200" id="roi-calculator">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
              <Calculator className="w-3.5 h-3.5 text-emerald-600" />
              <span>Interactive Financial Assessment</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#12304A] tracking-tight mb-3">
              Dental Practice Revenue &amp; Leakage Calculator
            </h2>
            <p className="text-sm text-slate-600">
              Adjust the sliders to match your practice metrics. See how much dormant insurance cash DentiSure can recapture.
            </p>
          </div>

          <div className="bg-[#F8FAFB] rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Sliders (Left Column) */}
              <div className="lg:col-span-7 space-y-6">
                {/* Slider 1 */}
                <div className="bg-white p-5 rounded-xl border border-slate-200">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold text-[#12304A]">
                      Monthly Practice Insurance Production
                    </label>
                    <span className="text-sm font-extrabold text-[#16A6A3]">
                      ${monthlyProduction.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="30000"
                    max="250000"
                    step="5000"
                    value={monthlyProduction}
                    onChange={(e) => setMonthlyProduction(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#16A6A3]"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>$30,000</span>
                    <span>$125,000</span>
                    <span>$250,000+</span>
                  </div>
                </div>

                {/* Slider 2 */}
                <div className="bg-white p-5 rounded-xl border border-slate-200">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold text-[#12304A]">
                      Current Insurance Collection Rate
                    </label>
                    <span className="text-sm font-extrabold text-[#16A6A3]">
                      {currentCollectionRate}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="80"
                    max="96"
                    step="1"
                    value={currentCollectionRate}
                    onChange={(e) => setCurrentCollectionRate(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#16A6A3]"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>80% (Severe Leakage)</span>
                    <span>90% (Average Practice)</span>
                    <span>96% (Good)</span>
                  </div>
                </div>

                {/* Slider 3 */}
                <div className="bg-white p-5 rounded-xl border border-slate-200">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold text-[#12304A]">
                      Current 90+ Day Aging Insurance AR Balance
                    </label>
                    <span className="text-sm font-extrabold text-amber-600">
                      ${arOver90.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5000"
                    max="150000"
                    step="5000"
                    value={arOver90}
                    onChange={(e) => setArOver90(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>$5,000</span>
                    <span>$60,000</span>
                    <span>$150,000+</span>
                  </div>
                </div>

                {/* Slider 4 */}
                <div className="bg-white p-5 rounded-xl border border-slate-200">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold text-[#12304A]">
                      Front-Desk Hours Spent Weekly on Insurance Hold &amp; Claims
                    </label>
                    <span className="text-sm font-extrabold text-teal-600">
                      {weeklyHours} hrs/week
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="40"
                    step="1"
                    value={weeklyHours}
                    onChange={(e) => setWeeklyHours(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>5 hrs</span>
                    <span>20 hrs (Half-time)</span>
                    <span>40 hrs (Full-time)</span>
                  </div>
                </div>
              </div>

              {/* Output Panel (Right Column) */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div className="bg-[#12304A] text-white p-6 sm:p-8 rounded-2xl border border-slate-700 shadow-md">
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-300 block mb-2">
                    Projected Practice ROI &amp; Cash Boost
                  </span>

                  <div className="border-b border-slate-700 pb-5 mb-5">
                    <span className="text-xs text-slate-300 block mb-1">
                      Estimated Total Annual Financial Gain
                    </span>
                    <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 tracking-tight">
                      +${totalAnnualGain.toLocaleString()}
                    </div>
                    <span className="text-[11px] text-slate-400">
                      ~${monthlyCashBoost.toLocaleString()} additional cash deposited monthly
                    </span>
                  </div>

                  <div className="space-y-3 text-xs mb-6">
                    <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                      <span className="text-slate-300">Annual Recovered Collections (to 98.2%)</span>
                      <span className="font-bold text-emerald-400">
                        +${Math.round(annualLostCollections).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                      <span className="text-slate-300">Aging 90+ Day AR Recaptured (65%)</span>
                      <span className="font-bold text-emerald-400">
                        +${Math.round(recoverableAgingAr).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-1.5">
                      <span className="text-slate-300">Front Desk Hours Reclaimed</span>
                      <span className="font-bold text-teal-300">
                        {monthlyHoursSaved} hrs/month
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleLaunchAuditWithData}
                    className="w-full py-3.5 px-4 bg-[#16A6A3] hover:bg-teal-500 text-white font-bold rounded-xl text-xs sm:text-sm transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                  >
                    <CalendarCheck className="w-4 h-4 text-white" />
                    <span>Lock In My Audit with These Metrics</span>
                  </button>
                  <p className="text-[10px] text-slate-400 text-center mt-2">
                    Zero obligation. We will verify these estimates on your actual PMS ledger.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Comparison Table: In-House vs DentiSure */}
      <section className="py-16 bg-[#F8FAFB] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#12304A] tracking-tight mb-3">
              In-House Biller vs. DentiSure Remote RCM Team
            </h2>
            <p className="text-sm text-slate-600">
              Compare the total cost of ownership, reliability, and collection performance.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#12304A] text-white">
                    <th className="p-4 sm:p-5 font-bold">Category</th>
                    <th className="p-4 sm:p-5 font-bold text-slate-300">In-House Staff Member</th>
                    <th className="p-4 sm:p-5 font-bold text-teal-300 bg-slate-800/80">
                      DentiSure Remote RCM
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {comparisonData.map((row, idx) => (
                    <tr
                      key={idx}
                      className={row.highlight ? 'bg-teal-50/30' : 'bg-white'}
                    >
                      <td className="p-4 sm:p-5 font-bold text-[#12304A]">
                        {row.metric}
                      </td>
                      <td className="p-4 sm:p-5 text-slate-600">
                        {row.inHouse}
                      </td>
                      <td className="p-4 sm:p-5 font-bold text-emerald-800 bg-teal-50/50">
                        {row.dentisure}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Closing CTA */}
      <section className="py-14 bg-[#12304A] text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
            Request Your Confidential Fee Proposal
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mb-6 max-w-xl mx-auto">
            Provide your estimated monthly insurance collections and receive a firm, transparent contingency fee proposal within 24 hours.
          </p>
          <button
            onClick={() => onOpenAuditModal()}
            className="px-6 py-3.5 bg-[#16A6A3] hover:bg-teal-500 text-white font-bold text-sm rounded-xl transition-colors cursor-pointer inline-flex items-center gap-2 shadow-sm"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Request Custom Fee Proposal</span>
          </button>
        </div>
      </section>
    </div>
  );
};
