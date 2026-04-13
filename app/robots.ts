import { MetadataRoute } from 'next';

const BASE_URL = 'https://www.hivemotorsltd.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/studio/', '/api/', '/manage-cars/'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
