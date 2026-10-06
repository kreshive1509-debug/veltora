import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { NavigationItem } from '../../types';
import { Save, Check, Plus, Trash2, ArrowUp, ArrowDown, ExternalLink } from 'lucide-react';

export const AdminNavigation: React.FC = () => {
  const {
    navigationItems,
    headerSettings,
    updateNavigationItems,
    updateHeaderSettings,
  } = useCms();

  const [items, setItems] = useState<NavigationItem[]>(navigationItems);
  const [headerForm, setHeaderForm] = useState(headerSettings);
  const [saved, setSaved] = useState(false);

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const newItems = [...items];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newItems.length) return;

    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;

    const reordered = newItems.map((item, idx) => ({ ...item, displayOrder: idx + 1 }));
    setItems(reordered);
  };

  const handleToggle = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isEnabled: !item.isEnabled } : item))
    );
  };

  const handleAddLink = () => {
    const newLink: NavigationItem = {
      id: `nav-${Date.now()}`,
      label: 'New Link',
      url: '#',
      isEnabled: true,
      displayOrder: items.length + 1,
    };
    setItems([...items, newLink]);
  };

  const handleDelete = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleSave = () => {
    updateNavigationItems(items);
    updateHeaderSettings(headerForm);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-5xl pb-16">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-[#E6DECE] p-6 lg:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#B58A3E] block mb-1">
            Site Architecture
          </span>
          <h1 className="font-display text-2xl lg:text-3xl font-bold text-[#191C1E]">
            Navigation & Header Engine
          </h1>
          <p className="text-xs text-[#5F6368] mt-1">
            Reorder, enable, or create public header links and configure sticky navigation settings.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {saved && (
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5 animate-in fade-in">
              <Check className="w-3.5 h-3.5" />
              Navigation Saved
            </span>
          )}
          <button
            onClick={handleSave}
            className="px-6 py-2.5 text-xs font-semibold text-white bg-[#191C1E] hover:bg-[#2B2F34] rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-3.5 h-3.5 text-[#C59A4E]" />
            <span>Save Navigation</span>
          </button>
        </div>
      </div>

      {/* Header Visual Options */}
      <div className="bg-white rounded-3xl border border-[#E6DECE] p-6 lg:p-8 shadow-xs space-y-6">
        <h2 className="font-display text-base font-bold text-[#191C1E] border-b border-[#F0E8D9] pb-3">
          Navbar Behavior & CTA Settings
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs font-semibold text-[#191C1E] mb-1.5">
              Header Style
            </label>
            <select
              value={headerForm.style}
              onChange={(e) => setHeaderForm({ ...headerForm, style: e.target.value as any })}
              className="w-full px-3.5 py-2.5 text-xs text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-xl focus:outline-none"
            >
              <option value="glass">Floating Glass Blur (Default)</option>
              <option value="solid">Solid Background</option>
              <option value="transparent">Fully Transparent</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#191C1E] mb-1.5">
              Primary CTA Text
            </label>
            <input
              type="text"
              value={headerForm.ctaText}
              onChange={(e) => setHeaderForm({ ...headerForm, ctaText: e.target.value })}
              className="w-full px-3.5 py-2.5 text-xs text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-xl focus:outline-none focus:border-[#B58A3E]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#191C1E] mb-1.5">
              CTA Action Target URL
            </label>
            <input
              type="text"
              value={headerForm.ctaUrl}
              onChange={(e) => setHeaderForm({ ...headerForm, ctaUrl: e.target.value })}
              className="w-full px-3.5 py-2.5 text-xs text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-xl focus:outline-none focus:border-[#B58A3E]"
            />
          </div>
        </div>

        <div className="flex items-center gap-6 pt-2">
          <label className="flex items-center gap-2 text-xs font-medium text-[#191C1E] cursor-pointer">
            <input
              type="checkbox"
              checked={headerForm.isSticky}
              onChange={(e) => setHeaderForm({ ...headerForm, isSticky: e.target.checked })}
              className="accent-[#B58A3E]"
            />
            <span>Sticky Header on Scroll</span>
          </label>
          <label className="flex items-center gap-2 text-xs font-medium text-[#191C1E] cursor-pointer">
            <input
              type="checkbox"
              checked={headerForm.showCta}
              onChange={(e) => setHeaderForm({ ...headerForm, showCta: e.target.checked })}
              className="accent-[#B58A3E]"
            />
            <span>Display CTA Button</span>
          </label>
        </div>
      </div>

      {/* Navigation Items Reorder List */}
      <div className="bg-white rounded-3xl border border-[#E6DECE] p-6 lg:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-[#F0E8D9] pb-4">
          <h2 className="font-display text-base font-bold text-[#191C1E]">
            Menu Links & Ordering
          </h2>
          <button
            onClick={handleAddLink}
            className="px-3.5 py-1.5 text-xs font-semibold text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] hover:border-[#B58A3E] rounded-xl flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-[#B58A3E]" />
            <span>Add Nav Link</span>
          </button>
        </div>

        <div className="space-y-3">
          {items.map((item, index) => (
            <div
              key={item.id}
              className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                item.isEnabled ? 'bg-white border-[#E6DECE]' : 'bg-[#FAF8F5]/60 border-[#E6DECE]/50 opacity-60'
              }`}
            >
              <div className="flex items-center gap-3 flex-1">
                <span className="font-mono text-xs text-[#8C9199] w-5">
                  {index + 1}.
                </span>
                <input
                  type="text"
                  value={item.label}
                  onChange={(e) => {
                    const copy = [...items];
                    copy[index].label = e.target.value;
                    setItems(copy);
                  }}
                  className="px-3 py-1.5 text-xs font-bold text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-lg focus:outline-none w-36"
                  placeholder="Link Label"
                />
                <input
                  type="text"
                  value={item.url}
                  onChange={(e) => {
                    const copy = [...items];
                    copy[index].url = e.target.value;
                    setItems(copy);
                  }}
                  className="px-3 py-1.5 text-xs text-[#5F6368] font-mono bg-[#FAF8F5] border border-[#E6DECE] rounded-lg focus:outline-none flex-1 max-w-sm"
                  placeholder="e.g. /projects or #services"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleMove(index, 'up')}
                  disabled={index === 0}
                  className="p-1.5 rounded-lg border border-[#E6DECE] hover:bg-[#FAF8F5] disabled:opacity-30 cursor-pointer"
                  title="Move Up"
                >
                  <ArrowUp className="w-3.5 h-3.5 text-[#5F6368]" />
                </button>
                <button
                  onClick={() => handleMove(index, 'down')}
                  disabled={index === items.length - 1}
                  className="p-1.5 rounded-lg border border-[#E6DECE] hover:bg-[#FAF8F5] disabled:opacity-30 cursor-pointer"
                  title="Move Down"
                >
                  <ArrowDown className="w-3.5 h-3.5 text-[#5F6368]" />
                </button>
                <button
                  onClick={() => handleToggle(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                    item.isEnabled ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {item.isEnabled ? 'Visible' : 'Hidden'}
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-1.5 text-red-400 hover:text-red-600 rounded-lg hover:bg-red-50 cursor-pointer"
                  title="Remove Link"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
