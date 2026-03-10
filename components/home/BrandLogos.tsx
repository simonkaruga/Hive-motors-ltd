// Brand logo components — local images in /public/logos/
// alt="" because brand name is already shown in the label below each card

import React from 'react';

type LogoProps = { className?: string };

export const ToyotaLogo = ({ className }: LogoProps) => (
  <img src="/logos/toyota.jpg" alt="" className={className} />
);

export const NissanLogo = ({ className }: LogoProps) => (
  <img src="/logos/nissan.webp" alt="" className={className} />
);

export const HondaLogo = ({ className }: LogoProps) => (
  <img src="/logos/honda.webp" alt="" className={className} />
);

export const SubaruLogo = ({ className }: LogoProps) => (
  <img src="/logos/subaru.svg" alt="" className={className} />
);

export const LandRoverLogo = ({ className }: LogoProps) => (
  <img src="/logos/landrover.png" alt="" className={className} />
);

export const BMWLogo = ({ className }: LogoProps) => (
  <img src="/logos/bmw.png" alt="" className={className} />
);

export const MercedesLogo = ({ className }: LogoProps) => (
  <img src="/logos/mercedes.png" alt="" className={className} />
);

export const MazdaLogo = ({ className }: LogoProps) => (
  <img src="/logos/mazda.png" alt="" className={className} />
);

export const MitsubishiLogo = ({ className }: LogoProps) => (
  <img src="/logos/mitsubishi.png" alt="" className={className} />
);

export const LexusLogo = ({ className }: LogoProps) => (
  <img src="/logos/lexus.webp" alt="" className={className} />
);

export const BRAND_LOGOS: Record<string, (props: LogoProps) => React.ReactElement> = {
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
