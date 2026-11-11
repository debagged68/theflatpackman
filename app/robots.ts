import type { MetadataRoute } from 'next';
import { indexable, siteUrl } from '../content/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/api/' },
    ...(indexable ? { sitemap: new URL('/sitemap.xml', siteUrl).href } : {}),
  };
}
