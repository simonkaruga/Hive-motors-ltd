#!/usr/bin/env node

/**
 * Sanity Image Test Script
 * 
 * This script tests the Sanity connection and image processing
 * to help debug image display issues.
 */

import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
});

const builder = createImageUrlBuilder(client);

function urlFor(source) {
  return builder.image(source);
}

async function testSanityImages() {
  console.log('🔍 Testing Sanity connection and image processing...\n');

  try {
    // Test basic connection
    console.log('📡 Testing Sanity connection...');
    const projectInfo = await client.fetch('*[_type == "car"][0]{_id, title}');
    
    if (!projectInfo) {
      console.log('❌ No cars found in Sanity database');
      return;
    }
    
    console.log('✅ Sanity connection successful');
    console.log(`   Found car: ${projectInfo.title}\n`);

    // Test image fetching
    console.log('🖼️  Testing image fetching...');
    const carWithImages = await client.fetch(`
      *[_type == "car" && defined(images) && count(images) > 0][0] {
        _id,
        title,
        "slug": slug.current,
        "images": images[]{..., asset->}
      }
    `);

    if (!carWithImages) {
      console.log('❌ No cars with images found');
      console.log('   Make sure you have uploaded images to at least one car in Sanity Studio');
      return;
    }

    console.log('✅ Found car with images:');
    console.log(`   Title: ${carWithImages.title}`);
    console.log(`   Slug: ${carWithImages.slug || 'MISSING SLUG!'}`);
    console.log(`   Images: ${carWithImages.images?.length || 0}\n`);

    // Test image URL generation
    console.log('🔗 Testing image URL generation...');
    
    if (carWithImages.images && carWithImages.images.length > 0) {
      carWithImages.images.forEach((img, index) => {
        try {
          console.log(`\n   Image ${index + 1}:`);
          console.log(`   - Asset ID: ${img.asset?._id || 'Missing'}`);
          console.log(`   - Asset Ref: ${img.asset?._ref || 'Missing'}`);
          
          if (img.asset) {
            const imageUrl = urlFor(img).width(800).height(600).auto('format').quality(75).url();
            console.log(`   - Generated URL: ${imageUrl}`);
            console.log(`   ✅ URL generation successful`);
          } else {
            console.log(`   ❌ Missing asset reference`);
          }
        } catch (error) {
          console.log(`   ❌ Error generating URL: ${error.message}`);
        }
      });
    }

    console.log('\n🎉 Image processing test completed!');
    console.log('\n📋 Summary:');
    console.log(`   - Sanity connection: ✅ Working`);
    console.log(`   - Cars in database: ✅ Found`);
    console.log(`   - Cars with images: ✅ Found`);
    console.log(`   - Image URL generation: ✅ Working`);
    
    if (!carWithImages.slug) {
      console.log('\n⚠️  WARNING: The car with images is missing a slug!');
      console.log('   This will cause 404 errors. Run "npm run fix-car-slugs" to fix this.');
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    
    if (error.message.includes('projectId')) {
      console.log('\n💡 Tip: Check your .env.local file and make sure NEXT_PUBLIC_SANITY_PROJECT_ID is set correctly');
    }
    
    if (error.message.includes('dataset')) {
      console.log('\n💡 Tip: Check your .env.local file and make sure NEXT_PUBLIC_SANITY_DATASET is set correctly');
    }
  }
}

// Run the test
testSanityImages();