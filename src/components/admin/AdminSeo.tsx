import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { Save, Check, Globe } from 'lucide-react';

export const AdminSeo: React.FC = () => {
  const { seoSettings, updateSeoSettings, socialLinks, updateSocialLink } = useCms();
  const [form, setForm] = useState(seoSettings);
  const [saved, setSaved] = useState(false);

  const handleSaveSeo = (e: React.FormEvent) => {
    e.preventDefault();
    updateSeoSettings(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="bg-white rounded-3xl border border-[#E6DECE] p-8 shadow-xs max-w-4xl space-y-10">
      {/* SEO Form */}
      <div>
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#F0E8D9]">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#926E28] block mb-1">
              Search Indexing
            </span>
            <h1 className="font-display text-2xl font-bold text-[#191C1E]">
              Global SEO & OpenGraph Meta
            </h1>
          </div>
          {saved && (
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5" />
              SEO Saved
            </span>
          )}
        </div>

        <form onSubmit={handleSaveSeo} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#191C1E] mb-1">Global Meta Title</label>
            <input
              type="text"
              required
              value={form.globalTitle}
              onChange={(e) => setForm({ ...form, globalTitle: e.target.value })}
              className="w-full px-3.5 py-2.5 text-xs text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-xl"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#191C1E] mb-1">Global Description</label>
            <textarea
              rows={3}
              required
              value={form.globalDescription}
              onChange={(e) => setForm({ ...form, globalDescription: e.target.value })}
              className="w-full px-3.5 py-2.5 text-xs text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-xl resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1">Meta Keywords</label>
              <input
                type="text"
                value={form.keywords}
                onChange={(e) => setForm({ ...form, keywords: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-xl"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1">Robots Directives</label>
              <input
                type="text"
                value={form.robots}
                onChange={(e) => setForm({ ...form, robots: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-xl font-mono"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 text-xs font-semibold text-white bg-[#191C1E] rounded-xl flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5 text-[#C59A4E]" />
              <span>Save SEO Settings</span>
            </button>
          </div>
        </form>
      </div>

      {/* Social Gateways */}
      <div className="pt-6 border-t border-[#F0E8D9]">
        <h2 className="font-display text-lg font-bold text-[#191C1E] mb-4">
          Social Links & External Profiles
        </h2>
        <div className="space-y-3">
          {socialLinks.map((soc) => (
            <div
              key={soc.id}
              className="p-3.5 bg-[#FAF8F5] border border-[#E6DECE] rounded-xl flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <span className="text-xs font-bold text-[#191C1E] capitalize w-24">
                  {soc.platform}
                </span>
                <input
                  type="url"
                  value={soc.url}
                  onChange={(e) => updateSocialLink(soc.id, { url: e.target.value })}
                  className="flex-1 px-3 py-1.5 text-xs bg-white border border-[#E6DECE] rounded-lg"
                />
              </div>
              <label className="flex items-center gap-2 text-xs text-[#191C1E] cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  checked={soc.isEnabled}
                  onChange={(e) => updateSocialLink(soc.id, { isEnabled: e.target.checked })}
                />
                <span>Active</span>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
