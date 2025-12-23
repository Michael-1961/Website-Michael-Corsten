export type Lang = 'de' | 'en';

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang === 'en') return 'en';
  return 'de';
}

export function getLocalizedPath(path: string, lang: Lang): string {
  // Remove leading slash and any existing lang prefix
  const cleanPath = path.replace(/^\/?(de|en)?/, '').replace(/^\//, '');
  return `/${lang}/${cleanPath}`.replace(/\/+$/, '') || `/${lang}`;
}

export function switchLang(currentPath: string, currentLang: Lang): string {
  const newLang = currentLang === 'de' ? 'en' : 'de';
  // Replace the lang prefix
  return currentPath.replace(/^\/(de|en)/, `/${newLang}`);
}

// Path mappings for localized routes
export const pathMappings = {
  de: {
    research: 'forschung',
    publications: 'publikationen',
    cv: 'lebenslauf',
    contact: 'kontakt',
  },
  en: {
    research: 'research',
    publications: 'publications',
    cv: 'cv',
    contact: 'contact',
  },
} as const;

export function getLocalizedRoute(route: keyof typeof pathMappings.de, lang: Lang): string {
  return `/${lang}/${pathMappings[lang][route]}`;
}
