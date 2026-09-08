import React, { useState } from 'react';
import { useCms } from '../context/CmsContext';
import { ResourceArticle, NavigationPage } from '../types';
import {
  BookOpen,
  Search,
  Clock,
  ArrowRight,
  X,
  CalendarCheck,
  Download,
} from 'lucide-react';

interface BlogPageProps {
  onOpenAuditModal: () => void;
  onNavigate: (page: NavigationPage) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({
  onOpenAuditModal,
}) => {
  const { cmsData } = useCms();
  const articlesList = cmsData.blog || [];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [readingArticle, setReadingArticle] = useState<ResourceArticle | null>(null);

  const categories = ['All', 'Practice Guides', 'CDT Coding', 'Revenue Cycle', 'Case Studies'];

  const filteredArticles = articlesList.filter((article) => {
    const matchesCategory =
      selectedCategory === 'All' || article.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.snippet.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#F8FAFB] text-[#12304A]">
      {/* 1. Blog Header */}
      <section className="bg-white border-b border-slate-200 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#E8F7F6] text-[#12304A] text-xs font-bold uppercase tracking-wider mb-4">
            <BookOpen className="w-3.5 h-3.5 text-[#16A6A3]" />
            <span>Dental Billing Knowledge Hub</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#12304A] tracking-tight mb-6">
            Clinical Guides, CDT Coding &amp; Practice Revenue SOPs
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8">
            Expert insights from our senior US dental billing architects. Learn how to prevent attachment denials, slash 90+ day AR, and streamline patient eligibility verification.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by topic, CDT code, AR recovery, or clearinghouse..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#16A6A3] shadow-xs"
            />
          </div>
        </div>
      </section>

      {/* 2. Category Filter & Articles Grid */}
      <section className="py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Tabs */}
          <div className="flex overflow-x-auto pb-3 mb-10 gap-2 scrollbar-none justify-start sm:justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#12304A] text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:border-[#16A6A3]/60 transition-all flex flex-col justify-between"
              >
                <div className="p-6 sm:p-7">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                    <span className="font-bold text-[#16A6A3] bg-teal-50 px-2.5 py-1 rounded-md border border-teal-100">
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {article.readTime}
                    </span>
                  </div>

                  <h2 className="font-extrabold text-lg text-[#12304A] leading-snug mb-3">
                    {article.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-4 mb-4">
                    {article.snippet}
                  </p>
                </div>

                <div className="p-6 pt-0 border-t border-slate-100 mt-auto">
                  <div className="flex items-center justify-between pt-4">
                    <span className="text-[11px] text-slate-400">
                      {article.date}
                    </span>
                    <button
                      onClick={() => setReadingArticle(article)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#12304A] hover:text-[#16A6A3] transition-colors cursor-pointer group"
                    >
                      <span>Read Full Guide</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
              <p className="text-slate-500 text-sm mb-2">No articles found matching &quot;{searchQuery}&quot;</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="text-xs font-bold text-[#16A6A3] hover:underline cursor-pointer"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 3. Featured 23-Point Verification Checklist Download Box */}
      <section className="py-14 bg-white border-t border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="bg-[#F8FAFB] border border-slate-200 rounded-2xl p-6 sm:p-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <span className="text-xs font-bold text-[#16A6A3] uppercase tracking-wider block mb-1">
                  Complimentary Practice Resource
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#12304A] mb-2">
                  The 23-Point Dental Insurance Verification SOP Checklist
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
                  Download our complete clinical checklist covering annual maximums, frequency limitations, missing tooth clauses, and composite downgrade rules.
                </p>
              </div>
              <button
                onClick={() => onOpenAuditModal()}
                className="px-6 py-3.5 bg-[#12304A] hover:bg-[#16A6A3] text-white font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer whitespace-nowrap flex items-center gap-2 shadow-sm"
              >
                <Download className="w-4 h-4 text-teal-300" />
                <span>Request Free Checklist PDF</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Full Article Reading Modal */}
      {readingArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-slate-200">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold px-2.5 py-1 bg-teal-100 text-teal-800 rounded-md">
                  {readingArticle.category}
                </span>
                <span className="text-xs text-slate-500">{readingArticle.readTime}</span>
              </div>
              <button
                onClick={() => setReadingArticle(null)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6 text-[#12304A]">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight mb-3">
                  {readingArticle.title}
                </h2>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span>Published: {readingArticle.date}</span>
                  <span>•</span>
                  <span>Author: {readingArticle.author}</span>
                </div>
              </div>

              <div className="p-4 bg-teal-50/70 border border-teal-200/80 rounded-xl text-xs sm:text-sm text-slate-700 leading-relaxed">
                <strong>Executive Summary:</strong> {readingArticle.snippet}
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                {readingArticle.content.map((paragraph, index) => (
                  <p key={index} className="leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="pt-6 border-t border-slate-200 bg-[#F8FAFB] -mx-6 sm:-mx-8 -mb-6 sm:-mb-8 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-extrabold text-sm text-[#12304A]">
                    Need Help Implementing These Protocols?
                  </h4>
                  <p className="text-xs text-slate-500">
                    Our US dental billing specialists can audit your claims ledger for free.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setReadingArticle(null);
                    onOpenAuditModal();
                  }}
                  className="px-5 py-2.5 bg-[#16A6A3] hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer whitespace-nowrap flex items-center gap-2"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>Request Free Practice Audit</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
