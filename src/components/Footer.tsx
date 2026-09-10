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
    <footer className="w-full bg-[#12304A] text-slate-200 pt-14 pb-12 border-t border-[#001B31]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Top 4-Column Grid per Stitch Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Column 1: Brand & Contact Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <button
                onClick={() => handleNav('home')}
                className="text-left cursor-pointer focus:outline-none"
              >
                <Logo variant="white" height={cmsData.footer?.logoHeight || cmsData.branding?.footerLogoHeight || 40} />
              </button>
            </div>
            <p className="font-body-sm text-xs text-slate-300 mb-4 leading-relaxed">
              {cmsData.footer?.aboutText ||
                'Pan-India clinical revenue cycle management engineered specifically for dental chains, multi-chair clinics, and private practices across metro and tier-2 hubs.'}
            </p>
            <div className="font-body-sm text-xs text-slate-300 space-y-1.5">
              <p>
                <strong className="text-white">Registered Office:</strong> Level 4, Brigade Signature Towers, Indiranagar, Bengaluru, Karnataka 560038
              </p>
              <p>
                <strong className="text-white">Direct Phone:</strong>{' '}
                <a href={`tel:${(cmsData.brand?.phone || '+919876543210').replace(/[^0-9+]/g, '')}`} className="text-[#7EF5F1] hover:underline font-mono">
                  {cmsData.brand?.phone || '+91 98765 43210'}
                </a>
              </p>
              <p>
                <strong className="text-white">Email:</strong>{' '}
                <a href="mailto:advisory@dentisure.com" className="text-[#7EF5F1] hover:underline">
                  advisory@dentisure.com
                </a>
              </p>
            </div>
          </div>

          {/* Column 2: RCM Solutions */}
          <div>
            <h4 className="font-headline-sm text-sm text-white font-bold mb-4 tracking-tight">
              RCM Solutions
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <button
                  onClick={() => handleNav('solutions')}
                  className="hover:text-[#7EF5F1] transition-colors cursor-pointer text-left"
                >
                  Pre-Visit Insurance Verification
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('solutions')}
                  className="hover:text-[#7EF5F1] transition-colors cursor-pointer text-left"
                >
                  Daily Ledger Posting &amp; Reconciliation
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('solutions')}
                  className="hover:text-[#7EF5F1] transition-colors cursor-pointer text-left"
                >
                  Radiograph Packaging &amp; Pre-Auths
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('solutions')}
                  className="hover:text-[#7EF5F1] transition-colors cursor-pointer text-left"
                >
                  30+ Day AR Recovery Squad
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('solutions')}
                  className="hover:text-[#7EF5F1] transition-colors cursor-pointer text-left"
                >
                  Denial Dispute &amp; Resubmission
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenBrochureModal}
                  className="text-amber-300 font-semibold hover:underline cursor-pointer flex items-center gap-1 pt-1"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Download Practice Brochure</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Compliance & Security */}
          <div>
            <h4 className="font-headline-sm text-sm text-white font-bold mb-4 tracking-tight">
              Compliance &amp; Security
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#85F8C4] shrink-0" />
                <span>DPDP Act 2023 Compliant</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#85F8C4] shrink-0" />
                <span>NABH Documentation Standards</span>
              </li>
              <li className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#85F8C4] shrink-0" />
                <span>256-Bit SSL Remote Tunnels</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#85F8C4] shrink-0" />
                <span>ISO 27001 Aligned Protocols</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#85F8C4] shrink-0" />
                <span>Zero Clinical Data Residue</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Supported PMS Sync */}
          <div>
            <h4 className="font-headline-sm text-sm text-white font-bold mb-4 tracking-tight">
              Supported PMS Sync
            </h4>
            <div className="grid grid-cols-2 gap-1.5 font-mono text-xs mb-3">
              <span className="rounded bg-[#001B31] px-2 py-1 text-slate-300 text-center font-medium border border-slate-700/50">Practo Ray</span>
              <span className="rounded bg-[#001B31] px-2 py-1 text-slate-300 text-center font-medium border border-slate-700/50">Clinicea</span>
              <span className="rounded bg-[#001B31] px-2 py-1 text-slate-300 text-center font-medium border border-slate-700/50">Dentrix</span>
              <span className="rounded bg-[#001B31] px-2 py-1 text-slate-300 text-center font-medium border border-slate-700/50">Eaglesoft</span>
              <span className="rounded bg-[#001B31] px-2 py-1 text-slate-300 text-center font-medium border border-slate-700/50">Open Dental</span>
              <span className="rounded bg-[#001B31] px-2 py-1 text-slate-300 text-center font-medium border border-slate-700/50">Carestream</span>
            </div>
            <div className="p-3 rounded-xl bg-[#001B31] text-slate-300 text-[11px] leading-snug border border-slate-700/60">
              <p className="font-semibold text-white mb-0.5">Seamless Remote Tunneling</p>
              Syncs directly with local chairside workstations without interrupting clinical workflows.
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Legal Links, Agency Credit, and CMS Portal Button */}
        <div className="pt-6 border-t border-slate-700/70 text-xs text-slate-400 flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="text-center lg:text-left">
            {cmsData.footer?.copyright || '© 2026 DentiSure Solutions Pvt. Ltd. All rights reserved.'}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
            <button onClick={() => handleNav('terms')} className="hover:text-[#7EF5F1] transition-colors cursor-pointer">
              Terms of Service
            </button>
            <span>|</span>
            <button onClick={() => handleNav('privacy')} className="hover:text-[#7EF5F1] transition-colors cursor-pointer">
              Privacy Policy
            </button>
            <span>|</span>
            <button onClick={() => handleNav('hipaa')} className="hover:text-[#7EF5F1] transition-colors cursor-pointer">
              DPDP Compliance
            </button>
            <span>|</span>
            <button
              onClick={() => {
                window.location.hash = '#/admin';
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-[#7EF5F1] hover:text-white font-semibold cursor-pointer flex items-center gap-1"
              title="Open Admin CMS Portal"
            >
              <Lock className="w-3 h-3" />
              <span>Admin CMS</span>
            </button>
          </div>

          {/* Agency Attribution Badge (ClickIn DMA) */}
          <div className="rounded-full bg-[#001B31] px-4 py-1.5 text-[11px] text-[#7EF5F1] border border-teal-500/30 text-center">
            <span className="text-slate-400">Website Designed &amp; Developed by</span>{' '}
            <strong className="text-[#7EF5F1] font-bold">
              {cmsData.footer?.agencyCredit || 'ClickIn Digital Marketing Agency (ClickIn DMA)'}
            </strong>
          </div>
        </div>
      </div>
    </footer>
  );
};
