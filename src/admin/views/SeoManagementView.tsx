import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import {
  Globe,
  Save,
  CheckCircle2,
  Search,
  ExternalLink,
  AlertTriangle,
  Sparkles,
  Share2,
} from 'lucide-react';
import { SeoConfig } from '../../types';

export const SeoManagementView: React.FC = () => {
  const { cmsData, updateSection } = useCms();
  const [savedAlert, setSavedAlert] = useState(false);
  const [seo, setSeo] = useState<SeoConfig>(cmsData.seo);

  const triggerSaveToast = () => {
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 2500);
  };

  const handleSave = () => {
    updateSection('seo', seo);
    triggerSaveToast();
  };

  const titleLength = (seo.siteTitle || '').length;
  const descLength = (seo.metaDescription || '').length;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#16A6A3] bg-teal-50 px-2 py-0.5 rounded-md">
              Search Visibility
            </span>
            <h1 className="text-xl font-bold text-slate-900">SEO Studio &amp; SERP Simulator</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Optimize organic Google search appearance, Open Graph social share cards, and indexing robots directives.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {savedAlert && (
            <div className="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-xl text-xs font-bold flex items-center gap-1.5 animate-in fade-in">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>SEO Updated!</span>
            </div>
          )}
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-[#16A6A3] hover:bg-teal-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Save className="w-4 h-4" />
            <span>Save SEO Settings</span>
          </button>
        </div>
      </div>

      {/* Live Google SERP Preview Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-[#16A6A3]" />
            Live Google SERP Desktop Snippet Simulator
          </h2>
          <span className="text-[11px] text-slate-400 font-mono">Google Search Preview</span>
        </div>

        {/* Realistic Google Search Card */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 max-w-2xl font-sans">
          <div className="flex items-center gap-2 text-xs text-slate-800 mb-1">
            <span className="w-4 h-4 rounded-full bg-teal-600 text-white flex items-center justify-center text-[10px] font-bold">
              D
            </span>
            <span className="text-[11px] text-slate-700 font-medium truncate">
              {seo.canonicalUrl || 'https://dentisuresolutions.com'}
            </span>
            <span className="text-slate-400">&rsaquo; home</span>
          </div>

          <div className="text-base text-blue-800 hover:underline cursor-pointer font-medium leading-snug">
            {seo.siteTitle || 'DentiSure Solutions | Dental Billing & Claims Management'}
          </div>

          <div className="text-xs text-slate-600 mt-1 leading-relaxed line-clamp-2">
            {seo.metaDescription || 'Eliminate dental insurance aging AR and reclaim front-desk peace of mind.'}
          </div>
        </div>

        {/* Character Count Gauges */}
        <div className="flex flex-wrap items-center gap-6 pt-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-600">Title Length:</span>
            <span
              className={`font-mono font-bold px-2 py-0.5 rounded ${
                titleLength >= 45 && titleLength <= 65
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-100 text-amber-800'
              }`}
            >
              {titleLength} / 60 chars
            </span>
            {titleLength > 65 && (
              <span className="text-[11px] text-amber-700 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" /> May truncate on mobile
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-600">Description Length:</span>
            <span
              className={`font-mono font-bold px-2 py-0.5 rounded ${
                descLength >= 120 && descLength <= 165
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-100 text-amber-800'
              }`}
            >
              {descLength} / 160 chars
            </span>
          </div>
        </div>
      </div>

      {/* Meta Tag Fields */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-xs">
        <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Globe className="w-4 h-4 text-[#16A6A3]" />
          Primary Search Engine Meta Directives
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block font-bold text-slate-700 mb-1">Global Site Title Tag (&lt;title&gt;)</label>
            <input
              type="text"
              value={seo.siteTitle}
              onChange={(e) => setSeo({ ...seo, siteTitle: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block font-bold text-slate-700 mb-1">Meta Description</label>
            <textarea
              rows={3}
              value={seo.metaDescription}
              onChange={(e) => setSeo({ ...seo, metaDescription: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl leading-relaxed"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block font-bold text-slate-700 mb-1">Meta Keywords (comma-separated)</label>
            <textarea
              rows={2}
              value={seo.keywords}
              onChange={(e) => setSeo({ ...seo, keywords: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono text-[11px]"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Canonical URL</label>
            <input
              type="text"
              value={seo.canonicalUrl}
              onChange={(e) => setSeo({ ...seo, canonicalUrl: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono text-[11px]"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Robots Directive</label>
            <select
              value={seo.robots || 'index, follow'}
              onChange={(e) => setSeo({ ...seo, robots: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl cursor-pointer"
            >
              <option value="index, follow">index, follow (Recommended for production)</option>
              <option value="noindex, nofollow">noindex, nofollow (Staging / Private)</option>
              <option value="noindex, follow">noindex, follow</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Google Analytics Measurement ID</label>
            <input
              type="text"
              value={seo.analyticsId}
              onChange={(e) => setSeo({ ...seo, analyticsId: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono text-[11px]"
              placeholder="G-XXXXXXXXXX"
            />
          </div>
        </div>
      </div>

      {/* Open Graph Social Sharing Cards */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-xs">
        <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Share2 className="w-4 h-4 text-[#16A6A3]" />
          Open Graph &amp; Social Media Share Cards (LinkedIn, Twitter/X, Facebook)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1">og:title</label>
            <input
              type="text"
              value={seo.ogTitle}
              onChange={(e) => setSeo({ ...seo, ogTitle: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">og:image URL</label>
            <input
              type="text"
              value={seo.ogImage}
              onChange={(e) => setSeo({ ...seo, ogImage: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono text-[11px]"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block font-bold text-slate-700 mb-1">og:description</label>
            <textarea
              rows={2}
              value={seo.ogDescription}
              onChange={(e) => setSeo({ ...seo, ogDescription: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
