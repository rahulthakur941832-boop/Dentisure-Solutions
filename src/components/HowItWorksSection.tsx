import React, { useState } from 'react';
import { HOW_IT_WORKS_STEPS, ONBOARDING_TIMELINE } from '../data/contentData';
import {
  ShieldCheck,
  Calendar,
  Layers,
  ArrowRight,
  Lock,
} from 'lucide-react';

interface HowItWorksProps {
  onOpenAuditModal: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksProps> = ({ onOpenAuditModal }) => {
  const [activeTab, setActiveTab] = useState<'lifecycle' | 'onboarding'>('lifecycle');

  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F7F6] text-[#12304A] text-xs font-bold uppercase tracking-wider mb-3">
            <Layers className="w-3.5 h-3.5 text-[#16A6A3]" />
            <span>Transparent Execution</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#12304A] tracking-tight mb-4">
            How DentiSure Operates Inside Your Practice
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            We work directly inside your existing dental software via secure VPN. Your workflow remains frictionless, your patient care remains primary, and your revenue accelerates.
          </p>

          {/* Tab Switcher */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setActiveTab('lifecycle')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'lifecycle'
                  ? 'bg-[#12304A] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>6-Stage Claim Lifecycle</span>
            </button>
            <button
              onClick={() => setActiveTab('onboarding')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'onboarding'
                  ? 'bg-[#12304A] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Rapid 1-Week Onboarding</span>
            </button>
          </div>
        </div>

        {/* View 1: 6-Stage Claim Lifecycle */}
        {activeTab === 'lifecycle' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {HOW_IT_WORKS_STEPS.map((step, idx) => (
              <div
                key={idx}
                className="bg-[#F8FAFB] rounded-2xl p-6 border border-slate-200/90 relative hover:border-[#16A6A3] transition-all hover:shadow-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-extrabold text-[#16A6A3] bg-[#E8F7F6] px-2.5 py-1 rounded-md">
                    Phase {step.step}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400">
                    Stage {idx + 1} of 6
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#12304A] mb-2">{step.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* View 2: Rapid 1-Week Onboarding Timeline */}
        {activeTab === 'onboarding' && (
          <div className="max-w-4xl mx-auto mb-12">
            <div className="relative border-l-2 border-[#16A6A3]/30 pl-6 sm:pl-8 ml-4 sm:ml-6 space-y-8">
              {ONBOARDING_TIMELINE.map((item, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full bg-white border-4 border-[#16A6A3] group-hover:scale-110 transition-transform"></div>

                  <div className="bg-[#F8FAFB] p-6 rounded-2xl border border-slate-200 group-hover:border-[#16A6A3] transition-all">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-black text-[#16A6A3] uppercase tracking-wider bg-[#E8F7F6] px-2.5 py-0.5 rounded">
                        {item.days}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        Zero Downtime for Patients
                      </span>
                    </div>
                    <h3 className="text-lg font-extrabold text-[#12304A] mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Security & Remote Architecture Callout */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-[#12304A] text-teal-300 flex items-center justify-center flex-shrink-0 shadow-xs">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-[#12304A]">
                Strict HIPAA Compliance & Remote Security Architecture
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mt-0.5">
                We sign standard Business Associate Agreements (BAA). We log in directly through your secure VPN or remote desktop—patient data never leaves your environment.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenAuditModal}
            className="w-full md:w-auto px-5 py-3 rounded-xl bg-[#12304A] hover:bg-[#16A6A3] text-white text-xs sm:text-sm font-bold transition-all shadow-xs flex items-center justify-center gap-2 flex-shrink-0 cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-teal-300" />
            <span>Schedule Discovery Call</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
