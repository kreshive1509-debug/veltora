import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { TeamMember } from '../../types';
import { Plus, Edit2, Trash2, Save } from 'lucide-react';

export const AdminTeam: React.FC = () => {
  const { teamMembers, addTeamMember, updateTeamMember, deleteTeamMember } = useCms();
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember) return;

    if (isCreating) {
      const { id, ...rest } = editingMember;
      addTeamMember(rest);
    } else {
      updateTeamMember(editingMember.id, editingMember);
    }
    setEditingMember(null);
    setIsCreating(false);
  };

  const startCreate = () => {
    setIsCreating(true);
    setEditingMember({
      id: 'temp',
      name: '',
      designation: 'Software Engineer',
      role: 'Full-Stack Developer',
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      bio: 'Passionate engineer building performant modern software systems.',
      linkedinUrl: '',
      instagramUrl: '',
      githubUrl: '',
      email: '',
      displayOrder: teamMembers.length + 1,
      isActive: true,
    });
  };

  return (
    <div className="bg-white rounded-3xl border border-[#E6DECE] p-8 shadow-xs max-w-5xl">
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-[#F0E8D9]">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#926E28] block mb-1">
            Core Squad
          </span>
          <h1 className="font-display text-2xl font-bold text-[#191C1E]">
            Team Members CRUD
          </h1>
        </div>
        <button
          onClick={startCreate}
          className="px-4 py-2 text-xs font-semibold text-white bg-[#191C1E] hover:bg-[#2B2F34] rounded-xl transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5 text-[#C59A4E]" />
          <span>Add Member</span>
        </button>
      </div>

      {editingMember ? (
        <form onSubmit={handleSave} className="space-y-4 p-6 bg-[#FAF8F5] rounded-2xl border border-[#E6DECE]">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold text-[#191C1E]">
              {isCreating ? 'Add Team Member' : `Editing: ${editingMember.name}`}
            </h3>
            <button
              type="button"
              onClick={() => setEditingMember(null)}
              className="text-xs text-[#6B7280]"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1">Name</label>
              <input
                type="text"
                required
                value={editingMember.name}
                onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1">Designation</label>
              <input
                type="text"
                required
                value={editingMember.designation}
                onChange={(e) => setEditingMember({ ...editingMember, designation: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1">Specialization Role</label>
              <input
                type="text"
                required
                value={editingMember.role}
                onChange={(e) => setEditingMember({ ...editingMember, role: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#191C1E] mb-1">Photo URL</label>
            <input
              type="text"
              required
              value={editingMember.photoUrl}
              onChange={(e) => setEditingMember({ ...editingMember, photoUrl: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#191C1E] mb-1">Bio</label>
            <textarea
              rows={2}
              required
              value={editingMember.bio}
              onChange={(e) => setEditingMember({ ...editingMember, bio: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1">LinkedIn URL</label>
              <input
                type="url"
                value={editingMember.linkedinUrl || ''}
                onChange={(e) => setEditingMember({ ...editingMember, linkedinUrl: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1">GitHub URL</label>
              <input
                type="url"
                value={editingMember.githubUrl || ''}
                onChange={(e) => setEditingMember({ ...editingMember, githubUrl: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1">Email</label>
              <input
                type="email"
                value={editingMember.email || ''}
                onChange={(e) => setEditingMember({ ...editingMember, email: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setEditingMember(null)}
              className="px-4 py-2 text-xs text-[#6B7280]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-[#191C1E] rounded-xl flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5 text-[#C59A4E]" />
              <span>Save Member</span>
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-3">
          {teamMembers.map((m) => (
            <div
              key={m.id}
              className="p-4 bg-[#FAF8F5] border border-[#E6DECE] rounded-2xl flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <img
                  src={m.photoUrl}
                  alt={m.name}
                  className="w-10 h-10 rounded-full object-cover border border-[#E6DECE]"
                />
                <div>
                  <h3 className="text-xs font-bold text-[#191C1E]">{m.name}</h3>
                  <p className="text-[11px] text-[#806429]">{m.designation} · {m.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setIsCreating(false);
                    setEditingMember(m);
                  }}
                  className="p-1.5 text-[#656A72] hover:text-[#191C1E] rounded-lg hover:bg-white border border-[#E6DECE]"
                  title="Edit"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Delete team member ${m.name}?`)) deleteTeamMember(m.id);
                  }}
                  className="p-1.5 text-red-600 hover:text-red-800 rounded-lg hover:bg-white border border-[#E6DECE]"
                  title="Delete"
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
