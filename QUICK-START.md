# ✅ HIVE MOTORS - QUICK START CHECKLIST

## 🚀 Getting Started (5 Minutes)

### Step 1: Install & Run Locally
```bash
cd /home/simon/Hive-motors-ltd
npm install
npm run dev
```
Open: http://localhost:3000

---

## 📋 Pre-Launch Checklist

### ✅ Code Review
- [ ] Homepage loads correctly
- [ ] All 7 pages accessible via navbar
- [ ] Animations working smoothly
- [ ] Mobile menu opens/closes
- [ ] WhatsApp button visible

### ✅ Sanity CMS Setup
- [ ] Create account at sanity.io
- [ ] Run `sanity init` to create project
- [ ] Copy project ID to `.env.local`
- [ ] Deploy Sanity Studio: `sanity deploy`
- [ ] Import schemas from `/sanity/schemas/`

### ✅ Content Addition
- [ ] Add Site Settings (phone, email, address)
- [ ] Upload at least 10 car listings
- [ ] Mark 6 cars as "Featured"
- [ ] Add car images (4-6 per car)
- [ ] Add 3-5 testimonials (optional)

### ✅ Configuration Updates
- [ ] Update WhatsApp number in `.env.local`
- [ ] Update phone in `components/layout/Footer.tsx`
- [ ] Update email in `components/layout/Footer.tsx`
- [ ] Update address in `components/layout/Footer.tsx`
- [ ] Update Google Maps embed in `app/contact/page.tsx`

### ✅ Testing
- [ ] Test all filters on inventory page
- [ ] Click through to car detail pages
- [ ] Test financing calculator sliders
- [ ] Submit contact form (check console)
- [ ] Test WhatsApp button on mobile
- [ ] Test on mobile device (responsive)

### ✅ Deployment
- [ ] Push code to GitHub
- [ ] Create Vercel account
- [ ] Import GitHub repo to Vercel
- [ ] Add environment variables in Vercel
- [ ] Deploy and get live URL
- [ ] Test live site thoroughly

### ✅ Post-Launch
- [ ] Add custom domain (optional)
- [ ] Set up Google Analytics
- [ ] Submit sitemap to Google
- [ ] Share on social media
- [ ] Train client on Sanity CMS

---

## 🔧 Quick Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm start                # Start production server

# Sanity
sanity init              # Initialize Sanity project
sanity deploy            # Deploy Sanity Studio
sanity manage            # Open Sanity dashboard

# Git
git add .
git commit -m "Initial commit"
git push origin main
```

---

## 📞 Important Files to Update

### 1. Environment Variables (`.env.local`)
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_actual_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_WHATSAPP_NUMBER=254712345678
```

### 2. Footer Contact Info
File: `components/layout/Footer.tsx`
- Line 28: Phone number
- Line 29: Email address
- Line 30: Physical address

### 3. WhatsApp Numbers
Files to update:
- `components/shared/WhatsAppButton.tsx` (line 6)
- `components/cars/CarCard.tsx` (line 27)
- `app/cars/[slug]/page.tsx` (line 42)

### 4. Google Maps
File: `app/contact/page.tsx`
- Line 115: Replace with your actual Google Maps embed URL

---

## 🎯 Success Criteria

Your site is ready when:
- ✅ All pages load without errors
- ✅ Featured cars appear on homepage
- ✅ Inventory page shows all cars
- ✅ Filters work correctly
- ✅ Car detail pages display properly
- ✅ WhatsApp button opens correctly
- ✅ Contact form submits
- ✅ Mobile navigation works
- ✅ Images load fast
- ✅ No console errors

---

## 🆘 Troubleshooting

### Cars not showing?
1. Check Sanity project ID in `.env.local`
2. Verify cars are published in Sanity Studio
3. Check browser console for errors
4. Restart dev server: `npm run dev`

### Build errors?
```bash
rm -rf .next node_modules
npm install
npm run build
```

### Sanity connection issues?
1. Verify project ID matches Sanity dashboard
2. Check dataset name is "production"
3. Ensure Sanity Studio is deployed
4. Check CORS settings in Sanity

---

## 📚 Documentation Reference

- **README.md** - Project overview
- **SETUP.md** - Detailed setup guide
- **DEPLOYMENT.md** - Full deployment instructions
- **PHASE1-COMPLETE.md** - Phase 1 features
- **PHASE2-COMPLETE.md** - Phase 2 features
- **PROJECT-COMPLETE.md** - Complete summary

---

## 🎉 You're Ready!

Everything is built and tested. Follow this checklist and you'll be live in no time!

**Questions?** Check the documentation files above.

---

**🐝 Hive Motors Ltd - Drive Your Dream**
