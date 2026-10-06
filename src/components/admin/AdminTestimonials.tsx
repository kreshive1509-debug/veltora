import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { Testimonial } from '../../types';
import { Plus, Edit2, Trash2, Save, Star } from 'lucide-react';

export const AdminTestimonials: React.FC = () => {
  const { testimonials, addTestimonial, updateTestimonial, deleteTestimonial } = useCms();
  const [editingTest, setEditingTest] = useState<Testimonial | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTest) return;

    if (isCreating) {
      const { id, ...rest } = editingTest;
      addTestimonial(rest);
    } else {
      updateTestimonial(editingTest.id, editingTest);
    }
    setEditingTest(null);
    setIsCreating(false);
  };

  const startCreate = () => {
    setIsCreating(true);
    setEditingTest({
      id: 'temp',
      name: '',
      designation: '',
      organization: '',
      photoUrl: '',
      message: '',
      rating: 5,
      isFeatured: true,
      isActive: true,
      displayOrder: testimonials.length + 1,
    });
  };

  return (
    <div className="bg-white rounded-3xl border border-[#E6DECE] p-8 shadow-xs max-w-5xl">
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-[#F0E8D9]">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#926E28] block mb-1">
            Reputation
          </span>
          <h1 className="font-display text-2xl font-bold text-[#191C1E]">
            Client Testimonials CRUD
          </h1>
        </div>
        <button
          onClick={startCreate}
          className="px-4 py-2 text-xs font-semibold text-white bg-[#191C1E] hover:bg-[#2B2F34] rounded-xl transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5 text-[#C59A4E]" />
          <span>Add Testimonial</span>
        </button>
      </div>

      {editingTest ? (
        <form onSubmit={handleSave} className="space-y-4 p-6 bg-[#FAF8F5] rounded-2xl border border-[#E6DECE]">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold text-[#191C1E]">
              {isCreating ? 'Add Testimonial' : `Editing: ${editingTest.name}`}
            </h3>
            <button
              type="button"
              onClick={() => setEditingTest(null)}
              className="text-xs text-[#6B7280]"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1">Author Name</label>
              <input
                type="text"
                required
                value={editingTest.name}
                onChange={(e) => setEditingTest({ ...editingTest, name: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1">Designation</label>
              <input
                type="text"
                required
                value={editingTest.designation}
                onChange={(e) => setEditingTest({ ...editingTest, designation: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1">Organization</label>
              <input
                type="text"
                required
                value={editingTest.organization}
                onChange={(e) => setEditingTest({ ...editingTest, organization: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#191C1E] mb-1">Testimonial Quote</label>
            <textarea
              rows={3}
              required
              value={editingTest.message}
              onChange={(e) => setEditingTest({ ...editingTest, message: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1">Star Rating (1 to 5)</label>
              <input
                type="number"
                min="1"
                max="5"
                value={editingTest.rating}
                onChange={(e) => setEditingTest({ ...editingTest, rating: parseInt(e.target.value, 10) || 5 })}
                className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg"
              />
            </div>
            <div className="flex items-center gap-6 pt-5">
              <label className="flex items-center gap-2 text-xs text-[#191C1E] cursor-pointer">
                <input
                  type="checkbox"
                  checked={editingTest.isActive}
                  onChange={(e) => setEditingTest({ ...editingTest, isActive: e.target.checked })}
                />
                <span>Active</span>
              </label>
              <label className="flex items-center gap-2 text-xs text-[#191C1E] cursor-pointer">
                <input
                  type="checkbox"
                  checked={editingTest.isFeatured}
                  onChange={(e) => setEditingTest({ ...editingTest, isFeatured: e.target.checked })}
                />
                <span>Featured</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setEditingTest(null)}
              className="px-4 py-2 text-xs text-[#6B7280]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-[#191C1E] rounded-xl flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5 text-[#C59A4E]" />
              <span>Save Testimonial</span>
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-3">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="p-4 bg-[#FAF8F5] border border-[#E6DECE] rounded-2xl flex items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-[#191C1E]">{t.name}</span>
                  <span className="text-[11px] text-[#806429]">({t.organization})</span>
                  <div className="flex items-center text-[#B58A3E]">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-2.5 h-2.5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-[#6B7280] italic line-clamp-1">"{t.message}"</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setIsCreating(false);
                    setEditingTest(t);
                  }}
                  className="p-1.5 text-[#656A72] hover:text-[#191C1E] rounded-lg hover:bg-white border border-[#E6DECE]"
                  title="Edit"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Delete testimonial from ${t.name}?`)) deleteTestimonial(t.id);
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
