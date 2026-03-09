export const carsQuery = `*[_type == "car" && status == "available"] | order(_createdAt desc) {
  _id,
  title,
  slug,
  status,
  images,
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

export const carBySlugQuery = `*[_type == "car" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  status,
  images,
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
  _createdAt
}`;

export const featuredCarsQuery = `*[_type == "car" && isFeatured == true && status == "available"] | order(_createdAt desc)[0...6]`;

export const transitCarsQuery = `*[_type == "car" && status == "on-transit"] | order(expectedArrival asc)`;

export const testimonialsQuery = `*[_type == "testimonial"] | order(date desc)`;

export const postsQuery = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  coverImage,
  category,
  excerpt,
  publishedAt,
  readTime
}`;

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  coverImage,
  category,
  body,
  publishedAt,
  readTime
}`;
