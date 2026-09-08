import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import {
  Layers,
  Sparkles,
  Save,
  CheckCircle2,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  HelpCircle,
  MessageSquareQuote,
  ShieldCheck,
  Eye,
  Sliders,
} from 'lucide-react';
import { FAQItem, TestimonialItem } from '../../types';

export const PageHomeCmsView: React.FC = () => {
  const { cmsData, updateSection } = useCms();
  const [activeSubTab, setActiveSubTab] = useState<'hero' | 'metrics' | 'why' | 'testimonials' | 'faq' | 'cta'>('hero');
  const [savedAlert, setSavedAlert] = useState(false);

  // Local working copy of home data
  const [hero, setHero] = useState(cmsData.hero);
  const [metrics, setMetrics] = useState(cmsData.trustMetrics);
  const [whyChoose, setWhyChoose] = useState(cmsData.whyChoose);
  const [testimonials, setTestimonials] = useState(cmsData.testimonials);
  const [faqs, setFaqs] = useState(cmsData.faqs);
  const [finalCta, setFinalCta] = useState({
    title: cmsData.pricing?.guaranteeText || '100% Contingency Guarantee',
    subtitle: 'Zero setup fees. You only pay when your dental practice gets paid by insurance.',
    guaranteePill: 'Zero Financial Risk',
    buttonText: 'Claim Your Practice Audit',
  });

  const triggerSaveToast = () => {
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 2500);
  };

  const handleSaveHero = () => {
    updateSection('hero', hero);
    triggerSaveToast();
  };

  const handleSaveMetrics = () => {
    updateSection('trustMetrics', metrics);
    triggerSaveToast();
  };

  const handleSaveWhyChoose = () => {
    updateSection('whyChoose', whyChoose);
    triggerSaveToast();
  };

  const handleSaveTestimonials = () => {
    updateSection('testimonials', testimonials);
    triggerSaveToast();
  };

  const handleSaveFaqs = () => {
    updateSection('faqs', faqs);
    triggerSaveToast();
  };

  const handleSaveFinalCta = () => {
    updateSection('pricing', {
      ...cmsData.pricing,
      guaranteeText: finalCta.title,
    });
    triggerSaveToast();
  };

  // Reordering helpers
  const moveItem = <T,>(list: T[], index: number, direction: 'up' | 'down'): T[] => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= list.length) return list;
    const copy = [...list];
    const temp = copy[index];
    copy[index] = copy[targetIndex];
    copy[targetIndex] = temp;
    return copy;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#16A6A3] bg-teal-50 px-2 py-0.5 rounded-md">
              Page Editor
            </span>
            <h1 className="text-xl font-bold text-slate-900">Home Page Content Management</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Update headline copy, secondary hero sliders, trust metrics, testimonials, and FAQs for the main landing experience.
          </p>
        </div>

        {savedAlert && (
          <div className="px-3.5 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-xl text-xs font-bold flex items-center gap-1.5 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Saved to Live Site!</span>
          </div>
        )}
      </div>

      {/* Sub-Tabs Navigation */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100 rounded-xl border border-slate-200 text-xs font-bold">
        {[
          { id: 'hero', label: '1. Hero & Secondary Slides' },
          { id: 'metrics', label: '2. Trust Metrics Strip' },
          { id: 'why', label: '3. Why Choose Pillars' },
          { id: 'testimonials', label: `4. Testimonials (${testimonials.length})` },
          { id: 'faq', label: `5. FAQs (${faqs.length})` },
          { id: 'cta', label: '6. Bottom CTA Strip' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id as any)}
            className={`px-3.5 py-2 rounded-lg transition-all cursor-pointer ${
              activeSubTab === tab.id
                ? 'bg-white text-[#12304A] shadow-xs font-extrabold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* SUB-TAB 1: HERO SECTION */}
      {activeSubTab === 'hero' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Main Hero Headline &amp; Buttons</h2>
              <p className="text-xs text-slate-500">Above-the-fold value proposition and primary CTAs.</p>
            </div>
            <button
              onClick={handleSaveHero}
              className="px-4 py-2 bg-[#16A6A3] hover:bg-teal-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Save className="w-4 h-4" />
              <span>Save Hero Section</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Top Badge Pill</label>
              <input
                type="text"
                value={hero.badge}
                onChange={(e) => setHero({ ...hero, badge: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Highlight Word / Keyword</label>
              <input
                type="text"
                value={hero.highlightedWord}
                onChange={(e) => setHero({ ...hero, highlightedWord: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:bg-white"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-bold text-slate-700 mb-1">Main H1 Title</label>
              <input
                type="text"
                value={hero.title}
                onChange={(e) => setHero({ ...hero, title: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-teal-500 focus:bg-white"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-bold text-slate-700 mb-1">Subtitle / Body Paragraph</label>
              <textarea
                rows={3}
                value={hero.subtitle}
                onChange={(e) => setHero({ ...hero, subtitle: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Primary CTA Button</label>
              <input
                type="text"
                value={hero.ctaPrimary}
                onChange={(e) => setHero({ ...hero, ctaPrimary: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Secondary CTA Button</label>
              <input
                type="text"
                value={hero.ctaSecondary}
                onChange={(e) => setHero({ ...hero, ctaSecondary: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:bg-white"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-bold text-slate-700 mb-1">Hero Image URL</label>
              <input
                type="text"
                value={hero.heroImage}
                onChange={(e) => setHero({ ...hero, heroImage: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono text-[11px] focus:ring-2 focus:ring-teal-500 focus:bg-white"
              />
            </div>
          </div>

          {/* Secondary Hero Carousel Slides */}
          <div className="pt-6 border-t border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Secondary Rotating Carousel Slides ({hero.secondarySlides.length})
                </h3>
                <p className="text-[11px] text-slate-500">Feature bullets displayed on the interactive hero rotator.</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setHero({
                    ...hero,
                    secondarySlides: [
                      ...hero.secondarySlides,
                      {
                        title: 'New Service Capability',
                        subtitle: 'Detailed benefit description for dental practices.',
                        metric: '+98% Scrubbed',
                        badge: 'New Feature',
                      },
                    ],
                  });
                }}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Slide</span>
              </button>
            </div>

            <div className="space-y-3">
              {hero.secondarySlides.map((slide, idx) => (
                <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-700 text-xs">Slide #{idx + 1}</span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        disabled={idx === 0}
                        onClick={() => {
                          const updated = moveItem(hero.secondarySlides, idx, 'up');
                          setHero({ ...hero, secondarySlides: updated });
                        }}
                        className="p-1 hover:bg-slate-200 rounded disabled:opacity-30 cursor-pointer"
                        title="Move Up"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        disabled={idx === hero.secondarySlides.length - 1}
                        onClick={() => {
                          const updated = moveItem(hero.secondarySlides, idx, 'down');
                          setHero({ ...hero, secondarySlides: updated });
                        }}
                        className="p-1 hover:bg-slate-200 rounded disabled:opacity-30 cursor-pointer"
                        title="Move Down"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setHero({
                            ...hero,
                            secondarySlides: hero.secondarySlides.filter((_, i) => i !== idx),
                          });
                        }}
                        className="p-1 text-rose-500 hover:bg-rose-50 rounded cursor-pointer"
                        title="Delete Slide"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                    <div>
                      <label className="block text-[11px] text-slate-500 font-semibold">Title</label>
                      <input
                        type="text"
                        value={slide.title}
                        onChange={(e) => {
                          const updated = [...hero.secondarySlides];
                          updated[idx].title = e.target.value;
                          setHero({ ...hero, secondarySlides: updated });
                        }}
                        className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-500 font-semibold">Badge</label>
                      <input
                        type="text"
                        value={slide.badge}
                        onChange={(e) => {
                          const updated = [...hero.secondarySlides];
                          updated[idx].badge = e.target.value;
                          setHero({ ...hero, secondarySlides: updated });
                        }}
                        className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-500 font-semibold">Metric</label>
                      <input
                        type="text"
                        value={slide.metric}
                        onChange={(e) => {
                          const updated = [...hero.secondarySlides];
                          updated[idx].metric = e.target.value;
                          setHero({ ...hero, secondarySlides: updated });
                        }}
                        className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-bold text-teal-700"
                      />
                    </div>
                    <div className="sm:col-span-3">
                      <label className="block text-[11px] text-slate-500 font-semibold">Subtitle</label>
                      <input
                        type="text"
                        value={slide.subtitle}
                        onChange={(e) => {
                          const updated = [...hero.secondarySlides];
                          updated[idx].subtitle = e.target.value;
                          setHero({ ...hero, secondarySlides: updated });
                        }}
                        className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: TRUST METRICS STRIP */}
      {activeSubTab === 'metrics' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Trust Metrics Strip</h2>
              <p className="text-xs text-slate-500">The 4 high-impact numerical stats under the hero banner.</p>
            </div>
            <button
              onClick={handleSaveMetrics}
              className="px-4 py-2 bg-[#16A6A3] hover:bg-teal-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Save className="w-4 h-4" />
              <span>Save Metrics</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {metrics.map((item, idx) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
                <div className="font-bold text-slate-700">Metric #{idx + 1}</div>
                <div>
                  <label className="block text-[11px] text-slate-500 font-semibold">Stat Value</label>
                  <input
                    type="text"
                    value={item.value}
                    onChange={(e) => {
                      const copy = [...metrics];
                      copy[idx].value = e.target.value;
                      setMetrics(copy);
                    }}
                    className="w-full p-2 bg-white border border-slate-300 rounded-lg font-black text-slate-900 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-500 font-semibold">Label</label>
                  <input
                    type="text"
                    value={item.label}
                    onChange={(e) => {
                      const copy = [...metrics];
                      copy[idx].label = e.target.value;
                      setMetrics(copy);
                    }}
                    className="w-full p-2 bg-white border border-slate-300 rounded-lg font-bold text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-500 font-semibold">Description</label>
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) => {
                      const copy = [...metrics];
                      copy[idx].description = e.target.value;
                      setMetrics(copy);
                    }}
                    className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: WHY CHOOSE PILLARS */}
      {activeSubTab === 'why' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Why Practices Choose DentiSure</h2>
              <p className="text-xs text-slate-500">Core differentiators displayed on the homepage comparison grid.</p>
            </div>
            <button
              onClick={handleSaveWhyChoose}
              className="px-4 py-2 bg-[#16A6A3] hover:bg-teal-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Save className="w-4 h-4" />
              <span>Save Why Choose Section</span>
            </button>
          </div>

          <div className="space-y-3">
            {whyChoose.map((item, idx) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-slate-800">Pillar #{idx + 1}</div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => setWhyChoose(moveItem(whyChoose, idx, 'up'))}
                      className="p-1 hover:bg-slate-200 rounded disabled:opacity-30 cursor-pointer"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === whyChoose.length - 1}
                      onClick={() => setWhyChoose(moveItem(whyChoose, idx, 'down'))}
                      className="p-1 hover:bg-slate-200 rounded disabled:opacity-30 cursor-pointer"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] text-slate-500 font-semibold">Title</label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => {
                        const copy = [...whyChoose];
                        copy[idx].title = e.target.value;
                        setWhyChoose(copy);
                      }}
                      className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-500 font-semibold">Stat Pill</label>
                    <input
                      type="text"
                      value={item.stat}
                      onChange={(e) => {
                        const copy = [...whyChoose];
                        copy[idx].stat = e.target.value;
                        setWhyChoose(copy);
                      }}
                      className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs text-teal-700 font-bold"
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <label className="block text-[11px] text-slate-500 font-semibold">Description</label>
                    <textarea
                      rows={2}
                      value={item.description}
                      onChange={(e) => {
                        const copy = [...whyChoose];
                        copy[idx].description = e.target.value;
                        setWhyChoose(copy);
                      }}
                      className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 4: TESTIMONIALS */}
      {activeSubTab === 'testimonials' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Doctor Endorsements &amp; Case Quotes</h2>
              <p className="text-xs text-slate-500">Manage verified dentist reviews, practice results, and avatars.</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  const newT: TestimonialItem = {
                    id: `test-${Date.now()}`,
                    doctorName: 'Dr. New Doctor, DDS',
                    role: 'Founder & Managing Partner',
                    practiceName: 'Horizon Dental Group',
                    location: 'Austin, TX',
                    pms: 'Dentrix G7',
                    quote: 'DentiSure eliminated our 90-day aging queue within four weeks.',
                    metricsResult: '+26% Net Clean Collections',
                    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80',
                    rating: 5,
                    enabled: true,
                  };
                  setTestimonials([newT, ...testimonials]);
                }}
                className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Testimonial</span>
              </button>
              <button
                onClick={handleSaveTestimonials}
                className="px-4 py-2 bg-[#16A6A3] hover:bg-teal-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Save className="w-4 h-4" />
                <span>Save Testimonials</span>
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {testimonials.map((test, idx) => (
              <div key={test.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img src={test.image} alt={test.doctorName} className="w-8 h-8 rounded-full object-cover border border-slate-300" />
                    <div>
                      <div className="font-bold text-slate-900">{test.doctorName}</div>
                      <div className="text-[11px] text-slate-500">{test.practiceName} &bull; {test.pms}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => setTestimonials(moveItem(testimonials, idx, 'up'))}
                      className="p-1 hover:bg-slate-200 rounded disabled:opacity-30 cursor-pointer"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === testimonials.length - 1}
                      onClick={() => setTestimonials(moveItem(testimonials, idx, 'down'))}
                      className="p-1 hover:bg-slate-200 rounded disabled:opacity-30 cursor-pointer"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setTestimonials(testimonials.filter((_, i) => i !== idx))}
                      className="p-1 text-rose-500 hover:bg-rose-50 rounded cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] text-slate-500 font-semibold">Doctor Name</label>
                    <input
                      type="text"
                      value={test.doctorName}
                      onChange={(e) => {
                        const copy = [...testimonials];
                        copy[idx].doctorName = e.target.value;
                        setTestimonials(copy);
                      }}
                      className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-500 font-semibold">Practice &amp; City</label>
                    <input
                      type="text"
                      value={test.practiceName}
                      onChange={(e) => {
                        const copy = [...testimonials];
                        copy[idx].practiceName = e.target.value;
                        setTestimonials(copy);
                      }}
                      className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-500 font-semibold">Verified Metrics Result</label>
                    <input
                      type="text"
                      value={test.metricsResult}
                      onChange={(e) => {
                        const copy = [...testimonials];
                        copy[idx].metricsResult = e.target.value;
                        setTestimonials(copy);
                      }}
                      className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-bold text-teal-700"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] text-slate-500 font-semibold">Quote Text</label>
                    <textarea
                      rows={2}
                      value={test.quote}
                      onChange={(e) => {
                        const copy = [...testimonials];
                        copy[idx].quote = e.target.value;
                        setTestimonials(copy);
                      }}
                      className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-500 font-semibold">Avatar Image URL</label>
                    <input
                      type="text"
                      value={test.image}
                      onChange={(e) => {
                        const copy = [...testimonials];
                        copy[idx].image = e.target.value;
                        setTestimonials(copy);
                      }}
                      className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-mono text-[11px]"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 5: FAQS */}
      {activeSubTab === 'faq' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Frequently Asked Questions</h2>
              <p className="text-xs text-slate-500">Address practice onboarding, PMS compatibility, and HIPAA compliance.</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  const newF: FAQItem = {
                    id: `faq-${Date.now()}`,
                    question: 'How do you handle denied or rejected claims?',
                    answer: 'Our senior claims team appeals denials within 48 hours with required x-rays, narrative justifications, and periodontal charting.',
                    category: 'Billing & Claims',
                    enabled: true,
                  };
                  setFaqs([...faqs, newF]);
                }}
                className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add FAQ Item</span>
              </button>
              <button
                onClick={handleSaveFaqs}
                className="px-4 py-2 bg-[#16A6A3] hover:bg-teal-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Save className="w-4 h-4" />
                <span>Save FAQs</span>
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={faq.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-700">FAQ Item #{idx + 1}</span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => setFaqs(moveItem(faqs, idx, 'up'))}
                      className="p-1 hover:bg-slate-200 rounded disabled:opacity-30 cursor-pointer"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === faqs.length - 1}
                      onClick={() => setFaqs(moveItem(faqs, idx, 'down'))}
                      className="p-1 hover:bg-slate-200 rounded disabled:opacity-30 cursor-pointer"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setFaqs(faqs.filter((_, i) => i !== idx))}
                      className="p-1 text-rose-500 hover:bg-rose-50 rounded cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-500 font-semibold mb-1">Question</label>
                  <input
                    type="text"
                    value={faq.question}
                    onChange={(e) => {
                      const copy = [...faqs];
                      copy[idx].question = e.target.value;
                      setFaqs(copy);
                    }}
                    className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-500 font-semibold mb-1">Answer</label>
                  <textarea
                    rows={2}
                    value={faq.answer}
                    onChange={(e) => {
                      const copy = [...faqs];
                      copy[idx].answer = e.target.value;
                      setFaqs(copy);
                    }}
                    className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 6: BOTTOM CTA STRIP */}
      {activeSubTab === 'cta' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Bottom Conversion Banner</h2>
              <p className="text-xs text-slate-500">The high-contrast closing strip prompting practices to request an audit.</p>
            </div>
            <button
              onClick={handleSaveFinalCta}
              className="px-4 py-2 bg-[#16A6A3] hover:bg-teal-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Save className="w-4 h-4" />
              <span>Save CTA Banner</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Top Pill / Guarantee</label>
              <input
                type="text"
                value={finalCta.guaranteePill}
                onChange={(e) => setFinalCta({ ...finalCta, guaranteePill: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Audit Button Label</label>
              <input
                type="text"
                value={finalCta.buttonText}
                onChange={(e) => setFinalCta({ ...finalCta, buttonText: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block font-bold text-slate-700 mb-1">Headline</label>
              <input
                type="text"
                value={finalCta.title}
                onChange={(e) => setFinalCta({ ...finalCta, title: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block font-bold text-slate-700 mb-1">Subheadline</label>
              <textarea
                rows={2}
                value={finalCta.subtitle}
                onChange={(e) => setFinalCta({ ...finalCta, subtitle: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
