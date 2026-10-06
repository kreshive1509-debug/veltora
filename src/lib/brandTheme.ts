import { BrandAppearanceSettings, BrandColors, ThemePresetKey } from '../types';

export interface ThemePresetDefinition {
  key: ThemePresetKey;
  label: string;
  description: string;
  colors: BrandColors;
}

export const THEME_PRESETS: ThemePresetDefinition[] = [
  {
    key: 'veltora_signature',
    label: 'Veltora Signature',
    description: 'Iconic light luxury palette with warm off-white, deep charcoal and subtle champagne gold.',
    colors: {
      primaryColor: '#B58A3E',
      secondaryColor: '#191C1E',
      accentColor: '#C5A059',
      backgroundColor: '#FAF8F5',
      surfaceColor: '#FFFFFF',
      textColor: '#191C1E',
      mutedTextColor: '#5F6368',
      borderColor: '#E6DECE',
    },
  },
  {
    key: 'ivory_luxury',
    label: 'Ivory Luxury',
    description: 'Ultra-refined alabaster tone with luminous warm surfaces and gilded accents.',
    colors: {
      primaryColor: '#9E772F',
      secondaryColor: '#1A1816',
      accentColor: '#D4AF37',
      backgroundColor: '#FCFAF6',
      surfaceColor: '#FFFFFF',
      textColor: '#1C1A17',
      mutedTextColor: '#66625B',
      borderColor: '#ECE4D4',
    },
  },
  {
    key: 'warm_premium',
    label: 'Warm Premium',
    description: 'Rich warm travertine foundation engineered for editorial technology aesthetics.',
    colors: {
      primaryColor: '#8C6727',
      secondaryColor: '#24201B',
      accentColor: '#BA8D3D',
      backgroundColor: '#F7F4EE',
      surfaceColor: '#FFFFFF',
      textColor: '#211D19',
      mutedTextColor: '#6B665E',
      borderColor: '#E5DDCF',
    },
  },
  {
    key: 'minimal_corporate',
    label: 'Minimal Corporate',
    description: 'Sleek, high-trust titanium slate and crisp neutral enterprise surfaces.',
    colors: {
      primaryColor: '#1E293B',
      secondaryColor: '#0F172A',
      accentColor: '#B58A3E',
      backgroundColor: '#F8FAFC',
      surfaceColor: '#FFFFFF',
      textColor: '#0F172A',
      mutedTextColor: '#64748B',
      borderColor: '#E2E8F0',
    },
  },
  {
    key: 'champagne_gold',
    label: 'Champagne Gold',
    description: 'Distinctive warm champagne gold luster for high-end digital consultancies.',
    colors: {
      primaryColor: '#C59A4E',
      secondaryColor: '#191C1E',
      accentColor: '#E6C37A',
      backgroundColor: '#FAF7F0',
      surfaceColor: '#FFFFFF',
      textColor: '#191C1E',
      mutedTextColor: '#635E55',
      borderColor: '#EDE1CC',
    },
  },
];

export const SUPPORTED_HEADING_FONTS = [
  { label: 'Syne (Modern Architectural Sans)', value: "'Syne', sans-serif" },
  { label: 'Plus Jakarta Sans (Crisp Modern Sans)', value: "'Plus Jakarta Sans', sans-serif" },
  { label: 'Cinzel (Editorial Luxury Serif)', value: "'Cinzel', serif" },
  { label: 'Cormorant Garamond (Classical Refined Serif)', value: "'Cormorant Garamond', serif" },
  { label: 'Outfit (Clean Geometric Sans)', value: "'Outfit', sans-serif" },
  { label: 'Inter (High-Precision Tech Sans)', value: "'Inter', sans-serif" },
  { label: 'Playfair Display (High-Contrast Editorial)', value: "'Playfair Display', serif" },
];

export const SUPPORTED_BODY_FONTS = [
  { label: 'Plus Jakarta Sans (Recommended)', value: "'Plus Jakarta Sans', sans-serif" },
  { label: 'Inter (Clean Standard)', value: "'Inter', sans-serif" },
  { label: 'Outfit (Modern Soft)', value: "'Outfit', sans-serif" },
  { label: 'DM Sans (Contemporary)', value: "'DM Sans', sans-serif" },
];

export const initialBrandAppearance: BrandAppearanceSettings = {
  preset: 'veltora_signature',
  colors: {
    primaryColor: '#B58A3E',
    secondaryColor: '#191C1E',
    accentColor: '#C5A059',
    backgroundColor: '#FAF8F5',
    surfaceColor: '#FFFFFF',
    textColor: '#191C1E',
    mutedTextColor: '#5F6368',
    borderColor: '#E6DECE',
  },
  typography: {
    headingFont: "'Syne', sans-serif",
    bodyFont: "'Plus Jakarta Sans', sans-serif",
    headingWeight: 'bold',
    headingScale: 'balanced',
    bodyScale: 'standard',
  },
  visuals: {
    borderRadius: 'luxury',
    cardStyle: 'glass',
    buttonStyle: 'rounded',
    shadowIntensity: 'soft',
    containerWidth: 'standard',
    sectionSpacing: 'balanced',
    animationIntensity: 'balanced',
  },
  navbarCtaText: 'Start a Project',
  navbarCtaUrl: '#contact',
  showNavbarCta: true,
};

/**
 * Apply brand colors and typography settings directly into DOM Root CSS variables
 */
export function applyBrandThemeToDom(brand: BrandAppearanceSettings, faviconUrl?: string, companyName?: string) {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;

  // Colors
  root.style.setProperty('--color-primary', brand.colors.primaryColor);
  root.style.setProperty('--color-secondary', brand.colors.secondaryColor);
  root.style.setProperty('--color-accent', brand.colors.accentColor);
  root.style.setProperty('--color-bg', brand.colors.backgroundColor);
  root.style.setProperty('--color-surface', brand.colors.surfaceColor);
  root.style.setProperty('--color-text', brand.colors.textColor);
  root.style.setProperty('--color-muted', brand.colors.mutedTextColor);
  root.style.setProperty('--color-border', brand.colors.borderColor);

  // Typography
  root.style.setProperty('--font-display', brand.typography.headingFont);
  root.style.setProperty('--font-sans', brand.typography.bodyFont);

  // Border radius map
  const radiusMap: Record<string, string> = {
    sharp: '4px',
    subtle: '8px',
    modern: '14px',
    luxury: '24px',
    pill: '9999px',
  };
  root.style.setProperty('--brand-radius', radiusMap[brand.visuals.borderRadius] || '20px');

  // Favicon update
  if (faviconUrl) {
    let link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.href = faviconUrl;
  }

  // Document Title update if provided
  if (companyName && !document.title.includes(companyName)) {
    document.title = `${companyName} — Innovating Dreams`;
  }
}
