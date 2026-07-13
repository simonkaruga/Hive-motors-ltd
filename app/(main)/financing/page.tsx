'use client';

import { useState } from 'react';
import { Calculator, TrendingUp, MessageCircle, ArrowRight } from 'lucide-react';
import RevealOnScroll from '@/components/shared/RevealOnScroll';
import Link from 'next/link';

const LOAN_TERMS = [12, 24, 36, 48, 60];

const FAQS = [
  { q: 'What is the minimum deposit for car financing in Kenya?', a: 'Most lenders require a minimum deposit of 10–20% of the car value. At Hive Motors we can help you find options starting from 10% down.' },
  { q: 'How long does financing approval take?', a: 'Pre-approval typically takes 24–48 hours. Once approved, funds are disbursed within 3–5 business days.' },
  { q: 'Can I finance an imported car?', a: 'Yes. Both fresh imports and locally used vehicles are eligible for financing. The car must be 8 years old or newer per KRA regulations.' },
  { q: 'What documents do I need for a car loan in Kenya?', a: 'You typically need: National ID, KRA PIN, 3 months bank statements, 3 months payslips (or business financials if self-employed), and a logbook valuation.' },
  { q: 'What interest rates should I expect?', a: 'Car loan rates in Kenya typically range from 13–18% per annum depending on your bank and credit profile. We work with multiple lenders to find you the best rate.' },
];

