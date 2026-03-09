# 🚀 Hive Motors - Deployment Guide

## Prerequisites

- GitHub account
- Vercel account (free tier)
- Sanity account (free tier)
- Domain name (optional)

## Step 1: Sanity CMS Setup

### 1.1 Create Sanity Project

```bash
# Install Sanity CLI globally
npm install -g @sanity/cli

# Login to Sanity
sanity login

# Create new project
sanity init --project-name "Hive Motors" --dataset production
```

### 1.2 Set Up Sanity Studio

```bash
# In your project root
cd sanity-studio  # or create new folder

# Initialize studio
sanity init

# Install dependencies
npm install

# Start studio locally
sanity dev
```

### 1.3 Deploy Sanity Studio

```bash
# Deploy to Sanity's hosting
sanity deploy

# You'll get a URL like: https://your-project.sanity.studio
```

### 1.4 Import Schemas

Copy the schemas from `/sanity/schemas/` to your Sanity Studio project:
- `car.ts`
- `testimonial.ts`
- `siteSettings.ts`

## Step 2: Environment Variables

### 2.1 Get Sanity Project ID

Find it in:
- Sanity dashboard: https://www.sanity.io/manage
- Or in `sanity.json` file

### 2.2 Update `.env.local`

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_actual_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_WHATSAPP_NUMBER=254712345678
```

## Step 3: Add Content to Sanity

### 3.1 Add Site Settings

1. Go to your Sanity Studio
2. Create "Site Settings" document
3. Add:
   - Business phone
   - WhatsApp number
   - Email
   - Address
   - Social media links
   - Hero headline/subheadline

### 3.2 Add Car Listings

For each car:
1. Click "Cars" → "Create new"
2. Fill in all fields:
   - Title (e.g., "Toyota Land Cruiser Prado TX 2019")
   - Generate slug
   - Status (available/sold/on-transit)
   - Upload images (minimum 4 recommended)
   - Price in KSh
   - Year, Make, Model
   - All specifications
   - Description
   - Features list
3. Check "Featured on Homepage" for 6 best cars
4. Publish

### 3.3 Add Testimonials (Optional)

1. Click "Testimonials" → "Create new"
2. Add customer name, review, rating
3. Upload photo (optional)
4. Publish

## Step 4: Test Locally

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
# Verify:
# - Cars appear on homepage
# - Inventory page shows all cars
# - Filters work
# - Car detail pages load
# - WhatsApp button works
```

## Step 5: Deploy to Vercel

### 5.1 Push to GitHub

```bash
# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Initial Hive Motors website"

# Create GitHub repo and push
git remote add origin https://github.com/yourusername/hive-motors.git
git branch -M main
git push -u origin main
```

### 5.2 Deploy on Vercel

1. Go to https://vercel.com
2. Click "New Project"
3. Import your GitHub repository
4. Configure:
   - Framework Preset: Next.js
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`

5. Add Environment Variables:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_WHATSAPP_NUMBER=254712345678
   ```

6. Click "Deploy"

### 5.3 Wait for Deployment

- First deployment takes 2-3 minutes
- You'll get a URL like: `https://hive-motors.vercel.app`

## Step 6: Custom Domain (Optional)

### 6.1 Add Domain in Vercel

1. Go to Project Settings → Domains
2. Add your domain (e.g., `hivemotors.co.ke`)
3. Follow DNS configuration instructions

### 6.2 Update DNS Records

Add these records at your domain registrar:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

Wait 24-48 hours for DNS propagation.

## Step 7: Post-Deployment Checklist

### 7.1 Verify All Pages

- [ ] Homepage loads with featured cars
- [ ] Inventory page shows all cars
- [ ] Filters work correctly
- [ ] Car detail pages load
- [ ] On Transit page works
- [ ] Financing calculator functions
- [ ] About page displays
- [ ] Contact form submits
- [ ] WhatsApp button opens correctly
- [ ] Mobile navigation works

### 7.2 Update Contact Information

Replace placeholder values in:
- `components/layout/Footer.tsx` - Phone, email, address
- `components/shared/WhatsAppButton.tsx` - WhatsApp number
- `components/cars/CarCard.tsx` - WhatsApp number
- `app/cars/[slug]/page.tsx` - Phone and WhatsApp
- `app/contact/page.tsx` - All contact details

### 7.3 Add Real Images

1. Upload high-quality car photos to Sanity
2. Recommended: 6-10 images per car
3. First image is the main thumbnail
4. Minimum resolution: 1200x800px

### 7.4 SEO Setup

Update metadata in each page:
- `app/layout.tsx` - Site-wide metadata
- `app/page.tsx` - Homepage metadata
- `app/cars/page.tsx` - Inventory metadata
- Add Open Graph images

## Step 8: Ongoing Maintenance

### Adding New Cars

1. Go to Sanity Studio
2. Create new car document
3. Fill all fields
4. Publish
5. Website updates automatically (60s cache)

### Updating Prices

1. Find car in Sanity Studio
2. Update price field
3. Publish
4. Changes reflect in ~60 seconds

### Marking Cars as Sold

1. Open car in Sanity Studio
2. Change status to "sold"
3. Publish
4. Car shows SOLD badge automatically

## Troubleshooting

### Cars not showing?

- Check Sanity project ID in `.env.local`
- Verify cars are published in Sanity
- Check browser console for errors
- Redeploy on Vercel

### Images not loading?

- Verify images uploaded to Sanity
- Check image URLs in browser network tab
- Ensure Sanity CDN is accessible

### WhatsApp not working?

- Verify number format: 254XXXXXXXXX (no + or spaces)
- Test on mobile device
- Check WhatsApp is installed

### Build failing?

```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

## Performance Optimization

### Enable ISR (Incremental Static Regeneration)

Already configured for:
- Homepage: 60s revalidation
- Car listings: On-demand

### Image Optimization

- All images use `next/image`
- Automatic WebP conversion
- Lazy loading enabled
- Responsive sizes

### Caching Strategy

- Static pages: Cached at edge
- Dynamic pages: Server-rendered
- API calls: 60s cache

## Support & Resources

- Next.js Docs: https://nextjs.org/docs
- Sanity Docs: https://www.sanity.io/docs
- Vercel Docs: https://vercel.com/docs
- Tailwind Docs: https://tailwindcss.com/docs

---

**🎉 Congratulations! Your Hive Motors website is live!**
