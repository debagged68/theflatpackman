import type { MetadataRoute } from 'next';
import { indexable, pages, siteUrl } from '../content/site';

export default function sitemap(): MetadataRoute.Sitemap {
  if (!indexable) return [];
  return ['/', '/ikea-ideas', ...pages.filter(page => page.slug !== 'client-testimonials').map(page => '/' + page.slug)]
    .map(path => ({ url: new URL(path, siteUrl).href }));
}
