import React from 'react';
import { useCms } from '../../context/CmsContext';
import {
  Users,
  FileText,
  DollarSign,
  Image as ImageIcon,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  TrendingUp,
  ShieldCheck,
  Calendar,
  Sparkles,
  Layers,
  ArrowRight,
} from 'lucide-react';

interface DashboardOverviewViewProps {
  onNavigateTab: (tab: string) => void;
}

export const DashboardOverviewView: React.FC<DashboardOverviewViewProps> = ({ onNavigateTab }) => {
  const { cmsData, leads, updateLeadStatus } = useCms();

  const newLeadsCount = leads.filter((l) => l.status === 'New').length;
  const auditScheduledCount = leads.filter((l) => l.status === 'Audit Scheduled').length;
  const closedWonCount = leads.filter((l) => l.status === 'Closed Won').length;
  const totalArticles = cmsData.blog.length;
  const totalMedia = cmsData.mediaLibrary ? cmsData.mediaLibrary.length : 12;
  const totalServices = cmsData.services?.pillars ? cmsData.services.pillars.length : 5;

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#12304A] via-[#164264] to-[#12304A] rounded-2xl p-6 sm:p-8 text-white border border-slate-700/60 shadow-xl">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold mb-3 border border-teal-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Executive CMS &amp; Practice Ledger Dashboard</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-2">
            Welcome back, Nisha
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">
            Here is your live revenue cycle management control plane. Manage incoming practice audit requests, update website copy across every section, organize media assets, and fine-tune SEO metadata in real-time.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigateTab('leads')}
              className="px-4 py-2 bg-[#16A6A3] hover:bg-teal-400 text-slate-950 font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Users className="w-4 h-4" />
              <span>Review Practice Leads ({newLeadsCount} New)</span>
            </button>
            <button
              onClick={() => onNavigateTab('pages-home')}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-xl border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Layers className="w-4 h-4 text-teal-300" />
              <span>Edit Homepage Copy</span>
            </button>
            <button
              onClick={() => onNavigateTab('media')}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-xl border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <ImageIcon className="w-4 h-4 text-teal-300" />
              <span>Media Assets ({totalMedia})</span>
            </button>
          </div>
        </div>

        {/* Ambient watermark */}
        <div className="absolute -right-8 -bottom-10 opacity-10 pointer-events-none">
          <ShieldCheck className="w-64 h-64 text-teal-200" />
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Card 1: Leads */}
        <div
          onClick={() => onNavigateTab('leads')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#16A6A3] flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
            {newLeadsCount > 0 ? (
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-teal-100 text-teal-800 border border-teal-200 animate-pulse">
                {newLeadsCount} Need Action
              </span>
            ) : (
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-600">
                All Current
              </span>
            )}
          </div>
          <div className="text-2xl font-black text-slate-900">{leads.length}</div>
          <div className="text-xs font-semibold text-slate-500 mt-0.5">Total Inbound Practice Leads</div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span>{auditScheduledCount} Audits Scheduled</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#16A6A3] transition-colors" />
          </div>
        </div>

        {/* Card 2: Blog Guides */}
        <div
          onClick={() => onNavigateTab('pages-blog')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-blue-50 text-blue-700">
              Live Articles
            </span>
          </div>
          <div className="text-2xl font-black text-slate-900">{totalArticles}</div>
          <div className="text-xs font-semibold text-slate-500 mt-0.5">Practice Guides &amp; Insights</div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span>Downloadable checklists active</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-colors" />
          </div>
        </div>

        {/* Card 3: Services & Tiers */}
        <div
          onClick={() => onNavigateTab('pages-solutions')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <DollarSign className="w-5 h-5" />
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-amber-50 text-amber-700">
              Contingency
            </span>
          </div>
          <div className="text-2xl font-black text-slate-900">{totalServices}</div>
          <div className="text-xs font-semibold text-slate-500 mt-0.5">Core Revenue Pillars</div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span>3 Contingency Tier models</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-600 transition-colors" />
          </div>
        </div>

        {/* Card 4: Media Library */}
        <div
          onClick={() => onNavigateTab('media')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <ImageIcon className="w-5 h-5" />
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-purple-50 text-purple-700">
              CDN Ready
            </span>
          </div>
          <div className="text-2xl font-black text-slate-900">{totalMedia}</div>
          <div className="text-xs font-semibold text-slate-500 mt-0.5">Managed Media Assets</div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span>Doctors, banners &amp; clinics</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-purple-600 transition-colors" />
          </div>
        </div>
      </div>

      {/* Split Section: Recent Practice Inquiries & Quick CMS Launchers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Inquiries (2 Cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-4 h-4 text-[#16A6A3]" />
                Recent Practice Audit Inquiries
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Latest submissions from practices requesting claims recovery audit
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('leads')}
              className="text-xs font-bold text-[#16A6A3] hover:text-teal-700 flex items-center gap-1 cursor-pointer"
            >
              <span>View All ({leads.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold border-y border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Doctor / Practice</th>
                  <th className="py-2.5 px-3">PMS / Volume</th>
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {leads.slice(0, 5).map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-3">
                      <div className="font-bold text-slate-900">{lead.doctorName}</div>
                      <div className="text-[11px] text-slate-500">{lead.practiceName}</div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="inline-block px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-bold">
                        {lead.pmsSoftware}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{lead.monthlyProduction} / mo</div>
                    </td>
                    <td className="py-3 px-3 text-slate-500 whitespace-nowrap">
                      {lead.submissionDate}
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          lead.status === 'New'
                            ? 'bg-amber-100 text-amber-800'
                            : lead.status === 'Audit Scheduled'
                            ? 'bg-blue-100 text-blue-800'
                            : lead.status === 'Closed Won'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {lead.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right whitespace-nowrap">
                      <select
                        value={lead.status}
                        onChange={(e) => updateLeadStatus(lead.id, e.target.value as any)}
                        className="text-[11px] font-semibold bg-slate-50 border border-slate-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-teal-500 cursor-pointer"
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Audit Scheduled">Audit Scheduled</option>
                        <option value="Proposal Sent">Proposal Sent</option>
                        <option value="Closed Won">Closed Won</option>
                        <option value="Closed Lost">Closed Lost</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Section Shortcuts (1 Col) */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#16A6A3]" />
              Quick Page Editors
            </h3>
            <div className="space-y-2">
              {[
                { id: 'pages-home', title: 'Home Page', desc: 'Hero headline, sliders, metrics, FAQs' },
                { id: 'pages-solutions', title: 'Solutions & Services', desc: '5 Service pillars & 4-stage cycle' },
                { id: 'pages-pricing', title: 'Pricing & Contingency', desc: 'Contingency %, volume discounts' },
                { id: 'pages-about', title: 'About & Leadership', desc: 'Mission, story, leadership team' },
                { id: 'pages-blog', title: 'Blog & Articles', desc: 'Publish dental billing guides' },
                { id: 'seo', title: 'SEO Studio', desc: 'Meta tags, OG tags, SERP preview' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigateTab(item.id)}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-teal-50/60 border border-transparent hover:border-teal-200 transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div>
                    <div className="text-xs font-bold text-slate-800 group-hover:text-[#16A6A3]">
                      {item.title}
                    </div>
                    <div className="text-[11px] text-slate-400">{item.desc}</div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#16A6A3] transition-colors" />
                </button>
              ))}
            </div>
          </div>

          {/* System & Compliance Status */}
          <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-teal-400 mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>System &amp; Sync State</span>
            </div>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-center justify-between">
                <span>Storage Engine:</span>
                <span className="font-mono text-[11px] text-teal-300">LocalStorage Live</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Data Encryption:</span>
                <span className="text-emerald-400 font-semibold">Active (TLS/SSL)</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Public Site Sync:</span>
                <span className="text-emerald-400 font-semibold">Instant Reactive</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
