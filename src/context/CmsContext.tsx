import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  CmsData,
  LeadSubmission,
  AdminUser,
  ResourceArticle,
  LegalDocument,
  MediaItem,
  HeaderNavItem,
} from '../types';
import { INITIAL_CMS_DATA } from '../data/initialCmsData';
import { INITIAL_LEADS } from '../data/contentData';

const CMS_STORAGE_KEY = 'dentisure_cms_content_v4';
const LEADS_STORAGE_KEY = 'dentisure_leads_data_v4';
const AUTH_STORAGE_KEY = 'dentisure_admin_session_v4';
const PASSWORD_STORAGE_KEY = 'dentisure_admin_pass_v4';

const DEFAULT_ADMIN: AdminUser = {
  name: 'Nisha Yadav',
  email: 'admin@dentisure.com',
  role: 'Senior Director of Dental RCM & Compliance',
};

const DEFAULT_PASS = 'admin123';

interface CmsContextType {
  cmsData: CmsData;
  updateSection: <K extends keyof CmsData>(
    section: K,
    updater: Partial<CmsData[K]> | ((prev: CmsData[K]) => CmsData[K])
  ) => void;
  updateCmsData: (newData: CmsData) => void;
  resetToDefaults: () => void;
  exportJsonBackup: () => void;
  importJsonBackup: (jsonString: string) => { success: boolean; error?: string };

  // Authentication
  isAuthenticated: boolean;
  adminUser: AdminUser | null;
  login: (email: string, pass: string) => { success: boolean; error?: string };
  logout: () => void;
  changePassword: (newPass: string) => { success: boolean; error?: string };

  // Leads
  leads: LeadSubmission[];
  addLead: (lead: Omit<LeadSubmission, 'id' | 'submissionDate' | 'status'>) => void;
  updateLeadStatus: (id: string, status: LeadSubmission['status']) => void;
  updateLeadNote: (id: string, note: string) => void;
  deleteLead: (id: string) => void;

  // Blog Management
  addBlogPost: (post: ResourceArticle) => void;
  updateBlogPost: (post: ResourceArticle) => void;
  deleteBlogPost: (id: string) => void;

  // Media Library Management
  addMediaItem: (item: MediaItem) => void;
  updateMediaItem: (id: string, updates: Partial<MediaItem>) => void;
  deleteMediaItem: (id: string) => void;

  // Legal Document Management
  updateLegalDoc: (type: 'terms' | 'privacy' | 'hipaa', doc: LegalDocument) => void;

  // Header Navigation Management
  addHeaderNavItem: (item: Omit<HeaderNavItem, 'id'>) => void;
  updateHeaderNavItem: (id: string, updates: Partial<HeaderNavItem>) => void;
  deleteHeaderNavItem: (id: string) => void;
  reorderHeaderNavItems: (items: HeaderNavItem[]) => void;
  resetHeaderNavItems: () => void;

  // Server & Multi-browser Persistence
  saveToServer: (dataToSave?: CmsData) => Promise<{ success: boolean; error?: string }>;
  isSyncingServer: boolean;

  // UI Modal control
  isAdminPanelOpen: boolean;
  isLoginModalOpen: boolean;
  openAdminPanel: () => void;
  closeAdminPanel: () => void;
  openLoginModal: () => void;
  closeLoginModal: () => void;
}

const CmsContext = createContext<CmsContextType | undefined>(undefined);

