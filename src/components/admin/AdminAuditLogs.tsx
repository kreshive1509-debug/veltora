import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { Download, Upload, RotateCcw, ShieldCheck, Check } from 'lucide-react';

export const AdminAuditLogs: React.FC = () => {
  const { auditLogs, exportDataJson, importDataJson, resetToDefaults } = useCms();
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const handleExport = () => {
    const jsonStr = exportDataJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Veltora_CMS_Backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const content = event.target?.result as string;
      const success = await importDataJson(content);
      if (success) {
        setImportStatus('CMS Data Imported Successfully!');
        setTimeout(() => setImportStatus(null), 3000);
      } else {
        alert('Invalid CMS backup JSON format.');
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to restore all CMS content to authentic factory defaults? Any custom edits will be reset.')) {
      resetToDefaults();
      setImportStatus('Restored to factory defaults.');
      setTimeout(() => setImportStatus(null), 3000);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-[#E6DECE] p-8 shadow-xs max-w-5xl space-y-10">
      {/* Backup and Restore Controls */}
      <div>
        <div className="mb-6 pb-4 border-b border-[#F0E8D9]">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#926E28] block mb-1">
            Data Reliability
          </span>
          <h1 className="font-display text-2xl font-bold text-[#191C1E]">
            CMS Backup, Restore & Reset
          </h1>
        </div>

        {importStatus && (
          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>{importStatus}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 bg-[#FAF8F5] border border-[#E6DECE] rounded-2xl flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-bold text-[#191C1E] mb-1">Export JSON Snapshot</h3>
              <p className="text-[11px] text-[#6B7280] mb-4">
                Download a complete, offline portable backup of all CMS records.
              </p>
            </div>
            <button
              onClick={handleExport}
              className="w-full py-2 px-3 text-xs font-semibold text-white bg-[#191C1E] rounded-xl flex items-center justify-center gap-1.5 hover:bg-[#2B2F34] transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-[#C59A4E]" />
              <span>Download Backup</span>
            </button>
          </div>

          <div className="p-5 bg-[#FAF8F5] border border-[#E6DECE] rounded-2xl flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-bold text-[#191C1E] mb-1">Restore from Snapshot</h3>
              <p className="text-[11px] text-[#6B7280] mb-4">
                Upload a previously exported JSON backup file.
              </p>
            </div>
            <label className="w-full py-2 px-3 text-xs font-semibold text-[#191C1E] bg-white border border-[#E6DECE] rounded-xl flex items-center justify-center gap-1.5 hover:bg-[#FAF6EE] transition-colors cursor-pointer text-center">
              <Upload className="w-3.5 h-3.5 text-[#926E28]" />
              <span>Choose Backup File</span>
              <input type="file" accept=".json" onChange={handleImport} className="hidden" />
            </label>
          </div>

          <div className="p-5 bg-[#FAF8F5] border border-[#E6DECE] rounded-2xl flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-bold text-[#191C1E] mb-1">Restore Factory Defaults</h3>
              <p className="text-[11px] text-[#6B7280] mb-4">
                Reset all services, leadership, and hero settings to clean initial state.
              </p>
            </div>
            <button
              onClick={handleReset}
              className="w-full py-2 px-3 text-xs font-semibold text-red-600 bg-white border border-red-200 rounded-xl flex items-center justify-center gap-1.5 hover:bg-red-50 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restore Defaults</span>
            </button>
          </div>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="pt-6 border-t border-[#F0E8D9]">
        <h2 className="font-display text-lg font-bold text-[#191C1E] mb-4">
          Activity Audit History
        </h2>

        <div className="space-y-2">
          {auditLogs.map((log) => (
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
          ))}
        </div>
      </div>
    </div>
  );
};
