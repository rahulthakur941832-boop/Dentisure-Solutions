import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { getGoogleDriveDirectImageUrl } from '../../utils/googleDrive';
import { HeaderNavItem, NavigationPage, SecondarySliderItem } from '../../types';
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
  } = useCms();

  const [activeTab, setActiveTab] = useState<'header' | 'slider' | 'footer' | 'brand' | 'branding'>('header');
  const [savedAlert, setSavedAlert] = useState(false);

  // Local state copies
  const [brand, setBrand] = useState(cmsData.brand);
  const [headerConfig, setHeaderConfig] = useState(cmsData.header);
  const [sliderCards, setSliderCards] = useState<SecondarySliderItem[]>(cmsData.secondarySlider || []);
  const [footer, setFooter] = useState(cmsData.footer);
  const [branding, setBranding] = useState(cmsData.branding || {
    googleDriveLogoUrl: '',
    googleDriveFaviconUrl: '',
    customLogoUrl: '',
    customFaviconUrl: '',
    agencyCredit: cmsData.footer.agencyCredit || 'Website Designed & Developed by ClickIn Digital Marketing Agency (ClickIn DMA)',
    showLogoImage: false,
  });

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
    setTimeout(() => setSavedAlert(false), 2500);
  };

  const handleSaveAll = () => {
    updateSection('brand', brand);
    updateSection('header', headerConfig);
    updateSection('secondarySlider', sliderCards);
    updateSection('footer', {
      ...footer,
      agencyCredit: branding.agencyCredit || footer.agencyCredit,
    });
    updateSection('branding', branding);
    triggerSaveToast();
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
          {savedAlert && (
            <div className="px-3.5 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-xl text-xs font-bold flex items-center gap-1.5 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Saved in Real-Time!</span>
            </div>
          )}
          <button
            onClick={handleSaveAll}
            className="px-4 py-2.5 bg-[#16A6A3] hover:bg-teal-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Save className="w-4 h-4" />
            <span>Save All Settings</span>
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
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-xs">
          <h2 className="text-sm font-bold text-slate-900">Footer Notices, Copyright &amp; Agency Attribution</h2>

          <div>
            <label className="block font-bold text-slate-700 mb-1">About Company Summary</label>
            <textarea
              rows={3}
              value={footer.aboutText}
              onChange={(e) => setFooter({ ...footer, aboutText: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl leading-relaxed"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Copyright Line</label>
            <input
              type="text"
              value={footer.copyright}
              onChange={(e) => setFooter({ ...footer, copyright: e.target.value })}
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
              onChange={(e) => setFooter({ ...footer, disclaimer: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-700 leading-relaxed"
            />
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
              <label className="block font-bold text-slate-700 mb-1">Brand Tagline</label>
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
                Phone Line (Pan-India)
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
                Indian Registered Office Address
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
              <span>Logo &amp; Favicon Management</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Supports Google Drive sharing links and direct image URLs for live header, footer, and browser tab display.
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

          {/* Google Drive / Custom Logo Field */}
          <div className="space-y-3 pt-2">
            <label className="block font-bold text-slate-800 text-xs">
              Header &amp; Footer Logo — Image URL or Google Drive Link
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                value={branding.googleDriveLogoUrl || ''}
                onChange={(e) => setBranding({ ...branding, googleDriveLogoUrl: e.target.value })}
                placeholder="https://drive.google.com/file/d/... or direct image URL"
                className="flex-1 p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs"
              />
              {branding.googleDriveLogoUrl && (
                <button
                  type="button"
                  onClick={() => setBranding({ ...branding, googleDriveLogoUrl: '' })}
                  className="px-3 py-2 bg-slate-100 hover:bg-rose-50 text-rose-600 border border-slate-200 rounded-xl font-bold cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Live Preview */}
            {branding.googleDriveLogoUrl && (
              <div className="mt-3 p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                <span className="text-[11px] font-bold text-slate-600 block mb-2">Live Logo Preview:</span>
                <div className="flex flex-wrap items-center gap-6">
                  <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs inline-flex items-center">
                    <img
                      src={getGoogleDriveDirectImageUrl(branding.googleDriveLogoUrl)}
                      alt="Drive Logo Preview"
                      className="max-h-12 max-w-[200px] object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-3 bg-[#12304A] rounded-xl border border-slate-700 shadow-2xs inline-flex items-center">
                    <img
                      src={getGoogleDriveDirectImageUrl(branding.googleDriveLogoUrl)}
                      alt="Drive Logo Preview on Dark"
                      className="max-h-12 max-w-[200px] object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Favicon Field */}
          <div className="space-y-3 pt-4 border-t border-slate-200">
            <label className="block font-bold text-slate-800 text-xs flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-[#16A6A3]" />
              <span>Browser Favicon — Google Drive URL or Image URL</span>
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                value={branding.googleDriveFaviconUrl || ''}
                onChange={(e) => setBranding({ ...branding, googleDriveFaviconUrl: e.target.value })}
                placeholder="https://drive.google.com/file/d/... for Favicon"
                className="flex-1 p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs"
              />
              {branding.googleDriveFaviconUrl && (
                <button
                  type="button"
                  onClick={() => setBranding({ ...branding, googleDriveFaviconUrl: '' })}
                  className="px-3 py-2 bg-slate-100 hover:bg-rose-50 text-rose-600 border border-slate-200 rounded-xl font-bold cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
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
    </div>
  );
};
