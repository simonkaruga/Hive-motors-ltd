import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false, // disabled so newly added cars/images appear immediately
});

const builder = createImageUrlBuilder(client);

export function urlFor(source: Record<string, unknown> | { asset: unknown }) {
  return builder.image(source);
}
