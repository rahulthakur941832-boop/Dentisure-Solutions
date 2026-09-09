import React, { useState } from 'react';
import { HeroPerspective } from '../types';
import { HERO_OPTIONS } from '../data/contentData';
import { useCms } from '../context/CmsContext';
import {
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  Lock,
  Activity,
  FileCheck,
  Building,
  UserCheck,
  Clock,
  Play,
  Video,
} from 'lucide-react';

interface HeroSectionProps {
  onOpenAuditModal: () => void;
  onExploreProcess: () => void;
  onOpenCalculator: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenAuditModal,
  onExploreProcess,
  onOpenCalculator,
}) => {
  const { cmsData } = useCms();
  const [perspective, setPerspective] = useState<HeroPerspective>('elite');

  // Load perspective configuration from CMS or fallback
  const customPerspectiveConfig = cmsData.hero.perspectives?.[perspective];
  const fallbackCopy = HERO_OPTIONS[perspective] || HERO_OPTIONS.elite;

  const headline = customPerspectiveConfig?.headline || (perspective === 'elite' ? cmsData.hero.headline : fallbackCopy.headline);
  const highlightText = customPerspectiveConfig?.highlightText !== undefined 
    ? customPerspectiveConfig.highlightText 
    : (perspective === 'elite' ? cmsData.hero.highlightText : '');
  const subheadline = customPerspectiveConfig?.subheadline || (perspective === 'elite' ? cmsData.hero.subheadline : fallbackCopy.subheadline);
  const badge = customPerspectiveConfig?.badge || (perspective === 'elite' ? cmsData.hero.badge : fallbackCopy.badge);
  const primaryCta = customPerspectiveConfig?.primaryCta || (perspective === 'elite' ? cmsData.hero.primaryCtaText : fallbackCopy.primaryCta);
  const secondaryCta = customPerspectiveConfig?.secondaryCta || (perspective === 'elite' ? cmsData.hero.secondaryCtaText : fallbackCopy.secondaryCta);
  const highlightPills = customPerspectiveConfig?.highlightPills || fallbackCopy.highlightPills || [];

  const heroImage = cmsData.hero.heroImage || "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=80";
  const mediaType = cmsData.hero.mediaType || 'image';
  const videoUrl = cmsData.hero.videoUrl || '';

  const handleSecondaryAction = () => {
    if (perspective === 'growth') {
      onOpenCalculator();
    } else {
      onExploreProcess();
    }
  };

  // Helper to detect youtube/vimeo embed
  const getEmbedVideoUrl = (url: string) => {
    if (!url) return '';
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`;
    }
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`;
    }
    if (url.includes('vimeo.com/')) {
      const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
      return `https://player.vimeo.com/video/${videoId}`;
    }
    return url;
  };

  const isIframeVideo = videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be') || videoUrl.includes('vimeo.com');

  const tabLabelElite = cmsData.hero.perspectives?.elite?.tabLabel || 'Elite Standard';
  const tabLabelStress = cmsData.hero.perspectives?.['stress-free']?.tabLabel || 'Stress-Free Clinic';
  const tabLabelGrowth = cmsData.hero.perspectives?.growth?.tabLabel || 'Financial ROI';

  return (
    <section className="relative overflow-hidden bg-[#F8FAFB] pt-6 pb-12 sm:pt-10 sm:pb-20 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Practice Strategy Filter Tabs (Editable Patient Viewpoint) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-8 bg-white p-1.5 sm:p-2 rounded-xl border border-slate-200 shadow-xs max-w-xl mx-auto lg:mx-0">
          <span className="text-xs font-bold text-slate-500 px-3 hidden sm:inline">
            {cmsData.hero.viewpointTitle || 'Practice Viewpoint:'}
          </span>
          <div className="grid grid-cols-3 gap-1.5 w-full sm:w-auto flex-1">
            <button
              onClick={() => setPerspective('elite')}
              className={`py-1.5 px-2.5 text-xs font-bold rounded-lg transition-colors cursor-pointer text-center truncate ${
                perspective === 'elite'
                  ? 'bg-[#12304A] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
              title={tabLabelElite}
            >
              {tabLabelElite}
            </button>
            <button
              onClick={() => setPerspective('stress-free')}
              className={`py-1.5 px-2.5 text-xs font-bold rounded-lg transition-colors cursor-pointer text-center truncate ${
                perspective === 'stress-free'
                  ? 'bg-[#12304A] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
              title={tabLabelStress}
            >
              {tabLabelStress}
            </button>
            <button
              onClick={() => setPerspective('growth')}
              className={`py-1.5 px-2.5 text-xs font-bold rounded-lg transition-colors cursor-pointer text-center truncate ${
                perspective === 'growth'
                  ? 'bg-[#12304A] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
              title={tabLabelGrowth}
            >
              {tabLabelGrowth}
            </button>
          </div>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Practice Positioning Copy */}
          <div className="lg:col-span-7 text-left">
            {/* Trust Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#E8F7F6] border border-[#16A6A3]/30 text-[#12304A] text-xs font-bold mb-4">
              <span className="w-2 h-2 rounded-full bg-[#16A6A3]"></span>
              <span>{badge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#12304A] tracking-tight leading-[1.18] mb-4">
              {headline}{' '}
              {highlightText && (
                <span className="bg-gradient-to-r from-[#16A6A3] to-teal-600 bg-clip-text text-transparent block sm:inline">
                  {highlightText}
                </span>
              )}
            </h1>

            {/* Sub-headline */}
            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-2xl mb-6 sm:mb-8">
              {subheadline}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
              <button
                onClick={onOpenAuditModal}
                className="px-6 py-3.5 text-sm font-bold text-white bg-[#12304A] hover:bg-[#16A6A3] rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center justify-center gap-2.5 group"
              >
                <span>{primaryCta}</span>
                <ArrowRight className="w-4 h-4 text-teal-300 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={handleSecondaryAction}
                className="px-5 py-3.5 text-sm font-semibold text-[#12304A] bg-white hover:bg-slate-100 border border-slate-300 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs"
              >
                <span>{secondaryCta}</span>
              </button>
            </div>

            {/* Optional Perspective Highlight Pills */}
            {highlightPills && highlightPills.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                {highlightPills.map((pill, pIdx) => (
                  <span
                    key={pIdx}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-teal-50 border border-teal-200 text-[#12304A] text-xs font-semibold"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#16A6A3]" />
                    <span>{pill}</span>
                  </span>
                ))}
              </div>
            )}

            {/* 3 Value Indicators */}
            <div className="pt-5 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-[#16A6A3] flex-shrink-0" />
                <span>{cmsData.hero.stat1Value} {cmsData.hero.stat1Label}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-[#16A6A3] flex-shrink-0" />
                <span>{cmsData.hero.stat2Value} {cmsData.hero.stat2Label}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-[#16A6A3] flex-shrink-0" />
                <span>{cmsData.hero.stat3Value} {cmsData.hero.stat3Label}</span>
              </div>
            </div>

            {/* Real Practice Validation Strip */}
            <div className="mt-6 flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200/90 text-xs text-slate-600 max-w-lg shadow-xs">
              <div className="w-9 h-9 rounded-full bg-teal-50 border border-teal-200 flex items-center justify-center text-[#16A6A3] flex-shrink-0 font-bold">
                <UserCheck className="w-5 h-5" />
              </div>
              <div className="leading-snug">
                <span className="font-bold text-[#12304A] block">
                  {cmsData.hero.trustStripTitle || 'Trusted by 240+ Solo & Multispecialty Dental Clinics'}
                </span>
                <span className="text-[11px] text-slate-500">
                  {cmsData.hero.trustStripSubtitle || 'Over ₹180M+ in dental claims & practice revenue managed across India.'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Practice Operations Desk (Supports Video & Image) */}
          <div className="lg:col-span-5 w-full">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden">
              {/* App-like Top Header */}
              <div className="bg-[#12304A] px-5 py-3.5 text-white flex items-center justify-between border-b border-slate-700">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-teal-500/20 flex items-center justify-center text-teal-300">
                    <Building className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block leading-tight">
                      {cmsData.hero.opsCardTitle || 'Apex Dental Specialists'} &bull; {cmsData.hero.opsCardLocation || 'Bengaluru'}
                    </span>
                    <span className="text-[10px] text-slate-300">
                      {cmsData.hero.opsCardPms || 'Practo Ray & Encrypted Sync'}
                    </span>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-teal-300 bg-teal-900/60 px-2 py-0.5 rounded border border-teal-500/30">
                  <Lock className="w-3 h-3" /> Secure Link
                </span>
              </div>

              {/* Media Container (Video or Image) */}
              <div className="relative h-44 sm:h-52 w-full bg-slate-900 overflow-hidden border-b border-slate-200">
                {mediaType === 'video' && videoUrl ? (
                  isIframeVideo ? (
                    <iframe
                      src={getEmbedVideoUrl(videoUrl)}
                      title="Practice Operations Video"
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      controls
                      playsInline
                      poster={cmsData.hero.videoPoster || heroImage}
                      className="w-full h-full object-cover"
                    >
                      <source src={videoUrl} type="video/mp4" />
                      Your browser does not support HTML5 video.
                    </video>
                  )
                ) : (
                  <>
                    <img
                      src={heroImage}
                      alt="Modern Dental Practice Front Desk and Claims Management"
                      className="w-full h-full object-cover object-center"
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#12304A]/80 via-transparent to-transparent"></div>
                    <div className="absolute bottom-2.5 left-3.5 text-white">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-teal-300 block">
                        Live Practice Operations
                      </span>
                      <span className="text-xs font-bold text-white drop-shadow-sm">
                        Daily Claims &amp; Collections Snapshot
                      </span>
                    </div>
                    <div className="absolute top-2.5 right-3 bg-[#12304A]/80 backdrop-blur-sm px-2 py-1 rounded-md text-[10px] font-bold text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      {cmsData.hero.opsCardBadge || 'Active Batch Clean'}
                    </div>
                  </>
                )}
              </div>

              {/* Performance Metrics Grid */}
              <div className="p-4 sm:p-5 space-y-4">
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                      <span>Clean Claims Today</span>
                      <FileCheck className="w-3.5 h-3.5 text-[#16A6A3]" />
                    </div>
                    <div className="text-lg sm:text-xl font-extrabold text-[#12304A]">
                      {cmsData.hero.opsCardClaimsProcessedToday || '38 Claims'}
                    </div>
                    <span className="text-[11px] font-bold text-emerald-700">
                      {cmsData.hero.opsCardAmountProcessedToday || '₹3,42,800 Processed'}
                    </span>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                      <span>Clean Claim Rate</span>
                      <Activity className="w-3.5 h-3.5 text-teal-600" />
                    </div>
                    <div className="text-lg sm:text-xl font-extrabold text-[#16A6A3]">
                      {cmsData.hero.stat1Value}
                    </div>
                    <span className="text-[11px] font-medium text-slate-500">
                      {cmsData.hero.stat1Label}
                    </span>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                      <span>90+ Day AR</span>
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <div className="text-lg sm:text-xl font-extrabold text-emerald-700">
                      {cmsData.hero.stat2Value}
                    </div>
                    <span className="text-[11px] font-medium text-slate-500">
                      {cmsData.hero.stat2Label}
                    </span>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                      <span>Reconciliation Speed</span>
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                    </div>
                    <div className="text-lg sm:text-xl font-extrabold text-[#12304A]">
                      {cmsData.hero.stat3Value}
                    </div>
                    <span className="text-[11px] font-medium text-slate-500">
                      {cmsData.hero.stat3Label}
                    </span>
                  </div>
                </div>

                {/* Live Real Practice Activity Log */}
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 text-xs">
                  <div className="flex items-center justify-between text-slate-700 font-bold mb-2">
                    <span>Recent Practice Operations</span>
                    <span className="text-[10px] text-slate-400 font-normal flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Updated 10m ago
                    </span>
                  </div>
                  <div className="space-y-1.5 text-[11px] text-slate-600">
                    {(cmsData.hero.opsRecentActivity && cmsData.hero.opsRecentActivity.length > 0) ? (
                      cmsData.hero.opsRecentActivity.map((act, actIdx) => (
                        <div key={actIdx} className="flex items-center justify-between border-b border-slate-200/60 last:border-b-0 pb-1 last:pb-0">
                          <span className="truncate">✓ {act.label}</span>
                          <span className="font-bold text-emerald-700 ml-2 whitespace-nowrap">{act.amountOrBadge}</span>
                        </div>
                      ))
                    ) : (
                      <>
                        <div className="flex items-center justify-between border-b border-slate-200/60 pb-1">
                          <span className="truncate">✓ Corporate Health Claim Settled (Crowns #14, #19)</span>
                          <span className="font-bold text-emerald-700 ml-2">+₹28,400</span>
                        </div>
                        <div className="flex items-center justify-between border-b border-slate-200/60 pb-1">
                          <span className="truncate">✓ Insurance Query Appeal Cleared (Implant Surgery)</span>
                          <span className="font-bold text-emerald-700 ml-2">+₹45,000</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="truncate">✓ Tomorrow Hygiene Schedule Breakdown (18 Patients)</span>
                          <span className="font-bold text-[#16A6A3] ml-2">Verified</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Practice Audit CTA */}
                <button
                  onClick={onOpenAuditModal}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#12304A] hover:bg-[#16A6A3] text-white font-bold text-xs transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Request Practice Revenue Audit</span>
                  <ArrowRight className="w-3.5 h-3.5 text-teal-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
