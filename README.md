# 🐝 Hive Motors Ltd - Official Website

Premium Japanese Import Car Dealership Website built with Next.js 14, Tailwind CSS, and Sanity CMS.

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **CMS**: Sanity.io
- **Icons**: Lucide React
- **Fonts**: Inter, Playfair Display, JetBrains Mono
- **Hosting**: Vercel

## 📦 Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.local.example .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 🎨 Design System

### Colors
- **Midnight Black**: `#1A1A2E` - Primary background
- **Hive Gold**: `#D4AF37` - Brand accent
- **Cloud White**: `#F8F9FA` - Light sections
- **Steel Grey**: `#4A5568` - Supporting text

### Typography
- **Display**: Playfair Display (700)
- **Body**: Inter (400, 500, 600)
- **Mono**: JetBrains Mono (400)

### Spacing
All spacing follows a 4px base grid: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128px

## 📁 Project Structure

```
hive-motors-ltd/
├── app/                    # Next.js App Router pages
├── components/
│   ├── ui/                # Base components (Button, Badge)
│   ├── layout/            # Navbar, Footer
│   ├── cars/              # CarCard, FilterBar
│   ├── home/              # Hero, StatCounter
│   └── shared/            # WhatsAppButton, SectionHeader
├── lib/
│   └── sanity/            # Sanity client & queries
├── sanity/
│   └── schemas/           # CMS schemas (car, testimonial, settings)
└── public/                # Static assets
```

## 🔧 Sanity CMS Setup

1. Create a Sanity project at [sanity.io](https://www.sanity.io/)
2. Install Sanity CLI: `npm install -g @sanity/cli`
3. Initialize Sanity Studio: `sanity init`
4. Add your project ID to `.env.local`
5. Deploy studio: `sanity deploy`

## 🎯 Phase 1 Completed ✅

- ✅ Next.js 14 project setup
- ✅ Tailwind CSS with custom design system
- ✅ Sanity CMS schemas (Car, Testimonial, Settings)
- ✅ Core components (Navbar, Footer, Button, Badge)
- ✅ CarCard with hover animations
- ✅ Hero section with motion
- ✅ Animated stat counters
- ✅ Floating WhatsApp button
- ✅ Responsive mobile-first design

## 📋 Next Steps (Phase 2)

- [ ] Create inventory listing page with filters
- [ ] Build single car detail page with gallery
- [ ] Connect Sanity CMS and fetch real data
- [ ] Add image optimization with next/image
- [ ] Implement search and filter functionality

## 🌐 Deployment

```bash
# Build for production
npm run build

# Deploy to Vercel
vercel --prod
```

## 📞 Contact

For questions or support, contact Hive Motors Ltd.

---

**Built with ❤️ for Hive Motors Ltd**
