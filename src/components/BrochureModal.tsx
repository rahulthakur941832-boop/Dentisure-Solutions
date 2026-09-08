import React, { useState } from 'react';
import { BROCHURE_SECTIONS, BRAND } from '../data/contentData';
import { Logo } from './Logo';
import {
  X,
  Printer,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  CalendarCheck,
} from 'lucide-react';

interface BrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAudit: () => void;
}

export const BrochureModal: React.FC<BrochureModalProps> = ({
  isOpen,
  onClose,
  onOpenAudit,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(0);

  if (!isOpen) return null;

  const currentSection = BROCHURE_SECTIONS[currentPage];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#12304A]/80 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Header / Bar */}
        <div className="bg-[#12304A] text-white px-6 py-4 flex items-center justify-between border-b border-slate-700">
          <div className="flex items-center gap-3">
            <Logo variant="white" showTagline={false} />
            <span className="hidden sm:inline-block text-slate-500">|</span>
            <span className="hidden sm:inline-block text-xs font-semibold text-teal-300">
              Official Practice Capabilities Brochure
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 text-xs font-bold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors"
              title="Print or Save PDF"
            >
              <Printer className="w-3.5 h-3.5 text-teal-400" />
              <span className="hidden sm:inline">Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Brochure Navigation Strip */}
        <div className="bg-slate-50 px-6 py-2.5 border-b border-slate-200 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-[#16A6A3]">
              Section {currentSection.sectionNum} of 10
            </span>
            <span className="text-slate-400">&bull;</span>
            <span className="font-semibold text-slate-700 truncate max-w-[200px] sm:max-w-none">
              {currentSection.title}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
              disabled={currentPage === 0}
              className="p-1 rounded bg-white border border-slate-200 disabled:opacity-30 hover:bg-slate-100 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 text-slate-700" />
            </button>
            <span className="text-xs font-mono text-slate-500 px-1">
              {currentPage + 1}/10
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(BROCHURE_SECTIONS.length - 1, prev + 1))
              }
              disabled={currentPage === BROCHURE_SECTIONS.length - 1}
              className="p-1 rounded bg-white border border-slate-200 disabled:opacity-30 hover:bg-slate-100 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4 text-slate-700" />
            </button>
          </div>
        </div>

        {/* Brochure Page Body */}
        <div className="p-6 sm:p-10 overflow-y-auto flex-1 bg-gradient-to-b from-white to-[#F8FAFB]">
          <div className="max-w-2xl mx-auto">
            {/* Page Watermark Badge */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-black tracking-widest uppercase text-slate-400">
                DentiSure Solutions &bull; Doc v1.0
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
                <ShieldCheck className="w-3 h-3 text-[#16A6A3]" />
                HIPAA-Ready Remote Partner
              </span>
            </div>

            {/* Headline */}
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#12304A] tracking-tight mb-2">
              {currentSection.headline}
            </h3>

            {/* Subtitle */}
            <p className="text-base font-semibold text-[#16A6A3] mb-6">
              {currentSection.subtitle}
            </p>

            {/* Content Text with Formatting */}
            <div className="text-sm sm:text-base text-slate-700 leading-relaxed space-y-4 mb-8 whitespace-pre-line bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              {currentSection.text}
            </div>

            {/* Page Quick Matrix / Features */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                <span className="font-bold text-[#12304A] block mb-1">
                  Dedicated RCM Team
                </span>
                <span className="text-slate-500">
                  Specialists experienced with US dental payers.
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                <span className="font-bold text-[#12304A] block mb-1">
                  Direct Software Access
                </span>
                <span className="text-slate-500">
                  Dentrix, Eaglesoft, Open Dental & Curve.
                </span>
              </div>
            </div>

            {/* Contact Strip */}
            <div className="p-4 bg-teal-50/60 rounded-xl border border-teal-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div>
                <span className="font-extrabold text-[#12304A] block">
                  Questions regarding this section?
                </span>
                <span className="text-slate-600">
                  Call our team at <strong className="text-[#12304A]">{BRAND.phone}</strong>
                </span>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onOpenAudit();
                }}
                className="px-4 py-2 bg-[#12304A] hover:bg-[#16A6A3] text-white font-bold rounded-lg transition-colors cursor-pointer text-xs"
              >
                Schedule 1-on-1 Consultation
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Pagination Strip */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex gap-1 overflow-x-auto py-1 max-w-md">
            {BROCHURE_SECTIONS.map((sec, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className={`w-6 h-6 rounded text-[11px] font-bold flex items-center justify-center transition-colors cursor-pointer ${
                  currentPage === i
                    ? 'bg-[#12304A] text-white'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {sec.sectionNum}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onOpenAudit();
              }}
              className="px-3.5 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>Get Started</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
