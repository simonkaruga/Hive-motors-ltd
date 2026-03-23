'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Ship, Calculator, CheckCircle, AlertCircle, ArrowRight, MessageCircle } from 'lucide-react';
import RevealOnScroll from '@/components/shared/RevealOnScroll';
import { WHATSAPP_NUMBER } from '@/lib/constants';

const STEPS = [
  {
    num: '01',
    title: 'Choose Your Car',
    desc: 'Browse auction sites like USS, TAA, or JAA in Japan, or tell us your specs and we source it for you. We check auction grades, mileage, and condition reports before bidding.',
  },
  {
    num: '02',
    title: 'Purchase & Export',
    desc: 'Once purchased, the car is prepared for export. A Japanese export certificate (de-registration) is issued. This takes 2–4 weeks.',
  },
  {
    num: '03',
    title: 'Sea Shipping to Mombasa',
    desc: 'Cars are shipped via RoRo (Roll-on Roll-off) vessel from Japan to Mombasa Port. Transit time is typically 4–6 weeks.',
  },
  {
    num: '04',
    title: 'Customs Clearance at KRA',
    desc: 'On arrival at Mombasa, KRA assesses import duty, excise duty, and VAT based on the car\'s CIF value (Cost + Insurance + Freight). We handle all paperwork.',
  },
  {
    num: '05',
    title: 'Delivery to Nairobi',
    desc: 'After clearance, the car is transported to our yard in Ridgeways, Nairobi. You inspect, pay the balance, and drive away.',
  },
];

const FAQS = [
  {
    q: 'What is the age limit for importing cars to Kenya?',
    a: 'Kenya allows importation of vehicles that are not more than 8 years old from the year of manufacture. For example, in 2025 you can import cars from 2017 onwards.',
  },
  {
    q: 'How long does the whole import process take?',
    a: 'From purchase in Japan to delivery in Nairobi, the process typically takes 8–12 weeks. This includes 2–4 weeks for export processing and 4–6 weeks for sea shipping.',
  },
  {
    q: 'Can I import a right-hand drive car to Kenya?',
    a: 'Yes. Kenya drives on the left, so right-hand drive (RHD) vehicles from Japan are perfectly legal and preferred.',
  },
  {
    q: 'What documents do I need?',
    a: 'You need: Export Certificate from Japan, Bill of Lading, Commercial Invoice, Packing List, and your KRA PIN. We handle all of these on your behalf.',
  },
  {
    q: 'Is it cheaper to import directly or buy locally?',
    a: 'Importing directly is typically 20–40% cheaper than buying the same car from a local dealer, especially for popular models like Toyota Prado, Land Cruiser, and Subaru Forester.',
  },
];

// KRA import duty rates (2025)
// Import Duty: 25%, Excise Duty: varies by engine cc, VAT: 16%, IDF: 3.5%, RDL: 2%
function calculateDuty(cifValue: number, engineCC: number, age: number) {
  const importDuty = cifValue * 0.25;

  let exciseRate = 0;
  if (engineCC <= 1000) exciseRate = 0.05;
  else if (engineCC <= 1500) exciseRate = 0.05;
  else if (engineCC <= 2000) exciseRate = 0.20;
  else if (engineCC <= 3000) exciseRate = 0.25;
  else exciseRate = 0.35;

  const exciseDuty = (cifValue + importDuty) * exciseRate;
  const idf = cifValue * 0.035;
  const rdl = cifValue * 0.02;
  const vatBase = cifValue + importDuty + exciseDuty + idf + rdl;
  const vat = vatBase * 0.16;
  const total = importDuty + exciseDuty + idf + rdl + vat;

  return { importDuty, exciseDuty, idf, rdl, vat, total };
}

