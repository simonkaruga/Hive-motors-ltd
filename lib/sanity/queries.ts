// Car image fields helper — ensures full image objects are returned for urlFor()
const imageFields = `"images": images[]{..., asset->}`;

export const carsQuery = `*[_type == "car" && status in ["available", "on-transit"]] | order(_createdAt desc) {
  _id,
  title,
  slug,
  status,
  ${imageFields},
  price,
  year,
  make,
  model,
  bodyType,
  mileage,
  transmission,
  fuelType,
  isFeatured,
  expectedArrival
}`;

export const carBySlugQuery = `*[_type == "car" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  status,
  ${imageFields},
  price,
  year,
  make,
  model,
  bodyType,
  mileage,
  engine,
  transmission,
  fuelType,
  driveType,
  colour,
  description,
  features,
  expectedArrival,
  _createdAt
}`;

export const featuredCarsQuery = `*[_type == "car" && isFeatured == true && status == "available"] | order(_createdAt desc)[0...6] {
  _id,
  title,
  slug,
  status,
  ${imageFields},
  price,
  year,
  make,
  model,
  bodyType,
  mileage,
  transmission,
  fuelType,
  isFeatured
}`;

export const transitCarsQuery = `*[_type == "car" && status == "on-transit"] | order(expectedArrival asc) {
  _id,
  title,
  slug,
  status,
  ${imageFields},
  price,
  year,
  make,
  model,
  bodyType,
  mileage,
  transmission,
  fuelType,
  expectedArrival
}`;

export const testimonialsQuery = `*[_type == "testimonial"] | order(date desc) {
  _id,
  customerName,
  review,
  rating,
  carPurchased,
  "photo": photo{..., asset->},
  date
}`;

export const postsQuery = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  "coverImage": coverImage{..., asset->},
  category,
  excerpt,
  publishedAt,
  readTime
}`;

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  "coverImage": coverImage{..., asset->},
  category,
  excerpt,
  body,
  publishedAt,
  readTime
}`;
