import { defineCollection, z } from 'astro:content';

const forschungsprojekte = defineCollection({
  schema: z.object({
    title: z.string(),
    years: z.string().optional(),
    lead: z.string().optional(),
    team: z.string().optional(),
    funding: z.string().optional(),
    duration: z.string().optional(),
    contact: z.string().optional(),
    papers: z.array(z.string()).optional(),
  }),
});

const forschungsschwerpunkte = defineCollection({
  schema: z.object({
    title: z.string(),
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
