import { MetadataRoute } from 'next';
import { client } from '@/lib/sanity/client';

const BASE_URL = 'https://www.hivemotorsltd.com';

const slugsQuery = `{
  "cars": *[_type == "car"] { "slug": slug.current, _updatedAt },
  "posts": *[_type == "post"] { "slug": slug.current, _updatedAt }
}`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { cars, posts } = await client.fetch(slugsQuery);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${BASE_URL}/cars`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/on-transit`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/financing`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/testimonials`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
    { url: `${BASE_URL}/notify`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
  ];

  const staticCarRoutes: MetadataRoute.Sitemap = [
    'prado-static', 'range-rover-static', 'gle-static', 'cx5-static', 'polo-static', '3008-static',
  ].map(slug => ({
    url: `${BASE_URL}/cars/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const carRoutes: MetadataRoute.Sitemap = (cars ?? []).map((car: { slug: string; _updatedAt: string }) => ({
    url: `${BASE_URL}/cars/${car.slug}`,
    lastModified: new Date(car._updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const postRoutes: MetadataRoute.Sitemap = (posts ?? []).map((post: { slug: string; _updatedAt: string }) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post._updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...staticCarRoutes, ...carRoutes, ...postRoutes];
}
