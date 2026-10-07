-- ==============================================================================
-- VELTORA IT SOLUTIONS - CREATE LEADERSHIP TABLE (SAFE INCREMENTAL MIGRATION)
-- Adds the missing public.leadership table for Founder & Co-Founder records while
-- leaving existing Team Members data and prior migration history untouched.
-- ==============================================================================

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS public.leadership (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    role_type TEXT NOT NULL CHECK (role_type IN ('founder', 'co_founder', 'other')),
    designation TEXT NOT NULL,
    short_bio TEXT NOT NULL,
    full_bio TEXT NOT NULL,
    photo_url TEXT NOT NULL,
    linkedin_url TEXT,
    instagram_url TEXT,
    github_url TEXT,
    email TEXT,
    whatsapp TEXT,
    portfolio_url TEXT,
    other_contact_url TEXT,
    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.leadership
    ADD COLUMN IF NOT EXISTS name TEXT,
    ADD COLUMN IF NOT EXISTS slug TEXT,
    ADD COLUMN IF NOT EXISTS role_type TEXT,
    ADD COLUMN IF NOT EXISTS designation TEXT,
    ADD COLUMN IF NOT EXISTS short_bio TEXT,
    ADD COLUMN IF NOT EXISTS full_bio TEXT,
    ADD COLUMN IF NOT EXISTS photo_url TEXT,
    ADD COLUMN IF NOT EXISTS linkedin_url TEXT,
    ADD COLUMN IF NOT EXISTS instagram_url TEXT,
    ADD COLUMN IF NOT EXISTS github_url TEXT,
    ADD COLUMN IF NOT EXISTS email TEXT,
    ADD COLUMN IF NOT EXISTS whatsapp TEXT,
    ADD COLUMN IF NOT EXISTS portfolio_url TEXT,
    ADD COLUMN IF NOT EXISTS other_contact_url TEXT,
    ADD COLUMN IF NOT EXISTS display_order INTEGER,
    ADD COLUMN IF NOT EXISTS is_active BOOLEAN,
    ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ,
    ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ;

UPDATE public.leadership
SET
    slug = COALESCE(slug, lower(regexp_replace(name, '[^a-z0-9]+', '-', 'g')) || '-' || substr(md5(random()::text), 1, 8)),
    role_type = COALESCE(role_type, 'other'),
    designation = COALESCE(designation, 'Leadership Team'),
    short_bio = COALESCE(short_bio, 'Leadership profile'),
    full_bio = COALESCE(full_bio, 'Leadership profile'),
    photo_url = COALESCE(photo_url, ''),
    display_order = COALESCE(display_order, 0),
    is_active = COALESCE(is_active, true),
    created_at = COALESCE(created_at, NOW()),
    updated_at = COALESCE(updated_at, NOW())
WHERE slug IS NULL
   OR role_type IS NULL
   OR designation IS NULL
   OR short_bio IS NULL
   OR full_bio IS NULL
   OR photo_url IS NULL
   OR display_order IS NULL
   OR is_active IS NULL
   OR created_at IS NULL
   OR updated_at IS NULL;

ALTER TABLE public.leadership
    ALTER COLUMN name SET NOT NULL,
    ALTER COLUMN slug SET NOT NULL,
    ALTER COLUMN role_type SET NOT NULL,
    ALTER COLUMN designation SET NOT NULL,
    ALTER COLUMN short_bio SET NOT NULL,
    ALTER COLUMN full_bio SET NOT NULL,
    ALTER COLUMN photo_url SET NOT NULL,
    ALTER COLUMN display_order SET DEFAULT 0,
    ALTER COLUMN is_active SET DEFAULT true,
    ALTER COLUMN created_at SET DEFAULT NOW(),
    ALTER COLUMN updated_at SET DEFAULT NOW();

CREATE UNIQUE INDEX IF NOT EXISTS idx_leadership_slug_unique
    ON public.leadership (slug);

CREATE INDEX IF NOT EXISTS idx_leadership_display_order
    ON public.leadership (display_order ASC);

CREATE INDEX IF NOT EXISTS idx_leadership_active_order
    ON public.leadership (is_active, display_order);

ALTER TABLE public.leadership ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read active leadership" ON public.leadership;
CREATE POLICY "Public can read active leadership"
    ON public.leadership FOR SELECT
    USING (is_active = true);

DROP POLICY IF EXISTS "Leadership admin access" ON public.leadership;
CREATE POLICY "Leadership admin access"
    ON public.leadership FOR ALL
    USING (
        auth.uid() IS NOT NULL
        AND auth.email() = 'login@veltora.com'
    )
    WITH CHECK (
        auth.uid() IS NOT NULL
        AND auth.email() = 'login@veltora.com'
    );

