#!/usr/bin/env node

import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';
import dotenv from 'dotenv';

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

async function testAudiQ8Images() {
  console.log('🚗 Testing Audi Q8 images specifically...\n');

  try {
    const audiQ8 = await client.fetch(`
      *[_type == "car" && title match "*audi*" || title match "*q8*"][0] {
        _id,
        title,
        "slug": slug.current,
        status,
        "images": images[]{..., asset->}
      }
    `);

    if (!audiQ8) {
      console.log('❌ Audi Q8 not found');
      return;
    }

    console.log('✅ Found Audi Q8:');
    console.log(`   Title: ${audiQ8.title}`);
    console.log(`   Slug: ${audiQ8.slug}`);
    console.log(`   Status: ${audiQ8.status}`);
    console.log(`   Images: ${audiQ8.images?.length || 0}\n`);

    if (audiQ8.images && audiQ8.images.length > 0) {
      console.log('🖼️  Testing image URLs:\n');
      
      audiQ8.images.forEach((img, index) => {
        try {
          console.log(`   Image ${index + 1}:`);
          console.log(`   - Asset ID: ${img.asset?._id || 'Missing'}`);
          console.log(`   - Asset Ref: ${img.asset?._ref || 'Missing'}`);
          
          if (img.asset) {
            const imageUrl = urlFor(img).width(800).height(600).auto('format').quality(75).url();
            console.log(`   - Generated URL: ${imageUrl}`);
            console.log(`   ✅ URL generation successful\n`);
          } else {
            console.log(`   ❌ Missing asset reference\n`);
          }
        } catch (error) {
          console.log(`   ❌ Error generating URL: ${error.message}\n`);
        }
      });

      // Test the first image specifically
      console.log('🔗 Testing first image in browser-compatible format:');
      const firstImage = audiQ8.images[0];
      if (firstImage?.asset) {
        const testUrl = urlFor(firstImage).width(1200).height(800).auto('format').quality(75).url();
        console.log(`\n📸 First image URL for testing:`);
        console.log(`${testUrl}\n`);
        console.log(`🌐 Test this URL in your browser - it should show the image`);
        console.log(`📋 Car page URL: http://localhost:3000/cars/${audiQ8.slug}`);
      }
    } else {
      console.log('❌ No images found for Audi Q8');
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testAudiQ8Images();