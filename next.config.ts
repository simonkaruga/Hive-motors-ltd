import type { NextConfig } from "next";

const securityHeaders = [
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin-allow-popups' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
];

// Static CSP (no per-request nonce) so pages can stay statically generated /
// ISR-cached. Inline JSON-LD and the GA bootstrap script mean script-src
// needs 'unsafe-inline' — this still closes off object-src, base-uri,
// frame-ancestors and restricts script/connect origins to known third parties.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://cdn.sanity.io",
  "font-src 'self' data:",
  "connect-src 'self' https://cdn.sanity.io https://*.sanity.io https://www.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com",
  "frame-src https://www.google.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  'upgrade-insecure-requests',
  "trusted-types default",
  "require-trusted-types-for 'script'",
].join('; ');

const nextConfig: NextConfig = {
  compress: true,
  experimental: {
    swcTraceProfiling: false,
  },
  turbopack: {
    root: process.cwd(),
  },
  async headers() {
    return [
      { source: '/(.*)', headers: securityHeaders },
      // Sanity Studio is an admin-only SPA that needs eval/blob for its own
      // bundler — keep it outside the public site's stricter script-src.
      { source: '/studio/:path*', headers: [{ key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' blob:; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://cdn.sanity.io; connect-src 'self' https://*.sanity.io wss://*.sanity.io; worker-src 'self' blob:; frame-ancestors 'self';" }] },
      { source: '/((?!studio).*)', headers: [{ key: 'Content-Security-Policy', value: csp }] },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
    deviceSizes: [640, 750, 828, 1080, 1200],
    qualities: [60, 75, 85, 90],
  },
};

export default nextConfig;
