import React, { useState } from 'react';
import { MetricFocus } from '../types';
import { METRICS_DATA, COMPATIBLE_PMS } from '../data/contentData';
import { Check, ShieldCheck, DollarSign, Clock, Award } from 'lucide-react';

export const TrustMetricsBar: React.FC = () => {
  const [metricFocus, setMetricFocus] = useState<MetricFocus>('cashflow');
  const activeData = METRICS_DATA[metricFocus];

  return (
    <section className="bg-white py-12 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Metric Perspective Tabs */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#16A6A3] uppercase tracking-wider mb-1">
              <Award className="w-4 h-4" />
              <span>Documented Performance Benchmarks</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#12304A]">
              {activeData.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">{activeData.subtitle}</p>
          </div>

          <div className="flex items-center bg-slate-100 p-1.5 rounded-xl border border-slate-200">
            <button
              onClick={() => setMetricFocus('cashflow')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                metricFocus === 'cashflow'
                  ? 'bg-white text-[#12304A] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <DollarSign className="w-3.5 h-3.5 text-[#16A6A3]" />
              <span>Cash Flow</span>
            </button>
            <button
              onClick={() => setMetricFocus('efficiency')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                metricFocus === 'efficiency'
                  ? 'bg-white text-[#12304A] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Clock className="w-3.5 h-3.5 text-[#16A6A3]" />
              <span>Operational Efficiency</span>
            </button>
            <button
              onClick={() => setMetricFocus('outcomes')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                metricFocus === 'outcomes'
                  ? 'bg-white text-[#12304A] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-[#16A6A3]" />
              <span>Proven Outcomes</span>
            </button>
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {activeData.stats.map((stat, i) => (
            <div
              key={i}
              className="bg-[#F8FAFB] hover:bg-[#F0F9F9] transition-colors p-5 rounded-xl border border-slate-200/90 flex flex-col justify-between"
            >
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#12304A] tracking-tight mb-1">
                  {stat.value}
                </div>
                <div className="text-sm font-bold text-slate-800 mb-1.5">
                  {stat.label}
                </div>
              </div>
              <div className="text-xs text-slate-500 pt-2 border-t border-slate-200/60 flex items-start gap-1">
                <Check className="w-3.5 h-3.5 text-[#16A6A3] flex-shrink-0 mt-0.5" />
                <span>{stat.detail}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Software Compatibility Strip */}
        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center flex-shrink-0 shadow-xs">
                <ShieldCheck className="w-5 h-5 text-[#16A6A3]" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-[#12304A] uppercase tracking-wider">
                  Native Software Compatibility
                </h3>
                <p className="text-xs text-slate-500">
                  Direct encrypted login into your current dental PMS — no data migration needed.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-end gap-2 text-xs font-semibold text-slate-700">
              {COMPATIBLE_PMS.map((pms, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 bg-white rounded-lg border border-slate-200 shadow-xs hover:border-[#16A6A3] transition-colors"
                >
                  {pms.name}
                </span>
              ))}
              <span className="px-2.5 py-1 text-[11px] font-bold text-[#16A6A3] bg-[#E8F7F6] rounded-md">
                + All Cloud & On-Premise PMS
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
