import React, { useState } from 'react';
import {
  ShieldCheck,
  FileCheck2,
  TrendingDown,
  Clock,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  Layers,
  CalendarCheck,
  Award,
  AlertCircle,
  Stethoscope,
} from 'lucide-react';
import { SOLUTION_PILLARS } from '../data/contentData';
import { NavigationPage } from '../types';

const CLAIM_LIFECYCLE_STAGES = [
  {
    stageNumber: 1,
    name: 'Pre-Visit Breakdown & Eligibility',
    description: '48–72 hours prior to arrival, full 23-point breakdown verified and entered directly into your PMS.',
    outcome: 'Zero surprise copays & front-desk friction',
  },
  {
    stageNumber: 2,
    name: 'Clinical Narrative & Attachment Assembly',
    description: 'Mandatory perio charting, pre-op radiographs, intraoral photographs, and doctor narratives attached per payer rules.',
    outcome: 'Eliminates attachment request stalls',
  },
  {
    stageNumber: 3,
    name: 'Daily Clean Electronic Batch Submission',
    description: 'Every claim scrubbed against clearinghouse edits and transmitted before close of business.',
    outcome: '98%+ first-pass acceptance within 24h',
  },
  {
    stageNumber: 4,
    name: 'EFT, Check & Line-Item Payment Posting',
    description: 'Insurance disbursements and allowable contractual adjustments posted to exact tooth numbers.',
    outcome: '100% reconciliation with bank deposits',
  },
  {
    stageNumber: 5,
    name: 'Assertive Denial Investigation & Appeals',
    description: 'Immediate triage of rejections with peer-to-peer clinical narratives and regulatory appeals.',
    outcome: '88% overturned appeal recovery rate',
  },
  {
    stageNumber: 6,
    name: 'Active Aging AR Follow-Up & Reporting',
    description: 'Every outstanding claim older than 30 days worked systematically every 14 business days until paid.',
    outcome: '<10% AR remaining over 90 days',
  },
];

interface SolutionsPageProps {
  onOpenAuditModal: () => void;
  onNavigate: (page: NavigationPage) => void;
}

