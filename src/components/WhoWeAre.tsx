import React, { useEffect, useState, useRef } from 'react';

interface StatCounterProps {
  end: number;
  suffix?: string;
  duration?: number;
}

const StatCounter: React.FC<StatCounterProps> = ({ end, suffix = '', duration = 1500 }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement | null>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    
    let start = 0;
    const increment = end / (duration / 16); // ~60fps
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [hasStarted, end, duration]);

  return (
    <div ref={elementRef} className="font-space text-3xl md:text-5xl font-black bg-gradient-to-r from-[#00F5FF] via-[#7B2FFF] to-[#FF2D78] bg-clip-text text-transparent">
      {count}
      {suffix}
    </div>
  );
};

export const WhoWeAre: React.FC = () => {
  return (
    <section
      id="about"
      className="relative py-24 px-6 overflow-hidden bg-gradient-to-b from-[#05071A] to-[#0A0D2E]"
    >
      {/* Background decoration blur */}
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-purple-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 rounded-full bg-cyan-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#7B2FFF] mb-3 block">WHO WE ARE</span>
          <h2 className="text-4xl md:text-[52px] font-black font-space tracking-tight text-white mb-6">
            Pioneering The Student Tech Frontier
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#7B2FFF] to-[#00F5FF] mx-auto rounded-full" />
        </div>

        {/* 2x2 Interactive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-20">
          
          {/* Card 1 */}
          <div
            id="spin-card-1"
            className="spin-card-1 spin-card-pause cursor-pointer interactive-card hover:scale-[1.03] hover:shadow-[0_20px_50px_rgba(123,47,255,0.25)] bg-white/[0.04] backdrop-blur-[20px] border rounded-[24px] p-8 md:p-10 transition-all duration-300 shimmer-effect glass card-shadow"
          >
            <div className="text-5xl mb-6">🚀</div>
            <h3 className="text-2xl font-bold font-space bg-gradient-to-r from-white to-[#00F5FF] bg-clip-text text-transparent mb-4">
              Our Story
            </h3>
            <p className="text-white/80 text-sm md:text-base leading-relaxed">
              Veltora IT Solutions is a student-led technology and freelancing initiative built with a vision to transform ideas into meaningful digital experiences. Formerly known as <span className="text-[#FF2D78] font-bold">Jugaad Developer</span>, we evolved into Veltora with a stronger identity and bigger ambitions.
            </p>
          </div>

          {/* Card 2 */}
          <div
            id="spin-card-2"
            className="spin-card-2 spin-card-pause cursor-pointer interactive-card hover:scale-[1.03] hover:shadow-[0_20px_50px_rgba(123,47,255,0.25)] bg-white/[0.04] backdrop-blur-[20px] border rounded-[24px] p-8 md:p-10 transition-all duration-300 shimmer-effect glass card-shadow"
          >
            <div className="text-5xl mb-6">💡</div>
            <h3 className="text-2xl font-bold font-space bg-gradient-to-r from-white to-[#FF2D78] bg-clip-text text-transparent mb-4">
              Our Belief
            </h3>
            <p className="text-white/80 text-sm md:text-base leading-relaxed">
              We believe that innovation is not limited by age, resources, or background — it is driven by passion, learning, and the courage to create something impactful. Every small workaround has the potential to develop into an enterprise system.
            </p>
          </div>

          {/* Card 3 */}
          <div
            id="spin-card-3"
            className="spin-card-3 spin-card-pause cursor-pointer interactive-card hover:scale-[1.03] hover:shadow-[0_20px_50px_rgba(0,245,255,0.25)] bg-white/[0.04] backdrop-blur-[20px] border rounded-[24px] p-8 md:p-10 transition-all duration-300 shimmer-effect glass card-shadow"
          >
            <div className="text-5xl mb-6">👥</div>
            <h3 className="text-2xl font-bold font-space bg-gradient-to-r from-white to-[#7B2FFF] bg-clip-text text-transparent mb-4">
              Our Team
            </h3>
            <p className="text-white/80 text-sm md:text-base leading-relaxed">
              Founded and initiated by passionate graduation students, Veltora brings together aspiring developers, designers, freelancers, and technology enthusiasts who want to work on real-world projects and gain practical experience.
            </p>
          </div>

          {/* Card 4 */}
          <div
            id="spin-card-4"
            className="spin-card-4 spin-card-pause cursor-pointer interactive-card hover:scale-[1.03] hover:shadow-[0_20px_50px_rgba(123,47,255,0.25)] bg-white/[0.04] backdrop-blur-[20px] border rounded-[24px] p-8 md:p-10 transition-all duration-300 shimmer-effect glass card-shadow"
          >
            <div className="text-5xl mb-6">🌐</div>
            <h3 className="text-2xl font-bold font-space bg-gradient-to-r from-white to-[#A855F7] bg-clip-text text-transparent mb-4">
              Our Purpose
            </h3>
            <p className="text-white/80 text-sm md:text-base leading-relaxed">
              At Veltora, we are not just building websites — we are building opportunities, communities, experiences, and a future where learning and innovation go hand in hand. Unleashing youth creativity to deliver corporate elegance.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div
          id="stat-counters"
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 py-10 px-8 rounded-3xl bg-black/40 border border-white/5 backdrop-blur-md text-center divide-y lg:divide-y-0 lg:divide-x divide-white/10"
        >
          <div className="flex flex-col items-center justify-center p-4">
            <StatCounter end={4} suffix="+" />
            <span className="text-xs md:text-sm font-bold tracking-wider text-white/50 uppercase mt-2">Team Members</span>
          </div>

          <div className="flex flex-col items-center justify-center p-4 pt-8 lg:pt-4">
            <StatCounter end={10} suffix="+" />
            <span className="text-xs md:text-sm font-bold tracking-wider text-white/50 uppercase mt-2">Services Offered</span>
          </div>

          <div className="flex flex-col items-center justify-center p-4 pt-8 lg:pt-4">
            <StatCounter end={1} suffix="" />
            <span className="text-xs md:text-sm font-bold tracking-wider text-white/50 uppercase mt-2">Strategic Partner</span>
          </div>

          <div className="flex flex-col items-center justify-center p-4 pt-8 lg:pt-4">
            <div className="font-space text-3xl md:text-5xl font-black bg-gradient-to-r from-[#FF2D78] to-[#FFD700] bg-clip-text text-transparent">
              ∞
            </div>
            <span className="text-xs md:text-sm font-bold tracking-wider text-white/50 uppercase mt-2">Innovation</span>
          </div>
        </div>
      </div>
    </section>
  );
};
