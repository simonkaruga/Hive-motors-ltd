// Run: node scripts/import-cars.mjs
// Uploads all static car images to Sanity and creates car documents.
// Run once, then remove static cars from app/cars/page.tsx.

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

async function uploadImages(folder) {
  const dir = join(root, 'public', 'cars', folder);
  const files = readdirSync(dir).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f)).sort();
  const assets = [];
  for (const file of files) {
    console.log(`  Uploading ${folder}/${file}...`);
    const asset = await client.assets.upload('image', createReadStream(join(dir, file)), {
      filename: file,
    });
    assets.push(asset);
  }
  return assets;
}

const cars = [
  {
    folder: 'prado',
    doc: {
      _type: 'car',
      title: '2020 Toyota Prado TX-L J150',
      slug: { _type: 'slug', current: 'prado-tx-l-j150' },
      status: 'available',
      price: 7250000,
      year: 2020,
      make: 'Toyota',
      model: 'Land Cruiser Prado TX-L',
      mileage: 68000,
      transmission: 'automatic',
      fuelType: 'diesel',
      engine: '2.8L Turbocharged',
      bodyType: 'suv',
      driveType: '4wd',
      colour: 'Blue',
      features: ['2800cc Turbocharged Diesel', '6-Speed Automatic', '4WD', '7 Leather Seats'],
      isFeatured: true,
    },
  },
  {
    folder: 'range-rover',
    doc: {
      _type: 'car',
      title: '2019 Range Rover Sport HSE',
      slug: { _type: 'slug', current: 'range-rover-sport-hse' },
      status: 'available',
      price: 9750000,
      year: 2019,
      make: 'Land Rover',
      model: 'Range Rover Sport HSE',
      mileage: 72000,
      transmission: 'automatic',
      fuelType: 'diesel',
      engine: '3.0L Turbocharged',
      bodyType: 'suv',
      driveType: '4wd',
      colour: 'Beige',
      features: ['3.0L Turbocharged Diesel', '8-Speed Automatic', 'Panoramic Sunroof'],
      isFeatured: true,
    },
  },
  {
    folder: 'gle',
    doc: {
      _type: 'car',
      title: '2019 Mercedes-Benz GLE400d AMG-Line',
      slug: { _type: 'slug', current: 'mercedes-gle400d-amg-line' },
      status: 'available',
      price: 12750000,
      year: 2019,
      make: 'Mercedes-Benz',
      model: 'GLE400d AMG-Line',
      mileage: 50000,
      transmission: 'automatic',
      fuelType: 'diesel',
      engine: '3.0L Turbocharged',
      bodyType: 'suv',
      driveType: '4wd',
      colour: 'Black',
      features: ['9G-Tronic Automatic', '330 BHP', 'Panoramic Sunroof'],
      isFeatured: true,
    },
  },
  {
    folder: 'cx5',
    doc: {
      _type: 'car',
      title: '2019 Mazda CX-5 AWD 2.5T',
      slug: { _type: 'slug', current: 'mazda-cx5-awd-25t' },
      status: 'available',
      price: 3400000,
      year: 2019,
      make: 'Mazda',
      model: 'CX-5 AWD 2.5T',
      mileage: 86000,
      transmission: 'automatic',
      fuelType: 'petrol',
      engine: '2.5L Turbocharged',
      bodyType: 'suv',
      driveType: 'awd',
      colour: 'Black',
      features: ['6-Speed Automatic', '228 BHP', 'HUD'],
      isFeatured: true,
    },
  },
  {
    folder: 'polo',
    doc: {
      _type: 'car',
      title: '2019 VW Polo Highline MK7.5',
      slug: { _type: 'slug', current: 'vw-polo-highline-mk75' },
      status: 'available',
      price: 2150000,
      year: 2019,
      make: 'Volkswagen',
      model: 'Polo Highline MK7.5',
      mileage: 22000,
      transmission: 'automatic',
      fuelType: 'petrol',
      engine: '1.0L Turbocharged',
      bodyType: 'hatchback',
      driveType: 'fwd',
      colour: 'White',
      features: ['7-Speed Automatic', 'Digital Cluster'],
      isFeatured: true,
    },
  },
  {
    folder: '3008',
    doc: {
      _type: 'car',
      title: '2019 Peugeot 3008 Cross City',
      slug: { _type: 'slug', current: 'peugeot-3008-cross-city' },
      status: 'available',
      price: 3350000,
      year: 2019,
      make: 'Peugeot',
      model: '3008 Cross City',
      mileage: 41000,
      transmission: 'automatic',
      fuelType: 'petrol',
      engine: '1.6L Turbocharged',
      bodyType: 'suv',
      driveType: 'fwd',
      colour: 'Grey',
      features: ['6-Speed Automatic', '165 BHP', 'Panoramic Sunroof'],
      isFeatured: true,
    },
  },
];

async function run() {
  for (const car of cars) {
    console.log(`\nImporting ${car.doc.title}...`);
    const assets = await uploadImages(car.folder);
    const images = assets.map(asset => ({
      _type: 'image',
      _key: randomKey(),
      asset: { _type: 'reference', _ref: asset._id },
    }));
    const created = await client.create({ ...car.doc, images });
    console.log(`  ✅ Created: ${created._id}`);
  }
  console.log('\nAll cars imported! You can now remove static cars from app/cars/page.tsx.');
}

run().catch(err => {
  console.error('Import failed:', err.message);
  process.exit(1);
});
