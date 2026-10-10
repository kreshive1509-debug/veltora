ALTER TABLE public.careers
    ALTER COLUMN google_form_url SET DEFAULT '',
    ALTER COLUMN is_enabled SET DEFAULT false;

UPDATE public.careers
SET google_form_url = '',
    is_enabled = false
WHERE id = 'default'
  AND google_form_url IN (
      'https://docs.google.com/forms/d/e/1FAIpQLSc-sample/viewform',
      'https://docs.google.com/forms/d/e/1FAIpQLSc-Veltora-Career-Application-Form/viewform'
  );