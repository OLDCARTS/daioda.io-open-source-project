import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { categories } from '../lib/taxonomy';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const projects = (await getCollection('projects')).filter((p) => p.data.featured);
  const sorted = projects.sort((a, b) => b.data.added.localeCompare(a.data.added));
  return rss({
    title: 'DAIODA — Daybreak',
    description: 'New genuinely open-source AI projects, license-verified and brought ashore each week.',
    site: context.site!,
    items: sorted.map((p) => ({
      title: `${p.data.name} — ${p.data.tagline}`,
      description: `${p.data.description} · License: ${p.data.license.code} (${p.data.license.verdict}). ${p.data.take}`,
      link: `/projects/${p.id}`,
      categories: [categories[p.data.category].name],
      pubDate: new Date(p.data.added + 'T12:00:00Z'),
    })),
    customData: '<language>en-us</language>',
  });
}
