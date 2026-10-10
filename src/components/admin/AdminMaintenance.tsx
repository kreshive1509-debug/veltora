import React, { useEffect, useMemo, useState } from 'react';
import { Check, Clock3, Eye, Save, ShieldCheck, TriangleAlert } from 'lucide-react';
import { useCms } from '../../context/CmsContext';
import { MaintenanceSettings } from '../../types';
import { getMaintenanceState } from '../../services/maintenanceService';
import { MaintenancePage } from '../public/MaintenancePage';

const makeDefaultMaintenance = (): MaintenanceSettings => ({
  id: 'default',
  enabled: false,
  title: 'Scheduled maintenance',
  message: 'We are making improvements to Veltora.',
  description: 'We should be back shortly.',
  startAt: undefined,
  endAt: undefined,
  allowAdminAccess: true,
  showCountdown: false,
  updatedAt: new Date().toISOString(),
  updatedBy: undefined,
});

export const AdminMaintenance: React.FC = () => {
  const { maintenanceSettings, updateMaintenanceSettings, adminEmail } = useCms();
  const [draft, setDraft] = useState<MaintenanceSettings>(maintenanceSettings || makeDefaultMaintenance());
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    setDraft(maintenanceSettings || makeDefaultMaintenance());
  }, [maintenanceSettings]);

  const status = useMemo(() => getMaintenanceState(draft), [draft]);

  const handleSave = async () => {
    setSaving(true);
    setError(null);

    try {
      await updateMaintenanceSettings({
        ...draft,
        updatedBy: adminEmail || undefined,
      });
      setSaved(true);
      window.setTimeout(() => setSaved(false), 2200);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save maintenance settings.');
    } finally {
      setSaving(false);
    }
  };

  const updateField = <K extends keyof MaintenanceSettings>(key: K, value: MaintenanceSettings[K]) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-white rounded-3xl border border-[#E6DECE] p-8 shadow-xs max-w-6xl">
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-[#F0E8D9] gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#926E28] block mb-1">Service Availability</span>
          <h1 className="font-display text-2xl font-bold text-[#191C1E]">Maintenance Mode</h1>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-[#E6DECE] bg-[#FAF8F5] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#524F4A]">
          <ShieldCheck className="h-3.5 w-3.5 text-[#B58A3E]" />
          {status}
        </div>
      </div>

      {saved && (
        <div className="mb-6 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
          <Check className="h-3.5 w-3.5" />
          Maintenance settings saved
        </div>
      )}

      {error && (
        <div className="mb-6 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-700">
          <TriangleAlert className="h-3.5 w-3.5" />
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-8">
        <div className="space-y-5 rounded-2xl border border-[#E6DECE] bg-[#FAF8F5] p-5">
          <div className="flex items-center justify-between gap-3">
            <label className="flex items-center gap-2 text-xs font-semibold text-[#191C1E]">
              <input
                type="checkbox"
                checked={draft.enabled}
                onChange={(e) => updateField('enabled', e.target.checked)}
              />
              Enable maintenance mode
            </label>
            <button
              type="button"
              onClick={() => setPreviewMode((prev) => !prev)}
              className="inline-flex items-center gap-2 rounded-xl border border-[#E6DECE] bg-white px-3 py-2 text-[11px] font-semibold text-[#191C1E]"
            >
              <Eye className="h-3.5 w-3.5 text-[#B58A3E]" />
              {previewMode ? 'Hide preview' : 'Preview screen'}
            </button>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-[#191C1E]">Title</label>
            <input
              type="text"
              value={draft.title}
              onChange={(e) => updateField('title', e.target.value)}
              className="w-full rounded-xl border border-[#E6DECE] bg-white px-3 py-2.5 text-xs text-[#191C1E]"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-[#191C1E]">Message</label>
            <textarea
              rows={3}
              value={draft.message}
              onChange={(e) => updateField('message', e.target.value)}
              className="w-full rounded-xl border border-[#E6DECE] bg-white px-3 py-2.5 text-xs text-[#191C1E] resize-none"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-[#191C1E]">Description</label>
            <textarea
              rows={2}
              value={draft.description || ''}
              onChange={(e) => updateField('description', e.target.value || undefined)}
              className="w-full rounded-xl border border-[#E6DECE] bg-white px-3 py-2.5 text-xs text-[#191C1E] resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#191C1E]">Start date & time</label>
              <input
                type="datetime-local"
                value={draft.startAt ? new Date(draft.startAt).toISOString().slice(0, 16) : ''}
                onChange={(e) => updateField('startAt', e.target.value ? new Date(e.target.value).toISOString() : undefined)}
                className="w-full rounded-xl border border-[#E6DECE] bg-white px-3 py-2.5 text-xs text-[#191C1E]"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#191C1E]">End date & time</label>
              <input
                type="datetime-local"
                value={draft.endAt ? new Date(draft.endAt).toISOString().slice(0, 16) : ''}
                onChange={(e) => updateField('endAt', e.target.value ? new Date(e.target.value).toISOString() : undefined)}
                className="w-full rounded-xl border border-[#E6DECE] bg-white px-3 py-2.5 text-xs text-[#191C1E]"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <label className="flex items-center gap-2 text-xs font-medium text-[#191C1E]">
              <input
                type="checkbox"
                checked={draft.allowAdminAccess}
                onChange={(e) => updateField('allowAdminAccess', e.target.checked)}
              />
              Allow admin access
            </label>
            <label className="flex items-center gap-2 text-xs font-medium text-[#191C1E]">
              <input
                type="checkbox"
                checked={draft.showCountdown}
                onChange={(e) => updateField('showCountdown', e.target.checked)}
              />
              Show countdown
            </label>
          </div>

          <div className="flex items-center justify-end pt-2">
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-xl bg-[#191C1E] px-4 py-2.5 text-xs font-semibold text-white disabled:opacity-70"
            >
              <Save className="h-3.5 w-3.5 text-[#C59A4E]" />
              {saving ? 'Saving...' : 'Save maintenance settings'}
            </button>
          </div>
        </div>

        <div className="space-y-4 rounded-2xl border border-[#E6DECE] bg-[#FAF8F5] p-5">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#8A6A2F]">
            <Clock3 className="h-3.5 w-3.5" />
            Current status
          </div>
          <div className="rounded-xl border border-[#E6DECE] bg-white p-4">
            <div className="text-[10px] uppercase tracking-[0.2em] text-[#8A6A2F]">Effective state</div>
            <div className="mt-2 text-xl font-bold text-[#191C1E]">{status}</div>
          </div>
          <div className="rounded-xl border border-[#E6DECE] bg-white p-4 text-xs text-[#52575E] space-y-2">
            <div><span className="font-semibold text-[#191C1E]">Enabled:</span> {draft.enabled ? 'Yes' : 'No'}</div>
            <div><span className="font-semibold text-[#191C1E]">Start:</span> {draft.startAt ? new Date(draft.startAt).toLocaleString() : 'Not scheduled'}</div>
            <div><span className="font-semibold text-[#191C1E]">End:</span> {draft.endAt ? new Date(draft.endAt).toLocaleString() : 'Open ended'}</div>
            <div><span className="font-semibold text-[#191C1E]">Admin access:</span> {draft.allowAdminAccess ? 'Allowed' : 'Blocked'}</div>
            <div><span className="font-semibold text-[#191C1E]">Countdown:</span> {draft.showCountdown ? 'Visible' : 'Hidden'}</div>
          </div>
        </div>
      </div>

      {previewMode && (
        <div className="mt-8 border-t border-[#E6DECE] pt-8">
          <div className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#8A6A2F]">Preview</div>
          <MaintenancePage previewMode />
        </div>
      )}
    </div>
  );
};
