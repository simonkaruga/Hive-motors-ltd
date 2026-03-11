// Run: node scripts/fix-3008-images.mjs
// Uploads all 3008 images and patches the existing Sanity document.

import { createClient } from '@sanity/client';
import { readFileSync, createReadStream, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const env = readFileSync(join(root, '.env.local'), 'utf-8')
  .split('\n')
  .reduce((acc, line) => {
    const [k, ...v] = line.split('=');
    if (k && v.length) acc[k.trim()] = v.join('=').trim();
    return acc;
  }, {});

const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  token: env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});

function randomKey() {
  return Math.random().toString(36).slice(2, 10);
}

async function run() {
  // Find the existing 3008 document
  const doc = await client.fetch(`*[_type == "car" && slug.current == "peugeot-3008-cross-city"][0]{ _id, title, "imageCount": count(images) }`);
  if (!doc) {
    console.log('3008 document not found in Sanity!');
    process.exit(1);
  }
  console.log(`Found: ${doc.title} (${doc._id}) — currently has ${doc.imageCount} image(s)`);

  // Upload all 9 images
  const dir = join(root, 'public', 'cars', '3008');
  const files = readdirSync(dir).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f)).sort();
  console.log(`Uploading ${files.length} images...`);

  const assets = [];
  for (const file of files) {
    console.log(`  Uploading ${file}...`);
    const asset = await client.assets.upload('image', createReadStream(join(dir, file)), { filename: file });
    assets.push(asset);
  }

  const images = assets.map(asset => ({
    _type: 'image',
    _key: randomKey(),
    asset: { _type: 'reference', _ref: asset._id },
  }));

  // Patch the existing document
  await client.patch(doc._id).set({ images }).commit();
  console.log(`✅ Patched ${doc.title} with ${images.length} images.`);
}

run().catch(err => {
  console.error('Failed:', err.message);
  process.exit(1);
});
