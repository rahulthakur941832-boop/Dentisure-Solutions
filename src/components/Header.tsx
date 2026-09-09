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
  const showAuditButton = cmsData.header?.showAuditButton !== false;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-[0_2px_12px_-3px_rgba(0,0,0,0.04)]">
      {/* Clean Corporate Utility Strip (No fake clutter, no Live Operations) */}
      {showTopBar && (
        <div className="bg-[#12304A] text-slate-200 text-xs py-2 px-4 sm:px-8 border-b border-slate-700/60">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-[11px] sm:text-xs text-slate-200">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              <span className="font-medium text-slate-200 truncate max-w-[280px] sm:max-w-none">
                {cmsData.header?.topNotice || 'Pan-India Dental Revenue Cycle & Practice Billing Management'}
              </span>
            </div>

            <div className="flex items-center gap-4 text-[11px] sm:text-xs">
              <a
                href={`tel:${(cmsData.brand?.phone || '+919876543210').replace(/[^0-9+]/g, '')}`}
                className="inline-flex items-center gap-1.5 text-white hover:text-teal-300 font-semibold transition-colors"
              >
                <Phone className="w-3 h-3 text-teal-400" />
                <span className="hidden sm:inline text-slate-400">
                  {cmsData.header?.phoneLabel || 'Practice Advisory Desk:'}
                </span>
                <span>{cmsData.brand?.phone || '+91 98765 43210'}</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            onNavigate('home');
          }}
          className="text-left cursor-pointer focus:outline-none"
        >
          <Logo variant="full" />
        </button>

        {/* Dynamic Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-6 text-[14px] font-semibold text-slate-700">
          {navItems.map((item) => {
            const isActive = !item.isExternal && currentPage === item.page;
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item)}
                className={`transition-colors cursor-pointer py-1 relative inline-flex items-center gap-1 ${
                  isActive
                    ? 'text-[#16A6A3] font-extrabold'
                    : 'text-slate-700 hover:text-[#16A6A3]'
                }`}
              >
                <span>{item.label}</span>
                {item.isExternal && <ExternalLink className="w-3 h-3 text-slate-400" />}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#16A6A3] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Button */}
        {showAuditButton && (
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenAuditModal}
              className="px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-[#12304A] hover:bg-[#16A6A3] rounded-xl transition-all shadow-sm hover:shadow-md cursor-pointer flex items-center gap-2"
            >
              <CalendarCheck className="w-4 h-4 text-teal-300" />
              <span>{cmsData.header?.auditButtonText || 'Free Revenue Audit'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Mobile Menu Toggle Button */}
        <div className="flex lg:hidden items-center gap-2">
          {showAuditButton && (
            <button
              onClick={onOpenAuditModal}
              className="px-3 py-1.5 text-xs font-bold text-white bg-[#12304A] rounded-lg shadow-xs"
            >
              Audit
            </button>
          )}
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
          <div className="flex flex-col space-y-2 font-semibold text-slate-800 text-sm">
            {navItems.map((item) => {
              const isActive = !item.isExternal && currentPage === item.page;
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className={`text-left py-2.5 px-3 rounded-lg transition-colors flex items-center justify-between ${
                    isActive
                      ? 'bg-teal-50 text-[#16A6A3] font-extrabold'
                      : 'hover:bg-slate-50 text-slate-800'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {item.label}
                    {item.isExternal && <ExternalLink className="w-3 h-3 text-slate-400" />}
                  </span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-[#16A6A3]" />}
                </button>
              );
            })}

            {showAuditButton && (
              <div className="pt-3 border-t border-slate-100 space-y-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuditModal();
                  }}
                  className="w-full py-3 px-4 bg-[#12304A] hover:bg-[#16A6A3] text-white rounded-xl text-center text-xs font-bold flex items-center justify-center gap-2 shadow-sm"
                >
                  <CalendarCheck className="w-4 h-4 text-teal-300" />
                  <span>{cmsData.header?.auditButtonText || 'Free Revenue Audit'}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
