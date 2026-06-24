import React, { useState } from 'react';
import { MessageSquare, Mail, Instagram, Send, PhoneCall } from 'lucide-react';

interface ContactProps {
  onShowToast: (text: string, type: 'success' | 'info' | 'error') => void;
}

export const Contact: React.FC<ContactProps> = ({ onShowToast }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const openEmailComposer = (to: string, subject: string, body: string) => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.message.trim()) {
      onShowToast('Please complete all form fields.', 'error');
      return;
    }

    const emailTo = 'veltoraitsolution2026@gmail.com';
    const subject = `Website Contact: ${formData.name}`;
    const body = [
      'Hello Veltora IT Solutions Team,',
      '',
      'I reached out through the general contact form on your website.',
      '',
      'CLIENT PROFILE:',
      '---------------',
      `Name: ${formData.name}`,
      `Phone: ${formData.phone}`,
      `Email: ${formData.email}`,
      '',
      'MESSAGE DETAILS:',
      '----------------',
      formData.message,
      '',
      'Please get back to me.',
      'Regards,',
      formData.name,
    ].join('\n');

    onShowToast('Opening Gmail with your full message...', 'success');
    openEmailComposer(emailTo, subject, body);
  };

  const handleWhatsApp = () => {
    onShowToast('Opening WhatsApp dispatch chat... 💬', 'success');
    setTimeout(() => {
      try {
        const opened = window.open('https://wa.me/918707896574', '_blank');
        if (!opened) {
          window.location.href = 'https://wa.me/918707896574';
        }
      } catch (err) {
        try {
          window.location.href = 'https://wa.me/918707896574';
        } catch (e) {}
      }
    }, 500);
  };

  const handleEmailDirect = () => {
    openEmailComposer(
      'veltoraitsolution2026@gmail.com',
      'Website Enquiry',
      'Hello Veltora IT Solutions Team,\n\n'
    );
  };

  return (
    <section
      id="contact"
      className="relative py-24 px-6 overflow-hidden bg-gradient-to-b from-[#0A0D2E] to-[#05071A]"
    >
      <div className="absolute top-1/2 right-0 w-80 h-80 rounded-full bg-cyan-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#00F5FF] mb-3 block">
            CONTACT US
          </span>
          <h2 className="text-4xl md:text-[52px] font-black font-space tracking-tight bg-gradient-to-r from-white via-white to-purple-400 bg-clip-text text-transparent mb-6">
            Let's Connect
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#7B2FFF] to-[#00F5FF] mx-auto rounded-full" />
        </div>

        {/* Contact Info Grid & Form Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto items-start">
          
          {/* 3 Contact Directory Cards (Left, 5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* WhatsApp Card */}
            <div
              id="contact-card-wa"
              onClick={handleWhatsApp}
              className="p-6 rounded-2xl hover:border-emerald-500/40 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 group glass card-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="p-3.5 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 transition-all shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold font-space text-white group-hover:text-emerald-400 transition-colors">
                    WhatsApp Chat
                  </h4>
                  <p className="text-xs text-white/50 mt-1 mb-2">Instant messaging support line</p>
                  <span className="text-xs font-black font-space text-emerald-400 group-hover:underline">
                    +91 8707896574 →
                  </span>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div
              id="contact-card-email"
              onClick={handleEmailDirect}
              className="p-6 rounded-2xl hover:border-[#7B2FFF]/40 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 group glass card-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="p-3.5 rounded-xl bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20 transition-all shadow-[0_0_15px_rgba(123,47,255,0.15)]">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold font-space text-white group-hover:text-purple-400 transition-colors">
                    Official Email
                  </h4>
                  <p className="text-xs text-white/50 mt-1 mb-2">Send us contracts, pitches, or applications</p>
                  <span className="text-xs font-black font-space text-purple-400 group-hover:underline break-all">
                    veltoraitsolution2026@gmail.com →
                  </span>
                </div>
              </div>
            </div>

            {/* Instagram Card */}
            <div
              id="contact-card-insta"
              onClick={() => {
                try {
                  const opened = window.open('https://www.instagram.com/veltora.it.solution/', '_blank');
                  if (!opened) {
                    window.location.href = 'https://www.instagram.com/veltora.it.solution/';
                  }
                } catch (err) {
                  try {
                    window.location.href = 'https://www.instagram.com/veltora.it.solution/';
                  } catch (e) {}
                }
              }}
              className="p-6 rounded-2xl hover:border-pink-500/40 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 group glass card-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="p-3.5 rounded-xl bg-pink-500/10 text-pink-400 group-hover:bg-pink-500/20 transition-all shadow-[0_0_15px_rgba(236,72,153,0.15)]">
                  <Instagram className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold font-space text-white group-hover:text-pink-400 transition-colors">
                    Instagram Feed
                  </h4>
                  <p className="text-xs text-white/50 mt-1 mb-2">Stay updated with our journey & workshops</p>
                  <span className="text-xs font-black font-space text-pink-400 group-hover:underline">
                    @veltora.it.solution →
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* General Contact Form (Right, 7 cols) */}
          <div className="lg:col-span-7 p-8 rounded-3xl glass card-shadow">
            <h3 className="text-xl font-bold font-space text-white mb-6">
              Send a General Inquiry
            </h3>

            <form id="contact-form" onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-name" className="text-xs font-bold text-white/50 uppercase tracking-wider">
                    Full Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. John Doe"
                    className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/10 text-white placeholder-white/20 focus:border-[#7B2FFF] focus:bg-[#7B2FFF]/5 focus:outline-none transition-all text-sm"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-email" className="text-xs font-bold text-white/50 uppercase tracking-wider">
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g. johndoe@gmail.com"
                    className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/10 text-white placeholder-white/20 focus:border-[#7B2FFF] focus:bg-[#7B2FFF]/5 focus:outline-none transition-all text-sm"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-phone" className="text-xs font-bold text-white/50 uppercase tracking-wider">
                  Phone Number
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="e.g. +91 9876543210"
                  className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/10 text-white placeholder-white/20 focus:border-[#7B2FFF] focus:bg-[#7B2FFF]/5 focus:outline-none transition-all text-sm"
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-message" className="text-xs font-bold text-white/50 uppercase tracking-wider">
                  Message Details
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Tell us what you are looking to build..."
                  className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/10 text-white placeholder-white/20 focus:border-[#7B2FFF] focus:bg-[#7B2FFF]/5 focus:outline-none transition-all text-sm resize-none"
                />
              </div>

              {/* Submit button */}
              <button
                id="contact-submit"
                type="submit"
                className="w-full py-4 rounded-xl font-bold bg-gradient-to-r from-[#7B2FFF] to-[#A855F7] text-white hover:opacity-90 active:scale-98 transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#7B2FFF]/20 cursor-pointer text-sm font-space uppercase tracking-wider"
              >
                Send Message <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
