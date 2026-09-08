import React, { useState, useEffect } from 'react';
import { useCms } from '../context/CmsContext';
import { AdminLoginPage } from './AdminLoginPage';
import { AdminLayout, AdminViewType } from './AdminLayout';
import { DashboardOverviewView } from './views/DashboardOverviewView';
import { LeadsManagementView } from './views/LeadsManagementView';
import { PageHomeCmsView } from './views/PageHomeCmsView';
import { PageAboutCmsView } from './views/PageAboutCmsView';
import { PageSolutionsCmsView } from './views/PageSolutionsCmsView';
import { PagePricingCmsView } from './views/PagePricingCmsView';
import { PageLegalCmsView } from './views/PageLegalCmsView';
import { PageBlogCmsView } from './views/PageBlogCmsView';
import { MediaLibraryView } from './views/MediaLibraryView';
import { GlobalSettingsView } from './views/GlobalSettingsView';
import { SeoManagementView } from './views/SeoManagementView';
import { SecurityBackupView } from './views/SecurityBackupView';

interface AdminAppProps {
  onExitToLiveSite: () => void;
}

export const AdminApp: React.FC<AdminAppProps> = ({ onExitToLiveSite }) => {
  const { isAuthenticated } = useCms();
  const [currentView, setCurrentView] = useState<AdminViewType>('overview');

  // Handle browser back/forward or hash change if used
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  if (!isAuthenticated) {
    return <AdminLoginPage onBackToSite={onExitToLiveSite} />;
  }

  const renderActiveView = () => {
    switch (currentView) {
      case 'overview':
        return (
          <DashboardOverviewView
            onNavigate={(view) => setCurrentView(view as AdminViewType)}
          />
        );
      case 'leads':
        return <LeadsManagementView />;
      case 'page-home':
        return <PageHomeCmsView />;
      case 'page-about':
        return <PageAboutCmsView />;
      case 'page-solutions':
        return <PageSolutionsCmsView />;
      case 'page-pricing':
        return <PagePricingCmsView />;
      case 'page-legal':
        return <PageLegalCmsView />;
      case 'blog':
        return <PageBlogCmsView />;
      case 'media':
        return <MediaLibraryView />;
      case 'settings':
        return <GlobalSettingsView />;
      case 'seo':
        return <SeoManagementView />;
      case 'security':
        return <SecurityBackupView />;
      default:
        return (
          <DashboardOverviewView
            onNavigate={(view) => setCurrentView(view as AdminViewType)}
          />
        );
    }
  };

  return (
    <AdminLayout
      currentView={currentView}
      onSelectView={setCurrentView}
      onExitToLiveSite={onExitToLiveSite}
    >
      {renderActiveView()}
    </AdminLayout>
  );
};
