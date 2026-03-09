'use client';

import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';

// 5-spoke alloy rim spoke vectors (from center, radius 20)
const spokeAngles = [0, 72, 144, 216, 288];
function spokeCoords(angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: Math.cos(rad) * 20, y: Math.sin(rad) * 20 };
}

function Wheel({ cx, cy, wheelAnim }: { cx: number; cy: number; wheelAnim: ReturnType<typeof useAnimation> }) {
  return (
    // Outer g positions the wheel in the SVG coordinate space
    <g transform={`translate(${cx} ${cy})`}>
      {/* This g rotates — drawn centred at (0,0) */}
      <motion.g
        animate={wheelAnim}
        style={{ transformBox: 'fill-box', transformOrigin: 'center center' }}
      >
        {/* Tyre */}
        <circle r={32} fill="#0c1220" stroke="#c8d0dc" strokeWidth="2" />
        {/* Rim ring */}
        <circle r={22} fill="#1a2a3e" stroke="#c8d0dc" strokeWidth="1.5" />
        {/* 5 spokes — silver alloy */}
        {spokeAngles.map((a) => {
          const { x, y } = spokeCoords(a);
          return (
            <line
              key={a}
              x1={0} y1={0}
              x2={x} y2={y}
              stroke="#c8d0dc"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity={0.9}
            />
          );
        })}
        {/* Centre cap — red brand accent */}
        <circle r={5} fill="#DA1D17" />
      </motion.g>
    </g>
  );
}

export default function CarAnimation() {
  const carAnim   = useAnimation();
  const wheelAnim = useAnimation();
  const lightsAnim = useAnimation();

  useEffect(() => {
    async function run() {
      // Start: car off-screen right (large px — clipped by section's overflow-hidden)
      carAnim.set({ x: 1400 });
      wheelAnim.set({ rotate: 0 });

      // Drive in — car slides left, wheels spin counterclockwise
      await Promise.all([
        carAnim.start({
          x: 0,
          transition: { duration: 2, ease: [0.22, 1, 0.36, 1] },
        }),
        wheelAnim.start({
          rotate: -720,
          transition: { duration: 2, ease: 'linear' },
        }),
      ]);

      // Small bounce on park
      await carAnim.start({
        x: [0, 12, -5, 2, 0],
        transition: { duration: 0.5, ease: 'easeOut' },
      });

      // Headlights pulse to signal parked
      lightsAnim.start({
        opacity: [0.6, 1, 0.8, 1],
        transition: { duration: 0.6, ease: 'easeInOut' },
      });
    }

    const t = setTimeout(run, 600);
    return () => clearTimeout(t);
  }, [carAnim, wheelAnim, lightsAnim]);

  return (
    <motion.div
      className="w-[82%] max-w-[560px] opacity-100 pointer-events-none select-none"
      animate={carAnim}
    >
      <svg viewBox="0 0 520 210" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Body gradient — navy brand */}
          <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#0d4f82" />
            <stop offset="100%" stopColor="#062540" />
          </linearGradient>

          {/* Headlight glow — bright white */}
          <radialGradient id="headGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>

          {/* Wheel arch mask to cut arches out of body */}
          <mask id="bodyMask">
            <rect x="0" y="0" width="520" height="210" fill="white" />
            <circle cx="125" cy="162" r="36" fill="black" />
            <circle cx="380" cy="162" r="36" fill="black" />
          </mask>
        </defs>

        {/* ── Ground shadow ─────────────────────── */}
        <ellipse cx="252" cy="205" rx="230" ry="10" fill="#0A3E66" opacity="0.12" />

        {/* ── Main body ─────────────────────────── */}
        <path
          d="
            M 24,150
            L 20,122
            Q 30,95  62,82
            L 98,68
            Q 118,44 162,36
            L 324,34
            Q 366,34 394,58
            L 422,82
            Q 448,102 458,126
            L 460,150
            Z
          "
          fill="url(#bodyGrad)"
          stroke="#c8d0dc"
          strokeWidth="1.5"
          mask="url(#bodyMask)"
        />

        {/* ── Cabin / glass area ────────────────── */}
        <path
          d="
            M 108,80
            Q 128,46 166,38
            L 322,36
            Q 360,36 388,60
            L 406,80
            Z
          "
          fill="#041525"
          stroke="#c8d0dc"
          strokeWidth="1.2"
          opacity="0.95"
        />

        {/* Windshield reflection streak */}
        <path
          d="M 148,72 Q 178,48 210,40 L 220,38 Q 186,46 156,70 Z"
          fill="white"
          opacity="0.05"
        />

        {/* B-pillar */}
        <line
          x1="248" y1="36" x2="248" y2="80"
          stroke="#c8d0dc" strokeWidth="1.5" opacity="0.4"
        />

        {/* ── Door panel line ───────────────────── */}
        <path
          d="M 68,84 Q 124,94 248,90 Q 370,86 415,82"
          stroke="#c8d0dc" strokeWidth="0.8" opacity="0.2" fill="none"
          strokeDasharray="4 4"
        />

        {/* ── Roof rail detail ──────────────────── */}
        <line
          x1="162" y1="36" x2="322" y2="34"
          stroke="#c8d0dc" strokeWidth="1" opacity="0.35"
        />

        {/* ── Headlight cluster (front = left side) */}
        <motion.g animate={lightsAnim} initial={{ opacity: 0.7 }}>
          {/* Glow halo */}
          <ellipse cx="14" cy="108" rx="28" ry="14" fill="url(#headGlow)" opacity="0.5" />
          {/* Main headlight — bright white */}
          <rect x="20" y="100" width="24" height="12" rx="4" fill="#ffffff" opacity="0.95" />
          {/* DRL strip */}
          <rect x="20" y="116" width="18" height="3" rx="1.5" fill="#ffffff" opacity="0.5" />
        </motion.g>

        {/* ── Taillight cluster (rear = right side) */}
        <rect x="446" y="98" width="18" height="18" rx="3" fill="#9b1b1b" opacity="0.95" />
        <rect x="448" y="101" width="10" height="5" rx="1.5" fill="#e74c3c" opacity="0.8" />
        <rect x="448" y="109" width="10" height="3" rx="1" fill="#c0392b" opacity="0.6" />

        {/* ── Bumper details ────────────────────── */}
        <path d="M 22,126 Q 36,118 60,116" stroke="#c8d0dc" strokeWidth="1" opacity="0.3" fill="none" />
        <path d="M 445,116 Q 458,118 462,126" stroke="#c8d0dc" strokeWidth="1" opacity="0.3" fill="none" />

        {/* ── Front skid plate ─────────────────── */}
        <rect x="22" y="138" width="30" height="8" rx="2" fill="#c8d0dc" opacity="0.15" />
        <rect x="448" y="138" width="14" height="8" rx="2" fill="#9b1b1b" opacity="0.3" />

        {/* ── Wheels (with spinning rims) ───────── */}
        <Wheel cx={125} cy={162} wheelAnim={wheelAnim} />
        <Wheel cx={380} cy={162} wheelAnim={wheelAnim} />
      </svg>
    </motion.div>
  );
}
