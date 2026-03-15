// Car image fields helper — ensures full image objects are returned for urlFor()
const imageFields = `"images": images[]{..., asset->}`;

export const carsQuery = `*[_type == "car" && status in ["available", "on-transit"]] | order(_createdAt desc) {
  _id,
  title,
  slug,
  status,
  condition,
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
  expectedArrival,
  _createdAt
}`;

export const carBySlugQuery = `*[_type == "car" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  status,
  condition,
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
  condition,
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
  isFeatured,
  _createdAt
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
  engine,
  transmission,
  fuelType,
  driveType,
  colour,
  expectedArrival,
  _createdAt
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

export const postsQuery = `*[_type == "post"] | order(isFeatured desc, publishedAt desc) {
  _id,
  title,
  slug,
  isFeatured,
  "coverImage": coverImage{..., asset->},
  category,
  tags,
  authorName,
  "authorPhoto": authorPhoto{..., asset->},
  excerpt,
  publishedAt,
  readTime
}`;

// Homepage-limited queries
export const homepageTestimonialsQuery = `*[_type == "testimonial"] | order(date desc)[0...3] {
  _id,
  customerName,
  review,
  rating,
  carPurchased
}`;

export const homepagePostsQuery = `*[_type == "post"] | order(isFeatured desc, publishedAt desc)[0...2] {
  _id,
  title,
  slug,
  isFeatured,
  "coverImage": coverImage{..., asset->},
  category,
  tags,
  authorName,
  excerpt,
  publishedAt,
  readTime
}`;

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  isFeatured,
  "coverImage": coverImage{..., asset->},
  category,
  tags,
  authorName,
  "authorPhoto": authorPhoto{..., asset->},
  excerpt,
  "body": body[]{
    ...,
    _type == "image" => {
      ...,
      asset->
    }
  },
  publishedAt,
  readTime
}`;
