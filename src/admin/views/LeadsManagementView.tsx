import React, { useState, useMemo } from 'react';
import { useCms } from '../../context/CmsContext';
import { LeadSubmission } from '../../types';
import {
  Users,
  Search,
  Filter,
  Download,
  Plus,
  Trash2,
  Calendar,
  Clock,
  Mail,
  Phone,
  Building2,
  CheckCircle2,
  AlertCircle,
  X,
  Edit3,
  FileSpreadsheet,
  Layers,
  ChevronDown,
} from 'lucide-react';

export const LeadsManagementView: React.FC = () => {
  const { leads, updateLeadStatus, updateLeadNote, deleteLead, addLead } = useCms();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [pmsFilter, setPmsFilter] = useState<string>('all');
  const [selectedLead, setSelectedLead] = useState<LeadSubmission | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [noteEdit, setNoteEdit] = useState('');

  // Form for adding new lead
  const [newDoctorName, setNewDoctorName] = useState('');
  const [newPracticeName, setNewPracticeName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newPms, setNewPms] = useState('Dentrix');
  const [newLocations, setNewLocations] = useState(1);
  const [newProduction, setNewProduction] = useState('$120,000/mo');
  const [newChallenge, setNewChallenge] = useState('Aging AR over 90 days');
  const [newServices, setNewServices] = useState<string[]>(['Insurance Billing & Claim Scrubbing']);

  // Filtered Leads
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchSearch =
        lead.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.practiceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.phone.includes(searchQuery);

      const matchStatus = statusFilter === 'all' || lead.status === statusFilter;
      const matchPms = pmsFilter === 'all' || lead.pmsSoftware.toLowerCase().includes(pmsFilter.toLowerCase());

      return matchSearch && matchStatus && matchPms;
    });
  }, [leads, searchQuery, statusFilter, pmsFilter]);

  // Export CSV
  const handleExportCsv = () => {
    const headers = [
      'ID',
      'Date',
      'Status',
      'Doctor Name',
      'Practice Name',
      'Email',
      'Phone',
      'PMS Software',
      'Locations',
      'Monthly Production',
      'Primary Challenge',
      'Services',
      'Notes',
    ];

    const rows = filteredLeads.map((l) => [
      `"${l.id}"`,
      `"${l.submissionDate}"`,
      `"${l.status}"`,
      `"${l.doctorName}"`,
      `"${l.practiceName}"`,
      `"${l.email}"`,
      `"${l.phone}"`,
      `"${l.pmsSoftware}"`,
      l.locationsCount,
      `"${l.monthlyProduction}"`,
      `"${l.primaryChallenge.replace(/"/g, '""')}"`,
      `"${(l.servicesInterested || []).join(', ')}"`,
      `"${(l.notes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `dentisure_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenDetail = (lead: LeadSubmission) => {
    setSelectedLead(lead);
    setNoteEdit(lead.notes || '');
  };

  const handleSaveNote = () => {
    if (selectedLead) {
      updateLeadNote(selectedLead.id, noteEdit);
      setSelectedLead((prev) => (prev ? { ...prev, notes: noteEdit } : null));
    }
  };

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDoctorName || !newEmail) return;

    addLead({
      doctorName: newDoctorName,
      practiceName: newPracticeName || 'Private Dental Practice',
      email: newEmail,
      phone: newPhone || '(555) 000-0000',
      pmsSoftware: newPms,
      locationsCount: Number(newLocations) || 1,
      monthlyProduction: newProduction,
      primaryChallenge: newChallenge,
      servicesInterested: newServices,
      source: 'Admin Manual Entry',
    });

    // Reset form
    setNewDoctorName('');
    setNewPracticeName('');
    setNewEmail('');
    setNewPhone('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-[#16A6A3]" />
            Inbound Practice Leads &amp; Audit Requests
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage dental practices that submitted the Practice Revenue Audit form or requested clinical billing proposals.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportCsv}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-[#16A6A3] hover:bg-teal-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Manual Lead</span>
          </button>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by doctor, clinic name, email or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all"
          />
        </div>

        {/* Filter by Status */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
          >
            <option value="all">All Statuses ({leads.length})</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Audit Scheduled">Audit Scheduled</option>
            <option value="Proposal Sent">Proposal Sent</option>
            <option value="Closed Won">Closed Won</option>
            <option value="Closed Lost">Closed Lost</option>
          </select>

          <select
            value={pmsFilter}
            onChange={(e) => setPmsFilter(e.target.value)}
            className="text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
          >
            <option value="all">All PMS Software</option>
            <option value="Dentrix">Dentrix</option>
            <option value="Eaglesoft">Eaglesoft</option>
            <option value="Open Dental">Open Dental</option>
            <option value="Curve">Curve Dental</option>
          </select>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Doctor &amp; Practice</th>
                <th className="py-3 px-4">Contact Info</th>
                <th className="py-3 px-4">PMS &amp; Monthly Vol</th>
                <th className="py-3 px-4">Primary Challenge</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Pipeline Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No practice leads match the current filters.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="hover:bg-teal-50/30 transition-colors cursor-pointer group"
                    onClick={() => handleOpenDetail(lead)}
                  >
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 group-hover:text-[#16A6A3] transition-colors">
                        {lead.doctorName}
                      </div>
                      <div className="text-[11px] text-slate-500">{lead.practiceName}</div>
                      {lead.locationsCount > 1 && (
                        <span className="inline-block mt-0.5 px-1.5 py-0.2 rounded bg-slate-100 text-[10px] text-slate-600 font-semibold">
                          {lead.locationsCount} Locations
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="text-slate-800 font-mono text-[11px]">{lead.email}</div>
                      <div className="text-slate-500 text-[11px]">{lead.phone}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-semibold text-[10px]">
                        {lead.pmsSoftware}
                      </span>
                      <div className="text-slate-500 text-[11px] mt-0.5">{lead.monthlyProduction}</div>
                    </td>
                    <td className="py-3.5 px-4 max-w-xs truncate text-slate-600" title={lead.primaryChallenge}>
                      {lead.primaryChallenge}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap text-[11px]">
                      {lead.submissionDate}
                    </td>
                    <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={lead.status}
                        onChange={(e) => updateLeadStatus(lead.id, e.target.value as any)}
                        className={`text-[11px] font-bold rounded-lg px-2.5 py-1 border focus:outline-none focus:ring-1 cursor-pointer ${
                          lead.status === 'New'
                            ? 'bg-amber-50 text-amber-800 border-amber-300 focus:ring-amber-500'
                            : lead.status === 'Audit Scheduled'
                            ? 'bg-blue-50 text-blue-800 border-blue-300 focus:ring-blue-500'
                            : lead.status === 'Proposal Sent'
                            ? 'bg-purple-50 text-purple-800 border-purple-300 focus:ring-purple-500'
                            : lead.status === 'Closed Won'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300 focus:ring-emerald-500'
                            : lead.status === 'Closed Lost'
                            ? 'bg-rose-50 text-rose-800 border-rose-300 focus:ring-rose-500'
                            : 'bg-slate-50 text-slate-700 border-slate-300 focus:ring-slate-500'
                        }`}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Audit Scheduled">Audit Scheduled</option>
                        <option value="Proposal Sent">Proposal Sent</option>
                        <option value="Closed Won">Closed Won</option>
                        <option value="Closed Lost">Closed Lost</option>
                      </select>
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleOpenDetail(lead)}
                        className="px-2.5 py-1 text-slate-600 hover:text-teal-700 hover:bg-slate-100 rounded-lg text-xs font-semibold mr-1 cursor-pointer"
                        title="View Full Profile"
                      >
                        View
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete lead record for ${lead.doctorName}?`)) {
                            deleteLead(lead.id);
                          }
                        }}
                        className="p-1 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Delete Lead"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="bg-[#12304A] text-white px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-teal-300" />
                  {selectedLead.doctorName}
                </h3>
                <p className="text-xs text-teal-200">{selectedLead.practiceName}</p>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto text-xs">
              {/* Status and Date banner */}
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 font-semibold">Pipeline Stage:</span>
                  <select
                    value={selectedLead.status}
                    onChange={(e) => {
                      const newStatus = e.target.value as any;
                      updateLeadStatus(selectedLead.id, newStatus);
                      setSelectedLead({ ...selectedLead, status: newStatus });
                    }}
                    className="font-bold text-xs bg-white border border-slate-300 rounded-lg px-2.5 py-1 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Audit Scheduled">Audit Scheduled</option>
                    <option value="Proposal Sent">Proposal Sent</option>
                    <option value="Closed Won">Closed Won</option>
                    <option value="Closed Lost">Closed Lost</option>
                  </select>
                </div>
                <div className="text-slate-500">
                  Received: <strong className="text-slate-700">{selectedLead.submissionDate}</strong>
                </div>
              </div>

              {/* Practice details grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                  <div className="text-slate-400 text-[11px] mb-1 font-semibold flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-teal-600" /> Email Address
                  </div>
                  <div className="font-bold text-slate-900 text-xs font-mono">{selectedLead.email}</div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                  <div className="text-slate-400 text-[11px] mb-1 font-semibold flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-teal-600" /> Phone Number
                  </div>
                  <div className="font-bold text-slate-900 text-xs">{selectedLead.phone}</div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                  <div className="text-slate-400 text-[11px] mb-1 font-semibold">PMS Software</div>
                  <div className="font-bold text-slate-900 text-xs">{selectedLead.pmsSoftware}</div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                  <div className="text-slate-400 text-[11px] mb-1 font-semibold">Monthly Production / Scale</div>
                  <div className="font-bold text-slate-900 text-xs">
                    {selectedLead.monthlyProduction} ({selectedLead.locationsCount} location{selectedLead.locationsCount > 1 ? 's' : ''})
                  </div>
                </div>
              </div>

              {/* Challenge */}
              <div className="p-3.5 bg-amber-50/50 border border-amber-200/80 rounded-xl">
                <div className="text-amber-800 font-bold mb-1">Primary Revenue Cycle Bottleneck:</div>
                <p className="text-slate-700 leading-relaxed">{selectedLead.primaryChallenge}</p>
              </div>

              {/* Services Interested */}
              <div>
                <div className="text-slate-700 font-bold mb-1.5">Services Interested:</div>
                <div className="flex flex-wrap gap-1.5">
                  {(selectedLead.servicesInterested || []).map((srv, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-teal-50 text-teal-800 border border-teal-200 rounded-lg text-[11px] font-semibold"
                    >
                      {srv}
                    </span>
                  ))}
                </div>
              </div>

              {/* Internal Notes */}
              <div className="space-y-1.5 pt-2 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <label className="text-slate-700 font-bold flex items-center gap-1.5">
                    <Edit3 className="w-3.5 h-3.5 text-teal-600" />
                    Internal Coordinator Notes
                  </label>
                  <button
                    onClick={handleSaveNote}
                    className="px-2.5 py-1 bg-[#12304A] hover:bg-[#16A6A3] text-white rounded-lg text-[11px] font-bold cursor-pointer transition-colors"
                  >
                    Save Notes
                  </button>
                </div>
                <textarea
                  rows={3}
                  value={noteEdit}
                  onChange={(e) => setNoteEdit(e.target.value)}
                  placeholder="Add notes from discovery call, PMS version details, assigned billing lead..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => {
                  if (confirm(`Delete lead record for ${selectedLead.doctorName}?`)) {
                    deleteLead(selectedLead.id);
                    setSelectedLead(null);
                  }
                }}
                className="text-rose-600 hover:text-rose-700 font-bold text-xs flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Lead</span>
              </button>
              <button
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs rounded-xl cursor-pointer"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Manual Lead Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="bg-[#12304A] text-white px-6 py-4 flex items-center justify-between">
              <h3 className="text-sm font-bold flex items-center gap-2">
                <Plus className="w-4 h-4 text-teal-300" />
                Add Practice Lead Manually
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Doctor / Contact Name *</label>
                  <input
                    type="text"
                    required
                    value={newDoctorName}
                    onChange={(e) => setNewDoctorName(e.target.value)}
                    placeholder="Dr. Robert Green, DDS"
                    className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Practice Name</label>
                  <input
                    type="text"
                    value={newPracticeName}
                    onChange={(e) => setNewPracticeName(e.target.value)}
                    placeholder="Green Family Dentistry"
                    className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="rgreen@greendental.com"
                    className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Phone</label>
                  <input
                    type="text"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    placeholder="(555) 234-5678"
                    className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">PMS Software</label>
                  <select
                    value={newPms}
                    onChange={(e) => setNewPms(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
                  >
                    <option value="Dentrix">Dentrix G6/G7/Ascend</option>
                    <option value="Eaglesoft">Eaglesoft</option>
                    <option value="Open Dental">Open Dental</option>
                    <option value="Curve Dental">Curve Dental</option>
                    <option value="Other">Other Cloud PMS</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Monthly Production</label>
                  <input
                    type="text"
                    value={newProduction}
                    onChange={(e) => setNewProduction(e.target.value)}
                    placeholder="$120,000/mo"
                    className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Primary Challenge</label>
                <input
                  type="text"
                  value={newChallenge}
                  onChange={(e) => setNewChallenge(e.target.value)}
                  placeholder="e.g. Uncollected claims over 90 days, staffing shortage"
                  className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#16A6A3] hover:bg-teal-600 text-white rounded-xl font-bold cursor-pointer"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
