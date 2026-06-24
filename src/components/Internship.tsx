import React, { useRef, useState, useEffect } from 'react';
import { CheckCircle, Award, Sparkles } from 'lucide-react';

export const Internship: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isConfettiActive, setIsConfettiActive] = useState(false);

  // Simple, high-performance, embedded Canvas Confetti generator
  useEffect(() => {
    if (!isConfettiActive || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#7B2FFF', '#00F5FF', '#FF2D78', '#FFD700', '#A855F7'];
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      color: string;
      vx: number;
      vy: number;
      rotation: number;
      rotationSpeed: number;
    }> = [];

    // Spark particles from center-bottom
    const count = 120;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height * 0.75,
        size: Math.random() * 8 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 16,
        vy: -Math.random() * 15 - 8,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
      });
    }

    let frameId: number;
    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let alive = false;
      for (let p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.35; // gravity
        p.vx *= 0.98; // friction
        p.rotation += p.rotationSpeed;

        if (p.y < canvas.height && p.x > 0 && p.x < canvas.width) {
          alive = true;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
          ctx.restore();
        }
      }

      if (alive) {
        frameId = requestAnimationFrame(update);
      } else {
        setIsConfettiActive(false);
      }
    };

    update();

    return () => cancelAnimationFrame(frameId);
  }, [isConfettiActive]);

  const handleApplyNow = () => {
    // Trigger the confetti canvas flow first
    setIsConfettiActive(true);

    // After a brief delay to enjoy the feedback, launch the Google Form
    setTimeout(() => {
      const applyUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSee_rI1SB237pAM9pKzs-Ljem5YCFWO9lxr_p9FI2v4lLRH1Q/viewform';
      try {
        const opened = window.open(applyUrl, '_blank');
        if (!opened) {
          window.location.href = applyUrl;
        }
      } catch (err) {
        try {
          window.location.href = applyUrl;
        } catch (e) {}
      }
    }, 850);
  };

  const checklistItems = [
    'Real World Projects',
    'Team Collaboration',
    'Industry Exposure',
    'Portfolio Building',
    'Internship Certificate',
    'Freelancer Community Access',
  ];

  return (
    <section
      id="internship"
      className="relative py-24 px-6 overflow-hidden bg-gradient-to-b from-[#0A0D2E] to-[#05071A]"
    >
      {/* Absolute canvas for confetti overlay */}
      {isConfettiActive && (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 z-50 pointer-events-none w-full h-full"
        />
      )}

      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-purple-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Section Tag */}
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#7B2FFF] mb-3 block">
          SKILL ACCELERATOR
        </span>
        
        {/* Title */}
        <h2 className="text-4xl md:text-[52px] font-black font-space tracking-tight text-white mb-6">
          Veltora Internship Program
        </h2>
        <div className="w-16 h-1 bg-gradient-to-r from-[#7B2FFF] to-[#00F5FF] mx-auto mb-12 rounded-full" />

        {/* Central Card Container */}
        <div className="p-8 md:p-12 rounded-3xl text-left max-w-2xl mx-auto glass card-shadow">
          
          {/* Header Row: Program Tagline & ₹150 badge */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 mb-8 pb-6 border-b border-white/5 text-center sm:text-left">
            <div>
              <h3 className="text-xl font-bold font-space text-white mb-1 flex items-center justify-center sm:justify-start gap-2">
                <Award className="w-5 h-5 text-[#00F5FF]" /> Launch Your Career
              </h3>
              <p className="text-xs text-white/50">Gain real exposure, join our discord developer group.</p>
            </div>
            
            {/* Glowing fee badge */}
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-bold text-[#A855F7] tracking-widest uppercase mb-1">One-Time Fee</span>
              <div className="px-5 py-2 rounded-full bg-gradient-to-r from-[#7B2FFF] to-[#A855F7] text-white font-space font-black text-xl tracking-wide shadow-[0_0_20px_rgba(123,47,255,0.6)] animate-pulse shrink-0">
                ₹150
              </div>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {checklistItems.map((benefit) => (
              <div key={benefit} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-[#00F5FF] shrink-0" />
                <span className="text-sm font-medium text-white/85">{benefit}</span>
              </div>
            ))}
          </div>

          <p className="text-xs text-white/40 leading-relaxed mb-8 text-center sm:text-left">
            * This nominal commitment fee of ₹150 standardizes applicant verification, funding program tools, certificates generation, and community hosting overheads.
          </p>

          {/* Glowing Apply Button */}
          <div className="flex justify-center">
            <button
              id="internship-apply-btn"
              onClick={handleApplyNow}
              className="w-full sm:w-auto px-10 py-4 rounded-full text-sm font-black uppercase tracking-widest bg-gradient-to-r from-[#7B2FFF] via-[#A855F7] to-[#00F5FF] text-white hover:scale-105 active:scale-95 shadow-xl shadow-[#7B2FFF]/20 transition-all pointer-events-auto cursor-pointer"
            >
              Apply Now 🚀
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
