import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { Save, Check, Play, Eye } from 'lucide-react';
import { LoadingScreen } from '../public/LoadingScreen';

export const AdminLoadingScreen: React.FC = () => {
  const { loadingScreenSettings, updateLoadingScreenSettings } = useCms();
  const [form, setForm] = useState(loadingScreenSettings);
  const [saved, setSaved] = useState(false);
  const [previewing, setPreviewing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateLoadingScreenSettings(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl pb-16">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-[#E6DECE] p-6 lg:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#B58A3E] block mb-1">
            Visual Experience
          </span>
          <h1 className="font-display text-2xl lg:text-3xl font-bold text-[#191C1E]">
            Loading Screen CMS
          </h1>
          <p className="text-xs text-[#5F6368] mt-1">
            Configure the splash screen shown when first opening the website.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {saved && (
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5 animate-in fade-in">
              <Check className="w-3.5 h-3.5" />
              Settings Saved
            </span>
          )}
          <button
            type="button"
            onClick={() => setPreviewing(true)}
            className="px-4 py-2.5 text-xs font-semibold text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] hover:border-[#B58A3E] rounded-xl flex items-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-[#B58A3E]" />
            <span>Test Animation</span>
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-6 py-2.5 text-xs font-semibold text-white bg-[#191C1E] hover:bg-[#2B2F34] rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-3.5 h-3.5 text-[#C59A4E]" />
            <span>Save Settings</span>
          </button>
        </div>
      </div>

      {previewing && <LoadingScreen onFinish={() => setPreviewing(false)} />}

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-[#E6DECE] p-6 lg:p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 text-xs font-bold text-[#191C1E] cursor-pointer">
            <input
              type="checkbox"
              checked={form.isEnabled}
              onChange={(e) => setForm({ ...form, isEnabled: e.target.checked })}
              className="accent-[#B58A3E]"
            />
            <span>Enable Splash Loading Screen</span>
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold text-[#191C1E] mb-1.5">
              Loading Text Caption
            </label>
            <input
              type="text"
              value={form.loadingText}
              onChange={(e) => setForm({ ...form, loadingText: e.target.value })}
              className="w-full px-3.5 py-2.5 text-xs text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-xl focus:outline-none focus:border-[#B58A3E]"
              placeholder="Innovating Dreams..."
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#191C1E] mb-1.5">
              Duration (Milliseconds)
            </label>
            <input
              type="number"
              min="400"
              max="3000"
              step="100"
              value={form.durationMs}
              onChange={(e) => setForm({ ...form, durationMs: parseInt(e.target.value) || 900 })}
              className="w-full px-3.5 py-2.5 text-xs text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-xl focus:outline-none focus:border-[#B58A3E]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#191C1E] mb-1.5">
            Custom Logo URL (Optional)
          </label>
          <input
            type="text"
            value={form.customLogoUrl || ''}
            onChange={(e) => setForm({ ...form, customLogoUrl: e.target.value })}
            className="w-full px-3.5 py-2.5 text-xs text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-xl focus:outline-none focus:border-[#B58A3E]"
            placeholder="Defaults to Primary Logo configured in Brand settings"
          />
        </div>
      </form>
    </div>
  );
};
