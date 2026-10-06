import React from 'react';
import { useCms } from '../../context/CmsContext';
import { Eye, EyeOff, ArrowUp, ArrowDown, Layers } from 'lucide-react';

export const AdminSections: React.FC = () => {
  const { homepageSections, updateHomepageSections, toggleHomepageSection } = useCms();

  const sortedSections = [...homepageSections].sort((a, b) => a.order - b.order);

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const newItems = [...sortedSections];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= newItems.length) return;

    const temp = newItems[index];
    newItems[index] = newItems[targetIdx];
    newItems[targetIdx] = temp;

    const reordered = newItems.map((item, idx) => ({ ...item, order: idx + 1 }));
    updateHomepageSections(reordered);
  };

  return (
    <div className="bg-white rounded-3xl border border-[#E6DECE] p-8 shadow-xs max-w-4xl">
      <div className="mb-8 pb-6 border-b border-[#F0E8D9]">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#926E28] block mb-1">
          Layout Structure
        </span>
        <h1 className="font-display text-2xl font-bold text-[#191C1E]">
          Homepage Sections Organizer
        </h1>
        <p className="text-xs text-[#6B7280] mt-1">
          Enable or disable specific sections and reorder their vertical appearance on the public homepage.
        </p>
      </div>

      <div className="space-y-3">
        {sortedSections.map((sec, idx) => (
          <div
            key={sec.id}
            className={`p-4 rounded-2xl border flex items-center justify-between gap-4 transition-all ${
              sec.isEnabled
                ? 'bg-[#FAF8F5] border-[#E6DECE]'
                : 'bg-gray-50 border-gray-200 opacity-60'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-[#8C929C] w-6">
                #{idx + 1}
              </span>
              <div>
                <h3 className="text-xs font-bold text-[#191C1E]">{sec.label}</h3>
                <p className="text-[11px] text-[#6B7280]">{sec.subtitle}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => moveSection(idx, 'up')}
                disabled={idx === 0}
                className="p-1.5 text-[#656A72] hover:text-[#191C1E] disabled:opacity-30 rounded-lg hover:bg-white border border-[#E6DECE]"
                title="Move Up"
              >
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => moveSection(idx, 'down')}
                disabled={idx === sortedSections.length - 1}
                className="p-1.5 text-[#656A72] hover:text-[#191C1E] disabled:opacity-30 rounded-lg hover:bg-white border border-[#E6DECE]"
                title="Move Down"
              >
                <ArrowDown className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => toggleHomepageSection(sec.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors ${
                  sec.isEnabled
                    ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {sec.isEnabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span>{sec.isEnabled ? 'Enabled' : 'Disabled'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
