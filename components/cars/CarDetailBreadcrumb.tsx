'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface BreadcrumbProps {
  carTitle: string;
}

export default function CarDetailBreadcrumb({ carTitle }: BreadcrumbProps) {
  const searchParams = useSearchParams();
  const from = searchParams.get('from');

  return (
    <div className="flex items-center gap-2 text-sm text-mid-grey">
      <Link href="/" className="hover:text-red-brand transition-colors">Home</Link>
      <span className="text-gray-300">›</span>
      {from === 'home' ? (
        <span className="text-red-brand">Featured Cars</span>
      ) : (
        <Link href="/cars" className="hover:text-red-brand transition-colors">Inventory</Link>
      )}
      <span className="text-gray-300">›</span>
      <span className="text-navy-brand font-medium line-clamp-1">{carTitle}</span>
    </div>
  );
}