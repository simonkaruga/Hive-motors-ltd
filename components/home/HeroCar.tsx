'use client';

import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';

const spokeCount = 12;
function spoke(i: number, innerR: number, outerR: number) {
  const angle = (i * (360 / spokeCount) - 90) * (Math.PI / 180);
  return {
    x1: Math.cos(angle) * innerR, y1: Math.sin(angle) * innerR,
    x2: Math.cos(angle) * outerR, y2: Math.sin(angle) * outerR,
  };
}

function SportWheel({ cx, cy, ctrl }: { cx: number; cy: number; ctrl: ReturnType<typeof useAnimation> }) {
  return (
    <g transform={`translate(${cx} ${cy})`}>
      <motion.g animate={ctrl} style={{ transformBox: 'fill-box', transformOrigin: 'center center' }}>
        {/* Drop shadow */}
        <ellipse rx={48} ry={12} cy={48} fill="#000" opacity={0.5} />
        {/* Tyre */}
        <circle r={46} fill="#080c12" stroke="#1e2a3a" strokeWidth="3" />
        {/* Tyre highlight arc */}
        <path d="M -30,-34 A 46 46 0 0 1 30,-34" stroke="#ffffff" strokeWidth="2" fill="none" opacity={0.08} strokeLinecap="round" />
        {/* Brake disc */}
        <circle r={30} fill="#100404" />
        {/* Disc cooling slots */}
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i * 45) * (Math.PI / 180);
          return <line key={i} x1={Math.cos(a)*14} y1={Math.sin(a)*14} x2={Math.cos(a)*23} y2={Math.sin(a)*23} stroke="#2a0808" strokeWidth="1.5" />;
        })}
        {/* Caliper — navy brand */}
        <rect x={-8} y={-18} width={16} height={36} rx={5} fill="#0A3E66" />
        <rect x={-5} y={-13} width={10} height={26} rx={3} fill="#0D4F82" opacity={0.8} />
        {/* Rim rings */}
        <circle r={28} fill="none" stroke="#d0dce8" strokeWidth="2.5" opacity={0.95} />
        <circle r={22} fill="none" stroke="#8aa0b8" strokeWidth="1" opacity={0.6} />
        <circle r={10} fill="none" stroke="#8aa0b8" strokeWidth="0.8" opacity={0.4} />
        {/* Spokes */}
        {Array.from({ length: spokeCount }).map((_, i) => {
          const s = spoke(i, 8, 26);
          return <line key={i} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} stroke="#e0eaf4" strokeWidth="3" strokeLinecap="round" opacity={0.9} />;
        })}
        {/* Hub */}
        <circle r={10} fill="#040a14" stroke="#8aa0b8" strokeWidth="2" />
        <circle r={6} fill="#DA1D17" />
        <circle r={3} fill="#ff5555" opacity={0.9} />
      </motion.g>
    </g>
  );
}

function SpeedLines({ ctrl }: { ctrl: ReturnType<typeof useAnimation> }) {
  const lines = [
    { y: 68, w: 160, x: -180, h: 2.5, op: 0.5 },
    { y: 95, w: 110, x: -130, h: 1.5, op: 0.35 },
    { y: 120, w: 200, x: -220, h: 3, op: 0.55 },
    { y: 145, w: 80,  x: -100, h: 1.5, op: 0.3 },
    { y: 168, w: 140, x: -160, h: 2, op: 0.45 },
    { y: 52,  w: 120, x: -140, h: 1.5, op: 0.3 },
    { y: 188, w: 90,  x: -110, h: 1.5, op: 0.25 },
  ];
  return (
    <motion.g animate={ctrl} initial={{ opacity: 0 }}>
      {lines.map((l, i) => (
        <rect key={i} x={l.x} y={l.y} width={l.w} height={l.h} rx={1} fill="#DA1D17" opacity={l.op} />
      ))}
    </motion.g>
  );
}

