import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';

// Before the Astro 6 upgrade, dynamic pages were published under URLs that
// contained the markdown file name verbatim (e.g. ".../projekte/soldisk.md/",
// ".../schwerpunkte/Biographieforschung.md/"). Redirect those old URLs to the
// clean ones so existing external links keep working.
const projektIds = [
  'cl-narration',
  'communication-digital-media',
  'ddr-childhood',
  'dfg-aesthetic-practice',
  'longitudinal-interviews',
  'myths-ddr',
  'soldisk',
];
const schwerpunktOldToNew = {
  'Biographieforschung': 'biographieforschung',
  'solidarity': 'solidarity',
  'symbolic-practice': 'symbolic-practice',
};
// Astro prepends `base` to redirect sources but not to their targets, so the
// targets must include it explicitly.
const base = '/Website-Michael-Corsten';
const legacyRedirects = Object.fromEntries(
  ['de', 'en'].flatMap((lang) => [
    ...projektIds.map((id) => [
      `/${lang}/forschung/projekte/${id}.md`,
      `${base}/${lang}/forschung/projekte/${id}`,
    ]),
    ...Object.entries(schwerpunktOldToNew).map(([oldId, newId]) => [
      `/${lang}/forschung/schwerpunkte/${oldId}.md`,
      `${base}/${lang}/forschung/schwerpunkte/${newId}`,
    ]),
  ])
);

export default defineConfig({
  site: 'https://Michael-1961.github.io',
  base,
  redirects: legacyRedirects,
  vite: {
    plugins: [tailwindcss()]
  },
  i18n: {
    defaultLocale: 'de',
    locales: ['de', 'en'],
    routing: {
      // set explicitly: Astro 6 changed the routing defaults
      prefixDefaultLocale: true,
      redirectToDefaultLocale: true
    }
  },
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeSlug, rehypeKatex]
  }
});
