'use client';

import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';

const spokeCount = 12;
function spoke(i: number, innerR: number, outerR: number) {
  const angle = (i * (360 / spokeCount) - 90) * (Math.PI / 180);
  return {
    x1: Math.cos(angle) * innerR,
    y1: Math.sin(angle) * innerR,
    x2: Math.cos(angle) * outerR,
    y2: Math.sin(angle) * outerR,
  };
}

function SportWheel({ cx, cy, ctrl }: { cx: number; cy: number; ctrl: ReturnType<typeof useAnimation> }) {
  return (
    <g transform={`translate(${cx} ${cy})`}>
      <motion.g animate={ctrl} style={{ transformBox: 'fill-box', transformOrigin: 'center center' }}>
        <circle r={48} fill="#030608" opacity={0.7} cy={4} />
        <circle r={46} fill="#0d1520" stroke="#1a2535" strokeWidth="2.5" />
        <path d="M -32,-32 A 46 46 0 0 1 32,-32" stroke="#ffffff" strokeWidth="1.5" fill="none" opacity={0.06} strokeLinecap="round" />
        <circle r={30} fill="#0e0505" />
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i * 45) * (Math.PI / 180);
          return <line key={i} x1={Math.cos(a)*14} y1={Math.sin(a)*14} x2={Math.cos(a)*22} y2={Math.sin(a)*22} stroke="#3a1010" strokeWidth="1" opacity={0.8} />;
        })}
        <rect x={-7} y={-16} width={14} height={32} rx={4} fill="#0A3E66" opacity={0.95} />
        <rect x={-4} y={-12} width={8} height={24} rx={2} fill="#0D4F82" opacity={0.7} />
        <circle r={28} fill="none" stroke="#c8d2dc" strokeWidth="2" opacity={0.9} />
        <circle r={20} fill="none" stroke="#8a9aac" strokeWidth="1" opacity={0.5} />
        {Array.from({ length: spokeCount }).map((_, i) => {
          const s = spoke(i, 7, 26);
          return <line key={i} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} stroke="#d0dce8" strokeWidth="2.5" strokeLinecap="round" opacity={0.95} />;
        })}
        <circle r={9} fill="#0a1525" stroke="#8a9aac" strokeWidth="1.5" />
        <circle r={5} fill="#DA1D17" />
        <circle r={2} fill="#ff5555" opacity={0.8} />
      </motion.g>
    </g>
  );
}

