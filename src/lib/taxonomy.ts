import taxonomy from '../data/taxonomy.json';

export type CategoryKey = keyof typeof taxonomy.categories;
export type CollectionKey = keyof typeof taxonomy.collections;

export const categories = taxonomy.categories as Record<
  string,
  { name: string; short: string; blurb: string; hue: number }
>;
export const collections = taxonomy.collections as Record<
  string,
  { name: string; blurb: string }
>;

export const categoryOrder: string[] = [
  'agents-coding',
  'models-weights',
  'local-private-ai',
  'generative-media',
  'audio-voice',
  'retrieval-knowledge',
  'computer-vision',
  'robotics',
  'science-data',
  'experimental',
];

export const collectionOrder: string[] = [
  'daybreak',
  'first-light',
  'night-shift',
  'deep-water',
  'fine-print',
];

export function verdictLabel(v: string): string {
  switch (v) {
    case 'open': return 'Open ✓';
    case 'partial': return 'Open code / restricted weights';
    case 'not-open': return 'Not open source';
    default: return 'Unverified';
  }
}
export function verdictClass(v: string): string {
  return `badge badge-${v}`;
}
export function difficultyLabel(d: string): string {
  return d.charAt(0).toUpperCase() + d.slice(1);
}