export default function HeroCar() {
  const driveCtrl   = useAnimation();
  const wheelCtrl   = useAnimation();
  const floatCtrl   = useAnimation();
  const shadowCtrl  = useAnimation();
  const glowCtrl    = useAnimation();
  const speedCtrl   = useAnimation();
  const lightCtrl   = useAnimation();

  useEffect(() => {
    async function sequence() {
      driveCtrl.set({ x: 2000 });
      wheelCtrl.set({ rotate: 0 });
      speedCtrl.set({ opacity: 0 });
      lightCtrl.set({ opacity: 0.7 });

      speedCtrl.start({ opacity: [0, 1, 0.5, 0], transition: { duration: 1.8, times: [0, 0.3, 0.7, 1] } });

      await Promise.all([
        driveCtrl.start({ x: 0, transition: { duration: 1.8, ease: [0.22, 1, 0.36, 1] } }),
        wheelCtrl.start({ rotate: -1080, transition: { duration: 1.8, ease: 'linear' } }),
      ]);

      // Settle bounce
      await driveCtrl.start({ x: [0, 20, -10, 4, 0], transition: { duration: 0.65, ease: 'easeOut' } });

      // Headlight double-blink (like locking the car)
      await lightCtrl.start({ opacity: [0.7, 1, 0.3, 1, 0.3, 1], transition: { duration: 0.8 } });

      // Continuous animations
      floatCtrl.start({ y: [0, -18, 0], transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' } });
      shadowCtrl.start({ scaleX: [1, 0.7, 1], opacity: [0.55, 0.18, 0.55], transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' } });
      glowCtrl.start({ opacity: [0.7, 1, 0.7], scaleX: [1, 1.25, 1], scaleY: [1, 1.15, 1], transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' } });
      lightCtrl.start({ opacity: [1, 0.85, 1], transition: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' } });
    }

    const t = setTimeout(sequence, 500);
    return () => clearTimeout(t);
  }, [driveCtrl, wheelCtrl, floatCtrl, shadowCtrl, glowCtrl, speedCtrl, lightCtrl]);

  return (
    <div className="relative w-full flex items-end justify-center pointer-events-none select-none" style={{ paddingBottom: '32px' }}>
      <motion.div animate={driveCtrl} className="relative w-full">
        <motion.div animate={floatCtrl}>

          {/* Red underglow — intense */}
          <motion.div animate={glowCtrl} initial={{ opacity: 0.6 }} className="absolute left-1/2 -translate-x-1/2 rounded-full"
            style={{ bottom: '28px', width: '82%', height: '28px', background: 'radial-gradient(ellipse, #DA1D17 0%, rgba(218,29,23,0.5) 40%, transparent 70%)', filter: 'blur(20px)' }} />
          {/* Secondary blue-white haze */}
          <motion.div animate={glowCtrl} initial={{ opacity: 0.3 }} className="absolute left-1/2 -translate-x-1/2 rounded-full"
            style={{ bottom: '20px', width: '60%', height: '16px', background: 'radial-gradient(ellipse, rgba(180,220,255,0.5) 0%, transparent 70%)', filter: 'blur(12px)' }} />

          <svg viewBox="0 0 720 290" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))' }}>
            <defs>
              {/* RED body gradient */}
              <linearGradient id="bodyRed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="#ff4030" />
                <stop offset="18%"  stopColor="#DA1D17" />
                <stop offset="60%"  stopColor="#8a0800" />
                <stop offset="100%" stopColor="#3a0400" />
              </linearGradient>
              {/* Top body highlight */}
              <linearGradient id="bodyTopHL" x1="0.1" y1="0" x2="0.9" y2="0.6">
                <stop offset="0%"   stopColor="#ff8070" stopOpacity="0.6" />
                <stop offset="50%"  stopColor="#ff5040" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#ff2010" stopOpacity="0" />
              </linearGradient>
              {/* Hood specular */}
              <linearGradient id="hoodSpec" x1="0" y1="0" x2="0.4" y2="1">
                <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>
              {/* Glass */}
              <linearGradient id="glassGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="#0c1828" />
                <stop offset="100%" stopColor="#040810" />
              </linearGradient>
              {/* Glass reflection */}
              <linearGradient id="glassRefl" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%"   stopColor="#4080c0" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#4080c0" stopOpacity="0" />
              </linearGradient>
              {/* Headlight glow */}
              <radialGradient id="headGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%"   stopColor="#ffffff" stopOpacity="1" />
                <stop offset="40%"  stopColor="#aaccff" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </radialGradient>
              {/* Taillight */}
              <radialGradient id="tailGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%"   stopColor="#ff3300" stopOpacity="1" />
                <stop offset="100%" stopColor="#ff3300" stopOpacity="0" />
              </radialGradient>
              {/* Lower body shine */}
              <linearGradient id="lowerShine" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="#ff6050" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#ff2010" stopOpacity="0" />
              </linearGradient>
              {/* Wheel arch mask */}
              <mask id="carMask">
                <rect x="0" y="0" width="720" height="290" fill="white" />
                <circle cx="168" cy="218" r="54" fill="black" />
                <circle cx="562" cy="218" r="54" fill="black" />
              </mask>
              {/* Headlight bloom filter */}
              <filter id="hBloom" x="-150%" y="-150%" width="400%" height="400%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <filter id="tBloom" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              {/* Chrome gradient for trim */}
              <linearGradient id="chrome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="#f0f4f8" />
                <stop offset="50%"  stopColor="#8090a0" />
                <stop offset="100%" stopColor="#c8d4e0" />
              </linearGradient>
            </defs>

            <SpeedLines ctrl={speedCtrl} />

            {/* Ground shadow */}
            <motion.ellipse animate={shadowCtrl} cx={365} cy={278} rx={310} ry={14} fill="#000" opacity={0.55} />

            {/* ── MAIN BODY (RED) ── */}
            <path d="M 12,182 L 10,160 Q 22,122 66,100 Q 100,82 156,72 Q 178,62 202,54 L 240,40 Q 260,30 282,29 L 420,27 Q 446,27 468,44 L 496,66 Q 530,90 546,122 Q 560,146 566,168 L 572,182 Q 576,188 578,193 L 578,196 L 12,196 Z"
              fill="url(#bodyRed)" mask="url(#carMask)" />

            {/* Body top highlight overlay */}
            <path d="M 12,182 L 10,160 Q 22,122 66,100 Q 100,82 156,72 Q 178,62 202,54 L 240,40 Q 260,30 282,29 L 420,27 Q 446,27 468,44 L 496,66 Q 530,90 546,122 Q 560,146 566,168 L 572,182 L 572,196 L 12,196 Z"
              fill="url(#bodyTopHL)" mask="url(#carMask)" />

            {/* Hood specular highlight */}
            <path d="M 95,106 Q 138,86 185,72 L 220,58 Q 188,70 154,86 Q 118,102 92,122 Z"
              fill="url(#hoodSpec)" mask="url(#carMask)" />

            {/* ── CABIN / GLASS ── */}
            <path d="M 206,56 Q 228,40 248,36 L 288,29 L 418,28 Q 444,28 466,46 L 490,68 L 206,68 Z"
              fill="url(#glassGrad)" stroke="#2a3a50" strokeWidth="1.5" />

            {/* Glass reflection */}
            <path d="M 216,60 Q 236,44 258,38 L 300,30 L 360,29 Q 320,30 290,38 Q 258,46 238,62 Z"
              fill="url(#glassRefl)" />

            {/* Windshield glare streak */}
            <path d="M 248,38 Q 270,31 305,29 L 318,29 Q 285,31 252,40 Z" fill="white" opacity={0.14} />
            <path d="M 340,28 L 390,27 L 388,32 L 338,33 Z" fill="white" opacity={0.08} />

            {/* A-pillar */}
            <line x1="206" y1="68" x2="244" y2="29" stroke="#200808" strokeWidth="8" />
            {/* B-pillar */}
            <line x1="336" y1="28" x2="336" y2="68" stroke="#100404" strokeWidth="14" />
            {/* C-pillar */}
            <line x1="490" y1="68" x2="468" y2="46" stroke="#200808" strokeWidth="8" />

            {/* ── REAR SPOILER WING ── */}
            <path d="M 508,14 L 608,14 Q 616,14 616,21 L 616,32 Q 616,39 608,39 L 508,39 Q 500,39 500,32 L 500,21 Q 500,14 508,14 Z"
              fill="#1a0808" stroke="#3a1010" strokeWidth="1" />
            {/* Wing top surface */}
            <path d="M 508,14 L 608,14 L 608,20 L 508,20 Z" fill="#2a1010" opacity={0.9} />
            {/* Wing end plates */}
            <rect x="500" y="14" width="9" height="25" rx="2" fill="#140404" stroke="#2a1010" strokeWidth="0.5" />
            <rect x="607" y="14" width="9" height="25" rx="2" fill="#140404" stroke="#2a1010" strokeWidth="0.5" />
            {/* Supports */}
            <rect x="515" y="39" width="7" height="18" rx="2" fill="#120404" />
            <rect x="576" y="39" width="7" height="18" rx="2" fill="#120404" />
            {/* Silver accent strip on wing top */}
            <rect x="508" y="13" width="100" height="3" rx="1" fill="url(#chrome)" opacity={0.7} />

            {/* ── FRONT HEADLIGHT ── */}
            <motion.g animate={lightCtrl} filter="url(#hBloom)">
              {/* Broad halo */}
              <ellipse cx="14" cy="130" rx="34" ry="18" fill="url(#headGlow)" opacity={0.6} />
              {/* Main LED bar */}
              <rect x="6" y="122" width="36" height="7" rx="3.5" fill="white" opacity={0.98} />
              {/* DRL thin strip */}
              <rect x="8" y="132" width="26" height="3" rx="1.5" fill="white" opacity={0.7} />
              {/* Lower red accent */}
              <rect x="10" y="137" width="18" height="2.5" rx="1" fill="#ff6644" opacity={0.9} />
              {/* Projector inner ring */}
              <ellipse cx="18" cy="125" rx="7" ry="6" fill="white" opacity={0.5} />
            </motion.g>

            {/* ── TAILLIGHT ── */}
            <motion.g animate={lightCtrl} filter="url(#tBloom)">
              <ellipse cx="572" cy="130" rx="22" ry="16" fill="url(#tailGlow)" opacity={0.35} />
              <rect x="558" y="112" width="20" height="42" rx="4" fill="#400000" opacity={0.97} />
              <rect x="560" y="114" width="12" height="12" rx="2" fill="#DA1D17" opacity={0.97} />
              <rect x="560" y="129" width="12" height="6" rx="1" fill="#DA1D17" opacity={0.65} />
              <rect x="560" y="138" width="12" height="10" rx="1" fill="#700000" opacity={0.9} />
              {/* LED strip at top */}
              <rect x="560" y="113" width="12" height="2" rx="0.5" fill="#ff5555" opacity={0.95} />
            </motion.g>

            {/* ── CHROME TRIM LINES ── */}
            {/* Upper character line */}
            <path d="M 232,70 Q 395,80 535,68" stroke="url(#chrome)" strokeWidth="1.5" opacity={0.4} fill="none" />
            {/* Mid belt line */}
            <path d="M 100,128 Q 210,140 355,136 Q 475,132 562,122" stroke="#ff4030" strokeWidth="0.8" opacity={0.25} fill="none" />

            {/* ── LOWER SIDE SKIRT ── */}
            <path d="M 222,188 Q 400,193 565,186" stroke="#ff3020" strokeWidth="2.5" opacity={0.35} fill="none" />
            <path d="M 222,190 Q 400,195 565,188 L 565,196 L 222,196 Z" fill="#1a0303" opacity={0.6} />

            {/* Chrome rocker panel trim */}
            <path d="M 222,190 Q 400,194 565,188" stroke="url(#chrome)" strokeWidth="1" opacity={0.3} fill="none" />

            {/* ── SIDE AIR INTAKE ── */}
            <rect x="218" y="120" width="30" height="44" rx="5" fill="#0a0202" stroke="#2a0808" strokeWidth="1" />
            {[126, 133, 140, 148, 155].map((y, i) => (
              <line key={i} x1="220" y1={y} x2="246" y2={y} stroke="#3a0808" strokeWidth="1" opacity={0.7} />
            ))}
            {/* Vent chrome trim */}
            <rect x="218" y="120" width="30" height="2.5" rx="1" fill="url(#chrome)" opacity={0.5} />

            {/* ── DOOR HANDLE ── */}
            <rect x="350" y="114" width="46" height="9" rx="4.5" fill="#8aa0b8" opacity={0.2} />
            <rect x="350" y="115" width="46" height="4" rx="2" fill="#c0d4e8" opacity={0.35} />

            {/* ── MIRROR ── */}
            <path d="M 192,78 Q 203,74 214,76 L 212,88 Q 200,90 190,88 Z" fill="#c84030" stroke="#ff4030" strokeWidth="0.8" opacity={0.9} />
            {/* Mirror highlight */}
            <path d="M 195,78 Q 203,75 210,77 L 209,80 Q 201,78 196,80 Z" fill="#ff6050" opacity={0.5} />

            {/* ── FRONT SPLITTER ── */}
            <path d="M 10,188 Q 75,180 148,184 L 148,196 L 10,196 Z" fill="#080202" opacity={0.97} />
            {/* Red neon accent line on splitter */}
            <line x1="12" y1="187" x2="146" y2="183" stroke="#DA1D17" strokeWidth="2.5" opacity={0.85} style={{ filter: 'drop-shadow(0 0 4px #DA1D17)' }} />
            {/* Splitter fins */}
            {[35, 62, 89, 116].map((x, i) => (
              <line key={i} x1={x} y1="184" x2={x} y2="196" stroke="#2a0808" strokeWidth="1.2" opacity={0.6} />
            ))}

            {/* ── REAR DIFFUSER ── */}
            <path d="M 545,184 Q 562,179 578,184 L 578,196 L 545,196 Z" fill="#080202" />
            {[550, 557, 564, 571].map((x, i) => (
              <line key={i} x1={x} y1="184" x2={x} y2="196" stroke="#2a0808" strokeWidth="1" opacity={0.6} />
            ))}
            <line x1="545" y1="183" x2="576" y2="182" stroke="#DA1D17" strokeWidth="2" opacity={0.65} />

            {/* ── FRONT BUMPER LOWER GRILLE ── */}
            <path d="M 12,164 Q 28,150 58,136" stroke="#2a0808" strokeWidth="1.5" opacity={0.5} fill="none" />
            <rect x="12" y="160" width="55" height="8" rx="3" fill="#0a0202" stroke="#1a0606" strokeWidth="0.5" />
            {/* Grille bars */}
            {[22, 32, 42, 52].map((x, i) => (
              <line key={i} x1={x} y1="160" x2={x} y2="168" stroke="#2a0808" strokeWidth="1" opacity={0.7} />
            ))}

            {/* ── EXHAUST TIPS ── */}
            <ellipse cx="536" cy="193" rx="9" ry="5" fill="#0a0404" stroke="#4a6080" strokeWidth="1.5" />
            <ellipse cx="536" cy="193" rx="6" ry="3" fill="#040202" />
            <ellipse cx="552" cy="193" rx="9" ry="5" fill="#0a0404" stroke="#4a6080" strokeWidth="1.5" />
            <ellipse cx="552" cy="193" rx="6" ry="3" fill="#040202" />

            {/* ── WHEELS ── */}
            <SportWheel cx={168} cy={218} ctrl={wheelCtrl} />
            <SportWheel cx={562} cy={218} ctrl={wheelCtrl} />

            {/* Wheel arch chrome trim */}
            <path d="M 114,196 Q 168,184 222,196" stroke="url(#chrome)" strokeWidth="2" fill="none" opacity={0.45} />
            <path d="M 508,196 Q 562,184 616,196" stroke="url(#chrome)" strokeWidth="2" fill="none" opacity={0.45} />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}
