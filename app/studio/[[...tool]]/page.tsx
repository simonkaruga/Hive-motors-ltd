'use client';

import dynamicImport from 'next/dynamic';
import { Component, ReactNode } from 'react';
import config from '@/sanity.config';

export const dynamic = 'force-dynamic';

class StudioErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null };
  static getDerivedStateFromError(error: Error) { return { error }; }
  render() {
    if (this.state.error) {
      return (
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          height: '100vh', background: '#0A3E66', fontFamily: 'Inter, system-ui, sans-serif', padding: '24px',
        }}>
          <div style={{ background: '#DA1D17', borderRadius: '10px', padding: '14px 24px', marginBottom: '20px' }}>
            <span style={{ color: '#fff', fontWeight: 900, fontSize: '18px' }}>HIVE MOTORS — Studio Error</span>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '10px', padding: '24px', maxWidth: '560px', width: '100%' }}>
            <p style={{ color: '#fff', fontWeight: 700, marginBottom: '8px' }}>The studio failed to load:</p>
            <pre style={{ color: '#ff8080', fontSize: '13px', whiteSpace: 'pre-wrap', wordBreak: 'break-word', margin: 0 }}>
              {(this.state.error as Error).message}
            </pre>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.45)', marginTop: '20px', fontSize: '12px' }}>
            Check <code style={{ color: '#DA1D17' }}>sanity/schemas/</code> for errors, then refresh.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

function StudioLoadingScreen() {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      height: '100vh', background: 'linear-gradient(135deg, #0A3E66 0%, #062A47 100%)',
      fontFamily: 'Inter, system-ui, sans-serif',
    }}>
      <div style={{
        width: '64px', height: '64px', background: '#DA1D17', borderRadius: '16px',
        display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px',
        boxShadow: '0 8px 28px rgba(218,29,23,0.4)',
      }}>
        <span style={{ color: '#fff', fontWeight: 900, fontSize: '32px', lineHeight: 1 }}>H</span>
      </div>
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <div style={{ color: '#fff', fontWeight: 800, fontSize: '22px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          HIVE <span style={{ color: '#DA1D17' }}>MOTORS</span>
        </div>
        <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: '4px' }}>
          Loading Admin Panel
        </div>
      </div>
      <div style={{ width: '140px', height: '3px', background: 'rgba(255,255,255,0.1)', borderRadius: '999px', overflow: 'hidden' }}>
        <div style={{
          height: '100%', background: 'linear-gradient(90deg, #DA1D17, #ff4a44)',
          borderRadius: '999px', animation: 'loadbar 1.4s ease-in-out infinite',
        }} />
      </div>
      <style>{`@keyframes loadbar{0%{width:0%;margin-left:0}50%{width:70%;margin-left:15%}100%{width:0%;margin-left:100%}}`}</style>
    </div>
  );
}

const NextStudio = dynamicImport(
  () => import('next-sanity/studio').then(mod => mod.NextStudio),
  { ssr: false, loading: () => <StudioLoadingScreen /> }
);

export default function StudioPage() {
  return (
    <div style={{ height: '100vh', overflow: 'hidden' }}>
      <StudioErrorBoundary>
        <NextStudio config={config} />
      </StudioErrorBoundary>
    </div>
  );
}
