import React from 'react';
import { Logo } from './Logo';
import { useCms } from '../context/CmsContext';
import { NavigationPage } from '../types';
import {
  Phone,
  Mail,
  ShieldCheck,
  Lock,
  FileText,
  Clock,
  MapPin,
  CalendarCheck,
} from 'lucide-react';

interface FooterProps {
  onNavigate?: (page: NavigationPage) => void;
  onOpenAuditModal: () => void;
  onOpenBrochureModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenAuditModal,
  onOpenBrochureModal,
}) => {
  const { cmsData } = useCms();

  const handleNav = (page: NavigationPage) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (onNavigate) {
      onNavigate(page);
    }
  };

  return (
    <footer className="bg-[#12304A] text-slate-300 pt-16 pb-12 border-t border-slate-700/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Top Callout Strip */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-10 mb-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-extrabold text-teal-300 uppercase tracking-widest block mb-1">
              Ready for Certainty in Your Dental Revenue?
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Request Your Free, Confidential Practice Revenue Audit Today.
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl">
              We review your current aging reports, identify uncollected insurance dollars, and give you a clear roadmap to collect what you are owed.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto flex-shrink-0">
            <button
              onClick={onOpenBrochureModal}
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4 text-teal-300" />
              <span>Digital Brochure</span>
            </button>

            <button
              onClick={onOpenAuditModal}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#16A6A3] hover:bg-teal-500 text-white font-bold text-xs sm:text-sm transition-all shadow-lg cursor-pointer flex items-center justify-center gap-2"
            >
              <CalendarCheck className="w-4 h-4 text-white" />
              <span>{cmsData.header.auditButtonText || 'Start Free Audit'}</span>
            </button>
          </div>
        </div>

        {/* 5 Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14 text-xs">
          {/* Col 1 & 2: Brand Information */}
          <div className="lg:col-span-2 space-y-4">
            <button
              onClick={() => handleNav('home')}
              className="text-left cursor-pointer focus:outline-none"
            >
              <Logo variant="white" showTagline={true} />
            </button>
            <p className="text-slate-300 leading-relaxed text-xs max-w-sm pt-2">
              {cmsData.footer.aboutText}
            </p>
            <div className="flex flex-col space-y-2 text-slate-300 pt-2 text-xs">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-teal-400" />
                <span>{cmsData.brand.phone} &bull; Toll-Free Nationwide</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-teal-400" />
                <span>{cmsData.brand.contactEmail}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-teal-400" />
                <span>{cmsData.brand.hours}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">US Business Address</span>
                  <span>{cmsData.brand.usBusinessAddress || cmsData.brand.address}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Col 3: Navigation Pages */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider text-xs mb-4">
              Website Pages
            </h4>
            <ul className="space-y-2 text-slate-300">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-teal-300 transition-colors cursor-pointer"
                >
                  Home Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-teal-300 transition-colors cursor-pointer"
                >
                  About Us &amp; Leadership
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('solutions')}
                  className="hover:text-teal-300 transition-colors cursor-pointer"
                >
                  Solutions &amp; 6-Stage SOP
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('pricing')}
                  className="hover:text-teal-300 transition-colors cursor-pointer text-teal-300 font-semibold"
                >
                  Pricing &amp; ROI Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('blog')}
                  className="hover:text-teal-300 transition-colors cursor-pointer"
                >
                  Dental Billing Blog &amp; Guides
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-teal-300 transition-colors cursor-pointer"
                >
                  Contact &amp; Audit Request
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal & Policies */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider text-xs mb-4">
              Legal &amp; Compliance
            </h4>
            <ul className="space-y-2 text-slate-300">
              <li>
                <button
                  onClick={() => handleNav('terms')}
                  className="hover:text-teal-300 transition-colors cursor-pointer text-left"
                >
                  Terms of Service &amp; Agreement
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('privacy')}
                  className="hover:text-teal-300 transition-colors cursor-pointer text-left"
                >
                  Privacy Policy &amp; Data Security
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('hipaa')}
                  className="hover:text-teal-300 transition-colors cursor-pointer text-left font-semibold text-teal-300"
                >
                  HIPAA &amp; BAA Statement
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenBrochureModal}
                  className="text-amber-300 font-semibold hover:underline cursor-pointer flex items-center gap-1 mt-2"
                >
                  <FileText className="w-3 h-3" />
                  <span>Download Practice Brochure</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Governance & Compliance */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider text-xs mb-4">
              Security &amp; Compliance
            </h4>
            <div className="space-y-3">
              <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-xs">
                <span className="font-bold text-teal-300 flex items-center gap-1.5 mb-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  HIPAA BAA Enforced
                </span>
                <p className="text-[11px] text-slate-400">
                  Mutual Business Associate Agreements executed prior to onboarding.
                </p>
              </div>

              <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-xs">
                <span className="font-bold text-emerald-400 flex items-center gap-1.5 mb-1">
                  <Lock className="w-3.5 h-3.5" />
                  Encrypted VPN Access
                </span>
                <p className="text-[11px] text-slate-400">
                  All claims data remains within your native PMS firewall.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimers, Agency Credit, and Copyright */}
        <div className="pt-8 border-t border-slate-800 text-[11px] text-slate-400 flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
            <span>{cmsData.footer.copyright}</span>
          </div>

          {/* Agency Credit Badge: ClickIn Digital Marketing Agency (ClickIn DMA) */}
          <div className="inline-flex items-center gap-2 bg-slate-900/90 border border-teal-500/40 px-3.5 py-1.5 rounded-full shadow-xs text-center">
            <span className="text-[10.5px] text-slate-400 font-medium">Website Designed &amp; Developed by</span>
            <span className="text-[11.5px] font-bold text-teal-300 tracking-wide">
              {cmsData.footer.agencyCredit || 'ClickIn Digital Marketing Agency (ClickIn DMA)'}
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-400">
            <button onClick={() => handleNav('terms')} className="hover:text-teal-300 cursor-pointer">
              Terms of Service
            </button>
            <span>&bull;</span>
            <button onClick={() => handleNav('privacy')} className="hover:text-teal-300 cursor-pointer">
              Privacy Policy
            </button>
            <span>&bull;</span>
            <button onClick={() => handleNav('hipaa')} className="hover:text-teal-300 cursor-pointer">
              HIPAA &amp; BAA Compliance
            </button>
            <span>&bull;</span>
            <button
              onClick={() => {
                window.location.hash = '#/admin';
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-teal-400 hover:text-teal-200 font-semibold cursor-pointer flex items-center gap-1"
              title="Open Admin CMS Portal"
            >
              <Lock className="w-3 h-3" />
              <span>Admin CMS Portal</span>
            </button>
          </div>
        </div>

        <div className="mt-4 text-[10px] text-slate-400 text-center md:text-left leading-relaxed">
          {cmsData.footer.disclaimer}
        </div>
      </div>
    </footer>
  );
};
