#!/usr/bin/env node

/**
 * Car Slug Fix Script
 * 
 * This script automatically fixes missing or invalid car slugs in Sanity.
 * Run this whenever you add new cars to prevent 404 errors.
 * 
 * Usage: node scripts/fix-car-slugs.mjs
 */

import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim()
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

async function fixCarSlugs() {
  console.log('🔍 Checking for cars with missing or invalid slugs...\n');

  try {
    // Fetch all cars
    const cars = await client.fetch(`
      *[_type == "car"] {
        _id,
        title,
        "slug": slug.current,
        status
      }
    `);

    console.log(`Found ${cars.length} cars total`);

    // Find cars with missing slugs
    const carsWithoutSlugs = cars.filter(car => !car.slug || car.slug.trim() === '');
    
    if (carsWithoutSlugs.length === 0) {
      console.log('✅ All cars have valid slugs! No fixes needed.');
      return;
    }

    console.log(`\n🚨 Found ${carsWithoutSlugs.length} cars with missing slugs:`);
    
    for (const car of carsWithoutSlugs) {
      console.log(`  - "${car.title}" (ID: ${car._id})`);
    }

    console.log('\n🔧 Fixing slugs...\n');

    let fixed = 0;
    let errors = 0;

    for (const car of carsWithoutSlugs) {
      try {
        const newSlug = generateSlug(car.title);
        
        // Check if slug already exists
        const existingCar = await client.fetch(
          `*[_type == "car" && slug.current == $slug][0]`,
          { slug: newSlug }
        );

        let finalSlug = newSlug;
        if (existingCar && existingCar._id !== car._id) {
          // Add a number suffix if slug exists
          let counter = 1;
          while (true) {
            const testSlug = `${newSlug}-${counter}`;
            const testCar = await client.fetch(
              `*[_type == "car" && slug.current == $slug][0]`,
              { slug: testSlug }
            );
            if (!testCar) {
              finalSlug = testSlug;
              break;
            }
            counter++;
          }
        }

        // Update the car with the new slug
        await client
          .patch(car._id)
          .set({ 'slug.current': finalSlug })
          .commit();

        console.log(`✅ Fixed "${car.title}" → slug: "${finalSlug}"`);
        fixed++;

      } catch (error) {
        console.error(`❌ Error fixing "${car.title}":`, error.message);
        errors++;
      }
    }

    console.log(`\n📊 Summary:`);
    console.log(`  ✅ Fixed: ${fixed} cars`);
    console.log(`  ❌ Errors: ${errors} cars`);
    
    if (fixed > 0) {
      console.log(`\n🎉 Success! All car pages should now work properly.`);
      console.log(`Visit http://localhost:3000/debug-cars to verify the fixes.`);
    }

  } catch (error) {
    console.error('❌ Script failed:', error);
    process.exit(1);
  }
}

// Run the script
fixCarSlugs();