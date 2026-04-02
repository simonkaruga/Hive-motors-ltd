import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Hive Motors Ltd',
  description: 'Privacy Policy for Hive Motors Ltd — how we collect, use and protect your personal data.',
  robots: { index: true, follow: false },
  alternates: { canonical: 'https://www.hivemotorsltd.com/privacy' },
};

const SECTIONS = [
  {
    title: '1. Information We Collect',
    body: `We collect information you provide directly to us, including your name, phone number, email address, and any messages you send via our contact form or WhatsApp. We also collect standard web analytics data (pages visited, device type, location) through Google Analytics.`,
  },
  {
    title: '2. How We Use Your Information',
    body: `We use your information to respond to your enquiries, send you information about vehicles that match your preferences, improve our website and services, and comply with legal obligations under the Kenya Data Protection Act 2019.`,
  },
  {
    title: '3. Data Sharing',
    body: `We do not sell, trade, or rent your personal information to third parties. We may share your data with trusted service providers (such as email delivery services) solely to operate our business. All third parties are required to keep your information confidential.`,
  },
  {
    title: '4. Data Retention',
    body: `We retain your personal data only for as long as necessary to fulfil the purposes for which it was collected, or as required by law. Contact form submissions are retained for up to 12 months.`,
  },
  {
    title: '5. Your Rights',
    body: `Under the Kenya Data Protection Act 2019, you have the right to access, correct, or delete your personal data. To exercise these rights, contact us at hivemotorsltd@gmail.com. We will respond within 30 days.`,
  },
  {
    title: '6. Cookies',
    body: `We use Google Analytics cookies to understand how visitors use our website. These cookies do not identify you personally. You can disable cookies in your browser settings at any time.`,
  },
  {
    title: '7. Security',
    body: `We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction.`,
  },
  {
    title: '8. Changes to This Policy',
    body: `We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date. Continued use of our website after changes constitutes acceptance of the updated policy.`,
  },
  {
    title: '9. Contact Us',
    body: `If you have any questions about this Privacy Policy, please contact us at hivemotorsltd@gmail.com or call +254 722 800 436.`,
  },
];

export default function PrivacyPage() {
  return (
    <main className="bg-white min-h-screen">
      <section className="pt-32 pb-12 bg-gradient-to-br from-grey-soft to-blue-tint border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-mid-grey mb-2">
            <a href="/" className="hover:text-red-brand">Home</a>
            {' '}<span className="text-gray-300">›</span>{' '}
            <span className="text-red-brand">Privacy Policy</span>
          </p>
          <h1 className="text-4xl font-display text-navy-brand mb-2">Privacy Policy</h1>
          <p className="text-mid-grey text-sm">Effective date: 1 January 2025 · Hive Motors Ltd, Nairobi, Kenya</p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-charcoal leading-relaxed mb-10">
          Hive Motors Ltd (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;) is committed to protecting your privacy.
          This policy explains how we collect, use, and safeguard your personal information in accordance with the
          Kenya Data Protection Act 2019.
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
