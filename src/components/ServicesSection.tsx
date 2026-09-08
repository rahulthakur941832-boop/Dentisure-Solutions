import React, { useState } from 'react';
import { useCms } from '../context/CmsContext';
import {
  ShieldCheck,
  FileCheck2,
  AlertCircle,
  TrendingUp,
  DollarSign,
  CheckCircle,
  ArrowRight,
  Stethoscope,
} from 'lucide-react';

interface ServicesSectionProps {
  onOpenAuditModal: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenAuditModal }) => {
  const { cmsData } = useCms();
  const servicesConfig = cmsData.services;
  const pillars = servicesConfig.pillars && servicesConfig.pillars.length > 0 ? servicesConfig.pillars : [];

  const [selectedId, setSelectedId] = useState<string>('verification');

  const selectedPillar =
    pillars.find((p) => p.id === selectedId) || pillars[0];

  const getIcon = (name: string) => {
    switch (name) {
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5" />;
      case 'FileCheck2':
        return <FileCheck2 className="w-5 h-5" />;
      case 'AlertCircle':
        return <AlertCircle className="w-5 h-5" />;
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5" />;
      case 'DollarSign':
        return <DollarSign className="w-5 h-5" />;
      default:
        return <ShieldCheck className="w-5 h-5" />;
    }
  };

  if (!selectedPillar) return null;

  return (
    <section id="solutions" className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F7F6] text-[#12304A] text-xs font-bold uppercase tracking-wider mb-3">
            <Stethoscope className="w-3.5 h-3.5 text-[#16A6A3]" />
            <span>Comprehensive Dental RCM Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#12304A] tracking-tight mb-4">
            {servicesConfig.title || 'End-to-End Dental Revenue Solutions'}
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            {servicesConfig.subtitle || 'From the moment a patient schedules until the final EFT payment reconciles to your bank statement, DentiSure handles every touchpoint with precision.'}
          </p>
        </div>

        {/* Interactive Solution Selector Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {pillars.map((pillar) => {
            const isSelected = pillar.id === selectedId;
            return (
              <button
                key={pillar.id}
                onClick={() => setSelectedId(pillar.id)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2.5 ${
                  isSelected
                    ? 'bg-[#12304A] text-white shadow-md'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/80'
                }`}
              >
                <span className={isSelected ? 'text-teal-300' : 'text-[#16A6A3]'}>
                  {getIcon(pillar.iconName)}
                </span>
                <span>{pillar.title.split('&')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Active Pillar Detailed Showcase Card */}
        <div className="bg-[#F8FAFB] rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Content */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#16A6A3] bg-[#E8F7F6] px-3 py-1 rounded-md mb-3">
                {selectedPillar.badge}
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#12304A] mb-3">
                {selectedPillar.title}
              </h3>

              <p className="text-sm sm:text-base text-slate-600 mb-6 font-medium">
                {selectedPillar.subtitle}
              </p>

              {/* Workflow Detail Box */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 mb-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <span className="font-bold text-[#12304A] block mb-1">
                  How Our Specialists Execute This:
                </span>
                {selectedPillar.workflowDetail}
              </div>

              {/* Key Deliverables List */}
              <div className="space-y-2.5 mb-8">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Key Scope Deliverables
                </h4>
                {selectedPillar.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle className="w-4 h-4 text-[#16A6A3] flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Impact Metric Banner */}
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs sm:text-sm font-bold text-emerald-800 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Documented Impact: {selectedPillar.metricsImpact}</span>
              </div>
            </div>

            {/* Right Interactive Simulation / Summary */}
            <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h4 className="text-xs font-bold text-[#12304A] uppercase tracking-wider mb-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                <span>Direct PMS Execution</span>
                <span className="text-[10px] text-teal-600 bg-teal-50 px-2 py-0.5 rounded font-mono">
                  LIVE SYSTEM
                </span>
              </h4>

              <div className="space-y-3.5 text-xs">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="text-[11px] text-slate-400 font-semibold mb-0.5">
                    Data Entry Cadence
                  </div>
                  <div className="font-bold text-slate-800">
                    Daily Active (Mon – Fri, all US time zones)
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="text-[11px] text-slate-400 font-semibold mb-0.5">
                    Security &amp; Remote Access
                  </div>
                  <div className="font-bold text-slate-800">
                    Direct Login via Encrypted VPN / Remote PC
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="text-[11px] text-slate-400 font-semibold mb-0.5">
                    Clearinghouse Scrubbing
                  </div>
                  <div className="font-bold text-slate-800">
                    DentalXChange, Vyne, Claim.MD &amp; Change Healthcare
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="text-[11px] text-slate-400 font-semibold mb-0.5">
                    Staff Responsibility
                  </div>
                  <div className="font-bold text-emerald-700">
                    Zero Phone Calls or Paper Submissions
                  </div>
                </div>
              </div>

              <button
                onClick={onOpenAuditModal}
                className="mt-6 w-full py-3 px-4 rounded-xl bg-[#12304A] hover:bg-[#16A6A3] text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Request Practice Scope &amp; Pricing</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
