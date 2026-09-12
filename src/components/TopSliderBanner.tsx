import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useCms } from '../context/CmsContext';
import { NavigationPage } from '../types';
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface TopSliderBannerProps {
  onNavigate: (page: NavigationPage) => void;
  onOpenAuditModal: () => void;
}

export const TopSliderBanner: React.FC<TopSliderBannerProps> = ({
  onNavigate,
  onOpenAuditModal,
}) => {
  const { cmsData } = useCms();
  const sliderConfig = cmsData.topSlider;

  // If globally disabled or not configured
  if (sliderConfig?.enabled === false) {
    return null;
  }

  const activeSlides = (sliderConfig?.slides || [])
    .filter((s) => s.enabled !== false)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  if (activeSlides.length === 0) {
    return null;
  }

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const intervalMs = sliderConfig?.autoplayIntervalMs || 6000;
  const shouldAutoplay = sliderConfig?.autoplay !== false && !isPaused && !isHovered && activeSlides.length > 1;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % activeSlides.length);
  }, [activeSlides.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);
  }, [activeSlides.length]);

  // Autoplay loop
  useEffect(() => {
    if (!shouldAutoplay) {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
      return;
    }

    autoplayTimerRef.current = setInterval(() => {
      nextSlide();
    }, intervalMs);

    return () => {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
    };
  }, [shouldAutoplay, intervalMs, nextSlide]);

  const currentSlide = activeSlides[currentIndex] || activeSlides[0];

  const handleCtaClick = () => {
    if (!currentSlide) return;
    const link = currentSlide.ctaLink;
    if (link === 'contact' || link === 'audit' || currentSlide.ctaText.toLowerCase().includes('audit')) {
      onOpenAuditModal();
      return;
    }
    if (['home', 'about', 'solutions', 'pricing', 'blog', 'contact', 'terms', 'privacy', 'hipaa'].includes(link)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      onNavigate(link as NavigationPage);
      return;
    }
    if (link.startsWith('http://') || link.startsWith('https://')) {
      window.open(link, '_blank', 'noopener,noreferrer');
      return;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    onNavigate('contact');
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      nextSlide();
    } else if (e.key === 'ArrowLeft') {
      prevSlide();
    }
  };

  // Touch swipe handling for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 40) {
      nextSlide();
    } else if (diff < -40) {
      prevSlide();
    }
    setTouchStartX(null);
  };

  return (
    <aside
      id="top-promotional-slider"
      aria-label="Practice Announcement Highlights"
      className="relative w-full bg-gradient-to-r from-[#00101e] via-[#001b31] to-[#042842] text-white border-b border-[#12304a] overflow-hidden transition-colors duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      tabIndex={0}
    >
      {/* Subtle Background Glow Mesh */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(126,245,241,0.3),rgba(255,255,255,0))]" />

      <div className="relative max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-2.5 sm:gap-4">
          
          {/* Left: Active Slide Content */}
          <div className="flex-1 min-w-0 flex items-center gap-3.5 w-full">
            {/* Optional Small Thumbnail (hidden on small mobile) */}
            {currentSlide.image && (
              <div className="hidden sm:block relative w-12 h-12 rounded-lg overflow-hidden border border-slate-700/80 shrink-0 shadow-sm">
                <img
                  src={currentSlide.image}
                  alt={currentSlide.title}
                  width={48}
                  height={48}
                  loading="eager"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            )}

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap mb-0.5">
                {currentSlide.badge && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#12304A] border border-[#7EF5F1]/30 text-[#7EF5F1] font-mono text-[10px] sm:text-[11px] font-semibold tracking-wide">
                    <Sparkles className="w-2.5 h-2.5 text-[#7EF5F1]" />
                    <span>{currentSlide.badge}</span>
                  </span>
                )}
                <span className="text-[10px] text-slate-400 font-mono hidden lg:inline">
                  Slide {currentIndex + 1} of {activeSlides.length}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                <h3 className="text-xs sm:text-sm font-bold text-white tracking-tight truncate">
                  {currentSlide.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-300 line-clamp-1 hidden md:block">
                  {currentSlide.description}
                </p>
              </div>
            </div>
          </div>

          {/* Right: CTA Button and Slide Controls */}
          <div className="flex items-center justify-between sm:justify-end gap-3 w-full md:w-auto shrink-0 pt-1 sm:pt-0 border-t border-slate-800/80 md:border-t-0">
            {/* Action CTA Button */}
            <button
              onClick={handleCtaClick}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#006A68] hover:bg-[#00504E] text-white text-[11px] sm:text-xs font-bold transition-all transform hover:-translate-y-0.5 shadow-xs cursor-pointer focus-visible:ring-2 focus-visible:ring-[#7EF5F1]"
            >
              <span>{currentSlide.ctaText || 'Learn More'}</span>
              <ArrowRight className="w-3 h-3" />
            </button>

            {/* Navigation and Indicators (if > 1 slide) */}
            {activeSlides.length > 1 && (
              <div className="flex items-center gap-1.5">
                {/* Previous Button */}
                <button
                  onClick={prevSlide}
                  aria-label="Previous slide"
                  className="p-1 rounded-md text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer focus-visible:ring-1 focus-visible:ring-teal-400"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>

                {/* Dot Indicators */}
                <div className="flex items-center gap-1 px-1">
                  {activeSlides.map((slide, idx) => (
                    <button
                      key={slide.id}
                      onClick={() => setCurrentIndex(idx)}
                      aria-label={`Go to slide ${idx + 1}: ${slide.title}`}
                      className={`transition-all rounded-full cursor-pointer ${
                        idx === currentIndex
                          ? 'w-4 h-1.5 bg-[#7EF5F1]'
                          : 'w-1.5 h-1.5 bg-slate-600 hover:bg-slate-400'
                      }`}
                    />
                  ))}
                </div>

                {/* Next Button */}
                <button
                  onClick={nextSlide}
                  aria-label="Next slide"
                  className="p-1 rounded-md text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer focus-visible:ring-1 focus-visible:ring-teal-400"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                {/* Accessible Pause / Play Toggle */}
                <button
                  onClick={() => setIsPaused(!isPaused)}
                  aria-label={isPaused ? 'Resume slide rotation' : 'Pause slide rotation'}
                  className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer ml-0.5 focus-visible:ring-1 focus-visible:ring-teal-400"
                  title={isPaused ? 'Resume auto-sliding' : 'Pause auto-sliding'}
                >
                  {isPaused ? (
                    <Play className="w-3 h-3 text-[#7EF5F1]" />
                  ) : (
                    <Pause className="w-3 h-3" />
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};
