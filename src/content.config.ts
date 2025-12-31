import { defineCollection, z } from 'astro:content';

const forschungsprojekte = defineCollection({
  schema: z.object({
    title: z.string(),
    order: z.number().optional(),
    years: z.string().optional(),
    lead: z.string().optional(),
    team: z.string().optional(),
    funding: z.string().optional(),
    duration: z.string().optional(),
    contact: z.string().optional(),
    papers: z.array(z.string()).optional(),
    focus_area: z.string().optional(), // References a focus area ID (e.g., "Biographieforschung", "solidarity")
  }),
});

const forschungsschwerpunkte = defineCollection({
  schema: z.object({
    title: z.string(),
    order: z.number().optional(),
    lead: z.string().optional(),
    team: z.string().optional(),
    subtopics: z.array(z.string()).optional(),
    papers: z.array(z.string()).optional(),
  }),
});

export const collections = {
  forschungsprojekte,
  forschungsschwerpunkte,
};
