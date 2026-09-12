import React, { useState, useEffect, useRef } from 'react';
import { useCms } from '../../context/CmsContext';
import { getGoogleDriveDirectImageUrl } from '../../utils/googleDrive';
import { HeaderNavItem, NavigationPage, SecondarySliderItem, CmsData } from '../../types';
import { ImageUploadField } from '../../components/ImageUploadField';
import { AiAssistantButton } from '../../components/AiAssistantButton';
import {
  Settings,
  Save,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Clock,
  Layers,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Building,
  Image as ImageIcon,
  Globe,
  Sparkles,
  ExternalLink,
  RotateCcw,
  Sliders,
  Eye,
  EyeOff,
  SlidersHorizontal,
} from 'lucide-react';

const STANDARD_PAGES: { value: NavigationPage; label: string }[] = [
  { value: 'home', label: 'Home Page' },
  { value: 'about', label: 'About Us & Leadership' },
  { value: 'solutions', label: 'Solutions & 6-Stage SOP' },
  { value: 'pricing', label: 'Pricing & ROI Calculator' },
  { value: 'blog', label: 'Blog & Clinical Guides' },
  { value: 'contact', label: 'Contact Us & Audit' },
  { value: 'terms', label: 'Terms of Service' },
  { value: 'privacy', label: 'Privacy Policy' },
  { value: 'hipaa', label: 'DPDP / HIPAA Compliance' },
];

const moveItem = <T,>(arr: T[], index: number, direction: 'up' | 'down'): T[] => {
  const result = [...arr];
  const targetIndex = direction === 'up' ? index - 1 : index + 1;
  if (targetIndex < 0 || targetIndex >= arr.length) return result;
  const temp = result[index];
  result[index] = result[targetIndex];
  result[targetIndex] = temp;
  return result;
};