function SpeedLines({ ctrl }: { ctrl: ReturnType<typeof useAnimation> }) {
  const lines = [
    { y: 70, w: 140, x: -160, op: 0.35 }, { y: 98, w: 90, x: -110, op: 0.25 },
    { y: 122, w: 180, x: -200, op: 0.4 }, { y: 148, w: 70, x: -90, op: 0.2 },
    { y: 170, w: 120, x: -140, op: 0.3 }, { y: 55, w: 100, x: -120, op: 0.25 },
  ];
  return (
    <motion.g animate={ctrl} initial={{ opacity: 0 }}>
      {lines.map((l, i) => (
        <rect key={i} x={l.x} y={l.y} width={l.w} height={i % 2 === 0 ? 2 : 1} rx={1} fill="#DA1D17" opacity={l.op} />
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
  const shimmerCtrl = useAnimation();

  useEffect(() => {
    async function sequence() {
      driveCtrl.set({ x: 1800 });
      wheelCtrl.set({ rotate: 0 });
      speedCtrl.set({ opacity: 0 });

      speedCtrl.start({ opacity: [0, 1, 0], transition: { duration: 1.8, ease: 'easeOut' } });

      await Promise.all([
        driveCtrl.start({ x: 0, transition: { duration: 1.8, ease: [0.22, 1, 0.36, 1] } }),
        wheelCtrl.start({ rotate: -1080, transition: { duration: 1.8, ease: 'linear' } }),
      ]);

      await driveCtrl.start({ x: [0, 16, -8, 3, 0], transition: { duration: 0.55, ease: 'easeOut' } });

      floatCtrl.start({ y: [0, -20, 0], transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' } });
      shadowCtrl.start({ scaleX: [1, 0.72, 1], opacity: [0.5, 0.18, 0.5], transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' } });
      glowCtrl.start({ opacity: [0.6, 1, 0.6], scaleX: [1, 1.2, 1], scaleY: [1, 1.1, 1], transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' } });
      shimmerCtrl.start({ opacity: [0, 0.15, 0], x: [-200, 900], transition: { duration: 2.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 4 } });
    }

    const t = setTimeout(sequence, 600);
    return () => clearTimeout(t);
  }, [driveCtrl, wheelCtrl, floatCtrl, shadowCtrl, glowCtrl, speedCtrl, shimmerCtrl]);

  return (
    <div className="relative w-full flex items-end justify-center pointer-events-none select-none pb-10">
      <motion.div animate={driveCtrl} className="relative w-full">
        <motion.div animate={floatCtrl}>

          {/* Red underglow */}
          <motion.div
            animate={glowCtrl}
            initial={{ opacity: 0.5 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[80%] h-20 rounded-full"
            style={{ background: 'radial-gradient(ellipse, #DA1D17 0%, rgba(218,29,23,0.3) 40%, transparent 70%)', filter: 'blur(18px)' }}
          />

          <svg viewBox="0 0 700 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <defs>
              <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="#e0e8f0" />
                <stop offset="25%"  stopColor="#b8c8d8" />
                <stop offset="65%"  stopColor="#7090a8" />
                <stop offset="100%" stopColor="#3a5060" />
              </linearGradient>
              <linearGradient id="hoodHL" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="roofHL" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="glassGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="#0a1a2e" />
                <stop offset="100%" stopColor="#04080f" />
              </linearGradient>
              <linearGradient id="shimmerGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%"   stopColor="#ffffff" stopOpacity="0" />
                <stop offset="50%"  stopColor="#ffffff" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>
              <radialGradient id="headGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%"   stopColor="#ffffff" stopOpacity="1" />
                <stop offset="60%"  stopColor="#88aaff" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="tailGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%"   stopColor="#ff2200" stopOpacity="1" />
                <stop offset="100%" stopColor="#ff2200" stopOpacity="0" />
              </radialGradient>
              <mask id="carMask">
                <rect x="0" y="0" width="700" height="280" fill="white" />
                <circle cx="162" cy="212" r="52" fill="black" />
                <circle cx="548" cy="212" r="52" fill="black" />
              </mask>
              <filter id="headlightBloom" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <filter id="tailBloom" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            <SpeedLines ctrl={speedCtrl} />

            {/* Ground shadow */}
            <motion.ellipse animate={shadowCtrl} cx={355} cy={268} rx={300} ry={12} fill="#000000" opacity={0.5} />

            {/* Main body */}
            <path d="M 10,175 L 8,155 Q 20,118 62,96 Q 96,78 150,68 Q 172,58 196,50 L 232,38 Q 252,28 274,27 L 408,25 Q 432,25 454,40 L 480,60 Q 512,82 528,112 Q 542,136 548,158 L 554,175 Q 558,180 560,184 L 560,188 L 10,188 Z"
              fill="url(#bodyGrad)" mask="url(#carMask)" />

            {/* Hood highlight */}
            <path d="M 90,100 Q 130,80 175,65 L 210,52 Q 180,64 148,80 Q 114,95 88,116 Z" fill="url(#hoodHL)" mask="url(#carMask)" />

            {/* Cabin / glass */}
            <path d="M 200,52 Q 220,38 238,34 L 278,27 L 406,26 Q 430,26 450,42 L 474,62 L 200,62 Z"
              fill="url(#glassGrad)" stroke="#2a4060" strokeWidth="1.5" />

            {/* Roof highlight */}
            <path d="M 210,54 Q 230,38 255,32 L 290,27 L 390,26 Q 420,26 440,38 L 460,52 L 410,52 Q 388,34 355,30 L 260,31 Q 235,32 215,48 Z"
              fill="url(#roofHL)" opacity={0.5} />

            {/* Windshield glare */}
            <path d="M 238,36 Q 258,29 290,27 L 300,27 Q 270,29 244,38 Z" fill="white" opacity={0.12} />
            <path d="M 325,26 L 374,26 L 372,31 L 323,32 Z" fill="white" opacity={0.07} />

            {/* Pillars */}
            <line x1="200" y1="62" x2="234" y2="27" stroke="#1a2c3e" strokeWidth="8" />
            <line x1="324" y1="26" x2="324" y2="62" stroke="#0a1828" strokeWidth="12" />
            <line x1="474" y1="62" x2="454" y2="42" stroke="#1a2c3e" strokeWidth="8" />

            {/* Rear spoiler */}
            <path d="M 490,12 L 586,12 Q 592,12 592,18 L 592,28 Q 592,34 586,34 L 490,34 Q 484,34 484,28 L 484,18 Q 484,12 490,12 Z" fill="#1a2a3e" stroke="#2a4060" strokeWidth="1" />
            <path d="M 490,12 L 586,12 L 586,18 L 490,18 Z" fill="#2a4060" opacity={0.8} />
            <rect x="484" y="12" width="8" height="22" rx="2" fill="#1a2a3e" stroke="#2a4060" strokeWidth="0.5" />
            <rect x="588" y="12" width="8" height="22" rx="2" fill="#1a2a3e" stroke="#2a4060" strokeWidth="0.5" />
            <rect x="498" y="34" width="6" height="16" rx="1.5" fill="#162030" />
            <rect x="556" y="34" width="6" height="16" rx="1.5" fill="#162030" />
            <rect x="490" y="11" width="96" height="2.5" rx="1" fill="#DA1D17" opacity={0.85} />

            {/* Headlight */}
            <motion.g animate={glowCtrl} filter="url(#headlightBloom)">
              <ellipse cx="12" cy="125" rx="28" ry="14" fill="url(#headGlow)" opacity={0.5} />
              <rect x="6" y="118" width="32" height="6" rx="3" fill="white" opacity={0.97} />
              <rect x="8" y="127" width="22" height="2.5" rx="1.5" fill="white" opacity={0.65} />
              <rect x="10" y="132" width="14" height="2" rx="1" fill="#DA1D17" opacity={0.85} />
              <ellipse cx="16" cy="120" rx="6" ry="5" fill="white" opacity={0.4} />
            </motion.g>

            {/* Taillight */}
            <motion.g animate={glowCtrl} filter="url(#tailBloom)">
              <ellipse cx="556" cy="126" rx="18" ry="12" fill="url(#tailGlow)" opacity={0.3} />
              <rect x="542" y="110" width="18" height="36" rx="3" fill="#5a0000" opacity={0.95} />
              <rect x="544" y="112" width="10" height="10" rx="1.5" fill="#DA1D17" opacity={0.95} />
              <rect x="544" y="125" width="10" height="5" rx="1" fill="#DA1D17" opacity={0.6} />
              <rect x="544" y="133" width="10" height="8" rx="1" fill="#8b0000" opacity={0.8} />
              <rect x="544" y="111" width="10" height="1.5" rx="0.5" fill="#ff4444" opacity={0.9} />
            </motion.g>

            {/* Character lines */}
            <path d="M 225,64 Q 380,72 520,62" stroke="#b0c0d0" strokeWidth="1.2" opacity={0.25} fill="none" />
            <path d="M 95,118 Q 200,128 340,124 Q 460,120 552,114" stroke="#b0c0d0" strokeWidth="0.8" opacity={0.15} fill="none" />

            {/* Side skirt */}
            <path d="M 215,182 Q 390,186 548,180" stroke="#6080a0" strokeWidth="2" opacity={0.3} fill="none" />
            <path d="M 215,184 Q 390,188 548,182 L 548,188 L 215,188 Z" fill="#050d18" opacity={0.4} />

            {/* Side air vent */}
            <rect x="213" y="115" width="26" height="38" rx="4" fill="#040a14" stroke="#1a3050" strokeWidth="1" />
            {[120, 127, 134, 141, 148].map((y, i) => (
              <line key={i} x1="215" y1={y} x2="237" y2={y} stroke="#2a5080" strokeWidth="0.8" opacity={0.6} />
            ))}
            <rect x="213" y="115" width="26" height="2" rx="1" fill="#6080a0" opacity={0.5} />

            {/* Door handle */}
            <rect x="340" y="108" width="42" height="8" rx="4" fill="#9ab0c8" opacity={0.25} />
            <rect x="340" y="109" width="42" height="3" rx="1.5" fill="#c0d4e8" opacity={0.4} />

            {/* Front splitter */}
            <path d="M 8,180 Q 70,174 135,177 L 135,188 L 8,188 Z" fill="#06101c" opacity={0.95} />
            <line x1="10" y1="179" x2="133" y2="176" stroke="#DA1D17" strokeWidth="2" opacity={0.7} />
            {[30, 55, 80, 105].map((x, i) => (
              <line key={i} x1={x} y1="177" x2={x} y2="188" stroke="#1a3050" strokeWidth="1" opacity={0.5} />
            ))}

            {/* Rear diffuser */}
            <path d="M 530,178 Q 548,174 560,178 L 560,188 L 530,188 Z" fill="#06101c" />
            {[534, 540, 546, 552].map((x, i) => (
              <line key={i} x1={x} y1="178" x2={x} y2="188" stroke="#1a3050" strokeWidth="1" opacity={0.5} />
            ))}
            <line x1="530" y1="177" x2="558" y2="176" stroke="#DA1D17" strokeWidth="1.5" opacity={0.5} />

            {/* Mirror */}
            <path d="M 185,72 Q 195,68 204,70 L 202,80 Q 192,82 184,80 Z" fill="#8aaccb" stroke="#6080a0" strokeWidth="0.8" opacity={0.7} />

            {/* Body shimmer sweep */}
            <motion.rect animate={shimmerCtrl} x="0" y="25" width="80" height="165"
              fill="url(#shimmerGrad)" opacity={0} transform="skewX(-15)" />

            {/* Wheels */}
            <SportWheel cx={162} cy={212} ctrl={wheelCtrl} />
            <SportWheel cx={548} cy={212} ctrl={wheelCtrl} />

            {/* Wheel arch chrome lip */}
            <path d="M 110,188 Q 162,178 214,188" stroke="#c0d0e0" strokeWidth="1.5" fill="none" opacity={0.4} />
            <path d="M 496,188 Q 548,178 600,188" stroke="#c0d0e0" strokeWidth="1.5" fill="none" opacity={0.4} />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}
