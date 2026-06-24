import React, { useState, useEffect } from 'react';
import { X, Send, User, Mail, Phone, FileText } from 'lucide-react';

interface ServiceModalProps {
  serviceName: string;
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (text: string, type: 'success' | 'info' | 'error') => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({
  serviceName,
  isOpen,
  onClose,
  onShowToast,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    description: '',
  });

  // Handle escape key to close
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim() || !formData.description.trim()) {
      onShowToast('Please fill out all enquiry details.', 'error');
      return;
    }

    const emailTo = 'veltoraitsolution2026@gmail.com';
    const subject = `Service Enquiry: ${serviceName} - ${formData.name}`;
    const body = [
      'Hello Veltora IT Solutions Team,',
      '',
      `I am interested in your service: ${serviceName}`,
      '',
      'CLIENT DETAILS:',
      '---------------',
      `Name: ${formData.name}`,
      `Phone: ${formData.phone}`,
      `Gmail: ${formData.email}`,
      '',
      'PROJECT DESCRIPTION:',
      '--------------------',
      formData.description,
      '',
      'Looking forward to hearing from you.',
      `Regards, ${formData.name}`,
    ].join('\n');

    onShowToast('Opening Gmail with your full enquiry...', 'success');

    openEmailComposer(emailTo, subject, body);
    onClose();
  };

  return (
    <div
      id="service-modal-overlay"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
    >
      <div
        id="service-modal"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-[24px] overflow-hidden p-6 md:p-8 relative transform transition-all duration-300 scale-100 animate-scale-up glass card-shadow"
      >
        {/* Style injection for animations */}
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes scaleUp {
            from { transform: scale(0.95); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
          .animate-fade-in { animation: fadeIn 0.25s ease-out forwards; }
          .animate-scale-up { animation: scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        `}</style>

        {/* Close Button */}
        <button
          id="service-modal-close"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 hover:bg-white/15 text-white/60 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Heading */}
        <div className="mb-6">
          <span className="text-[10px] font-bold text-[#00F5FF] uppercase tracking-[0.2em] block mb-1">
            PROJECT REQUEST
          </span>
          <h3 className="text-2xl font-black font-space text-white leading-tight">
            Enquire For Service
          </h3>
          
          {/* Service Name Badge */}
          <div className="mt-3 flex items-center">
            <span className="inline-block px-3.5 py-1.5 rounded-full bg-[#7B2FFF] text-white text-xs font-bold leading-none tracking-wide shadow-md shadow-purple-500/10">
              ⚡ {serviceName}
            </span>
          </div>
        </div>

        {/* Form Body */}
        <form id="service-inquiry-form" onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
          
          {/* Full Name */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="service-client-name" className="text-[10px] font-bold text-white/45 uppercase tracking-wider flex items-center gap-1.5">
              <User className="w-3 h-3 text-[#7B2FFF]" /> Full Name
            </label>
            <input
              id="service-client-name"
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your full name"
              className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/10 text-white placeholder-white/20 focus:border-[#7B2FFF] focus:bg-[#7B2FFF]/5 focus:outline-none transition-all text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Phone */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="service-client-phone" className="text-[10px] font-bold text-white/45 uppercase tracking-wider flex items-center gap-1.5">
                <Phone className="w-3 h-3 text-[#7B2FFF]" /> Phone Number
              </label>
              <input
                id="service-client-phone"
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="e.g. +91 9876543210"
                className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/10 text-white placeholder-white/20 focus:border-[#7B2FFF] focus:bg-[#7B2FFF]/5 focus:outline-none transition-all text-sm"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="service-client-email" className="text-[10px] font-bold text-white/45 uppercase tracking-wider flex items-center gap-1.5">
                <Mail className="w-3 h-3 text-[#7B2FFF]" /> Gmail Address
              </label>
              <input
                id="service-client-email"
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="e.g. name@gmail.com"
                className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/10 text-white placeholder-white/20 focus:border-[#7B2FFF] focus:bg-[#7B2FFF]/5 focus:outline-none transition-all text-sm"
              />
            </div>
          </div>

          {/* Project Details */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="service-client-desc" className="text-[10px] font-bold text-white/45 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-3 h-3 text-[#7B2FFF]" /> Work Description
            </label>
            <textarea
              id="service-client-desc"
              name="description"
              required
              rows={4}
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe your design parameters, timelines, and ideas..."
              className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/10 text-white placeholder-white/20 focus:border-[#7B2FFF] focus:bg-[#7B2FFF]/5 focus:outline-none transition-all text-sm resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            id="service-modal-submit"
            type="submit"
            className="w-full py-3.5 mt-2 rounded-xl text-sm font-bold uppercase tracking-wider bg-gradient-to-r from-[#7B2FFF] to-[#A855F7] text-white hover:opacity-90 active:scale-98 transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#7B2FFF]/20 cursor-pointer"
          >
            Submit Enquiry <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
