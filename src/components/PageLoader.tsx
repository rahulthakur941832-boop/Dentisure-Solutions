import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PageLoaderProps {
  onFinish?: () => void;
  minDuration?: number;
}

export const PageLoader: React.FC<PageLoaderProps> = ({
  onFinish,
  minDuration = 1400,
}) => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    // Smooth progress increment
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        return prev + Math.floor(Math.random() * 20) + 10;
      });
    }, 180);

    // Complete loading after minimum duration
    const timer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setLoading(false);
        if (onFinish) onFinish();
      }, 350);
    }, minDuration);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [minDuration, onFinish]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="dentiSure-white-preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[99999] bg-white flex flex-col items-center justify-center p-6 select-none cursor-default"
          onClick={() => {
            // Optional instant dismiss on click
            setLoading(false);
            if (onFinish) onFinish();
          }}
        >
          {/* Subtle ambient light gradient background */}
          <div className="absolute inset-0 bg-radial from-teal-50/40 via-white to-white pointer-events-none" />

          <div className="relative flex flex-col items-center max-w-sm sm:max-w-md w-full text-center">
            {/* 1. Favicon Tooth Icon with Pulsing Ripple Rings */}
            <div className="relative mb-6">
              {/* Outer Ripple Effect */}
              <motion.div
                animate={{
                  scale: [1, 1.4, 1.7],
                  opacity: [0.35, 0.15, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
                className="absolute -inset-4 rounded-3xl bg-teal-400/25 blur-xs pointer-events-none"
              />

              {/* Second Ripple */}
              <motion.div
                animate={{
                  scale: [1, 1.25, 1.5],
                  opacity: [0.4, 0.2, 0],
                }}
                transition={{
                  duration: 2,
                  delay: 0.4,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
                className="absolute -inset-2 rounded-2xl bg-[#12304A]/15 blur-xs pointer-events-none"
              />

              {/* Floating Favicon Container */}
              <motion.div
                animate={{
                  y: [-3, 3, -3],
                  scale: [1, 1.03, 1],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white shadow-xl shadow-teal-950/5 border border-slate-100 p-2.5 flex items-center justify-center"
              >
                <img
                  src="/DentiSure_Favicon_White_Background.png"
                  alt="DentiSure Icon"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/favicon-white.png';
                  }}
                />
              </motion.div>
            </div>

            {/* 2. Original Logo PNG (Requested by user) */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="mb-6 px-4"
            >
              <img
                src="/logo-transparent.png"
                alt="DentiSure Solutions — Your Certainty in Dental Revenue"
                className="max-h-12 sm:max-h-14 w-auto object-contain mx-auto"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/logo-transparent.svg';
                }}
              />
            </motion.div>

            {/* 3. Sleek Progress Bar */}
            <div className="w-52 sm:w-64 bg-slate-100 h-1.5 rounded-full overflow-hidden relative shadow-inner mb-3">
              <motion.div
                className="h-full bg-gradient-to-r from-[#12304A] via-[#16A6A3] to-teal-400 rounded-full"
                animate={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut', duration: 0.2 }}
              />
            </div>

            {/* 4. Subtitle / Assurance Note */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-2 text-xs font-semibold text-slate-500 tracking-wide"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#16A6A3] animate-ping" />
              <span>Loading practice intelligence...</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
