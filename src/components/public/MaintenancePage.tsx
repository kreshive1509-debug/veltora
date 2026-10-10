import React, { useEffect, useMemo, useState } from 'react';
import { ShieldAlert, Clock3, ArrowLeft } from 'lucide-react';
import { useCms } from '../../context/CmsContext';
import { getMaintenanceState } from '../../services/maintenanceService';

const formatCountdown = (ms: number) => {
  if (!Number.isFinite(ms) || ms <= 0) return 'Now';

  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  if (days > 0) return `${days}d ${hours}h ${minutes}m`;
  if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
  if (minutes > 0) return `${minutes}m ${seconds}s`;
  return `${seconds}s`;
};

interface MaintenancePageProps {
  previewMode?: boolean;
}

export const MaintenancePage: React.FC<MaintenancePageProps> = ({ previewMode = false }) => {
  const { maintenanceSettings, siteSettings } = useCms();
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const settings = maintenanceSettings;
  const status = previewMode ? 'active' : getMaintenanceState(settings);
  const effective = settings.enabled || previewMode ? settings : { ...settings, enabled: true };

  const targetTime = useMemo(() => {
    if (!effective.startAt) return null;
    const startMs = new Date(effective.startAt).getTime();
    if (Number.isNaN(startMs)) return null;
    return startMs;
  }, [effective.startAt]);

  const endTime = useMemo(() => {
    if (!effective.endAt) return null;
    const endMs = new Date(effective.endAt).getTime();
    if (Number.isNaN(endMs)) return null;
    return endMs;
  }, [effective.endAt]);

  const countdownMs = useMemo(() => {
    if (!effective.showCountdown || !targetTime) return null;
    return Math.max(targetTime - now, 0);
  }, [effective.showCountdown, now, targetTime]);

  const heading = effective.title || 'Scheduled maintenance';
  const body = effective.message || 'We are making improvements to Veltora.';
  const description = effective.description || 'We should be back shortly with the next release.';

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#191C1E] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl overflow-hidden rounded-[32px] border border-[#E6DECE] bg-white shadow-[0_20px_60px_rgba(25,28,30,0.08)]">
        <div className="grid md:grid-cols-[1.1fr_0.9fr]">
          <div className="p-8 md:p-12">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F4E7C6] text-[#B58A3E]">
                <ShieldAlert className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8A6A2F]">Maintenance mode</p>
                <p className="text-xs text-[#52575E]">{status.toUpperCase()}</p>
              </div>
            </div>

            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#926E28]">
              {siteSettings.shortName || 'Veltora'} is updating
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-[#191C1E] leading-tight">
              {heading}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-[#2C3035]">{body}</p>
            <p className="mt-4 max-w-xl text-sm leading-6 text-[#52575E]">{description}</p>

            {effective.showCountdown && countdownMs !== null && (
              <div className="mt-8 rounded-2xl border border-[#E6DECE] bg-[#FAF8F5] p-5">
                <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#8A6A2F]">
                  <Clock3 className="h-4 w-4" />
                  Estimated time remaining
                </div>
                <div className="text-3xl font-bold tracking-tight text-[#191C1E]">{formatCountdown(countdownMs)}</div>
                <div className="mt-2 text-xs text-[#52575E]">
                  {targetTime ? `Starts ${new Date(targetTime).toLocaleString()}` : 'Countdown available once schedule is configured'}
                </div>
              </div>
            )}

            {endTime && (
              <div className="mt-5 text-xs text-[#52575E]">
                Scheduled end: {new Date(endTime).toLocaleString()} {Intl.DateTimeFormat().resolvedOptions().timeZone}
              </div>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="inline-flex items-center gap-2 rounded-xl border border-[#E6DECE] bg-white px-4 py-2.5 text-xs font-semibold text-[#191C1E] transition hover:border-[#C59A4E]"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Go back
              </button>
            </div>
          </div>

          <div className="flex items-center justify-center bg-[#F7F2EA] p-8 md:p-12">
            <div className="w-full max-w-md rounded-[24px] bg-[#191C1E] p-6 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-[#D7B873]">Status</p>
                  <p className="mt-2 text-2xl font-bold">{status}</p>
                </div>
                <div className="rounded-full border border-[#C59A4E] bg-[#2B2F34] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#F4E7C6]">
                  {effective.allowAdminAccess ? 'Admin access on' : 'Public access only'}
                </div>
              </div>

              <div className="mt-6 space-y-3 text-sm text-[#E7E3DA]">
                <div className="flex items-center justify-between rounded-xl border border-[#2C3035] bg-[#24282B] px-3 py-2">
                  <span>Service availability</span>
                  <span className="font-semibold text-[#F4E7C6]">Limited</span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-[#2C3035] bg-[#24282B] px-3 py-2">
                  <span>Maintenance window</span>
                  <span className="font-semibold text-[#F4E7C6]">{effective.startAt ? new Date(effective.startAt).toLocaleString() : 'Immediate'}</span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-[#2C3035] bg-[#24282B] px-3 py-2">
                  <span>Time zone</span>
                  <span className="font-semibold text-[#F4E7C6]">{Intl.DateTimeFormat().resolvedOptions().timeZone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
