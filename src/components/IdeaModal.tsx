import React, { useState, useEffect } from 'react';
import { X, Send, Lightbulb, User, Mail, Phone, DollarSign, Calendar } from 'lucide-react';

interface IdeaModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onShowToast: (text: string, type: 'success' | 'info' | 'error') => void;
}

export const IdeaModal: React.FC<IdeaModalProps> = ({
  isOpen,
  onOpen,
  onClose,
  onShowToast,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    title: '',
    description: '',
    budget: "Let's Discuss",
    timeline: 'Flexible',
  });

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

    if (
      !formData.name.trim() ||
      !formData.phone.trim() ||
      !formData.email.trim() ||
      !formData.title.trim() ||
      !formData.description.trim()
    ) {
      onShowToast('Please complete all form fields in order to submit your idea.', 'error');
      return;
    }

    const emailTo = 'veltoraitsolution2026@gmail.com';
    const subject = `New Idea: ${formData.title} - ${formData.name}`;
    const body = [
      'Hello Veltora IT Solutions Team,',
      '',
      'I have developed an original project idea to build with you:',
      '',
      'PROJECT PROFILE:',
      '----------------',
      `Title: ${formData.title}`,
      `Budget Range: ${formData.budget}`,
      `Timeline Target: ${formData.timeline}`,
      '',
      'CLIENT INFORMATION:',
      '-------------------',
      `Proposer Name: ${formData.name}`,
      `Phone Number: ${formData.phone}`,
      `Gmail Address: ${formData.email}`,
      '',
      'DETAILED IDEA DESCRIPTION:',
      '--------------------------',
      formData.description,
      '',
      'Looking forward to your professional technical perspective.',
      'Regards,',
      formData.name,
    ].join('\n');

    onShowToast('Opening Gmail with your full idea details...', 'success');
    openEmailComposer(emailTo, subject, body);
    onClose();
  };

  return (
    <>
      {/* Floating Bottom-Right Pill Button - ALWAYS VISIBLE */}
      <button
        id="floating-idea-pill"
        onClick={onOpen}
        className="fixed bottom-6 right-6 z-30 px-5 py-3.5 rounded-full bg-gradient-to-r from-[#7B2FFF] via-[#A855F7] to-[#00F5FF] text-white font-space font-black text-xs md:text-sm tracking-wide uppercase shadow-[0_4px_25px_rgba(123,47,255,0.5)] cursor-pointer flex items-center gap-2 hover:scale-105 active:scale-95 transition-all pointer-events-auto cyan-glow-btn hover:shadow-[0_4px_30px_rgba(0,245,255,0.6)]"
      >
        <span className="p-1 rounded-full bg-black/20 select-none">
          <Lightbulb className="w-4 h-4 text-[#FFD700] fill-[#FFD700]/10" />
        </span>
        Share Your Idea
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div
          id="idea-modal-overlay"
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
        >
          <div
            id="idea-modal"
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl rounded-[24px] overflow-hidden p-6 md:p-8 relative transform transition-all duration-300 scale-100 animate-scale-up glass card-shadow"
          >
            {/* Close Button */}
            <button
              id="idea-modal-close"
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 hover:bg-white/15 text-white/60 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Heading */}
            <div className="mb-6">
              <span className="text-[10px] font-bold text-[#FFD700] uppercase tracking-[0.2em] block mb-1">
                INNOVATIVE INCUBATOR
              </span>
              <h3 className="text-2xl font-black font-space text-white leading-tight">
                Pitch Your Idea
              </h3>
              <p className="text-xs text-white/50 mt-1">
                Tell us what you want to execute. We help students turn concepts into real deployments.
              </p>
            </div>

            {/* Form */}
            <form id="pitch-idea-form" onSubmit={handleSubmit} className="space-y-4 text-left">
              
              {/* Proposer Info Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Name */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="idea-proposer-name" className="text-[10px] font-bold text-white/45 uppercase tracking-wider flex items-center gap-1.5">
                    <User className="w-3 h-3 text-[#00F5FF]" /> Name
                  </label>
                  <input
                    id="idea-proposer-name"
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name"
                    className="w-full px-3 py-2.5 rounded-lg bg-white/[0.03] border border-white/10 text-white placeholder-white/20 focus:border-[#00F5FF] focus:bg-[#00F5FF]/5 focus:outline-none transition-all text-xs"
                  />
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="idea-proposer-phone" className="text-[10px] font-bold text-white/45 uppercase tracking-wider flex items-center gap-1.5">
                    <Phone className="w-3 h-3 text-[#00F5FF]" /> Phone
                  </label>
                  <input
                    id="idea-proposer-phone"
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="e.g. +91..."
                    className="w-full px-3 py-2.5 rounded-lg bg-white/[0.03] border border-white/10 text-white placeholder-white/20 focus:border-[#00F5FF] focus:bg-[#00F5FF]/5 focus:outline-none transition-all text-xs"
                  />
                </div>

                {/* Gmail */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="idea-proposer-email" className="text-[10px] font-bold text-white/45 uppercase tracking-wider flex items-center gap-1.5">
                    <Mail className="w-3 h-3 text-[#00F5FF]" /> Gmail
                  </label>
                  <input
                    id="idea-proposer-email"
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Gmail Address"
                    className="w-full px-3 py-2.5 rounded-lg bg-white/[0.03] border border-white/10 text-white placeholder-white/20 focus:border-[#00F5FF] focus:bg-[#00F5FF]/5 focus:outline-none transition-all text-xs"
                  />
                </div>
              </div>

              {/* Title Column */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="idea-proposer-title" className="text-[10px] font-bold text-white/45 uppercase tracking-wider">
                  Idea / Project Title
                </label>
                <input
                  id="idea-proposer-title"
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g. SaaS Dashboard, Hyper-Local Delivery app"
                  className="w-full px-4 py-2.5 rounded-lg bg-white/[0.03] border border-white/10 text-white placeholder-white/20 focus:border-[#00F5FF] focus:bg-[#00F5FF]/5 focus:outline-none transition-all text-xs"
                />
              </div>

              {/* Details Column */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="idea-proposer-desc" className="text-[10px] font-bold text-white/45 uppercase tracking-wider">
                  Describe Your Vision & Purpose
                </label>
                <textarea
                  id="idea-proposer-desc"
                  name="description"
                  required
                  rows={5}
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your design parameters, target audience, flow, and integration wishes..."
                  className="w-full px-4 py-2.5 rounded-lg bg-white/[0.03] border border-white/10 text-white placeholder-white/20 focus:border-[#00F5FF] focus:bg-[#00F5FF]/5 focus:outline-none transition-all text-xs resize-none"
                />
              </div>

              {/* Budget and Timeline Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Budget */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="idea-proposer-budget" className="text-[10px] font-bold text-white/45 uppercase tracking-wider flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5 text-[#00F5FF]" /> Budget Tier
                  </label>
                  <select
                    id="idea-proposer-budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 rounded-lg bg-[#05071A] border border-white/10 text-white focus:border-[#00F5FF] focus:outline-none transition-all text-xs"
                  >
                    <option value="Under ₹5,000">Under ₹5,000</option>
                    <option value="₹5,000-₹15,000">₹5,000 - ₹15,000</option>
                    <option value="₹15,000-₹50,000">₹15,000 - ₹50,000</option>
                    <option value="₹50,000+">₹50,000+</option>
                    <option value="Let's Discuss">Let's Discuss</option>
                  </select>
                </div>

                {/* Timeline */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="idea-proposer-time" className="text-[10px] font-bold text-white/45 uppercase tracking-wider flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#00F5FF]" /> Timeline Target
                  </label>
                  <select
                    id="idea-proposer-time"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 rounded-lg bg-[#05071A] border border-white/10 text-white focus:border-[#00F5FF] focus:outline-none transition-all text-xs"
                  >
                    <option value="ASAP">ASAP (Extremely Urgent)</option>
                    <option value="Within 1 Month">Within 1 Month</option>
                    <option value="1-3 Months">1 - 3 Months</option>
                    <option value="3+ Months">3+ Months</option>
                    <option value="Flexible">Flexible / Open Target</option>
                  </select>
                </div>
              </div>

              {/* Submit */}
              <button
                id="idea-modal-submit"
                type="submit"
                className="w-full py-3 mt-4 rounded-xl text-sm font-bold uppercase tracking-wider bg-gradient-to-r from-[#00F5FF] to-[#7B2FFF] text-white hover:opacity-90 active:scale-98 transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#00F5FF]/10 cursor-pointer"
              >
                Send Pitch Details <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
