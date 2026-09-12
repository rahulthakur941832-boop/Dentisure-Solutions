import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { TopSliderBanner } from './components/TopSliderBanner';
import { Footer } from './components/Footer';
import { ContactAuditModal } from './components/ContactAuditModal';
import { BrochureModal } from './components/BrochureModal';
import { ChatbotWidget } from './components/ChatbotWidget';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { SolutionsPage } from './pages/SolutionsPage';
import { PricingPage } from './pages/PricingPage';
import { BlogPage } from './pages/BlogPage';
import { ContactPage } from './pages/ContactPage';
import { LegalPage } from './pages/LegalPage';
import { AdminApp } from './admin/AdminApp';
import { useCms } from './context/CmsContext';
import { LeadSubmission, NavigationPage } from './types';
import { updateDocumentFavicon } from './utils/googleDrive';
import { PageLoader } from './components/PageLoader';

export function App() {
  const [currentPage, setCurrentPage] = useState<NavigationPage>('home');
  const [isAuditModalOpen, setIsAuditModalOpen] = useState<boolean>(false);
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState<boolean>(false);
  const [auditProduction, setAuditProduction] = useState<string>('$85,000 – $120,000');
  const [auditGain, setAuditGain] = useState<string | undefined>(undefined);

  const { cmsData, addLead } = useCms();

  // Route check for standalone admin application
  const checkIsAdmin = () => {
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    return (
      path === '/admin' ||
      path.startsWith('/admin/') ||
      hash === '#/admin' ||
      hash.startsWith('#/admin')
    );
  };

  const [isAdminRoute, setIsAdminRoute] = useState<boolean>(checkIsAdmin);

  useEffect(() => {
    const handleUrlChange = () => {
      setIsAdminRoute(checkIsAdmin());
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);

    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  // Synchronize document title with SEO CMS
  useEffect(() => {
    if (cmsData.seo?.siteTitle && !isAdminRoute) {
      document.title = cmsData.seo.siteTitle;
    } else if (isAdminRoute) {
      document.title = 'DentiSure CMS — Standalone Admin Portal';
    }
  }, [cmsData.seo?.siteTitle, isAdminRoute]);

  // Synchronize favicon with Google Drive or custom branding
  useEffect(() => {
    const faviconUrl = cmsData.branding?.googleDriveFaviconUrl || cmsData.branding?.customFaviconUrl;
    if (faviconUrl) {
      updateDocumentFavicon(faviconUrl);
    }
  }, [cmsData.branding?.googleDriveFaviconUrl, cmsData.branding?.customFaviconUrl]);

  const handleOpenAudit = (production?: string, gain?: string) => {
    if (production) setAuditProduction(production);
    if (gain) setAuditGain(gain);
    setIsAuditModalOpen(true);
  };

  const handleExitToLiveSite = () => {
    if (window.location.hash.includes('admin')) {
      window.location.hash = '';
    }
    if (window.location.pathname.startsWith('/admin')) {
      window.history.pushState(null, '', '/');
    }
    setIsAdminRoute(false);
  };

  const handleLeadSubmitted = (newLead: LeadSubmission) => {
    addLead({
      doctorName: newLead.doctorName,
      practiceName: newLead.practiceName,
      email: newLead.email,
      phone: newLead.phone,
      pmsSoftware: newLead.pmsSoftware,
      locationsCount: newLead.locationsCount,
      monthlyProduction: newLead.monthlyProduction,
      primaryChallenge: newLead.primaryChallenge,
      servicesInterested: newLead.servicesInterested,
      preferredDate: newLead.preferredDate,
      preferredTime: newLead.preferredTime,
      source: 'Practice Audit Modal',
      notes: newLead.notes,
    });
  };

  const navigateTo = (page: NavigationPage) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Standalone Protected Admin Application
  if (isAdminRoute) {
    return <AdminApp onExitToLiveSite={handleExitToLiveSite} />;
  }

  // Public Dental Practice Website
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFB] text-[#12304A]">
      {/* White Screen Animated Brand Preloader */}
      <PageLoader />

      {/* Top Promotional Slider Banner (CMS-Controlled) */}
      <TopSliderBanner
        onNavigate={navigateTo}
        onOpenAuditModal={() => handleOpenAudit()}
      />

      {/* Primary Sticky Header */}
      <Header
        currentPage={currentPage}
        onNavigate={navigateTo}
        onOpenAuditModal={() => handleOpenAudit()}
        onOpenBrochureModal={() => setIsBrochureModalOpen(true)}
      />

      {/* Dynamic Page View */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onOpenAuditModal={handleOpenAudit}
            onNavigate={navigateTo}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage
            onOpenAuditModal={() => handleOpenAudit()}
            onNavigate={navigateTo}
          />
        )}

        {currentPage === 'solutions' && (
          <SolutionsPage
            onOpenAuditModal={() => handleOpenAudit()}
            onNavigate={navigateTo}
          />
        )}

        {currentPage === 'pricing' && (
          <PricingPage
            onOpenAuditModal={handleOpenAudit}
            onNavigate={navigateTo}
          />
        )}

        {currentPage === 'blog' && (
          <BlogPage
            onOpenAuditModal={() => handleOpenAudit()}
            onNavigate={navigateTo}
          />
        )}

        {currentPage === 'contact' && <ContactPage />}

        {(currentPage === 'terms' || currentPage === 'privacy' || currentPage === 'hipaa') && (
          <LegalPage
            initialType={currentPage}
            onNavigate={navigateTo}
            onOpenAuditModal={() => handleOpenAudit()}
          />
        )}
      </main>

      {/* Comprehensive Corporate Footer */}
      <Footer
        onNavigate={navigateTo}
        onOpenAuditModal={() => handleOpenAudit()}
        onOpenBrochureModal={() => setIsBrochureModalOpen(true)}
      />

      {/* Claims Support Desk Widget */}
      <ChatbotWidget
        onOpenAuditModal={() => handleOpenAudit()}
        onOpenBrochureModal={() => setIsBrochureModalOpen(true)}
      />

      {/* Confidential Practice Revenue Audit Modal */}
      <ContactAuditModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
        onLeadSubmitted={handleLeadSubmitted}
        initialProduction={auditProduction}
        initialEstimatedGain={auditGain}
      />

      {/* Printable Digital Brochure Modal */}
      <BrochureModal
        isOpen={isBrochureModalOpen}
        onClose={() => setIsBrochureModalOpen(false)}
        onOpenAudit={() => handleOpenAudit()}
      />

      {/* Floating Admin Panel Launcher for Quick Access */}
      <div className="fixed bottom-4 right-4 z-40">
        <button
          onClick={() => {
            window.location.hash = '#/admin';
            setIsAdminRoute(true);
          }}
          className="bg-slate-900/90 hover:bg-[#12304A] text-white border border-slate-700/80 shadow-xl px-3.5 py-2 rounded-full text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer backdrop-blur-md group hover:shadow-2xl hover:scale-105"
          title="Open DentiSure Admin CMS Portal"
        >
          <span className="w-2 h-2 rounded-full bg-[#16A6A3] animate-pulse" />
          <span>Admin CMS</span>
        </button>
      </div>
    </div>
  );
}

export default App;
