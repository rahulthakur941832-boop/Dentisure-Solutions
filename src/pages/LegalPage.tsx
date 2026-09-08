import React, { useState } from 'react';
import { useCms } from '../context/CmsContext';
import { ShieldCheck, FileText, Lock, Printer, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { NavigationPage } from '../types';

interface LegalPageProps {
  initialType?: 'terms' | 'privacy' | 'hipaa';
  onNavigate: (page: NavigationPage) => void;
  onOpenAuditModal: () => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({
  initialType = 'terms',
  onNavigate,
  onOpenAuditModal,
}) => {
  const { cmsData } = useCms();
  const [activeDocType, setActiveDocType] = useState<'terms' | 'privacy' | 'hipaa'>(initialType);

  const doc = cmsData.legal[activeDocType];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white min-h-screen py-10 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb / Back button */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#12304A] hover:text-[#16A6A3] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Document</span>
          </button>
        </div>

        {/* Tab switcher for Legal Docs */}
        <div className="flex flex-wrap gap-2 mb-10 bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200 max-w-xl">
          <button
            onClick={() => setActiveDocType('terms')}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeDocType === 'terms'
                ? 'bg-white text-[#12304A] shadow-sm'
                : 'text-slate-600 hover:text-[#12304A]'
            }`}
          >
            <FileText className="w-4 h-4 text-[#16A6A3]" />
            <span>Terms of Service</span>
          </button>
          <button
            onClick={() => setActiveDocType('privacy')}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeDocType === 'privacy'
                ? 'bg-white text-[#12304A] shadow-sm'
                : 'text-slate-600 hover:text-[#12304A]'
            }`}
          >
            <Lock className="w-4 h-4 text-[#16A6A3]" />
            <span>Privacy Policy</span>
          </button>
          <button
            onClick={() => setActiveDocType('hipaa')}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeDocType === 'hipaa'
                ? 'bg-[#12304A] text-white shadow-sm'
                : 'text-slate-600 hover:text-[#12304A]'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-teal-400" />
            <span>HIPAA &amp; BAA</span>
          </button>
        </div>

        {/* Document Header */}
        <div className="mb-10 bg-[#F8FAFB] p-6 sm:p-8 rounded-3xl border border-slate-200/90">
          <div className="flex items-center gap-2 text-xs font-extrabold text-[#16A6A3] uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Official Legal &amp; Regulatory Documentation</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#12304A] tracking-tight mb-3">
            {doc.title}
          </h1>
          <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
            <span>Last Updated: <strong className="text-slate-700">{doc.lastUpdated}</strong></span>
            <span>&bull;</span>
            <span>Jurisdiction: <strong className="text-slate-700">United States Healthcare Standards</strong></span>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
            {doc.intro}
          </p>
        </div>

        {/* Document Sections */}
        <div className="space-y-8 mb-14">
          {doc.sections.map((section, idx) => (
            <div
              key={idx}
              className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/90 shadow-2xs hover:border-[#16A6A3]/40 transition-colors"
            >
              <h2 className="text-base sm:text-lg font-extrabold text-[#12304A] mb-3 flex items-start gap-2">
                <span className="text-[#16A6A3]">{idx + 1}.</span>
                <span>{section.heading.replace(/^\d+\.\s*/, '')}</span>
              </h2>
              <div className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                {section.body}
              </div>
            </div>
          ))}
        </div>

        {/* Corporate Entity & Business Information Box */}
        <div className="mb-12 bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8">
          <div className="flex items-center gap-2 text-xs font-extrabold text-[#12304A] uppercase tracking-wider mb-4">
            <FileText className="w-4 h-4 text-[#16A6A3]" />
            <span>Corporate Entity &amp; Official Contact Information</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-white rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Legal Entity Name
              </span>
              <span className="font-extrabold text-slate-800 text-sm">
                {cmsData.brand.legalEntityName || 'DentiSure Solutions LLC'}
              </span>
              <span className="text-slate-500 block mt-1 text-[11px]">
                {cmsData.brand.businessSetupType || 'US Registered Business Entity — Nationwide Remote Dental RCM'}
              </span>
            </div>

            <div className="p-4 bg-white rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Registered US Business Address
              </span>
              <span className="font-semibold text-slate-800">
                {cmsData.brand.usBusinessAddress || cmsData.brand.address}
              </span>
            </div>

            <div className="p-4 bg-white rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Mailing &amp; Billing
              </span>
              <span className="text-slate-700 block">
                <strong>Mailing:</strong> {cmsData.brand.mailingAddress || cmsData.brand.address}
              </span>
              <span className="text-slate-500 block mt-1 text-[11px]">
                <strong>Billing:</strong> {cmsData.brand.billingAddress || 'Electronic Invoicing & ACH / Wire Transfer'}
              </span>
            </div>

            <div className="p-4 bg-white rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Tax Identification &amp; Compliance Notice
              </span>
              <span className="text-slate-600 block font-mono text-[11px]">
                {cmsData.brand.einTaxIdNotice || '[EIN / Tax ID on File — Disclosed upon Mutual BAA / W-9 Execution]'}
              </span>
              <span className="text-slate-500 block mt-1 text-[11px]">
                Compliance Officer: <a href={`mailto:${cmsData.brand.contactEmail}`} className="text-[#16A6A3] font-semibold hover:underline">{cmsData.brand.contactEmail}</a>
              </span>
            </div>
          </div>
        </div>

        {/* Regulatory Assistance Banner */}
        <div className="bg-[#12304A] text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider mb-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Compliance &amp; BAA Execution</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-1">
              Need a counter-signed BAA for your practice records?
            </h3>
            <p className="text-xs text-slate-300 max-w-xl">
              We execute customized Business Associate Agreements (BAA) directly with your legal or compliance team prior to onboarding.
            </p>
          </div>
          <button
            onClick={onOpenAuditModal}
            className="px-5 py-3 rounded-xl bg-[#16A6A3] hover:bg-teal-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer whitespace-nowrap"
          >
            Request BAA &amp; Consultation
          </button>
        </div>
      </div>
    </div>
  );
};