export default function ImportGuidePage() {
  const [cifValue, setCifValue] = useState(800000);
  const [engineCC, setEngineCC] = useState(2000);

  const duty = calculateDuty(cifValue, engineCC, 3);
  const totalLandedCost = cifValue + duty.total;

  const waMsg = `Hi Hive Motors! I'd like help importing a car from Japan. My budget is around KSh ${cifValue.toLocaleString()}.`;

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <main className="bg-white min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-grey-soft to-blue-tint border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="max-w-3xl">
              <p className="text-sm text-mid-grey mb-2">
                <a href="/" className="hover:text-red-brand">Home</a>
                {' '}<span className="text-gray-300">›</span>{' '}
                <span className="text-red-brand">Import Guide</span>
              </p>
              <h1 className="text-4xl md:text-5xl font-display text-navy-brand mb-4 leading-tight">
                How to Import a Car from Japan to Kenya in 2025
              </h1>
              <p className="text-charcoal text-lg leading-relaxed mb-6">
                A complete step-by-step guide to importing a car from Japan to Kenya — including costs,
                import duty calculator, timelines, and what to watch out for.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#calculator" className="bg-red-brand text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-dark transition-colors">
                  Import Duty Calculator
                </a>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMsg)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="border-2 border-navy-brand text-navy-brand px-6 py-3 rounded-xl font-semibold hover:bg-navy-brand hover:text-white transition-colors"
                >
                  Get Help Importing
                </a>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Why Import from Japan */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <h2 className="text-3xl font-display text-navy-brand mb-4">Why Import from Japan?</h2>
            <div className="w-12 h-1 bg-red-brand rounded-full mb-6" />
            <p className="text-charcoal leading-relaxed mb-4">
              Japan is the world&apos;s largest exporter of used vehicles. Japanese cars are renowned for their
              reliability, low mileage, and excellent condition — largely because Japanese roads are well-maintained
              and the country has strict vehicle inspection laws (shaken) that encourage owners to sell cars early.
            </p>
            <p className="text-charcoal leading-relaxed mb-8">
              For Kenyan buyers, importing directly from Japan can save <strong className="text-navy-brand">20–40%</strong> compared
              to buying the same car from a local dealer. Popular models like Toyota Land Cruiser Prado, Subaru Forester,
              and Nissan X-Trail are widely available at Japanese auctions.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { stat: '20–40%', label: 'Cheaper than local dealers' },
                { stat: '8 yrs', label: 'Maximum import age (2025)' },
                { stat: '4–6 wks', label: 'Shipping time to Mombasa' },
              ].map((item, i) => (
                <div key={i} className="bg-blue-tint rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold text-red-brand font-mono mb-1">{item.stat}</div>
                  <div className="text-sm text-mid-grey">{item.label}</div>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Step by Step */}
      <section className="py-16 bg-grey-soft">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <h2 className="text-3xl font-display text-navy-brand mb-4">The Import Process — Step by Step</h2>
            <div className="w-12 h-1 bg-red-brand rounded-full mb-10" />
          </RevealOnScroll>
          <div className="space-y-6">
            {STEPS.map((step, i) => (
              <RevealOnScroll key={i} delay={i * 0.07}>
                <div className="bg-white rounded-2xl p-6 border border-gray-200 flex gap-5">
                  <div className="text-3xl font-black text-red-brand/20 font-mono leading-none shrink-0 w-10">{step.num}</div>
                  <div>
                    <h3 className="font-bold text-navy-brand text-lg mb-1">{step.title}</h3>
                    <p className="text-mid-grey text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Import Duty Calculator */}
      <section id="calculator" className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <h2 className="text-3xl font-display text-navy-brand mb-4">Kenya Import Duty Calculator 2025</h2>
            <div className="w-12 h-1 bg-red-brand rounded-full mb-4" />
            <p className="text-mid-grey mb-8 text-sm">
              Based on KRA rates: Import Duty (25%) + Excise Duty (varies by CC) + IDF (3.5%) + RDL (2%) + VAT (16%)
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <div className="bg-grey-soft rounded-2xl p-6 sm:p-8 border border-gray-200">
              <div className="space-y-6 mb-8">
                {/* CIF Value */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-navy-brand">CIF Value (Cost + Insurance + Freight)</label>
                    <span className="font-bold text-red-brand font-mono text-sm">KSh {cifValue.toLocaleString()}</span>
                  </div>
                  <input type="range" min="300000" max="5000000" step="50000" value={cifValue}
                    onChange={e => setCifValue(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    style={{ accentColor: '#DA1D17' }} />
                  <div className="flex justify-between text-xs text-mid-grey mt-1">
                    <span>KSh 300K</span><span>KSh 5M</span>
                  </div>
                </div>

                {/* Engine CC */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-navy-brand">Engine Size (CC)</label>
                    <span className="font-bold text-red-brand font-mono text-sm">{engineCC.toLocaleString()} cc</span>
                  </div>
                  <input type="range" min="660" max="4500" step="100" value={engineCC}
                    onChange={e => setEngineCC(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    style={{ accentColor: '#DA1D17' }} />
                  <div className="flex justify-between text-xs text-mid-grey mt-1">
                    <span>660cc</span><span>4,500cc</span>
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
                {[
                  { label: 'CIF Value', value: cifValue },
                  { label: 'Import Duty (25%)', value: duty.importDuty },
                  { label: `Excise Duty (${engineCC <= 1500 ? '5' : engineCC <= 2000 ? '20' : engineCC <= 3000 ? '25' : '35'}%)`, value: duty.exciseDuty },
                  { label: 'IDF (3.5%)', value: duty.idf },
                  { label: 'RDL (2%)', value: duty.rdl },
                  { label: 'VAT (16%)', value: duty.vat },
                ].map((row, i) => (
                  <div key={i} className="flex justify-between px-4 py-3 text-sm">
                    <span className="text-mid-grey">{row.label}</span>
                    <span className="font-mono font-medium text-navy-brand">KSh {Math.round(row.value).toLocaleString()}</span>
                  </div>
                ))}
                <div className="flex justify-between px-4 py-4 bg-navy-brand rounded-b-xl">
                  <span className="font-bold text-white">Total Taxes & Duties</span>
                  <span className="font-bold font-mono text-red-brand text-lg">KSh {Math.round(duty.total).toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-4 bg-blue-tint rounded-xl px-4 py-3 flex justify-between items-center">
                <span className="font-semibold text-navy-brand text-sm">Estimated Landed Cost</span>
                <span className="font-bold font-mono text-navy-brand">KSh {Math.round(totalLandedCost).toLocaleString()}</span>
              </div>

              <p className="text-xs text-mid-grey mt-3 italic">
                * Estimates only. Actual KRA assessment may vary. Contact us for a precise quote.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Cost Breakdown */}
      <section className="py-16 bg-grey-soft">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <h2 className="text-3xl font-display text-navy-brand mb-4">Full Cost of Importing a Car to Kenya</h2>
            <div className="w-12 h-1 bg-red-brand rounded-full mb-8" />
          </RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: 'Car Purchase Price', desc: 'The auction or dealer price in Japan (JPY), converted to KES.' },
              { title: 'Shipping (RoRo)', desc: 'Typically USD 800–1,500 depending on vessel and port of origin.' },
              { title: 'Marine Insurance', desc: 'Usually 1–2% of the car value. Required for CIF calculation.' },
              { title: 'Import Duty (25%)', desc: 'Charged on the CIF value by KRA at Mombasa port.' },
              { title: 'Excise Duty', desc: '5–35% depending on engine size. Charged on CIF + Import Duty.' },
              { title: 'VAT (16%)', desc: 'Charged on the total of CIF + Import Duty + Excise + IDF + RDL.' },
              { title: 'IDF (3.5%)', desc: 'Import Declaration Fee charged on CIF value.' },
              { title: 'Clearing Agent Fees', desc: 'KSh 30,000–60,000 for customs clearance and documentation.' },
              { title: 'Transport to Nairobi', desc: 'KSh 15,000–30,000 to truck the car from Mombasa to Nairobi.' },
              { title: 'NTSA Registration', desc: 'KSh 5,000–15,000 for number plates and logbook.' },
            ].map((item, i) => (
              <RevealOnScroll key={i} delay={i * 0.04}>
                <div className="bg-white rounded-xl p-4 border border-gray-200 flex gap-3">
                  <CheckCircle size={18} className="text-red-brand shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-navy-brand text-sm">{item.title}</p>
                    <p className="text-mid-grey text-xs leading-relaxed mt-0.5">{item.desc}</p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <h2 className="text-3xl font-display text-navy-brand mb-4">Frequently Asked Questions</h2>
            <div className="w-12 h-1 bg-red-brand rounded-full mb-8" />
          </RevealOnScroll>
          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <RevealOnScroll key={i} delay={i * 0.06}>
                <div className="bg-grey-soft rounded-2xl p-6 border border-gray-200">
                  <h3 className="font-bold text-navy-brand mb-2 flex gap-2">
                    <AlertCircle size={18} className="text-red-brand shrink-0 mt-0.5" />
                    {faq.q}
                  </h3>
                  <p className="text-mid-grey text-sm leading-relaxed pl-6">{faq.a}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-navy-brand">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <RevealOnScroll>
            <Ship size={40} className="text-red-brand mx-auto mb-4" />
            <h2 className="text-3xl font-display text-white mb-4">
              Let Us Handle Your Import
            </h2>
            <p className="text-white/70 mb-8">
              We&apos;ve imported 500+ cars to Kenya since 2014. Tell us what you want and we&apos;ll source it,
              ship it, clear it, and deliver it to your door.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMsg)}`}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#1A8A4A] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#157a3e] transition-colors"
              >
                <MessageCircle size={20} />
                WhatsApp Us Now
              </a>
              <Link href="/cars" className="inline-flex items-center justify-center gap-2 bg-white text-navy-brand px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                Browse Available Cars
                <ArrowRight size={18} />
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </main>
  );
}
