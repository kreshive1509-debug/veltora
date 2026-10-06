import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { Leadership } from '../../types';
import { Save, Check, Edit2, Plus, Trash2, Award } from 'lucide-react';

export const AdminLeadership: React.FC = () => {
  const { leadership, updateLeadership, addLeadership, deleteLeadership } = useCms();
  const [editingId, setEditingId] = useState<string | null>(leadership[0]?.id || null);
  const [saved, setSaved] = useState(false);

  const currentLeader = leadership.find((l) => l.id === editingId) || leadership[0];

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentLeader) return;
    updateLeadership(currentLeader.id, currentLeader);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="bg-white rounded-3xl border border-[#E6DECE] p-8 shadow-xs max-w-4xl">
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-[#F0E8D9]">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#926E28] block mb-1">
            Executive Spotlight
          </span>
          <h1 className="font-display text-2xl font-bold text-[#191C1E]">
            Founder & Co-Founder Management
          </h1>
        </div>
        {saved && (
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5" />
            Leadership Saved
          </span>
        )}
      </div>

      {/* Selector Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {leadership.map((lead) => (
          <button
            key={lead.id}
            type="button"
            onClick={() => setEditingId(lead.id)}
            className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all flex items-center gap-2 ${
              editingId === lead.id
                ? 'bg-[#191C1E] text-white border-[#191C1E]'
                : 'bg-[#FAF8F5] text-[#52575E] border-[#E6DECE] hover:border-[#C59A4E]'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-[#C59A4E]" />
            <span>{lead.name} ({lead.roleType === 'founder' ? 'Founder' : 'Co-Founder'})</span>
          </button>
        ))}
      </div>

      {currentLeader && (
        <form onSubmit={handleUpdate} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                required
                value={currentLeader.name}
                onChange={(e) =>
                  updateLeadership(currentLeader.id, { name: e.target.value })
                }
                className="w-full px-3.5 py-2.5 text-xs text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-xl focus:outline-none focus:border-[#B58A3E]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1.5">
                Role Type
              </label>
              <select
                value={currentLeader.roleType}
                onChange={(e) =>
                  updateLeadership(currentLeader.id, {
                    roleType: e.target.value as Leadership['roleType'],
                  })
                }
                className="w-full px-3 py-2.5 text-xs text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-xl focus:outline-none focus:border-[#B58A3E]"
              >
                <option value="founder">Founder</option>
                <option value="co_founder">Co-Founder</option>
                <option value="other">Executive</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1.5">
                Designation Title
              </label>
              <input
                type="text"
                required
                value={currentLeader.designation}
                onChange={(e) =>
                  updateLeadership(currentLeader.id, { designation: e.target.value })
                }
                className="w-full px-3.5 py-2.5 text-xs text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-xl focus:outline-none focus:border-[#B58A3E]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#191C1E] mb-1.5">
              Portrait Photo URL (or ImgBB Link)
            </label>
            <input
              type="text"
              required
              value={currentLeader.photoUrl}
              onChange={(e) =>
                updateLeadership(currentLeader.id, { photoUrl: e.target.value })
              }
              className="w-full px-3.5 py-2.5 text-xs text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-xl focus:outline-none focus:border-[#B58A3E]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#191C1E] mb-1.5">
              Short Editorial Quote / Statement
            </label>
            <input
              type="text"
              required
              value={currentLeader.shortBio}
              onChange={(e) =>
                updateLeadership(currentLeader.id, { shortBio: e.target.value })
              }
              className="w-full px-3.5 py-2.5 text-xs text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-xl focus:outline-none focus:border-[#B58A3E]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#191C1E] mb-1.5">
              Full Executive Biography
            </label>
            <textarea
              rows={4}
              required
              value={currentLeader.fullBio}
              onChange={(e) =>
                updateLeadership(currentLeader.id, { fullBio: e.target.value })
              }
              className="w-full px-3.5 py-2.5 text-xs text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-xl focus:outline-none focus:border-[#B58A3E] resize-none"
            />
          </div>

          {/* Social Reachout Gateways */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 bg-[#FAF8F5] border border-[#E6DECE] rounded-2xl">
            <div>
              <label className="block text-[11px] font-semibold text-[#191C1E] mb-1">
                LinkedIn Profile URL
              </label>
              <input
                type="url"
                value={currentLeader.linkedinUrl || ''}
                onChange={(e) =>
                  updateLeadership(currentLeader.id, { linkedinUrl: e.target.value })
                }
                className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#191C1E] mb-1">
                GitHub URL
              </label>
              <input
                type="url"
                value={currentLeader.githubUrl || ''}
                onChange={(e) =>
                  updateLeadership(currentLeader.id, { githubUrl: e.target.value })
                }
                className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#191C1E] mb-1">
                Direct Email
              </label>
              <input
                type="email"
                value={currentLeader.email || ''}
                onChange={(e) =>
                  updateLeadership(currentLeader.id, { email: e.target.value })
                }
                className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#191C1E] mb-1">
                WhatsApp Phone
              </label>
              <input
                type="text"
                value={currentLeader.whatsapp || ''}
                onChange={(e) =>
                  updateLeadership(currentLeader.id, { whatsapp: e.target.value })
                }
                className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#191C1E] mb-1">
                Instagram URL
              </label>
              <input
                type="url"
                value={currentLeader.instagramUrl || ''}
                onChange={(e) =>
                  updateLeadership(currentLeader.id, { instagramUrl: e.target.value })
                }
                className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#191C1E] mb-1">
                Calendar / Portfolio Gateway
              </label>
              <input
                type="url"
                value={currentLeader.portfolioUrl || ''}
                onChange={(e) =>
                  updateLeadership(currentLeader.id, { portfolioUrl: e.target.value })
                }
                className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-[#F0E8D9] flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 text-xs font-semibold text-white bg-[#191C1E] hover:bg-[#2B2F34] rounded-xl transition-all shadow-md flex items-center gap-2"
            >
              <Save className="w-3.5 h-3.5 text-[#C59A4E]" />
              <span>Save Leadership Record</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
