import publicationsData from '../content/publikationen.json';

export interface Publication {
  id: string;
  authors: string;
  title: string;
  year?: number;
  journal?: string;
  volume?: string;
  pages?: string;
  in?: string;
  editors?: string;
  location?: string;
  publisher?: string;
  edition?: string;
  type: 'article' | 'book' | 'chapter' | 'edited' | 'conference';
  doi?: string;
  link?: string;
}

interface PublicationYear {
  year: number;
  entries: Publication[];
}

interface PublicationsData {
  publications: PublicationYear[];
}

const allPublications = new Map<string, Publication & { year: number }>();

// Build publication index
(publicationsData as PublicationsData).publications.forEach((yearGroup) => {
  yearGroup.entries.forEach((entry) => {
    allPublications.set(entry.id, { ...entry, year: yearGroup.year });
  });
});

/**
 * Get a publication by its ID
 */
export function getPublicationById(id: string): (Publication & { year: number }) | undefined {
  return allPublications.get(id);
}

/**
 * Get multiple publications by their IDs
 */
export function getPublicationsByIds(ids: string[]): (Publication & { year: number })[] {
  return ids
    .map((id) => allPublications.get(id))
    .filter((pub): pub is Publication & { year: number } => pub !== undefined);
}

/**
 * Get all publication IDs
 */
export function getAllPublicationIds(): string[] {
  return Array.from(allPublications.keys());
}

/**
 * Validate that all provided IDs exist
 * Returns array of invalid IDs
 */
export function validatePublicationIds(ids: string[]): string[] {
  return ids.filter((id) => !allPublications.has(id));
}
