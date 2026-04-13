import type { Metadata } from 'next';
import Link from 'next/link';
import { client } from '@/lib/sanity/client';
import { ExternalLink, Plus, Eye, CheckCircle, Truck, Tag } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Manage Cars | Hive Motors',
  robots: { index: false, follow: false },
};

export const revalidate = 0;
export const dynamic = 'force-dynamic';

const STUDIO_URL = 'https://hivemotorsltd.sanity.studio';

export default async function ManageCarsPage() {
  let stats = { total: 0, available: 0, onTransit: 0, sold: 0, noImages: 0, noSlug: 0 };

  try {
    const cars = await client.fetch<{
      status: string;
      imageCount: number;
      slug: string | null;
    }[]>(`*[_type == "car"]{
      status,
      "imageCount": count(images),
      "slug": slug.current
    }`);

    stats = {
      total: cars.length,
      available: cars.filter(c => c.status === 'available').length,
      onTransit: cars.filter(c => c.status === 'on-transit').length,
      sold: cars.filter(c => c.status === 'sold').length,
      noImages: cars.filter(c => c.imageCount === 0).length,
      noSlug: cars.filter(c => !c.slug).length,
    };
  } catch {
    // stats stay at zero — show page anyway
  }

  const statCards = [
    { label: 'Total Cars', value: stats.total, color: '#0A3E66', icon: Tag },
    { label: 'Available', value: stats.available, color: '#16a34a', icon: CheckCircle },
    { label: 'On Transit', value: stats.onTransit, color: '#d97706', icon: Truck },
    { label: 'Sold', value: stats.sold, color: '#DA1D17', icon: CheckCircle },
  ];

  const actions = [
    {
      label: 'Add a New Car',
      desc: 'Upload photos, set price, and publish to the website.',
      href: `${STUDIO_URL}/structure/car;new`,
      icon: Plus,
      primary: true,
    },
    {
      label: 'View All Cars in Studio',
      desc: 'Edit, delete, or change status of any car.',
      href: `${STUDIO_URL}/structure/car`,
      icon: ExternalLink,
      primary: false,
    },
    {
      label: 'View Website Inventory',
      desc: 'See exactly what your customers see.',
      href: '/cars',
      icon: Eye,
      primary: false,
      internal: true,
    },
  ];

  return (
    <main className="pt-32 pb-20 bg-grey-soft min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-navy-brand mb-1">Car Management</h1>
          <p className="text-mid-grey">Quick overview and shortcuts for managing your inventory.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {statCards.map(({ label, value, color, icon: Icon }) => (
            <div key={label} className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-mid-grey">{label}</p>
                <Icon size={16} style={{ color }} />
              </div>
              <p className="text-3xl font-bold" style={{ color }}>{value}</p>
            </div>
          ))}
        </div>

        {/* Warnings */}
        {(stats.noImages > 0 || stats.noSlug > 0) && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-8">
            <p className="font-semibold text-amber-800 mb-2">⚠️ Action needed</p>
            <ul className="space-y-1 text-amber-700 text-sm">
              {stats.noImages > 0 && (
                <li>
                  <strong>{stats.noImages} car{stats.noImages > 1 ? 's' : ''}</strong> {stats.noImages > 1 ? 'have' : 'has'} no photos — customers won&apos;t see them properly.{' '}
                  <a href={`${STUDIO_URL}/structure/car`} target="_blank" rel="noopener noreferrer" className="underline">Fix in Studio →</a>
                </li>
              )}
              {stats.noSlug > 0 && (
                <li>
                  <strong>{stats.noSlug} car{stats.noSlug > 1 ? 's' : ''}</strong> {stats.noSlug > 1 ? 'are' : 'is'} missing a URL slug — click Generate in Studio to fix.{' '}
                  <a href={`${STUDIO_URL}/structure/car`} target="_blank" rel="noopener noreferrer" className="underline">Fix in Studio →</a>
                </li>
              )}
            </ul>
          </div>
        )}

        {/* Quick Actions */}
        <h2 className="text-lg font-bold text-navy-brand mb-4">Quick Actions</h2>
        <div className="grid gap-4 sm:grid-cols-3 mb-12">
          {actions.map(({ label, desc, href, icon: Icon, primary, internal }) => (
            <div key={label}>
              {internal ? (
                <Link
                  href={href}
                  className={`flex flex-col gap-2 rounded-2xl border p-5 h-full transition-colors ${
                    primary
                      ? 'bg-red-brand border-red-brand text-white hover:bg-red-dark'
                      : 'bg-white border-gray-200 text-navy-brand hover:border-navy-brand'
                  }`}
                >
                  <Icon size={22} />
                  <p className="font-bold text-sm">{label}</p>
                  <p className={`text-xs leading-relaxed ${primary ? 'text-white/80' : 'text-mid-grey'}`}>{desc}</p>
                </Link>
              ) : (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex flex-col gap-2 rounded-2xl border p-5 h-full transition-colors ${
                    primary
                      ? 'bg-red-brand border-red-brand text-white hover:bg-red-dark'
                      : 'bg-white border-gray-200 text-navy-brand hover:border-navy-brand'
                  }`}
                >
                  <Icon size={22} />
                  <p className="font-bold text-sm">{label}</p>
                  <p className={`text-xs leading-relaxed ${primary ? 'text-white/80' : 'text-mid-grey'}`}>{desc}</p>
                </a>
              )}
            </div>
          ))}
        </div>

        {/* How-to guide */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h2 className="font-bold text-navy-brand mb-4">How to manage your cars</h2>
          <div className="grid sm:grid-cols-2 gap-6 text-sm text-charcoal">
            <div>
              <p className="font-semibold text-navy-brand mb-2">✅ Mark a car as Sold</p>
              <ol className="list-decimal list-inside space-y-1 text-mid-grey">
                <li>Open the car in Studio</li>
                <li>Change <strong>Car Status</strong> → 🔴 Sold</li>
                <li>Click <strong>Publish</strong></li>
                <li>It disappears from inventory instantly</li>
              </ol>
            </div>
            <div>
              <p className="font-semibold text-navy-brand mb-2">🗑️ Permanently delete a car</p>
              <ol className="list-decimal list-inside space-y-1 text-mid-grey">
                <li>Open the car in Studio</li>
                <li>Click <strong>⋯</strong> (three dots, top right)</li>
                <li>Click <strong>Delete</strong> and confirm</li>
              </ol>
            </div>
            <div>
              <p className="font-semibold text-navy-brand mb-2">🏠 Show a car on homepage</p>
              <ol className="list-decimal list-inside space-y-1 text-mid-grey">
                <li>Open the car in Studio</li>
                <li>Make sure <strong>Show on Homepage?</strong> is ON</li>
                <li>Car appears in <strong>Latest Arrivals</strong> instantly</li>
              </ol>
            </div>
            <div>
              <p className="font-semibold text-navy-brand mb-2">🚢 Mark as On Transit</p>
              <ol className="list-decimal list-inside space-y-1 text-mid-grey">
                <li>Open the car in Studio</li>
                <li>Change status → 🚢 On Transit</li>
                <li>Set the <strong>Expected Arrival Date</strong></li>
                <li>Car moves to the On Transit page</li>
              </ol>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
