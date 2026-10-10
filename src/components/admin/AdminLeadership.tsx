import React, { useEffect, useMemo, useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { Leadership } from '../../types';
import { Save, Check, Plus, Trash2, Award, X } from 'lucide-react';

const makeEmptyLeadership = (order: number): Omit<Leadership, 'id'> => ({
  name: '',
  slug: '',
  roleType: 'founder',
  designation: '',
  shortBio: '',
  fullBio: '',
  photoUrl: '',
  linkedinUrl: '',
  instagramUrl: '',
  githubUrl: '',
  email: '',
  whatsapp: '',
  portfolioUrl: '',
  otherContactUrl: '',
  displayOrder: order,
  isActive: true,
});

const formatRoleLabel = (roleType: Leadership['roleType']) => {
  switch (roleType) {
    case 'founder':
      return 'Founder';
    case 'co_founder':
      return 'Co-Founder';
    default:
      return 'Other';
  }
};

const makeSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'leadership-profile';

export const AdminLeadership: React.FC = () => {
  const { leadership, updateLeadership, addLeadership, deleteLeadership } = useCms();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [draft, setDraft] = useState<Omit<Leadership, 'id'> | null>(null);
  const [saved, setSaved] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const currentLeader = useMemo(
    () => leadership.find((leader) => leader.id === editingId) || null,
    [leadership, editingId]
  );

  useEffect(() => {
    if (leadership.length === 0) {
      setEditingId(null);
      setIsCreating(false);
      setDraft(null);
      return;
    }

    if (isCreating) return;

    if (!editingId || !leadership.some((leader) => leader.id === editingId)) {
      const firstLeader = leadership[0];
      setEditingId(firstLeader.id);
      setDraft({
        ...firstLeader,
        linkedinUrl: firstLeader.linkedinUrl ?? '',
        instagramUrl: firstLeader.instagramUrl ?? '',
        githubUrl: firstLeader.githubUrl ?? '',
        email: firstLeader.email ?? '',
        whatsapp: firstLeader.whatsapp ?? '',
        portfolioUrl: firstLeader.portfolioUrl ?? '',
        otherContactUrl: firstLeader.otherContactUrl ?? '',
      });
    }
  }, [leadership, editingId, isCreating]);

  const openCreateForm = () => {
    setErrorMessage(null);
    setIsCreating(true);
    setEditingId(null);
    setDraft(makeEmptyLeadership(leadership.length + 1));
  };

  const openEditForm = (leaderId: string) => {
    const selected = leadership.find((leader) => leader.id === leaderId);
    if (!selected) return;
    setErrorMessage(null);
    setIsCreating(false);
    setEditingId(leaderId);
    setDraft({
      ...selected,
      linkedinUrl: selected.linkedinUrl ?? '',
      instagramUrl: selected.instagramUrl ?? '',
      githubUrl: selected.githubUrl ?? '',
      email: selected.email ?? '',
      whatsapp: selected.whatsapp ?? '',
      portfolioUrl: selected.portfolioUrl ?? '',
      otherContactUrl: selected.otherContactUrl ?? '',
    });
  };

  const handleFieldChange = <K extends keyof Omit<Leadership, 'id'>>(field: K, value: Omit<Leadership, 'id'>[K]) => {
    if (!draft) return;
    setDraft((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft) return;

    const normalized = {
      ...draft,
      name: draft.name.trim(),
      slug: makeSlug(draft.slug || draft.name),
      designation: draft.designation.trim(),
      shortBio: draft.shortBio.trim(),
      fullBio: draft.fullBio.trim(),
      photoUrl: draft.photoUrl.trim(),
      linkedinUrl: draft.linkedinUrl?.trim() || undefined,
      instagramUrl: draft.instagramUrl?.trim() || undefined,
      githubUrl: draft.githubUrl?.trim() || undefined,
      email: draft.email?.trim() || undefined,
      whatsapp: draft.whatsapp?.trim() || undefined,
      portfolioUrl: draft.portfolioUrl?.trim() || undefined,
      otherContactUrl: draft.otherContactUrl?.trim() || undefined,
    };

    if (!normalized.name || !normalized.designation || !normalized.shortBio || !normalized.fullBio || !normalized.photoUrl) {
      setErrorMessage('Please complete the required fields before saving the leadership profile.');
      return;
    }

    try {
      setSaving(true);
      setErrorMessage(null);

      if (isCreating) {
        const created = await addLeadership(normalized);
        setIsCreating(false);
        setEditingId(created.id);
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
      } else if (editingId) {
        const updated = await updateLeadership(editingId, normalized);
        setDraft({
          ...updated,
          linkedinUrl: updated.linkedinUrl ?? '',
          instagramUrl: updated.instagramUrl ?? '',
          githubUrl: updated.githubUrl ?? '',
          email: updated.email ?? '',
          whatsapp: updated.whatsapp ?? '',
          portfolioUrl: updated.portfolioUrl ?? '',
          otherContactUrl: updated.otherContactUrl ?? '',
        });
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to save the leadership profile.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (leaderId: string) => {
    try {
      setErrorMessage(null);
      await deleteLeadership(leaderId);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
      if (editingId === leaderId) {
        setEditingId(null);
        setIsCreating(false);
        setDraft(null);
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to delete the leadership profile.');
    }
  };

  const showEmptyState = leadership.length === 0 && !isCreating && !draft;

  return (
    <div className="bg-white rounded-3xl border border-[#E6DECE] p-8 shadow-xs max-w-4xl">
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-[#F0E8D9] gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#926E28] block mb-1">
            Executive Spotlight
          </span>
          <h1 className="font-display text-2xl font-bold text-[#191C1E]">
            Founder & Co-Founder Management
          </h1>
        </div>
        <button
          type="button"
          onClick={openCreateForm}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#191C1E] text-white text-xs font-semibold hover:bg-[#2B2F34] transition-all shadow-md"
        >
          <Plus className="w-3.5 h-3.5 text-[#C59A4E]" />
          <span>Add Founder / Co-Founder</span>
        </button>
      </div>

      {saved && (
        <div className="mb-6 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
          <Check className="w-3.5 h-3.5" />
          Leadership Saved
        </div>
      )}

      {errorMessage && (
        <div className="mb-6 text-xs font-medium text-red-700 bg-red-50 border border-red-200 rounded-xl px-3.5 py-2.5">
          {errorMessage}
        </div>
      )}

      {showEmptyState && (
        <div className="border border-dashed border-[#E6DECE] bg-[#FAF8F5] rounded-2xl p-10 text-center">
          <p className="text-sm text-[#191C1E] font-medium">No Founder or Co-Founder profiles yet.</p>
          <button
            type="button"
            onClick={openCreateForm}
            className="mt-5 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#191C1E] text-white text-xs font-semibold hover:bg-[#2B2F34] transition-all shadow-md"
          >
            <Plus className="w-3.5 h-3.5 text-[#C59A4E]" />
            <span>Add Founder / Co-Founder</span>
          </button>
        </div>
      )}

      {!showEmptyState && leadership.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {leadership.map((lead) => (
            <button
              key={lead.id}
              type="button"
              onClick={() => openEditForm(lead.id)}
              className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all flex items-center gap-2 ${
                editingId === lead.id
                  ? 'bg-[#191C1E] text-white border-[#191C1E]'
                  : 'bg-[#FAF8F5] text-[#52575E] border-[#E6DECE] hover:border-[#C59A4E]'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-[#C59A4E]" />
              <span>{lead.name} ({formatRoleLabel(lead.roleType)})</span>
            </button>
          ))}
        </div>
      )}

      {draft && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1.5">Full Name</label>
              <input
                type="text"
                required
                value={draft.name}
                onChange={(e) => handleFieldChange('name', e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-xl focus:outline-none focus:border-[#B58A3E]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1.5">Role Type</label>
              <select
                value={draft.roleType}
                onChange={(e) => handleFieldChange('roleType', e.target.value as Leadership['roleType'])}
                className="w-full px-3 py-2.5 text-xs text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-xl focus:outline-none focus:border-[#B58A3E]"
              >
                <option value="founder">Founder</option>
                <option value="co_founder">Co-Founder</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1.5">Designation Title</label>
              <input
                type="text"
                required
                value={draft.designation}
                onChange={(e) => handleFieldChange('designation', e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-xl focus:outline-none focus:border-[#B58A3E]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1.5">Display Order</label>
              <input
                type="number"
                min={0}
                value={draft.displayOrder}
                onChange={(e) => handleFieldChange('displayOrder', Number(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 text-xs text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-xl focus:outline-none focus:border-[#B58A3E]"
              />
            </div>

            <div className="flex items-end">
              <label className="flex items-center gap-2 text-xs font-semibold text-[#191C1E]">
                <input
                  type="checkbox"
                  checked={draft.isActive}
                  onChange={(e) => handleFieldChange('isActive', e.target.checked)}
                  className="h-4 w-4 rounded border-[#E6DECE] text-[#191C1E] focus:ring-[#B58A3E]"
                />
                Active / Published
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#191C1E] mb-1.5">Portrait Photo URL (or ImgBB Link)</label>
            <input
              type="text"
              required
              value={draft.photoUrl}
              onChange={(e) => handleFieldChange('photoUrl', e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-xl focus:outline-none focus:border-[#B58A3E]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#191C1E] mb-1.5">Short Editorial Quote / Statement</label>
            <input
              type="text"
              required
              value={draft.shortBio}
              onChange={(e) => handleFieldChange('shortBio', e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-xl focus:outline-none focus:border-[#B58A3E]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#191C1E] mb-1.5">Full Executive Biography</label>
            <textarea
              rows={4}
              required
              value={draft.fullBio}
              onChange={(e) => handleFieldChange('fullBio', e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-xl focus:outline-none focus:border-[#B58A3E] resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 bg-[#FAF8F5] border border-[#E6DECE] rounded-2xl">
            <div>
              <label className="block text-[11px] font-semibold text-[#191C1E] mb-1">LinkedIn Profile URL</label>
              <input
                type="url"
                value={draft.linkedinUrl || ''}
                onChange={(e) => handleFieldChange('linkedinUrl', e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#191C1E] mb-1">GitHub URL</label>
              <input
                type="url"
                value={draft.githubUrl || ''}
                onChange={(e) => handleFieldChange('githubUrl', e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#191C1E] mb-1">Direct Email</label>
              <input
                type="email"
                value={draft.email || ''}
                onChange={(e) => handleFieldChange('email', e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#191C1E] mb-1">WhatsApp Phone</label>
              <input
                type="text"
                value={draft.whatsapp || ''}
                onChange={(e) => handleFieldChange('whatsapp', e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#191C1E] mb-1">Instagram URL</label>
              <input
                type="url"
                value={draft.instagramUrl || ''}
                onChange={(e) => handleFieldChange('instagramUrl', e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#191C1E] mb-1">Portfolio / Other Contact</label>
              <input
                type="url"
                value={draft.portfolioUrl || ''}
                onChange={(e) => handleFieldChange('portfolioUrl', e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg"
              />
            </div>

            <div className="sm:col-span-3">
              <label className="block text-[11px] font-semibold text-[#191C1E] mb-1">Other Contact URL</label>
              <input
                type="url"
                value={draft.otherContactUrl || ''}
                onChange={(e) => handleFieldChange('otherContactUrl', e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-[#F0E8D9] flex justify-between gap-3">
            {editingId && !isCreating && (
              <button
                type="button"
                onClick={() => handleDelete(editingId)}
                className="px-4 py-2.5 text-xs font-semibold text-[#8C2D2D] bg-[#FDF1F1] border border-[#F1CACA] rounded-xl hover:bg-[#FCE8E8] transition-all flex items-center gap-2"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            )}

            <div className="ml-auto flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsCreating(false);
                  setErrorMessage(null);
                  setSaved(false);
                  if (leadership.length > 0) {
                    const firstLeader = leadership[0];
                    openEditForm(firstLeader.id);
                  } else {
                    setDraft(null);
                  }
                }}
                className="px-4 py-2.5 text-xs font-semibold text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-xl transition-all flex items-center gap-2"
              >
                <X className="w-3.5 h-3.5" />
                <span>Cancel</span>
              </button>

              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2.5 text-xs font-semibold text-white bg-[#191C1E] hover:bg-[#2B2F34] disabled:opacity-60 rounded-xl transition-all shadow-md flex items-center gap-2"
              >
                <Save className="w-3.5 h-3.5 text-[#C59A4E]" />
                <span>{saving ? 'Saving...' : isCreating ? 'Create Leadership Record' : 'Save Leadership Record'}</span>
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
