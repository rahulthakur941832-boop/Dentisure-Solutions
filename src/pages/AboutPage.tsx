import React from 'react';
import {
  ShieldCheck,
  Building,
  CheckCircle2,
  Users,
  Award,
  Lock,
  ArrowRight,
  Database,
  CalendarCheck,
  Activity,
  UserCheck,
} from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { NavigationPage } from '../types';

interface AboutPageProps {
  onOpenAuditModal: () => void;
  onNavigate: (page: NavigationPage) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onOpenAuditModal,
  onNavigate,
}) => {
  const { cmsData } = useCms();
  const about = cmsData.aboutPage;

  const supportedSoftware = [
    { name: 'Dentrix G4–G7', type: 'Server & Remote' },
    { name: 'Eaglesoft v17–v21', type: 'Patterson Server' },
    { name: 'Open Dental', type: 'Direct Database Sync' },
    { name: 'Curve Dental', type: 'Cloud Native' },
    { name: 'CareStack', type: 'Cloud Practice Hub' },
    { name: 'Denticon', type: 'Multi-Location Cloud' },
    { name: 'Patterson Fuse', type: 'Cloud PMS' },
    { name: 'SoftDent', type: 'Server Access' },
  ];

  const standards = [
    {
      title: 'Dedicated Dental Billing Specialists',
      desc: 'Every claim is scrubbed, tracked, and appealed by experienced dental billing professionals with comprehensive mastery of ADA CDT codes, dental clearinghouses, and payer appeal protocols.',
      icon: <Users className="w-5 h-5 text-teal-600" />,
    },
    {
      title: 'Zero Software Migration',
      desc: 'Keep your existing Dentrix, Eaglesoft, or Open Dental software. We work inside your system via secure VPN, so your clinical staff never has to learn new software.',
      icon: <Database className="w-5 h-5 text-[#16A6A3]" />,
    },
    {
      title: 'Mutual BAA & Strict HIPAA-Ready Security',
      desc: 'We execute a legally binding Business Associate Agreement (BAA) prior to accessing any system. All remote sessions use 256-bit AES encryption with multi-factor authentication.',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
    },
    {
      title: 'Contingency Fee Alignment',
      desc: 'We earn our fee only when cash is deposited into your practice bank account. Our incentives are 100% aligned with maximizing your practice collections.',
      icon: <Award className="w-5 h-5 text-amber-600" />,
    },
    {
      title: 'Daily Reconciliation Down to the Penny',
      desc: 'Every EFT, ERA, paper check, and patient copay is balanced daily with zero unallocated credits or mystery adjustments.',
      icon: <Activity className="w-5 h-5 text-blue-600" />,
    },
    {
      title: 'Rapid 1-Week Onboarding',
      desc: 'From initial discovery call and BAA execution to live daily claim submissions in just 5 to 7 business days. Zero downtime for your chair schedule.',
      icon: <CheckCircle2 className="w-5 h-5 text-teal-700" />,
    },
  ];

  return (
    <div className="bg-[#F8FAFB] text-[#12304A]">
      {/* 1. About Hero Section */}
      <section className="bg-white border-b border-slate-200 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#E8F7F6] text-[#12304A] text-xs font-bold uppercase tracking-wider mb-4">
              <Building className="w-3.5 h-3.5 text-[#16A6A3]" />
              <span>About DentiSure Solutions</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#12304A] tracking-tight mb-6">
              {about.heroTitle}
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6">
              {about.heroSubtitle}
            </p>
            <div className="p-4 sm:p-5 bg-teal-50/70 border border-teal-200/80 rounded-2xl mb-6">
              <h3 className="text-xs font-bold text-[#16A6A3] uppercase tracking-wider mb-1">
                {about.missionTitle || 'Our Mission'}
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                {about.missionText}
              </p>
            </div>
            <div className="text-sm sm:text-base text-slate-600 leading-relaxed whitespace-pre-line">
              {about.storyText}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Key Facts & Numbers */}
      <section className="py-12 bg-[#12304A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-teal-300 mb-1">
                $180M+
              </div>
              <div className="text-xs sm:text-sm text-slate-300">
                Annual Dental Claims Handled
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 mb-1">
                98.4%
              </div>
              <div className="text-xs sm:text-sm text-slate-300">
                Clean First-Pass Acceptance
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-teal-300 mb-1">
                240+
              </div>
              <div className="text-xs sm:text-sm text-slate-300">
                Solo &amp; Group Dental Practices
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 mb-1">
                88%
              </div>
              <div className="text-xs sm:text-sm text-slate-300">
                Denial Appeal Overturn Rate
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Leadership & Senior RCM Team */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#E8F7F6] text-[#12304A] text-xs font-bold uppercase tracking-wider mb-3">
              <UserCheck className="w-3.5 h-3.5 text-[#16A6A3]" />
              <span>Executive Practice Leadership</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#12304A] tracking-tight mb-3">
              Led by Experienced Dental Revenue Cycle Specialists
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Unlike generic medical billing companies that attempt to process dental claims on the side, our entire team is 100% dedicated to dental CDT coding, dental clearinghouses, and dental insurance carrier nuances.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-[#F8FAFB] rounded-2xl border border-slate-200 p-6 sm:p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-[#12304A] text-white flex items-center justify-center text-2xl font-bold flex-shrink-0 shadow-md">
                NY
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                  <div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-[#12304A]">
                      Nisha Yadav
                    </h3>
                    <span className="text-xs font-bold text-[#16A6A3]">
                      Practice Director &amp; Senior Dental Billing Architect
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-600 bg-white px-2.5 py-1 rounded-md border border-slate-200">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Senior Practice Advisor
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  With over a decade of specialized dental revenue cycle leadership, Nisha oversees direct practice integration, compliance standards, and denial appeal strategy. She has guided hundreds of private and multi-location practices in slashing 90+ day AR and reclaiming lost insurance cash flow.
                </p>
                <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start text-xs font-semibold text-slate-700">
                  <span className="inline-flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#16A6A3]" />
                    Dentrix Certified
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#16A6A3]" />
                    Eaglesoft Super-User
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#16A6A3]" />
                    Open Dental Specialist
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#16A6A3]" />
                    HIPAA Compliance Officer
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. The 6 DentiSure Operational Standards */}
      <section className="py-16 bg-[#F8FAFB] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#12304A] tracking-tight mb-3">
              Our 6 Operational Tenets
            </h2>
            <p className="text-sm text-slate-600">
              Every process we establish is designed to eliminate friction and maximize practice collections.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {standards.map((s, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center mb-4 border border-teal-100">
                    {s.icon}
                  </div>
                  <h3 className="font-extrabold text-base text-[#12304A] mb-2">
                    {s.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Software Compatibility Grid */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#12304A] tracking-tight mb-3">
              Software We Live In Every Day
            </h2>
            <p className="text-sm text-slate-600">
              No exporting CSVs or double data entry. We work directly inside your existing dental software ledger.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {supportedSoftware.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#F8FAFB] p-4 rounded-xl border border-slate-200 text-center hover:border-[#16A6A3]/60 transition-colors"
              >
                <div className="font-extrabold text-sm text-[#12304A] mb-1">{item.name}</div>
                <div className="text-[11px] text-slate-500 font-medium">{item.type}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Call to Action Banner */}
      <section className="py-16 bg-[#12304A] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-4 tracking-tight">
            See How Much Money Is Sitting in Your Dental AR Today
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8 max-w-2xl mx-auto">
            Schedule a confidential 30-minute Practice Revenue Audit. We review your aging reports and outline immediate cash recovery opportunities.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenAuditModal}
              className="px-8 py-3.5 bg-[#16A6A3] hover:bg-teal-500 text-white rounded-xl text-sm font-bold transition-all shadow-lg cursor-pointer flex items-center gap-2"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Schedule Complimentary Revenue Audit</span>
            </button>
            <button
              onClick={() => onNavigate('solutions')}
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-sm font-bold transition-colors cursor-pointer"
            >
              <span>Explore All Solutions</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