export const CmsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load CMS data with fallback to defaults
  const [cmsData, setCmsData] = useState<CmsData>(() => {
    try {
      const saved = localStorage.getItem(CMS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...INITIAL_CMS_DATA,
          ...parsed,
          brand: {
            ...INITIAL_CMS_DATA.brand,
            ...(parsed.brand || {}),
            // Ensure no legacy Austin / US placeholder remains if previously saved
            address: parsed.brand?.address?.includes('Austin') ? INITIAL_CMS_DATA.brand.address : (parsed.brand?.address || INITIAL_CMS_DATA.brand.address),
          },
          header: {
            ...INITIAL_CMS_DATA.header,
            ...(parsed.header || {}),
            topNoticeBadge: undefined, // remove Live Operations
            topNotice: (parsed.header?.topNotice && !parsed.header.topNotice.includes('50 US States'))
              ? parsed.header.topNotice
              : INITIAL_CMS_DATA.header.topNotice,
            navItems: (parsed.header?.navItems && parsed.header.navItems.length > 0)
              ? parsed.header.navItems
              : INITIAL_CMS_DATA.header.navItems,
            logoUrl: parsed.header?.logoUrl || parsed.branding?.headerLogoUrl || '',
            logoHeight: parsed.header?.logoHeight || parsed.branding?.headerLogoHeight || 44,
          },
          footer: {
            ...INITIAL_CMS_DATA.footer,
            ...(parsed.footer || {}),
            agencyCredit: parsed.footer?.agencyCredit || INITIAL_CMS_DATA.footer.agencyCredit,
            logoUrl: parsed.footer?.logoUrl || parsed.branding?.footerLogoUrl || '',
            logoHeight: parsed.footer?.logoHeight || parsed.branding?.footerLogoHeight || 40,
          },
          branding: {
            ...INITIAL_CMS_DATA.branding,
            ...(parsed.branding || {}),
            headerLogoUrl: parsed.branding?.headerLogoUrl || parsed.header?.logoUrl || '',
            footerLogoUrl: parsed.branding?.footerLogoUrl || parsed.footer?.logoUrl || '',
          },
        };
      }
    } catch (e) {
      console.warn('Failed to load CMS data from localStorage:', e);
    }
    return INITIAL_CMS_DATA;
  });

  // Leads state
  const [leads, setLeads] = useState<LeadSubmission[]>(() => {
    try {
      const saved = localStorage.getItem(LEADS_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to load leads from localStorage:', e);
    }
    return INITIAL_LEADS;
  });

  // Auth session
  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to load auth session:', e);
    }
    return null;
  });

  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isSyncingServer, setIsSyncingServer] = useState<boolean>(false);

  const isInitialMount = React.useRef(true);
  const serverLoadedRef = React.useRef(false);

  // Fetch authoritative server CMS data on mount so ALL browsers & incognito tabs see identical live data!
  useEffect(() => {
    let isMounted = true;
    async function loadAuthoritativeServerCms() {
      try {
        const response = await fetch('/api/cms');
        if (response.ok) {
          const json = await response.json();
          if (json?.data && isMounted) {
            const serverData = json.data;
            serverLoadedRef.current = true;
            console.log('[CMS Context] Loaded authoritative server CMS. Updating frontend state.');
            setCmsData((prev) => {
              const merged: CmsData = {
                ...INITIAL_CMS_DATA,
                ...prev,
                ...serverData,
                header: {
                  ...INITIAL_CMS_DATA.header,
                  ...(prev?.header || {}),
                  ...(serverData?.header || {}),
                  logoUrl:
                    serverData?.header?.logoUrl !== undefined
                      ? serverData.header.logoUrl
                      : serverData?.branding?.headerLogoUrl || prev?.header?.logoUrl || '',
                  logoHeight:
                    serverData?.header?.logoHeight ||
                    serverData?.branding?.headerLogoHeight ||
                    prev?.header?.logoHeight ||
                    44,
                },
                footer: {
                  ...INITIAL_CMS_DATA.footer,
                  ...(prev?.footer || {}),
                  ...(serverData?.footer || {}),
                  logoUrl:
                    serverData?.footer?.logoUrl !== undefined
                      ? serverData.footer.logoUrl
                      : serverData?.branding?.footerLogoUrl || prev?.footer?.logoUrl || '',
                  logoHeight:
                    serverData?.footer?.logoHeight ||
                    serverData?.branding?.footerLogoHeight ||
                    prev?.footer?.logoHeight ||
                    40,
                },
                branding: {
                  ...INITIAL_CMS_DATA.branding,
                  ...(prev?.branding || {}),
                  ...(serverData?.branding || {}),
                  headerLogoUrl:
                    serverData?.branding?.headerLogoUrl || serverData?.header?.logoUrl || prev?.branding?.headerLogoUrl || '',
                  footerLogoUrl:
                    serverData?.branding?.footerLogoUrl || serverData?.footer?.logoUrl || prev?.branding?.footerLogoUrl || '',
                },
              };
              try {
                localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(merged));
              } catch (_) {}
              return merged;
            });
          } else {
            serverLoadedRef.current = true;
          }
        }
      } catch (err) {
        console.warn('[CMS Context] Could not reach /api/cms, continuing with local data:', err);
        serverLoadedRef.current = true;
      }
    }
    loadAuthoritativeServerCms();
    return () => {
      isMounted = false;
    };
  }, []);

  // Sync CMS data to localStorage and dynamic document SEO
  useEffect(() => {
    try {
      localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(cmsData));
    } catch (e) {
      console.warn('Failed to save CMS data to localStorage:', e);
    }

    // Live update browser title and meta tags based on SEO CMS
    if (cmsData.seo?.siteTitle) {
      document.title = cmsData.seo.siteTitle;
    }
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && cmsData.seo?.metaDescription) {
      metaDesc.setAttribute('content', cmsData.seo.metaDescription);
    }
  }, [cmsData]);

  // Auto-sync debounced (1500ms) to server whenever cmsData changes after server initial load
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (!serverLoadedRef.current) {
      return;
    }
    const timer = setTimeout(() => {
      fetch('/api/cms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: cmsData }),
      }).catch((e) => console.warn('[CMS Context] Auto-sync to server error:', e));
    }, 1500);

    return () => clearTimeout(timer);
  }, [cmsData]);

  // Save explicitly to authoritative server storage (file + memory)
  const saveToServer = async (dataToSave?: CmsData): Promise<{ success: boolean; error?: string }> => {
    const payload = dataToSave || cmsData;
    setIsSyncingServer(true);
    try {
      const res = await fetch('/api/cms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: payload }),
      });
      if (res.ok) {
        const json = await res.json();
        console.log('[CMS Context] Saved to server storage successfully:', json);
        try {
          localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(payload));
        } catch (_) {}
        return { success: true };
      } else {
        const errJson = await res.json().catch(() => ({}));
        return { success: false, error: errJson.error || 'Server returned an error status' };
      }
    } catch (err: any) {
      console.error('[CMS Context] Network error saving to server:', err);
      return { success: false, error: err.message || 'Network error' };
    } finally {
      setIsSyncingServer(false);
    }
  };

  // Sync Leads to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(leads));
    } catch (e) {
      console.warn('Failed to save leads to localStorage:', e);
    }
  }, [leads]);

  // Sync Auth session to localStorage
  useEffect(() => {
    try {
      if (adminUser) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(adminUser));
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    } catch (e) {
      console.warn('Failed to update auth session in localStorage:', e);
    }
  }, [adminUser]);

  // Section updater
  const updateSection = <K extends keyof CmsData>(
    section: K,
    updater: Partial<CmsData[K]> | ((prev: CmsData[K]) => CmsData[K])
  ) => {
    setCmsData((prev) => {
      const currentVal = prev[section];
      let newVal: CmsData[K];
      if (typeof updater === 'function') {
        newVal = (updater as (prev: CmsData[K]) => CmsData[K])(currentVal);
      } else if (typeof currentVal === 'object' && currentVal !== null && !Array.isArray(currentVal)) {
        newVal = { ...currentVal, ...updater } as CmsData[K];
      } else {
        newVal = updater as CmsData[K];
      }
      return {
        ...prev,
        [section]: newVal,
      };
    });
  };

  const updateCmsData = (newData: CmsData) => {
    setCmsData(newData);
  };

  const resetToDefaults = () => {
    setCmsData(INITIAL_CMS_DATA);
    localStorage.removeItem(CMS_STORAGE_KEY);
    fetch('/api/cms/reset', { method: 'POST' }).catch((e) =>
      console.warn('Failed to reset server CMS:', e)
    );
  };

  const exportJsonBackup = () => {
    const backupObj = {
      version: '3.0',
      exportedAt: new Date().toISOString(),
      cmsData,
      leads,
    };
    const jsonStr = JSON.stringify(backupObj, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `DentiSure_CMS_Backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const importJsonBackup = (jsonString: string): { success: boolean; error?: string } => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.cmsData) {
        setCmsData(parsed.cmsData);
        if (Array.isArray(parsed.leads)) {
          setLeads(parsed.leads);
        }
        return { success: true };
      } else if (parsed.brand && parsed.hero) {
        setCmsData(parsed as CmsData);
        return { success: true };
      }
      return { success: false, error: 'Unrecognized JSON structure. Missing CMS nodes.' };
    } catch (err: unknown) {
      return { success: false, error: err instanceof Error ? err.message : 'Invalid JSON file format' };
    }
  };

  // Auth methods
  const login = (email: string, pass: string): { success: boolean; error?: string } => {
    const trimmedEmail = email.trim().toLowerCase();
    const storedPass = localStorage.getItem(PASSWORD_STORAGE_KEY) || DEFAULT_PASS;

    const isValidUser =
      trimmedEmail === 'admin@dentisure.com' ||
      trimmedEmail === 'nisha.yadav@dentisure.com' ||
      trimmedEmail === 'admin';

    if (isValidUser && pass === storedPass) {
      const user: AdminUser = {
        email: trimmedEmail === 'admin' ? 'admin@dentisure.com' : trimmedEmail,
        name: 'Nisha Yadav',
        role: 'Senior Director of Dental RCM & Compliance',
      };
      setAdminUser(user);
      setIsLoginModalOpen(false);
      setIsAdminPanelOpen(true);
      return { success: true };
    }
    return { success: false, error: 'Invalid email or password. Use demo credentials provided.' };
  };

  const logout = () => {
    setAdminUser(null);
    setIsAdminPanelOpen(false);
  };

  const changePassword = (newPass: string): { success: boolean; error?: string } => {
    if (!newPass || newPass.trim().length < 5) {
      return { success: false, error: 'New password must be at least 5 characters long.' };
    }
    try {
      localStorage.setItem(PASSWORD_STORAGE_KEY, newPass.trim());
      return { success: true };
    } catch (e) {
      return { success: false, error: 'Failed to update password in local storage.' };
    }
  };

  // Lead actions
  const addLead = (leadData: Omit<LeadSubmission, 'id' | 'submissionDate' | 'status'>) => {
    const newLead: LeadSubmission = {
      ...leadData,
      id: `lead-${Date.now()}`,
      submissionDate: new Date().toISOString().split('T')[0],
      status: 'New',
    };
    setLeads((prev) => [newLead, ...prev]);
  };

  const updateLeadStatus = (id: string, status: LeadSubmission['status']) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status } : l))
    );
  };

  const updateLeadNote = (id: string, note: string) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, notes: note } : l))
    );
  };

  const deleteLead = (id: string) => {
    setLeads((prev) => prev.filter((l) => l.id !== id));
  };

  // Blog actions
  const addBlogPost = (post: ResourceArticle) => {
    setCmsData((prev) => ({
      ...prev,
      blog: [post, ...prev.blog],
    }));
  };

  const updateBlogPost = (post: ResourceArticle) => {
    setCmsData((prev) => ({
      ...prev,
      blog: prev.blog.map((p) => (p.id === post.id ? post : p)),
    }));
  };

  const deleteBlogPost = (id: string) => {
    setCmsData((prev) => ({
      ...prev,
      blog: prev.blog.filter((p) => p.id !== id),
    }));
  };

  // Media actions
  const addMediaItem = (item: MediaItem) => {
    setCmsData((prev) => ({
      ...prev,
      mediaLibrary: [item, ...(prev.mediaLibrary || [])],
    }));
  };

  const updateMediaItem = (id: string, updates: Partial<MediaItem>) => {
    setCmsData((prev) => ({
      ...prev,
      mediaLibrary: (prev.mediaLibrary || []).map((m) =>
        m.id === id ? { ...m, ...updates, updatedAt: new Date().toISOString().split('T')[0] } : m
      ),
    }));
  };

  const deleteMediaItem = (id: string) => {
    setCmsData((prev) => ({
      ...prev,
      mediaLibrary: (prev.mediaLibrary || []).filter((m) => m.id !== id),
    }));
  };

  // Legal document actions
  const updateLegalDoc = (type: 'terms' | 'privacy' | 'hipaa', doc: LegalDocument) => {
    setCmsData((prev) => ({
      ...prev,
      legal: {
        ...prev.legal,
        [type]: doc,
      },
    }));
  };

  // Header Navigation Actions
  const addHeaderNavItem = (item: Omit<HeaderNavItem, 'id'>) => {
    const newItem: HeaderNavItem = {
      ...item,
      id: `nav-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      order: item.order ?? ((cmsData.header.navItems?.length || 0) + 1),
    };
    setCmsData((prev) => ({
      ...prev,
      header: {
        ...prev.header,
        navItems: [...(prev.header.navItems || []), newItem],
      },
    }));
  };

  const updateHeaderNavItem = (id: string, updates: Partial<HeaderNavItem>) => {
    setCmsData((prev) => ({
      ...prev,
      header: {
        ...prev.header,
        navItems: (prev.header.navItems || []).map((item) =>
          item.id === id ? { ...item, ...updates } : item
        ),
      },
    }));
  };

  const deleteHeaderNavItem = (id: string) => {
    setCmsData((prev) => ({
      ...prev,
      header: {
        ...prev.header,
        navItems: (prev.header.navItems || []).filter((item) => item.id !== id),
      },
    }));
  };

  const reorderHeaderNavItems = (items: HeaderNavItem[]) => {
    const reordered = items.map((item, idx) => ({ ...item, order: idx + 1 }));
    setCmsData((prev) => ({
      ...prev,
      header: {
        ...prev.header,
        navItems: reordered,
      },
    }));
  };

  const resetHeaderNavItems = () => {
    setCmsData((prev) => ({
      ...prev,
      header: {
        ...prev.header,
        navItems: INITIAL_CMS_DATA.header.navItems,
      },
    }));
  };

  return (
    <CmsContext.Provider
      value={{
        cmsData,
        updateSection,
        updateCmsData,
        resetToDefaults,
        exportJsonBackup,
        importJsonBackup,
        isAuthenticated: !!adminUser,
        adminUser,
        login,
        logout,
        changePassword,
        leads,
        addLead,
        updateLeadStatus,
        updateLeadNote,
        deleteLead,
        addBlogPost,
        updateBlogPost,
        deleteBlogPost,
        addMediaItem,
        updateMediaItem,
        deleteMediaItem,
        updateLegalDoc,
        addHeaderNavItem,
        updateHeaderNavItem,
        deleteHeaderNavItem,
        reorderHeaderNavItems,
        resetHeaderNavItems,
        saveToServer,
        isSyncingServer,
        isAdminPanelOpen,
        isLoginModalOpen,
        openAdminPanel: () => {
          if (adminUser) {
            setIsAdminPanelOpen(true);
          } else {
            setIsLoginModalOpen(true);
          }
        },
        closeAdminPanel: () => setIsAdminPanelOpen(false),
        openLoginModal: () => setIsLoginModalOpen(true),
        closeLoginModal: () => setIsLoginModalOpen(false),
      }}
    >
      {children}
    </CmsContext.Provider>
  );
};

export const useCms = (): CmsContextType => {
  const context = useContext(CmsContext);
  if (!context) {
    throw new Error('useCms must be used within a CmsProvider');
  }
  return context;
};
