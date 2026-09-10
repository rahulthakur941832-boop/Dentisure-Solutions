import React, { useState } from 'react';
import { Logo } from './Logo';
import { useCms } from '../context/CmsContext';
import { NavigationPage, HeaderNavItem } from '../types';
import {
  Phone,
  ShieldCheck,
  Menu,
  X,
  ArrowRight,
  CalendarCheck,
  ExternalLink,
} from 'lucide-react';

interface HeaderProps {
  currentPage: NavigationPage;
  onNavigate: (page: NavigationPage) => void;
  onOpenAuditModal: () => void;
  onOpenBrochureModal?: () => void;
}

const DEFAULT_NAV_ITEMS: HeaderNavItem[] = [
  { id: 'nav-home', label: 'Home', page: 'home', enabled: true, order: 1 },
  { id: 'nav-about', label: 'About Us', page: 'about', enabled: true, order: 2 },
  { id: 'nav-solutions', label: 'Solutions', page: 'solutions', enabled: true, order: 3 },
  { id: 'nav-pricing', label: 'Pricing & ROI', page: 'pricing', enabled: true, order: 4 },
  { id: 'nav-blog', label: 'Blog & Guides', page: 'blog', enabled: true, order: 5 },
  { id: 'nav-contact', label: 'Contact Us', page: 'contact', enabled: true, order: 6 },
];

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenAuditModal,
}) => {
  const { cmsData } = useCms();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Dynamic Navigation items directly from CMS state (add, edit, delete in real-time)
  const navItems: HeaderNavItem[] = (
    cmsData.header?.navItems && cmsData.header.navItems.length > 0
      ? cmsData.header.navItems
      : DEFAULT_NAV_ITEMS
  )
    .filter((item) => item.enabled !== false)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  const handleItemClick = (item: HeaderNavItem) => {
    setMobileMenuOpen(false);
    if (item.isExternal && item.href) {
      window.open(item.href, '_blank', 'noopener,noreferrer');
      return;
    }
    if (item.page) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      onNavigate(item.page as NavigationPage);
    }
  };

  const showTopBar = cmsData.header?.showTopBar !== false;

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* 1. Top Announcement Bar (Stitch Specification) */}
      {showTopBar && (
        <div className="h-10 bg-[#001B31] px-4 sm:px-8 text-slate-200 flex items-center justify-between text-xs border-b border-[#12304A]">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#12304A] px-2.5 py-0.5 text-[#7EF5F1] font-mono text-[11px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7EF5F1] animate-pulse" />
              <span>PAN-INDIA ADVISORY DESK: {cmsData.brand?.phone || '+91 98765 43210'}</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-2 text-slate-400 text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#7EF5F1]" />
            <span>Direct Encrypted Remote Sync with Practo Ray, Clinicea, Dentrix &amp; Eaglesoft</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                onNavigate('contact');
              }}
              className="text-[11px] font-semibold text-[#7EF5F1] hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Book Free 10-Point Audit</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* 2. Main Navigation Bar (Stitch Specification) */}
      <div className="h-20 bg-white/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-slate-200/80 px-4 sm:px-8 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            onNavigate('home');
          }}
          className="text-left cursor-pointer focus:outline-none shrink-0"
        >
          <Logo variant="full" height={cmsData.header?.logoHeight || cmsData.branding?.headerLogoHeight || 44} />
        </button>

        {/* Dynamic Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-2 font-medium text-[14px]">
          {navItems.map((item) => {
            const isActive = !item.isExternal && currentPage === item.page;
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item)}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1 relative ${
                  isActive
                    ? 'bg-[#ECEEF0] text-[#001B31] font-bold shadow-xs'
                    : 'text-[#43474D] hover:text-[#001B31] hover:bg-slate-100/70'
                }`}
              >
                <span>{item.label}</span>
                {item.isExternal && <ExternalLink className="w-3 h-3 text-slate-400" />}
                {isActive && (
                  <span className="absolute bottom-0 left-2.5 right-2.5 h-0.5 bg-[#006A68] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Phone + Claim Free Revenue Audit Pill Button */}
        <div className="flex items-center gap-3">
          <a
            href={`tel:${(cmsData.brand?.phone || '+919876543210').replace(/[^0-9+]/g, '')}`}
            className="hidden sm:flex items-center gap-1.5 text-[#001B31] font-mono text-xs font-semibold hover:text-[#006A68] transition-colors px-2 py-1"
          >
            <Phone className="w-4 h-4 text-[#006A68]" />
            <span>{cmsData.brand?.phone || '+91 98765 43210'}</span>
          </a>

          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              onNavigate('contact');
            }}
            className="inline-flex items-center justify-center rounded-full bg-[#006A68] hover:bg-[#00504E] text-white text-xs sm:text-sm font-bold px-4 sm:px-6 py-2.5 shadow-sm transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <span>{cmsData.header?.auditButtonText || 'Claim Free Revenue Audit'}</span>
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 text-slate-700 hover:text-[#006A68] focus:outline-none cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-5 py-4 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-1 font-semibold text-slate-800 text-sm">
            {navItems.map((item) => {
              const isActive = !item.isExternal && currentPage === item.page;
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className={`text-left py-2.5 px-3 rounded-lg transition-colors flex items-center justify-between cursor-pointer ${
                    isActive
                      ? 'bg-teal-50 text-[#006A68] font-bold'
                      : 'hover:bg-slate-50 text-slate-800'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {item.label}
                    {item.isExternal && <ExternalLink className="w-3 h-3 text-slate-400" />}
                  </span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-[#006A68]" />}
                </button>
              );
            })}

            <div className="pt-3 border-t border-slate-100 space-y-2">
              <a
                href={`tel:${(cmsData.brand?.phone || '+919876543210').replace(/[^0-9+]/g, '')}`}
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-100 text-primary font-mono text-xs font-semibold"
              >
                <Phone className="w-3.5 h-3.5 text-[#006A68]" />
                <span>{cmsData.brand?.phone || '+91 98765 43210'}</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  onNavigate('contact');
                }}
                className="w-full py-3 px-4 bg-[#006A68] hover:bg-[#00504E] text-white rounded-full text-center text-xs font-bold flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <CalendarCheck className="w-4 h-4 text-teal-200" />
                <span>{cmsData.header?.auditButtonText || 'Claim Free Revenue Audit'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
