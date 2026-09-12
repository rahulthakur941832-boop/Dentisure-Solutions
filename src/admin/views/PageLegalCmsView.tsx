import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { ShieldCheck, Save, CheckCircle2, FileText, Lock, AlertCircle } from 'lucide-react';
import { LegalDocument } from '../../types';

export const PageLegalCmsView: React.FC = () => {
  const { cmsData, updateLegalDoc } = useCms();
  const [activeTab, setActiveTab] = useState<'hipaa' | 'terms' | 'privacy'>('hipaa');
  const [savedAlert, setSavedAlert] = useState(false);

  // Local state for each doc
  const [hipaaDoc, setHipaaDoc] = useState<LegalDocument>(cmsData.legal.hipaa);
  const [termsDoc, setTermsDoc] = useState<LegalDocument>(cmsData.legal.terms);
  const [privacyDoc, setPrivacyDoc] = useState<LegalDocument>(cmsData.legal.privacy);

  const triggerSaveToast = () => {
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 2500);
  };

  const handleSaveCurrent = () => {
    if (activeTab === 'hipaa') {
      updateLegalDoc('hipaa', hipaaDoc);
    } else if (activeTab === 'terms') {
      updateLegalDoc('terms', termsDoc);
    } else {
      updateLegalDoc('privacy', privacyDoc);
    }
    triggerSaveToast();
  };

  const currentDoc = activeTab === 'hipaa' ? hipaaDoc : activeTab === 'terms' ? termsDoc : privacyDoc;
  const setCurrentDoc = (doc: LegalDocument) => {
    if (activeTab === 'hipaa') setHipaaDoc(doc);
    else if (activeTab === 'terms') setTermsDoc(doc);
    else setPrivacyDoc(doc);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#16A6A3] bg-teal-50 px-2 py-0.5 rounded-md">
              Legal &amp; Compliance
            </span>
            <h1 className="text-xl font-bold text-slate-900">Legal Documents &amp; Policy Governance</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Maintain public-facing Privacy disclosures, Terms of Master Service Agreements, and Data Protection Policies.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {savedAlert && (
            <div className="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-xl text-xs font-bold flex items-center gap-1.5 animate-in fade-in">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Document Saved!</span>
            </div>
          )}
          <button
            onClick={handleSaveCurrent}
            className="px-4 py-2 bg-[#16A6A3] hover:bg-teal-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Save className="w-4 h-4" />
            <span>Save Active Document</span>
          </button>
        </div>
      </div>

      {/* Document Selector Pills */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100 rounded-xl border border-slate-200 text-xs font-bold">
        {[
          { id: 'hipaa', label: '1. Privacy & BAA Protocol', icon: ShieldCheck },
          { id: 'terms', label: '2. Terms of Master Service Agreement', icon: FileText },
          { id: 'privacy', label: '3. Data Privacy Policy', icon: Lock },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-white text-[#12304A] shadow-xs font-extrabold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Icon className="w-3.5 h-3.5 text-[#16A6A3]" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Document Editor */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block font-bold text-slate-700 mb-1">Document Display Title</label>
            <input
              type="text"
              value={currentDoc.title}
              onChange={(e) => setCurrentDoc({ ...currentDoc, title: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold text-sm"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">Last Revision Date</label>
            <input
              type="text"
              value={currentDoc.lastUpdated}
              onChange={(e) => setCurrentDoc({ ...currentDoc, lastUpdated: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
            />
          </div>
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">
            Markdown Document Content (Supports Markdown headers, bullet points, bolding)
          </label>
          <textarea
            rows={14}
            value={currentDoc.content}
            onChange={(e) => setCurrentDoc({ ...currentDoc, content: e.target.value })}
            className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-mono text-[11px] leading-relaxed focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>
    </div>
  );
};
