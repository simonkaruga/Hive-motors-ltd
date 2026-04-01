import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Search } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Page Not Found | Hive Motors Ltd',
  description: 'The page you are looking for does not exist. Browse our inventory of premium imported cars in Nairobi, Kenya.',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="bg-white min-h-screen flex items-center justify-center px-6">
      <div className="max-w-xl w-full text-center py-24">

        {/* Big 404 */}
        <div className="font-display text-[10rem] leading-none text-grey-soft font-bold select-none mb-4">
          404
        </div>

        {/* Logo mark */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 bg-red-brand rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-2xl">H</span>
          </div>
          <span className="text-2xl font-bold tracking-tight">
            <span className="text-red-brand">HIVE</span>
            <span className="text-navy-brand"> MOTORS</span>
          </span>
        </div>

        <h1 className="text-3xl font-display text-navy-brand mb-3">Page Not Found</h1>
        <p className="text-mid-grey text-lg mb-10">
          The page you're looking for doesn't exist or may have been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-red-brand text-white px-8 py-4 rounded-xl font-semibold hover:bg-red-dark transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>
          <Link
            href="/cars"
            className="inline-flex items-center justify-center gap-2 border-2 border-navy-brand text-navy-brand px-8 py-4 rounded-xl font-semibold hover:bg-navy-brand hover:text-white transition-colors"
          >
            <Search size={18} />
            Browse Cars
          </Link>
        </div>

      </div>
    </main>
  );
}
