import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
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

const LEADS_STORAGE_KEY = 'dentisure_leads_data_v4';
const AUTH_STORAGE_KEY = 'dentisure_admin_session_v4';
const PASSWORD_STORAGE_KEY = 'dentisure_admin_pass_v4';

const DEFAULT_PASS = 'admin123';

interface CmsContextType {
  cmsData: CmsData;
  isCmsLoading: boolean;
  refreshFromCloud: () => Promise<void>;
  updateSection: <K extends keyof CmsData>(
    section: K,
    updater: Partial<CmsData[K]> | ((prev: CmsData[K]) => CmsData[K])
  ) => void;
  updateCmsData: (newData: CmsData) => void;
  resetToDefaults: () => Promise<void>;
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
  saveToServer: (dataToSave?: CmsData) => Promise<{ success: boolean; error?: string; provider?: string }>;
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
  // Supabase is the SINGLE SOURCE OF TRUTH.
  // We strictly avoid reading initial state from localStorage to prevent stale browser overrides.
  const [cmsData, setCmsData] = useState<CmsData>(INITIAL_CMS_DATA);
  const [isCmsLoading, setIsCmsLoading] = useState<boolean>(true);
  const [isSyncingServer, setIsSyncingServer] = useState<boolean>(false);

  // Leads state
  const [leads, setLeads] = useState<LeadSubmission[]>(() => {
    try {
      const saved = localStorage.getItem(LEADS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return INITIAL_LEADS;
  });

  // Auth session
  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return null;
  });

  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  // Helper to merge database payload cleanly with fallback safety
  const mergeWithAuthoritativePayload = (serverData: any): CmsData => {
    const rawHeader = serverData?.header || {};
    const rawFooter = serverData?.footer || {};
    const rawBranding = serverData?.branding || {};

    // Robust logo resolution: check both direct section and branding sub-object
    const resolvedHeaderLogo = (rawHeader.logoUrl && typeof rawHeader.logoUrl === 'string' && rawHeader.logoUrl.trim() !== '')
      ? rawHeader.logoUrl.trim()
      : (rawBranding.headerLogoUrl || rawBranding.customLogoUrl || rawBranding.googleDriveLogoUrl || '');

    const resolvedFooterLogo = (rawFooter.logoUrl && typeof rawFooter.logoUrl === 'string' && rawFooter.logoUrl.trim() !== '')
      ? rawFooter.logoUrl.trim()
      : (rawBranding.footerLogoUrl || rawBranding.customLogoUrl || rawBranding.googleDriveLogoUrl || '');

    const resolvedHeaderHeight = Number(rawHeader.logoHeight || rawBranding.headerLogoHeight) || 44;
    const resolvedFooterHeight = Number(rawFooter.logoHeight || rawBranding.footerLogoHeight) || 40;

    return {
      ...INITIAL_CMS_DATA,
      ...serverData,
      brand: {
        ...INITIAL_CMS_DATA.brand,
        ...(serverData?.brand || {}),
      },
      header: {
        ...INITIAL_CMS_DATA.header,
        ...rawHeader,
        logoUrl: resolvedHeaderLogo,
        logoHeight: resolvedHeaderHeight,
      },
      footer: {
        ...INITIAL_CMS_DATA.footer,
        ...rawFooter,
        logoUrl: resolvedFooterLogo,
        logoHeight: resolvedFooterHeight,
      },
      branding: {
        ...INITIAL_CMS_DATA.branding,
        ...rawBranding,
        headerLogoUrl: resolvedHeaderLogo,
        footerLogoUrl: resolvedFooterLogo,
        headerLogoHeight: resolvedHeaderHeight,
        footerLogoHeight: resolvedFooterHeight,
      },
      topSlider: serverData?.topSlider
        ? {
            enabled: serverData.topSlider.enabled !== false,
            autoplay: serverData.topSlider.autoplay !== false,
            autoplayIntervalMs: Number(serverData.topSlider.autoplayIntervalMs) || 6000,
            slides: Array.isArray(serverData.topSlider.slides) && serverData.topSlider.slides.length > 0
              ? serverData.topSlider.slides
              : (INITIAL_CMS_DATA.topSlider?.slides || []),
          }
        : INITIAL_CMS_DATA.topSlider,
    };
  };

