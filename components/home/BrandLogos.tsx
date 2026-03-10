// Inline SVG brand logos — no external dependencies, always render correctly

type LogoProps = { className?: string };

function starPoints(cx: number, cy: number, outerR: number, innerR: number): string {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const angle = (i * Math.PI) / 5 - Math.PI / 2;
    const r = i % 2 === 0 ? outerR : innerR;
    pts.push(`${(cx + r * Math.cos(angle)).toFixed(2)},${(cy + r * Math.sin(angle)).toFixed(2)}`);
  }
  return pts.join(' ');
}

export const ToyotaLogo = ({ className }: LogoProps) => (
  <img src="/logos/toyota.jpg" alt="Toyota" className={className} />
);

export const NissanLogo = ({ className }: LogoProps) => (
  <img src="/logos/nissan.webp" alt="Nissan" className={className} />
);

export const HondaLogo = ({ className }: LogoProps) => (
  <img src="/logos/honda.webp" alt="Honda" className={className} />
);

export const SubaruLogo = ({ className }: LogoProps) => (
  <img src="/logos/subaru.svg" alt="Subaru" className={className} />
);

export const LandRoverLogo = ({ className }: LogoProps) => (
  <img src="/logos/landrover.png" alt="Land Rover" className={className} />
);

export const BMWLogo = ({ className }: LogoProps) => (
  <img src="/logos/bmw.png" alt="BMW" className={className} />
);

export const MercedesLogo = ({ className }: LogoProps) => (
  <img src="/logos/mercedes.png" alt="Mercedes-Benz" className={className} />
);

export const MazdaLogo = ({ className }: LogoProps) => (
  <img src="/logos/mazda.png" alt="Mazda" className={className} />
);

export const MitsubishiLogo = ({ className }: LogoProps) => (
  <img src="/logos/mitsubishi.png" alt="Mitsubishi" className={className} />
);

export const LexusLogo = ({ className }: LogoProps) => (
  <img src="/logos/lexus.webp" alt="Lexus" className={className} />
);

export const BRAND_LOGOS: Record<string, (props: LogoProps) => JSX.Element> = {
  Toyota: ToyotaLogo,
  Nissan: NissanLogo,
  Honda: HondaLogo,
  Subaru: SubaruLogo,
  'Land Rover': LandRoverLogo,
  BMW: BMWLogo,
  'Mercedes-Benz': MercedesLogo,
  Mazda: MazdaLogo,
  Mitsubishi: MitsubishiLogo,
  Lexus: LexusLogo,
};
