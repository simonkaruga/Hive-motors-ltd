import React from 'react';
import Image from 'next/image';

type LogoProps = { className?: string };

export const ToyotaLogo = ({ className }: LogoProps) => (
  <Image src="/logos/toyota.jpg" alt="Toyota" width={80} height={48} className={className} style={{ objectFit: 'contain' }} />
);
export const NissanLogo = ({ className }: LogoProps) => (
  <Image src="/logos/nissan.webp" alt="Nissan" width={80} height={48} className={className} style={{ objectFit: 'contain' }} />
);
export const HondaLogo = ({ className }: LogoProps) => (
  <Image src="/logos/honda.webp" alt="Honda" width={80} height={48} className={className} style={{ objectFit: 'contain' }} />
);
export const SubaruLogo = ({ className }: LogoProps) => (
  <Image src="/logos/subaru.svg" alt="Subaru" width={80} height={48} className={className} style={{ objectFit: 'contain' }} />
);
export const LandRoverLogo = ({ className }: LogoProps) => (
  <Image src="/logos/landrover.png" alt="Land Rover" width={80} height={48} className={className} style={{ objectFit: 'contain' }} />
);
export const BMWLogo = ({ className }: LogoProps) => (
  <Image src="/logos/bmw.png" alt="BMW" width={80} height={48} className={className} style={{ objectFit: 'contain' }} />
);
export const MercedesLogo = ({ className }: LogoProps) => (
  <Image src="/logos/mercedes.png" alt="Mercedes-Benz" width={80} height={48} className={className} style={{ objectFit: 'contain' }} />
);
export const MazdaLogo = ({ className }: LogoProps) => (
  <Image src="/logos/mazda.png" alt="Mazda" width={80} height={48} className={className} style={{ objectFit: 'contain' }} />
);
export const MitsubishiLogo = ({ className }: LogoProps) => (
  <Image src="/logos/mitsubishi.png" alt="Mitsubishi" width={80} height={48} className={className} style={{ objectFit: 'contain' }} />
);
export const LexusLogo = ({ className }: LogoProps) => (
  <Image src="/logos/lexus.webp" alt="Lexus" width={80} height={48} className={className} style={{ objectFit: 'contain' }} />
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
