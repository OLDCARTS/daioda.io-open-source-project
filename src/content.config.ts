import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/data/projects' }),
  schema: z.object({
    name: z.string(),
    repo: z.string().url(),
    category: z.enum([
      'agents-coding',
      'local-private-ai',
      'models-weights',
      'generative-media',
      'audio-voice',
      'retrieval-knowledge',
      'computer-vision',
      'robotics',
      'science-data',
      'experimental',
    ]),
    collections: z.array(z.enum(['daybreak', 'night-shift', 'first-light', 'deep-water', 'fine-print'])).default([]),
    type: z.enum(['software', 'model', 'content']).default('software'),
    tagline: z.string().max(120),
    description: z.string(),
    why: z.string(),
    useCases: z.array(z.string()).min(1),
    audience: z.string(),
    setup: z.object({
      difficulty: z.enum(['trivial', 'easy', 'moderate', 'advanced']),
      requirements: z.string(),
    }),
    license: z.object({
      code: z.string(),
      weights: z.string().nullable().default(null),
      verdict: z.enum(['open', 'partial', 'not-open', 'unclear']),
      notes: z.string().optional(),
    }),
    tally: z.object({
      stars: z.string(),
      lastActivity: z.string(),
      status: z.enum(['maintained', 'experimental', 'stable', 'early', 'static']),
      checked: z.string(),
    }),
    links: z.object({
      docs: z.string().url().optional(),
      site: z.string().url().optional(),
      paper: z.string().url().optional(),
    }).default({}),
    limitations: z.string(),
    related: z.array(z.string()).default([]),
    take: z.string(), // the editorial takeaway
    added: z.string(), // ISO date
    featured: z.boolean().default(true),
  }),
});

export const collections = { projects };
