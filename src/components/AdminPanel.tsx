import React, { useState } from 'react';
import { useCms } from '../context/CmsContext';
import { LeadSubmission, ResourceArticle, LegalDocument } from '../types';
import {
  X,
  Lock,
  Download,
  Search,
  Filter,
  CheckCircle2,
  Calendar,
  Clock,
  Phone,
  Mail,
  Building,
  User,
  Shield,
  Trash2,
  Globe,
  FileText,
  DollarSign,
  Layers,
  RefreshCw,
  Upload,
  Plus,
  Edit3,
  Eye,
  Check,
  Save,
  KeyRound,
  BookOpen,
  ArrowRight,
  HelpCircle,
  ExternalLink,
} from 'lucide-react';

type AdminTab =
  | 'leads'
  | 'header-footer'
  | 'home'
  | 'pages'
  | 'blog'
  | 'legal'
  | 'seo'
  | 'settings';

export const AdminPanel: React.FC = () => {
  const {
    isAdminPanelOpen,
    closeAdminPanel,
    cmsData,
    updateSection,
    updateCmsData,
    resetToDefaults,
    exportJsonBackup,
    importJsonBackup,
    logout,
    adminUser,
    changePassword,
    leads,
    updateLeadStatus,
    deleteLead,
    addBlogPost,
    updateBlogPost,
    deleteBlogPost,
    updateLegalDoc,
    saveToServer,
    isSyncingServer,
  } = useCms();

  const [activeTab, setActiveTab] = useState<AdminTab>('leads');
  const [saveToast, setSaveToast] = useState<string>('');
  const [cloudStatus, setCloudStatus] = useState<any>(null);
  const [isCheckingCloud, setIsCheckingCloud] = useState<boolean>(false);

  // Check cloud connection status
  const checkCloudHealth = async () => {
    setIsCheckingCloud(true);
    try {
      const res = await fetch('/api/status');
      if (res.ok) {
        const data = await res.json();
        setCloudStatus(data);
      }
    } catch (_) {
    } finally {
      setIsCheckingCloud(false);
    }
  };

  React.useEffect(() => {
    if (isAdminPanelOpen) {
      checkCloudHealth();
    }
  }, [isAdminPanelOpen]);

  const handleSaveAllToCloud = async () => {
    const res = await saveToServer();
    if (res.success) {
      showSavedToast(
        res.provider === 'supabase'
          ? 'Saved live to Supabase Cloud Database!'
          : 'Saved live across all browsers & cloud!'
      );
    } else {
      alert('Error saving to cloud database: ' + (res.error || 'Unknown error'));
    }
  };

  // Leads filter states
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeLead, setActiveLead] = useState<LeadSubmission | null>(null);

  // Blog editor modal / state
  const [isEditingBlog, setIsEditingBlog] = useState<boolean>(false);
  const [blogFormData, setBlogFormData] = useState<ResourceArticle | null>(null);

  // Settings password states
  const [newPassword, setNewPassword] = useState<string>('');
  const [passwordMsg, setPasswordMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // JSON import input ref
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const showSavedToast = (msg = 'Changes saved live to website!') => {
    setSaveToast(msg);
    setTimeout(() => {
      setSaveToast('');
    }, 2400);
  };

  if (!isAdminPanelOpen) return null;

  // Leads Filter
  const filteredLeads = leads.filter((lead) => {
    const matchesStatus = selectedStatus === 'All' || lead.status === selectedStatus;
    const matchesSearch =
      lead.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.practiceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.pmsSoftware.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const exportLeadsCsv = () => {
    const headers = [
      'Lead ID',
      'Doctor Name',
      'Practice Name',
      'Email',
      'Phone',
      'PMS Software',
      'Locations',
      'Monthly Production',
      'Primary Challenge',
      'Services',
      'Status',
      'Date Submitted',
      'Preferred Zoom Date',
      'Preferred Zoom Time',
    ];

    const rows = leads.map((l) => [
      l.id,
      `"${l.doctorName}"`,
      `"${l.practiceName}"`,
      l.email,
      l.phone,
      l.pmsSoftware,
      l.locationsCount,
      `"${l.monthlyProduction}"`,
      `"${l.primaryChallenge}"`,
      `"${l.servicesInterested.join('; ')}"`,
      l.status,
      l.submissionDate,
      l.preferredDate || '',
      l.preferredTime || '',
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `DentiSure_Leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleJsonFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const res = importJsonBackup(content);
        if (res.success) {
          showSavedToast('Backup successfully imported! Website updated.');
        } else {
          alert(`Import error: ${res.error}`);
        }
      }
    };
    reader.readAsText(file);
  };

  const getStatusBadge = (status: LeadSubmission['status']) => {
    switch (status) {
      case 'New':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Contacted':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Audit Scheduled':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Proposal Sent':
        return 'bg-teal-100 text-teal-800 border-teal-200';
      case 'Closed Won':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-[#12304A]/85 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[94vh]">
        {/* Top Header */}
        <div className="bg-[#12304A] text-white px-5 py-3.5 flex items-center justify-between border-b border-slate-700 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center border border-teal-500/30">
              <Shield className="w-4 h-4 text-teal-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-white">
                  DentiSure Executive CMS &amp; RCM Portal
                </h3>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] uppercase font-mono bg-teal-900/80 text-teal-200 px-2 py-0.5 rounded border border-teal-700/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse"></span>
                  Live Sync
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Logged in as: <span className="text-teal-300 font-semibold">{adminUser?.name || 'Nisha Yadav'}</span> ({adminUser?.email})
              </p>
            </div>
          </div>

          {/* Quick Actions & Close */}
          <div className="flex items-center gap-2">
            {saveToast && (
              <div className="hidden md:flex items-center gap-1.5 text-xs bg-emerald-900/90 text-emerald-200 px-3 py-1 rounded-lg border border-emerald-600 animate-in fade-in">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>{saveToast}</span>
              </div>
            )}

            <button
              onClick={handleSaveAllToCloud}
              disabled={isSyncingServer}
              title="Save all changes to Cloud Database (Supabase / Live across all devices & browsers)"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-[#16A6A3] hover:bg-[#138d8a] text-white rounded-lg transition-colors cursor-pointer shadow-xs disabled:opacity-50"
            >
              {isSyncingServer ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Save className="w-3.5 h-3.5" />
              )}
              <span>{isSyncingServer ? 'Saving...' : 'Save to Cloud'}</span>
            </button>

            <button
              onClick={exportJsonBackup}
              title="Export complete site CMS backup as JSON"
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors cursor-pointer border border-slate-700"
            >
              <Download className="w-3.5 h-3.5 text-teal-400" />
              <span>Backup</span>
            </button>

            <button
              onClick={logout}
              className="px-2.5 py-1.5 text-xs font-bold text-rose-300 hover:text-white bg-rose-950/40 hover:bg-rose-900/60 rounded-lg transition-colors cursor-pointer border border-rose-800/40"
            >
              Logout
            </button>

            <button
              onClick={closeAdminPanel}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Close admin panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation Ribbon */}
        <div className="bg-slate-100 border-b border-slate-200 px-4 py-2 flex items-center gap-1.5 overflow-x-auto scrollbar-none flex-shrink-0 text-xs">
          {[
            { id: 'leads', label: 'Inbound Leads & Audits', icon: User, badge: leads.filter(l => l.status === 'New').length },
            { id: 'header-footer', label: 'Header, Topbar & Footer', icon: Layers },
            { id: 'home', label: 'Home Page CMS', icon: Globe },
            { id: 'pages', label: 'All Pages Content', icon: FileText },
            { id: 'blog', label: 'Blog & Practice Guides', icon: BookOpen, badge: cmsData.blog.length },
            { id: 'legal', label: 'Legal & BAA Policies', icon: Shield },
            { id: 'seo', label: 'SEO & Metadata', icon: Search },
            { id: 'settings', label: 'Credentials & Backup', icon: KeyRound },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as AdminTab)}
                className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-2 whitespace-nowrap cursor-pointer transition-all ${
                  isActive
                    ? 'bg-[#12304A] text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-teal-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                    isActive ? 'bg-teal-500 text-[#12304A]' : 'bg-slate-300 text-slate-700'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50">
          {/* TAB 1: INBOUND LEADS & AUDITS */}
          {activeTab === 'leads' && (
            <div className="space-y-4">
              {/* Metric Summary Ribbon */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs shadow-xs">
                <div>
                  <span className="text-slate-400 font-semibold block">Total Inbound Inquiries</span>
                  <span className="text-xl font-extrabold text-[#12304A] font-mono">{leads.length}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block">Audits Scheduled</span>
                  <span className="text-xl font-extrabold text-purple-700 font-mono">
                    {leads.filter((l) => l.status === 'Audit Scheduled').length}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block">New Unread Leads</span>
                  <span className="text-xl font-extrabold text-blue-600 font-mono">
                    {leads.filter((l) => l.status === 'New').length}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block">Est. Pipeline Volume</span>
                  <span className="text-xl font-extrabold text-emerald-600 font-mono">
                    ~${(leads.length * 95000).toLocaleString()}/mo
                  </span>
                </div>
              </div>

              {/* Filter & Search Bar */}
              <div className="p-3 bg-white border border-slate-200/90 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search doctor, practice, software..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:border-[#16A6A3]"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="flex items-center gap-1 overflow-x-auto text-xs scrollbar-none">
                    {['All', 'New', 'Contacted', 'Audit Scheduled', 'Proposal Sent', 'Closed Won'].map(
                      (st) => (
                        <button
                          key={st}
                          onClick={() => setSelectedStatus(st)}
                          className={`px-2.5 py-1 rounded-md text-[11px] font-bold whitespace-nowrap cursor-pointer transition-colors ${
                            selectedStatus === st
                              ? 'bg-[#12304A] text-white'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {st}
                        </button>
                      )
                    )}
                  </div>

                  <button
                    onClick={exportLeadsCsv}
                    className="px-3 py-1.5 text-xs font-bold bg-[#16A6A3] hover:bg-teal-600 text-white rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs whitespace-nowrap"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>CSV</span>
                  </button>
                </div>
              </div>

              {/* Leads Table */}
              <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-700 border-collapse">
                    <thead>
                      <tr className="bg-slate-100 border-b border-slate-200 text-[11px] uppercase tracking-wider text-slate-500 font-bold">
                        <th className="p-3">Doctor / Practice</th>
                        <th className="p-3">PMS Software</th>
                        <th className="p-3">Monthly Production</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Scheduled Zoom</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredLeads.map((lead) => (
                        <tr
                          key={lead.id}
                          className="hover:bg-teal-50/40 transition-colors cursor-pointer"
                          onClick={() => setActiveLead(lead)}
                        >
                          <td className="p-3">
                            <div className="font-bold text-[#12304A]">{lead.doctorName}</div>
                            <div className="text-[11px] text-slate-500">{lead.practiceName}</div>
                            <div className="text-[10px] text-slate-400">{lead.email} &bull; {lead.phone}</div>
                          </td>
                          <td className="p-3">
                            <span className="font-medium bg-slate-100 px-2 py-0.5 rounded border border-slate-200 text-slate-800">
                              {lead.pmsSoftware}
                            </span>
                          </td>
                          <td className="p-3 font-semibold text-slate-800 font-mono">
                            {lead.monthlyProduction}
                          </td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(lead.status)}`}>
                              {lead.status}
                            </span>
                          </td>
                          <td className="p-3 text-slate-600">
                            {lead.preferredDate ? (
                              <span className="flex items-center gap-1 text-[11px]">
                                <Calendar className="w-3 h-3 text-[#16A6A3]" />
                                {lead.preferredDate} {lead.preferredTime}
                              </span>
                            ) : (
                              <span className="text-slate-400 italic">No date selected</span>
                            )}
                          </td>
                          <td className="p-3 text-right" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-end gap-1.5">
                              <select
                                value={lead.status}
                                onChange={(e) => {
                                  updateLeadStatus(lead.id, e.target.value as LeadSubmission['status']);
                                  showSavedToast('Lead status updated!');
                                }}
                                className="text-[11px] bg-slate-50 border border-slate-200 rounded px-1.5 py-1 text-slate-700 focus:outline-none"
                              >
                                <option value="New">New</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Audit Scheduled">Audit Scheduled</option>
                                <option value="Proposal Sent">Proposal Sent</option>
                                <option value="Closed Won">Closed Won</option>
                              </select>

                              <button
                                onClick={() => {
                                  if (confirm(`Delete lead from ${lead.doctorName}?`)) {
                                    deleteLead(lead.id);
                                    showSavedToast('Lead deleted');
                                  }
                                }}
                                className="p-1 text-slate-400 hover:text-rose-600 rounded hover:bg-rose-50 transition-colors"
                                title="Delete Lead"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: HEADER, TOPBAR & FOOTER CMS */}
          {activeTab === 'header-footer' && (
            <div className="space-y-6 max-w-4xl">
              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h4 className="text-sm font-bold text-[#12304A] flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#16A6A3]" />
                    <span>Top Notification Bar &amp; Ticker Settings</span>
                  </h4>
                  <button
                    type="button"
                    onClick={() => showSavedToast()}
                    className="text-xs font-bold text-[#16A6A3] hover:underline"
                  >
                    Auto-saves on input
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Top Announcement Badge
                    </label>
                    <input
                      type="text"
                      value={cmsData.header.topNoticeBadge}
                      onChange={(e) => {
                        updateSection('header', { topNoticeBadge: e.target.value });
                      }}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#16A6A3]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Direct Doctor Phone Label
                    </label>
                    <input
                      type="text"
                      value={cmsData.header.phoneLabel}
                      onChange={(e) => {
                        updateSection('header', { phoneLabel: e.target.value });
                      }}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#16A6A3]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Top Announcement Bar Headline Text
                  </label>
                  <input
                    type="text"
                    value={cmsData.header.topNotice}
                    onChange={(e) => {
                      updateSection('header', { topNotice: e.target.value });
                    }}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#16A6A3]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Header Audit CTA Button Text
                    </label>
                    <input
                      type="text"
                      value={cmsData.header.auditButtonText}
                      onChange={(e) => {
                        updateSection('header', { auditButtonText: e.target.value });
                      }}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#16A6A3]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Brand Phone Number
                    </label>
                    <input
                      type="text"
                      value={cmsData.brand.phone}
                      onChange={(e) => {
                        updateSection('brand', { phone: e.target.value });
                      }}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#16A6A3]"
                    />
                  </div>
                </div>
              </div>

              {/* Brand & Footer CMS */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
                <h4 className="text-sm font-bold text-[#12304A] pb-3 border-b border-slate-100 flex items-center gap-2">
                  <Building className="w-4 h-4 text-[#16A6A3]" />
                  <span>Footer Content &amp; Practice Information</span>
                </h4>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Footer About Description
                  </label>
                  <textarea
                    rows={3}
                    value={cmsData.footer.aboutText}
                    onChange={(e) => {
                      updateSection('footer', { aboutText: e.target.value });
                    }}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#16A6A3]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Legal Disclaimer Text
                  </label>
                  <textarea
                    rows={2}
                    value={cmsData.footer.disclaimer}
                    onChange={(e) => {
                      updateSection('footer', { disclaimer: e.target.value });
                    }}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#16A6A3]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Direct Inbound Email
                    </label>
                    <input
                      type="text"
                      value={cmsData.brand.contactEmail}
                      onChange={(e) => {
                        updateSection('brand', { contactEmail: e.target.value });
                      }}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#16A6A3]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Support Operating Hours
                    </label>
                    <input
                      type="text"
                      value={cmsData.brand.hours}
                      onChange={(e) => {
                        updateSection('brand', { hours: e.target.value });
                      }}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#16A6A3]"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: HOME PAGE CMS */}
          {activeTab === 'home' && (
            <div className="space-y-6 max-w-4xl">
              {/* Hero Section Edit */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
                <h4 className="text-sm font-bold text-[#12304A] pb-3 border-b border-slate-100 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#16A6A3]" />
                  <span>Hero Section Elements</span>
                </h4>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Hero Top Pill Badge
                  </label>
                  <input
                    type="text"
                    value={cmsData.hero.badge}
                    onChange={(e) => updateSection('hero', { badge: e.target.value })}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#16A6A3]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Hero Main Title
                    </label>
                    <input
                      type="text"
                      value={cmsData.hero.headline}
                      onChange={(e) => updateSection('hero', { headline: e.target.value })}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#16A6A3]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Hero Highlight Phrase (Teal Gradient)
                    </label>
                    <input
                      type="text"
                      value={cmsData.hero.highlightText}
                      onChange={(e) => updateSection('hero', { highlightText: e.target.value })}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#16A6A3]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Hero Subtitle / Description
                  </label>
                  <textarea
                    rows={3}
                    value={cmsData.hero.subheadline}
                    onChange={(e) => updateSection('hero', { subheadline: e.target.value })}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#16A6A3]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Primary Button Text
                    </label>
                    <input
                      type="text"
                      value={cmsData.hero.primaryCtaText}
                      onChange={(e) => updateSection('hero', { primaryCtaText: e.target.value })}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#16A6A3]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Secondary Button Text
                    </label>
                    <input
                      type="text"
                      value={cmsData.hero.secondaryCtaText}
                      onChange={(e) => updateSection('hero', { secondaryCtaText: e.target.value })}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#16A6A3]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Hero Side Photo URL (Unsplash or direct image link)
                  </label>
                  <input
                    type="text"
                    value={cmsData.hero.heroImage}
                    onChange={(e) => updateSection('hero', { heroImage: e.target.value })}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#16A6A3]"
                  />
                </div>

                {/* 3 Stats underneath Hero */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase">Stat 1</label>
                    <input
                      type="text"
                      value={cmsData.hero.stat1Value}
                      onChange={(e) => updateSection('hero', { stat1Value: e.target.value })}
                      className="w-full text-xs font-bold text-[#12304A] p-1 bg-white border border-slate-200 rounded mb-1"
                    />
                    <input
                      type="text"
                      value={cmsData.hero.stat1Label}
                      onChange={(e) => updateSection('hero', { stat1Label: e.target.value })}
                      className="w-full text-[11px] text-slate-600 p-1 bg-white border border-slate-200 rounded"
                    />
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase">Stat 2</label>
                    <input
                      type="text"
                      value={cmsData.hero.stat2Value}
                      onChange={(e) => updateSection('hero', { stat2Value: e.target.value })}
                      className="w-full text-xs font-bold text-[#12304A] p-1 bg-white border border-slate-200 rounded mb-1"
                    />
                    <input
                      type="text"
                      value={cmsData.hero.stat2Label}
                      onChange={(e) => updateSection('hero', { stat2Label: e.target.value })}
                      className="w-full text-[11px] text-slate-600 p-1 bg-white border border-slate-200 rounded"
                    />
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase">Stat 3</label>
                    <input
                      type="text"
                      value={cmsData.hero.stat3Value}
                      onChange={(e) => updateSection('hero', { stat3Value: e.target.value })}
                      className="w-full text-xs font-bold text-[#12304A] p-1 bg-white border border-slate-200 rounded mb-1"
                    />
                    <input
                      type="text"
                      value={cmsData.hero.stat3Label}
                      onChange={(e) => updateSection('hero', { stat3Label: e.target.value })}
                      className="w-full text-[11px] text-slate-600 p-1 bg-white border border-slate-200 rounded"
                    />
                  </div>
                </div>
              </div>

              {/* Secondary Slider Cards Edit */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h4 className="text-sm font-bold text-[#12304A] flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#16A6A3]" />
                    <span>Secondary Marquee Slider Cards ({cmsData.secondarySlider.length})</span>
                  </h4>
                  <button
                    onClick={() => {
                      const newId = `sl-${Date.now()}`;
                      updateSection('secondarySlider', [
                        ...cmsData.secondarySlider,
                        { id: newId, category: 'Clinical Coding', title: 'New Process Title', desc: 'Detailed explanation of this billing feature' }
                      ]);
                      showSavedToast('Added slider card');
                    }}
                    className="text-xs font-bold text-[#16A6A3] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Card</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {cmsData.secondarySlider.map((card, idx) => (
                    <div key={card.id || idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 flex-1 w-full">
                        <input
                          type="text"
                          value={card.category}
                          placeholder="Category"
                          onChange={(e) => {
                            const updated = [...cmsData.secondarySlider];
                            updated[idx].category = e.target.value;
                            updateSection('secondarySlider', updated);
                          }}
                          className="text-xs p-1.5 bg-white border border-slate-200 rounded font-semibold text-[#16A6A3]"
                        />
                        <input
                          type="text"
                          value={card.title}
                          placeholder="Title"
                          onChange={(e) => {
                            const updated = [...cmsData.secondarySlider];
                            updated[idx].title = e.target.value;
                            updateSection('secondarySlider', updated);
                          }}
                          className="text-xs p-1.5 bg-white border border-slate-200 rounded font-bold text-[#12304A]"
                        />
                        <input
                          type="text"
                          value={card.desc}
                          placeholder="Description"
                          onChange={(e) => {
                            const updated = [...cmsData.secondarySlider];
                            updated[idx].desc = e.target.value;
                            updateSection('secondarySlider', updated);
                          }}
                          className="text-xs p-1.5 bg-white border border-slate-200 rounded text-slate-600"
                        />
                      </div>
                      <button
                        onClick={() => {
                          const updated = cmsData.secondarySlider.filter((_, i) => i !== idx);
                          updateSection('secondarySlider', updated);
                          showSavedToast('Card removed');
                        }}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded hover:bg-rose-50 transition-colors"
                        title="Delete Card"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: ALL PAGES CONTENT CMS */}
          {activeTab === 'pages' && (
            <div className="space-y-6 max-w-4xl">
              {/* About Page Editor */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
                <h4 className="text-sm font-bold text-[#12304A] pb-3 border-b border-slate-100 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#16A6A3]" />
                  <span>About Us Page CMS</span>
                </h4>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    About Page Headline
                  </label>
                  <input
                    type="text"
                    value={cmsData.aboutPage.heroTitle}
                    onChange={(e) => updateSection('aboutPage', { heroTitle: e.target.value })}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#16A6A3]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    About Page Subtitle
                  </label>
                  <textarea
                    rows={2}
                    value={cmsData.aboutPage.heroSubtitle}
                    onChange={(e) => updateSection('aboutPage', { heroSubtitle: e.target.value })}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#16A6A3]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Our Mission Statement
                  </label>
                  <textarea
                    rows={2}
                    value={cmsData.aboutPage.missionText}
                    onChange={(e) => updateSection('aboutPage', { missionText: e.target.value })}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#16A6A3]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Founding Story
                  </label>
                  <textarea
                    rows={4}
                    value={cmsData.aboutPage.storyText}
                    onChange={(e) => updateSection('aboutPage', { storyText: e.target.value })}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#16A6A3]"
                  />
                </div>
              </div>

              {/* Solutions & Pricing Settings */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
                <h4 className="text-sm font-bold text-[#12304A] pb-3 border-b border-slate-100 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-[#16A6A3]" />
                  <span>Pricing Tiers &amp; Guarantee</span>
                </h4>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Pricing Section Headline
                  </label>
                  <input
                    type="text"
                    value={cmsData.pricing.title}
                    onChange={(e) => updateSection('pricing', { title: e.target.value })}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#16A6A3]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Pricing Guarantee Badge Text
                  </label>
                  <input
                    type="text"
                    value={cmsData.pricing.guaranteeText}
                    onChange={(e) => updateSection('pricing', { guaranteeText: e.target.value })}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#16A6A3]"
                  />
                </div>

                <div className="space-y-3 pt-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Pricing Tiers ({cmsData.pricing.tiers.length})
                  </label>
                  {cmsData.pricing.tiers.map((tier, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <input
                          type="text"
                          value={tier.name}
                          onChange={(e) => {
                            const updated = [...cmsData.pricing.tiers];
                            updated[idx].name = e.target.value;
                            updateSection('pricing', { tiers: updated });
                          }}
                          className="text-xs font-bold p-1.5 bg-white border border-slate-200 rounded text-[#12304A]"
                        />
                        <input
                          type="text"
                          value={tier.price}
                          onChange={(e) => {
                            const updated = [...cmsData.pricing.tiers];
                            updated[idx].price = e.target.value;
                            updateSection('pricing', { tiers: updated });
                          }}
                          className="text-xs font-bold p-1.5 bg-white border border-slate-200 rounded text-[#16A6A3]"
                        />
                        <input
                          type="text"
                          value={tier.unit}
                          onChange={(e) => {
                            const updated = [...cmsData.pricing.tiers];
                            updated[idx].unit = e.target.value;
                            updateSection('pricing', { tiers: updated });
                          }}
                          className="text-xs p-1.5 bg-white border border-slate-200 rounded text-slate-600"
                        />
                      </div>
                      <input
                        type="text"
                        value={tier.idealFor}
                        placeholder="Ideal for..."
                        onChange={(e) => {
                          const updated = [...cmsData.pricing.tiers];
                          updated[idx].idealFor = e.target.value;
                          updateSection('pricing', { tiers: updated });
                        }}
                        className="w-full text-xs p-1.5 bg-white border border-slate-200 rounded text-slate-600"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: BLOG & PRACTICE GUIDES MANAGER */}
          {activeTab === 'blog' && (
            <div className="space-y-4 max-w-5xl">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-[#12304A]">
                    Dental Billing Articles &amp; Clinical Guides ({cmsData.blog.length})
                  </h4>
                  <p className="text-xs text-slate-500">
                    Add new posts or modify existing clinical billing articles.
                  </p>
                </div>
                <button
                  onClick={() => {
                    const newArticle: ResourceArticle = {
                      id: `art-${Date.now()}`,
                      title: 'New Dental Billing Best Practices Guide',
                      category: 'Revenue Cycle',
                      readTime: '5 min read',
                      date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
                      author: 'DentiSure RCM Specialists',
                      snippet: 'Summary of the article discussing clinical narratives and billing workflows.',
                      content: [
                        'First introductory paragraph regarding CDT codes.',
                        'Second paragraph describing attachment requirements.',
                      ],
                    };
                    setBlogFormData(newArticle);
                    setIsEditingBlog(true);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-[#16A6A3] hover:bg-teal-600 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create New Post</span>
                </button>
              </div>

              {/* Blog Posts List */}
              <div className="space-y-3">
                {cmsData.blog.map((article) => (
                  <div
                    key={article.id}
                    className="p-4 bg-white rounded-2xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-teal-50 text-[#16A6A3] border border-teal-100">
                          {article.category}
                        </span>
                        <span className="text-xs text-slate-400">&bull; {article.readTime}</span>
                        <span className="text-xs text-slate-400">&bull; {article.date}</span>
                      </div>
                      <h5 className="text-sm font-bold text-[#12304A] truncate">{article.title}</h5>
                      <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{article.snippet}</p>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => {
                          setBlogFormData(article);
                          setIsEditingBlog(true);
                        }}
                        className="px-3 py-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-teal-600" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Delete post "${article.title}"?`)) {
                            deleteBlogPost(article.id);
                            showSavedToast('Blog post deleted');
                          }
                        }}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 cursor-pointer transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Edit Blog Modal */}
              {isEditingBlog && blogFormData && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
                  <div className="bg-white rounded-3xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-4 shadow-2xl border border-slate-200">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <h4 className="text-base font-bold text-[#12304A]">
                        {cmsData.blog.some(b => b.id === blogFormData.id) ? 'Edit Article' : 'Create Article'}
                      </h4>
                      <button
                        onClick={() => setIsEditingBlog(false)}
                        className="p-1 text-slate-400 hover:text-slate-700"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Article Title</label>
                      <input
                        type="text"
                        value={blogFormData.title}
                        onChange={(e) => setBlogFormData({ ...blogFormData, title: e.target.value })}
                        className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-xl"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Category</label>
                        <input
                          type="text"
                          value={blogFormData.category}
                          onChange={(e) => setBlogFormData({ ...blogFormData, category: e.target.value })}
                          className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Read Time</label>
                        <input
                          type="text"
                          value={blogFormData.readTime}
                          onChange={(e) => setBlogFormData({ ...blogFormData, readTime: e.target.value })}
                          className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Date</label>
                        <input
                          type="text"
                          value={blogFormData.date}
                          onChange={(e) => setBlogFormData({ ...blogFormData, date: e.target.value })}
                          className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Author Name / Team</label>
                      <input
                        type="text"
                        value={blogFormData.author}
                        onChange={(e) => setBlogFormData({ ...blogFormData, author: e.target.value })}
                        className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Short Excerpt</label>
                      <textarea
                        rows={2}
                        value={blogFormData.snippet}
                        onChange={(e) => setBlogFormData({ ...blogFormData, snippet: e.target.value })}
                        className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Content (Paragraphs separated by line breaks)
                      </label>
                      <textarea
                        rows={6}
                        value={blogFormData.content.join('\n\n')}
                        onChange={(e) =>
                          setBlogFormData({
                            ...blogFormData,
                            content: e.target.value.split('\n\n').filter(Boolean),
                          })
                        }
                        className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-sans"
                      />
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => setIsEditingBlog(false)}
                        className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (cmsData.blog.some(b => b.id === blogFormData.id)) {
                            updateBlogPost(blogFormData);
                            showSavedToast('Blog post updated');
                          } else {
                            addBlogPost(blogFormData);
                            showSavedToast('New blog post published');
                          }
                          setIsEditingBlog(false);
                        }}
                        className="px-5 py-2 text-xs font-bold bg-[#16A6A3] hover:bg-teal-600 text-white rounded-xl shadow-xs"
                      >
                        Save &amp; Publish Post
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 6: LEGAL & BAA POLICIES CMS */}
          {activeTab === 'legal' && (
            <div className="space-y-6 max-w-4xl">
              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h4 className="text-sm font-bold text-[#12304A] flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[#16A6A3]" />
                    <span>Legal Documents CMS (Terms, Privacy &amp; HIPAA)</span>
                  </h4>
                  <span className="text-xs text-slate-500">Live on /terms, /privacy, /hipaa</span>
                </div>

                {/* Document selector tabs */}
                {(['terms', 'privacy', 'hipaa'] as const).map((docKey) => {
                  const doc = cmsData.legal[docKey];
                  return (
                    <div key={docKey} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#12304A] uppercase tracking-wider">
                          {docKey.toUpperCase()} Document
                        </span>
                        <input
                          type="text"
                          value={doc.lastUpdated}
                          onChange={(e) => {
                            updateLegalDoc(docKey, { ...doc, lastUpdated: e.target.value });
                          }}
                          placeholder="Last updated date"
                          className="text-xs p-1 bg-white border border-slate-200 rounded text-slate-600 font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">Document Title</label>
                        <input
                          type="text"
                          value={doc.title}
                          onChange={(e) => {
                            updateLegalDoc(docKey, { ...doc, title: e.target.value });
                          }}
                          className="w-full text-xs p-2 bg-white border border-slate-200 rounded-xl"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">Introductory Paragraph</label>
                        <textarea
                          rows={2}
                          value={doc.intro}
                          onChange={(e) => {
                            updateLegalDoc(docKey, { ...doc, intro: e.target.value });
                          }}
                          className="w-full text-xs p-2 bg-white border border-slate-200 rounded-xl"
                        />
                      </div>

                      <div className="space-y-2 pt-2">
                        <label className="block text-[11px] font-bold text-slate-600">
                          Clauses &amp; Sections ({doc.sections.length})
                        </label>
                        {doc.sections.map((sec, sIdx) => (
                          <div key={sIdx} className="p-2.5 bg-white rounded-xl border border-slate-200 space-y-1.5">
                            <input
                              type="text"
                              value={sec.heading}
                              onChange={(e) => {
                                const newSecs = [...doc.sections];
                                newSecs[sIdx].heading = e.target.value;
                                updateLegalDoc(docKey, { ...doc, sections: newSecs });
                              }}
                              className="w-full text-xs font-bold text-[#12304A] p-1 border-b border-slate-100 focus:outline-none"
                            />
                            <textarea
                              rows={2}
                              value={sec.body}
                              onChange={(e) => {
                                const newSecs = [...doc.sections];
                                newSecs[sIdx].body = e.target.value;
                                updateLegalDoc(docKey, { ...doc, sections: newSecs });
                              }}
                              className="w-full text-xs p-1 text-slate-600 border border-slate-100 rounded focus:outline-none"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 7: SEO & METADATA CMS */}
          {activeTab === 'seo' && (
            <div className="space-y-6 max-w-4xl">
              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
                <h4 className="text-sm font-bold text-[#12304A] pb-3 border-b border-slate-100 flex items-center gap-2">
                  <Search className="w-4 h-4 text-[#16A6A3]" />
                  <span>Search Engine Optimization (SEO) &amp; OpenGraph</span>
                </h4>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Browser &amp; Google Search Title
                  </label>
                  <input
                    type="text"
                    value={cmsData.seo.siteTitle}
                    onChange={(e) => updateSection('seo', { siteTitle: e.target.value })}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#16A6A3]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Meta Description (150–160 chars recommended)
                  </label>
                  <textarea
                    rows={2}
                    value={cmsData.seo.metaDescription}
                    onChange={(e) => updateSection('seo', { metaDescription: e.target.value })}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#16A6A3]"
                  />
                  <div className="text-[11px] text-slate-400 text-right mt-1">
                    Length: {cmsData.seo.metaDescription.length} characters
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Target Keywords (comma-separated)
                  </label>
                  <textarea
                    rows={2}
                    value={cmsData.seo.keywords}
                    onChange={(e) => updateSection('seo', { keywords: e.target.value })}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#16A6A3]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Canonical Domain URL
                    </label>
                    <input
                      type="text"
                      value={cmsData.seo.canonicalUrl}
                      onChange={(e) => updateSection('seo', { canonicalUrl: e.target.value })}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#16A6A3]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Analytics Tracking ID
                    </label>
                    <input
                      type="text"
                      value={cmsData.seo.analyticsId}
                      onChange={(e) => updateSection('seo', { analyticsId: e.target.value })}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#16A6A3]"
                    />
                  </div>
                </div>

                {/* Google Search Snippet Preview */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                    Live Google Search Snippet Preview
                  </span>
                  <div className="bg-white p-3.5 rounded-lg border border-slate-200 max-w-xl">
                    <div className="text-[11px] text-slate-600 flex items-center gap-1.5 mb-0.5 font-mono">
                      <span>{cmsData.seo.canonicalUrl}</span>
                    </div>
                    <div className="text-base text-blue-700 hover:underline cursor-pointer font-medium line-clamp-1">
                      {cmsData.seo.siteTitle}
                    </div>
                    <div className="text-xs text-slate-600 line-clamp-2 mt-1">
                      {cmsData.seo.metaDescription}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: CREDENTIALS & BACKUP */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-3xl">
              {/* Change Password Card */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
                <h4 className="text-sm font-bold text-[#12304A] pb-3 border-b border-slate-100 flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-[#16A6A3]" />
                  <span>Admin Security Credentials</span>
                </h4>

                {passwordMsg && (
                  <div className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                    passwordMsg.type === 'success'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-rose-50 text-rose-800 border border-rose-200'
                  }`}>
                    {passwordMsg.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <X className="w-4 h-4" />}
                    <span>{passwordMsg.text}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Admin Email (Permanent ID)
                    </label>
                    <input
                      type="text"
                      disabled
                      value={adminUser?.email || 'admin@dentisure.com'}
                      className="w-full text-xs p-2.5 bg-slate-100 border border-slate-200 rounded-xl text-slate-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      New Password (min. 5 chars)
                    </label>
                    <input
                      type="password"
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const res = changePassword(newPassword);
                    if (res.success) {
                      setPasswordMsg({ type: 'success', text: 'Password successfully updated!' });
                      setNewPassword('');
                    } else {
                      setPasswordMsg({ type: 'error', text: res.error || 'Failed to update' });
                    }
                  }}
                  className="px-4 py-2 text-xs font-bold bg-[#12304A] hover:bg-[#16A6A3] text-white rounded-xl transition-all cursor-pointer"
                >
                  Update Admin Password
                </button>
              </div>

              {/* Cloud Database & Storage Status Card (Vercel Serverless) */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h4 className="text-sm font-bold text-[#12304A] flex items-center gap-2">
                    <Globe className="w-4 h-4 text-[#16A6A3]" />
                    <span>Cloud Database &amp; Vercel Serverless Architecture</span>
                  </h4>
                  <button
                    onClick={checkCloudHealth}
                    disabled={isCheckingCloud}
                    className="flex items-center gap-1 text-[11px] font-bold text-teal-700 bg-teal-50 hover:bg-teal-100 px-2.5 py-1 rounded-lg border border-teal-200 cursor-pointer"
                  >
                    <RefreshCw className={`w-3 h-3 ${isCheckingCloud ? 'animate-spin' : ''}`} />
                    <span>Check Status</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Active Database Engine
                    </span>
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${cloudStatus?.supabaseConfigured ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                      <span className="text-xs font-bold text-[#12304A]">
                        {cloudStatus?.databaseProvider || 'Checking cloud database...'}
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Active Image CDN Storage
                    </span>
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${cloudStatus?.isConfigured ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                      <span className="text-xs font-bold text-[#12304A]">
                        {cloudStatus?.storageProvider || 'Checking cloud storage...'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-teal-50/60 border border-teal-200/80 rounded-xl text-xs text-teal-900 space-y-2">
                  <div className="flex items-center justify-between">
                    <h5 className="font-bold flex items-center gap-1.5 text-teal-950">
                      <Shield className="w-4 h-4 text-teal-600" />
                      <span>Vercel Permanent Cloud Setup (Free Tier Supabase)</span>
                    </h5>
                    <span className="text-[10px] font-mono bg-teal-200/60 text-teal-900 px-2 py-0.5 rounded">
                      Production Ready
                    </span>
                  </div>
                  <p className="text-[11px] text-teal-800 leading-relaxed">
                    Vercel is an ephemeral, serverless environment. For changes (like new logos, hero texts, and phone numbers) to persist permanently across all devices and incognito windows on Vercel, connect your free Supabase project by adding these 2 Environment Variables in your Vercel Dashboard:
                  </p>
                  <div className="bg-[#12304A] text-teal-200 p-3 rounded-lg font-mono text-[11px] overflow-x-auto select-all">
                    SUPABASE_URL=https://your-project.supabase.co<br />
                    SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
                  </div>
                  <p className="text-[10px] text-teal-700">
                    SQL snippet to create the table in Supabase SQL Editor: <code className="bg-white/80 px-1 py-0.5 rounded text-[#12304A]">CREATE TABLE cms_content (id TEXT PRIMARY KEY DEFAULT 'default', data JSONB NOT NULL, updated_at TIMESTAMPTZ DEFAULT NOW());</code>
                  </p>
                </div>
              </div>

              {/* Backup & Factory Reset Card */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
                <h4 className="text-sm font-bold text-[#12304A] pb-3 border-b border-slate-100 flex items-center gap-2">
                  <Download className="w-4 h-4 text-[#16A6A3]" />
                  <span>Data Backup, Export &amp; Factory Reset</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col justify-between">
                    <div>
                      <h5 className="text-xs font-bold text-[#12304A] mb-1">Export JSON Backup</h5>
                      <p className="text-[11px] text-slate-500 mb-3">
                        Download a clean, structured JSON file containing all CMS texts, leads, and SEO configurations.
                      </p>
                    </div>
                    <button
                      onClick={exportJsonBackup}
                      className="w-full py-2 px-3 bg-[#12304A] hover:bg-[#16A6A3] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download JSON Backup</span>
                    </button>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col justify-between">
                    <div>
                      <h5 className="text-xs font-bold text-[#12304A] mb-1">Import JSON File</h5>
                      <p className="text-[11px] text-slate-500 mb-3">
                        Upload a previously exported JSON backup to instantly restore all website content and leads.
                      </p>
                    </div>
                    <div>
                      <input
                        type="file"
                        accept=".json"
                        ref={fileInputRef}
                        onChange={handleJsonFileUpload}
                        className="hidden"
                      />
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full py-2 px-3 bg-white border border-slate-300 hover:border-[#16A6A3] text-slate-700 hover:text-[#16A6A3] text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload JSON File</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <h5 className="text-xs font-bold text-rose-900">Reset Content to Factory Defaults</h5>
                    <p className="text-[11px] text-rose-700">
                      Reverts all edited headlines, sliders, and pricing back to initial factory content.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to reset all website content to factory defaults?')) {
                        resetToDefaults();
                        showSavedToast('All content reset to original defaults');
                      }
                    }}
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl whitespace-nowrap cursor-pointer transition-colors shadow-xs"
                  >
                    Reset Defaults
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <div className="bg-white border-t border-slate-200 px-5 py-2.5 flex items-center justify-between text-xs text-slate-500 flex-shrink-0">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 font-medium">
              <span className={`w-2 h-2 rounded-full ${cloudStatus?.isConfigured ? 'bg-emerald-500' : 'bg-teal-500'}`}></span>
              Live Sync: {cloudStatus?.isConfigured ? 'Cloud Database Connected' : 'Auto-Sync Active'}
            </span>
            <span className="hidden sm:inline text-slate-300">|</span>
            <span className="hidden sm:inline">Engine: {cloudStatus?.databaseProvider || 'Universal Cloud / Serverless'}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleSaveAllToCloud}
              disabled={isSyncingServer}
              className="px-3 py-1 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-lg text-xs cursor-pointer transition-colors disabled:opacity-50 flex items-center gap-1.5"
            >
              <Save className="w-3 h-3" />
              <span>{isSyncingServer ? 'Saving...' : 'Save to Cloud'}</span>
            </button>
            <button
              onClick={closeAdminPanel}
              className="px-3 py-1 bg-[#12304A] hover:bg-[#16A6A3] text-white font-bold rounded-lg text-xs cursor-pointer transition-colors"
            >
              View Live Site
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
