# 🚗 Car Management Guide

This guide helps prevent and fix 404 errors when adding cars to your Hive Motors website.

## 🚨 Common Issue: 404 Errors on Car Pages

When you add a new car in Sanity Studio, you might get a 404 error when trying to view the car page. This happens when the **slug** field is not properly generated.

## 🔧 Quick Fix

### Method 1: Fix in Sanity Studio (Recommended)
1. Go to your Sanity Studio
2. Navigate to **Cars** section
3. Find the car that's showing 404
4. Click on the car to edit it
5. Look for the **Slug** field
6. Click the **"Generate"** button next to the slug field
7. **Save** the document
8. The car page should now work!

### Method 2: Use the Debug Tool
1. Visit `http://localhost:3000/debug-cars` in your browser
2. This page shows all cars and highlights any issues
3. Cars with missing slugs will be marked in red
4. Follow the instructions to fix them in Sanity Studio

### Method 3: Automatic Fix Script
Run this command in your terminal:
```bash
npm run fix-car-slugs
```

This script automatically generates slugs for all cars that are missing them.

## 🛡️ Prevention

To prevent 404 errors in the future:

### When Adding New Cars:
1. Fill in the **Car Title** field first
2. **Always** click the "Generate" button next to the Slug field
3. Make sure the slug appears before saving
4. Save the document

### Regular Maintenance:
- Run `npm run debug-cars` occasionally to check for issues
- Visit `/debug-cars` page to see the status of all cars
- Use the automatic fix script when needed

## 🔍 Understanding Slugs

A **slug** is the URL-friendly version of your car title:
- Car Title: "2020 Toyota Land Cruiser Prado"
- Slug: "2020-toyota-land-cruiser-prado"
- URL: `https://yoursite.com/cars/2020-toyota-land-cruiser-prado`

## 📋 Troubleshooting Checklist

If a car page shows 404:

- [ ] Check if the car has a slug in Sanity Studio
- [ ] Verify the slug is not empty or just spaces
- [ ] Make sure there are no duplicate slugs
- [ ] Confirm the car status is "Available" or "On Transit" (not "Sold")
- [ ] Check that the car has at least one image uploaded

## 🛠️ Available Tools

### Debug Page
- **URL**: `/debug-cars`
- **Purpose**: Visual overview of all cars and their status
- **Shows**: Missing slugs, duplicates, image count, creation date

### Fix Script
- **Command**: `npm run fix-car-slugs`
- **Purpose**: Automatically generates missing slugs
- **Safe**: Only affects cars with missing slugs

### Car Management Functions
Located in `lib/carManagement.ts`:
- `getAllCarsDebugInfo()` - Get all cars with debug info
- `validateCarSlugs()` - Check for slug issues
- `autoFixInvalidSlugs()` - Automatically fix missing slugs

## 🎯 Best Practices

1. **Always generate slugs** when creating new cars
2. **Use descriptive titles** that make good URLs
3. **Check the debug page** after adding multiple cars
4. **Run the fix script** if you notice any 404 errors
5. **Keep car titles consistent** for better SEO

## 🆘 Still Having Issues?

If you're still getting 404 errors after following this guide:

1. Check the browser console for error messages
2. Verify your Sanity connection in `.env.local`
3. Make sure the car exists in Sanity Studio
4. Try clearing your browser cache
5. Restart your development server (`npm run dev`)

## 📞 Support

For additional help, check:
- The debug page at `/debug-cars`
- Browser developer console for errors
- Sanity Studio for the actual car data

---

**Remember**: The slug is the most important field for making car pages work. Always generate it when adding new cars!