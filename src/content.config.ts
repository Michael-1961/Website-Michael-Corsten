import { defineCollection, z } from 'astro:content';

const person = z.object({
  name: z.string(),
  url: z.string().url().optional(),
});

const forschungsprojekte = defineCollection({
  schema: z.object({
    title: z.string(),
    order: z.number().optional(),
    years: z.string().optional(),
    lead: z.array(person).optional(),
    team: z.array(person).optional(),
    funding: z.string().optional(),
    duration: z.string().optional(),
    contact: z.string().optional(),
    papers: z.array(z.string()).optional(),
    focus_area: z.string().optional(), // References a focus area ID (e.g., "Biographieforschung", "solidarity")
    status: z.string().optional(), // e.g., "laufend", "abgeschlossen", "in Vorbereitung"
  }),
});

const forschungsschwerpunkte = defineCollection({
  schema: z.object({
    title: z.string(),
    order: z.number().optional(),
    lead: z.array(person).optional(),
    team: z.array(person).optional(),
    subtopics: z.array(z.string()).optional(),
    papers: z.array(z.string()).optional(),
    status: z.string().optional(), // e.g., "laufend", "abgeschlossen", "in Vorbereitung"
  }),
});

export const collections = {
  forschungsprojekte,
  forschungsschwerpunkte,
};