export const SolutionsPage: React.FC<SolutionsPageProps> = ({
  onOpenAuditModal,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<string>(SOLUTION_PILLARS[0].id);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const currentPillar = SOLUTION_PILLARS.find((p) => p.id === activeTab) || SOLUTION_PILLARS[0];

  const onboardingSteps = [
    {
      step: 'Day 1',
      title: 'Practice Discovery & Scope Calibration',
      desc: '30-minute kick-off call with our senior dental RCM architect to align on fee schedules, doctor billing preferences, and primary carrier pain points.',
    },
    {
      step: 'Day 2',
      title: 'Mutual BAA Execution & Secure VPN Setup',
      desc: 'Our IT compliance team executes our mutual BAA and establishes an encrypted remote VPN link to your dedicated in-office dental workstation.',
    },
    {
      step: 'Day 3',
      title: 'Software Calibration & Clearinghouse Sync',
      desc: 'We calibrate billing rules inside your Dentrix, Eaglesoft, or Open Dental system and verify direct clearinghouse connectivity (DentalXChange, Change Healthcare, etc.).',
    },
    {
      step: 'Day 4',
      title: 'Aging AR Baseline & Ledger Audit',
      desc: 'We run a comprehensive aging insurance ledger report to identify every claim older than 60 days and catalog missing attachments or carrier stall tactics.',
    },
    {
      step: 'Day 5–7',
      title: 'Live Go-Live & Daily Submissions Begin',
      desc: 'Daily claims batching, pre-visit eligibility verification, and aging AR recovery go live with zero interruption to your patient schedule.',
    },
  ];

  const billingFaqs = [
    {
      q: 'Do you replace our front-desk team?',
      a: 'Never. We empower your front-desk staff! By taking over the tedious 45-minute carrier phone calls, claim tracking, and denial appeals, your front desk can focus 100% on greeting patients, presenting treatment plans, and increasing same-day case acceptance.',
    },
    {
      q: 'How do you submit attachments like radiographs and perio charts?',
      a: 'We access your digital imaging software (Dexis, Schick, Carestream, Sidexis, etc.) directly via our remote link, attach required bitewings, PAs, panos, and perio charts to electronic claims through your clearinghouse, ensuring zero attachment rejection delays.',
    },
    {
      q: 'What clearinghouses do you support?',
      a: 'We support all major dental clearinghouses including DentalXChange, Change Healthcare / Emdeon, Dentrix eClaims, Vyne Dental (NEA FastAttach), ClaimConnect, and Apex EDI.',
    },
    {
      q: 'How do we track the work your team performs daily?',
      a: 'Full transparency is our core promise. Every action, claim note, payment posting, and denial appeal is entered directly into your practice management software in real time. We also deliver concise weekly and monthly reconciliation summaries.',
    },
  ];

  return (
    <div className="bg-[#F8FAFB] text-[#12304A]">
      {/* 1. Solutions Hero */}
      <section className="bg-white border-b border-slate-200 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#E8F7F6] text-[#12304A] text-xs font-bold uppercase tracking-wider mb-4">
              <Layers className="w-3.5 h-3.5 text-[#16A6A3]" />
              <span>Full-Scope Dental RCM Portfolio</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#12304A] tracking-tight mb-6">
              Complete Dental Revenue Cycle Management
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6">
              From proactive pre-visit insurance breakdown to daily claim scrubbing and aggressive denial appeals, we cover every stage of the dental billing lifecycle to ensure 98%+ collections.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenAuditModal}
                className="px-6 py-3.5 bg-[#12304A] hover:bg-[#16A6A3] text-white rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer flex items-center gap-2 shadow-sm"
              >
                <CalendarCheck className="w-4 h-4 text-teal-300" />
                <span>Request Free Practice Audit</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  onNavigate('pricing');
                }}
                className="px-5 py-3.5 bg-white hover:bg-slate-50 border border-slate-300 text-[#12304A] rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
              >
                <span>View Transparent Pricing &amp; ROI</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive 5 Core Pillars Deep Dive */}
      <section className="py-16 bg-[#F8FAFB] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#12304A] tracking-tight mb-3">
              The 5 Pillars of DentiSure Revenue Certainty
            </h2>
            <p className="text-sm text-slate-600">
              Select any solution below to review our standard operating procedures, deliverables, and practice performance metrics.
            </p>
          </div>

          {/* Solution Selector Tabs */}
          <div className="flex overflow-x-auto pb-2 mb-8 gap-2 border-b border-slate-200 scrollbar-none">
            {SOLUTION_PILLARS.map((pillar) => (
              <button
                key={pillar.id}
                onClick={() => setActiveTab(pillar.id)}
                className={`px-4 py-3 text-xs sm:text-sm font-bold rounded-xl whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === pillar.id
                    ? 'bg-[#12304A] text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <span>{pillar.title}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded font-extrabold ${
                    activeTab === pillar.id
                      ? 'bg-teal-500/30 text-teal-300'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {pillar.badge}
                </span>
              </button>
            ))}
          </div>

          {/* Active Solution Detail Box */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7">
                <span className="text-xs font-bold text-[#16A6A3] uppercase tracking-wider block mb-1">
                  {currentPillar.subtitle}
                </span>
                <h3 className="text-2xl font-extrabold text-[#12304A] mb-4">
                  {currentPillar.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {currentPillar.workflowDetail}
                </p>

                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Key Deliverables &amp; Practice Protocols
                </h4>
                <div className="space-y-2.5 mb-6">
                  {currentPillar.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-teal-50/70 border border-teal-200/80 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-teal-900 block">
                      Target Practice Metric:
                    </span>
                    <span className="text-sm font-extrabold text-[#12304A]">
                      {currentPillar.metricsImpact}
                    </span>
                  </div>
                  <button
                    onClick={onOpenAuditModal}
                    className="px-4 py-2 bg-[#12304A] hover:bg-[#16A6A3] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    Audit This Area
                  </button>
                </div>
              </div>

              {/* Workflow Snapshot Card */}
              <div className="lg:col-span-5 bg-[#F8FAFB] p-6 rounded-xl border border-slate-200 space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#12304A] border-b border-slate-200 pb-3">
                  <ShieldCheck className="w-4 h-4 text-[#16A6A3]" />
                  <span>DentiSure Execution Standard</span>
                </div>
                <div className="space-y-3 text-xs text-slate-600">
                  <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                    <span>Turnaround Time</span>
                    <strong className="text-[#12304A]">Daily / Under 24h</strong>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                    <span>Software Compatibility</span>
                    <strong className="text-[#12304A]">All Major PMS</strong>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                    <span>Clean Claim Scrubbing</span>
                    <strong className="text-emerald-700">CDT &amp; Attachment Pre-Check</strong>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                    <span>Appeals Success</span>
                    <strong className="text-emerald-700">88% Overturn Rate</strong>
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 italic">
                  All work performed directly inside your PMS with complete audit trails.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The 6-Stage Claims Lifecycle */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#12304A] tracking-tight mb-3">
              The 6-Stage Clean Claim Lifecycle
            </h2>
            <p className="text-sm text-slate-600">
              How we eliminate claim stalls, attachment rejections, and carrier delays from appointment to bank deposit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CLAIM_LIFECYCLE_STAGES.map((stage) => (
              <div
                key={stage.stageNumber}
                className="bg-[#F8FAFB] p-6 rounded-2xl border border-slate-200 relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-8 h-8 rounded-lg bg-[#12304A] text-white text-xs font-bold flex items-center justify-center">
                      0{stage.stageNumber}
                    </span>
                    <span className="text-[10px] font-bold text-[#16A6A3] bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                      Standard SOP
                    </span>
                  </div>
                  <h3 className="font-extrabold text-base text-[#12304A] mb-2">
                    {stage.name}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {stage.description}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-200/80 text-[11px] font-bold text-slate-700 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>{stage.outcome}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. 1-Week Rapid Onboarding Roadmap */}
      <section className="py-16 bg-[#F8FAFB] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#E8F7F6] text-[#12304A] text-xs font-bold uppercase tracking-wider mb-3">
              <Clock className="w-3.5 h-3.5 text-[#16A6A3]" />
              <span>Zero Clinical Downtime</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#12304A] tracking-tight mb-3">
              How Fast Can We Onboard Your Dental Practice?
            </h2>
            <p className="text-sm text-slate-600">
              We go live in 5 to 7 business days with zero interruption to your patients or daily chairside schedule.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {onboardingSteps.map((step, idx) => (
              <div
                key={idx}
                className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-2xs"
              >
                <div className="w-14 h-14 rounded-xl bg-[#12304A] text-teal-300 font-extrabold text-sm flex items-center justify-center flex-shrink-0">
                  {step.step}
                </div>
                <div className="flex-1">
                  <h3 className="font-extrabold text-sm sm:text-base text-[#12304A] mb-1">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Billing FAQ Section */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#12304A] tracking-tight text-center mb-8">
            Frequently Asked Questions About Our Billing Solutions
          </h2>

          <div className="space-y-3">
            {billingFaqs.map((faq, i) => (
              <div
                key={i}
                className="border border-slate-200 rounded-xl bg-[#F8FAFB] overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-4 sm:p-5 text-left font-bold text-sm text-[#12304A] flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-100 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 transition-transform ${
                      openFaq === i ? 'rotate-180 text-[#16A6A3]' : ''
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 bg-white">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Closing CTA */}
      <section className="py-14 bg-[#12304A] text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
            Ready to Streamline Your Practice Billing?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mb-6 max-w-xl mx-auto">
            Get an in-depth audit of your aging claims and uncollected dental revenue at zero cost or obligation.
          </p>
          <button
            onClick={onOpenAuditModal}
            className="px-6 py-3.5 bg-[#16A6A3] hover:bg-teal-500 text-white font-bold text-sm rounded-xl transition-colors cursor-pointer inline-flex items-center gap-2 shadow-sm"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Schedule Free Practice Revenue Audit</span>
          </button>
        </div>
      </section>
    </div>
  );
};
