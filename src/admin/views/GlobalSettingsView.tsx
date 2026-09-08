import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
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
} from 'lucide-react';

export const GlobalSettingsView: React.FC = () => {
  const { cmsData, updateSection } = useCms();
  const [activeTab, setActiveTab] = useState<'brand' | 'header' | 'footer'>('brand');
  const [savedAlert, setSavedAlert] = useState(false);

  // Local state
  const [brand, setBrand] = useState(cmsData.brand);
  const [header, setHeader] = useState(cmsData.header);
  const [footer, setFooter] = useState(cmsData.footer);

  const triggerSaveToast = () => {
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 2500);
  };

  const handleSaveAll = () => {
    updateSection('brand', brand);
    updateSection('header', header);
    updateSection('footer', footer);
    triggerSaveToast();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#16A6A3] bg-teal-50 px-2 py-0.5 rounded-md">
              Global Configuration
            </span>
            <h1 className="text-xl font-bold text-slate-900">Brand, Header &amp; Footer Settings</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Global practice contact details, emergency lines, ticker messages, and website-wide copyright disclaimers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {savedAlert && (
            <div className="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-xl text-xs font-bold flex items-center gap-1.5 animate-in fade-in">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Settings Saved!</span>
            </div>
          )}
          <button
            onClick={handleSaveAll}
            className="px-4 py-2 bg-[#16A6A3] hover:bg-teal-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Save className="w-4 h-4" />
            <span>Save Global Settings</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100 rounded-xl border border-slate-200 text-xs font-bold">
        {[
          { id: 'brand', label: '1. Brand & Contact Information' },
          { id: 'header', label: '2. Top Bar Ticker & Header' },
          { id: 'footer', label: '3. Footer Disclaimers & Copyright' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-lg transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-white text-[#12304A] shadow-xs font-extrabold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: BRAND CONTACT INFO */}
      {activeTab === 'brand' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5 text-xs">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Building className="w-4 h-4 text-[#16A6A3]" />
            Corporate Identity &amp; Contact Direct Lines
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
                placeholder="DentiSure Solutions LLC"
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
                Toll-Free Phone (Nationwide)
              </label>
              <input
                type="text"
                value={brand.phone}
                onChange={(e) => setBrand({ ...brand, phone: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-teal-600" />
                Direct Desk Line
              </label>
              <input
                type="text"
                value={brand.phoneDirect || ''}
                onChange={(e) => setBrand({ ...brand, phoneDirect: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-teal-600" />
                Contact / Inquiries Email
              </label>
              <input
                type="email"
                value={brand.contactEmail || ''}
                onChange={(e) => setBrand({ ...brand, contactEmail: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono text-[11px]"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-teal-600" />
                Operating Schedule
              </label>
              <input
                type="text"
                value={brand.hours || ''}
                onChange={(e) => setBrand({ ...brand, hours: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1">
                <Building className="w-3.5 h-3.5 text-teal-600" />
                Business Setup / Operational Model Notice
              </label>
              <input
                type="text"
                value={brand.businessSetupType || ''}
                onChange={(e) => setBrand({ ...brand, businessSetupType: e.target.value })}
                placeholder="US Registered Business Entity — Nationwide Remote Dental RCM"
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-teal-600" />
                US Business Address (Registered)
              </label>
              <input
                type="text"
                value={brand.usBusinessAddress || brand.address || ''}
                onChange={(e) =>
                  setBrand({
                    ...brand,
                    usBusinessAddress: e.target.value,
                    address: e.target.value,
                  })
                }
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium"
              />
              <p className="text-[10px] text-slate-400 mt-1">
                Central registered US business address. Updating this field updates the footer, contact page, and legal notices.
              </p>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                Mailing Address
              </label>
              <input
                type="text"
                value={brand.mailingAddress || ''}
                onChange={(e) => setBrand({ ...brand, mailingAddress: e.target.value })}
                placeholder="Enter mailing address or leave blank if same as US business address"
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                Billing / Accounts Address
              </label>
              <input
                type="text"
                value={brand.billingAddress || ''}
                onChange={(e) => setBrand({ ...brand, billingAddress: e.target.value })}
                placeholder="Electronic Invoicing & ACH / Wire Transfer Available"
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1">
                <Settings className="w-3.5 h-3.5 text-slate-500" />
                EIN / Tax ID Placeholder Notice
              </label>
              <input
                type="text"
                value={brand.einTaxIdNotice || ''}
                onChange={(e) => setBrand({ ...brand, einTaxIdNotice: e.target.value })}
                placeholder="[EIN / Tax ID on File — Disclosed upon Mutual BAA / W-9 Execution]"
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-600 font-mono text-[11px]"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: TOP TICKER & HEADER */}
      {activeTab === 'header' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6 text-xs">
          <div>
            <h2 className="text-sm font-bold text-slate-900 mb-3">Header Navigation Elements</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Phone Link Label</label>
                <input
                  type="text"
                  value={header.phoneLabel}
                  onChange={(e) => setHeader({ ...header, phoneLabel: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Audit CTA Button Label</label>
                <input
                  type="text"
                  value={header.auditButtonText}
                  onChange={(e) => setHeader({ ...header, auditButtonText: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>
            </div>
          </div>

          {/* Top Ticker Announcements */}
          <div className="pt-6 border-t border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Top Bar Announcements ({header.tickerMessages.length})
                </h3>
                <p className="text-[11px] text-slate-500">Rotating ticker banner running across the top of every public page.</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setHeader({
                    ...header,
                    tickerMessages: [...header.tickerMessages, 'New announcement bulletin for dental practices'],
                  });
                }}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Message</span>
              </button>
            </div>

            <div className="space-y-2">
              {header.tickerMessages.map((msg, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-slate-400 w-5 text-right">{idx + 1}.</span>
                  <input
                    type="text"
                    value={msg}
                    onChange={(e) => {
                      const copy = [...header.tickerMessages];
                      copy[idx] = e.target.value;
                      setHeader({ ...header, tickerMessages: copy });
                    }}
                    className="flex-1 p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setHeader({
                        ...header,
                        tickerMessages: header.tickerMessages.filter((_, i) => i !== idx),
                      });
                    }}
                    className="p-1.5 text-rose-500 hover:bg-rose-50 rounded cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: FOOTER SETTINGS */}
      {activeTab === 'footer' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-xs">
          <h2 className="text-sm font-bold text-slate-900">Footer Notices &amp; Disclaimers</h2>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Copyright Line</label>
            <input
              type="text"
              value={footer.copyright}
              onChange={(e) => setFooter({ ...footer, copyright: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Legal Regulatory Disclaimer</label>
            <textarea
              rows={4}
              value={footer.disclaimer}
              onChange={(e) => setFooter({ ...footer, disclaimer: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-700 leading-relaxed"
            />
          </div>
        </div>
      )}
    </div>
  );
};