export default function FinancingPage() {
  const [carPrice, setCarPrice] = useState(2000000);
  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [loanTerm, setLoanTerm] = useState(36);
  const [interestRate, setInterestRate] = useState(14);

  const downPayment = Math.round(carPrice * (downPaymentPct / 100));
  const loanAmount = carPrice - downPayment;
  const monthlyRate = interestRate / 100 / 12;
  const monthlyPayment = loanAmount > 0
    ? loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) / (Math.pow(1 + monthlyRate, loanTerm) - 1)
    : 0;
  const totalPayment = monthlyPayment * loanTerm;
  const totalInterest = totalPayment - loanAmount;

  const whatsappMessage = `Hi Hive Motors! I'd like a personalised financing quote for a car worth KSh ${carPrice.toLocaleString()}.`;

  return (
    <main className="bg-white min-h-screen">

      {/* Hero */}
      <section className="pt-32 pb-12 bg-gradient-to-br from-grey-soft to-blue-tint border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div>
              <p className="text-sm text-mid-grey mb-2">
                <a href="/" className="hover:text-red-brand">Home</a>
                {' '}<span className="text-gray-300">›</span>{' '}
                <span className="text-red-brand">Financing</span>
              </p>
              <h1 className="text-4xl md:text-5xl font-display text-navy-brand mb-2">
                Calculate Your Payments
              </h1>
              <p className="text-mid-grey text-lg">
                Estimate your monthly car loan repayment — adjust sliders to see real-time results
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Calculator Inputs */}
          <RevealOnScroll>
            <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6 sm:mb-8">
                <div className="w-10 h-10 bg-red-brand/10 rounded-xl flex items-center justify-center">
                  <Calculator size={20} className="text-red-brand" />
                </div>
                <h2 className="text-2xl font-display text-navy-brand">Loan Details</h2>
              </div>

              <div className="space-y-8">
                {/* Car Price */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-sm font-medium text-navy-brand">Car Price</label>
                    <span className="text-lg font-bold text-red-brand font-mono">
                      KSh {carPrice.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="500000"
                    max="10000000"
                    step="100000"
                    value={carPrice}
                    onChange={(e) => setCarPrice(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-brand"
                    style={{ accentColor: '#DA1D17' }}
                  />
                  <div className="flex justify-between text-xs text-mid-grey mt-1">
                    <span>KSh 500K</span>
                    <span>KSh 10M</span>
                  </div>
                </div>

                {/* Down Payment */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-sm font-medium text-navy-brand">Down Payment</label>
                    <div className="text-right">
                      <span className="text-lg font-bold text-red-brand font-mono">
                        {downPaymentPct}%
                      </span>
                      <span className="text-xs text-mid-grey ml-2 font-mono">
                        KSh {downPayment.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="90"
                    step="5"
                    value={downPaymentPct}
                    onChange={(e) => setDownPaymentPct(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    style={{ accentColor: '#DA1D17' }}
                  />
                  <div className="flex justify-between text-xs text-mid-grey mt-1">
                    <span>10%</span>
                    <span>90%</span>
                  </div>
                </div>

                {/* Loan Term */}
                <div>
                  <label className="block text-sm font-medium text-navy-brand mb-3">Loan Term</label>
                  <div className="flex gap-2 flex-wrap">
                    {LOAN_TERMS.map((term) => (
                      <button
                        key={term}
                        onClick={() => setLoanTerm(term)}
                        className={`flex-1 min-w-[60px] py-2.5 rounded-lg text-sm font-semibold border-2 transition-colors ${
                          loanTerm === term
                            ? 'bg-red-brand border-red-brand text-white'
                            : 'border-gray-200 text-navy-brand hover:border-navy-brand'
                        }`}
                      >
                        {term}mo
                      </button>
                    ))}
                  </div>
                </div>

                {/* Interest Rate */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-sm font-medium text-navy-brand">Interest Rate (Annual)</label>
                    <span className="text-lg font-bold text-red-brand font-mono">{interestRate}%</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="30"
                    step="0.5"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    style={{ accentColor: '#DA1D17' }}
                  />
                  <div className="flex justify-between text-xs text-mid-grey mt-1">
                    <span>5%</span>
                    <span>30%</span>
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {/* Results */}
          <RevealOnScroll delay={0.1}>
            <div className="space-y-4">
              {/* Monthly Payment — Hero Result */}
              <div className="bg-gradient-to-br from-navy-brand to-navy-dark rounded-2xl p-4 sm:p-8 text-center text-white">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <TrendingUp size={18} className="text-white/70" />
                  <p className="text-sm font-medium text-white/70 uppercase tracking-widest">Estimated Monthly</p>
                </div>
                <p className="text-5xl font-bold font-mono text-white mb-2">
                  KSh {Math.round(monthlyPayment).toLocaleString()}
                </p>
                <p className="text-white/50 text-xs">per month for {loanTerm} months</p>
              </div>

              {/* Breakdown */}
              <div className="bg-grey-soft rounded-2xl p-6 space-y-4">
                {[
                  { label: 'Car Price', value: `KSh ${carPrice.toLocaleString()}` },
                  { label: 'Down Payment', value: `KSh ${downPayment.toLocaleString()}` },
                  { label: 'Loan Amount', value: `KSh ${loanAmount.toLocaleString()}` },
                  { label: 'Total Interest', value: `KSh ${Math.round(totalInterest).toLocaleString()}` },
                  { label: 'Total Repayment', value: `KSh ${Math.round(totalPayment).toLocaleString()}`, highlight: true },
                ].map((row) => (
                  <div key={row.label} className={`flex justify-between items-center ${row.highlight ? 'pt-4 border-t border-gray-200' : ''}`}>
                    <span className="text-sm text-mid-grey">{row.label}</span>
                    <span className={`font-bold font-mono text-sm ${row.highlight ? 'text-red-brand text-base' : 'text-navy-brand'}`}>
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Disclaimer */}
              <p className="text-xs text-mid-grey italic px-1">
                * Estimates only. Actual rates depend on your credit profile and financing partner terms.
              </p>

              {/* CTA */}
              <a
                href={`https://wa.me/254722800436?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-[#166638] text-white py-4 rounded-xl font-bold hover:bg-[#125530] transition-colors"
              >
                <MessageCircle size={20} />
                Get a Personalised Quote
              </a>
            </div>
          </RevealOnScroll>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {[
            { title: 'Flexible Terms', desc: '12 to 60 month repayment periods to match your budget.' },
            { title: 'Fast Approval', desc: 'Get pre-approval in as little as 24 hours.' },
            { title: 'No Hidden Fees', desc: 'Transparent pricing — no surprise charges.' },
          ].map((item, i) => (
            <RevealOnScroll key={i} delay={i * 0.08}>
              <div className="bg-blue-tint rounded-2xl p-6 text-center">
                <h3 className="font-bold text-navy-brand text-lg mb-2">{item.title}</h3>
                <p className="text-mid-grey text-sm leading-relaxed">{item.desc}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
        {/* FAQ Section */}
        <div className="mt-16">
          <RevealOnScroll>
            <h2 className="text-2xl font-display text-navy-brand mb-6">Financing FAQs</h2>
            <div className="w-10 h-0.5 bg-red-brand rounded-full mb-8" />
          </RevealOnScroll>
          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <RevealOnScroll key={i} delay={i * 0.05}>
                <div className="bg-grey-soft rounded-2xl p-5 border border-gray-200">
                  <h3 className="font-bold text-navy-brand mb-2 text-sm">{faq.q}</h3>
                  <p className="text-mid-grey text-sm leading-relaxed">{faq.a}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>

        {/* Internal Links */}
        <div className="mt-12 pt-10 border-t border-gray-100">
          <p className="text-sm font-semibold text-mid-grey uppercase tracking-wider mb-4">Explore More</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link href="/cars" className="bg-grey-soft rounded-xl p-4 border border-gray-200 hover:border-red-brand/30 hover:shadow-md transition-all group">
              <p className="font-semibold text-navy-brand group-hover:text-red-brand transition-colors text-sm">Browse Cars <ArrowRight size={14} className="inline" /></p>
              <p className="text-xs text-mid-grey mt-1">Find a car within your budget</p>
            </Link>
            <Link href="/import-guide" className="bg-grey-soft rounded-xl p-4 border border-gray-200 hover:border-red-brand/30 hover:shadow-md transition-all group">
              <p className="font-semibold text-navy-brand group-hover:text-red-brand transition-colors text-sm">Import Guide <ArrowRight size={14} className="inline" /></p>
              <p className="text-xs text-mid-grey mt-1">Understand import costs & duties</p>
            </Link>
            <Link href="/notify" className="bg-grey-soft rounded-xl p-4 border border-gray-200 hover:border-red-brand/30 hover:shadow-md transition-all group">
              <p className="font-semibold text-navy-brand group-hover:text-red-brand transition-colors text-sm">Request a Car <ArrowRight size={14} className="inline" /></p>
              <p className="text-xs text-mid-grey mt-1">We&apos;ll source your dream car</p>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
