import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { Enquiry } from '../../types';
import {
  Inbox,
  Search,
  CheckCircle2,
  Trash2,
  MessageSquare,
  Mail,
  Phone,
  Copy,
  Check,
  X,
  Send,
  User,
  Clock,
  AlertCircle,
  Tag,
} from 'lucide-react';

export const AdminEnquiries: React.FC = () => {
  const {
    enquiries,
    updateEnquiryStatus,
    updateEnquiryDetails,
    addEnquiryNote,
    deleteEnquiry,
    siteSettings,
  } = useCms();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedEnq, setSelectedEnq] = useState<Enquiry | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [newNote, setNewNote] = useState('');

  const filteredEnquiries = enquiries.filter((e) => {
    const matchesSearch =
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase()) ||
      e.referenceNo.toLowerCase().includes(search.toLowerCase()) ||
      (e.company && e.company.toLowerCase().includes(search.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || e.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCopyRef = (refNo: string, id: string) => {
    navigator.clipboard.writeText(refNo);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEnq || !newNote.trim()) return;
    addEnquiryNote(selectedEnq.id, newNote.trim());
    setNewNote('');
    // refresh selectedEnq from updated list
    const updated = enquiries.find((en) => en.id === selectedEnq.id);
    if (updated) setSelectedEnq(updated);
  };

  return (
    <div className="space-y-6 max-w-6xl pb-16">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-[#E6DECE] p-6 lg:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#B58A3E] block mb-1">
            Lead CRM Pipeline
          </span>
          <h1 className="font-display text-2xl lg:text-3xl font-bold text-[#191C1E]">
            Client Enquiries & Intake
          </h1>
          <p className="text-xs text-[#5F6368] mt-1">
            Review incoming project briefs, track reference numbers ({`ENQ-YYYY-XXXXXX`}), and manage team notes.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3.5 py-2 text-xs bg-[#FAF8F5] border border-[#E6DECE] rounded-xl text-[#191C1E] focus:outline-none"
          >
            <option value="all">All Inquiries ({enquiries.length})</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="In Discussion">In Discussion</option>
            <option value="Converted">Converted</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-[#8C929C] absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search by client name, email, company, or reference number (e.g. ENQ-2026)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 text-xs text-[#191C1E] bg-white border border-[#E6DECE] rounded-xl focus:outline-none focus:border-[#B58A3E] shadow-2xs"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-[#E6DECE] overflow-hidden shadow-xs">
        {filteredEnquiries.length === 0 ? (
          <div className="py-12 text-center text-xs text-[#5F6368]">
            No client enquiries found matching your filter criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#E6DECE] bg-[#FAF8F5]/80 text-[#806429] font-semibold uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-4">Ref Number</th>
                  <th className="py-3 px-4">Client Contact</th>
                  <th className="py-3 px-4">Service Required</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0E8D9]">
                {filteredEnquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-[#FAF8F5]/50 transition-colors">
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => handleCopyRef(enq.referenceNo, enq.id)}
                        className="font-mono text-[11px] font-bold text-[#B58A3E] hover:underline flex items-center gap-1.5 cursor-pointer"
                        title="Click to Copy Reference No"
                      >
                        <span>{enq.referenceNo}</span>
                        {copiedId === enq.id ? (
                          <Check className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <Copy className="w-3 h-3 text-[#8C9199]" />
                        )}
                      </button>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-[#191C1E]">{enq.name}</div>
                      <div className="text-[11px] text-[#5F6368]">{enq.email}</div>
                      {enq.company && (
                        <div className="text-[10px] font-mono text-[#8C9199]">{enq.company}</div>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-medium text-[#191C1E]">{enq.service}</div>
                      {enq.budgetRange && (
                        <span className="text-[10px] text-[#806429] font-mono">
                          {enq.budgetRange}
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 font-mono text-[11px] text-[#5F6368]">
                      {new Date(enq.createdAt).toLocaleDateString()}
                    </td>

                    <td className="py-3.5 px-4">
                      <select
                        value={enq.status}
                        onChange={(e) => updateEnquiryStatus(enq.id, e.target.value as any)}
                        className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border focus:outline-none ${
                          enq.status === 'New'
                            ? 'bg-amber-50 text-amber-800 border-amber-200'
                            : enq.status === 'In Discussion'
                            ? 'bg-blue-50 text-blue-800 border-blue-200'
                            : enq.status === 'Converted'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : enq.status === 'Contacted'
                            ? 'bg-purple-50 text-purple-800 border-purple-200'
                            : 'bg-gray-100 text-gray-700 border-gray-200'
                        }`}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="In Discussion">In Discussion</option>
                        <option value="Converted">Converted</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedEnq(enq)}
                          className="px-2.5 py-1 text-[11px] font-semibold text-[#191C1E] bg-[#FAF8F5] hover:bg-[#F5F2EB] border border-[#E6DECE] rounded-lg transition-colors cursor-pointer"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete enquiry ${enq.referenceNo}?`)) deleteEnquiry(enq.id);
                          }}
                          className="p-1 text-red-400 hover:text-red-600 rounded cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail & Notes Modal */}
      {selectedEnq && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#E6DECE] max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-6 animate-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between border-b border-[#F0E8D9] pb-4">
              <div>
                <span className="text-[10px] font-mono text-[#B58A3E] font-bold block">
                  {selectedEnq.referenceNo}
                </span>
                <h3 className="font-display text-xl font-bold text-[#191C1E]">
                  Enquiry from {selectedEnq.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedEnq(null)}
                className="p-1 text-[#8C9199] hover:text-[#191C1E] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Client Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-[#FAF8F5] p-4 rounded-2xl border border-[#E6DECE]">
              <div>
                <span className="text-[#8C9199] block text-[10px]">Email Address</span>
                <a href={`mailto:${selectedEnq.email}`} className="font-semibold text-[#191C1E] hover:underline">
                  {selectedEnq.email}
                </a>
              </div>
              <div>
                <span className="text-[#8C9199] block text-[10px]">Phone Number</span>
                <span className="font-semibold text-[#191C1E]">{selectedEnq.phone}</span>
              </div>
              {selectedEnq.whatsapp && (
                <div>
                  <span className="text-[#8C9199] block text-[10px]">WhatsApp</span>
                  <a
                    href={`https://wa.me/${selectedEnq.whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(selectedEnq.name)},%20regarding%20your%20inquiry%20${selectedEnq.referenceNo}%20at%20Veltora...`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-emerald-700 hover:underline flex items-center gap-1"
                  >
                    <span>{selectedEnq.whatsapp} (Direct Chat)</span>
                  </a>
                </div>
              )}
              {selectedEnq.company && (
                <div>
                  <span className="text-[#8C9199] block text-[10px]">Organization</span>
                  <span className="font-semibold text-[#191C1E]">{selectedEnq.company}</span>
                </div>
              )}
              <div>
                <span className="text-[#8C9199] block text-[10px]">Requested Service</span>
                <span className="font-semibold text-[#191C1E]">{selectedEnq.service}</span>
              </div>
              <div>
                <span className="text-[#8C9199] block text-[10px]">Budget Range</span>
                <span className="font-semibold text-[#806429]">{selectedEnq.budgetRange || 'Flexible'}</span>
              </div>
            </div>

            {/* Message Body */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#191C1E]">
                Project Scope & Requirements
              </h4>
              <p className="text-xs sm:text-sm text-[#374151] bg-[#FAF8F5] p-4 rounded-xl border border-[#E6DECE] whitespace-pre-line leading-relaxed">
                {selectedEnq.message}
              </p>
            </div>

            {/* Internal Team Notes */}
            <div className="border-t border-[#F0E8D9] pt-4 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#191C1E] flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-[#B58A3E]" />
                Internal Team Notes
              </h4>

              <form onSubmit={handleAddNote} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add internal follow-up note..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs bg-[#FAF8F5] border border-[#E6DECE] rounded-xl focus:outline-none focus:border-[#B58A3E]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#191C1E] rounded-xl hover:bg-[#2B2F34] cursor-pointer"
                >
                  Post Note
                </button>
              </form>

              <div className="space-y-2 max-h-40 overflow-y-auto">
                {selectedEnq.notes && selectedEnq.notes.length > 0 ? (
                  selectedEnq.notes.map((n) => (
                    <div key={n.id} className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#E6DECE] text-xs space-y-1">
                      <div className="flex items-center justify-between text-[10px] text-[#8C9199]">
                        <span className="font-semibold text-[#191C1E]">{n.author}</span>
                        <span>{new Date(n.createdAt).toLocaleString()}</span>
                      </div>
                      <p className="text-[#374151]">{n.note}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-[11px] text-[#8C9199] italic">No notes posted yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
