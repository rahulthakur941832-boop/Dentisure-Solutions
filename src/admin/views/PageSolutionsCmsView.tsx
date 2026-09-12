import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import {
  Layers,
  Save,
  CheckCircle2,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Workflow,
  Sparkles,
} from 'lucide-react';
import { ServicePillar } from '../../types';

export const PageSolutionsCmsView: React.FC = () => {
  const { cmsData, updateSection, saveToServer } = useCms();
  const [savedAlert, setSavedAlert] = useState(false);

  const [solutionsHero, setSolutionsHero] = useState(cmsData.solutionsPage);
  const [servicesHeader, setServicesHeader] = useState({
    title: cmsData.services?.title || 'Comprehensive Dental Revenue Architecture',
    subtitle:
      cmsData.services?.subtitle ||
      'Modular, end-to-end insurance claim billing, daily posting, and aggressive aging AR recovery.',
  });
  const [pillars, setPillars] = useState<ServicePillar[]>(cmsData.services?.pillars || []);

  const triggerSaveToast = () => {
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 2500);
  };

  const handleSaveAll = async () => {
    const updatedServices = {
      title: servicesHeader.title,
      subtitle: servicesHeader.subtitle,
      pillars,
    };
    updateSection('solutionsPage', solutionsHero);
    updateSection('services', updatedServices);
    await saveToServer({
      ...cmsData,
      solutionsPage: solutionsHero,
      services: updatedServices,
    });
    triggerSaveToast();
  };

  const movePillar = (index: number, direction: 'up' | 'down') => {
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= pillars.length) return;
    const copy = [...pillars];
    const temp = copy[index];
    copy[index] = copy[target];
    copy[target] = temp;
    setPillars(copy);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#16A6A3] bg-teal-50 px-2 py-0.5 rounded-md">
              Page Editor
            </span>
            <h1 className="text-xl font-bold text-slate-900">Solutions &amp; Service Pillars</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Edit service offerings, operational workflows, KPI impact metrics, and claim lifecycle stages.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {savedAlert && (
            <div className="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-xl text-xs font-bold flex items-center gap-1.5 animate-in fade-in">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Saved to Live Site!</span>
            </div>
          )}
          <button
            onClick={handleSaveAll}
            className="px-4 py-2 bg-[#16A6A3] hover:bg-teal-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Save className="w-4 h-4" />
            <span>Save Solutions</span>
          </button>
        </div>
      </div>

      {/* Hero Headline Box */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-xs">
        <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Workflow className="w-4 h-4 text-[#16A6A3]" />
          Solutions Page Hero Headlines
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block font-bold text-slate-700 mb-1">Hero Title</label>
            <input
              type="text"
              value={solutionsHero.heroTitle}
              onChange={(e) => setSolutionsHero({ ...solutionsHero, heroTitle: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block font-bold text-slate-700 mb-1">Hero Subtitle</label>
            <textarea
              rows={2}
              value={solutionsHero.heroSubtitle}
              onChange={(e) => setSolutionsHero({ ...solutionsHero, heroSubtitle: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">Services Section Title</label>
            <input
              type="text"
              value={servicesHeader.title}
              onChange={(e) => setServicesHeader({ ...servicesHeader, title: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">Services Section Subtitle</label>
            <input
              type="text"
              value={servicesHeader.subtitle}
              onChange={(e) => setServicesHeader({ ...servicesHeader, subtitle: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
            />
          </div>
        </div>
      </div>

      {/* Pillars List */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5 text-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div>
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#16A6A3]" />
              Core Service Pillars ({pillars.length})
            </h2>
            <p className="text-xs text-slate-500">
              Reorder pillars using the arrows; changes instantly reflect on the public site.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              const newP: ServicePillar = {
                id: `pillar-${Date.now()}`,
                title: 'New Service Pillar',
                subtitle: 'Comprehensive revenue enhancement for practice workflows.',
                badge: 'Specialized Track',
                metricsImpact: '99% Clean Submission',
                workflowDetail: 'Our certified remote teams log into your PMS to execute thorough verification and appeals.',
                iconName: 'ShieldCheck',
                deliverables: ['Dedicated billing team', 'Bi-weekly ledger review', 'HIPAA-ready encrypted VPN access'],
                enabled: true,
              };
              setPillars([...pillars, newP]);
            }}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Service Pillar</span>
          </button>
        </div>

        <div className="space-y-4">
          {pillars.map((pillar, idx) => (
            <div key={pillar.id || idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#12304A] text-white flex items-center justify-center font-bold text-[11px]">
                    {idx + 1}
                  </span>
                  <div className="font-bold text-slate-900 text-sm">{pillar.title}</div>
                  {pillar.badge && (
                    <span className="text-[11px] px-2 py-0.5 rounded bg-teal-100 text-teal-800 font-semibold">
                      {pillar.badge}
                    </span>
                  )}
                  {pillar.metricsImpact && (
                    <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                      {pillar.metricsImpact}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={idx === 0}
                    onClick={() => movePillar(idx, 'up')}
                    className="p-1 hover:bg-slate-200 rounded disabled:opacity-30 cursor-pointer"
                    title="Move Up"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    disabled={idx === pillars.length - 1}
                    onClick={() => movePillar(idx, 'down')}
                    className="p-1 hover:bg-slate-200 rounded disabled:opacity-30 cursor-pointer"
                    title="Move Down"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setPillars(pillars.filter((_, i) => i !== idx))}
                    className="p-1 text-rose-500 hover:bg-rose-50 rounded cursor-pointer"
                    title="Delete Service"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-500 font-semibold">Pillar Title</label>
                  <input
                    type="text"
                    value={pillar.title}
                    onChange={(e) => {
                      const copy = [...pillars];
                      copy[idx].title = e.target.value;
                      setPillars(copy);
                    }}
                    className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-500 font-semibold">Badge Tag</label>
                  <input
                    type="text"
                    value={pillar.badge}
                    onChange={(e) => {
                      const copy = [...pillars];
                      copy[idx].badge = e.target.value;
                      setPillars(copy);
                    }}
                    className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-500 font-semibold">Key Metrics Impact</label>
                  <input
                    type="text"
                    value={pillar.metricsImpact}
                    onChange={(e) => {
                      const copy = [...pillars];
                      copy[idx].metricsImpact = e.target.value;
                      setPillars(copy);
                    }}
                    className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-bold text-teal-700"
                  />
                </div>
                <div className="sm:col-span-3">
                  <label className="block text-[11px] text-slate-500 font-semibold">Subtitle / Summary</label>
                  <input
                    type="text"
                    value={pillar.subtitle}
                    onChange={(e) => {
                      const copy = [...pillars];
                      copy[idx].subtitle = e.target.value;
                      setPillars(copy);
                    }}
                    className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
                  />
                </div>
                <div className="sm:col-span-3">
                  <label className="block text-[11px] text-slate-500 font-semibold">Workflow Detail Description</label>
                  <textarea
                    rows={2}
                    value={pillar.workflowDetail}
                    onChange={(e) => {
                      const copy = [...pillars];
                      copy[idx].workflowDetail = e.target.value;
                      setPillars(copy);
                    }}
                    className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
                  />
                </div>
                <div className="sm:col-span-3">
                  <label className="block text-[11px] text-slate-500 font-semibold mb-1">
                    Deliverables (one per line)
                  </label>
                  <textarea
                    rows={3}
                    value={(pillar.deliverables || []).join('\n')}
                    onChange={(e) => {
                      const copy = [...pillars];
                      copy[idx].deliverables = e.target.value.split('\n').filter((l) => l.trim().length > 0);
                      setPillars(copy);
                    }}
                    className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-mono text-[11px]"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
