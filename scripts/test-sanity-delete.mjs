#!/usr/bin/env node

/**
 * Sanity Delete Test & Fix Script
 * 
 * This script tests delete permissions and provides solutions
 * for common delete issues in Sanity Studio.
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

async function testDeletePermissions() {
  console.log('🔍 Testing Sanity delete permissions...\n');

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

    // Check API token permissions
    console.log('🔑 Checking API token permissions...');
    
    if (!process.env.SANITY_API_TOKEN) {
      console.log('❌ No SANITY_API_TOKEN found in .env.local');
      console.log('\n💡 Solution:');
      console.log('   1. Go to https://sanity.io/manage');
      console.log('   2. Select your project');
      console.log('   3. Go to API → Tokens');
      console.log('   4. Create a new token with "Editor" permissions');
      console.log('   5. Add it to your .env.local file');
      return;
    }

    // Test if we can fetch with token
    const clientWithToken = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
      apiVersion: '2024-01-01',
      token: process.env.SANITY_API_TOKEN,
      useCdn: false,
    });

    try {
      const testFetch = await clientWithToken.fetch('*[_type == "car"][0]{_id, title}');
      console.log('✅ API token is working for read operations');
    } catch (tokenError) {
      console.log('❌ API token is invalid or expired');
      console.log(`   Error: ${tokenError.message}`);
      console.log('\n💡 Solution:');
      console.log('   1. Go to https://sanity.io/manage');
      console.log('   2. Select your project');
      console.log('   3. Go to API → Tokens');
      console.log('   4. Check if your token is still valid');
      console.log('   5. Create a new token with "Editor" permissions if needed');
      return;
    }

    // Test delete permissions by trying to create and delete a test document
    console.log('\n🗑️  Testing delete permissions...');
    
    try {
      // Create a test document
      const testDoc = await clientWithToken.create({
        _type: 'car',
        title: 'DELETE_TEST_CAR_IGNORE',
        status: 'sold',
        price: 1,
        year: 2000,
        make: 'Test',
        model: 'Test',
        mileage: 1,
        transmission: 'manual',
        fuelType: 'petrol',
        slug: { current: 'delete-test-' + Date.now() }
      });

      console.log('✅ Can create documents');

      // Try to delete the test document
      await clientWithToken.delete(testDoc._id);
      console.log('✅ Can delete documents');
      
      console.log('\n🎉 Delete permissions are working correctly!');
      console.log('\n📋 If you still can\'t delete in Studio:');
      console.log('   1. Try refreshing the Studio page');
      console.log('   2. Clear your browser cache');
      console.log('   3. Make sure you\'re logged in to the correct Sanity account');
      console.log('   4. Check if you have "Editor" or "Administrator" role in the project');

    } catch (deleteError) {
      console.log('❌ Cannot delete documents');
      console.log(`   Error: ${deleteError.message}`);
      
      if (deleteError.message.includes('Insufficient permissions')) {
        console.log('\n💡 Solution - Token Permissions:');
        console.log('   1. Go to https://sanity.io/manage');
        console.log('   2. Select your project');
        console.log('   3. Go to API → Tokens');
        console.log('   4. Delete your current token');
        console.log('   5. Create a new token with "Editor" permissions');
        console.log('   6. Update your .env.local file with the new token');
      } else if (deleteError.message.includes('User does not have')) {
        console.log('\n💡 Solution - User Permissions:');
        console.log('   1. Go to https://sanity.io/manage');
        console.log('   2. Select your project');
        console.log('   3. Go to Members');
        console.log('   4. Make sure your account has "Editor" or "Administrator" role');
        console.log('   5. Ask the project owner to upgrade your permissions if needed');
      } else {
        console.log('\n💡 General Solutions:');
        console.log('   1. Check your internet connection');
        console.log('   2. Try logging out and back into Sanity Studio');
        console.log('   3. Clear browser cache and cookies');
        console.log('   4. Try a different browser');
      }
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    
    if (error.message.includes('projectId')) {
      console.log('\n💡 Tip: Check your .env.local file and make sure NEXT_PUBLIC_SANITY_PROJECT_ID is set correctly');
    }
  }
}

// Run the test
testDeletePermissions();