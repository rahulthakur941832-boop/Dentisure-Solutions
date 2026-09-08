import React from 'react';
import {
  Building2,
  CheckCircle,
  FileCheck2,
  Users,
  ShieldCheck,
  Stethoscope,
} from 'lucide-react';

interface PracticePhotoShowcaseProps {
  onOpenAuditModal: () => void;
}

export const PracticePhotoShowcase: React.FC<PracticePhotoShowcaseProps> = ({
  onOpenAuditModal,
}) => {
  const practiceScenes = [
    {
      id: 'scene-1',
      title: 'Front Desk Administration',
      subtitle: 'Freeing Staff from Phone Hold Times',
      description:
        'Your front-desk team no longer spends hours on hold with Delta Dental, MetLife, or Cigna. We handle every verification and inquiry in the background.',
      imageUrl:
        'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
      tag: 'Front-Office Freedom',
      icon: <Users className="w-4 h-4 text-[#16A6A3]" />,
    },
    {
      id: 'scene-2',
      title: 'Clinical Operatory & Patient Care',
      subtitle: 'Focus Completely on Chairside Dentistry',
      description:
        'Doctors and hygienists can provide unhurried clinical care knowing patient insurance copays and deductibles are 100% verified 72 hours before the appointment.',
      imageUrl:
        'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80',
      tag: 'Clinical Focus',
      icon: <Stethoscope className="w-4 h-4 text-teal-600" />,
    },
    {
      id: 'scene-3',
      title: 'Radiographs & Narrative Review',
      subtitle: 'Scrubbed to Prevent Coding Denials',
      description:
        'Our dental billing specialists review CDT codes, periodontal charts, and bitewing/panoramic attachments before submission to ensure zero claim rejections.',
      imageUrl:
        'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80',
      tag: 'Accurate Claims',
      icon: <FileCheck2 className="w-4 h-4 text-blue-600" />,
    },
    {
      id: 'scene-4',
      title: 'Practice Management Growth',
      subtitle: 'Predictable Monthly Cash Flow',
      description:
        'Eliminate the sudden cash crunch caused by biller turnover or unpaid 90+ day AR. Review daily reconciled collection reports directly inside your PMS.',
      imageUrl:
        'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
      tag: 'Revenue Certainty',
      icon: <Building2 className="w-4 h-4 text-emerald-600" />,
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#E8F7F6] text-[#12304A] text-xs font-bold uppercase tracking-wider mb-3">
            <Building2 className="w-3.5 h-3.5 text-[#16A6A3]" />
            <span>Real Dental Practice Environment</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#12304A] tracking-tight mb-3">
            How DentiSure Operates Seamlessly Inside Your Practice
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            We work directly inside your existing dental software via secure remote VPN. Your patient charts, clinical notes, and financial ledgers never leave your system.
          </p>
        </div>

        {/* 4 Photo Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {practiceScenes.map((scene) => (
            <div
              key={scene.id}
              className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
            >
              {/* Image Container */}
              <div className="relative h-48 sm:h-52 w-full bg-slate-100 overflow-hidden">
                <img
                  src={scene.imageUrl}
                  alt={scene.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12304A]/60 via-transparent to-transparent"></div>
                <span className="absolute top-3 left-3 bg-[#12304A]/80 backdrop-blur-sm text-teal-300 text-[10px] font-bold px-2 py-1 rounded-md border border-white/10">
                  {scene.tag}
                </span>
              </div>

              {/* Text Container */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    {scene.icon}
                    <h3 className="font-extrabold text-sm sm:text-base text-[#12304A]">
                      {scene.title}
                    </h3>
                  </div>
                  <span className="text-xs font-semibold text-[#16A6A3] block mb-2">
                    {scene.subtitle}
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {scene.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-bold text-slate-700">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Integrated with Your PMS</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Practice Callout Strip */}
        <div className="p-6 bg-[#F8FAFB] rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#16A6A3]" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#12304A]">
                No In-Office Hardware or Server Replacement Required
              </h4>
              <p className="text-xs text-slate-600">
                Compatible with Dentrix G4–G7, Eaglesoft v17+, Open Dental, and cloud systems like Curve and CareStack.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenAuditModal}
            className="px-5 py-2.5 rounded-xl bg-[#12304A] hover:bg-[#16A6A3] text-white text-xs font-bold transition-colors cursor-pointer whitespace-nowrap shadow-xs"
          >
            Check Software Compatibility
          </button>
        </div>
      </div>
    </section>
  );
};
