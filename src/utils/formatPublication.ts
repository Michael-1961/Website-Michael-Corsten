export function formatPublication(pub: any, lang: 'de' | 'en', showYear: boolean = false): string {
  let result = `<span class="text-slate-700 dark:text-slate-300">${pub.authors}</span>`;

  if (showYear && pub.year) {
    result += ` (${pub.year})`;
  }

  result += `: <span class="font-medium text-slate-900 dark:text-white">${pub.title}</span>`;

  if (pub.edition) {
    result += ` (${pub.edition})`;
  }

  if (pub.in) {
    result += `. In: `;
    if (pub.editors) {
      const editorAbbrev = lang === 'de' ? 'Hrsg.' : 'Eds.';
      result += `${pub.editors} (${editorAbbrev}), `;
    }
    result += pub.in;
  }

  if (pub.journal) {
    result += `. <em>${pub.journal}</em>`;
  }

  if (pub.volume) {
    result += `, ${pub.volume}`;
  }

  if (pub.pages) {
    result += `, ${lang === 'de' ? 'S.' : 'pp.'} ${pub.pages}`;
  }

  if (pub.publisher) {
    result += `. ${pub.publisher}`;
  }

  if (pub.location) {
    result += `. ${pub.location}`;
  }

  if (pub.doi) {
    result += `. <a href="https://doi.org/${pub.doi}" class="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener">DOI</a>`;
  }

  if (pub.link) {
    const linkLabel = pub.linkLabel || 'Link';
    result += `. <a href="${pub.link}" class="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener">${linkLabel}</a>`;
  }

  result += '.';
  return result;
}
