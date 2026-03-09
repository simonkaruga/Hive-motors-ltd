export interface Car {
  _id: string;
  title: string;
  slug: { current: string };
  status: 'available' | 'sold' | 'on-transit';
  images: any[];
  price: number;
  year: number;
  make: string;
  model: string;
  bodyType: 'suv' | 'sedan' | 'hatchback' | 'pickup' | 'van' | 'coupe';
  mileage: number;
  engine: string;
  transmission: 'automatic' | 'manual';
  fuelType: 'petrol' | 'diesel' | 'hybrid' | 'electric';
  driveType: '4wd' | '2wd' | 'awd';
  colour: string;
  description: any[];
  features: string[];
  isFeatured: boolean;
  expectedArrival?: string;
  _createdAt: string;
}

export interface Testimonial {
  _id: string;
  customerName: string;
  review: string;
  rating: number;
  carPurchased: string;
  photo?: any;
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
