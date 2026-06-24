import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Fill the progress bar over 1200ms
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1.25; // standard increment
      });
    }, 15);

    let finishTimeout: number;

    // Complete loader page after 1500ms
    const completeTimeout = setTimeout(() => {
      setIsFadingOut(true);
      finishTimeout = window.setTimeout(() => {
        onComplete();
      }, 300); // fade out duration
    }, 1500);

    return () => {
      clearInterval(interval);
      clearTimeout(completeTimeout);
      if (finishTimeout) {
        clearTimeout(finishTimeout);
      }
    };
  }, [onComplete]);

  return (
    <div
      id="preloader-overlay"
      className={`fixed inset-0 z-50 bg-[#05071A] flex flex-col justify-center items-center transition-all duration-300 ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      <div className="flex flex-col items-center max-w-sm w-full px-8 text-center">
        {/* Animated branding logo */}
        <div id="preloader-logo" className="flex flex-col select-none mb-8 animate-pulse text-center">
          <span className="text-4xl md:text-5xl font-black font-space tracking-wider bg-gradient-to-r from-[#7B2FFF] via-[#A855F7] to-[#00F5FF] bg-clip-text text-transparent">
            VELTORA
          </span>
          <span className="text-[10px] tracking-[0.25em] text-white/50 -mt-1 font-bold">
            IT SOLUTIONS
          </span>
        </div>

        {/* Loading Progress Frame */}
        <div id="preloader-progress-frame" className="w-full h-[3px] bg-white/5 rounded-full overflow-hidden mb-3 relative">
          <div
            id="preloader-progress-fill"
            className="h-full bg-gradient-to-r from-[#7B2FFF] to-[#00F5FF] rounded-full transition-all duration-75 ease-out shadow-[0_0_15px_#7B2FFF]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Footer text */}
        <span className="text-[9px] font-bold font-space uppercase tracking-[0.15em] text-[#00F5FF]/70">
          Innovating Dreams
        </span>
      </div>
    </div>
  );
};
