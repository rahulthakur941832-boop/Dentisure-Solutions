import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { PricingTierItem } from '../../types';
import {
  DollarSign,
  Save,
  CheckCircle2,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Percent,
  Star,
} from 'lucide-react';

export const PagePricingCmsView: React.FC = () => {
  const { cmsData, updateSection } = useCms();
  const [savedAlert, setSavedAlert] = useState(false);

  const [pricingHeader, setPricingHeader] = useState({
    title: cmsData.pricing?.title || 'Contingency-Based Dental Billing — Only Pay When You Collect',
    subtitle:
      cmsData.pricing?.subtitle ||
      'No upfront setup fees, no software replacement costs, and no long-term restrictive locks.',
    guaranteeText:
      cmsData.pricing?.guaranteeText ||
      '100% Performance Guarantee: You never pay a dollar for uncollected or denied claims.',
  });

  const [tiers, setTiers] = useState<PricingTierItem[]>(cmsData.pricing?.tiers || []);

  const triggerSaveToast = () => {
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 2500);
  };

  const handleSaveAll = () => {
    updateSection('pricing', {
      title: pricingHeader.title,
      subtitle: pricingHeader.subtitle,
      guaranteeText: pricingHeader.guaranteeText,
      tiers,
    });
    triggerSaveToast();
  };

  const moveTier = (index: number, direction: 'up' | 'down') => {
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= tiers.length) return;
    const copy = [...tiers];
    const temp = copy[index];
    copy[index] = copy[target];
    copy[target] = temp;
    setTiers(copy);
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
            <h1 className="text-xl font-bold text-slate-900">Pricing &amp; Contingency Tiers</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Configure percentage contingency rates, performance guarantees, and volume threshold tiers.
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
            <span>Save Pricing Data</span>
          </button>
        </div>
      </div>

      {/* Hero & Contingency Policy */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-xs">
        <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Percent className="w-4 h-4 text-[#16A6A3]" />
          Pricing Page Headlines &amp; Guarantee Policy
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block font-bold text-slate-700 mb-1">Pricing Page Main Title</label>
            <input
              type="text"
              value={pricingHeader.title}
              onChange={(e) => setPricingHeader({ ...pricingHeader, title: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold text-sm"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block font-bold text-slate-700 mb-1">Pricing Subtitle</label>
            <textarea
              rows={2}
              value={pricingHeader.subtitle}
              onChange={(e) => setPricingHeader({ ...pricingHeader, subtitle: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block font-bold text-slate-700 mb-1">Contingency Guarantee Statement</label>
            <input
              type="text"
              value={pricingHeader.guaranteeText}
              onChange={(e) => setPricingHeader({ ...pricingHeader, guaranteeText: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold text-teal-800"
            />
          </div>
        </div>
      </div>

      {/* Pricing Tiers */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5 text-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div>
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-[#16A6A3]" />
              Contingency Plans &amp; Volume Tiers ({tiers.length})
            </h2>
            <p className="text-xs text-slate-500">
              Configure contingency percentages, target practice sizes, and inclusions.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              const newTier: PricingTierItem = {
                name: 'Custom DSO Model',
                tag: 'Multi-Location',
                price: '2.5% - 2.9%',
                unit: 'of collected insurance revenue',
                idealFor: 'Multi-location DSO producing $250k+/month',
                features: ['Custom PMS integrations', 'Dedicated Pod Manager', 'Executive dashboard'],
                cta: 'Request Custom Proposal',
                highlight: false,
                enabled: true,
              };
              setTiers([...tiers, newTier]);
            }}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Pricing Tier</span>
          </button>
        </div>

        <div className="space-y-4">
          {tiers.map((tier, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border space-y-3 transition-colors ${
                tier.highlight ? 'bg-teal-50/40 border-teal-300' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 text-sm">{tier.name}</span>
                  <span className="px-2 py-0.5 rounded bg-teal-100 text-teal-800 font-extrabold text-xs">
                    {tier.price}
                  </span>
                  {tier.highlight && (
                    <span className="px-2 py-0.5 rounded-full bg-teal-600 text-white font-bold text-[10px] flex items-center gap-1">
                      <Star className="w-3 h-3 fill-white" />
                      Featured Card
                    </span>
                  )}
                  {tier.tag && (
                    <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-semibold text-[10px]">
                      {tier.tag}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={idx === 0}
                    onClick={() => moveTier(idx, 'up')}
                    className="p-1 hover:bg-slate-200 rounded disabled:opacity-30 cursor-pointer"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    disabled={idx === tiers.length - 1}
                    onClick={() => moveTier(idx, 'down')}
                    className="p-1 hover:bg-slate-200 rounded disabled:opacity-30 cursor-pointer"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setTiers(tiers.filter((_, i) => i !== idx))}
                    className="p-1 text-rose-500 hover:bg-rose-50 rounded cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-500 font-semibold">Tier Name</label>
                  <input
                    type="text"
                    value={tier.name}
                    onChange={(e) => {
                      const copy = [...tiers];
                      copy[idx].name = e.target.value;
                      setTiers(copy);
                    }}
                    className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-500 font-semibold">Percentage Rate / Price</label>
                  <input
                    type="text"
                    value={tier.price}
                    onChange={(e) => {
                      const copy = [...tiers];
                      copy[idx].price = e.target.value;
                      setTiers(copy);
                    }}
                    className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-black text-teal-700"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-500 font-semibold">Unit / Description</label>
                  <input
                    type="text"
                    value={tier.unit}
                    onChange={(e) => {
                      const copy = [...tiers];
                      copy[idx].unit = e.target.value;
                      setTiers(copy);
                    }}
                    className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-500 font-semibold">Badge Tag</label>
                  <input
                    type="text"
                    value={tier.tag}
                    onChange={(e) => {
                      const copy = [...tiers];
                      copy[idx].tag = e.target.value;
                      setTiers(copy);
                    }}
                    className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] text-slate-500 font-semibold">Ideal Practice Profile</label>
                  <input
                    type="text"
                    value={tier.idealFor}
                    onChange={(e) => {
                      const copy = [...tiers];
                      copy[idx].idealFor = e.target.value;
                      setTiers(copy);
                    }}
                    className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-500 font-semibold">CTA Button Text</label>
                  <input
                    type="text"
                    value={tier.cta}
                    onChange={(e) => {
                      const copy = [...tiers];
                      copy[idx].cta = e.target.value;
                      setTiers(copy);
                    }}
                    className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
                  />
                </div>

                <div className="flex items-center gap-2 pt-4">
                  <label className="flex items-center gap-2 text-[11px] font-bold text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={tier.highlight}
                      onChange={(e) => {
                        const copy = [...tiers];
                        copy[idx].highlight = e.target.checked;
                        setTiers(copy);
                      }}
                      className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                    />
                    <span>Highlight Card (Dark Navy Style)</span>
                  </label>
                </div>

                <div className="sm:col-span-4">
                  <label className="block text-[11px] text-slate-500 font-semibold mb-1">
                    Features &amp; Inclusions (one per line)
                  </label>
                  <textarea
                    rows={3}
                    value={(tier.features || []).join('\n')}
                    onChange={(e) => {
                      const copy = [...tiers];
                      copy[idx].features = e.target.value.split('\n').filter((l) => l.trim().length > 0);
                      setTiers(copy);
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
