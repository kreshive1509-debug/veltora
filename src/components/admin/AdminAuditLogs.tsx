import React from 'react';
import { useCms } from '../../context/CmsContext';
import { ShieldCheck } from 'lucide-react';

export const AdminAuditLogs: React.FC = () => {
  const { auditLogs } = useCms();

  return (
    <div className="bg-white rounded-3xl border border-[#E6DECE] p-8 shadow-xs max-w-5xl">
      <div className="mb-6 pb-4 border-b border-[#F0E8D9]">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#926E28] block mb-1">
          Data Reliability
        </span>
        <h1 className="font-display text-2xl font-bold text-[#191C1E]">Activity Audit History</h1>
      </div>

      <div className="space-y-2">
        {auditLogs.length === 0 ? (
          <p className="text-sm text-[#6B7280]">No audit events are available.</p>
        ) : (
          auditLogs.map((log) => (
            <div
              key={log.id}
              className="p-3 bg-[#FAF8F5] border border-[#E6DECE] rounded-xl flex items-center justify-between gap-4 text-xs"
            >
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-bold text-[#191C1E]">{log.action}</span>
                  <span className="text-[10px] text-[#806429] uppercase">({log.entity})</span>
                  <span className="text-[11px] text-[#6B7280]">by {log.userEmail}</span>
                </div>
                <p className="text-[11px] text-[#52575E]">{log.details}</p>
              </div>
              <span className="text-[10px] font-mono text-[#8C929C] shrink-0">
                {new Date(log.timestamp).toLocaleString()}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
