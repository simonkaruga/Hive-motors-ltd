import { client } from '@/lib/sanity/client';

export interface CarDebugInfo {
  _id: string;
  title: string;
  slug: string | null;
  status: string;
  _createdAt: string;
  hasImages: boolean;
  imageCount: number;
}

export async function getAllCarsDebugInfo(): Promise<CarDebugInfo[]> {
  try {
    const cars = await client.fetch(`
      *[_type == "car"] | order(_createdAt desc) {
        _id,
        title,
        "slug": slug.current,
        status,
        _createdAt,
        "hasImages": defined(images) && count(images) > 0,
        "imageCount": count(images)
      }
    `);
    return cars;
  } catch (error) {
    console.error('Error fetching cars debug info:', error);
    return [];
  }
}

export async function validateCarSlugs(): Promise<{
  valid: CarDebugInfo[];
  invalid: CarDebugInfo[];
  duplicates: { slug: string; cars: CarDebugInfo[] }[];
}> {
  const cars = await getAllCarsDebugInfo();
  
  const valid: CarDebugInfo[] = [];
  const invalid: CarDebugInfo[] = [];
  const slugMap = new Map<string, CarDebugInfo[]>();
  
  cars.forEach(car => {
    if (!car.slug || car.slug.trim() === '') {
      invalid.push(car);
    } else {
      valid.push(car);
      
      // Track duplicates
      const existingCars = slugMap.get(car.slug) || [];
      existingCars.push(car);
      slugMap.set(car.slug, existingCars);
    }
  });
  
  const duplicates = Array.from(slugMap.entries())
    .filter(([_, cars]) => cars.length > 1)
    .map(([slug, cars]) => ({ slug, cars }));
  
  return { valid, invalid, duplicates };
}

export async function fixCarSlug(carId: string, newSlug: string): Promise<boolean> {
  try {
    await client
      .patch(carId)
      .set({ 'slug.current': newSlug })
      .commit();
    
    console.log(`Fixed slug for car ${carId}: ${newSlug}`);
    return true;
  } catch (error) {
    console.error(`Error fixing slug for car ${carId}:`, error);
    return false;
  }
}

export async function generateSlugFromTitle(title: string): Promise<string> {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim()
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

export async function autoFixInvalidSlugs(): Promise<{
  fixed: number;
  errors: string[];
}> {
  const { invalid } = await validateCarSlugs();
  let fixed = 0;
  const errors: string[] = [];
  
  for (const car of invalid) {
    try {
      const newSlug = await generateSlugFromTitle(car.title);
      const success = await fixCarSlug(car._id, newSlug);
      
      if (success) {
        fixed++;
        console.log(`Auto-fixed slug for "${car.title}": ${newSlug}`);
      } else {
        errors.push(`Failed to fix slug for "${car.title}"`);
      }
    } catch (error) {
      errors.push(`Error processing "${car.title}": ${error}`);
    }
  }
  
  return { fixed, errors };
}