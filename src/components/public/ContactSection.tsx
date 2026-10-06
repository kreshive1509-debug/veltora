import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import {
  Send,
  CheckCircle2,
  Copy,
  Check,
  MessageSquare,
  Mail,
  Phone,
  MapPin,
  Clock,
  Sparkles,
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { siteSettings, services, submitEnquiry } = useCms();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    whatsapp: '',
    company: '',
    service: services[0]?.name || 'Bespoke Software Engineering',
    projectType: 'Full-Stack Platform',
    budgetRange: '$2,500 – $5,000',
    message: '',
    honeypot: '', // anti-spam
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const activeServices = services.filter((s) => s.isActive);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Anti-spam honeypot check
    if (formData.honeypot) {
      return;
    }

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim() || !formData.phone.trim()) {
      setErrorMsg('Please complete all required fields (Name, Email, Phone, Message).');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await submitEnquiry({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        whatsapp: formData.whatsapp.trim() || formData.phone.trim(),
        company: formData.company.trim(),
        service: formData.service,
        projectType: formData.projectType,
        budgetRange: formData.budgetRange,
        message: formData.message.trim(),
      });
      setSubmittedRef(result.referenceNo);
    } catch (err) {
      setErrorMsg('An error occurred submitting your enquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyRefToClipboard = () => {
    if (submittedRef) {
      navigator.clipboard.writeText(submittedRef);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const constructWhatsAppUrl = () => {
    if (!submittedRef) return '#';
    const recipientPhone = siteSettings.whatsapp.replace(/\D/g, '') || '919876543210';
    const text = `New Veltora Enquiry\n\nReference: ${submittedRef}\nName: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nService: ${formData.service}\n\nMessage:\n${formData.message}`;
    return `https://wa.me/${recipientPhone}?text=${encodeURIComponent(text)}`;
  };

  const handleStartAnother = () => {
    setSubmittedRef(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      whatsapp: '',
      company: '',
      service: services[0]?.name || 'Bespoke Software Engineering',
      projectType: 'Full-Stack Platform',
      budgetRange: '$2,500 – $5,000',
      message: '',
      honeypot: '',
    });
  };

  return (
    <section id="contact" className="py-24 bg-[#FAF8F5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Context & Direct Gateways */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold text-[#926E28] tracking-wider uppercase mb-3 block">
                Initiate Engagement
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#191C1E] leading-tight mb-6">
                Let’s Build Something Exceptional Together.
              </h2>
              <p className="text-sm sm:text-base text-[#4A4E54] leading-relaxed mb-8 font-normal">
                Whether you require bespoke software architecture, operational automation, or want to sponsor a developer fellowship cohort, our leadership squad is ready.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#FAF6EE] border border-[#E8DFC9] flex items-center justify-center text-[#926E28] shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-medium text-[#6B7280] block">Official Inquiries</span>
                    <a
                      href={`mailto:${siteSettings.primaryEmail}`}
                      className="text-sm font-semibold text-[#191C1E] hover:text-[#926E28] transition-colors"
                    >
                      {siteSettings.primaryEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#FAF6EE] border border-[#E8DFC9] flex items-center justify-center text-[#926E28] shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-medium text-[#6B7280] block">Direct Telephone</span>
                    <a
                      href={`tel:${siteSettings.phone.replace(/\s+/g, '')}`}
                      className="text-sm font-semibold text-[#191C1E] hover:text-[#926E28] transition-colors"
                    >
                      {siteSettings.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#FAF6EE] border border-[#E8DFC9] flex items-center justify-center text-[#926E28] shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-medium text-[#6B7280] block">Operating Hours</span>
                    <span className="text-sm text-[#191C1E]">{siteSettings.businessHours}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#FAF6EE] border border-[#E8DFC9] flex items-center justify-center text-[#926E28] shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-medium text-[#6B7280] block">Headquarters</span>
                    <span className="text-sm text-[#191C1E]">{siteSettings.address}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF6EE] border border-[#E8DFC9]">
              <span className="text-xs font-semibold text-[#806429] block mb-1">
                Direct WhatsApp Channel
              </span>
              <p className="text-xs text-[#52575E] mb-3">
                Need urgent technical consultation? Reach out directly to our engineering coordination line.
              </p>
              <a
                href={`https://wa.me/${siteSettings.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#191C1E] hover:text-[#926E28] transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                <span>Open WhatsApp ({siteSettings.whatsapp})</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Form or Success State */}
          <div className="lg:col-span-7">
            {submittedRef ? (
              /* Success State Screen adhering to prompt rule 20 & 21 */
              <div className="bg-[#FFFFFF] rounded-3xl border border-[#E6DECE] p-8 sm:p-10 shadow-lg text-center animate-in fade-in zoom-in-95 duration-300">
                <div className="w-16 h-16 rounded-2xl bg-[#EBF7EE] text-[#1E7E34] flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#191C1E] mb-3">
                  Your enquiry has been submitted successfully.
                </h3>

                <p className="text-sm text-[#5C6169] max-w-md mx-auto mb-6">
                  Our engineering team has received your project parameters and will review them promptly.
                </p>

                {/* Reference Number Card */}
                <div className="bg-[#FAF7F1] border border-[#EAE2D0] rounded-2xl p-5 max-w-sm mx-auto mb-6">
                  <span className="text-xs font-medium text-[#806429] uppercase tracking-wider block mb-1">
                    Enquiry Reference Number
                  </span>
                  <div className="flex items-center justify-center gap-3">
                    <span className="font-mono text-xl font-bold text-[#191C1E] tracking-wider">
                      {submittedRef}
                    </span>
                    <button
                      onClick={copyRefToClipboard}
                      className="p-1.5 text-[#656A72] hover:text-[#191C1E] hover:bg-white rounded-md transition-colors"
                      title="Copy Reference Number"
                    >
                      {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  {copied && (
                    <span className="text-[11px] text-green-600 font-medium block mt-1">
                      Copied to clipboard!
                    </span>
                  )}
                </div>

                <p className="text-xs text-[#6B7280] mb-8 max-w-sm mx-auto">
                  Please save this reference number for future coordination with our engineering squad.
                </p>

                {/* WhatsApp Action */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
                  <a
                    href={constructWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3 text-xs font-semibold text-white bg-[#25D366] hover:bg-[#1EBE5D] rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Forward Details via WhatsApp</span>
                  </a>

                  <button
                    onClick={handleStartAnother}
                    className="w-full sm:w-auto px-5 py-3 text-xs font-semibold text-[#191C1E] hover:bg-[#FAF6EE] border border-[#E6DECE] rounded-xl transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              /* Professional Contact Form */
              <form
                onSubmit={handleSubmit}
                className="bg-[#FFFFFF] rounded-3xl border border-[#E6DECE] p-8 sm:p-10 shadow-xs"
              >
                <div className="mb-6">
                  <h3 className="font-display text-xl font-bold text-[#191C1E]">
                    Project Specifications & Inquiry
                  </h3>
                  <p className="text-xs text-[#6B7280] mt-1">
                    Fill in your technical or business scope to receive a tailored architectural proposal.
                  </p>
                </div>

                {errorMsg && (
                  <div className="mb-6 p-3 bg-[#FDF2F2] border border-[#F8D7DA] text-[#721C24] text-xs rounded-xl">
                    {errorMsg}
                  </div>
                )}

                {/* Honeypot field for spam prevention */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#191C1E] mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikramaditya Rao"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-xl focus:outline-none focus:border-[#B58A3E] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#191C1E] mb-1.5">
                      Business Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. v.rao@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-xl focus:outline-none focus:border-[#B58A3E] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#191C1E] mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 00000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-xl focus:outline-none focus:border-[#B58A3E] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#191C1E] mb-1.5">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Apex Global Logistics"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-xl focus:outline-none focus:border-[#B58A3E] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#191C1E] mb-1.5">
                      Service Category
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-3 py-2.5 text-xs text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-xl focus:outline-none focus:border-[#B58A3E] transition-colors"
                    >
                      {activeServices.map((s) => (
                        <option key={s.id} value={s.name}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#191C1E] mb-1.5">
                      Project Type
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-3 py-2.5 text-xs text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-xl focus:outline-none focus:border-[#B58A3E] transition-colors"
                    >
                      <option value="Full-Stack Platform">Full-Stack Platform</option>
                      <option value="Workflow Automation">Workflow Automation</option>
                      <option value="Light Luxury Website">Light Luxury Website</option>
                      <option value="Fellowship Application">Fellowship / Training</option>
                      <option value="Enterprise Architecture">Enterprise Architecture</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#191C1E] mb-1.5">
                      Target Budget Range
                    </label>
                    <select
                      value={formData.budgetRange}
                      onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                      className="w-full px-3 py-2.5 text-xs text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-xl focus:outline-none focus:border-[#B58A3E] transition-colors"
                    >
                      <option value="Under $2,500">Under $2,500</option>
                      <option value="$2,500 – $5,000">$2,500 – $5,000</option>
                      <option value="$5,000 – $15,000">$5,000 – $15,000</option>
                      <option value="$15,000+">$15,000+</option>
                      <option value="Merit Fellowship">Merit Fellowship (Free)</option>
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-xs font-semibold text-[#191C1E] mb-1.5">
                    Project Goals & Functional Requirements *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Briefly describe what you are building, timeline expectations, and core challenges..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-xl focus:outline-none focus:border-[#B58A3E] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 text-xs font-semibold text-[#FAF8F5] bg-[#191C1E] hover:bg-[#2B2F34] rounded-xl transition-all duration-200 shadow-md flex items-center justify-center gap-2 group disabled:opacity-70 active:scale-[0.99]"
                >
                  {isSubmitting ? (
                    <span>Submitting Enquiry...</span>
                  ) : (
                    <>
                      <span>Submit Project Enquiry</span>
                      <Send className="w-3.5 h-3.5 text-[#C59A4E] group-hover:translate-x-0.5 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
