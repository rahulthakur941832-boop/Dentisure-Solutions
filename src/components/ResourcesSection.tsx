import React, { useState } from 'react';
import { RESOURCE_ARTICLES } from '../data/contentData';
import { ResourceArticle } from '../types';
import {
  BookOpen,
  ArrowRight,
  Download,
  Calendar,
  Clock,
  X,
  FileCheck,
  Printer,
} from 'lucide-react';

interface ResourcesSectionProps {
  onOpenAuditModal: () => void;
}

export const ResourcesSection: React.FC<ResourcesSectionProps> = ({ onOpenAuditModal }) => {
  const [activeArticle, setActiveArticle] = useState<ResourceArticle | null>(null);

  return (
    <section id="resources" className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F7F6] text-[#12304A] text-xs font-bold uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5 text-[#16A6A3]" />
            <span>Practice Knowledge Center</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#12304A] tracking-tight mb-4">
            Dental Billing Guides & Checklists
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Actionable clinical billing SOPs, CDT cheat sheets, and verification protocols prepared by our senior US billing auditors.
          </p>
        </div>

        {/* 3 Resource Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {RESOURCE_ARTICLES.map((article) => (
            <div
              key={article.id}
              className="bg-[#F8FAFB] rounded-2xl p-6 sm:p-7 border border-slate-200/90 hover:border-[#16A6A3]/60 transition-all hover:shadow-md flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-3">
                  <span className="text-[#16A6A3] bg-[#E8F7F6] px-2.5 py-0.5 rounded">
                    {article.category}
                  </span>
                  <span className="flex items-center gap-1 text-[11px]">
                    <Clock className="w-3 h-3" />
                    {article.readTime}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#12304A] group-hover:text-[#16A6A3] transition-colors mb-3 leading-snug">
                  {article.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  {article.snippet}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <button
                  onClick={() => setActiveArticle(article)}
                  className="text-xs font-bold text-[#12304A] group-hover:text-[#16A6A3] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Read Full Guide</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>

                {article.downloadableChecklist && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    <Download className="w-3 h-3" />
                    Checklist
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Article Reader Modal */}
        {activeArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#12304A]/80 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-150">
            <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[85vh] flex flex-col">
              {/* Modal Top Bar */}
              <div className="bg-[#12304A] text-white px-6 py-4 flex items-center justify-between border-b border-slate-700">
                <div className="flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-teal-300" />
                  <span className="text-xs font-bold text-teal-300 uppercase tracking-wider">
                    {activeArticle.category} &bull; Practice Standard
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => window.print()}
                    className="p-1.5 text-slate-300 hover:text-white rounded hover:bg-slate-800 transition-colors cursor-pointer"
                    title="Print Guide"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setActiveArticle(null)}
                    className="p-1.5 text-slate-300 hover:text-white rounded hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 overflow-y-auto flex-1">
                <div className="flex items-center gap-4 text-xs text-slate-400 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {activeArticle.date}
                  </span>
                  <span>&bull;</span>
                  <span>Author: {activeArticle.author}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#12304A] mb-4">
                  {activeArticle.title}
                </h2>

                <div className="p-4 bg-[#E8F7F6]/60 rounded-xl border border-[#16A6A3]/30 text-xs sm:text-sm text-slate-700 mb-6 font-medium">
                  {activeArticle.snippet}
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {activeArticle.content.map((para, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-slate-50 rounded-xl border border-slate-200"
                    >
                      <p>{para}</p>
                    </div>
                  ))}
                </div>

                {activeArticle.downloadableChecklist && (
                  <div className="mt-8 p-5 bg-teal-900 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <h4 className="font-bold text-sm text-teal-200">
                        Need this checklist laminated for your front desk?
                      </h4>
                      <p className="text-xs text-slate-300">
                        Our practice specialists can provide a branded 23-point laminated sheet for your office.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setActiveArticle(null);
                        onOpenAuditModal();
                      }}
                      className="px-4 py-2.5 bg-[#16A6A3] hover:bg-teal-500 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer flex-shrink-0"
                    >
                      Request Front-Desk Pack
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
