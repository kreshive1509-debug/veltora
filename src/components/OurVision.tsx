import React from 'react';

export const OurVision: React.FC = () => {
  return (
    <section
      id="vision"
      className="relative py-24 px-6 overflow-hidden bg-[#0A0D2E]"
    >
      {/* Light glow effects */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 rounded-full bg-indigo-500/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Texts Left */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#00F5FF] mb-3 block">
            OUR VISION
          </span>
          <h2 className="text-4xl md:text-[52px] font-black font-space tracking-tight text-white mb-8">
            Building The Future Together
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#00F5FF] to-[#7B2FFF] mb-10 rounded-full" />

          <div className="space-y-6 text-white/80 text-sm md:text-base leading-relaxed">
            <p>
              Our ultimate vision is to cultivate an elite ecosystem of high-performing young developers who learn by doing. We bridge the gap between classroom theory and enterprise software standards, preparing student programmers to solve practical challenges.
            </p>
            <p>
              We believe that every complex business challenge has a neat, elegant digital solution. At Veltora, we inspect each requirement with a fresh perspective, finding the ideal blend of responsiveness, styling perfection, and backend scaling.
            </p>
            <p>
              By forming a highly supportive, community-driven circle of creators, we empower developers, designers, and marketers, ensuring mutual success. Together, we are creating a legacy that transforms standard workspaces into collaborative technology hubs.
            </p>
          </div>
        </div>

        {/* 3D Geometric Shape Right */}
        <div className="lg:col-span-5 flex justify-center items-center relative py-12">
          {/* Circular Orbit Ring */}
          <div className="absolute w-[280px] h-[280px] md:w-[360px] md:h-[360px] rounded-full border border-dashed border-purple-500/25 animate-[spin_50s_linear_infinite] pointer-events-none" />
          <div className="absolute w-[200px] h-[200px] rounded-full border border-double border-cyan-500/20 animate-[spin_30s_linear_infinite_reverse] pointer-events-none" />

          {/* 3D GEM CONTAINER */}
          <div className="relative w-48 h-48 md:w-56 md:h-56 flex items-center justify-center transform-style-3d perspective-1000">
            {/* The Gem Facets using absolute div sheets positioned in 3D */}
            <div className="gem-3d relative w-full h-full transform-style-3d">
              {/* Face 1 */}
              <div className="absolute inset-0 border-[2px] border-purple-500/50 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-[35%] transform rotateX(45deg) rotateY(45deg) shadow-[0_0_30px_rgba(123,47,255,0.3)]" />
              {/* Face 2 */}
              <div className="absolute inset-0 border-[2px] border-cyan-400/50 bg-gradient-to-bl from-cyan-500/10 to-transparent rounded-[35%] transform rotateX(-45deg) rotateY(45deg) shadow-[0_0_30px_rgba(0,245,255,0.3)]" />
              {/* Face 3 */}
              <div className="absolute inset-0 border-[1.5px] border-pink-500/40 bg-gradient-to-br from-pink-500/10 to-transparent rounded-[50%] transform rotateY(90deg) shadow-[0_0_20px_rgba(255,45,120,0.2)]" />
              {/* Face 4 */}
              <div className="absolute inset-0 border-[1px] border-dashed border-white/30 rounded-full transform rotateX(90deg)" />
              
              {/* Core Glowing Orb */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gradient-to-r from-[#7B2FFF] to-[#00F5FF] blur-md shadow-[0_0_40px_#7B2FFF] animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