  // Authoritative cloud fetch: Directly queries Supabase on mount
  const refreshFromCloud = async () => {
    try {
      setIsCmsLoading(true);
      const response = await fetch(`/api/cms?t=${Date.now()}`, {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          Pragma: 'no-cache',
          Expires: '0',
        },
      });

      if (response.ok) {
        const json = await response.json();
        if (json?.data && typeof json.data === 'object' && json.data.brand) {
          console.log('[CMS Context] Single Source of Truth loaded from Supabase:', json.provider);
          const authoritativeData = mergeWithAuthoritativePayload(json.data);
          setCmsData(authoritativeData);
        } else if (json?.provider === 'supabase-empty' || !json?.data || !json?.data?.brand) {
          // If Supabase table was unseeded, seed it now with default data
          console.log('[CMS Context] Supabase empty, seeding default data...');
          await fetch('/api/cms', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: INITIAL_CMS_DATA }),
          });
          setCmsData(INITIAL_CMS_DATA);
        }
      } else {
        console.warn('[CMS Context] /api/cms responded with status:', response.status);
      }
    } catch (err) {
      console.error('[CMS Context] Error fetching authoritative CMS from Supabase:', err);
    } finally {
      setIsCmsLoading(false);
    }
  };

  useEffect(() => {
    refreshFromCloud();
  }, []);

  // Update dynamic document SEO whenever cmsData changes
  useEffect(() => {
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
    } catch (_) {}
  }, [leads]);

  // Sync Auth session to localStorage
  useEffect(() => {
    try {
      if (adminUser) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(adminUser));
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    } catch (_) {}
  }, [adminUser]);

  // Debounce ref for background auto-sync to avoid race conditions and parallel overwrites
  const autoSyncTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Save explicitly to authoritative Supabase Cloud Database storage
  const saveToServer = async (
    dataToSave?: CmsData
  ): Promise<{ success: boolean; error?: string; provider?: string }> => {
    // Clear any pending debounced background auto-sync so this explicit save takes absolute precedence
    if (autoSyncTimeoutRef.current) {
      clearTimeout(autoSyncTimeoutRef.current);
      autoSyncTimeoutRef.current = null;
    }

    const payload = dataToSave || cmsData;
    setIsSyncingServer(true);
    try {
      const res = await fetch('/api/cms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
        body: JSON.stringify({ data: payload }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.success !== false) {
        console.log('[CMS Context] Saved to Supabase successfully:', json);
        const savedData = json.data ? mergeWithAuthoritativePayload(json.data) : payload;
        setCmsData(savedData);
        return { success: true, provider: json.provider || 'supabase' };
      } else {
        return {
          success: false,
          error: json.error || json.message || 'Supabase returned an error status',
        };
      }
    } catch (err: any) {
      console.error('[CMS Context] Network error saving to Supabase:', err);
      return { success: false, error: err.message || 'Network error' };
    } finally {
      setIsSyncingServer(false);
    }
  };

  // Helper to update React state AND persist to Supabase in a debounced, race-free manner
  const persistAndSet = (updater: (prev: CmsData) => CmsData) => {
    setCmsData((prev) => {
      const updated = updater(prev);
      
      // Debounce auto-sync so multiple quick edits or batch updates don't fire competing network requests
      if (autoSyncTimeoutRef.current) {
        clearTimeout(autoSyncTimeoutRef.current);
      }
      autoSyncTimeoutRef.current = setTimeout(() => {
        fetch('/api/cms', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' },
          body: JSON.stringify({ data: updated }),
        }).catch((e) => console.error('[CMS Context] Auto-sync to Supabase error:', e));
      }, 800);

      return updated;
    });
  };

  // Section updater
  const updateSection = <K extends keyof CmsData>(
    section: K,
    updater: Partial<CmsData[K]> | ((prev: CmsData[K]) => CmsData[K])
  ) => {
    persistAndSet((prev) => {
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
    persistAndSet(() => newData);
  };

  const resetToDefaults = async () => {
    try {
      setIsSyncingServer(true);
      const res = await fetch('/api/cms/reset', { method: 'POST' });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.data) {
        setCmsData(mergeWithAuthoritativePayload(json.data));
      } else {
        setCmsData(INITIAL_CMS_DATA);
      }
    } catch (_) {
      setCmsData(INITIAL_CMS_DATA);
    } finally {
      setIsSyncingServer(false);
    }
  };

  const exportJsonBackup = () => {
    const backupObj = {
      version: '4.0',
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
        const merged = mergeWithAuthoritativePayload(parsed.cmsData);
        setCmsData(merged);
        saveToServer(merged);
        if (Array.isArray(parsed.leads)) {
          setLeads(parsed.leads);
        }
        return { success: true };
      } else if (parsed.brand && parsed.hero) {
        const merged = mergeWithAuthoritativePayload(parsed);
        setCmsData(merged);
        saveToServer(merged);
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
    persistAndSet((prev) => ({
      ...prev,
      blog: [post, ...prev.blog],
    }));
  };

  const updateBlogPost = (post: ResourceArticle) => {
    persistAndSet((prev) => ({
      ...prev,
      blog: prev.blog.map((p) => (p.id === post.id ? post : p)),
    }));
  };

  const deleteBlogPost = (id: string) => {
    persistAndSet((prev) => ({
      ...prev,
      blog: prev.blog.filter((p) => p.id !== id),
    }));
  };

  // Media actions
  const addMediaItem = (item: MediaItem) => {
    persistAndSet((prev) => ({
      ...prev,
      mediaLibrary: [item, ...(prev.mediaLibrary || [])],
    }));
  };

  const updateMediaItem = (id: string, updates: Partial<MediaItem>) => {
    persistAndSet((prev) => ({
      ...prev,
      mediaLibrary: (prev.mediaLibrary || []).map((m) =>
        m.id === id ? { ...m, ...updates, updatedAt: new Date().toISOString().split('T')[0] } : m
      ),
    }));
  };

  const deleteMediaItem = (id: string) => {
    persistAndSet((prev) => ({
      ...prev,
      mediaLibrary: (prev.mediaLibrary || []).filter((m) => m.id !== id),
    }));
  };

  // Legal document actions
  const updateLegalDoc = (type: 'terms' | 'privacy' | 'hipaa', doc: LegalDocument) => {
    persistAndSet((prev) => ({
      ...prev,
      legal: {
        ...prev.legal,
        [type]: doc,
      },
    }));
  };

  // Header Navigation Actions
  const addHeaderNavItem = (item: Omit<HeaderNavItem, 'id'>) => {
    persistAndSet((prev) => {
      const newItem: HeaderNavItem = {
        ...item,
        id: `nav-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        order: item.order ?? ((prev.header.navItems?.length || 0) + 1),
      };
      return {
        ...prev,
        header: {
          ...prev.header,
          navItems: [...(prev.header.navItems || []), newItem],
        },
      };
    });
  };

  const updateHeaderNavItem = (id: string, updates: Partial<HeaderNavItem>) => {
    persistAndSet((prev) => ({
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
    persistAndSet((prev) => ({
      ...prev,
      header: {
        ...prev.header,
        navItems: (prev.header.navItems || []).filter((item) => item.id !== id),
      },
    }));
  };

  const reorderHeaderNavItems = (items: HeaderNavItem[]) => {
    persistAndSet((prev) => ({
      ...prev,
      header: {
        ...prev.header,
        navItems: items.map((item, idx) => ({ ...item, order: idx + 1 })),
      },
    }));
  };

  const resetHeaderNavItems = () => {
    persistAndSet((prev) => ({
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
        isCmsLoading,
        refreshFromCloud,
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
