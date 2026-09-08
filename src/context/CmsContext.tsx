import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  CmsData,
  LeadSubmission,
  AdminUser,
  ResourceArticle,
  LegalDocument,
  MediaItem,
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
        return { ...INITIAL_CMS_DATA, ...parsed };
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
