export interface SanityImage {
  _type?: string;
  asset: {
    _ref?: string;
    _type?: string;
    url?: string;
  };
  alt?: string;
}

export interface PortableTextBlock {
  _type: 'block';
  children: { _type: 'span'; text: string; marks?: string[] }[];
  style?: string;
  markDefs?: { _key: string; _type: string; href?: string }[];
}

export interface Car {
  _id: string;
  title: string;
  slug: { current: string };
  status: 'available' | 'sold' | 'on-transit';
  images: SanityImage[];
  price: number;
  year: number;
  make: string;
  model: string;
  bodyType: 'suv' | 'sedan' | 'hatchback' | 'pickup' | 'van' | 'coupe';
  mileage: number;
  engine?: string;
  transmission: 'automatic' | 'manual';
  fuelType: 'petrol' | 'diesel' | 'hybrid' | 'electric';
  driveType?: '4wd' | '2wd' | 'awd';
  colour?: string;
  description?: PortableTextBlock[];
  features?: string[];
  isFeatured?: boolean;
  expectedArrival?: string;
  _createdAt: string;
}

export interface Testimonial {
  _id: string;
  customerName: string;
  review: string;
  rating: number;
  carPurchased: string;
  photo?: SanityImage;
  date: string;
}

export interface SiteSettings {
  businessPhone: string;
  whatsappNumber: string;
  email: string;
  address: string;
  googleMapsUrl: string;
  socialLinks: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
    youtube?: string;
  };
  heroHeadline: string;
  heroSubheadline: string;
}
