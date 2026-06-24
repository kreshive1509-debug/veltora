import React from 'react';
import { Send, MessageSquare, Instagram, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Partners', href: '#partners' },
    { name: 'Internship', href: '#internship' },
    { name: 'Contact', href: '#contact' },
  ];

  const openEmailComposer = () => {
    const to = 'veltoraitsolution2026@gmail.com';
    const subject = 'Website Enquiry';
    const body = 'Hello Veltora IT Solutions Team,\n\n';
    const params = new URLSearchParams({
      view: 'cm',
      fs: '1',
      to,
      su: subject,
      body,
    });
    const gmailUrl = `https://mail.google.com/mail/?${params.toString()}`;
    const mailtoUrl = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    const opened = window.open(gmailUrl, '_blank', 'noopener,noreferrer');
    if (!opened) {
      window.location.href = mailtoUrl;
    }
  };

  return (
    <footer
      id="footer"
      className="relative glass-no-round text-white/70 overflow-hidden"
    >
      {/* Thin gradient top border */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#7B2FFF] to-[#00F5FF]" />

      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-12 gap-12 items-start relative z-10">
        
        {/* Left Column: Brand summary (5 cols) */}
        <div className="md:col-span-5 space-y-4">
          <a href="#" className="flex flex-col select-none group w-fit">
            <span className="text-2xl font-black font-space tracking-wider bg-gradient-to-r from-[#7B2FFF] via-[#A855F7] to-[#00F5FF] bg-clip-text text-transparent">
              VELTORA
            </span>
            <span className="text-[9px] tracking-[0.2em] text-white/50 -mt-1 font-bold">
              IT SOLUTIONS
            </span>
          </a>
          <p className="text-xs font-medium italic text-white/40">
            “Innovating Dreams” — Formerly known as Jugaad Developer
          </p>
          <p className="text-xs text-white/60 leading-relaxed max-w-sm">
            Veltora IT Solutions is a student-led technology, development, and freelancing organization focused on delivering pristine digital interfaces, mobile app configurations, and custom client workflows.
          </p>
        </div>

        {/* Center Column: Quick Links (3 cols) */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="text-sm font-bold uppercase tracking-widest text-[#00F5FF] font-space">
            Quick Links
          </h4>
          <ul className="space-y-2 text-xs">
            {quickLinks.map((link) => (
              <li key={link.name}>
                <a
                  id={`footer-link-${link.name.toLowerCase().replace(' ', '-')}`}
                  href={link.href}
                  className="hover:text-[#00F5FF] transition-colors"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column: Connect (4 cols) */}
        <div className="md:col-span-4 space-y-4">
          <h4 className="text-sm font-bold uppercase tracking-widest text-white font-space">
            Connect With Us
          </h4>
          <p className="text-xs text-white/60">
            Get in touch for client orders, developer partnerships, or system consultations.
          </p>
          
          <div className="flex items-center gap-4 text-xs">
            {/* WhatsApp */}
            <a
              id="footer-wa"
              href="https://wa.me/918707896574"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 hover:text-emerald-400 transition-colors border border-white/5"
            >
              <MessageSquare className="w-4 h-4" />
            </a>

            {/* Email */}
            <button
              id="footer-email"
              type="button"
              onClick={openEmailComposer}
              className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 hover:text-purple-400 transition-colors border border-white/5"
            >
              <Send className="w-4 h-4" />
            </button>

            {/* Instagram */}
            <a
              id="footer-instagram"
              href="https://www.instagram.com/veltora.it.solution/"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 hover:text-pink-400 transition-colors border border-white/5"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </div>

          <div className="text-[11px] text-white/40 space-y-1 pt-2">
            <p>📧 veltoraitsolution2026@gmail.com</p>
            <p>💬 +91 8707896574</p>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="w-full bg-[#030514] py-6 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs text-white/45">
          <p>© 2026 Veltora IT Solutions. All Rights Reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> by Team Veltora
          </p>
        </div>
      </div>
    </footer>
  );
};
