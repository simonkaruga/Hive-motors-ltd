import type { Metadata } from 'next';
import { Award, Users, Globe, Shield, CheckCircle, Car } from 'lucide-react';
import RevealOnScroll from '@/components/shared/RevealOnScroll';
import StatCounter from '@/components/home/StatCounter';
import { WHATSAPP_NUMBER } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About Hive Motors Ltd | Quality Car Dealers Nairobi',
  description: "Kenya's trusted car dealership based in Ridgeways, Nairobi. 10+ years experience, 500+ cars sold, sourced globally at honest prices.",
  keywords: ['about Hive Motors', 'car dealer Nairobi', 'car importer Kenya', 'Ridgeways car dealer'],
  alternates: { canonical: 'https://www.hivemotorsltd.com/about' },
  openGraph: {
    title: 'About Hive Motors Ltd | Nairobi Car Dealer',
    description: "Kenya's trusted car dealership. 10+ years, 500+ cars sold.",
    url: 'https://www.hivemotorsltd.com/about',
  },
  twitter: { card: 'summary_large_image', title: 'About Hive Motors Ltd | Nairobi, Kenya' },
};

const values = [
  { icon: Award, title: 'Quality Assured', desc: 'Every vehicle is thoroughly inspected before purchase — only the best make it to our lot.' },
  { icon: Users, title: 'Customer First', desc: 'Dedicated support from inquiry through delivery and beyond.' },
  { icon: Globe, title: 'Direct Import', desc: 'We source from trusted dealers and auctions worldwide to get you the best deal.' },
  { icon: Shield, title: 'Transparent Process', desc: 'Clear pricing, no hidden fees, full documentation support.' },
];

const milestones = [
  { year: '2014', event: 'Hive Motors Founded', desc: 'Started with a mission to bring quality imported cars to Kenya.' },
  { year: '2016', event: '100+ Cars Imported', desc: 'Hit our first major milestone, building a trusted client base.' },
  { year: '2019', event: 'Expanded Showroom', desc: 'Moved to our current location in Ridgeways to serve more clients.' },
  { year: '2022', event: '500+ Happy Clients', desc: 'Crossed 500 satisfied customers across Kenya.' },
  { year: '2024', event: 'Digital Platform Launch', desc: 'Launched our world-class website to serve you 24/7.' },
];

export default function AboutPage() {
  return (
    <main className="bg-white min-h-screen">

      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-grey-soft to-blue-tint">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-block bg-red-brand/10 text-red-brand text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
                Est. 2014 · Nairobi, Kenya
              </span>
              <h1 className="text-5xl md:text-6xl font-display text-navy-brand mb-6 leading-tight">
                About Hive Motors
              </h1>
              <div className="w-16 h-1 bg-red-brand mx-auto mb-6 rounded-full" />
              <p className="text-red-brand font-semibold text-xl italic">
                Dream Cars, Real Deals!
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <RevealOnScroll>
              <div>
                <h2 className="text-3xl md:text-4xl font-display text-navy-brand mb-6">
                  Kenya's Most Trusted<br />
                  <span className="text-red-brand">Car Import Dealer</span>
                </h2>
                <div className="w-12 h-1 bg-red-brand rounded-full mb-6" />
                <p className="text-charcoal text-lg leading-relaxed mb-6">
                  Since 2014, Hive Motors has been Kenya's trusted destination for quality imported vehicles.
                  We specialise in sourcing, importing, and delivering premium cars that combine reliability,
                  performance, and value.
                </p>
                <p className="text-charcoal leading-relaxed mb-6">
                  Our name reflects our philosophy: like a hive, we work together with precision and dedication
                  to bring you the golden opportunity of owning your dream car. Every vehicle we import is
                  carefully selected, inspected, and cleared so you get nothing but the best.
                </p>
                <div className="flex flex-wrap gap-3">
                  {['Toyota', 'Nissan', 'Subaru', 'Honda', 'Mazda', 'Mitsubishi'].map((make) => (
                    <span key={make} className="bg-blue-tint text-navy-brand text-sm font-medium px-3 py-1.5 rounded-full">
                      {make}
                    </span>
                  ))}
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.15}>
              <div className="bg-blue-tint rounded-2xl p-8">
                <blockquote className="text-2xl font-display text-navy-brand italic leading-relaxed text-center">
                  &ldquo;We don't just sell cars — we find you the right car, at the right price, with the right support.&rdquo;
                </blockquote>
                <div className="mt-6 text-center">
                  <p className="font-semibold text-navy-brand">Hive Motors Team</p>
                  <p className="text-mid-grey text-sm">Ridgeways, Kiambu Road, Nairobi</p>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-navy-brand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { end: 500, suffix: '+', label: 'Cars Imported' },
              { end: 450, suffix: '+', label: 'Happy Clients' },
              { end: 10, suffix: '+', label: 'Years Experience' },
              { end: 3, suffix: '', label: 'Countries Sourced' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-red-brand font-mono mb-2">
                  <StatCounter end={stat.end} suffix={stat.suffix} label={stat.label} />
                </div>
                <p className="text-white/70 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-display text-navy-brand mb-4">Our Core Values</h2>
              <div className="w-12 h-1 bg-red-brand mx-auto rounded-full" />
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <RevealOnScroll key={i} delay={i * 0.08}>
                <div className="bg-grey-soft rounded-2xl p-6 text-center hover:shadow-lg hover:shadow-navy-brand/10 transition-all duration-300 group">
                  <div className="w-14 h-14 bg-red-brand/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-red-brand/20 transition-colors">
                    <value.icon size={24} className="text-red-brand" />
                  </div>
                  <h3 className="font-bold text-navy-brand text-lg mb-2">{value.title}</h3>
                  <p className="text-mid-grey text-sm leading-relaxed">{value.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Journey / Timeline */}
      <section className="py-20 bg-grey-soft">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-display text-navy-brand mb-4">Our Journey</h2>
              <div className="w-12 h-1 bg-red-brand mx-auto rounded-full" />
            </div>
          </RevealOnScroll>

          <div className="relative">
            {/* Center line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-brand via-navy-brand to-navy-brand/20 -translate-x-1/2 hidden md:block" />

            {milestones.map((milestone, i) => (
              <RevealOnScroll key={i} delay={i * 0.1}>
                <div className={`flex items-start gap-6 mb-10 md:mb-12 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Content */}
                  <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
                      <div className="text-2xl font-bold text-red-brand font-mono mb-1">{milestone.year}</div>
                      <div className="font-bold text-navy-brand text-lg mb-1">{milestone.event}</div>
                      <div className="text-mid-grey text-sm leading-relaxed">{milestone.desc}</div>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="hidden md:flex w-10 h-10 shrink-0 bg-red-brand rounded-full border-4 border-white shadow-md items-center justify-center z-10">
                    <CheckCircle size={18} className="text-white" />
                  </div>

                  <div className="hidden md:block flex-1" />
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <RevealOnScroll>
            <Car size={40} className="text-red-brand mx-auto mb-4" />
            <h2 className="text-3xl font-display text-navy-brand mb-4">
              Ready to Drive Your Dream Car?
            </h2>
            <p className="text-mid-grey mb-8">
              Browse our current inventory or contact us to source your perfect car from anywhere in the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/cars"
                className="bg-red-brand text-white px-8 py-4 rounded-xl font-semibold hover:bg-red-dark transition-colors"
              >
                Browse Inventory
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-navy-brand text-navy-brand px-8 py-4 rounded-xl font-semibold hover:bg-navy-brand hover:text-white transition-colors"
              >
                WhatsApp Us
              </a>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </main>
  );
}
