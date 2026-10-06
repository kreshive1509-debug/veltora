import React from 'react';
import { Sparkles, Shield, Cpu, Clock, Rocket, Award } from 'lucide-react';

export const WhyVeltora: React.FC = () => {
  const points = [
    {
      index: '01',
      title: 'Relentless Student Ingenuity',
      desc: 'We are unburdened by legacy agency bloat. We build with modern tools, speed, and hunger to deliver exceptional work.',
    },
    {
      index: '02',
      title: 'Bespoke Engineering, No Cookie-Cutters',
      desc: 'Every system is engineered from clean architecture tailored to your business model, never generic drag-and-drop templates.',
    },
    {
      index: '03',
      title: 'Full CMS Autonomy',
      desc: 'You maintain 100% control over all your site copy, media, team, campaigns, and enquiries with our dynamic portal.',
    },
    {
      index: '04',
      title: 'Pragmatic Cost-to-Performance Ratio',
      desc: 'World-class engineering execution without the exorbitant retainers of traditional legacy consultancies.',
    },
  ];

  return (
    <section className="py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-semibold text-[#926E28] tracking-wider uppercase mb-3 block">
            The Veltora Advantage
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#191C1E]">
            Why Modern Organizations Choose Veltora.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {points.map((pt, idx) => (
            <div
              key={idx}
              className="bg-[#FFFFFF] border border-[#E6DECE] rounded-2xl p-7 hover:border-[#C59A4E]/50 transition-all duration-300 shadow-xs flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-xs font-bold text-[#C59A4E] block mb-4">
                  {pt.index}.
                </span>
                <h3 className="font-display text-lg font-bold text-[#191C1E] mb-2.5">
                  {pt.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#5C6169] leading-relaxed">
                  {pt.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
