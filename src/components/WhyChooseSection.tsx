import React, { useState } from 'react';
import { WHY_CHOOSE_ITEMS } from '../data/contentData';
import {
  CheckCircle2,
  XCircle,
  Shield,
  ArrowRight,
  TrendingUp,
  FileCheck,
  Eye,
  Award,
  Users,
} from 'lucide-react';

interface WhyChooseSectionProps {
  onOpenAuditModal: () => void;
}

export const WhyChooseSection: React.FC<WhyChooseSectionProps> = ({ onOpenAuditModal }) => {
  const [activeTab, setActiveTab] = useState<'cards' | 'comparison'>('cards');

  const icons = [
    TrendingUp,
    FileCheck,
    Shield,
    Eye,
    Award,
    Users,
  ];

  return (
    <section id="why-dentisure" className="py-16 sm:py-24 bg-[#F8FAFB] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F7F6] text-[#12304A] text-xs font-bold uppercase tracking-wider mb-4">
            <Award className="w-3.5 h-3.5 text-[#16A6A3]" />
            <span>The DentiSure Distinction</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#12304A] tracking-tight mb-4">
            Why Dental Practices Choose DentiSure
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            We are not general medical billers who occasionally handle teeth. We are dedicated dental revenue specialists focused exclusively on CDT accuracy, PPO fee schedule optimization, and zero-day claims turnaround.
          </p>

          {/* Toggle between 6 Pillars vs. Before/After Matrix */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setActiveTab('cards')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === 'cards'
                  ? 'bg-[#12304A] text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              The 6 Core Advantages
            </button>
            <button
              onClick={() => setActiveTab('comparison')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === 'comparison'
                  ? 'bg-[#12304A] text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              In-House Billing vs. DentiSure
            </button>
          </div>
        </div>

        {/* View 1: The 6 Pillar Cards */}
        {activeTab === 'cards' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {WHY_CHOOSE_ITEMS.map((item, index) => {
              const IconComponent = icons[index % icons.length];
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-7 border border-slate-200/90 hover:border-[#16A6A3]/60 transition-all hover:shadow-md flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-black text-[#16A6A3] bg-[#E8F7F6] px-2.5 py-1 rounded-md">
                        {item.num}
                      </span>
                      <div className="w-9 h-9 rounded-lg bg-slate-50 group-hover:bg-[#E8F7F6] text-slate-500 group-hover:text-[#16A6A3] flex items-center justify-center transition-colors">
                        <IconComponent className="w-5 h-5" />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-[#12304A] mb-2 group-hover:text-[#16A6A3] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                      {item.description}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-start gap-2 text-xs font-medium text-slate-700 bg-slate-50/70 p-2.5 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{item.benefit}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* View 2: Detailed Side-by-Side Comparison */}
        {activeTab === 'comparison' && (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm mb-12">
            <div className="grid grid-cols-1 md:grid-cols-12 bg-slate-100 border-b border-slate-200 text-xs font-bold text-slate-700">
              <div className="p-4 md:col-span-4 uppercase tracking-wider">Operational Area</div>
              <div className="p-4 md:col-span-4 uppercase tracking-wider text-rose-700 bg-rose-50/50">
                Traditional In-House Billing
              </div>
              <div className="p-4 md:col-span-4 uppercase tracking-wider text-teal-800 bg-[#E8F7F6]">
                With DentiSure Solutions
              </div>
            </div>

            <div className="divide-y divide-slate-200 text-xs sm:text-sm">
              {[
                {
                  area: 'Front-Desk Phone Time',
                  bad: 'Staff spends 15–25 hours/week on payer hold queues while patients wait at reception.',
                  good: 'Zero insurance phone time for front desk. Our dedicated specialists handle 100% of payer inquiries.',
                },
                {
                  area: 'Clean Claim First-Pass Rate',
                  bad: 'Industry average is ~82% due to rushed submissions without proper x-rays or clinical narratives.',
                  good: 'Over 98% first-pass acceptance rate backed by automated clearinghouse scrubbing and dental review.',
                },
                {
                  area: '90+ Day Accounts Receivable',
                  bad: 'Frequently accumulates to 30–40% of total AR as staff focuses solely on current-day appointments.',
                  good: 'Strict bi-weekly aging triage keeps 90+ day AR under 10% of total balance.',
                },
                {
                  area: 'Staff Turnover & Absences',
                  bad: 'When your biller takes vacation, gets sick, or leaves, claim submissions freeze and cash flow stalls.',
                  good: 'Uninterrupted continuity. Our full US team provides seamless, uninterrupted coverage 52 weeks a year.',
                },
                {
                  area: 'Cost Structure',
                  bad: 'Fixed salary ($55k–$75k/year) + payroll taxes, health benefits, PTO, and office equipment.',
                  good: 'Performance-aligned contingency fee. We only get paid when you collect, turning a fixed overhead into a profit multiplier.',
                },
              ].map((row, idx) => (
                <div key={idx} className="grid grid-cols-1 md:grid-cols-12 items-center">
                  <div className="p-4 md:col-span-4 font-bold text-[#12304A] bg-slate-50/60">
                    {row.area}
                  </div>
                  <div className="p-4 md:col-span-4 text-slate-600 flex items-start gap-2 bg-rose-50/20">
                    <XCircle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                    <span>{row.bad}</span>
                  </div>
                  <div className="p-4 md:col-span-4 text-slate-800 font-medium flex items-start gap-2 bg-teal-50/30">
                    <CheckCircle2 className="w-4 h-4 text-[#16A6A3] flex-shrink-0 mt-0.5" />
                    <span>{row.good}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* The DentiSure Core Brand Statement */}
        <div className="bg-gradient-to-r from-[#12304A] via-[#173a5a] to-[#12304A] rounded-2xl p-8 sm:p-10 text-white shadow-lg relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-12 translate-y-12">
            <Shield className="w-72 h-72 text-teal-300" />
          </div>

          <div className="relative z-10 max-w-3xl">
            <span className="text-teal-300 font-extrabold uppercase text-xs tracking-widest block mb-2">
              The Bottom Line
            </span>
            <blockquote className="text-xl sm:text-2xl font-bold tracking-tight mb-4 leading-snug">
              &ldquo;Your practice. Your patients. Your revenue. DentiSure takes care of the complexity in between.&rdquo;
            </blockquote>
            <p className="text-sm text-slate-300 mb-6 leading-relaxed">
              Dental billing shouldn't be a source of stress, staffing headaches, or delayed cash. With DentiSure, you get complete revenue certainty, transparent reporting, and an aligned team fighting for every single dollar you earn.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenAuditModal}
                className="px-6 py-3 rounded-xl bg-[#16A6A3] hover:bg-teal-600 text-white font-bold text-xs sm:text-sm transition-all shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <span>Request Your Practice Audit</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <span className="text-xs text-slate-400">
                ✓ Confidential &bull; 100% Free &bull; No Obligation
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
