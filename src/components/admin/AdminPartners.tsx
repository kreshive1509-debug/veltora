import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { Partner, PartnershipType } from '../../types';
import { uploadImageToImgBB } from '../../lib/imgbb';
import { Plus, Edit2, Trash2, Save, Upload, ExternalLink } from 'lucide-react';

export const AdminPartners: React.FC = () => {
  const { partners, addPartner, updatePartner, deletePartner } = useCms();
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPartner) return;

    if (isCreating) {
      const { id, ...rest } = editingPartner;
      addPartner(rest);
    } else {
      updatePartner(editingPartner.id, editingPartner);
    }
    setEditingPartner(null);
    setIsCreating(false);
  };

  const startCreate = () => {
    setIsCreating(true);
    setEditingPartner({
      id: 'temp',
      name: '',
      slug: '',
      logoUrl: '/src/assets/images/partner_innovation_lab_1791104323216.jpg',
      coverImageUrl: '/src/assets/images/partner_innovation_lab_1791104323216.jpg',
      shortDescription: '',
      description: '',
      partnershipType: 'Strategic Partner',
      partnershipDate: 'Established 2026',
      location: 'India',
      websiteUrl: '',
      linkedinUrl: '',
      instagramUrl: '',
      highlights: ['Joint Technology Collaboration'],
      isFeatured: true,
      isActive: true,
      hasDetailPage: true,
      displayOrder: partners.length + 1,
    });
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingPartner) return;

    setUploadingLogo(true);
    try {
      const res = await uploadImageToImgBB(file);
      setEditingPartner({ ...editingPartner, logoUrl: res.url });
    } catch (err) {
      alert('Failed to upload logo.');
    } finally {
      setUploadingLogo(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-[#E6DECE] p-8 shadow-xs max-w-5xl">
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-[#F0E8D9]">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#926E28] block mb-1">
            Ecosystem Alliances
          </span>
          <h1 className="font-display text-2xl font-bold text-[#191C1E]">
            Our Partners & Collaborations CRUD
          </h1>
        </div>
        <button
          onClick={startCreate}
          className="px-4 py-2 text-xs font-semibold text-white bg-[#191C1E] hover:bg-[#2B2F34] rounded-xl transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5 text-[#C59A4E]" />
          <span>Add Partner</span>
        </button>
      </div>

      {editingPartner ? (
        <form onSubmit={handleSave} className="space-y-4 p-6 bg-[#FAF8F5] rounded-2xl border border-[#E6DECE]">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold text-[#191C1E]">
              {isCreating ? 'Add Partner' : `Editing Partner: ${editingPartner.name}`}
            </h3>
            <button
              type="button"
              onClick={() => setEditingPartner(null)}
              className="text-xs text-[#6B7280]"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1">Partner Name *</label>
              <input
                type="text"
                required
                value={editingPartner.name}
                onChange={(e) => {
                  const val = e.target.value;
                  const slug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                  setEditingPartner({ ...editingPartner, name: val, slug });
                }}
                className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1">Slug *</label>
              <input
                type="text"
                required
                value={editingPartner.slug}
                onChange={(e) => setEditingPartner({ ...editingPartner, slug: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1">Partnership Type</label>
              <select
                value={editingPartner.partnershipType}
                onChange={(e) =>
                  setEditingPartner({
                    ...editingPartner,
                    partnershipType: e.target.value as PartnershipType,
                  })
                }
                className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg"
              >
                <option value="Strategic Partner">Strategic Partner</option>
                <option value="Technology Partner">Technology Partner</option>
                <option value="Education Partner">Education Partner</option>
                <option value="Training Partner">Training Partner</option>
                <option value="CSR Partner">CSR Partner</option>
                <option value="Collaboration">Collaboration</option>
                <option value="Community Partner">Community Partner</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1">Logo URL (or Upload)</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  required
                  value={editingPartner.logoUrl}
                  onChange={(e) => setEditingPartner({ ...editingPartner, logoUrl: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg"
                />
                <label className="p-2 bg-[#191C1E] text-white rounded-lg cursor-pointer shrink-0" title="Upload via ImgBB">
                  <Upload className="w-3.5 h-3.5 text-[#C59A4E]" />
                  <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                </label>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1">Cover Image URL</label>
              <input
                type="text"
                value={editingPartner.coverImageUrl || ''}
                onChange={(e) => setEditingPartner({ ...editingPartner, coverImageUrl: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1">Website URL</label>
              <input
                type="url"
                value={editingPartner.websiteUrl || ''}
                onChange={(e) => setEditingPartner({ ...editingPartner, websiteUrl: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1">Location</label>
              <input
                type="text"
                value={editingPartner.location || ''}
                onChange={(e) => setEditingPartner({ ...editingPartner, location: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1">Partnership Date</label>
              <input
                type="text"
                value={editingPartner.partnershipDate || ''}
                onChange={(e) => setEditingPartner({ ...editingPartner, partnershipDate: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#191C1E] mb-1">Short Description (for Homepage Card)</label>
            <input
              type="text"
              required
              value={editingPartner.shortDescription}
              onChange={(e) => setEditingPartner({ ...editingPartner, shortDescription: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#191C1E] mb-1">Full Collaboration Description</label>
            <textarea
              rows={3}
              required
              value={editingPartner.description}
              onChange={(e) => setEditingPartner({ ...editingPartner, description: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg resize-none"
            />
          </div>

          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 text-xs text-[#191C1E] cursor-pointer">
              <input
                type="checkbox"
                checked={editingPartner.isFeatured}
                onChange={(e) => setEditingPartner({ ...editingPartner, isFeatured: e.target.checked })}
              />
              <span>Feature on Homepage "Our Partners"</span>
            </label>
            <label className="flex items-center gap-2 text-xs text-[#191C1E] cursor-pointer">
              <input
                type="checkbox"
                checked={editingPartner.hasDetailPage}
                onChange={(e) => setEditingPartner({ ...editingPartner, hasDetailPage: e.target.checked })}
              />
              <span>Enable Dedicated Detail Page (/partners/{editingPartner.slug})</span>
            </label>
            <label className="flex items-center gap-2 text-xs text-[#191C1E] cursor-pointer">
              <input
                type="checkbox"
                checked={editingPartner.isActive}
                onChange={(e) => setEditingPartner({ ...editingPartner, isActive: e.target.checked })}
              />
              <span>Is Active</span>
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setEditingPartner(null)}
              className="px-4 py-2 text-xs text-[#6B7280]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-[#191C1E] rounded-xl flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5 text-[#C59A4E]" />
              <span>Save Partner</span>
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-3">
          {partners.map((p) => (
            <div
              key={p.id}
              className="p-4 bg-[#FAF8F5] border border-[#E6DECE] rounded-2xl flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <img
                  src={p.logoUrl}
                  alt={p.name}
                  className="w-10 h-10 rounded-xl object-cover border border-[#E6DECE] bg-white p-1"
                />
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-bold text-[#191C1E]">{p.name}</span>
                    <span className="text-[10px] text-[#806429] uppercase">({p.partnershipType})</span>
                    {p.isFeatured && (
                      <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-semibold">
                        Featured on Home
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#6B7280] line-clamp-1">{p.shortDescription}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setIsCreating(false);
                    setEditingPartner(p);
                  }}
                  className="p-1.5 text-[#656A72] hover:text-[#191C1E] rounded-lg hover:bg-white border border-[#E6DECE]"
                  title="Edit Partner"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Delete partner ${p.name}?`)) deletePartner(p.id);
                  }}
                  className="p-1.5 text-red-600 hover:text-red-800 rounded-lg hover:bg-white border border-[#E6DECE]"
                  title="Delete Partner"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
