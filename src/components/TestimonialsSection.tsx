import React from 'react';
import { useCms } from '../context/CmsContext';
import { Star, CheckCircle2, Quote, ShieldCheck } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const { cmsData } = useCms();
  const testimonials = cmsData.testimonials && cmsData.testimonials.length > 0 ? cmsData.testimonials : [];

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F7F6] text-[#12304A] text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-[#16A6A3]" />
            <span>Documented Practice Transformations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#12304A] tracking-tight mb-4">
            Trusted by Solo Dentists, Group Practices &amp; DSOs
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Real outcomes from dental practice owners who replaced billing chaos and insurance phone queues with DentiSure&apos;s precision system.
          </p>
        </div>

        {/* 3 Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-[#F8FAFB] rounded-3xl p-7 sm:p-8 border border-slate-200/90 flex flex-col justify-between hover:border-[#16A6A3]/60 transition-all hover:shadow-md"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                  <span className="text-xs font-bold text-slate-400 ml-2">5.0</span>
                </div>

                {/* Quote Body */}
                <div className="relative mb-6">
                  <Quote className="w-8 h-8 text-[#16A6A3]/20 absolute -top-2 -left-2" />
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed relative z-10 italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
              </div>

              <div>
                {/* Result Highlight Badge */}
                <div className="py-2 px-3 bg-emerald-50 border border-emerald-200/80 rounded-xl text-xs font-bold text-emerald-800 flex items-center gap-2 mb-6">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{t.metricsResult}</span>
                </div>

                {/* Doctor Profile */}
                <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
                  <img
                    src={t.image}
                    alt={t.doctorName}
                    className="w-11 h-11 rounded-full object-cover border border-slate-200"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="text-sm font-extrabold text-[#12304A]">
                      {t.doctorName}
                    </h4>
                    <p className="text-xs text-slate-500">
                      {t.practiceName} &bull; {t.location}
                    </p>
                    <span className="text-[10px] font-bold text-[#16A6A3] uppercase tracking-wider">
                      PMS: {t.pms}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
