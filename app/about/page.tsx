import { motion } from 'framer-motion';
import { Award, Users, Globe, Shield } from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';

export default function AboutPage() {
  const values = [
    {
      icon: Award,
      title: 'Quality Assured',
      description: 'Every vehicle is thoroughly inspected before import from Japan',
    },
    {
      icon: Users,
      title: 'Customer First',
      description: 'Dedicated support from inquiry to delivery and beyond',
    },
    {
      icon: Globe,
      title: 'Direct Import',
      description: 'We source directly from trusted Japanese auctions and dealers',
    },
    {
      icon: Shield,
      title: 'Transparent Process',
      description: 'Clear pricing, no hidden fees, full documentation support',
    },
  ];

  const milestones = [
    { year: '2014', event: 'Hive Motors Founded' },
    { year: '2016', event: '100+ Cars Imported' },
    { year: '2019', event: 'Expanded Showroom' },
    { year: '2022', event: '500+ Happy Clients' },
    { year: '2024', event: 'Digital Platform Launch' },
  ];

  return (
    <main className="min-h-screen pt-96 pb-64">
      <div className="max-w-7xl mx-auto px-16">
        <SectionHeader 
          title="About Hive Motors" 
          subtitle="Your trusted partner for premium Japanese import cars in Kenya"
        />

        <div className="max-w-3xl mx-auto text-center mb-64">
          <p className="text-lg text-cloud leading-relaxed mb-24">
            Since 2014, Hive Motors has been Kenya's premier destination for quality Japanese import vehicles. 
            We specialize in sourcing, importing, and delivering premium cars that combine reliability, 
            performance, and value.
          </p>
          <p className="text-lg text-cloud leading-relaxed">
            Our name reflects our philosophy: like a hive, we work together with precision and dedication 
            to bring you the golden opportunity of owning your dream car.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-24 mb-96">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-cloud/5 border border-gold/20 rounded-lg p-24 text-center hover:border-gold/50 transition-colors"
            >
              <value.icon className="mx-auto mb-16 text-gold" size={40} />
              <h3 className="text-xl font-semibold text-gold mb-12">{value.title}</h3>
              <p className="text-steel">{value.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-gold/10 to-gold/5 border border-gold/20 rounded-lg p-48">
          <h2 className="text-3xl font-display text-gold text-center mb-48">Our Journey</h2>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gold/20 -translate-x-1/2" />
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-24 mb-32 ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <div className="text-2xl font-mono text-gold mb-4">{milestone.year}</div>
                    <div className="text-cloud">{milestone.event}</div>
                  </div>
                  <div className="w-16 h-16 bg-gold rounded-full border-4 border-midnight z-10" />
                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
