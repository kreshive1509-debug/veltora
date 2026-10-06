import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { Program } from '../../types';
import { Plus, Edit2, Trash2, Save, GraduationCap } from 'lucide-react';

export const AdminPrograms: React.FC = () => {
  const { programs, addProgram, updateProgram, deleteProgram } = useCms();
  const [editingProg, setEditingProg] = useState<Program | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProg) return;

    if (isCreating) {
      const { id, ...rest } = editingProg;
      addProgram(rest);
    } else {
      updateProgram(editingProg.id, editingProg);
    }
    setEditingProg(null);
    setIsCreating(false);
  };

  const startCreate = () => {
    setIsCreating(true);
    setEditingProg({
      id: 'temp',
      name: '',
      slug: '',
      description: '',
      duration: '8 Weeks (Hybrid)',
      eligibility: 'College students & early engineers',
      benefits: ['Live code contributions', 'Senior mentorship', 'Verified Certificate'],
      fee: 'Merit-Based (Complimentary)',
      applicationUrl: '#contact',
      applicationStatus: 'Open',
      startDate: '2026-06-01',
      endDate: '2026-08-01',
      certificateAvailable: true,
      isFeatured: true,
      isActive: true,
      displayOrder: programs.length + 1,
    });
  };

  return (
    <div className="bg-white rounded-3xl border border-[#E6DECE] p-8 shadow-xs max-w-5xl">
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-[#F0E8D9]">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#926E28] block mb-1">
            Student Ecosystem
          </span>
          <h1 className="font-display text-2xl font-bold text-[#191C1E]">
            Programs & Fellowships CRUD
          </h1>
        </div>
        <button
          onClick={startCreate}
          className="px-4 py-2 text-xs font-semibold text-white bg-[#191C1E] hover:bg-[#2B2F34] rounded-xl transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5 text-[#C59A4E]" />
          <span>Add Program</span>
        </button>
      </div>

      {editingProg ? (
        <form onSubmit={handleSave} className="space-y-4 p-6 bg-[#FAF8F5] rounded-2xl border border-[#E6DECE]">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold text-[#191C1E]">
              {isCreating ? 'Create Program' : `Editing: ${editingProg.name}`}
            </h3>
            <button
              type="button"
              onClick={() => setEditingProg(null)}
              className="text-xs text-[#6B7280]"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1">Program Name</label>
              <input
                type="text"
                required
                value={editingProg.name}
                onChange={(e) => {
                  const val = e.target.value;
                  const slug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                  setEditingProg({ ...editingProg, name: val, slug });
                }}
                className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1">Duration</label>
              <input
                type="text"
                required
                value={editingProg.duration}
                onChange={(e) => setEditingProg({ ...editingProg, duration: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1">Application Status</label>
              <select
                value={editingProg.applicationStatus}
                onChange={(e) =>
                  setEditingProg({
                    ...editingProg,
                    applicationStatus: e.target.value as Program['applicationStatus'],
                  })
                }
                className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg"
              >
                <option value="Open">Open</option>
                <option value="Upcoming">Upcoming</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1">Tuition / Fee</label>
              <input
                type="text"
                value={editingProg.fee}
                onChange={(e) => setEditingProg({ ...editingProg, fee: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1">Application URL</label>
              <input
                type="text"
                value={editingProg.applicationUrl}
                onChange={(e) => setEditingProg({ ...editingProg, applicationUrl: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#191C1E] mb-1">Description</label>
            <textarea
              rows={3}
              required
              value={editingProg.description}
              onChange={(e) => setEditingProg({ ...editingProg, description: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#191C1E] mb-1">Eligibility</label>
            <input
              type="text"
              required
              value={editingProg.eligibility}
              onChange={(e) => setEditingProg({ ...editingProg, eligibility: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg"
            />
          </div>

          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 text-xs text-[#191C1E] cursor-pointer">
              <input
                type="checkbox"
                checked={editingProg.isActive}
                onChange={(e) => setEditingProg({ ...editingProg, isActive: e.target.checked })}
              />
              <span>Is Active</span>
            </label>
            <label className="flex items-center gap-2 text-xs text-[#191C1E] cursor-pointer">
              <input
                type="checkbox"
                checked={editingProg.certificateAvailable}
                onChange={(e) => setEditingProg({ ...editingProg, certificateAvailable: e.target.checked })}
              />
              <span>Verified Certificate Issued</span>
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setEditingProg(null)}
              className="px-4 py-2 text-xs text-[#6B7280]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-[#191C1E] rounded-xl flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5 text-[#C59A4E]" />
              <span>Save Program</span>
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-3">
          {programs.map((p) => (
            <div
              key={p.id}
              className="p-4 bg-[#FAF8F5] border border-[#E6DECE] rounded-2xl flex items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-[#191C1E]">{p.name}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                      p.applicationStatus === 'Open'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {p.applicationStatus}
                  </span>
                </div>
                <p className="text-xs text-[#6B7280]">{p.duration} · {p.fee}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setIsCreating(false);
                    setEditingProg(p);
                  }}
                  className="p-1.5 text-[#656A72] hover:text-[#191C1E] rounded-lg hover:bg-white border border-[#E6DECE]"
                  title="Edit"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Delete program ${p.name}?`)) deleteProgram(p.id);
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
