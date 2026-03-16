import { ImageResponse } from 'next/og';
import { client } from '@/lib/sanity/client';
import { carBySlugQuery } from '@/lib/sanity/queries';

const STATIC_OG_DATA: Record<string, { title: string; price: number; year: number; mileage: number; transmission: string; fuelType: string; image: string }> = {
  'prado-static':       { title: 'Toyota Land Cruiser Prado TX-L',    price: 7250000,  year: 2018, mileage: 62000, transmission: 'Automatic', fuelType: 'Diesel',  image: '/cars/prado/prado-01.jpg' },
  'range-rover-static': { title: 'Range Rover Sport HSE',              price: 9750000,  year: 2019, mileage: 48000, transmission: 'Automatic', fuelType: 'Petrol',  image: '/cars/range-rover/range-rover-01.jpg' },
  'gle-static':         { title: 'Mercedes-Benz GLE 400d AMG Line',    price: 12750000, year: 2021, mileage: 31000, transmission: 'Automatic', fuelType: 'Diesel',  image: '/cars/gle/gle-01.jpg' },
  'cx5-static':         { title: 'Mazda CX-5 2.5 AWD',                 price: 3400000,  year: 2020, mileage: 41000, transmission: 'Automatic', fuelType: 'Petrol',  image: '/cars/cx5/cx5-01.jpg' },
  'polo-static':        { title: 'Volkswagen Polo Highline MK7.5',     price: 2150000,  year: 2019, mileage: 38000, transmission: 'Automatic', fuelType: 'Petrol',  image: '/cars/polo/polo-08.jpg' },
  '3008-static':        { title: 'Peugeot 3008 Cross City',            price: 3350000,  year: 2020, mileage: 44000, transmission: 'Automatic', fuelType: 'Petrol',  image: '/cars/3008/3008-06.jpg' },
};

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function Image({ params }: Props) {
  const { slug } = await params;

  const staticData = STATIC_OG_DATA[slug];
  const sanityData = staticData ? null : await client.fetch(carBySlugQuery, { slug });

  const title        = staticData?.title        ?? sanityData?.title        ?? 'Premium Japanese Import';
  const price        = staticData?.price        ?? sanityData?.price        ?? null;
  const year         = staticData?.year         ?? sanityData?.year         ?? null;
  const mileage      = staticData?.mileage      ?? sanityData?.mileage      ?? null;
  const transmission = staticData?.transmission ?? sanityData?.transmission ?? null;
  const fuelType     = staticData?.fuelType     ?? sanityData?.fuelType     ?? null;
  const carImageUrl  = staticData?.image
    ? `https://hivemotorsltd.com${staticData.image}`
    : sanityData?.images?.[0]?.asset?.url ?? null;

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
          background: '#062A47',
        }}
      >
        {/* Car photo (left 55%) */}
        {carImageUrl && (
          <div style={{
            width: '660px', height: '630px',
            position: 'relative', display: 'flex', overflow: 'hidden', flexShrink: 0,
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={carImageUrl}
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {/* Gradient overlay on right edge */}
            <div style={{
              position: 'absolute', top: 0, right: 0, bottom: 0, width: '180px',
              background: 'linear-gradient(to right, transparent, #062A47)',
              display: 'flex',
            }} />
          </div>
        )}

        {/* Right info panel */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '48px 48px 48px 32px',
          background: carImageUrl ? 'transparent' : 'linear-gradient(135deg, #0A3E66, #062A47)',
          position: 'relative',
        }}>
          {/* Red top accent */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0,
            height: '5px', background: '#DA1D17', display: 'flex',
          }} />

          {/* Hive Motors branding */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
            <div style={{
              width: '36px', height: '36px', background: '#DA1D17', borderRadius: '8px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ color: '#fff', fontWeight: 900, fontSize: '18px' }}>H</span>
            </div>
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', letterSpacing: '2px', textTransform: 'uppercase' }}>
              HIVE MOTORS
            </span>
          </div>

          {/* Car title */}
          <div style={{
            color: '#ffffff', fontSize: title.length > 25 ? '28px' : '34px',
            fontWeight: 800, lineHeight: '1.2', marginBottom: '16px',
          }}>
            {title}
          </div>

          {/* Price */}
          {price && (
            <div style={{
              color: '#DA1D17', fontSize: '28px', fontWeight: 800,
              fontVariantNumeric: 'tabular-nums', marginBottom: '20px',
            }}>
              KSh {price.toLocaleString()}
            </div>
          )}

          {/* Specs chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
            {[
              year && `${year}`,
              mileage && `${mileage.toLocaleString()} km`,
              transmission,
              fuelType,
            ].filter(Boolean).map((spec, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.12)', borderRadius: '20px',
                padding: '6px 14px', color: 'rgba(255,255,255,0.85)', fontSize: '13px',
                border: '1px solid rgba(255,255,255,0.15)', display: 'flex',
              }}>
                {spec}
              </div>
            ))}
          </div>

          {/* Bottom tagline */}
          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>
            hivemotorsltd.com · Nairobi, Kenya
          </div>

          {/* Bottom accent */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            height: '4px', background: '#DA1D17', display: 'flex',
          }} />
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