export const GlobalSettingsView: React.FC = () => {
  const {
    cmsData,
    updateSection,
    addHeaderNavItem,
    updateHeaderNavItem,
    deleteHeaderNavItem,
    reorderHeaderNavItems,
    resetHeaderNavItems,
    saveToServer,
    isSyncingServer,
  } = useCms();

  const [activeTab, setActiveTab] = useState<'header' | 'slider' | 'footer' | 'brand' | 'branding'>('header');
  const [savedAlert, setSavedAlert] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const isDirtyRef = useRef(false);
  const [saveStatusMessage, setSaveStatusMessage] = useState<string | null>(null);

  const markDirty = () => {
    isDirtyRef.current = true;
    setIsDirty(true);
  };

  // Local state copies
  const [brand, setBrand] = useState(cmsData.brand);
  const [headerConfig, setHeaderConfig] = useState({
    ...cmsData.header,
    logoUrl: cmsData.header?.logoUrl || cmsData.branding?.headerLogoUrl || '',
    logoHeight: cmsData.header?.logoHeight || 44,
  });
  const [sliderCards, setSliderCards] = useState<SecondarySliderItem[]>(cmsData.secondarySlider || []);
  const [footer, setFooter] = useState({
    ...cmsData.footer,
    logoUrl: cmsData.footer?.logoUrl || cmsData.branding?.footerLogoUrl || '',
    logoHeight: cmsData.footer?.logoHeight || 40,
  });
  const [branding, setBranding] = useState({
    headerLogoUrl: cmsData.header?.logoUrl || cmsData.branding?.headerLogoUrl || '',
    footerLogoUrl: cmsData.footer?.logoUrl || cmsData.branding?.footerLogoUrl || '',
    headerLogoHeight: cmsData.header?.logoHeight || cmsData.branding?.headerLogoHeight || 44,
    footerLogoHeight: cmsData.footer?.logoHeight || cmsData.branding?.footerLogoHeight || 40,
    googleDriveLogoUrl: cmsData.branding?.googleDriveLogoUrl || '',
    googleDriveFaviconUrl: cmsData.branding?.googleDriveFaviconUrl || '',
    customLogoUrl: cmsData.branding?.customLogoUrl || '',
    customFaviconUrl: cmsData.branding?.customFaviconUrl || '',
    agencyCredit: cmsData.footer.agencyCredit || cmsData.branding?.agencyCredit || 'Website Designed & Developed by ClickIn Digital Marketing Agency (ClickIn DMA)',
    showLogoImage: false,
  });

  // Keep local copies in sync when authoritative server CMS data loads (only if user hasn't made unsaved edits)
  useEffect(() => {
    if (!isDirtyRef.current) {
      setBrand(cmsData.brand);
      const headerLogo = cmsData.header?.logoUrl || cmsData.branding?.headerLogoUrl || '';
      const footerLogo = cmsData.footer?.logoUrl || cmsData.branding?.footerLogoUrl || '';
      setHeaderConfig({
        ...cmsData.header,
        logoUrl: headerLogo,
        logoHeight: cmsData.header?.logoHeight || 44,
      });
      setSliderCards(cmsData.secondarySlider || []);
      setFooter({
        ...cmsData.footer,
        logoUrl: footerLogo,
        logoHeight: cmsData.footer?.logoHeight || 40,
      });
      setBranding({
        headerLogoUrl: headerLogo,
        footerLogoUrl: footerLogo,
        headerLogoHeight: cmsData.header?.logoHeight || cmsData.branding?.headerLogoHeight || 44,
        footerLogoHeight: cmsData.footer?.logoHeight || cmsData.branding?.footerLogoHeight || 40,
        googleDriveLogoUrl: cmsData.branding?.googleDriveLogoUrl || '',
        googleDriveFaviconUrl: cmsData.branding?.googleDriveFaviconUrl || '',
        customLogoUrl: cmsData.branding?.customLogoUrl || '',
        customFaviconUrl: cmsData.branding?.customFaviconUrl || '',
        agencyCredit: cmsData.footer.agencyCredit || cmsData.branding?.agencyCredit || 'Website Designed & Developed by ClickIn Digital Marketing Agency (ClickIn DMA)',
        showLogoImage: false,
      });
    }
  }, [cmsData]);

  // Unified logo update mutators - updates both direct section and branding sub-object synchronously
  const updateHeaderLogo = (url: string) => {
    markDirty();
    setHeaderConfig((prev) => ({ ...prev, logoUrl: url }));
    setBranding((prev) => ({ ...prev, headerLogoUrl: url }));
  };

  const updateHeaderLogoHeight = (h: number) => {
    markDirty();
    setHeaderConfig((prev) => ({ ...prev, logoHeight: h }));
    setBranding((prev) => ({ ...prev, headerLogoHeight: h }));
  };

  const updateFooterLogo = (url: string) => {
    markDirty();
    setFooter((prev) => ({ ...prev, logoUrl: url }));
    setBranding((prev) => ({ ...prev, footerLogoUrl: url }));
  };

  const updateFooterLogoHeight = (h: number) => {
    markDirty();
    setFooter((prev) => ({ ...prev, logoHeight: h }));
    setBranding((prev) => ({ ...prev, footerLogoHeight: h }));
  };

  // New nav item form state
  const [newNavLabel, setNewNavLabel] = useState('');
  const [newNavPage, setNewNavPage] = useState<string>('home');
  const [newNavIsExternal, setNewNavIsExternal] = useState(false);
  const [newNavHref, setNewNavHref] = useState('');
  const [showAddNavModal, setShowAddNavModal] = useState(false);

  // Edit nav item modal state
  const [editingNavItem, setEditingNavItem] = useState<HeaderNavItem | null>(null);

  const triggerSaveToast = () => {
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 4000);
  };

  const handleSaveAll = async () => {
    setSaveStatusMessage('Publishing authoritative settings to Supabase SSoT...');

    const finalHeaderLogo = (headerConfig.logoUrl && headerConfig.logoUrl.trim() !== '')
      ? headerConfig.logoUrl.trim()
      : (branding.headerLogoUrl || branding.customLogoUrl || branding.googleDriveLogoUrl || '');

    const finalHeaderHeight = Number(headerConfig.logoHeight || branding.headerLogoHeight) || 44;

    const finalFooterLogo = (footer.logoUrl && footer.logoUrl.trim() !== '')
      ? footer.logoUrl.trim()
      : (branding.footerLogoUrl || branding.customLogoUrl || branding.googleDriveLogoUrl || '');

    const finalFooterHeight = Number(footer.logoHeight || branding.footerLogoHeight) || 40;

    const updatedHeader = {
      ...headerConfig,
      logoUrl: finalHeaderLogo,
      logoHeight: finalHeaderHeight,
    };

    const updatedFooter = {
      ...footer,
      logoUrl: finalFooterLogo,
      logoHeight: finalFooterHeight,
      agencyCredit: branding.agencyCredit || footer.agencyCredit,
    };

    const updatedBranding = {
      ...branding,
      headerLogoUrl: finalHeaderLogo,
      footerLogoUrl: finalFooterLogo,
      headerLogoHeight: finalHeaderHeight,
      footerLogoHeight: finalFooterHeight,
    };

    const fullPayload: CmsData = {
      ...cmsData,
      brand,
      header: updatedHeader,
      secondarySlider: sliderCards,
      footer: updatedFooter,
      branding: updatedBranding,
    };

    // Save directly to Supabase cloud storage (atomic single POST, zero race conditions)
    const result = await saveToServer(fullPayload);

    if (result.success) {
      isDirtyRef.current = false;
      setIsDirty(false);
      setSaveStatusMessage('Saved & Published to Supabase SSoT! Live on website & Incognito.');
      triggerSaveToast();
      setTimeout(() => setSaveStatusMessage(null), 4000);
    } else {
      setSaveStatusMessage(`Save warning: ${result.error || 'Failed to sync with Supabase'}`);
      setTimeout(() => setSaveStatusMessage(null), 6000);
    }
  };

  const handleCreateNavItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNavLabel.trim()) return;

    addHeaderNavItem({
      label: newNavLabel.trim(),
      page: newNavIsExternal ? '' : newNavPage,
      isExternal: newNavIsExternal,
      href: newNavIsExternal ? newNavHref.trim() : undefined,
      enabled: true,
      order: (cmsData.header.navItems?.length || 0) + 1,
    });

    setNewNavLabel('');
    setNewNavHref('');
    setNewNavIsExternal(false);
    setShowAddNavModal(false);
    triggerSaveToast();
  };

  const handleUpdateEditingNavItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNavItem || !editingNavItem.label.trim()) return;

    updateHeaderNavItem(editingNavItem.id, {
      label: editingNavItem.label.trim(),
      page: editingNavItem.isExternal ? '' : editingNavItem.page,
      isExternal: editingNavItem.isExternal,
      href: editingNavItem.isExternal ? editingNavItem.href : undefined,
      enabled: editingNavItem.enabled,
    });

    setEditingNavItem(null);
    triggerSaveToast();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Bar */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#16A6A3] bg-teal-50 px-2 py-0.5 rounded-md">
              Global Configuration
            </span>
            <h1 className="text-xl font-bold text-slate-900">Header, Top Bar, Slider &amp; Footer CMS</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Manage your dynamic navigation menus, top bar announcement strip, secondary slider cards, footer notices, and brand identity.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {saveStatusMessage ? (
            <div className="px-3.5 py-1.5 bg-teal-50 text-teal-900 border border-teal-300 rounded-xl text-xs font-bold flex items-center gap-1.5 animate-in fade-in shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
              <span>{saveStatusMessage}</span>
            </div>
          ) : savedAlert ? (
            <div className="px-3.5 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-xl text-xs font-bold flex items-center gap-1.5 animate-in fade-in shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Saved &amp; Published to Supabase SSoT (Live in Incognito &amp; All Devices)</span>
            </div>
          ) : isDirty ? (
            <div className="px-3 py-1 bg-amber-50 text-amber-800 border border-amber-300 rounded-xl text-[11px] font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span>Unsaved changes</span>
            </div>
          ) : null}
          <button
            onClick={handleSaveAll}
            disabled={isSyncingServer}
            className="px-4 py-2.5 bg-[#006A68] hover:bg-[#005553] disabled:opacity-60 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm transition-all"
          >
            {isSyncingServer ? (
              <>
                <RotateCcw className="w-4 h-4 animate-spin" />
                <span>Saving to Supabase...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save All Settings</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100 rounded-xl border border-slate-200 text-xs font-bold">
        {[
          { id: 'header', label: '1. Header & Top Bar Navigation' },
          { id: 'slider', label: `2. Slider Bar (${sliderCards.length} Cards)` },
          { id: 'footer', label: '3. Footer Disclaimers & Copyright' },
          { id: 'brand', label: '4. Brand & Contact (India)' },
          { id: 'branding', label: '5. Logo, Favicon & Agency Credit' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-lg transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-white text-[#12304A] shadow-xs font-extrabold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: HEADER & TOP BAR NAVIGATION */}
      {activeTab === 'header' && (
        <div className="space-y-6">
          {/* Header Logo Upload Section */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-xs">
            <div className="pb-3 border-b border-slate-200">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-[#006A68]" />
                <span>Header Brand Logo &amp; Navigation Visual Identity</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Upload or customize the primary brand logo rendered on the light / white header bar across all pages.
              </p>
            </div>

            <ImageUploadField
              label="Header Navigation Logo (White / Light Canvas)"
              description="Upload an SVG, PNG, or WebP logo file or enter an image URL. Full-color horizontal logo lockup recommended."
              value={headerConfig.logoUrl || branding.headerLogoUrl || ''}
              onChange={updateHeaderLogo}
              onReset={() => updateHeaderLogo('')}
              defaultLogoSrc="/logo-dentisure.svg"
              defaultLogoAlt="Official DentiSure Header Logo"
              tag="header-logo"
              heightValue={headerConfig.logoHeight || branding.headerLogoHeight || 44}
              onHeightChange={updateHeaderLogoHeight}
              defaultHeight={44}
              minHeight={28}
              maxHeight={72}
              backgroundVariant="light"
              recommendedFormatText="Full color horizontal lockup (SVG or transparent PNG recommended)"
            />
          </div>

          {/* Top Bar Settings */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <h2 className="text-sm font-bold text-slate-900">Top Bar Utility Strip</h2>
                <p className="text-xs text-slate-500">The notification strip shown above the main header.</p>
              </div>
              <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                <span>Show Top Bar</span>
                <input
                  type="checkbox"
                  checked={headerConfig.showTopBar !== false}
                  onChange={(e) =>
                    setHeaderConfig({ ...headerConfig, showTopBar: e.target.checked })
                  }
                  className="w-4 h-4 text-teal-600 rounded cursor-pointer"
                />
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block font-bold text-slate-700 mb-1">Top Bar Notice Copy</label>
                <input
                  type="text"
                  value={headerConfig.topNotice || ''}
                  onChange={(e) => setHeaderConfig({ ...headerConfig, topNotice: e.target.value })}
                  placeholder="Pan-India Dental Revenue Cycle & Practice Billing Management"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Phone Label</label>
                <input
                  type="text"
                  value={headerConfig.phoneLabel || ''}
                  onChange={(e) => setHeaderConfig({ ...headerConfig, phoneLabel: e.target.value })}
                  placeholder="Practice Advisory Desk:"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Header Audit CTA Button Text</label>
                <input
                  type="text"
                  value={headerConfig.auditButtonText || ''}
                  onChange={(e) => setHeaderConfig({ ...headerConfig, auditButtonText: e.target.value })}
                  placeholder="Free Revenue Audit"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>
            </div>
          </div>

          {/* Dynamic Navigation Menu Items Manager */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
              <div>
                <h2 className="text-sm font-bold text-slate-900">Header Navigation Menu Links</h2>
                <p className="text-xs text-slate-500">
                  Add, edit, reorder, or delete navigation links in real time. Changes reflect immediately on the live website.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={resetHeaderNavItems}
                  className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold flex items-center gap-1.5 cursor-pointer"
                  title="Reset to default standard navigation links"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Defaults</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddNavModal(true)}
                  className="px-4 py-2 bg-[#16A6A3] hover:bg-teal-600 text-white rounded-xl font-bold flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Menu Link</span>
                </button>
              </div>
            </div>

            {/* Menu Items Table / List */}
            <div className="space-y-2">
              {(!cmsData.header.navItems || cmsData.header.navItems.length === 0) ? (
                <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-300 text-slate-500">
                  No custom navigation items yet. Click &quot;Add Menu Link&quot; or &quot;Reset Defaults&quot;.
                </div>
              ) : (
                cmsData.header.navItems.map((item, idx) => (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                      item.enabled !== false
                        ? 'bg-slate-50/80 border-slate-200 hover:border-teal-300'
                        : 'bg-slate-100/60 border-slate-200 opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-lg bg-white border border-slate-200 flex items-center justify-center font-bold text-[11px] text-slate-500">
                        {idx + 1}
                      </span>
                      <div>
                        <div className="font-bold text-slate-900 flex items-center gap-2">
                          <span>{item.label}</span>
                          {item.isExternal ? (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-semibold flex items-center gap-1">
                              External <ExternalLink className="w-2.5 h-2.5" />
                            </span>
                          ) : (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200 font-semibold">
                              Page: {item.page}
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400 truncate max-w-xs sm:max-w-md">
                          {item.isExternal ? item.href : `Internal route -> /${item.page}`}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {/* Toggle enabled */}
                      <button
                        type="button"
                        onClick={() => updateHeaderNavItem(item.id, { enabled: !item.enabled })}
                        className={`p-1.5 rounded-lg border cursor-pointer ${
                          item.enabled !== false
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-slate-200 text-slate-600 border-slate-300'
                        }`}
                        title={item.enabled !== false ? 'Enabled (Click to disable)' : 'Disabled (Click to enable)'}
                      >
                        {item.enabled !== false ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      </button>

                      {/* Move Up */}
                      <button
                        type="button"
                        disabled={idx === 0}
                        onClick={() => {
                          const reordered = moveItem(cmsData.header.navItems, idx, 'up');
                          reorderHeaderNavItems(reordered);
                        }}
                        className="p-1.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-600 disabled:opacity-30 cursor-pointer"
                        title="Move Up"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>

                      {/* Move Down */}
                      <button
                        type="button"
                        disabled={idx === cmsData.header.navItems.length - 1}
                        onClick={() => {
                          const reordered = moveItem(cmsData.header.navItems, idx, 'down');
                          reorderHeaderNavItems(reordered);
                        }}
                        className="p-1.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-600 disabled:opacity-30 cursor-pointer"
                        title="Move Down"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>

                      {/* Edit */}
                      <button
                        type="button"
                        onClick={() => setEditingNavItem(item)}
                        className="px-2.5 py-1.5 bg-white hover:bg-teal-50 border border-slate-200 text-[#16A6A3] rounded-lg font-bold cursor-pointer"
                      >
                        Edit
                      </button>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm(`Delete "${item.label}" from navigation?`)) {
                            deleteHeaderNavItem(item.id);
                            triggerSaveToast();
                          }
                        }}
                        className="p-1.5 text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 rounded-lg cursor-pointer"
                        title="Delete Menu Link"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SLIDER BAR MANAGER (Under-Hero Secondary Slider) */}
      {activeTab === 'slider' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6 text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Slider Bar Feature Cards ({sliderCards.length})</h2>
              <p className="text-xs text-slate-500">
                Continuous scrolling ticker cards positioned right below the main hero section.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                const newCard: SecondarySliderItem = {
                  id: `sl-${Date.now()}`,
                  category: 'PMS Integration',
                  title: 'New Integration Feature',
                  desc: 'Seamless real-time synchronization with leading dental practice management systems.',
                };
                setSliderCards([...sliderCards, newCard]);
                updateSection('secondarySlider', [...sliderCards, newCard]);
                triggerSaveToast();
              }}
              className="px-4 py-2 bg-[#16A6A3] hover:bg-teal-600 text-white rounded-xl font-bold flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add Slider Card</span>
            </button>
          </div>

          <div className="space-y-3">
            {sliderCards.map((card, idx) => (
              <div key={card.id || idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 text-xs flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-[#12304A] text-white flex items-center justify-center text-[10px]">
                      {idx + 1}
                    </span>
                    Card #{idx + 1}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => {
                        const copy = [...sliderCards];
                        const temp = copy[idx];
                        copy[idx] = copy[idx - 1];
                        copy[idx - 1] = temp;
                        setSliderCards(copy);
                        updateSection('secondarySlider', copy);
                      }}
                      className="p-1.5 bg-white hover:bg-slate-200 border border-slate-200 rounded disabled:opacity-30 cursor-pointer"
                      title="Move Left/Up"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === sliderCards.length - 1}
                      onClick={() => {
                        const copy = [...sliderCards];
                        const temp = copy[idx];
                        copy[idx] = copy[idx + 1];
                        copy[idx + 1] = temp;
                        setSliderCards(copy);
                        updateSection('secondarySlider', copy);
                      }}
                      className="p-1.5 bg-white hover:bg-slate-200 border border-slate-200 rounded disabled:opacity-30 cursor-pointer"
                      title="Move Right/Down"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const filtered = sliderCards.filter((_, i) => i !== idx);
                        setSliderCards(filtered);
                        updateSection('secondarySlider', filtered);
                        triggerSaveToast();
                      }}
                      className="p-1.5 text-rose-600 hover:bg-rose-50 rounded cursor-pointer"
                      title="Delete Card"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Badge / Category</label>
                    <input
                      type="text"
                      value={card.category}
                      onChange={(e) => {
                        const copy = [...sliderCards];
                        copy[idx] = { ...copy[idx], category: e.target.value };
                        setSliderCards(copy);
                      }}
                      className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block font-bold text-slate-700 mb-1">Card Title</label>
                    <input
                      type="text"
                      value={card.title}
                      onChange={(e) => {
                        const copy = [...sliderCards];
                        copy[idx] = { ...copy[idx], title: e.target.value };
                        setSliderCards(copy);
                      }}
                      className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-900"
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <label className="block font-bold text-slate-700 mb-1">Description</label>
                    <input
                      type="text"
                      value={card.desc}
                      onChange={(e) => {
                        const copy = [...sliderCards];
                        copy[idx] = { ...copy[idx], desc: e.target.value };
                        setSliderCards(copy);
                      }}
                      className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-600"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: FOOTER SETTINGS */}
      {activeTab === 'footer' && (
        <div className="space-y-6">
          {/* Footer Logo Upload Section */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-xs">
            <div className="pb-3 border-b border-slate-200">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-[#16A6A3]" />
                <span>Footer Brand Logo &amp; Visual Identity</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Upload or change the brand logo displayed on the dark navy (#12304A) footer across the entire website.
              </p>
            </div>

            <ImageUploadField
              label="Footer Logo (Dark Navy Canvas)"
              description="Upload an SVG, PNG, or WebP logo file or enter an image URL. Recommended: White or light-colored artwork with transparent background."
              value={footer.logoUrl || branding.footerLogoUrl || ''}
              onChange={updateFooterLogo}
              onReset={() => updateFooterLogo('')}
              defaultLogoSrc="/logo-dentisure-white.svg"
              defaultLogoAlt="Official DentiSure White Footer Logo"
              tag="footer-logo"
              heightValue={footer.logoHeight || branding.footerLogoHeight || 40}
              onHeightChange={updateFooterLogoHeight}
              defaultHeight={40}
              minHeight={24}
              maxHeight={72}
              backgroundVariant="dark"
              recommendedFormatText="White vector SVG or transparent PNG (renders on #12304A navy)"
            />
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-xs">
            <h2 className="text-sm font-bold text-slate-900">Footer Notices, Copyright &amp; Agency Attribution</h2>

            <div>
              <label className="block font-bold text-slate-700 mb-1">About Company Summary</label>
              <textarea
                rows={3}
                value={footer.aboutText}
                onChange={(e) => {
                  markDirty();
                  setFooter({ ...footer, aboutText: e.target.value });
                }}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl leading-relaxed"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Copyright Line</label>
              <input
                type="text"
                value={footer.copyright}
                onChange={(e) => {
                  markDirty();
                  setFooter({ ...footer, copyright: e.target.value });
                }}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#16A6A3]" />
                <span>Agency Credit (Built By ClickIn Digital Marketing Agency)</span>
              </label>
              <input
                type="text"
                value={footer.agencyCredit || branding.agencyCredit || ''}
                onChange={(e) => {
                  markDirty();
                  setFooter({ ...footer, agencyCredit: e.target.value });
                  setBranding({ ...branding, agencyCredit: e.target.value });
                }}
                placeholder="Website Designed & Developed by ClickIn Digital Marketing Agency (ClickIn DMA)"
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-800"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Appears prominently in the bottom bar badge of the website footer across all pages.
              </p>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Regulatory Legal Disclaimer</label>
              <textarea
                rows={4}
                value={footer.disclaimer}
                onChange={(e) => {
                  markDirty();
                  setFooter({ ...footer, disclaimer: e.target.value });
                }}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-700 leading-relaxed"
              />
            </div>

            <div className="pt-3 border-t border-slate-200 flex justify-end">
              <button
                type="button"
                onClick={handleSaveAll}
                disabled={isSyncingServer}
                className="px-5 py-2.5 bg-[#006A68] hover:bg-[#00504E] text-white rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer shadow-sm transition-all disabled:opacity-60"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{isSyncingServer ? 'Saving to Supabase...' : 'Save Footer Settings'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: BRAND & CONTACT (INDIA) */}
      {activeTab === 'brand' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5 text-xs">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Building className="w-4 h-4 text-[#16A6A3]" />
            Corporate Identity &amp; Contact Direct Lines (Indian Dental RCM)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Company / Brand Name</label>
              <input
                type="text"
                value={brand.name}
                onChange={(e) => setBrand({ ...brand, name: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Legal Registered Entity Name</label>
              <input
                type="text"
                value={brand.legalEntityName || ''}
                onChange={(e) => setBrand({ ...brand, legalEntityName: e.target.value })}
                placeholder="DentiSure Solutions Pvt. Ltd."
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block font-bold text-slate-700">Brand Tagline</label>
                <AiAssistantButton
                  type="title"
                  currentText={brand.tagline}
                  onApply={(val) => setBrand({ ...brand, tagline: val })}
                  label="✨ AI Tagline (Demo)"
                  compact
                />
              </div>
              <input
                type="text"
                value={brand.tagline}
                onChange={(e) => setBrand({ ...brand, tagline: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-teal-600" />
                Advisory Phone Line (Demo)
              </label>
              <input
                type="text"
                value={brand.phone}
                onChange={(e) => setBrand({ ...brand, phone: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono text-xs"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-teal-600" />
                Contact Email
              </label>
              <input
                type="email"
                value={brand.contactEmail}
                onChange={(e) => setBrand({ ...brand, contactEmail: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono text-xs"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-teal-600" />
                Operating Hours
              </label>
              <input
                type="text"
                value={brand.hours}
                onChange={(e) => setBrand({ ...brand, hours: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-teal-600" />
                Office Address (Demo)
              </label>
              <input
                type="text"
                value={brand.address}
                onChange={(e) => setBrand({ ...brand, address: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: LOGO, FAVICON & AGENCY ATTRIBUTION */}
      {activeTab === 'branding' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6 text-xs">
          <div>
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-[#16A6A3]" />
              <span>Master Brand Assets &amp; Logo Management</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Upload and manage your Footer Logo, Header Logo, and Browser Tab Favicon with real file upload, instant preview, and custom height adjustments.
            </p>
          </div>

          {/* Agency Credit Card */}
          <div className="bg-teal-50/60 border border-teal-200/80 rounded-2xl p-4.5 space-y-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#16A6A3]" />
              <span className="font-bold text-slate-900 text-xs uppercase tracking-wide">Website Agency Credit</span>
            </div>
            <p className="text-[11px] text-slate-600">
              Acknowledges ClickIn Digital Marketing Agency (ClickIn DMA) as the website creator in the footer.
            </p>
            <input
              type="text"
              value={branding.agencyCredit || ''}
              onChange={(e) => {
                const val = e.target.value;
                setBranding({ ...branding, agencyCredit: val });
                setFooter({ ...footer, agencyCredit: val });
              }}
              placeholder="Website Designed & Developed by ClickIn Digital Marketing Agency (ClickIn DMA)"
              className="w-full p-2.5 bg-white border border-teal-300 rounded-xl font-medium text-slate-800"
            />
          </div>

          {/* Footer Logo Uploader */}
          <div className="space-y-3 pt-2 border-t border-slate-200">
            <h3 className="font-bold text-slate-900 text-xs flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#12304A]"></span>
              <span>1. Footer Brand Logo (Navy / Dark Canvas)</span>
            </h3>
            <ImageUploadField
              label="Footer Logo File &amp; Settings"
              description="Appears in the dark footer across all pages. White or high-contrast vector/PNG recommended."
              value={footer.logoUrl || branding.footerLogoUrl || ''}
              onChange={updateFooterLogo}
              onReset={() => updateFooterLogo('')}
              defaultLogoSrc="/logo-dentisure-white.svg"
              defaultLogoAlt="DentiSure Official Footer Logo"
              tag="footer-logo"
              heightValue={footer.logoHeight || branding.footerLogoHeight || 40}
              onHeightChange={updateFooterLogoHeight}
              defaultHeight={40}
              minHeight={24}
              maxHeight={72}
              backgroundVariant="dark"
              recommendedFormatText="White vector SVG or transparent PNG (renders on #12304A dark navy)"
            />
          </div>

          {/* Header Logo Uploader */}
          <div className="space-y-3 pt-4 border-t border-slate-200">
            <h3 className="font-bold text-slate-900 text-xs flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#006A68]"></span>
              <span>2. Header Navigation Logo (Light Canvas)</span>
            </h3>
            <ImageUploadField
              label="Header Navigation Logo File &amp; Settings"
              description="Appears in the top white header on all pages. Full color SVG or PNG recommended."
              value={headerConfig.logoUrl || branding.headerLogoUrl || ''}
              onChange={updateHeaderLogo}
              onReset={() => updateHeaderLogo('')}
              defaultLogoSrc="/logo-dentisure.svg"
              defaultLogoAlt="DentiSure Official Header Logo"
              tag="header-logo"
              heightValue={headerConfig.logoHeight || branding.headerLogoHeight || 44}
              onHeightChange={updateHeaderLogoHeight}
              defaultHeight={44}
              minHeight={28}
              maxHeight={72}
              backgroundVariant="light"
              recommendedFormatText="Full color horizontal lockup (SVG or transparent PNG recommended)"
            />
          </div>

          {/* Favicon Field */}
          <div className="space-y-3 pt-4 border-t border-slate-200">
            <h3 className="font-bold text-slate-900 text-xs flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-[#16A6A3]" />
              <span>3. Browser Tab Favicon</span>
            </h3>
            <ImageUploadField
              label="Favicon File or URL"
              description="Appears in the browser tab title bar (square 32x32 or 64x64 icon)."
              value={branding.customFaviconUrl || branding.googleDriveFaviconUrl || ''}
              onChange={(url) => {
                markDirty();
                setBranding((prev) => ({ ...prev, customFaviconUrl: url, googleDriveFaviconUrl: url }));
              }}
              onReset={() => {
                markDirty();
                setBranding((prev) => ({ ...prev, customFaviconUrl: '', googleDriveFaviconUrl: '' }));
              }}
              defaultLogoSrc="/logo-transparent.png"
              defaultLogoAlt="Favicon"
              tag="favicon"
              heightValue={32}
              defaultHeight={32}
              minHeight={24}
              maxHeight={64}
              backgroundVariant="light"
              recommendedFormatText="Square PNG, SVG, or ICO (32x32 or 64x64)"
            />
          </div>

          {/* Action Bar inside Tab 5 */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-[11px] text-slate-500">
              {isDirty ? (
                <span className="text-amber-700 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  Unsaved brand &amp; logo changes. Click the button to persist to Supabase SSoT.
                </span>
              ) : (
                <span className="text-emerald-700 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  All brand logos &amp; identity settings are synced with Supabase.
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={handleSaveAll}
              disabled={isSyncingServer}
              className="px-6 py-2.5 bg-[#006A68] hover:bg-[#00504E] text-white rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md transition-all disabled:opacity-60"
            >
              {isSyncingServer ? (
                <>
                  <RotateCcw className="w-4 h-4 animate-spin" />
                  <span>Saving to Supabase...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Brand Settings &amp; Publish Logo</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* CREATE NAV ITEM MODAL */}
      {showAddNavModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 text-xs">
            <h3 className="text-sm font-bold text-slate-900 mb-1">Add Header Menu Link</h3>
            <p className="text-[11px] text-slate-500 mb-4">
              Add a new clickable item to the main top navigation menu.
            </p>

            <form onSubmit={handleCreateNavItem} className="space-y-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Link Title / Label</label>
                <input
                  type="text"
                  required
                  value={newNavLabel}
                  onChange={(e) => setNewNavLabel(e.target.value)}
                  placeholder="e.g., Clinical Solutions, ROI Calculator"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                  autoFocus
                />
              </div>

              <div>
                <label className="flex items-center gap-2 cursor-pointer mb-2 font-bold text-slate-700">
                  <input
                    type="checkbox"
                    checked={newNavIsExternal}
                    onChange={(e) => setNewNavIsExternal(e.target.checked)}
                    className="w-4 h-4 text-teal-600 rounded cursor-pointer"
                  />
                  <span>External Link (opens in new tab)</span>
                </label>

                {newNavIsExternal ? (
                  <div>
                    <label className="block font-semibold text-slate-600 mb-1">External Target URL</label>
                    <input
                      type="url"
                      required
                      value={newNavHref}
                      onChange={(e) => setNewNavHref(e.target.value)}
                      placeholder="https://example.com/portal"
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block font-semibold text-slate-600 mb-1">Target Website Page</label>
                    <select
                      value={newNavPage}
                      onChange={(e) => setNewNavPage(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium"
                    >
                      {STANDARD_PAGES.map((p) => (
                        <option key={p.value} value={p.value}>
                          {p.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowAddNavModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#16A6A3] hover:bg-teal-600 text-white rounded-xl font-bold cursor-pointer shadow-sm"
                >
                  Add Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT NAV ITEM MODAL */}
      {editingNavItem && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 text-xs">
            <h3 className="text-sm font-bold text-slate-900 mb-1">Edit Menu Link: {editingNavItem.label}</h3>
            <p className="text-[11px] text-slate-500 mb-4">Update label, destination, or visibility.</p>

            <form onSubmit={handleUpdateEditingNavItem} className="space-y-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Link Title / Label</label>
                <input
                  type="text"
                  required
                  value={editingNavItem.label}
                  onChange={(e) => setEditingNavItem({ ...editingNavItem, label: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 cursor-pointer mb-2 font-bold text-slate-700">
                  <input
                    type="checkbox"
                    checked={editingNavItem.isExternal || false}
                    onChange={(e) => setEditingNavItem({ ...editingNavItem, isExternal: e.target.checked })}
                    className="w-4 h-4 text-teal-600 rounded cursor-pointer"
                  />
                  <span>External Link (opens in new tab)</span>
                </label>

                {editingNavItem.isExternal ? (
                  <div>
                    <label className="block font-semibold text-slate-600 mb-1">External Target URL</label>
                    <input
                      type="url"
                      required
                      value={editingNavItem.href || ''}
                      onChange={(e) => setEditingNavItem({ ...editingNavItem, href: e.target.value })}
                      placeholder="https://example.com"
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block font-semibold text-slate-600 mb-1">Target Website Page</label>
                    <select
                      value={editingNavItem.page || 'home'}
                      onChange={(e) => setEditingNavItem({ ...editingNavItem, page: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium"
                    >
                      {STANDARD_PAGES.map((p) => (
                        <option key={p.value} value={p.value}>
                          {p.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div>
                <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                  <input
                    type="checkbox"
                    checked={editingNavItem.enabled !== false}
                    onChange={(e) => setEditingNavItem({ ...editingNavItem, enabled: e.target.checked })}
                    className="w-4 h-4 text-teal-600 rounded cursor-pointer"
                  />
                  <span>Show this link in header menu</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setEditingNavItem(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#16A6A3] hover:bg-teal-600 text-white rounded-xl font-bold cursor-pointer shadow-sm"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Floating Sticky Save Bar when dirty */}
      {isDirty && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 max-w-xl w-[92%] bg-[#12304A] text-white p-3.5 px-5 rounded-2xl shadow-2xl border border-teal-500/30 flex items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse shrink-0" />
            <span className="text-xs font-semibold text-slate-200 truncate">
              You have unsaved changes in Global Settings &amp; Branding
            </span>
          </div>
          <button
            type="button"
            onClick={handleSaveAll}
            disabled={isSyncingServer}
            className="px-4 py-2 bg-[#16A6A3] hover:bg-[#006A68] text-white rounded-xl text-xs font-bold shrink-0 flex items-center gap-1.5 cursor-pointer shadow-md transition-all disabled:opacity-60"
          >
            {isSyncingServer ? (
              <>
                <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>Save to Supabase SSoT</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};
