import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { PromotionalCampaign } from '../../types';
import { Plus, Edit2, Trash2, Save, Megaphone, Eye } from 'lucide-react';

export const AdminCampaigns: React.FC = () => {
  const { campaigns, addCampaign, updateCampaign, deleteCampaign } = useCms();
  const [editingCamp, setEditingCamp] = useState<PromotionalCampaign | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCamp) return;

    if (isCreating) {
      const { id, ...rest } = editingCamp;
      addCampaign(rest);
    } else {
      updateCampaign(editingCamp.id, editingCamp);
    }
    setEditingCamp(null);
    setIsCreating(false);
  };

  const startCreate = () => {
    setIsCreating(true);
    const today = new Date().toISOString().split('T')[0];
    const nextMonth = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    setEditingCamp({
      id: 'temp',
      title: 'New Promotional Campaign',
      description: 'Special seasonal announcement for engineering programs or partnerships.',
      imageUrl: '/src/assets/images/project_saas_platform_1791103524205.jpg',
      buttonText: 'Learn More',
      buttonUrl: '#programs',
      startDate: today,
      endDate: nextMonth,
      isEnabled: true,
      displayMode: 'both',
      frequencyLimitHours: 24,
    });
  };

  return (
    <div className="bg-white rounded-3xl border border-[#E6DECE] p-8 shadow-xs max-w-5xl">
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-[#F0E8D9]">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#926E28] block mb-1">
            Audience Engagement
          </span>
          <h1 className="font-display text-2xl font-bold text-[#191C1E]">
            Promotional & Festival Campaigns
          </h1>
        </div>
        <button
          onClick={startCreate}
          className="px-4 py-2 text-xs font-semibold text-white bg-[#191C1E] hover:bg-[#2B2F34] rounded-xl transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5 text-[#C59A4E]" />
          <span>New Campaign</span>
        </button>
      </div>

      {editingCamp ? (
        <form onSubmit={handleSave} className="space-y-4 p-6 bg-[#FAF8F5] rounded-2xl border border-[#E6DECE]">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold text-[#191C1E]">
              {isCreating ? 'Launch New Campaign' : `Editing Campaign: ${editingCamp.title}`}
            </h3>
            <button
              type="button"
              onClick={() => setEditingCamp(null)}
              className="text-xs text-[#6B7280]"
            >
              Cancel
            </button>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#191C1E] mb-1">Campaign Title</label>
            <input
              type="text"
              required
              value={editingCamp.title}
              onChange={(e) => setEditingCamp({ ...editingCamp, title: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#191C1E] mb-1">Description (Optional)</label>
            <textarea
              rows={2}
              value={editingCamp.description || ''}
              onChange={(e) => setEditingCamp({ ...editingCamp, description: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1">Image URL (for Popup)</label>
              <input
                type="text"
                value={editingCamp.imageUrl || ''}
                onChange={(e) => setEditingCamp({ ...editingCamp, imageUrl: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1">Display Mode</label>
              <select
                value={editingCamp.displayMode}
                onChange={(e) =>
                  setEditingCamp({
                    ...editingCamp,
                    displayMode: e.target.value as PromotionalCampaign['displayMode'],
                  })
                }
                className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg"
              >
                <option value="both">Both (Top Banner + Popup Modal)</option>
                <option value="popup">Popup Modal Only</option>
                <option value="banner">Top Banner Only</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1">Button Text</label>
              <input
                type="text"
                required
                value={editingCamp.buttonText}
                onChange={(e) => setEditingCamp({ ...editingCamp, buttonText: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1">Button URL</label>
              <input
                type="text"
                required
                value={editingCamp.buttonUrl}
                onChange={(e) => setEditingCamp({ ...editingCamp, buttonUrl: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1">Frequency Limit (Hours)</label>
              <input
                type="number"
                min="1"
                max="168"
                value={editingCamp.frequencyLimitHours}
                onChange={(e) =>
                  setEditingCamp({ ...editingCamp, frequencyLimitHours: parseInt(e.target.value, 10) || 24 })
                }
                className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1">Start Date</label>
              <input
                type="date"
                required
                value={editingCamp.startDate}
                onChange={(e) => setEditingCamp({ ...editingCamp, startDate: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1">End Date</label>
              <input
                type="date"
                required
                value={editingCamp.endDate}
                onChange={(e) => setEditingCamp({ ...editingCamp, endDate: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg"
              />
            </div>
          </div>

          <div className="pt-2">
            <label className="flex items-center gap-2 text-xs text-[#191C1E] cursor-pointer">
              <input
                type="checkbox"
                checked={editingCamp.isEnabled}
                onChange={(e) => setEditingCamp({ ...editingCamp, isEnabled: e.target.checked })}
              />
              <span>Is Campaign Enabled (Live during date range)</span>
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setEditingCamp(null)}
              className="px-4 py-2 text-xs text-[#6B7280]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-[#191C1E] rounded-xl flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5 text-[#C59A4E]" />
              <span>Save Campaign</span>
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-3">
          {campaigns.map((camp) => (
            <div
              key={camp.id}
              className="p-4 bg-[#FAF8F5] border border-[#E6DECE] rounded-2xl flex items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-[#191C1E]">{camp.title}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                      camp.isEnabled
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {camp.isEnabled ? 'Live' : 'Paused'}
                  </span>
                  <span className="text-[10px] text-[#806429] uppercase">Mode: {camp.displayMode}</span>
                </div>
                <p className="text-xs text-[#6B7280]">
                  Active from {camp.startDate} to {camp.endDate}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setIsCreating(false);
                    setEditingCamp(camp);
                  }}
                  className="p-1.5 text-[#656A72] hover:text-[#191C1E] rounded-lg hover:bg-white border border-[#E6DECE]"
                  title="Edit Campaign"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Delete campaign ${camp.title}?`)) deleteCampaign(camp.id);
                  }}
                  className="p-1.5 text-red-600 hover:text-red-800 rounded-lg hover:bg-white border border-[#E6DECE]"
                  title="Delete Campaign"
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
