import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { Service } from '../../types';
import { Plus, Edit2, Trash2, Save, X, Check } from 'lucide-react';

export const AdminServices: React.FC = () => {
  const { services, addService, updateService, deleteService } = useCms();
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    if (isCreating) {
      const { id, ...rest } = editingService;
      addService(rest);
    } else {
      updateService(editingService.id, editingService);
    }
    setEditingService(null);
    setIsCreating(false);
  };

  const startCreate = () => {
    setIsCreating(true);
    setEditingService({
      id: 'temp',
      name: '',
      slug: '',
      shortDescription: '',
      fullDescription: '',
      icon: 'Terminal',
      imageUrl: '',
      category: 'Software Engineering',
      keyFeatures: ['Feature 1', 'Feature 2'],
      deliverables: ['Deliverable 1'],
      isFeatured: true,
      isActive: true,
      displayOrder: services.length + 1,
    });
  };

  return (
    <div className="bg-white rounded-3xl border border-[#E6DECE] p-8 shadow-xs max-w-5xl">
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-[#F0E8D9]">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#926E28] block mb-1">
            Capabilities Engine
          </span>
          <h1 className="font-display text-2xl font-bold text-[#191C1E]">
            Services & Capabilities CRUD
          </h1>
        </div>
        <button
          onClick={startCreate}
          className="px-4 py-2 text-xs font-semibold text-white bg-[#191C1E] hover:bg-[#2B2F34] rounded-xl transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5 text-[#C59A4E]" />
          <span>Add New Service</span>
        </button>
      </div>

      {editingService ? (
        <form onSubmit={handleSave} className="space-y-4 p-6 bg-[#FAF8F5] rounded-2xl border border-[#E6DECE]">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold text-[#191C1E]">
              {isCreating ? 'Create Service' : `Editing: ${editingService.name}`}
            </h3>
            <button
              type="button"
              onClick={() => setEditingService(null)}
              className="text-xs text-[#6B7280] hover:text-black"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1">Name</label>
              <input
                type="text"
                required
                value={editingService.name}
                onChange={(e) => {
                  const val = e.target.value;
                  const slug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                  setEditingService({ ...editingService, name: val, slug });
                }}
                className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1">Slug</label>
              <input
                type="text"
                required
                value={editingService.slug}
                onChange={(e) => setEditingService({ ...editingService, slug: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1">Category</label>
              <input
                type="text"
                value={editingService.category}
                onChange={(e) => setEditingService({ ...editingService, category: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1">Icon Name</label>
              <select
                value={editingService.icon}
                onChange={(e) => setEditingService({ ...editingService, icon: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg"
              >
                <option value="Terminal">Terminal (Bespoke Software)</option>
                <option value="Layout">Layout (Web & Mobile)</option>
                <option value="Cpu">Cpu (Automation)</option>
                <option value="Cloud">Cloud (DevOps)</option>
                <option value="GraduationCap">GraduationCap (Training)</option>
                <option value="Code2">Code2 (General Code)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#191C1E] mb-1">Short Description</label>
            <input
              type="text"
              required
              value={editingService.shortDescription}
              onChange={(e) => setEditingService({ ...editingService, shortDescription: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#191C1E] mb-1">Full Detailed Description</label>
            <textarea
              rows={3}
              required
              value={editingService.fullDescription}
              onChange={(e) => setEditingService({ ...editingService, fullDescription: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg resize-none"
            />
          </div>

          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 text-xs text-[#191C1E] cursor-pointer">
              <input
                type="checkbox"
                checked={editingService.isActive}
                onChange={(e) => setEditingService({ ...editingService, isActive: e.target.checked })}
              />
              <span>Is Active (Visible on Public Site)</span>
            </label>

            <label className="flex items-center gap-2 text-xs text-[#191C1E] cursor-pointer">
              <input
                type="checkbox"
                checked={editingService.isFeatured}
                onChange={(e) => setEditingService({ ...editingService, isFeatured: e.target.checked })}
              />
              <span>Is Featured on Homepage</span>
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setEditingService(null)}
              className="px-4 py-2 text-xs text-[#6B7280]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-[#191C1E] rounded-xl flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5 text-[#C59A4E]" />
              <span>Save Service</span>
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-3">
          {services.map((s) => (
            <div
              key={s.id}
              className="p-4 bg-[#FAF8F5] border border-[#E6DECE] rounded-2xl flex items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-[#191C1E]">{s.name}</span>
                  <span className="text-[10px] text-[#806429] font-mono">/services/{s.slug}</span>
                  {!s.isActive && (
                    <span className="text-[10px] bg-gray-200 text-gray-700 px-1.5 py-0.5 rounded">
                      Disabled
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#6B7280] line-clamp-1">{s.shortDescription}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setIsCreating(false);
                    setEditingService(s);
                  }}
                  className="p-1.5 text-[#656A72] hover:text-[#191C1E] rounded-lg hover:bg-white border border-[#E6DECE]"
                  title="Edit Service"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Delete service ${s.name}?`)) deleteService(s.id);
                  }}
                  className="p-1.5 text-red-600 hover:text-red-800 rounded-lg hover:bg-white border border-[#E6DECE]"
                  title="Delete Service"
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
