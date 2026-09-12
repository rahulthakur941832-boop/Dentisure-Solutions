import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { HeroSecondarySlider } from '../components/HeroSecondarySlider';
import { TrustMetricsBar } from '../components/TrustMetricsBar';
import { PracticePhotoShowcase } from '../components/PracticePhotoShowcase';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { SectionTransitionDivider } from '../components/SectionTransitionDivider';
import { PerspectiveCard } from '../components/PerspectiveCard';
import { NavigationPage } from '../types';
import {
  FileCheck2,
  TrendingDown,
  ShieldCheck,
  Clock,
  ArrowRight,
  CheckCircle,
  Calculator,
  Building,
  CalendarCheck,
  Layers,
  Sparkles,
  Zap,
} from 'lucide-react';

interface HomePageProps {
  onOpenAuditModal: (production?: string, gain?: string) => void;
  onNavigate: (page: NavigationPage) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onOpenAuditModal,
  onNavigate,
}) => {
  return (
    <div className="space-y-0">
      {/* 1. Hero Section with Live Practice Operations App Interface */}
      <HeroSection
        onOpenAuditModal={() => onOpenAuditModal()}
        onExploreProcess={() => onNavigate('solutions')}
        onOpenCalculator={() => onNavigate('pricing')}
      />

      {/* 2. Secondary Marquee Ticker (Speed Halved for Relaxed Reading) */}
      <HeroSecondarySlider />

      {/* 3. Core Practice Metrics Strip */}
      <TrustMetricsBar />

      {/* 4. Core Capabilities: Asymmetric Modern Bento Grid with 3D Depth */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header with Dynamic Category Tag */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#E8F7F6] text-[#12304A] text-xs font-bold uppercase tracking-wider mb-2.5">
                <Layers className="w-3.5 h-3.5 text-[#16A6A3]" />
                <span>Core Practice Capabilities</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#12304A] tracking-tight">
                Streamlined Dental Insurance Billing &amp; Recovery
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1.5 max-w-2xl">
                Precision remote billing workflows designed specifically for dental teams. Built to prevent denials before submission.
              </p>
            </div>
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                onNavigate('solutions');
              }}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#16A6A3] hover:text-teal-700 transition-colors cursor-pointer group"
            >
              <span>View All Solutions &amp; Full Clinical SOPs</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Asymmetric Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Bento Card 1: Flagship 2-Column Wide Card */}
            <div className="md:col-span-2">
              <PerspectiveCard intensity={5} className="h-full">
                <div className="bg-gradient-to-br from-[#F8FAFB] to-[#EEF5F7] p-7 rounded-2xl border border-slate-200/90 hover:border-[#16A6A3]/60 transition-all shadow-xs h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-5">
                      <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-200/80 flex items-center justify-center text-[#16A6A3]">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100/70 border border-teal-200 text-[#006A68] text-xs font-bold font-mono">
                        <Sparkles className="w-3 h-3 text-[#16A6A3]" />
                        <span>Flagship Safety Net</span>
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg sm:text-xl text-[#12304A] mb-2.5">
                      Pre-Visit Eligibility Verification &amp; 23-Point Breakdown
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 max-w-2xl">
                      Completed 72 hours prior to hygiene. Detailed line-by-line breakdown entered directly into your PMS: deductibles, frequencies, waiting periods, missing tooth clauses, and exact patient out-of-pocket shares.
                    </p>

                    {/* Interactive Benefit Pillars Mini-Preview */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-6">
                      <div className="bg-white/90 p-2.5 rounded-lg border border-slate-200/80">
                        <div className="text-[10px] uppercase font-bold text-slate-400">Hygiene &amp; Prophy</div>
                        <div className="text-xs font-bold text-[#12304A]">2x / Year Frequencies</div>
                      </div>
                      <div className="bg-white/90 p-2.5 rounded-lg border border-slate-200/80">
                        <div className="text-[10px] uppercase font-bold text-slate-400">Major Restorative</div>
                        <div className="text-xs font-bold text-[#12304A]">Waiting Periods &amp; Downgrades</div>
                      </div>
                      <div className="bg-white/90 p-2.5 rounded-lg border border-slate-200/80 col-span-2 sm:col-span-1">
                        <div className="text-[10px] uppercase font-bold text-slate-400">Annual Max Balance</div>
                        <div className="text-xs font-bold text-[#16A6A3]">Real-Time Remaining</div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs font-bold text-[#006A68]">
                    <span>Zero Patient Financial Surprises at Checkout</span>
                    <span className="flex items-center gap-1 text-[#16A6A3]">
                      <span>Explore Verification Workflow</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </PerspectiveCard>
            </div>

            {/* Bento Card 2: Clean Claim Scrubbing & CDT Review */}
            <div>
              <PerspectiveCard intensity={5} className="h-full">
                <div className="bg-[#F8FAFB] p-6 rounded-2xl border border-slate-200 hover:border-[#16A6A3]/60 transition-all shadow-xs h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                        <FileCheck2 className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                        98.4% Clean Rate
                      </span>
                    </div>
                    <h3 className="font-extrabold text-base text-[#12304A] mb-2">
                      Clean Claim Scrubbing &amp; CDT Review
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      Every claim scrubbed for CDT accuracy with required bitewings, periapicals, periodontal charting, and narrative attachments before clearinghouse submission.
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between text-[11px] font-bold text-emerald-800">
                    <span>24–48hr Dispatch SLA</span>
                    <span className="text-[#16A6A3]">&rarr;</span>
                  </div>
                </div>
              </PerspectiveCard>
            </div>

            {/* Bento Card 3: 60+ & 90+ Day Aging AR Recovery */}
            <div>
              <PerspectiveCard intensity={5} className="h-full">
                <div className="bg-[#F8FAFB] p-6 rounded-2xl border border-slate-200 hover:border-[#16A6A3]/60 transition-all shadow-xs h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                        <TrendingDown className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-mono font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200">
                        50%+ Reduction
                      </span>
                    </div>
                    <h3 className="font-extrabold text-base text-[#12304A] mb-2">
                      60+ &amp; 90+ Day Aging AR Recovery
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      Targeted line-by-line carrier recovery sprint to recapture dormant cash trapped in aging insurance buckets without patient alienation.
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between text-[11px] font-bold text-amber-800">
                    <span>Zero Unworked Balances</span>
                    <span className="text-[#16A6A3]">&rarr;</span>
                  </div>
                </div>
              </PerspectiveCard>
            </div>

            {/* Bento Card 4: 2-Column Wide Payment Posting & Denial Appeals */}
            <div className="md:col-span-2">
              <PerspectiveCard intensity={5} className="h-full">
                <div className="bg-gradient-to-br from-[#F8FAFB] to-[#F3F6F9] p-7 rounded-2xl border border-slate-200 hover:border-[#16A6A3]/60 transition-all shadow-xs h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                        <Clock className="w-5 h-5" />
                      </div>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold font-mono">
                        <Zap className="w-3 h-3 text-blue-600" />
                        <span>88% Appeal Reversal Rate</span>
                      </span>
                    </div>

                    <h3 className="font-extrabold text-base sm:text-lg text-[#12304A] mb-2">
                      Daily Payment Posting &amp; Carrier Denial Appeals
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                      Daily EFT and ERA reconciliation down to the penny. Multi-level appeal submissions with radiographic evidence, clinical narratives, and peer review citations to overturn unjust denials.
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs font-bold text-blue-900">
                    <span>Line-Item Penny Balanced Daily</span>
                    <span className="text-[#16A6A3] flex items-center gap-1">
                      <span>Learn About Denial Defense</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </PerspectiveCard>
            </div>
          </div>
        </div>
      </section>

      {/* CONTINUOUS STREAM CONNECTOR (Looping horizontal visual transition between sections) */}
      <SectionTransitionDivider variant="stream-ribbon" />

      {/* 5. Real Dental Practice Environment (Photography Showcase) */}
      <PracticePhotoShowcase onOpenAuditModal={() => onOpenAuditModal()} />

      {/* WAVE TRANSITION DIVIDER: Light to Dark */}
      <SectionTransitionDivider variant="wave-light-to-dark" />

      {/* 6. Practice Revenue Leakage Assessment (High-Contrast Command Center Treatment) */}
      <section className="py-16 sm:py-20 bg-[#0B1B2B] text-white border-b border-slate-800 relative overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(ellipse_60%_50%_at_70%_20%,rgba(126,245,241,0.25),rgba(255,255,255,0))]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#16A6A3]/20 border border-[#16A6A3]/40 text-[#7EF5F1] text-xs font-bold uppercase tracking-wider mb-3">
                <Calculator className="w-3.5 h-3.5 text-[#7EF5F1]" />
                <span>Practice Revenue Leakage Assessment</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-4 leading-tight">
                How Much Uncollected Insurance Cash is Your Office Missing?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 max-w-xl">
                The typical solo dental practice collecting at 91% leaves over{' '}
                <strong className="text-white font-bold">$65,000 to $110,000</strong> on the table annually in timely filing denials, untracked secondary claims, and unworked 90+ day aging balances.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-200">
                  <CheckCircle className="w-4 h-4 text-[#7EF5F1] flex-shrink-0" />
                  <span>Contingency fees: pay only when collected</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-200">
                  <CheckCircle className="w-4 h-4 text-[#7EF5F1] flex-shrink-0" />
                  <span>Zero hardware or server changes needed</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-200">
                  <CheckCircle className="w-4 h-4 text-[#7EF5F1] flex-shrink-0" />
                  <span>Save 20+ front-desk hours every week</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-200">
                  <CheckCircle className="w-4 h-4 text-[#7EF5F1] flex-shrink-0" />
                  <span>No long-term contracts (cancel anytime)</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    onNavigate('pricing');
                  }}
                  className="px-6 py-3.5 bg-[#006A68] hover:bg-[#00504E] text-white rounded-xl text-xs sm:text-sm font-bold transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2 shadow-md"
                >
                  <Calculator className="w-4 h-4 text-[#7EF5F1]" />
                  <span>Open Full ROI &amp; Leakage Calculator</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onOpenAuditModal()}
                  className="px-5 py-3.5 bg-white/10 hover:bg-white/15 border border-white/20 text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Request Free Practice Audit</span>
                </button>
              </div>
            </div>

            {/* Right Card: 3D Perspective Card with ROI Simulation */}
            <div className="lg:col-span-5">
              <PerspectiveCard intensity={6}>
                <div className="bg-[#12304A]/90 backdrop-blur-md text-white p-6 sm:p-7 rounded-2xl border border-slate-700/80 shadow-2xl space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-700/80 pb-3">
                    <span className="text-xs font-bold text-slate-300">Average Solo Practice Recovery</span>
                    <span className="text-xs font-extrabold text-[#7EF5F1] font-mono">Annual Gain</span>
                  </div>
                  <div className="space-y-3.5 py-1">
                    <div className="flex justify-between items-center text-xs sm:text-sm">
                      <span className="text-slate-300">Uncollected AR Recaptured</span>
                      <span className="font-extrabold text-emerald-400 font-mono">+$48,200</span>
                    </div>
                    <div className="flex justify-between items-center text-xs sm:text-sm">
                      <span className="text-slate-300">Prevented Timely Filing Write-offs</span>
                      <span className="font-extrabold text-emerald-400 font-mono">+$24,600</span>
                    </div>
                    <div className="flex justify-between items-center text-xs sm:text-sm">
                      <span className="text-slate-300">Reclaimed Front Desk Staff Hours</span>
                      <span className="font-extrabold text-[#7EF5F1] font-mono">80 hrs/mo</span>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-slate-700/80 flex justify-between items-center">
                    <span className="text-sm font-bold text-white">Total Estimated ROI</span>
                    <span className="text-xl sm:text-2xl font-black text-[#7EF5F1] font-mono">+$72,800/yr</span>
                  </div>
                </div>
              </PerspectiveCard>
            </div>
          </div>
        </div>
      </section>

      {/* WAVE TRANSITION DIVIDER: Dark back to Light */}
      <SectionTransitionDivider variant="wave-dark-to-light" />

      {/* 7. Doctor Testimonials Section */}
      <TestimonialsSection />

      {/* 8. High-Impact Closing Practice Audit Banner */}
      <section className="py-16 sm:py-20 bg-[#12304A] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-teal-500/20 text-teal-300 text-xs font-bold uppercase tracking-wider mb-4 border border-teal-500/30">
            <Building className="w-3.5 h-3.5" />
            <span>Zero-Obligation Practice Assessment</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Discover What Insurance Payers Owe Your Dental Practice
          </h2>
          <p className="text-xs sm:text-sm sm:text-base text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            Receive a confidential, line-by-line review of your 60+ and 90+ day aging insurance ledger. We pinpoint recoverable cash and provide actionable steps to boost collections to 98%+.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onOpenAuditModal()}
              className="w-full sm:w-auto px-8 py-4 bg-[#006A68] hover:bg-[#00504E] text-white font-bold rounded-xl text-sm transition-all shadow-md cursor-pointer flex items-center justify-center gap-2.5 transform hover:-translate-y-0.5"
            >
              <CalendarCheck className="w-4 h-4 text-white" />
              <span>Schedule Free Practice Revenue Audit</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                onNavigate('contact');
              }}
              className="w-full sm:w-auto px-6 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl text-sm border border-white/20 transition-colors cursor-pointer"
            >
              <span>Contact Senior Billing Team</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
