import React from 'react';
import { useCms } from '../../context/CmsContext';
import { CheckCircle2, ShieldCheck, Zap, Compass, Code, Users } from 'lucide-react';

export const About: React.FC = () => {
  const { siteSettings } = useCms();

  const values = [
    {
      title: 'Architectural Discipline',
      desc: 'We write strict, maintainable TypeScript and clean schemas that scale seamlessly over years.',
      icon: Code,
    },
    {
      title: 'Light Luxury Design Systems',
      desc: 'Every user journey is thoughtfully crafted with refined typography, micro-interactions, and zero AI slop.',
      icon: ShieldCheck,
    },
    {
      title: 'Speed & Pragmatic Delivery',
      desc: 'Agile sprints that transform validated concepts into live, tested deployments in weeks, not quarters.',
      icon: Zap,
    },
  ];

  return (
    <section id="about" className="py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-semibold text-[#926E28] tracking-wider uppercase mb-3 block">
            About Veltora IT Solutions
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#191C1E] leading-tight">
            An Emerging Tech Company Powered by Vision & Technical Precision.
          </h2>
        </div>

        {/* Asymmetrical Bento Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Story Card */}
          <div className="lg:col-span-7 bg-[#FFFFFF] rounded-2xl border border-[#E6DECE] p-8 sm:p-10 shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="font-display text-2xl font-bold text-[#191C1E] mb-4">
                Student-Founded. Production-Proven.
              </h3>
              <p className="text-[#4A4E54] text-base sm:text-lg leading-relaxed mb-6 font-normal">
                Veltora began with a simple yet bold ambition: prove that a student-led engineering collective can match and exceed traditional technology consultancies in product execution, code cleanliness, and modern user experience.
              </p>
              <p className="text-[#656A72] text-sm sm:text-base leading-relaxed mb-8">
                Today, we collaborate with growing businesses, founders, and academic institutions to engineer bespoke web platforms, workflow automations, and student-powered training initiatives under our defining promise: <strong className="text-[#191C1E] font-medium">"{siteSettings.tagline}"</strong>.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-[#F0E8D9]">
              <div>
                <span className="text-xs font-semibold text-[#926E28] uppercase tracking-wider block mb-1">Our Vision</span>
                <p className="text-xs text-[#52575E] leading-normal">
                  To become the gold-standard student technology enterprise globally, fostering high-impact digital products and future tech leaders.
                </p>
              </div>
              <div>
                <span className="text-xs font-semibold text-[#926E28] uppercase tracking-wider block mb-1">Our Philosophy</span>
                <p className="text-xs text-[#52575E] leading-normal">
                  Zero artificial fluff. Strict type safety. Craftsmanship in every pixel and database transaction.
                </p>
              </div>
            </div>
          </div>

          {/* Core Pillars Column */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#FFFFFF]/90 hover:bg-[#FFFFFF] border border-[#E6DECE] hover:border-[#C59A4E]/40 rounded-2xl p-6 transition-all duration-200 shadow-xs flex-1 flex flex-col justify-center"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#FAF6EE] border border-[#E8DFC9] flex items-center justify-center text-[#926E28] mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-display text-base font-bold text-[#191C1E] mb-1.5">
                    {val.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#5C6169] leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
