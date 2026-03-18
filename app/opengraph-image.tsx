import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Hive Motors Ltd — Dream Cars, Real Deals!';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: 'linear-gradient(135deg, #0A3E66 0%, #062A47 60%, #0A3E66 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative circles */}
        <div style={{
          position: 'absolute', top: '-80px', right: '-80px',
          width: '360px', height: '360px', borderRadius: '50%',
          background: 'rgba(218,29,23,0.15)', display: 'flex',
        }} />
        <div style={{
          position: 'absolute', bottom: '-60px', left: '-60px',
          width: '280px', height: '280px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.05)', display: 'flex',
        }} />

        {/* Red accent line top */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: '6px', background: '#DA1D17', display: 'flex',
        }} />

        {/* Logo mark */}
        <div style={{
          width: '80px', height: '80px', background: '#DA1D17',
          borderRadius: '16px', display: 'flex', alignItems: 'center',
          justifyContent: 'center', marginBottom: '24px',
        }}>
          <span style={{ color: '#fff', fontWeight: 900, fontSize: '40px' }}>H</span>
        </div>

        {/* Brand name */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '16px' }}>
          <span style={{ color: '#DA1D17', fontSize: '52px', fontWeight: 900, letterSpacing: '2px' }}>HIVE</span>
          <span style={{ color: '#ffffff', fontSize: '52px', fontWeight: 900, letterSpacing: '2px' }}>MOTORS</span>
        </div>

        {/* Tagline */}
        <div style={{
          color: 'rgba(255,255,255,0.9)', fontSize: '28px',
          fontStyle: 'italic', marginBottom: '32px', letterSpacing: '0.5px',
        }}>
          Dream Cars, Real Deals!
        </div>

        {/* Divider */}
        <div style={{
          width: '80px', height: '3px', background: '#DA1D17',
          borderRadius: '2px', marginBottom: '28px', display: 'flex',
        }} />

        {/* Description */}
        <div style={{
          color: 'rgba(255,255,255,0.7)', fontSize: '20px',
          textAlign: 'center', maxWidth: '600px', lineHeight: '1.5',
        }}>
          Kenya's Trusted Car Dealership
        </div>

        {/* Location badge */}
        <div style={{
          marginTop: '32px', background: 'rgba(255,255,255,0.1)',
          borderRadius: '40px', padding: '10px 24px',
          color: 'rgba(255,255,255,0.8)', fontSize: '16px', display: 'flex',
          border: '1px solid rgba(255,255,255,0.2)',
        }}>
          📍 Ridgeways, Kiambu Road · Nairobi, Kenya
        </div>

        {/* Bottom red accent */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: '4px', background: '#DA1D17', display: 'flex',
        }} />
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
