import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { Save, Check, ExternalLink, Plus, Trash2, GraduationCap } from 'lucide-react';
import { uploadImageToImgBB } from '../../lib/imgbb';

export const AdminCareers: React.FC = () => {
  const { careerSettings, updateCareerSettings, addMediaItem } = useCms();
  const [form, setForm] = useState(careerSettings);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateCareerSettings(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleFileUpload = async (file: File) => {
    try {
      setUploading(true);
      const res = await uploadImageToImgBB(file);
      if (res.url) {
        setForm((prev) => ({ ...prev, bannerUrl: res.url }));
        addMediaItem({
          fileName: file.name,
          url: res.url,
          type: file.type,
          altText: 'Career Section Banner',
          usedIn: ['Careers / Join Veltora'],
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleAddRole = () => {
    const newRole = {
      id: `role-${Date.now()}`,
      title: 'Software Development Fellow',
      department: 'Engineering',
      location: 'Remote',
      type: 'Fellowship',
      description: 'Design and deploy modern distributed web systems alongside core architects.',
    };
    setForm((prev) => ({ ...prev, openRoles: [...prev.openRoles, newRole] }));
  };

  const handleRemoveRole = (id: string) => {
    setForm((prev) => ({ ...prev, openRoles: prev.openRoles.filter((r) => r.id !== id) }));
  };

  return (
    <div className="space-y-6 max-w-5xl pb-16">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-[#E6DECE] p-6 lg:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#B58A3E] block mb-1">
            Talent & Fellowship Engine
          </span>
          <h1 className="font-display text-2xl lg:text-3xl font-bold text-[#191C1E]">
            Careers & Join Veltora CMS
          </h1>
          <p className="text-xs text-[#5F6368] mt-1">
            Configure the career page headline, open positions, perks, and official Google Form application routing.
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
            onClick={handleSubmit}
            className="px-6 py-2.5 text-xs font-semibold text-white bg-[#191C1E] hover:bg-[#2B2F34] rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-3.5 h-3.5 text-[#C59A4E]" />
            <span>Save Career Settings</span>
          </button>
        </div>
      </div>

      {/* Main Settings Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-[#E6DECE] p-6 lg:p-8 shadow-xs space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold text-[#191C1E] mb-1.5">
              Section Title
            </label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-3.5 py-2.5 text-xs text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-xl focus:outline-none focus:border-[#B58A3E]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#191C1E] mb-1.5">
              Subtitle / Badge
            </label>
            <input
              type="text"
              value={form.subtitle}
              onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
              className="w-full px-3.5 py-2.5 text-xs text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-xl focus:outline-none focus:border-[#B58A3E]"
            />
          </div>
        </div>

        {/* Google Form URL - Highlighted */}
        <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E6DECE] space-y-2">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold text-[#191C1E]">
              Official Google Form Application URL <span className="text-red-500">*</span>
            </label>
            <span className="text-[10px] text-[#B58A3E] font-semibold">
              External Google Form Gateway
            </span>
          </div>
          <div className="flex gap-2">
            <input
              type="url"
              required
              placeholder="https://docs.google.com/forms/d/e/.../viewform"
              value={form.googleFormUrl}
              onChange={(e) => setForm({ ...form, googleFormUrl: e.target.value })}
              className="flex-1 px-3.5 py-2.5 text-xs text-[#191C1E] bg-white border border-[#E6DECE] rounded-xl focus:outline-none focus:border-[#B58A3E]"
            />
            {form.googleFormUrl && (
              <a
                href={form.googleFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 text-xs font-semibold bg-white border border-[#E6DECE] text-[#191C1E] rounded-xl flex items-center gap-1.5 hover:bg-[#FAF8F5] cursor-pointer"
              >
                <span>Test Form</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#B58A3E]" />
              </a>
            )}
          </div>
          <p className="text-[11px] text-[#5F6368]">
            When candidates click "Apply" on the public website, this Google Form will safely open in a new tab.
          </p>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#191C1E] mb-1.5">
            Editorial Description
          </label>
          <textarea
            rows={3}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full px-3.5 py-2.5 text-xs text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-xl focus:outline-none focus:border-[#B58A3E] resize-none"
          />
        </div>

        {/* Roles List Editor */}
        <div className="border-t border-[#F0E8D9] pt-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-base font-bold text-[#191C1E]">
              Current Open Roles & Fellowships
            </h3>
            <button
              type="button"
              onClick={handleAddRole}
              className="px-3 py-1.5 text-xs font-semibold text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] hover:border-[#B58A3E] rounded-lg flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-[#B58A3E]" />
              <span>Add Role</span>
            </button>
          </div>

          <div className="space-y-4">
            {form.openRoles.map((role, idx) => (
              <div key={role.id} className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E6DECE] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#191C1E]">Position #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveRole(role.id)}
                    className="text-red-400 hover:text-red-600 p-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="Role Title"
                    value={role.title}
                    onChange={(e) => {
                      const updated = [...form.openRoles];
                      updated[idx].title = e.target.value;
                      setForm({ ...form, openRoles: updated });
                    }}
                    className="px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Department"
                    value={role.department}
                    onChange={(e) => {
                      const updated = [...form.openRoles];
                      updated[idx].department = e.target.value;
                      setForm({ ...form, openRoles: updated });
                    }}
                    className="px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Location / Remote"
                    value={role.location}
                    onChange={(e) => {
                      const updated = [...form.openRoles];
                      updated[idx].location = e.target.value;
                      setForm({ ...form, openRoles: updated });
                    }}
                    className="px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg focus:outline-none"
                  />
                </div>
                <textarea
                  rows={2}
                  placeholder="Role summary / responsibilities"
                  value={role.description}
                  onChange={(e) => {
                    const updated = [...form.openRoles];
                    updated[idx].description = e.target.value;
                    setForm({ ...form, openRoles: updated });
                  }}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg focus:outline-none resize-none"
                />
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};
