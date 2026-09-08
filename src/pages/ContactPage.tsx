import React, { useState } from 'react';
import { useCms } from '../context/CmsContext';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Send,
  Lock,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { cmsData, addLead } = useCms();
  const [formData, setFormData] = useState({
    doctorName: '',
    practiceName: '',
    email: '',
    phone: '',
    pmsSoftware: 'Dentrix',
    monthlyProduction: '$75k - $125k',
    primaryChallenge: '90+ Day Aging AR & Denials',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.doctorName || !formData.email || !formData.phone) return;

    addLead({
      doctorName: formData.doctorName,
      practiceName: formData.practiceName,
      email: formData.email,
      phone: formData.phone,
      pmsSoftware: formData.pmsSoftware,
      locationsCount: 1,
      monthlyProduction: formData.monthlyProduction,
      primaryChallenge: formData.primaryChallenge,
      servicesInterested: ['Comprehensive Dental Billing'],
      source: 'Contact Page Form',
      notes: formData.notes,
    });

    setSubmitted(true);
  };

  return (
    <div className="bg-[#F8FAFB] text-[#12304A]">
      {/* 1. Hero */}
      <section className="bg-white border-b border-slate-200 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#E8F7F6] text-[#12304A] text-xs font-bold uppercase tracking-wider mb-4">
            <Phone className="w-3.5 h-3.5 text-[#16A6A3]" />
            <span>Direct Practice Inquiries</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#12304A] tracking-tight mb-6">
            Get in Touch with Our Dental Billing &amp; RCM Team
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Whether you need an immediate Aging AR recovery sprint, pre-visit verification relief, or full revenue cycle management, our senior RCM directors are ready to assist.
          </p>
        </div>
      </section>

      {/* 2. Contact Details & Interactive Form */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Contact Channels (Left Column) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Channel 1: Direct Phone */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-[#16A6A3] mb-4">
                  <Phone className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-base text-[#12304A] mb-1">
                  Call Our Practice Advisory Desk
                </h3>
                <p className="text-xs text-slate-600 mb-3">
                  Speak directly with an experienced dental RCM coordinator:
                </p>
                <a
                  href={`tel:${cmsData.brand.phone.replace(/[^0-9]/g, '')}`}
                  className="text-lg font-extrabold text-[#12304A] hover:text-[#16A6A3] transition-colors block"
                >
                  {cmsData.brand.phone}
                </a>
              </div>

              {/* Channel 2: Email */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mb-4">
                  <Mail className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-base text-[#12304A] mb-1">
                  Email Practice Inquiries
                </h3>
                <p className="text-xs text-slate-600 mb-3">
                  Send RFP requests, fee schedule questions, or credentialing inquiries:
                </p>
                <a
                  href={`mailto:${cmsData.brand.contactEmail}`}
                  className="text-sm font-extrabold text-[#16A6A3] hover:underline block"
                >
                  {cmsData.brand.contactEmail}
                </a>
              </div>

              {/* Channel 3: Office & Hours */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 mb-4">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-base text-[#12304A] mb-1">
                  Business Setup &amp; Address
                </h3>
                <div className="space-y-2.5 text-xs text-slate-600 mt-2">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-800 block">Registered US Business Address:</span>
                      <span>{cmsData.brand.usBusinessAddress || cmsData.brand.address}</span>
                    </div>
                  </div>
                  {cmsData.brand.mailingAddress && (
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-slate-800 block">Mailing Address:</span>
                        <span>{cmsData.brand.mailingAddress}</span>
                      </div>
                    </div>
                  )}
                  <div className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-800 block">Business Hours:</span>
                      <span>{cmsData.brand.hours}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{cmsData.brand.businessSetupType || 'US Registered Business Entity — Nationwide Remote Dental RCM'}</span>
                  </div>
                </div>
              </div>

              {/* HIPAA Security Box */}
              <div className="bg-[#12304A] text-white p-6 rounded-2xl border border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                  <Lock className="w-4 h-4 text-teal-300" />
                  <span className="font-bold text-xs uppercase tracking-wider text-teal-300">
                    Confidentiality Guarantee
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  All communications and practice data are strictly protected under HIPAA regulations. A formal Business Associate Agreement (BAA) is signed prior to evaluating your practice software or accounts.
                </p>
              </div>
            </div>

            {/* Form (Right Column) */}
            <div className="lg:col-span-7">
              <div className="bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-xs">
                {submitted ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-extrabold text-[#12304A]">
                      Inquiry Received Successfully!
                    </h3>
                    <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                      Thank you for contacting DentiSure Solutions. One of our senior dental billing architects will review your practice information and reach out within 2 to 4 business hours.
                    </p>
                    <div className="pt-4">
                      <button
                        onClick={() => setSubmitted(false)}
                        className="px-5 py-2.5 bg-[#12304A] text-white text-xs font-bold rounded-xl cursor-pointer"
                      >
                        Submit Another Inquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <h3 className="text-xl font-extrabold text-[#12304A] mb-1">
                        Schedule a Free Practice Revenue Audit
                      </h3>
                      <p className="text-xs text-slate-600 mb-6">
                        Complete the form below to receive a zero-obligation review of your aging AR and insurance claim recovery potential.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#12304A] mb-1.5">
                          Doctor or Manager Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.doctorName}
                          onChange={(e) =>
                            setFormData({ ...formData, doctorName: e.target.value })
                          }
                          placeholder="Dr. Jane Smith"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#16A6A3]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#12304A] mb-1.5">
                          Dental Practice Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.practiceName}
                          onChange={(e) =>
                            setFormData({ ...formData, practiceName: e.target.value })
                          }
                          placeholder="Austin Smile Center"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#16A6A3]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#12304A] mb-1.5">
                          Practice Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          placeholder="office@austinsmiles.com"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#16A6A3]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#12304A] mb-1.5">
                          Direct Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          placeholder="(512) 555-0199"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#16A6A3]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#12304A] mb-1.5">
                          Practice Management Software
                        </label>
                        <select
                          value={formData.pmsSoftware}
                          onChange={(e) =>
                            setFormData({ ...formData, pmsSoftware: e.target.value })
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#16A6A3] bg-white"
                        >
                          <option value="Dentrix">Dentrix (G4–G7)</option>
                          <option value="Eaglesoft">Eaglesoft (Patterson)</option>
                          <option value="Open Dental">Open Dental</option>
                          <option value="Curve Dental">Curve Dental</option>
                          <option value="CareStack">CareStack</option>
                          <option value="Denticon">Denticon</option>
                          <option value="Other">Other Dental Software</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#12304A] mb-1.5">
                          Estimated Monthly Production
                        </label>
                        <select
                          value={formData.monthlyProduction}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              monthlyProduction: e.target.value,
                            })
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#16A6A3] bg-white"
                        >
                          <option value="Under $50k">Under $50,000 / mo</option>
                          <option value="$50k - $80k">$50,000 – $80,000 / mo</option>
                          <option value="$80k - $125k">$80,000 – $125,000 / mo</option>
                          <option value="$125k - $200k">$125,000 – $200,000 / mo</option>
                          <option value="$200k+">$200,000+ / mo (Multi-doc / Group)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#12304A] mb-1.5">
                        Primary Billing Challenge
                      </label>
                      <select
                        value={formData.primaryChallenge}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            primaryChallenge: e.target.value,
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#16A6A3] bg-white"
                      >
                        <option value="90+ Day Aging AR & Denials">
                          Aging AR over 90 Days &amp; Frequent Denials
                        </option>
                        <option value="Full RCM Outsource">
                          Full Revenue Cycle Outsourcing (Replace / Augment Biller)
                        </option>
                        <option value="Insurance Verification Delays">
                          Front Desk Overwhelmed with Insurance Verification Calls
                        </option>
                        <option value="Biller Turnover">
                          Recent Biller Departure / Practice Growth
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#12304A] mb-1.5">
                        Specific Questions or Additional Notes (Optional)
                      </label>
                      <textarea
                        rows={3}
                        value={formData.notes}
                        onChange={(e) =>
                          setFormData({ ...formData, notes: e.target.value })
                        }
                        placeholder="Tell us about your top carrier issues (e.g. Delta Dental delays, MetLife attachments, timely filing)..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#16A6A3]"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 px-6 bg-[#12304A] hover:bg-[#16A6A3] text-white font-bold rounded-xl text-xs sm:text-sm transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                    >
                      <Send className="w-4 h-4 text-teal-300" />
                      <span>Submit Practice Audit Request</span>
                    </button>
                    <p className="text-[10px] text-slate-500 text-center">
                      We respect your privacy. No spam. BAA available upon request.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
