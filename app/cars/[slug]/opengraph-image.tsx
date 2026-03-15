import { ImageResponse } from 'next/og';
import { client } from '@/lib/sanity/client';
import { carBySlugQuery } from '@/lib/sanity/queries';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const car = await client.fetch(carBySlugQuery, { slug });

  const carImageUrl = car?.images?.[0]?.asset?.url;

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
            color: '#ffffff', fontSize: car?.title?.length > 25 ? '28px' : '34px',
            fontWeight: 800, lineHeight: '1.2', marginBottom: '16px',
          }}>
            {car?.title || 'Premium Japanese Import'}
          </div>

          {/* Price */}
          {car?.price && (
            <div style={{
              color: '#DA1D17', fontSize: '28px', fontWeight: 800,
              fontVariantNumeric: 'tabular-nums', marginBottom: '20px',
            }}>
              KSh {car.price.toLocaleString()}
            </div>
          )}

          {/* Specs chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
            {[
              car?.year && `${car.year}`,
              car?.mileage && `${car.mileage.toLocaleString()} km`,
              car?.transmission,
              car?.fuelType,
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
