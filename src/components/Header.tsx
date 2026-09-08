import React, { useState } from 'react';
import { Logo } from './Logo';
import { TopTicker } from './TopTicker';
import { useCms } from '../context/CmsContext';
import { NavigationPage } from '../types';
import {
  Phone,
  ShieldCheck,
  Lock,
  Menu,
  X,
  ArrowRight,
  CalendarCheck,
} from 'lucide-react';

interface HeaderProps {
  currentPage: NavigationPage;
  onNavigate: (page: NavigationPage) => void;
  onOpenAuditModal: () => void;
  onOpenBrochureModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenAuditModal,
}) => {
  const { cmsData } = useCms();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page: NavigationPage) => {
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    onNavigate(page);
  };

  const navLinks: { label: string; page: NavigationPage }[] = [
    { label: 'Home', page: 'home' },
    { label: 'About Us', page: 'about' },
    { label: 'Solutions', page: 'solutions' },
    { label: 'Pricing & ROI', page: 'pricing' },
    { label: 'Blog & Guides', page: 'blog' },
    { label: 'Contact Us', page: 'contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-[0_2px_12px_-3px_rgba(0,0,0,0.04)]">
      {/* Dynamic Top Announcement Ticker */}
      <TopTicker />

      {/* Corporate Utility Strip */}
      <div className="bg-[#12304A] text-slate-200 text-xs py-1.5 px-4 sm:px-8 border-b border-slate-700/60">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <span className="inline-flex items-center gap-1.5 text-teal-300 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              {cmsData.header.topNotice}
            </span>
            <span className="hidden lg:inline-block text-slate-500">•</span>
            <span className="hidden lg:inline-flex items-center gap-1.5 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              {cmsData.header.topNoticeBadge}
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <a
              href={`tel:${cmsData.brand.phone.replace(/[^0-9]/g, '')}`}
              className="inline-flex items-center gap-1.5 text-white hover:text-teal-300 font-semibold transition-colors"
            >
              <Phone className="w-3 h-3 text-teal-400" />
              <span className="hidden sm:inline text-slate-400">{cmsData.header.phoneLabel}</span>
              <span>{cmsData.brand.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-left cursor-pointer focus:outline-none"
        >
          <Logo variant="full" />
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-6 text-[14px] font-semibold text-slate-700">
          {navLinks.map((link) => {
            const isActive = currentPage === link.page;
            return (
              <button
                key={link.page}
                onClick={() => handleNavClick(link.page)}
                className={`transition-colors cursor-pointer py-1 relative ${
                  isActive
                    ? 'text-[#16A6A3] font-extrabold'
                    : 'text-slate-700 hover:text-[#16A6A3]'
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#16A6A3] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Button */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenAuditModal}
            className="px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-[#12304A] hover:bg-[#16A6A3] rounded-xl transition-all shadow-sm hover:shadow-md cursor-pointer flex items-center gap-2"
          >
            <CalendarCheck className="w-4 h-4 text-teal-300" />
            <span>{cmsData.header.auditButtonText || 'Request Practice Audit'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={onOpenAuditModal}
            className="px-3 py-1.5 text-xs font-bold text-white bg-[#12304A] rounded-lg shadow-xs"
          >
            Audit
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-[#16A6A3] focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-5 py-5 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-2.5 font-semibold text-slate-800 text-sm">
            {navLinks.map((link) => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.page}
                  onClick={() => handleNavClick(link.page)}
                  className={`text-left py-2.5 px-3 rounded-lg transition-colors flex items-center justify-between ${
                    isActive
                      ? 'bg-teal-50 text-[#16A6A3] font-extrabold'
                      : 'hover:bg-slate-50 text-slate-800'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-[#16A6A3]" />}
                </button>
              );
            })}

            <div className="pt-3 border-t border-slate-100 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuditModal();
                }}
                className="w-full py-3 px-4 bg-[#12304A] hover:bg-[#16A6A3] text-white rounded-xl text-center text-xs font-bold flex items-center justify-center gap-2 shadow-sm"
              >
                <CalendarCheck className="w-4 h-4 text-teal-300" />
                <span>{cmsData.header.auditButtonText || 'Request Practice Audit'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
