import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { FaqItem } from '../../types';
import { Plus, Edit2, Trash2, HelpCircle, Save, Check, X } from 'lucide-react';

export const AdminFaqs: React.FC = () => {
  const { faqs, addFaq, updateFaq, deleteFaq } = useCms();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState<Omit<FaqItem, 'id'>>({
    question: '',
    answer: '',
    category: 'General & Services',
    isFeatured: true,
    isEnabled: true,
    displayOrder: 1,
  });

  const handleOpenAdd = () => {
    setFormData({
      question: '',
      answer: '',
      category: 'General & Services',
      isFeatured: true,
      isEnabled: true,
      displayOrder: faqs.length + 1,
    });
    setShowAddModal(true);
  };

  const handleOpenEdit = (faq: FaqItem) => {
    setEditingId(faq.id);
    setFormData({
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      isFeatured: faq.isFeatured,
      isEnabled: faq.isEnabled,
      displayOrder: faq.displayOrder,
    });
    setShowAddModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateFaq(editingId, formData);
    } else {
      addFaq(formData);
    }
    setShowAddModal(false);
    setEditingId(null);
  };

  return (
    <div className="space-y-6 max-w-6xl pb-16">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-[#E6DECE] p-6 lg:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#B58A3E] block mb-1">
            Knowledge Base
          </span>
          <h1 className="font-display text-2xl lg:text-3xl font-bold text-[#191C1E]">
            FAQ Management
          </h1>
          <p className="text-xs text-[#5F6368] mt-1">
            Create, edit, and organize frequently asked questions displayed on the public website.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 text-xs font-semibold text-white bg-[#191C1E] hover:bg-[#2B2F34] rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-[#C59A4E]" />
          <span>Add New FAQ</span>
        </button>
      </div>

      {/* FAQs Table */}
      <div className="bg-white rounded-3xl border border-[#E6DECE] overflow-hidden shadow-xs">
        <div className="divide-y divide-[#F0E8D9]">
          {faqs.map((faq) => (
            <div key={faq.id} className="p-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4 hover:bg-[#FAF8F5]/50 transition-colors">
              <div className="space-y-1.5 max-w-3xl">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#E6DECE] text-[#B58A3E]">
                    {faq.category}
                  </span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${faq.isEnabled ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                    {faq.isEnabled ? 'Active' : 'Disabled'}
                  </span>
                </div>
                <h3 className="font-display text-sm font-bold text-[#191C1E]">
                  {faq.question}
                </h3>
                <p className="text-xs text-[#5F6368] leading-relaxed">
                  {faq.answer}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleOpenEdit(faq)}
                  className="p-2 text-[#5F6368] hover:text-[#191C1E] hover:bg-[#FAF8F5] rounded-lg transition-colors cursor-pointer"
                  title="Edit FAQ"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to delete this FAQ?')) deleteFaq(faq.id);
                  }}
                  className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                  title="Delete FAQ"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add / Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#E6DECE] max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-6 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-[#F0E8D9] pb-4">
              <h3 className="font-display text-lg font-bold text-[#191C1E]">
                {editingId ? 'Edit FAQ Item' : 'Add New FAQ Item'}
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 text-[#8C9199] hover:text-[#191C1E] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#191C1E] mb-1.5">
                  Question
                </label>
                <input
                  type="text"
                  required
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-xl focus:outline-none focus:border-[#B58A3E]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#191C1E] mb-1.5">
                  Category
                </label>
                <input
                  type="text"
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-xl focus:outline-none focus:border-[#B58A3E]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#191C1E] mb-1.5">
                  Detailed Answer
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-xl focus:outline-none focus:border-[#B58A3E] resize-none"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs font-medium text-[#191C1E] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isEnabled}
                    onChange={(e) => setFormData({ ...formData, isEnabled: e.target.checked })}
                    className="accent-[#B58A3E]"
                  />
                  <span>Active & Visible</span>
                </label>
                <label className="flex items-center gap-2 text-xs font-medium text-[#191C1E] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="accent-[#B58A3E]"
                  />
                  <span>Featured on Homepage</span>
                </label>
              </div>

              <div className="pt-4 border-t border-[#F0E8D9] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-[#5F6368] hover:text-[#191C1E] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-[#191C1E] hover:bg-[#2B2F34] rounded-xl transition-all shadow-md cursor-pointer"
                >
                  {editingId ? 'Save Changes' : 'Create FAQ'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
