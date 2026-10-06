import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { Save, Check, Video, Image as ImageIcon, Sparkles } from 'lucide-react';

export const AdminHeroSettings: React.FC = () => {
  const { heroSettings, updateHeroSettings } = useCms();
  const [form, setForm] = useState(heroSettings);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateHeroSettings(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="bg-white rounded-3xl border border-[#E6DECE] p-8 shadow-xs max-w-4xl">
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-[#F0E8D9]">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#926E28] block mb-1">
            Visual Experience
          </span>
          <h1 className="font-display text-2xl font-bold text-[#191C1E]">
            Hero & Background System
          </h1>
        </div>
        {saved && (
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5" />
            Hero Updated
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Background Mode Selector */}
        <div className="p-5 bg-[#FAF8F5] border border-[#E6DECE] rounded-2xl">
          <label className="block text-xs font-bold text-[#191C1E] uppercase tracking-wider mb-3">
            Hero Background Mode
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setForm({ ...form, backgroundType: 'image' })}
              className={`p-4 rounded-xl border text-left flex items-center gap-3 transition-all ${
                form.backgroundType === 'image'
                  ? 'border-[#C59A4E] bg-white ring-2 ring-[#C59A4E]/20 shadow-xs'
                  : 'border-[#E6DECE] bg-white/60 hover:bg-white text-[#6B7280]'
              }`}
            >
              <ImageIcon className={`w-5 h-5 ${form.backgroundType === 'image' ? 'text-[#926E28]' : 'text-gray-400'}`} />
              <div>
                <span className="block text-xs font-bold text-[#191C1E]">High-Res Image</span>
                <span className="text-[11px] text-[#6B7280]">Atmospheric architectural studio render</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setForm({ ...form, backgroundType: 'youtube' })}
              className={`p-4 rounded-xl border text-left flex items-center gap-3 transition-all ${
                form.backgroundType === 'youtube'
                  ? 'border-[#C59A4E] bg-white ring-2 ring-[#C59A4E]/20 shadow-xs'
                  : 'border-[#E6DECE] bg-white/60 hover:bg-white text-[#6B7280]'
              }`}
            >
              <Video className={`w-5 h-5 ${form.backgroundType === 'youtube' ? 'text-[#926E28]' : 'text-gray-400'}`} />
              <div>
                <span className="block text-xs font-bold text-[#191C1E]">YouTube Ambient Video</span>
                <span className="text-[11px] text-[#6B7280]">Muted, looped background stream</span>
              </div>
            </button>
          </div>
        </div>

        {/* Media URLs */}
        {form.backgroundType === 'image' ? (
          <div>
            <label className="block text-xs font-semibold text-[#191C1E] mb-1.5">
              Hero Image URL (or ImgBB Link)
            </label>
            <input
              type="text"
              required
              value={form.imageUrl}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              className="w-full px-3.5 py-2.5 text-xs text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-xl focus:outline-none focus:border-[#B58A3E]"
            />
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1.5">
                YouTube Video URL
              </label>
              <input
                type="url"
                required
                placeholder="https://www.youtube.com/watch?v=..."
                value={form.youtubeUrl}
                onChange={(e) => setForm({ ...form, youtubeUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-xl focus:outline-none focus:border-[#B58A3E]"
              />
              <span className="text-[11px] text-[#6B7280] mt-1 block">
                Automatically converted into a muted, looping, responsive background video.
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1.5">
                Fallback Image URL (Mobile / Low Bandwidth)
              </label>
              <input
                type="text"
                value={form.fallbackImageUrl}
                onChange={(e) => setForm({ ...form, fallbackImageUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-xl focus:outline-none focus:border-[#B58A3E]"
              />
            </div>
          </div>
        )}

        {/* Overlay Opacity Slider */}
        <div className="p-4 bg-[#FAF8F5] border border-[#E6DECE] rounded-2xl">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold text-[#191C1E]">
              Scrim Overlay Opacity ({form.overlayOpacity}%)
            </label>
            <span className="text-xs text-[#6B7280]">Ensures high readability contrast</span>
          </div>
          <input
            type="range"
            min="10"
            max="90"
            value={form.overlayOpacity}
            onChange={(e) => setForm({ ...form, overlayOpacity: parseInt(e.target.value, 10) })}
            className="w-full accent-[#B58A3E]"
          />
        </div>

        {/* Copy Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold text-[#191C1E] mb-1.5">
              Headline Prefix
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-3.5 py-2.5 text-xs text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-xl focus:outline-none focus:border-[#B58A3E]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#191C1E] mb-1.5">
              Highlighted Headline Phrase
            </label>
            <input
              type="text"
              value={form.highlightedText}
              onChange={(e) => setForm({ ...form, highlightedText: e.target.value })}
              className="w-full px-3.5 py-2.5 text-xs text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-xl focus:outline-none focus:border-[#B58A3E]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#191C1E] mb-1.5">
            Hero Value Proposition Copy
          </label>
          <textarea
            rows={3}
            value={form.subtitle}
            onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
            className="w-full px-3.5 py-2.5 text-xs text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-xl focus:outline-none focus:border-[#B58A3E] resize-none"
          />
        </div>

        {/* CTA Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-4 bg-[#FAF8F5] border border-[#E6DECE] rounded-xl space-y-3">
            <span className="text-xs font-bold text-[#806429] uppercase tracking-wider block">
              Primary Button
            </span>
            <div>
              <label className="block text-[11px] text-[#6B7280] mb-1">Label</label>
              <input
                type="text"
                value={form.primaryButtonText}
                onChange={(e) => setForm({ ...form, primaryButtonText: e.target.value })}
                className="w-full px-3 py-2 text-xs text-[#191C1E] bg-white border border-[#E6DECE] rounded-lg"
              />
            </div>
            <div>
              <label className="block text-[11px] text-[#6B7280] mb-1">Target URL</label>
              <input
                type="text"
                value={form.primaryButtonUrl}
                onChange={(e) => setForm({ ...form, primaryButtonUrl: e.target.value })}
                className="w-full px-3 py-2 text-xs text-[#191C1E] bg-white border border-[#E6DECE] rounded-lg"
              />
            </div>
          </div>

          <div className="p-4 bg-[#FAF8F5] border border-[#E6DECE] rounded-xl space-y-3">
            <span className="text-xs font-bold text-[#806429] uppercase tracking-wider block">
              Secondary Button
            </span>
            <div>
              <label className="block text-[11px] text-[#6B7280] mb-1">Label</label>
              <input
                type="text"
                value={form.secondaryButtonText}
                onChange={(e) => setForm({ ...form, secondaryButtonText: e.target.value })}
                className="w-full px-3 py-2 text-xs text-[#191C1E] bg-white border border-[#E6DECE] rounded-lg"
              />
            </div>
            <div>
              <label className="block text-[11px] text-[#6B7280] mb-1">Target URL</label>
              <input
                type="text"
                value={form.secondaryButtonUrl}
                onChange={(e) => setForm({ ...form, secondaryButtonUrl: e.target.value })}
                className="w-full px-3 py-2 text-xs text-[#191C1E] bg-white border border-[#E6DECE] rounded-lg"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-[#F0E8D9] flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 text-xs font-semibold text-white bg-[#191C1E] hover:bg-[#2B2F34] rounded-xl transition-all shadow-md flex items-center gap-2"
          >
            <Save className="w-3.5 h-3.5 text-[#C59A4E]" />
            <span>Save Hero Configuration</span>
          </button>
        </div>
      </form>
    </div>
  );
};
