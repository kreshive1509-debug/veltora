import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import {
  Save,
  Check,
  Sparkles,
  Eye,
  Sliders,
  Palette,
  Type,
  Layout,
  Upload,
  Layers,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  ExternalLink,
  Info,
} from 'lucide-react';
import {
  THEME_PRESETS,
  SUPPORTED_HEADING_FONTS,
  SUPPORTED_BODY_FONTS,
} from '../../lib/brandTheme';
import { uploadImageToImgBB } from '../../lib/imgbb';
import { ThemePresetKey } from '../../types';

export const AdminBrandAppearance: React.FC = () => {
  const {
    siteSettings,
    brandAppearance,
    updateSiteSettings,
    updateBrandAppearance,
    applyBrandPreset,
    addMediaItem,
  } = useCms();

  const [activeTab, setActiveTab] = useState<'identity' | 'logos' | 'colors' | 'typography' | 'visuals' | 'preview'>('identity');
  const [siteForm, setSiteForm] = useState(siteSettings);
  const [brandForm, setBrandForm] = useState(brandAppearance);
  const [uploadingField, setUploadingField] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  // Sync state if external changes happen
  const handlePresetSelect = (presetKey: ThemePresetKey) => {
    const preset = THEME_PRESETS.find((p) => p.key === presetKey);
    if (preset) {
      setBrandForm((prev) => ({
        ...prev,
        preset: presetKey,
        colors: { ...preset.colors },
      }));
    }
  };

  const handleFileUpload = async (field: string, file: File) => {
    try {
      setUploadingField(field);
      const res = await uploadImageToImgBB(file);
      if (res.url) {
        setSiteForm((prev) => ({ ...prev, [field]: res.url }));
        addMediaItem({
          fileName: file.name,
          url: res.url,
          type: file.type,
          altText: `${field} logo/icon asset`,
          usedIn: ['Brand & Appearance', field],
        });
      }
    } catch (err) {
      console.error('Failed to upload image asset', err);
    } finally {
      setUploadingField(null);
    }
  };

  const handleSaveAll = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    updateSiteSettings(siteForm);
    updateBrandAppearance(brandForm);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-6xl pb-16">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-[#E6DECE] p-6 lg:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#B58A3E] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Brand & Appearance Engine
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#FAF8F5] border border-[#E6DECE] text-[#5F6368] font-mono">
              v2.0 CMS
            </span>
          </div>
          <h1 className="font-display text-2xl lg:text-3xl font-bold text-[#191C1E] tracking-tight">
            Visual Identity & Global Styling
          </h1>
          <p className="text-xs text-[#5F6368] mt-1 max-w-xl">
            Control the entire aesthetic identity, logo variants, luxury themes, typography, and container metrics without modifying source code.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {saved && (
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3.5 py-2 rounded-xl flex items-center gap-1.5 animate-in fade-in">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Theme Applied & Saved</span>
            </span>
          )}
          <button
            type="button"
            onClick={() => handleSaveAll()}
            className="px-6 py-2.5 text-xs font-semibold text-white bg-[#191C1E] hover:bg-[#2B2F34] rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-3.5 h-3.5 text-[#C59A4E]" />
            <span>Publish Branding Changes</span>
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#E6DECE]">
        {[
          { id: 'identity', label: 'Company Identity', icon: Info },
          { id: 'logos', label: 'Logos & App Icons', icon: Upload },
          { id: 'colors', label: 'Theme Presets & Colors', icon: Palette },
          { id: 'typography', label: 'Typography Engine', icon: Type },
          { id: 'visuals', label: 'Global Visuals & Metrics', icon: Sliders },
          { id: 'preview', label: 'Live Brand Preview', icon: Eye },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-[#191C1E] text-white shadow-xs'
                  : 'bg-white text-[#5F6368] hover:text-[#191C1E] border border-[#E6DECE] hover:border-[#B58A3E]'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#C59A4E]' : 'text-[#8C9199]'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: Company Identity */}
      {activeTab === 'identity' && (
        <div className="bg-white rounded-3xl border border-[#E6DECE] p-6 lg:p-8 shadow-xs space-y-6">
          <div className="border-b border-[#F0E8D9] pb-4">
            <h2 className="font-display text-lg font-bold text-[#191C1E]">
              Corporate & Public Identity
            </h2>
            <p className="text-xs text-[#5F6368] mt-0.5">
              These values automatically populate headers, footers, contact links, and structured SEO schema.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1.5">
                Full Company Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={siteForm.companyName}
                onChange={(e) => setSiteForm({ ...siteForm, companyName: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-xl focus:outline-none focus:border-[#B58A3E]"
                placeholder="e.g. Veltora IT Solutions"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1.5">
                Short Name / Brand Mark
              </label>
              <input
                type="text"
                value={siteForm.shortName}
                onChange={(e) => setSiteForm({ ...siteForm, shortName: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-xl focus:outline-none focus:border-[#B58A3E]"
                placeholder="e.g. Veltora"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1.5">
                Company Tagline <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={siteForm.tagline}
                onChange={(e) => setSiteForm({ ...siteForm, tagline: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-xl focus:outline-none focus:border-[#B58A3E]"
                placeholder="e.g. Innovating Dreams"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1.5">
                Founded Year
              </label>
              <input
                type="text"
                value={siteForm.foundedYear}
                onChange={(e) => setSiteForm({ ...siteForm, foundedYear: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-xl focus:outline-none focus:border-[#B58A3E]"
                placeholder="e.g. 2024"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#191C1E] mb-1.5">
              Brand Positioning Statement / Editorial Description
            </label>
            <textarea
              rows={3}
              value={siteForm.brandDescription}
              onChange={(e) => setSiteForm({ ...siteForm, brandDescription: e.target.value })}
              className="w-full px-3.5 py-2.5 text-xs text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-xl focus:outline-none focus:border-[#B58A3E] resize-none"
              placeholder="Veltora is an emerging student-founded technology company..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1.5">
                Primary Business Email
              </label>
              <input
                type="email"
                required
                value={siteForm.primaryEmail}
                onChange={(e) => setSiteForm({ ...siteForm, primaryEmail: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-xl focus:outline-none focus:border-[#B58A3E]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1.5">
                Direct Phone Number
              </label>
              <input
                type="text"
                required
                value={siteForm.phone}
                onChange={(e) => setSiteForm({ ...siteForm, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-xl focus:outline-none focus:border-[#B58A3E]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1.5">
                WhatsApp Dispatch Number
              </label>
              <input
                type="text"
                required
                value={siteForm.whatsapp}
                onChange={(e) => setSiteForm({ ...siteForm, whatsapp: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-xl focus:outline-none focus:border-[#B58A3E]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1.5">
                Office / Hub Location
              </label>
              <input
                type="text"
                value={siteForm.address}
                onChange={(e) => setSiteForm({ ...siteForm, address: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-xl focus:outline-none focus:border-[#B58A3E]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1.5">
                Operating Business Hours
              </label>
              <input
                type="text"
                value={siteForm.businessHours}
                onChange={(e) => setSiteForm({ ...siteForm, businessHours: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-xl focus:outline-none focus:border-[#B58A3E]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1.5">
                Copyright Notice
              </label>
              <input
                type="text"
                value={siteForm.copyright}
                onChange={(e) => setSiteForm({ ...siteForm, copyright: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-xl focus:outline-none focus:border-[#B58A3E]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1.5">
                Developer Credit Text
              </label>
              <input
                type="text"
                value={siteForm.developerCredit}
                onChange={(e) => setSiteForm({ ...siteForm, developerCredit: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-xl focus:outline-none focus:border-[#B58A3E]"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Logos & App Icons */}
      {activeTab === 'logos' && (
        <div className="bg-white rounded-3xl border border-[#E6DECE] p-6 lg:p-8 shadow-xs space-y-8">
          <div className="border-b border-[#F0E8D9] pb-4">
            <h2 className="font-display text-lg font-bold text-[#191C1E]">
              Logo Assets & Application Icons
            </h2>
            <p className="text-xs text-[#5F6368] mt-0.5">
              Upload distinct variants for navbar, footer, mobile view, admin console, and browser favicons.
            </p>
          </div>

          {/* Primary Logo Variants */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Primary Logo */}
            <div className="border border-[#E6DECE] rounded-2xl p-5 bg-[#FAF8F5] space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-[#191C1E]">Primary Master Logo</h3>
                <span className="text-[10px] px-2 py-0.5 rounded bg-white text-[#B58A3E] font-medium border border-[#E6DECE]">
                  Default
                </span>
              </div>
              <p className="text-[11px] text-[#5F6368]">
                Standard full-color brand mark used when no specific variant is chosen.
              </p>
              <div className="h-16 rounded-xl bg-white border border-[#E6DECE] flex items-center justify-center p-2 overflow-hidden">
                {siteForm.primaryLogoUrl ? (
                  <img src={siteForm.primaryLogoUrl} alt="Primary Logo" className="max-h-12 object-contain" />
                ) : (
                  <span className="text-xs font-serif-luxury font-bold text-[#B58A3E]">
                    {siteForm.companyName || 'Veltora'}
                  </span>
                )}
              </div>
              <input
                type="text"
                placeholder="Image URL or upload below"
                value={siteForm.primaryLogoUrl || ''}
                onChange={(e) => setSiteForm({ ...siteForm, primaryLogoUrl: e.target.value })}
                className="w-full px-3 py-2 text-[11px] bg-white border border-[#E6DECE] rounded-lg focus:outline-none"
              />
              <label className="inline-flex items-center justify-center gap-1.5 w-full py-2 bg-white hover:bg-[#F5F2EB] text-[#191C1E] border border-[#E6DECE] rounded-lg text-xs font-semibold cursor-pointer transition-colors">
                <Upload className="w-3.5 h-3.5 text-[#B58A3E]" />
                <span>{uploadingField === 'primaryLogoUrl' ? 'Uploading...' : 'Upload via ImgBB'}</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleFileUpload('primaryLogoUrl', e.target.files[0])}
                />
              </label>
            </div>

            {/* Light Logo (For Dark Backgrounds) */}
            <div className="border border-[#E6DECE] rounded-2xl p-5 bg-[#FAF8F5] space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-[#191C1E]">Light Logo (Inverted)</h3>
                <span className="text-[10px] px-2 py-0.5 rounded bg-white text-[#5F6368] font-medium border border-[#E6DECE]">
                  For Dark Panels
                </span>
              </div>
              <p className="text-[11px] text-[#5F6368]">
                White or champagne light variant for dark headers and footer cards.
              </p>
              <div className="h-16 rounded-xl bg-[#191C1E] border border-[#2C3035] flex items-center justify-center p-2 overflow-hidden">
                {siteForm.lightLogoUrl ? (
                  <img src={siteForm.lightLogoUrl} alt="Light Logo" className="max-h-12 object-contain" />
                ) : (
                  <span className="text-xs font-serif-luxury font-bold text-white">
                    {siteForm.companyName || 'Veltora'}
                  </span>
                )}
              </div>
              <input
                type="text"
                placeholder="Image URL or upload below"
                value={siteForm.lightLogoUrl || ''}
                onChange={(e) => setSiteForm({ ...siteForm, lightLogoUrl: e.target.value })}
                className="w-full px-3 py-2 text-[11px] bg-white border border-[#E6DECE] rounded-lg focus:outline-none"
              />
              <label className="inline-flex items-center justify-center gap-1.5 w-full py-2 bg-white hover:bg-[#F5F2EB] text-[#191C1E] border border-[#E6DECE] rounded-lg text-xs font-semibold cursor-pointer transition-colors">
                <Upload className="w-3.5 h-3.5 text-[#B58A3E]" />
                <span>{uploadingField === 'lightLogoUrl' ? 'Uploading...' : 'Upload via ImgBB'}</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleFileUpload('lightLogoUrl', e.target.files[0])}
                />
              </label>
            </div>

            {/* Dark Logo (For Light Surfaces) */}
            <div className="border border-[#E6DECE] rounded-2xl p-5 bg-[#FAF8F5] space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-[#191C1E]">Dark Logo (Monochrome)</h3>
                <span className="text-[10px] px-2 py-0.5 rounded bg-white text-[#5F6368] font-medium border border-[#E6DECE]">
                  For Light Surfaces
                </span>
              </div>
              <p className="text-[11px] text-[#5F6368]">
                Deep charcoal or black version for clean, high-contrast displays.
              </p>
              <div className="h-16 rounded-xl bg-white border border-[#E6DECE] flex items-center justify-center p-2 overflow-hidden">
                {siteForm.darkLogoUrl ? (
                  <img src={siteForm.darkLogoUrl} alt="Dark Logo" className="max-h-12 object-contain" />
                ) : (
                  <span className="text-xs font-serif-luxury font-bold text-[#191C1E]">
                    {siteForm.companyName || 'Veltora'}
                  </span>
                )}
              </div>
              <input
                type="text"
                placeholder="Image URL or upload below"
                value={siteForm.darkLogoUrl || ''}
                onChange={(e) => setSiteForm({ ...siteForm, darkLogoUrl: e.target.value })}
                className="w-full px-3 py-2 text-[11px] bg-white border border-[#E6DECE] rounded-lg focus:outline-none"
              />
              <label className="inline-flex items-center justify-center gap-1.5 w-full py-2 bg-white hover:bg-[#F5F2EB] text-[#191C1E] border border-[#E6DECE] rounded-lg text-xs font-semibold cursor-pointer transition-colors">
                <Upload className="w-3.5 h-3.5 text-[#B58A3E]" />
                <span>{uploadingField === 'darkLogoUrl' ? 'Uploading...' : 'Upload via ImgBB'}</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleFileUpload('darkLogoUrl', e.target.files[0])}
                />
              </label>
            </div>
          </div>

          {/* Contextual Logo Configuration */}
          <div className="border-t border-[#F0E8D9] pt-6 space-y-6">
            <h3 className="font-display text-base font-bold text-[#191C1E]">
              Location-Specific Logo Assignments
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Navbar Logo Selection */}
              <div className="p-5 rounded-2xl border border-[#E6DECE] bg-[#FAF8F5] space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-[#191C1E]">Navigation Bar Logo</h4>
                  <span className="text-[10px] text-[#B58A3E] font-semibold">Public Header</span>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#5F6368] mb-1">
                    Variant Source
                  </label>
                  <select
                    value={siteForm.navbarLogoVariant || 'primary'}
                    onChange={(e) => setSiteForm({ ...siteForm, navbarLogoVariant: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg focus:outline-none"
                  >
                    <option value="primary">Use Primary Logo</option>
                    <option value="light">Use Light Logo</option>
                    <option value="dark">Use Dark Logo</option>
                    <option value="custom">Use Custom Navbar URL</option>
                  </select>
                </div>
                {siteForm.navbarLogoVariant === 'custom' && (
                  <div>
                    <input
                      type="text"
                      placeholder="Custom Navbar Logo URL"
                      value={siteForm.navbarLogoUrl || ''}
                      onChange={(e) => setSiteForm({ ...siteForm, navbarLogoUrl: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg focus:outline-none"
                    />
                  </div>
                )}
                <div>
                  <div className="flex justify-between text-[11px] font-semibold text-[#5F6368] mb-1">
                    <span>Navbar Logo Width</span>
                    <span className="font-mono text-[#B58A3E]">{siteForm.navbarLogoWidth || 140}px</span>
                  </div>
                  <input
                    type="range"
                    min="90"
                    max="240"
                    step="5"
                    value={siteForm.navbarLogoWidth || 140}
                    onChange={(e) => setSiteForm({ ...siteForm, navbarLogoWidth: parseInt(e.target.value) })}
                    className="w-full accent-[#B58A3E]"
                  />
                </div>
              </div>

              {/* Footer Logo Selection */}
              <div className="p-5 rounded-2xl border border-[#E6DECE] bg-[#FAF8F5] space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-[#191C1E]">Footer Logo</h4>
                  <span className="text-[10px] text-[#B58A3E] font-semibold">Public Footer</span>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#5F6368] mb-1">
                    Variant Source
                  </label>
                  <select
                    value={siteForm.footerLogoVariant || 'primary'}
                    onChange={(e) => setSiteForm({ ...siteForm, footerLogoVariant: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg focus:outline-none"
                  >
                    <option value="primary">Use Primary Logo</option>
                    <option value="light">Use Light Logo</option>
                    <option value="dark">Use Dark Logo</option>
                    <option value="custom">Use Custom Footer URL</option>
                  </select>
                </div>
                {siteForm.footerLogoVariant === 'custom' && (
                  <div>
                    <input
                      type="text"
                      placeholder="Custom Footer Logo URL"
                      value={siteForm.footerLogoUrl || ''}
                      onChange={(e) => setSiteForm({ ...siteForm, footerLogoUrl: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg focus:outline-none"
                    />
                  </div>
                )}
              </div>

              {/* Admin Portal Logo */}
              <div className="p-5 rounded-2xl border border-[#E6DECE] bg-[#FAF8F5] space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-[#191C1E]">Admin Console Logo</h4>
                  <span className="text-[10px] text-[#B58A3E] font-semibold">CMS Sidebar</span>
                </div>
                <input
                  type="text"
                  placeholder="Custom Admin Logo URL (defaults to light logo)"
                  value={siteForm.adminLogoUrl || ''}
                  onChange={(e) => setSiteForm({ ...siteForm, adminLogoUrl: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg focus:outline-none"
                />
              </div>

              {/* Login Page Logo */}
              <div className="p-5 rounded-2xl border border-[#E6DECE] bg-[#FAF8F5] space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-[#191C1E]">Login Gateway Logo</h4>
                  <span className="text-[10px] text-[#B58A3E] font-semibold">Auth Modal</span>
                </div>
                <input
                  type="text"
                  placeholder="Custom Login Logo URL"
                  value={siteForm.loginLogoUrl || ''}
                  onChange={(e) => setSiteForm({ ...siteForm, loginLogoUrl: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Favicons & App Icons */}
          <div className="border-t border-[#F0E8D9] pt-6 space-y-4">
            <h3 className="font-display text-base font-bold text-[#191C1E]">
              Favicon & App Icons
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-semibold text-[#191C1E] mb-1.5">
                  Browser Favicon URL (.ico / .png)
                </label>
                <input
                  type="text"
                  value={siteForm.faviconUrl || ''}
                  onChange={(e) => setSiteForm({ ...siteForm, faviconUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-xl focus:outline-none focus:border-[#B58A3E]"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#191C1E] mb-1.5">
                  Apple Touch Icon URL (180x180)
                </label>
                <input
                  type="text"
                  value={siteForm.appleTouchIconUrl || ''}
                  onChange={(e) => setSiteForm({ ...siteForm, appleTouchIconUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-xl focus:outline-none focus:border-[#B58A3E]"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#191C1E] mb-1.5">
                  Default Social Share Card (OG Image)
                </label>
                <input
                  type="text"
                  value={siteForm.ogDefaultImageUrl || ''}
                  onChange={(e) => setSiteForm({ ...siteForm, ogDefaultImageUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-xl focus:outline-none focus:border-[#B58A3E]"
                  placeholder="https://..."
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Theme Presets & Colors */}
      {activeTab === 'colors' && (
        <div className="bg-white rounded-3xl border border-[#E6DECE] p-6 lg:p-8 shadow-xs space-y-8">
          <div className="border-b border-[#F0E8D9] pb-4">
            <h2 className="font-display text-lg font-bold text-[#191C1E]">
              Theme Presets & Palette Engineering
            </h2>
            <p className="text-xs text-[#5F6368] mt-0.5">
              Select one of the carefully balanced light luxury presets, or fine-tune individual hex values.
            </p>
          </div>

          {/* Theme Presets Selector */}
          <div>
            <label className="block text-xs font-semibold text-[#191C1E] mb-3">
              Curated Light Luxury Presets
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {THEME_PRESETS.map((p) => {
                const isSelected = brandForm.preset === p.key;
                return (
                  <div
                    key={p.key}
                    onClick={() => handlePresetSelect(p.key)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer relative ${
                      isSelected
                        ? 'border-[#B58A3E] bg-[#FAF8F5] ring-2 ring-[#B58A3E]/30 shadow-xs'
                        : 'border-[#E6DECE] bg-white hover:border-[#B58A3E]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-[#191C1E]">{p.label}</span>
                      {isSelected && (
                        <span className="w-4 h-4 rounded-full bg-[#B58A3E] text-white flex items-center justify-center text-[9px]">
                          ✓
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-[#5F6368] mb-3 leading-relaxed">
                      {p.description}
                    </p>
                    <div className="flex items-center gap-1.5 pt-2 border-t border-[#E6DECE]">
                      <span
                        className="w-5 h-5 rounded-full border border-black/10 shadow-2xs"
                        style={{ backgroundColor: p.colors.backgroundColor }}
                        title="Background"
                      />
                      <span
                        className="w-5 h-5 rounded-full border border-black/10 shadow-2xs"
                        style={{ backgroundColor: p.colors.primaryColor }}
                        title="Primary"
                      />
                      <span
                        className="w-5 h-5 rounded-full border border-black/10 shadow-2xs"
                        style={{ backgroundColor: p.colors.accentColor }}
                        title="Accent"
                      />
                      <span
                        className="w-5 h-5 rounded-full border border-black/10 shadow-2xs"
                        style={{ backgroundColor: p.colors.secondaryColor }}
                        title="Secondary Text"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Granular Color Editor */}
          <div className="border-t border-[#F0E8D9] pt-6 space-y-4">
            <h3 className="font-display text-base font-bold text-[#191C1E]">
              Custom Color Palette (Hex Codes)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { key: 'primaryColor', label: 'Primary Brand Color', desc: 'Main brand elements & key CTA badges' },
                { key: 'secondaryColor', label: 'Secondary / Dark Tone', desc: 'Deep headings & high-contrast elements' },
                { key: 'accentColor', label: 'Champagne Accent', desc: 'Gold glows, highlights & stars' },
                { key: 'backgroundColor', label: 'Base Background', desc: 'Warm off-white global canvas' },
                { key: 'surfaceColor', label: 'Surface / Card Background', desc: 'Floating cards & elevated panels' },
                { key: 'textColor', label: 'Primary Body Text', desc: 'Main readable copy font color' },
                { key: 'mutedTextColor', label: 'Muted / Caption Text', desc: 'Subtitles & metadata text' },
                { key: 'borderColor', label: 'Refined Border Tone', desc: 'Subtle borders & dividing lines' },
              ].map((c) => {
                const val = (brandForm.colors as any)[c.key];
                return (
                  <div key={c.key} className="p-3.5 rounded-xl border border-[#E6DECE] bg-[#FAF8F5] space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-bold text-[#191C1E] truncate">
                        {c.label}
                      </label>
                      <input
                        type="color"
                        value={val}
                        onChange={(e) =>
                          setBrandForm({
                            ...brandForm,
                            preset: 'custom',
                            colors: { ...brandForm.colors, [c.key]: e.target.value },
                          })
                        }
                        className="w-6 h-6 rounded cursor-pointer border-0 bg-transparent"
                      />
                    </div>
                    <input
                      type="text"
                      value={val}
                      onChange={(e) =>
                        setBrandForm({
                          ...brandForm,
                          preset: 'custom',
                          colors: { ...brandForm.colors, [c.key]: e.target.value },
                        })
                      }
                      className="w-full px-2.5 py-1.5 text-xs font-mono uppercase bg-white border border-[#E6DECE] rounded-lg focus:outline-none"
                    />
                    <p className="text-[10px] text-[#5F6368] truncate">{c.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Typography Engine */}
      {activeTab === 'typography' && (
        <div className="bg-white rounded-3xl border border-[#E6DECE] p-6 lg:p-8 shadow-xs space-y-6">
          <div className="border-b border-[#F0E8D9] pb-4">
            <h2 className="font-display text-lg font-bold text-[#191C1E]">
              Typography System
            </h2>
            <p className="text-xs text-[#5F6368] mt-0.5">
              Select supported premium Google Fonts for headlines and body text to maintain luxury readability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1.5">
                Headline / Display Font Family
              </label>
              <select
                value={brandForm.typography.headingFont}
                onChange={(e) =>
                  setBrandForm({
                    ...brandForm,
                    typography: { ...brandForm.typography, headingFont: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 text-xs text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-xl focus:outline-none focus:border-[#B58A3E]"
              >
                {SUPPORTED_HEADING_FONTS.map((f) => (
                  <option key={f.value} value={f.value}>
                    {f.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1.5">
                Body & Interface Font Family
              </label>
              <select
                value={brandForm.typography.bodyFont}
                onChange={(e) =>
                  setBrandForm({
                    ...brandForm,
                    typography: { ...brandForm.typography, bodyFont: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 text-xs text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-xl focus:outline-none focus:border-[#B58A3E]"
              >
                {SUPPORTED_BODY_FONTS.map((f) => (
                  <option key={f.value} value={f.value}>
                    {f.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1.5">
                Headline Font Weight
              </label>
              <select
                value={brandForm.typography.headingWeight}
                onChange={(e) =>
                  setBrandForm({
                    ...brandForm,
                    typography: { ...brandForm.typography, headingWeight: e.target.value as any },
                  })
                }
                className="w-full px-3.5 py-2.5 text-xs text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-xl focus:outline-none focus:border-[#B58A3E]"
              >
                <option value="normal">Normal (400)</option>
                <option value="medium">Medium (500)</option>
                <option value="semibold">Semibold (600)</option>
                <option value="bold">Bold (700)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1.5">
                Heading Scale Hierarchy
              </label>
              <select
                value={brandForm.typography.headingScale}
                onChange={(e) =>
                  setBrandForm({
                    ...brandForm,
                    typography: { ...brandForm.typography, headingScale: e.target.value as any },
                  })
                }
                className="w-full px-3.5 py-2.5 text-xs text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-xl focus:outline-none focus:border-[#B58A3E]"
              >
                <option value="compact">Compact (Modern Enterprise)</option>
                <option value="balanced">Balanced (Recommended Light Luxury)</option>
                <option value="dramatic">Dramatic (Bold Editorial Focus)</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: Global Visuals & Metrics */}
      {activeTab === 'visuals' && (
        <div className="bg-white rounded-3xl border border-[#E6DECE] p-6 lg:p-8 shadow-xs space-y-6">
          <div className="border-b border-[#F0E8D9] pb-4">
            <h2 className="font-display text-lg font-bold text-[#191C1E]">
              Global Visual Settings & Layout Engine
            </h2>
            <p className="text-xs text-[#5F6368] mt-0.5">
              Control corner radiuses, card depth, button geometries, and animation fidelity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1.5">
                Border Radius Style
              </label>
              <select
                value={brandForm.visuals.borderRadius}
                onChange={(e) =>
                  setBrandForm({
                    ...brandForm,
                    visuals: { ...brandForm.visuals, borderRadius: e.target.value as any },
                  })
                }
                className="w-full px-3.5 py-2.5 text-xs text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-xl focus:outline-none"
              >
                <option value="sharp">Sharp (4px) — Minimal Architectural</option>
                <option value="subtle">Subtle (8px) — Clean Tech</option>
                <option value="modern">Modern (14px) — Contemporary</option>
                <option value="luxury">Luxury Rounded (24px) — Default Signature</option>
                <option value="pill">Full Pill (9999px) — Ultra Soft</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1.5">
                Card Elevation & Style
              </label>
              <select
                value={brandForm.visuals.cardStyle}
                onChange={(e) =>
                  setBrandForm({
                    ...brandForm,
                    visuals: { ...brandForm.visuals, cardStyle: e.target.value as any },
                  })
                }
                className="w-full px-3.5 py-2.5 text-xs text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-xl focus:outline-none"
              >
                <option value="glass">Subtle Glass Reflection</option>
                <option value="solid">Crisp Solid White</option>
                <option value="sand">Warm Travertine Sand</option>
                <option value="bordered">Minimal Border Focus</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1.5">
                Button Geometry
              </label>
              <select
                value={brandForm.visuals.buttonStyle}
                onChange={(e) =>
                  setBrandForm({
                    ...brandForm,
                    visuals: { ...brandForm.visuals, buttonStyle: e.target.value as any },
                  })
                }
                className="w-full px-3.5 py-2.5 text-xs text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-xl focus:outline-none"
              >
                <option value="rounded">Rounded Modern (12px)</option>
                <option value="pill">Pill Luxe (Fully Curved)</option>
                <option value="sharp">Sharp Editorial (4px)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1.5">
                Shadow Intensity
              </label>
              <select
                value={brandForm.visuals.shadowIntensity}
                onChange={(e) =>
                  setBrandForm({
                    ...brandForm,
                    visuals: { ...brandForm.visuals, shadowIntensity: e.target.value as any },
                  })
                }
                className="w-full px-3.5 py-2.5 text-xs text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-xl focus:outline-none"
              >
                <option value="none">Flat / No Shadow</option>
                <option value="minimal">Minimal Crisp</option>
                <option value="soft">Soft Ambient (Default)</option>
                <option value="deep">Luxury Depth</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1.5">
                Animation Intensity
              </label>
              <select
                value={brandForm.visuals.animationIntensity}
                onChange={(e) =>
                  setBrandForm({
                    ...brandForm,
                    visuals: { ...brandForm.visuals, animationIntensity: e.target.value as any },
                  })
                }
                className="w-full px-3.5 py-2.5 text-xs text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-xl focus:outline-none"
              >
                <option value="minimal">Minimal (Instant / Smooth)</option>
                <option value="balanced">Balanced (Subtle Parallax & Soft Reveals)</option>
                <option value="expressive">Expressive (Smooth Floating Cards)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1.5">
                Section Spacing
              </label>
              <select
                value={brandForm.visuals.sectionSpacing}
                onChange={(e) =>
                  setBrandForm({
                    ...brandForm,
                    visuals: { ...brandForm.visuals, sectionSpacing: e.target.value as any },
                  })
                }
                className="w-full px-3.5 py-2.5 text-xs text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-xl focus:outline-none"
              >
                <option value="compact">Compact (Tighter Spacing)</option>
                <option value="balanced">Balanced (Luxury Whitespace)</option>
                <option value="generous">Generous (Expansive Editorial)</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: Live Interactive Brand Preview */}
      {activeTab === 'preview' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-[#E6DECE] p-6 lg:p-8 shadow-xs">
            <div className="border-b border-[#F0E8D9] pb-4 mb-6">
              <h2 className="font-display text-lg font-bold text-[#191C1E]">
                Real-Time Branding Simulator
              </h2>
              <p className="text-xs text-[#5F6368] mt-0.5">
                Inspect how your current palette, typography, button geometries, and logo variant choices look in production.
              </p>
            </div>

            {/* Simulated Live Viewport */}
            <div
              className="rounded-3xl border border-[#E6DECE] p-6 md:p-10 space-y-12 shadow-sm transition-all"
              style={{
                backgroundColor: brandForm.colors.backgroundColor,
                color: brandForm.colors.textColor,
                fontFamily: brandForm.typography.bodyFont,
              }}
            >
              {/* 1. Navbar Simulation */}
              <div
                className="rounded-2xl border p-4 flex items-center justify-between shadow-xs transition-all"
                style={{
                  backgroundColor: brandForm.colors.surfaceColor,
                  borderColor: brandForm.colors.borderColor,
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs"
                    style={{
                      backgroundColor: brandForm.colors.primaryColor,
                      color: '#FFFFFF',
                    }}
                  >
                    V
                  </div>
                  <div>
                    <span
                      className="font-bold text-sm tracking-tight block"
                      style={{
                        fontFamily: brandForm.typography.headingFont,
                        color: brandForm.colors.secondaryColor,
                      }}
                    >
                      {siteForm.companyName || 'Veltora IT Solutions'}
                    </span>
                    <span
                      className="text-[10px] tracking-wider uppercase block"
                      style={{ color: brandForm.colors.mutedTextColor }}
                    >
                      {siteForm.tagline || 'Innovating Dreams'}
                    </span>
                  </div>
                </div>

                <div className="hidden md:flex items-center gap-6 text-xs font-semibold">
                  <span style={{ color: brandForm.colors.textColor }}>Services</span>
                  <span style={{ color: brandForm.colors.textColor }}>Our Work</span>
                  <span style={{ color: brandForm.colors.textColor }}>Partners</span>
                  <span style={{ color: brandForm.colors.textColor }}>Inside Veltora</span>
                </div>

                <button
                  className="px-4 py-2 text-xs font-semibold transition-all shadow-xs"
                  style={{
                    backgroundColor: brandForm.colors.primaryColor,
                    color: '#FFFFFF',
                    borderRadius:
                      brandForm.visuals.buttonStyle === 'pill'
                        ? '9999px'
                        : brandForm.visuals.buttonStyle === 'sharp'
                        ? '4px'
                        : '12px',
                  }}
                >
                  Start a Project
                </button>
              </div>

              {/* 2. Hero Headline Simulation */}
              <div className="text-center max-w-2xl mx-auto space-y-4 py-4">
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border shadow-2xs"
                  style={{
                    backgroundColor: brandForm.colors.surfaceColor,
                    borderColor: brandForm.colors.borderColor,
                    color: brandForm.colors.primaryColor,
                  }}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Student-Founded Technology Enterprise
                </span>

                <h1
                  className="text-3xl md:text-5xl font-bold tracking-tight leading-tight"
                  style={{
                    fontFamily: brandForm.typography.headingFont,
                    color: brandForm.colors.secondaryColor,
                  }}
                >
                  Turning Ideas Into{' '}
                  <span style={{ color: brandForm.colors.primaryColor }}>
                    Digital Reality.
                  </span>
                </h1>

                <p
                  className="text-xs md:text-sm leading-relaxed"
                  style={{ color: brandForm.colors.mutedTextColor }}
                >
                  Veltora is an emerging technology company delivering bespoke software engineering, modern digital products, automated workflows, and high-impact technical training.
                </p>

                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    className="px-6 py-2.5 text-xs font-semibold transition-all shadow-md flex items-center gap-2"
                    style={{
                      backgroundColor: brandForm.colors.primaryColor,
                      color: '#FFFFFF',
                      borderRadius:
                        brandForm.visuals.buttonStyle === 'pill'
                          ? '9999px'
                          : brandForm.visuals.buttonStyle === 'sharp'
                          ? '4px'
                          : '12px',
                    }}
                  >
                    <span>Start a Project</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    className="px-6 py-2.5 text-xs font-semibold border transition-all"
                    style={{
                      backgroundColor: brandForm.colors.surfaceColor,
                      borderColor: brandForm.colors.borderColor,
                      color: brandForm.colors.secondaryColor,
                      borderRadius:
                        brandForm.visuals.buttonStyle === 'pill'
                          ? '9999px'
                          : brandForm.visuals.buttonStyle === 'sharp'
                          ? '4px'
                          : '12px',
                    }}
                  >
                    Explore Our Work
                  </button>
                </div>
              </div>

              {/* 3. Card Preview Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                {[
                  {
                    title: 'Bespoke Software Engineering',
                    cat: 'Architecture',
                    desc: 'High-performance distributed systems, cloud microservices, and secure APIs.',
                  },
                  {
                    title: 'Digital Products & SaaS',
                    cat: 'Full-Stack',
                    desc: 'Luminous web interfaces, modern dashboards, and responsive web apps.',
                  },
                  {
                    title: 'Intelligent Automations',
                    cat: 'Pipelines',
                    desc: 'Workflow automation, asynchronous queues, and smart enterprise logic.',
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-6 border transition-all space-y-3"
                    style={{
                      backgroundColor: brandForm.colors.surfaceColor,
                      borderColor: brandForm.colors.borderColor,
                      borderRadius:
                        brandForm.visuals.borderRadius === 'luxury'
                          ? '24px'
                          : brandForm.visuals.borderRadius === 'modern'
                          ? '14px'
                          : brandForm.visuals.borderRadius === 'subtle'
                          ? '8px'
                          : brandForm.visuals.borderRadius === 'pill'
                          ? '32px'
                          : '4px',
                    }}
                  >
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider block"
                      style={{ color: brandForm.colors.primaryColor }}
                    >
                      {item.cat}
                    </span>
                    <h3
                      className="text-base font-bold"
                      style={{
                        fontFamily: brandForm.typography.headingFont,
                        color: brandForm.colors.secondaryColor,
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-xs leading-relaxed"
                      style={{ color: brandForm.colors.mutedTextColor }}
                    >
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
