import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Hive Motors Ltd',
  description: 'Terms and conditions for using the Hive Motors Ltd website and services.',
  robots: { index: true, follow: false },
  alternates: { canonical: 'https://www.hivemotorsltd.com/terms' },
};

const SECTIONS = [
  {
    title: '1. Acceptance of Terms',
    body: `By accessing or using the Hive Motors Ltd website (hivemotorsltd.com), you agree to be bound by these Terms of Service. If you do not agree, please do not use our website.`,
  },
  {
    title: '2. Use of the Website',
    body: `You may use our website for lawful purposes only. You must not use the site to transmit any harmful, offensive, or fraudulent content, or attempt to gain unauthorised access to any part of our systems.`,
  },
  {
    title: '3. Vehicle Information',
    body: `All vehicle listings, prices, and specifications on this website are provided for informational purposes only. Prices are subject to change without notice. We make every effort to ensure accuracy but do not guarantee that all information is complete or error-free. Contact us to confirm current availability and pricing before making any decisions.`,
  },
  {
    title: '4. No Binding Contracts',
    body: `Enquiries submitted through our website, WhatsApp, or contact form do not constitute a binding purchase agreement. A vehicle is only reserved upon payment of a deposit and execution of a formal sale agreement.`,
  },
  {
    title: '5. Financing Estimates',
    body: `The loan calculator on our Financing page provides estimates only. Actual loan terms, interest rates, and monthly payments depend on your credit profile and the terms of your financing partner. Hive Motors Ltd is not a licensed financial institution.`,
  },
  {
    title: '6. Import Duty Calculator',
    body: `The import duty calculator on our Import Guide page provides estimates based on publicly available KRA rates. Actual duties assessed by KRA may differ. Hive Motors Ltd accepts no liability for any discrepancy between estimated and actual import costs.`,
  },
  {
    title: '7. Intellectual Property',
    body: `All content on this website, including text, images, logos, and design, is the property of Hive Motors Ltd and is protected by copyright. You may not reproduce, distribute, or use any content without our prior written consent.`,
  },
  {
    title: '8. Limitation of Liability',
    body: `To the fullest extent permitted by law, Hive Motors Ltd shall not be liable for any indirect, incidental, or consequential damages arising from your use of this website or our services.`,
  },
  {
    title: '9. Governing Law',
    body: `These Terms are governed by the laws of Kenya. Any disputes shall be subject to the exclusive jurisdiction of the courts of Nairobi, Kenya.`,
  },
  {
    title: '10. Changes to Terms',
    body: `We reserve the right to update these Terms at any time. Changes will be posted on this page. Continued use of the website after changes constitutes acceptance of the updated Terms.`,
  },
  {
    title: '11. Contact',
    body: `For questions about these Terms, contact us at hivemotorsltd@gmail.com or +254 722 800 436.`,
  },
];

export default function TermsPage() {
  return (
    <main className="bg-white min-h-screen">
      <section className="pt-32 pb-12 bg-gradient-to-br from-grey-soft to-blue-tint border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-mid-grey mb-2">
            <a href="/" className="hover:text-red-brand">Home</a>
            {' '}<span className="text-gray-300">›</span>{' '}
            <span className="text-red-brand">Terms of Service</span>
          </p>
          <h1 className="text-4xl font-display text-navy-brand mb-2">Terms of Service</h1>
          <p className="text-mid-grey text-sm">Effective date: 1 January 2025 · Hive Motors Ltd, Nairobi, Kenya</p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-charcoal leading-relaxed mb-10">
          Please read these Terms of Service carefully before using the Hive Motors Ltd website.
          These terms govern your use of our website and services.
        </p>

        <div className="space-y-8">
          {SECTIONS.map((section) => (
            <div key={section.title}>
              <h2 className="text-lg font-bold text-navy-brand mb-2">{section.title}</h2>
              <p className="text-charcoal text-sm leading-relaxed">{section.body}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
