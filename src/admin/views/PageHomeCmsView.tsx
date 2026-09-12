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
  Video,
  Play,
  Image as ImageIcon,
  Activity,
  Award,
  BarChart3,
  ListFilter,
  Tag,
  Building,
} from 'lucide-react';
import { FAQItem, TestimonialItem, HeroPerspective, HeroPerspectiveOption } from '../../types';

export const PageHomeCmsView: React.FC = () => {
  const { cmsData, updateSection, saveToServer } = useCms();
  const [activeSubTab, setActiveSubTab] = useState<'hero' | 'metrics' | 'why' | 'testimonials' | 'faq' | 'cta'>('hero');
  const [activePerspective, setActivePerspective] = useState<HeroPerspective>('elite');
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

  const handleSaveHero = async () => {
    updateSection('hero', hero);
    await saveToServer({ ...cmsData, hero });
    triggerSaveToast();
  };

  const handleSaveMetrics = async () => {
    updateSection('trustMetrics', metrics);
    await saveToServer({ ...cmsData, trustMetrics: metrics });
    triggerSaveToast();
  };

  const handleSaveWhyChoose = async () => {
    updateSection('whyChoose', whyChoose);
    await saveToServer({ ...cmsData, whyChoose });
    triggerSaveToast();
  };

  const handleSaveTestimonials = async () => {
    updateSection('testimonials', testimonials);
    await saveToServer({ ...cmsData, testimonials });
    triggerSaveToast();
  };

  const handleSaveFaqs = async () => {
    updateSection('faqs', faqs);
    await saveToServer({ ...cmsData, faqs });
    triggerSaveToast();
  };

  const handleSaveFinalCta = async () => {
    const updatedPricing = {
      ...cmsData.pricing,
      guaranteeText: finalCta.title,
    };
    updateSection('pricing', updatedPricing);
    await saveToServer({ ...cmsData, pricing: updatedPricing });
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
        <div className="space-y-6 text-xs">
          {/* Top Hero Save Bar */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Hero Section Content &amp; Media CMS</h2>
              <p className="text-xs text-slate-500">Edit headlines, switch video/image media, customize 3 patient viewpoints, and manage operations desk.</p>
            </div>
            <button
              onClick={handleSaveHero}
              className="px-4 py-2 bg-[#16A6A3] hover:bg-teal-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Save className="w-4 h-4" />
              <span>Save Hero Section</span>
            </button>
          </div>

          {/* 1. Main Headline & Copy (Above the Fold) */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#16A6A3]" />
              <span>1. Main Hero Headline &amp; Core CTAs</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Top Badge Pill</label>
                <input
                  type="text"
                  value={hero.badge || ''}
                  onChange={(e) => setHero({ ...hero, badge: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                  placeholder="Pan-India Dental Revenue Cycle & Billing Management"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Highlight Word / Keyword</label>
                <input
                  type="text"
                  value={hero.highlightedWord || ''}
                  onChange={(e) => setHero({ ...hero, highlightedWord: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                  placeholder="Automated Revenue Machine"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block font-bold text-slate-700 mb-1">Main H1 Title</label>
                <input
                  type="text"
                  value={hero.title || ''}
                  onChange={(e) => setHero({ ...hero, title: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-900"
                  placeholder="Transform Your Dental Practice Into an"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block font-bold text-slate-700 mb-1">Subtitle / Body Paragraph</label>
                <textarea
                  rows={3}
                  value={hero.subtitle || ''}
                  onChange={(e) => setHero({ ...hero, subtitle: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl leading-relaxed"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Primary CTA Button</label>
                <input
                  type="text"
                  value={hero.ctaPrimary || ''}
                  onChange={(e) => setHero({ ...hero, ctaPrimary: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                  placeholder="Claim Free Practice Audit"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Secondary CTA Button</label>
                <input
                  type="text"
                  value={hero.ctaSecondary || ''}
                  onChange={(e) => setHero({ ...hero, ctaSecondary: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                  placeholder="Explore Indian PMS Integrations"
                />
              </div>
            </div>
          </div>

          {/* 2. Visual Media Switcher (Video vs Image) */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Video className="w-4 h-4 text-[#16A6A3]" />
                  <span>2. Hero Visual Media (Video vs Image)</span>
                </h3>
                <p className="text-[11px] text-slate-500">Toggle whether the hero displays an animated video background/player or a high-res image.</p>
              </div>

              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
                <button
                  type="button"
                  onClick={() => setHero({ ...hero, mediaType: 'image' })}
                  className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 cursor-pointer ${
                    hero.mediaType !== 'video'
                      ? 'bg-white text-[#12304A] shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Image</span>
                </button>
                <button
                  type="button"
                  onClick={() => setHero({ ...hero, mediaType: 'video' })}
                  className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 cursor-pointer ${
                    hero.mediaType === 'video'
                      ? 'bg-[#16A6A3] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Video Stream</span>
                </button>
              </div>
            </div>

            {hero.mediaType === 'video' ? (
              <div className="space-y-4 bg-teal-50/40 p-4 rounded-xl border border-teal-200/80">
                <div>
                  <label className="block font-bold text-slate-800 mb-1 flex items-center gap-1">
                    <Video className="w-3.5 h-3.5 text-[#16A6A3]" />
                    <span>Video URL (YouTube Embed / Vimeo / MP4 Stream)</span>
                  </label>
                  <input
                    type="url"
                    value={hero.videoUrl || ''}
                    onChange={(e) => setHero({ ...hero, videoUrl: e.target.value })}
                    placeholder="https://www.youtube.com/watch?v=... or direct MP4 link"
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-xl font-mono text-xs"
                  />
                  <p className="text-[10px] text-slate-500 mt-1">
                    Supports standard YouTube watch links, YouTube shorts, Vimeo, or direct .mp4/.webm video URLs.
                  </p>
                </div>

                <div>
                  <label className="block font-bold text-slate-800 mb-1">Video Poster / Fallback Image URL</label>
                  <input
                    type="url"
                    value={hero.videoPoster || hero.heroImage || ''}
                    onChange={(e) => setHero({ ...hero, videoPoster: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-xl font-mono text-xs"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1">
                  <ImageIcon className="w-3.5 h-3.5 text-slate-600" />
                  <span>Hero Background Image URL</span>
                </label>
                <input
                  type="url"
                  value={hero.heroImage || ''}
                  onChange={(e) => setHero({ ...hero, heroImage: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono text-xs"
                />
              </div>
            )}
          </div>

          {/* 3. Patient Viewpoint & 3 Perspective Options */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <ListFilter className="w-4 h-4 text-[#16A6A3]" />
                  <span>3. Patient Viewpoint: 3 Interactive Perspectives</span>
                </h3>
                <p className="text-[11px] text-slate-500">
                  Allow doctors to toggle between clinical perspectives on the live hero. All 3 options are fully editable.
                </p>
              </div>

              <div>
                <input
                  type="text"
                  value={hero.viewpointTitle || 'Practice Viewpoint:'}
                  onChange={(e) => setHero({ ...hero, viewpointTitle: e.target.value })}
                  placeholder="Practice Viewpoint:"
                  className="p-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-700"
                  title="Section Header Label"
                />
              </div>
            </div>

            {/* 3 Option Tabs */}
            <div className="flex gap-2 p-1.5 bg-slate-100 rounded-xl border border-slate-200">
              {(['elite', 'stress-free', 'growth'] as HeroPerspective[]).map((key) => {
                const opt = hero.perspectives?.[key];
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActivePerspective(key)}
                    className={`flex-1 py-2 px-3 rounded-lg font-bold transition-all cursor-pointer text-center ${
                      activePerspective === key
                        ? 'bg-white text-[#12304A] shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {opt?.tabLabel || key}
                  </button>
                );
              })}
            </div>

            {/* Active Perspective Editor */}
            {(() => {
              const currentOpt = hero.perspectives?.[activePerspective] || {
                id: activePerspective,
                tabLabel: activePerspective === 'elite' ? 'Elite Standard' : activePerspective === 'stress-free' ? 'Stress-Free Clinic' : 'Growth & Multi-Chair',
                badge: 'Dental Revenue Machine',
                headline: 'Transform Your Dental Practice',
                highlightText: 'Automated Revenue Machine',
                subheadline: 'Complete dental billing management.',
                primaryCta: 'Claim Free Practice Audit',
                secondaryCta: 'Explore Indian PMS Integrations',
                highlightPills: ['Collections', 'Fast Turnaround'],
              };

              const updateActivePerspective = (updatedFields: Partial<HeroPerspectiveOption>) => {
                const copyPerspectives = { ...(hero.perspectives || {}) };
                copyPerspectives[activePerspective] = {
                  ...currentOpt,
                  ...updatedFields,
                };
                setHero({ ...hero, perspectives: copyPerspectives as any });
              };

              return (
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Tab Button Label</label>
                      <input
                        type="text"
                        value={currentOpt.tabLabel}
                        onChange={(e) => updateActivePerspective({ tabLabel: e.target.value })}
                        className="w-full p-2 bg-white border border-slate-300 rounded-lg font-bold"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Badge Pill</label>
                      <input
                        type="text"
                        value={currentOpt.badge}
                        onChange={(e) => updateActivePerspective({ badge: e.target.value })}
                        className="w-full p-2 bg-white border border-slate-300 rounded-lg"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block font-bold text-slate-700 mb-1">Perspective Main Headline</label>
                      <input
                        type="text"
                        value={currentOpt.headline}
                        onChange={(e) => updateActivePerspective({ headline: e.target.value })}
                        className="w-full p-2 bg-white border border-slate-300 rounded-lg font-bold"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block font-bold text-slate-700 mb-1">Highlighted Keyword/Text</label>
                      <input
                        type="text"
                        value={currentOpt.highlightText || ''}
                        onChange={(e) => updateActivePerspective({ highlightText: e.target.value })}
                        className="w-full p-2 bg-white border border-slate-300 rounded-lg font-bold text-teal-700"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block font-bold text-slate-700 mb-1">Perspective Subheadline</label>
                      <textarea
                        rows={2}
                        value={currentOpt.subheadline}
                        onChange={(e) => updateActivePerspective({ subheadline: e.target.value })}
                        className="w-full p-2 bg-white border border-slate-300 rounded-lg leading-relaxed"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Primary CTA Button</label>
                      <input
                        type="text"
                        value={currentOpt.primaryCta}
                        onChange={(e) => updateActivePerspective({ primaryCta: e.target.value })}
                        className="w-full p-2 bg-white border border-slate-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Secondary CTA Button</label>
                      <input
                        type="text"
                        value={currentOpt.secondaryCta}
                        onChange={(e) => updateActivePerspective({ secondaryCta: e.target.value })}
                        className="w-full p-2 bg-white border border-slate-300 rounded-lg"
                      />
                    </div>
                  </div>

                  {/* Highlight Pills */}
                  <div className="pt-3 border-t border-slate-200">
                    <div className="flex items-center justify-between mb-2">
                      <label className="font-bold text-slate-700 flex items-center gap-1">
                        <Tag className="w-3.5 h-3.5 text-teal-600" />
                        <span>Feature Highlight Pills ({(currentOpt.highlightPills || []).length})</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          const updatedPills = [...(currentOpt.highlightPills || []), 'New Feature Benefit'];
                          updateActivePerspective({ highlightPills: updatedPills });
                        }}
                        className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-bold text-teal-700 cursor-pointer flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Add Pill</span>
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {(currentOpt.highlightPills || []).map((pill, pIdx) => (
                        <div key={pIdx} className="flex items-center bg-white border border-slate-300 rounded-lg px-2 py-1 gap-1.5 shadow-2xs">
                          <input
                            type="text"
                            value={pill}
                            onChange={(e) => {
                              const copy = [...currentOpt.highlightPills];
                              copy[pIdx] = e.target.value;
                              updateActivePerspective({ highlightPills: copy });
                            }}
                            className="text-xs bg-transparent border-none focus:outline-none w-36 font-medium text-slate-800"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const copy = currentOpt.highlightPills.filter((_, i) => i !== pIdx);
                              updateActivePerspective({ highlightPills: copy });
                            }}
                            className="text-slate-400 hover:text-rose-600 cursor-pointer"
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* 4. Practice Operations Desk Card Editor */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-slate-200">
              <Activity className="w-4 h-4 text-[#16A6A3]" />
              <span>4. Practice Operations Desk &amp; Real-Time Activity Card</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Clinic Name</label>
                <input
                  type="text"
                  value={hero.opsCardTitle || 'Apex Dental Specialists'}
                  onChange={(e) => setHero({ ...hero, opsCardTitle: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">City / Location</label>
                <input
                  type="text"
                  value={hero.opsCardLocation || 'Indiranagar, Bengaluru'}
                  onChange={(e) => setHero({ ...hero, opsCardLocation: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">PMS Software &amp; Status</label>
                <input
                  type="text"
                  value={hero.opsCardPms || 'Practo Ray & Encrypted Sync'}
                  onChange={(e) => setHero({ ...hero, opsCardPms: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Status Badge</label>
                <input
                  type="text"
                  value={hero.opsCardBadge || 'Active Batch Clean'}
                  onChange={(e) => setHero({ ...hero, opsCardBadge: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold text-emerald-700"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Claims Today</label>
                <input
                  type="text"
                  value={hero.opsCardClaimsProcessedToday || '38 Claims'}
                  onChange={(e) => setHero({ ...hero, opsCardClaimsProcessedToday: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Amount Processed Today</label>
                <input
                  type="text"
                  value={hero.opsCardAmountProcessedToday || '₹3,42,800 Processed'}
                  onChange={(e) => setHero({ ...hero, opsCardAmountProcessedToday: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold text-teal-700"
                />
              </div>
            </div>

            {/* Recent Activity Log Items */}
            <div className="pt-3 border-t border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800 text-xs">
                  Recent Activity Log Items ({(hero.opsRecentActivity || []).length})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const newLog = {
                      label: 'Cashless Dental Claim Verified',
                      amountOrBadge: '+₹35,000',
                    };
                    const updated = [...(hero.opsRecentActivity || []), newLog];
                    setHero({ ...hero, opsRecentActivity: updated });
                  }}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Log Item</span>
                </button>
              </div>

              <div className="space-y-2">
                {(hero.opsRecentActivity || []).map((log, lIdx) => (
                  <div key={lIdx} className="flex items-center gap-2 p-2 bg-slate-50 border border-slate-200 rounded-xl">
                    <input
                      type="text"
                      value={log.label}
                      onChange={(e) => {
                        const copy = [...hero.opsRecentActivity!];
                        copy[lIdx].label = e.target.value;
                        setHero({ ...hero, opsRecentActivity: copy });
                      }}
                      className="flex-1 p-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                      placeholder="Activity description"
                    />
                    <input
                      type="text"
                      value={log.amountOrBadge}
                      onChange={(e) => {
                        const copy = [...hero.opsRecentActivity!];
                        copy[lIdx].amountOrBadge = e.target.value;
                        setHero({ ...hero, opsRecentActivity: copy });
                      }}
                      className="w-32 p-1.5 bg-white border border-slate-300 rounded-lg text-xs font-bold text-teal-700"
                      placeholder="+₹42,500"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const filtered = hero.opsRecentActivity!.filter((_, i) => i !== lIdx);
                        setHero({ ...hero, opsRecentActivity: filtered });
                      }}
                      className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 5. Key Numerical Stats Strip */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-slate-200">
              <BarChart3 className="w-4 h-4 text-[#16A6A3]" />
              <span>5. High-Impact Performance Metrics (3 Counters)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="font-bold text-slate-500 text-[11px] block">Stat #1</span>
                <div>
                  <label className="block text-[10px] text-slate-500 font-bold">Metric Value</label>
                  <input
                    type="text"
                    value={hero.stat1Value || ''}
                    onChange={(e) => setHero({ ...hero, stat1Value: e.target.value })}
                    className="w-full p-2 bg-white border border-slate-300 rounded-lg font-bold text-teal-800"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-500 font-bold">Metric Label</label>
                  <input
                    type="text"
                    value={hero.stat1Label || ''}
                    onChange={(e) => setHero({ ...hero, stat1Label: e.target.value })}
                    className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="font-bold text-slate-500 text-[11px] block">Stat #2</span>
                <div>
                  <label className="block text-[10px] text-slate-500 font-bold">Metric Value</label>
                  <input
                    type="text"
                    value={hero.stat2Value || ''}
                    onChange={(e) => setHero({ ...hero, stat2Value: e.target.value })}
                    className="w-full p-2 bg-white border border-slate-300 rounded-lg font-bold text-teal-800"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-500 font-bold">Metric Label</label>
                  <input
                    type="text"
                    value={hero.stat2Label || ''}
                    onChange={(e) => setHero({ ...hero, stat2Label: e.target.value })}
                    className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="font-bold text-slate-500 text-[11px] block">Stat #3</span>
                <div>
                  <label className="block text-[10px] text-slate-500 font-bold">Metric Value</label>
                  <input
                    type="text"
                    value={hero.stat3Value || ''}
                    onChange={(e) => setHero({ ...hero, stat3Value: e.target.value })}
                    className="w-full p-2 bg-white border border-slate-300 rounded-lg font-bold text-teal-800"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-500 font-bold">Metric Label</label>
                  <input
                    type="text"
                    value={hero.stat3Label || ''}
                    onChange={(e) => setHero({ ...hero, stat3Label: e.target.value })}
                    className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
                  />
                </div>
              </div>
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
