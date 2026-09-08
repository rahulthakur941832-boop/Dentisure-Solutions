import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { HeroSecondarySlider } from '../components/HeroSecondarySlider';
import { TrustMetricsBar } from '../components/TrustMetricsBar';
import { PracticePhotoShowcase } from '../components/PracticePhotoShowcase';
import { TestimonialsSection } from '../components/TestimonialsSection';
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

      {/* 4. Concise Core Solutions Overview (Links to Dedicated Solutions Page) */}
      <section className="py-14 sm:py-18 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#E8F7F6] text-[#12304A] text-xs font-bold uppercase tracking-wider mb-2">
                <Layers className="w-3.5 h-3.5 text-[#16A6A3]" />
                <span>Core Practice Capabilities</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#12304A] tracking-tight">
                Streamlined Dental Insurance Billing & Recovery
              </h2>
            </div>
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                onNavigate('solutions');
              }}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#16A6A3] hover:text-teal-700 transition-colors cursor-pointer group"
            >
              <span>View All Solutions & Full Clinical SOPs</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Card 1 */}
            <div className="bg-[#F8FAFB] p-5 rounded-2xl border border-slate-200 hover:border-[#16A6A3]/60 transition-colors flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-[#16A6A3] mb-4">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-sm sm:text-base text-[#12304A] mb-1.5">
                  Pre-Visit Eligibility Verification
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Completed 72 hours prior to hygiene. Detailed breakdown of 23 benefit points, deductibles, frequencies, and waiting periods.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between text-[11px] font-bold text-teal-800">
                <span>Zero Patient Surprises</span>
                <span className="text-[#16A6A3]">&rarr;</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-[#F8FAFB] p-5 rounded-2xl border border-slate-200 hover:border-[#16A6A3]/60 transition-colors flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mb-4">
                  <FileCheck2 className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-sm sm:text-base text-[#12304A] mb-1.5">
                  Clean Claim Scrubbing & CDT Review
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Every claim scrubbed for CDT accuracy with required bitewings, periapicals, and narrative attachments before clearinghouse dispatch.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between text-[11px] font-bold text-emerald-800">
                <span>98.4% Clean Claim Rate</span>
                <span className="text-[#16A6A3]">&rarr;</span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-[#F8FAFB] p-5 rounded-2xl border border-slate-200 hover:border-[#16A6A3]/60 transition-colors flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 mb-4">
                  <TrendingDown className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-sm sm:text-base text-[#12304A] mb-1.5">
                  60+ &amp; 90+ Day Aging AR Recovery
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Targeted line-by-line carrier recovery sprint to recapture dormant cash trapped in aging insurance buckets without patient alienation.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between text-[11px] font-bold text-amber-800">
                <span>50%+ AR Reduction</span>
                <span className="text-[#16A6A3]">&rarr;</span>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-[#F8FAFB] p-5 rounded-2xl border border-slate-200 hover:border-[#16A6A3]/60 transition-colors flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 mb-4">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-sm sm:text-base text-[#12304A] mb-1.5">
                  Payment Posting &amp; Denial Appeals
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Daily EFT and ERA reconciliation down to the penny. Multi-level appeal submissions with radiographic evidence and clinical narratives.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between text-[11px] font-bold text-blue-800">
                <span>88% Appeal Reversal</span>
                <span className="text-[#16A6A3]">&rarr;</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Real Dental Practice Environment (Photography Showcase) */}
      <PracticePhotoShowcase onOpenAuditModal={() => onOpenAuditModal()} />

      {/* 6. Quick ROI & Leakage Spotlight (Teaser linking to Pricing & Calculator Page) */}
      <section className="py-14 sm:py-18 bg-[#F8FAFB] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
                  <Calculator className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Practice Revenue Leakage Assessment</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#12304A] tracking-tight mb-3">
                  How Much Uncollected Insurance Cash is Your Office Missing?
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  The typical solo dental practice collecting at 91% leaves over <strong className="text-[#12304A]">$65,000 to $110,000</strong> on the table annually in timely filing denials, untracked secondary claims, and unworked 90+ day aging balances.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Contingency fees: pay only when collected</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Zero hardware or server changes needed</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Save 20+ front-desk hours every week</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>No long-term contracts (cancel anytime)</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <button
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      onNavigate('pricing');
                    }}
                    className="px-6 py-3 bg-[#12304A] hover:bg-[#16A6A3] text-white rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Calculator className="w-4 h-4 text-teal-300" />
                    <span>Open Full ROI &amp; Leakage Calculator</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onOpenAuditModal()}
                    className="px-5 py-3 bg-white hover:bg-slate-50 border border-slate-300 text-[#12304A] rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Request Free Practice Audit</span>
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="bg-[#12304A] text-white p-6 rounded-xl border border-slate-700 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                    <span className="text-xs font-semibold text-slate-300">Average Solo Practice Recovery</span>
                    <span className="text-xs font-bold text-teal-300">Annual Gain</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-300">Uncollected AR Recaptured</span>
                      <span className="font-extrabold text-emerald-400">+$48,200</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-300">Prevented Timely Filing Write-offs</span>
                      <span className="font-extrabold text-emerald-400">+$24,600</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-300">Reclaimed Front Desk Staff Hours</span>
                      <span className="font-extrabold text-teal-300">80 hrs/mo</span>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-slate-700 flex justify-between items-center">
                    <span className="text-sm font-bold">Total Estimated ROI</span>
                    <span className="text-xl font-extrabold text-emerald-300">+$72,800/yr</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Doctor Testimonials Section */}
      <TestimonialsSection />

      {/* 8. High-Impact Closing Practice Audit Banner */}
      <section className="py-14 sm:py-16 bg-[#12304A] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-teal-500/20 text-teal-300 text-xs font-bold uppercase tracking-wider mb-4 border border-teal-500/30">
            <Building className="w-3.5 h-3.5" />
            <span>Zero-Obligation Practice Assessment</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Discover What Insurance Payers Owe Your Dental Practice
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto mb-8">
            Receive a confidential, line-by-line review of your 60+ and 90+ day aging insurance ledger. We pinpoint recoverable cash and provide actionable steps to boost collections to 98%+.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onOpenAuditModal()}
              className="w-full sm:w-auto px-8 py-4 bg-[#16A6A3] hover:bg-teal-500 text-white font-bold rounded-xl text-sm transition-all shadow-md cursor-pointer flex items-center justify-center gap-2.5"
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
