import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { SocialLink } from '../../types';
import { Save, Check, Plus, Trash2, Globe, Mail, Phone, MapPin } from 'lucide-react';

export const AdminContact: React.FC = () => {
  const { siteSettings, socialLinks, updateSiteSettings, updateSocialLink } = useCms();
  const [form, setForm] = useState(siteSettings);
  const [socials, setSocials] = useState<SocialLink[]>(socialLinks);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteSettings(form);
    socials.forEach((s) => updateSocialLink(s.id, s));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-5xl pb-16">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-[#E6DECE] p-6 lg:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#B58A3E] block mb-1">
            Channels & Socials
          </span>
          <h1 className="font-display text-2xl lg:text-3xl font-bold text-[#191C1E]">
            Contact Information & Social Links
          </h1>
          <p className="text-xs text-[#5F6368] mt-1">
            Configure business email, telephone, WhatsApp coordination line, physical address, and public social channels.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {saved && (
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5 animate-in fade-in">
              <Check className="w-3.5 h-3.5" />
              Saved
            </span>
          )}
          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2.5 text-xs font-semibold text-white bg-[#191C1E] hover:bg-[#2B2F34] rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-3.5 h-3.5 text-[#C59A4E]" />
            <span>Save Contact Info</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-3xl border border-[#E6DECE] p-6 lg:p-8 shadow-xs space-y-6">
        <h2 className="font-display text-base font-bold text-[#191C1E] border-b border-[#F0E8D9] pb-3">
          Official Communication Channels
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs font-semibold text-[#191C1E] mb-1.5">
              Primary Email
            </label>
            <input
              type="email"
              required
              value={form.primaryEmail}
              onChange={(e) => setForm({ ...form, primaryEmail: e.target.value })}
              className="w-full px-3.5 py-2.5 text-xs text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-xl focus:outline-none focus:border-[#B58A3E]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#191C1E] mb-1.5">
              Direct Phone
            </label>
            <input
              type="text"
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full px-3.5 py-2.5 text-xs text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-xl focus:outline-none focus:border-[#B58A3E]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#191C1E] mb-1.5">
              WhatsApp Coordination Number
            </label>
            <input
              type="text"
              required
              value={form.whatsapp}
              onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
              className="w-full px-3.5 py-2.5 text-xs text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-xl focus:outline-none focus:border-[#B58A3E]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold text-[#191C1E] mb-1.5">
              Office / Hub Address
            </label>
            <input
              type="text"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="w-full px-3.5 py-2.5 text-xs text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-xl focus:outline-none focus:border-[#B58A3E]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#191C1E] mb-1.5">
              Operating Business Hours
            </label>
            <input
              type="text"
              value={form.businessHours}
              onChange={(e) => setForm({ ...form, businessHours: e.target.value })}
              className="w-full px-3.5 py-2.5 text-xs text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-xl focus:outline-none focus:border-[#B58A3E]"
            />
          </div>
        </div>

        {/* Social Links Manager */}
        <div className="border-t border-[#F0E8D9] pt-6 space-y-4">
          <h2 className="font-display text-base font-bold text-[#191C1E]">
            Social Media Gateways
          </h2>

          <div className="space-y-3">
            {socials.map((soc, idx) => (
              <div key={soc.id} className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E6DECE] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-xs font-bold text-[#191C1E] w-28 capitalize">
                    {soc.platform}
                  </span>
                  <input
                    type="url"
                    value={soc.url}
                    onChange={(e) => {
                      const updated = [...socials];
                      updated[idx].url = e.target.value;
                      setSocials(updated);
                    }}
                    className="flex-1 px-3 py-1.5 text-xs bg-white border border-[#E6DECE] rounded-lg focus:outline-none"
                    placeholder={`https://${soc.platform}.com/...`}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-1.5 text-xs font-medium text-[#191C1E] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={soc.isEnabled}
                      onChange={(e) => {
                        const updated = [...socials];
                        updated[idx].isEnabled = e.target.checked;
                        setSocials(updated);
                      }}
                      className="accent-[#B58A3E]"
                    />
                    <span>Enabled</span>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};
