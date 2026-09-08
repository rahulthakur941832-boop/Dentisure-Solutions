import React, { useState } from 'react';
import { useCms } from '../context/CmsContext';
import {
  LayoutDashboard,
  Inbox,
  FileText,
  Image as ImageIcon,
  Settings,
  Globe,
  Shield,
  LogOut,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Sparkles,
  ShieldCheck,
  Home,
  Users,
  Layers,
  DollarSign,
  BookOpen,
  Bell,
  Scale,
} from 'lucide-react';

export type AdminViewType =
  | 'overview'
  | 'leads'
  | 'page-home'
  | 'page-about'
  | 'page-solutions'
  | 'page-pricing'
  | 'page-legal'
  | 'blog'
  | 'media'
  | 'settings'
  | 'seo'
  | 'security';

interface AdminLayoutProps {
  currentView: AdminViewType;
  onSelectView: (view: AdminViewType) => void;
  onExitToLiveSite: () => void;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentView,
  onSelectView,
  onExitToLiveSite,
  children,
}) => {
  const { cmsData, logout, leads } = useCms();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [pagesMenuExpanded, setPagesMenuExpanded] = useState(true);

  const newLeadsCount = (leads || []).filter((l) => l.status === 'New').length;

  const isPageViewActive = [
    'page-home',
    'page-about',
    'page-solutions',
    'page-pricing',
    'page-legal',
  ].includes(currentView);

  const getViewTitle = (): { section: string; title: string } => {
    switch (currentView) {
      case 'overview':
        return { section: 'Administration', title: 'Dashboard Overview' };
      case 'leads':
        return { section: 'CRM & Audit Pipeline', title: 'Practice Inquiries & Leads' };
      case 'page-home':
        return { section: 'Pages Management', title: 'Home Page CMS' };
      case 'page-about':
        return { section: 'Pages Management', title: 'About & Leadership' };
      case 'page-solutions':
        return { section: 'Pages Management', title: 'Solutions & Service Pillars' };
      case 'page-pricing':
        return { section: 'Pages Management', title: 'Pricing & Contingency' };
      case 'page-legal':
        return { section: 'Pages Management', title: 'Legal & HIPAA Compliance' };
      case 'blog':
        return { section: 'Resources', title: 'Blog & Clinical Guides' };
      case 'media':
        return { section: 'Asset Management', title: 'Media Library' };
      case 'settings':
        return { section: 'Global Configuration', title: 'Brand, Header & Footer' };
      case 'seo':
        return { section: 'Search Optimization', title: 'SEO & SERP Simulator' };
      case 'security':
        return { section: 'System Governance', title: 'Security & JSON Backup' };
      default:
        return { section: 'Admin Portal', title: 'CMS Control Center' };
    }
  };

  const navItemClass = (view: AdminViewType) =>
    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
      currentView === view
        ? 'bg-[#16A6A3] text-white shadow-xs font-bold'
        : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
    }`;

  const subNavItemClass = (view: AdminViewType) =>
    `flex items-center gap-2.5 px-3 py-2 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
      currentView === view
        ? 'bg-[#16A6A3] text-white font-bold'
        : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
    }`;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col antialiased">
      {/* Mobile Top Navigation */}
      <div className="lg:hidden bg-[#12304A] text-white px-4 py-3 flex items-center justify-between border-b border-slate-800 sticky top-0 z-40">
        <div className="flex items-center gap-2.5">
          <img
            src="/favicon-white.png"
            alt="DentiSure Icon"
            className="w-8 h-8 rounded-lg object-contain bg-white p-0.5"
          />
          <div>
            <div className="font-black tracking-tight text-xs">DentiSure CMS</div>
            <div className="text-[10px] text-teal-400 font-semibold">Admin Dashboard</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onExitToLiveSite}
            className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Site</span>
          </button>
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-1.5 rounded-lg bg-white/10 text-white cursor-pointer"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Fixed Desktop / Drawer Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#12304A] text-white flex flex-col justify-between border-r border-slate-800/80 transition-transform duration-200 lg:translate-x-0 lg:static lg:z-auto ${
            mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* Top Brand & Status */}
          <div className="p-5 border-b border-slate-800/80 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-1 bg-white rounded-xl shadow-sm border border-slate-700/60">
                  <img
                    src="/favicon-white.png"
                    alt="DentiSure Original Icon"
                    className="w-8 h-8 rounded-lg object-contain"
                  />
                </div>
                <div>
                  <div className="font-extrabold text-sm tracking-tight text-white">DentiSure CMS</div>
                  <div className="text-[10px] text-slate-400 font-medium">Enterprise Control Panel</div>
                </div>
              </div>

              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="lg:hidden p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Status Pills */}
            <div className="flex items-center gap-2 pt-1">
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-semibold text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Sync
              </div>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-teal-500/10 border border-teal-500/20 text-[10px] font-semibold text-teal-300">
                <ShieldCheck className="w-3 h-3" />
                HIPAA Guard
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {/* 1. Overview */}
            <button
              onClick={() => {
                onSelectView('overview');
                setMobileSidebarOpen(false);
              }}
              className={`w-full ${navItemClass('overview')}`}
            >
              <LayoutDashboard className="w-4 h-4 shrink-0" />
              <span>Dashboard Overview</span>
            </button>

            {/* 2. Leads CRM */}
            <button
              onClick={() => {
                onSelectView('leads');
                setMobileSidebarOpen(false);
              }}
              className={`w-full justify-between ${navItemClass('leads')}`}
            >
              <div className="flex items-center gap-3">
                <Inbox className="w-4 h-4 shrink-0" />
                <span>Leads &amp; Inquiries</span>
              </div>
              {newLeadsCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-500 text-white shadow-xs">
                  {newLeadsCount}
                </span>
              )}
            </button>

            {/* 3. Pages CMS Accordion */}
            <div className="pt-2">
              <button
                onClick={() => setPagesMenuExpanded(!pagesMenuExpanded)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isPageViewActive ? 'text-teal-300' : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 shrink-0" />
                  <span>Website Pages</span>
                </div>
                {pagesMenuExpanded ? (
                  <ChevronDown className="w-3.5 h-3.5" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5" />
                )}
              </button>

              {pagesMenuExpanded && (
                <div className="pl-4 pr-1 py-1 space-y-0.5 mt-0.5 border-l border-slate-700/60 ml-5">
                  <button
                    onClick={() => {
                      onSelectView('page-home');
                      setMobileSidebarOpen(false);
                    }}
                    className={`w-full ${subNavItemClass('page-home')}`}
                  >
                    <Home className="w-3.5 h-3.5" />
                    <span>Home Page</span>
                  </button>
                  <button
                    onClick={() => {
                      onSelectView('page-about');
                      setMobileSidebarOpen(false);
                    }}
                    className={`w-full ${subNavItemClass('page-about')}`}
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>About &amp; Team</span>
                  </button>
                  <button
                    onClick={() => {
                      onSelectView('page-solutions');
                      setMobileSidebarOpen(false);
                    }}
                    className={`w-full ${subNavItemClass('page-solutions')}`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Solutions &amp; Pillars</span>
                  </button>
                  <button
                    onClick={() => {
                      onSelectView('page-pricing');
                      setMobileSidebarOpen(false);
                    }}
                    className={`w-full ${subNavItemClass('page-pricing')}`}
                  >
                    <DollarSign className="w-3.5 h-3.5" />
                    <span>Pricing &amp; Rates</span>
                  </button>
                  <button
                    onClick={() => {
                      onSelectView('page-legal');
                      setMobileSidebarOpen(false);
                    }}
                    className={`w-full ${subNavItemClass('page-legal')}`}
                  >
                    <Scale className="w-3.5 h-3.5" />
                    <span>Legal &amp; HIPAA</span>
                  </button>
                </div>
              )}
            </div>

            {/* 4. Blog & Guides */}
            <button
              onClick={() => {
                onSelectView('blog');
                setMobileSidebarOpen(false);
              }}
              className={`w-full ${navItemClass('blog')}`}
            >
              <BookOpen className="w-4 h-4 shrink-0" />
              <span>Blog &amp; Guides</span>
            </button>

            {/* 5. Media Library */}
            <button
              onClick={() => {
                onSelectView('media');
                setMobileSidebarOpen(false);
              }}
              className={`w-full ${navItemClass('media')}`}
            >
              <ImageIcon className="w-4 h-4 shrink-0" />
              <span>Media Library</span>
            </button>

            {/* 6. Global Settings */}
            <button
              onClick={() => {
                onSelectView('settings');
                setMobileSidebarOpen(false);
              }}
              className={`w-full ${navItemClass('settings')}`}
            >
              <Settings className="w-4 h-4 shrink-0" />
              <span>Brand &amp; Headers</span>
            </button>

            {/* 7. SEO & Metadata */}
            <button
              onClick={() => {
                onSelectView('seo');
                setMobileSidebarOpen(false);
              }}
              className={`w-full ${navItemClass('seo')}`}
            >
              <Globe className="w-4 h-4 shrink-0" />
              <span>SEO &amp; Social</span>
            </button>

            {/* 8. Security & Backup */}
            <button
              onClick={() => {
                onSelectView('security');
                setMobileSidebarOpen(false);
              }}
              className={`w-full ${navItemClass('security')}`}
            >
              <Shield className="w-4 h-4 shrink-0" />
              <span>Security &amp; Backup</span>
            </button>
          </div>

          {/* Bottom Profile & Actions */}
          <div className="p-3 border-t border-slate-800/80 space-y-2">
            <div className="p-2.5 bg-slate-900/60 rounded-xl border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-[#16A6A3] text-white flex items-center justify-center font-bold text-xs">
                  AO
                </div>
                <div>
                  <div className="font-bold text-xs text-white">Admin Operator</div>
                  <div className="text-[10px] text-teal-400">Authenticated</div>
                </div>
              </div>
              <button
                onClick={logout}
                title="Log out of CMS session"
                className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-white/5 rounded-lg cursor-pointer transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </aside>

        {/* Backdrop for mobile drawer */}
        {mobileSidebarOpen && (
          <div
            onClick={() => setMobileSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-xs lg:hidden"
          />
        )}

        {/* Main Workspace Area */}
        <main className="flex-1 flex flex-col min-w-0">
          {/* Top Breadcrumb & Live Site Bar */}
          <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400 font-medium">{getViewTitle().section}</span>
              <span className="text-slate-300">/</span>
              <span className="font-bold text-slate-900">{getViewTitle().title}</span>
            </div>

            <div className="flex items-center gap-3">
              {newLeadsCount > 0 && (
                <button
                  onClick={() => onSelectView('leads')}
                  className="px-3 py-1.5 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 text-xs font-bold flex items-center gap-1.5 hover:bg-rose-100 cursor-pointer transition-colors"
                >
                  <Bell className="w-3.5 h-3.5 text-rose-600" />
                  <span>{newLeadsCount} New Inquiries</span>
                </button>
              )}

              {/* View Live Website Button */}
              <button
                onClick={onExitToLiveSite}
                className="px-3.5 py-1.5 rounded-xl bg-[#12304A] hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs transition-all"
              >
                <ExternalLink className="w-3.5 h-3.5 text-teal-300" />
                <span>View Live Site</span>
              </button>
            </div>
          </header>

          {/* Child View Container */}
          <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};
