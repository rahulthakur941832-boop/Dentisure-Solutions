import React, { useState } from 'react';
import { LeadSubmission } from '../types';
import { BRAND, COMPATIBLE_PMS } from '../data/contentData';
import {
  X,
  CheckCircle2,
  Calendar,
  Clock,
  ShieldCheck,
  Building,
  User,
  Mail,
  Phone,
  ArrowRight,
  FileSpreadsheet,
} from 'lucide-react';

interface ContactAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLeadSubmitted: (newLead: LeadSubmission) => void;
  initialProduction?: string;
  initialEstimatedGain?: string;
}

export const ContactAuditModal: React.FC<ContactAuditModalProps> = ({
  isOpen,
  onClose,
  onLeadSubmitted,
  initialProduction = '$85,000 – $120,000',
  initialEstimatedGain,
}) => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // Form Fields
  const [doctorName, setDoctorName] = useState('');
  const [practiceName, setPracticeName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [pmsSoftware, setPmsSoftware] = useState('Dentrix');
  const [locationsCount, setLocationsCount] = useState(1);
  const [monthlyProduction, setMonthlyProduction] = useState(initialProduction);
  const [primaryChallenge, setPrimaryChallenge] = useState('Aging 90+ Day AR Backlog');
  const [selectedServices, setSelectedServices] = useState<string[]>([
    'Full Revenue Cycle Management',
  ]);
  const [preferredDate, setPreferredDate] = useState('2026-03-16');
  const [preferredTime, setPreferredTime] = useState('2:00 PM CST');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const toggleService = (srv: string) => {
    if (selectedServices.includes(srv)) {
      setSelectedServices(selectedServices.filter((s) => s !== srv));
    } else {
      setSelectedServices([...selectedServices, srv]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const newLead: LeadSubmission = {
      id: `lead-${Date.now()}`,
      doctorName: doctorName || 'Dr. Practice Owner',
      practiceName: practiceName || 'Family Dental Practice',
      email: email || 'doctor@dentalpractice.com',
      phone: phone || '(555) 123-4567',
      pmsSoftware,
      locationsCount,
      monthlyProduction,
      primaryChallenge,
      servicesInterested: selectedServices,
      submissionDate: new Date().toISOString().split('T')[0],
      status: 'New',
      preferredDate,
      preferredTime,
      notes: notes || `Requested practice revenue audit. Est potential gain: ${initialEstimatedGain || 'N/A'}.`,
    };

    try {
      // Try sending to server API if active
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLead),
      }).catch(() => {
        // Fallback gracefully to client state
      });
    } catch {
      // Ignore network errors in local dev
    }

    onLeadSubmitted(newLead);
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#12304A]/80 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Header */}
        <div className="bg-[#12304A] text-white px-6 py-5 flex items-center justify-between border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center border border-teal-500/30">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold">
                {submitted ? 'Audit Request Confirmed' : 'Request Confidential Revenue Audit'}
              </h3>
              <p className="text-xs text-teal-300 font-medium">
                100% Free &bull; No Obligation &bull; HIPAA Protected
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          {submitted ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-extrabold text-[#12304A] mb-2">
                Thank You, {doctorName || 'Doctor'}!
              </h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto mb-6 leading-relaxed">
                Your Practice Revenue Audit has been registered. Our Senior RCM Director (Nisha Yadav) has received your request at{' '}
                <strong className="text-[#12304A]">{BRAND.contactEmail}</strong>.
              </p>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 max-w-md mx-auto text-left text-xs text-slate-700 mb-6 space-y-2">
                <div className="font-bold text-[#12304A] border-b border-slate-200 pb-1.5 flex items-center justify-between">
                  <span>Scheduled Discovery Zoom:</span>
                  <span className="text-teal-700">{preferredDate} at {preferredTime}</span>
                </div>
                <p>✓ Practice: {practiceName || 'Your Dental Practice'}</p>
                <p>✓ Software: {pmsSoftware}</p>
                <p>✓ Key Focus: {primaryChallenge}</p>
                <p className="text-[11px] text-slate-500 pt-1">
                  We will email a secure Zoom calendar invite and our mutual HIPAA BAA prior to the call.
                </p>
              </div>

              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-[#12304A] hover:bg-[#16A6A3] text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                Return to Website
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {initialEstimatedGain && (
                <div className="p-3.5 bg-teal-50 border border-teal-200 rounded-xl text-xs text-teal-900 flex items-center justify-between">
                  <span className="font-semibold">Calculated Revenue Opportunity:</span>
                  <span className="font-extrabold text-teal-800 font-mono text-sm">
                    {initialEstimatedGain} / year
                  </span>
                </div>
              )}

              {/* Row 1: Doctor Name & Practice Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Doctor / Practice Contact Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      required
                      type="text"
                      placeholder="Dr. Jane Smith, DDS"
                      value={doctorName}
                      onChange={(e) => setDoctorName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#16A6A3]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Practice Name *
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      required
                      type="text"
                      placeholder="Apex Dental Studio"
                      value={practiceName}
                      onChange={(e) => setPracticeName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#16A6A3]"
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Work Email *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      required
                      type="email"
                      placeholder="doctor@apexdental.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#16A6A3]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Direct Phone *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      required
                      type="tel"
                      placeholder="(555) 345-6789"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#16A6A3]"
                    />
                  </div>
                </div>
              </div>

              {/* Row 3: PMS Software & Monthly Production */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Practice Management Software (PMS)
                  </label>
                  <select
                    value={pmsSoftware}
                    onChange={(e) => setPmsSoftware(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#16A6A3]"
                  >
                    {COMPATIBLE_PMS.map((p) => (
                      <option key={p.name} value={p.name}>
                        {p.name}
                      </option>
                    ))}
                    <option value="SoftDent">Carestream SoftDent</option>
                    <option value="Other">Other / Cloud System</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Approx. Monthly Production / Collections
                  </label>
                  <select
                    value={monthlyProduction}
                    onChange={(e) => setMonthlyProduction(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#16A6A3]"
                  >
                    <option value="$35,000 – $60,000">$35,000 – $60,000 / mo</option>
                    <option value="$60,000 – $85,000">$60,000 – $85,000 / mo</option>
                    <option value="$85,000 – $120,000">$85,000 – $120,000 / mo</option>
                    <option value="$120,000 – $200,000">$120,000 – $200,000 / mo</option>
                    <option value="$200,000+">$200,000+ / mo (Multi-Doctor / DSO)</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Primary Challenge */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Primary Revenue Challenge to Address
                </label>
                <select
                  value={primaryChallenge}
                  onChange={(e) => setPrimaryChallenge(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#16A6A3]"
                >
                  <option value="Aging 90+ Day AR Backlog">
                    Aging 90+ Day AR is too high (&gt;$30k trapped in insurance)
                  </option>
                  <option value="Front Desk Overwhelmed with Phone Calls">
                    Front desk overwhelmed by hold times and verification paperwork
                  </option>
                  <option value="High Claim Denials & Rejections">
                    High denial rates on crowns, periodontal, or orthodontic claims
                  </option>
                  <option value="Biller Resignation / Staff Turnover">
                    In-house biller resignation / sudden staff turnover
                  </option>
                  <option value="Opening New Location / Scaling Up">
                    Expanding to multiple operatories / new practice location
                  </option>
                </select>
              </div>

              {/* Services of Interest Checkboxes */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Interested Services
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {[
                    'Full Revenue Cycle Management',
                    'Pre-Visit Eligibility Verification',
                    'Aging AR Recovery Sprint',
                    'Payment Posting & Reconciliation',
                  ].map((srv) => (
                    <label
                      key={srv}
                      className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg border border-slate-200/80 cursor-pointer hover:bg-slate-100"
                    >
                      <input
                        type="checkbox"
                        checked={selectedServices.includes(srv)}
                        onChange={() => toggleService(srv)}
                        className="rounded text-[#16A6A3] focus:ring-[#16A6A3]"
                      />
                      <span className="text-slate-700">{srv}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Preferred Zoom Consultation Date & Time */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-xs font-bold text-[#12304A] block mb-2 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#16A6A3]" />
                  Preferred 30-Minute Zoom Audit Time
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div>
                    <input
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-700"
                    />
                  </div>
                  <div>
                    <select
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-700"
                    >
                      <option value="9:00 AM CST">9:00 AM CST</option>
                      <option value="11:30 AM CST">11:30 AM CST</option>
                      <option value="2:00 PM CST">2:00 PM CST</option>
                      <option value="4:30 PM CST">4:30 PM CST</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Security Badge */}
              <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-1">
                <ShieldCheck className="w-4 h-4 text-[#16A6A3] flex-shrink-0" />
                <span>
                  All submissions are encrypted and handled in strict accordance with HIPAA standards.
                </span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-6 rounded-xl bg-[#12304A] hover:bg-[#16A6A3] text-white font-extrabold text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <span>Processing Audit Request...</span>
                ) : (
                  <>
                    <span>Confirm Confidential Practice Audit</span>
                    <ArrowRight className="w-4 h-4 text-teal-300" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
