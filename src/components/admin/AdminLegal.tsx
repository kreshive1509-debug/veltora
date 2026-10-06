import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { Save, Check, ShieldCheck, FileText } from 'lucide-react';

export const AdminLegal: React.FC = () => {
  const { legalPages, updateLegalPage } = useCms();
  const [activeSlug, setActiveSlug] = useState<'privacy-policy' | 'terms-and-conditions' | 'cookie-policy'>('privacy-policy');
  const [pageForms, setPageForms] = useState(legalPages);
  const [saved, setSaved] = useState(false);

  const currentPage = pageForms[activeSlug] || {
    slug: activeSlug,
    title: activeSlug.replace('-', ' ').toUpperCase(),
    lastUpdated: 'March 2026',
    content: '',
    isPublished: true,
  };

  const handleFieldChange = (field: string, value: any) => {
    setPageForms((prev) => ({
      ...prev,
      [activeSlug]: {
        ...prev[activeSlug],
        [field]: value,
      },
    }));
  };

  const handleSave = () => {
    updateLegalPage(activeSlug, pageForms[activeSlug]);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-5xl pb-16">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-[#E6DECE] p-6 lg:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#B58A3E] block mb-1">
            Compliance & Policies
          </span>
          <h1 className="font-display text-2xl lg:text-3xl font-bold text-[#191C1E]">
            Legal Policies Management
          </h1>
          <p className="text-xs text-[#5F6368] mt-1">
            Maintain and publish Privacy Policy, Terms of Service, and Cookie Policy documents.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {saved && (
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5 animate-in fade-in">
              <Check className="w-3.5 h-3.5" />
              Policy Updated
            </span>
          )}
          <button
            onClick={handleSave}
            className="px-6 py-2.5 text-xs font-semibold text-white bg-[#191C1E] hover:bg-[#2B2F34] rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-3.5 h-3.5 text-[#C59A4E]" />
            <span>Save Current Policy</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#E6DECE]">
        {[
          { id: 'privacy-policy', label: 'Privacy Policy' },
          { id: 'terms-and-conditions', label: 'Terms & Conditions' },
          { id: 'cookie-policy', label: 'Cookie Policy' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSlug(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeSlug === tab.id
                ? 'bg-[#191C1E] text-white shadow-xs'
                : 'bg-white text-[#5F6368] hover:text-[#191C1E] border border-[#E6DECE]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Editor Card */}
      <div className="bg-white rounded-3xl border border-[#E6DECE] p-6 lg:p-8 shadow-xs space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold text-[#191C1E] mb-1.5">
              Document Title
            </label>
            <input
              type="text"
              value={currentPage.title}
              onChange={(e) => handleFieldChange('title', e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-xl focus:outline-none focus:border-[#B58A3E]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#191C1E] mb-1.5">
              Last Updated Revision Date
            </label>
            <input
              type="text"
              value={currentPage.lastUpdated}
              onChange={(e) => handleFieldChange('lastUpdated', e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-xl focus:outline-none focus:border-[#B58A3E]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#191C1E] mb-1.5">
            Document Policy Content (Markdown Supported)
          </label>
          <textarea
            rows={12}
            value={currentPage.content}
            onChange={(e) => handleFieldChange('content', e.target.value)}
            className="w-full px-4 py-3 text-xs font-mono text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-xl focus:outline-none focus:border-[#B58A3E] leading-relaxed resize-y"
          />
        </div>

        <div className="flex items-center gap-6 pt-2">
          <label className="flex items-center gap-2 text-xs font-medium text-[#191C1E] cursor-pointer">
            <input
              type="checkbox"
              checked={currentPage.isPublished}
              onChange={(e) => handleFieldChange('isPublished', e.target.checked)}
              className="accent-[#B58A3E]"
            />
            <span>Published & Accessible Publicly</span>
          </label>
        </div>
      </div>
    </div>
  );
};
