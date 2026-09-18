"use client";

import React from "react";

const GradientBlobCard: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="group relative w-[240px] h-[300px] rounded-2xl flex flex-col items-center justify-center
                      shadow-[0_10px_30px_rgba(0,0,0,0.15)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)]
                      p-[3.5px] bg-[#0c0e14] overflow-hidden transition-all duration-300">

        {/* GPU-Accelerated 360° Circulating Border Beam (Active on Hover - 4px Thick Smooth Track) */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 card-border-mask-track"
          aria-hidden="true"
        >
          <div
            className="absolute animate-border-beam"
            style={{
              width: '320px',
              height: '320px',
              offsetPath: 'rect(0 auto auto 0 round 16px)',
              offsetAnchor: '50% 50%',
              background: 'radial-gradient(circle, #ffffff 0%, #ec4899 30%, #ef4444 60%, transparent 75%)',
            }}
          />
          <div
            className="absolute animate-border-beam"
            style={{
              width: '320px',
              height: '320px',
              offsetPath: 'rect(0 auto auto 0 round 16px)',
              offsetAnchor: '50% 50%',
              animationDelay: '-2.5s',
              background: 'radial-gradient(circle, #ffffff 0%, #ec4899 30%, #ef4444 60%, transparent 75%)',
            }}
          />
        </div>

        {/* Static Base Border */}
        <div className="absolute inset-0 rounded-2xl border border-pink-500/30 pointer-events-none z-0" aria-hidden="true" />

        {/* Inner Glassy Surface (100% clean body, zero body glow) */}
        <div className="relative z-10 w-full h-full rounded-[12.5px] bg-white/95 dark:bg-black/90 backdrop-blur-[24px] border border-black/[0.06] dark:border-white/[0.08] p-6 flex flex-col items-center justify-center text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-pink-500 mb-2">Interactive Card</span>
          <h3 className="text-xl font-bold text-neutral-900 dark:text-white">Hover Effect</h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">Smooth 360° circulating border beam with increased thickness.</p>
        </div>
      </div>
    </div>
  );
};

export default GradientBlobCard;
