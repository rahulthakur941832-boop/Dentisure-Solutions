import React, { useState } from 'react';
import { useCms } from '../context/CmsContext';
import { FAQItem } from '../types';
import {
  ChevronDown,
  ChevronUp,
  Search,
  HelpCircle,
  MessageSquare,
} from 'lucide-react';

interface FAQSectionProps {
  onOpenAuditModal: () => void;
  onOpenChat: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onOpenAuditModal, onOpenChat }) => {
  const { cmsData } = useCms();
  const faqs = cmsData.faqs && cmsData.faqs.length > 0 ? cmsData.faqs : [];

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const categories = ['All', 'General', 'Security & Tech', 'Pricing', 'Onboarding', 'Billing & Claims'];

  const filteredFaqs = faqs.filter((item: FAQItem) => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-[#F8FAFB] border-b border-slate-200/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F7F6] text-[#12304A] text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[#16A6A3]" />
            <span>Frequently Answered Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#12304A] tracking-tight mb-4">
            Answers for Dental Practice Owners
          </h2>
          <p className="text-base text-slate-600 max-w-2xl mx-auto">
            Everything you need to know about our remote VPN setup, CDT billing protocols, pricing, and rapid 1-week onboarding.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto mb-8">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search questions (e.g., VPN, Dentrix, BAA, pricing, appeals)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#16A6A3] focus:ring-2 focus:ring-[#16A6A3]/20 shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-slate-400 hover:text-slate-600 absolute right-4 top-1/2 -translate-y-1/2"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#12304A] text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="space-y-3 mb-12">
          {filteredFaqs.length === 0 ? (
            <div className="bg-white p-8 rounded-2xl text-center border border-slate-200">
              <p className="text-sm text-slate-500 mb-3">
                No matching questions found for &ldquo;{searchQuery}&rdquo;.
              </p>
              <button
                onClick={onOpenChat}
                className="text-xs font-bold text-[#16A6A3] hover:underline cursor-pointer"
              >
                Ask our Practice Support Desk instead &rarr;
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden transition-all shadow-xs"
                >
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <span className="text-sm sm:text-base font-bold text-[#12304A]">
                      {faq.question}
                    </span>
                    <span className="p-1 rounded-full bg-slate-100 text-slate-500 flex-shrink-0">
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-[#16A6A3]" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-[#F8FAFB]/50 animate-in fade-in duration-150">
                      <p>{faq.answer}</p>
                      <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-400">
                        <span className="font-semibold text-teal-700">
                          Category: {faq.category}
                        </span>
                        <span>Verified by DentiSure RCM Team</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Bottom Banner */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E8F7F6] text-[#16A6A3] flex items-center justify-center flex-shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#12304A]">
                Have a specific question about your dental PMS or claims backlog?
              </h4>
              <p className="text-xs text-slate-500">
                Our support team and specialists can review your practice requirements in minutes.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenChat}
              className="px-4 py-2 text-xs font-bold text-[#12304A] bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer transition-colors"
            >
              Open Support Desk
            </button>
            <button
              onClick={onOpenAuditModal}
              className="px-4 py-2 text-xs font-bold text-white bg-[#12304A] hover:bg-[#16A6A3] rounded-lg cursor-pointer transition-colors"
            >
              Speak with Specialist
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
