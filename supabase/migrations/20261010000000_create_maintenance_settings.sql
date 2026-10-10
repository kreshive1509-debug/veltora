-- ==============================================================================
-- VELTORA IT SOLUTIONS - MAINTENANCE MODE SETTINGS TABLE
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.maintenance_settings (
    id TEXT PRIMARY KEY DEFAULT 'default',
    enabled BOOLEAN NOT NULL DEFAULT false,
    title TEXT NOT NULL DEFAULT 'Scheduled maintenance',
    message TEXT NOT NULL DEFAULT 'We are making improvements to Veltora.',
    description TEXT,
    start_at TIMESTAMPTZ,
    end_at TIMESTAMPTZ,
    allow_admin_access BOOLEAN NOT NULL DEFAULT true,
    show_countdown BOOLEAN NOT NULL DEFAULT false,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_by TEXT
);

INSERT INTO public.maintenance_settings (id, enabled, title, message, description, start_at, end_at, allow_admin_access, show_countdown, updated_at)
VALUES ('default', false, 'Scheduled maintenance', 'We are making improvements to Veltora.', 'We should be back shortly.', NULL, NULL, true, false, NOW())
ON CONFLICT (id) DO NOTHING;

ALTER TABLE public.maintenance_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read maintenance settings"
    ON public.maintenance_settings
    FOR SELECT
    USING (true);

CREATE POLICY "Admins can manage maintenance settings"
    ON public.maintenance_settings
    FOR ALL TO authenticated
    USING (true)
    WITH CHECK (true);
