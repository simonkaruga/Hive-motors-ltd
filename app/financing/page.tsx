'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp } from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';
import Button from '@/components/ui/Button';

export default function FinancingPage() {
  const [carPrice, setCarPrice] = useState(2000000);
  const [downPayment, setDownPayment] = useState(500000);
  const [loanTerm, setLoanTerm] = useState(36);
  const [interestRate] = useState(14); // Annual interest rate

  const loanAmount = carPrice - downPayment;
  const monthlyRate = interestRate / 100 / 12;
  const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) / (Math.pow(1 + monthlyRate, loanTerm) - 1);
  const totalPayment = monthlyPayment * loanTerm;
  const totalInterest = totalPayment - loanAmount;

  return (
    <main className="min-h-screen pt-96 pb-64">
      <div className="max-w-5xl mx-auto px-16">
        <SectionHeader 
          title="Financing Calculator" 
          subtitle="Estimate your monthly car payments"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-48">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-cloud/5 border border-gold/20 rounded-lg p-32"
          >
            <div className="flex items-center gap-12 mb-32">
              <Calculator className="text-gold" size={32} />
              <h2 className="text-2xl font-display text-gold">Loan Details</h2>
            </div>

            <div className="space-y-32">
              <div>
                <label className="block text-cloud mb-8">Car Price (KSh)</label>
                <input
                  type="range"
                  min="500000"
                  max="10000000"
                  step="100000"
                  value={carPrice}
                  onChange={(e) => setCarPrice(Number(e.target.value))}
                  className="w-full accent-gold"
                />
                <div className="text-2xl font-mono text-gold mt-8">
                  KSh {carPrice.toLocaleString()}
                </div>
              </div>

              <div>
                <label className="block text-cloud mb-8">Down Payment (KSh)</label>
                <input
                  type="range"
                  min="0"
                  max={carPrice}
                  step="50000"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className="w-full accent-gold"
                />
                <div className="text-2xl font-mono text-gold mt-8">
                  KSh {downPayment.toLocaleString()}
                </div>
                <div className="text-sm text-steel mt-4">
                  {((downPayment / carPrice) * 100).toFixed(0)}% of car price
                </div>
              </div>

              <div>
                <label className="block text-cloud mb-8">Loan Term (Months)</label>
                <input
                  type="range"
                  min="12"
                  max="60"
                  step="6"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(Number(e.target.value))}
                  className="w-full accent-gold"
                />
                <div className="text-2xl font-mono text-gold mt-8">
                  {loanTerm} months ({(loanTerm / 12).toFixed(1)} years)
                </div>
              </div>

              <div className="pt-24 border-t border-gold/20">
                <div className="text-sm text-steel mb-4">Interest Rate (Annual)</div>
                <div className="text-xl font-mono text-cloud">{interestRate}%</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-br from-gold/10 to-gold/5 border border-gold/20 rounded-lg p-32"
          >
            <div className="flex items-center gap-12 mb-32">
              <TrendingUp className="text-gold" size={32} />
              <h2 className="text-2xl font-display text-gold">Your Estimate</h2>
            </div>

            <div className="space-y-24">
              <div className="bg-midnight/50 rounded-lg p-24 text-center">
                <div className="text-sm text-steel mb-8">Monthly Payment</div>
                <div className="text-4xl font-mono font-bold text-gold">
                  KSh {Math.round(monthlyPayment).toLocaleString()}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-16">
                <div className="bg-midnight/30 rounded-lg p-16">
                  <div className="text-xs text-steel mb-4">Loan Amount</div>
                  <div className="text-lg font-mono text-cloud">
                    KSh {loanAmount.toLocaleString()}
                  </div>
                </div>

                <div className="bg-midnight/30 rounded-lg p-16">
                  <div className="text-xs text-steel mb-4">Total Interest</div>
                  <div className="text-lg font-mono text-cloud">
                    KSh {Math.round(totalInterest).toLocaleString()}
                  </div>
                </div>

                <div className="bg-midnight/30 rounded-lg p-16 col-span-2">
                  <div className="text-xs text-steel mb-4">Total Payment</div>
                  <div className="text-lg font-mono text-cloud">
                    KSh {Math.round(totalPayment).toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="pt-24 border-t border-gold/20">
                <p className="text-sm text-steel mb-16">
                  * This is an estimate only. Actual rates and terms may vary based on your credit profile 
                  and our financing partners' requirements.
                </p>
                <Button variant="primary" className="w-full">
                  Apply for Financing
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
