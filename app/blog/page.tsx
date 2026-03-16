import RevealOnScroll from '@/components/shared/RevealOnScroll';
import { client } from '@/lib/sanity/client';
import { postsQuery } from '@/lib/sanity/queries';
import BlogListClient from './BlogListClient';

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  coverImage?: { asset: { _ref?: string; url?: string }; alt?: string };
  category: string;
  excerpt?: string;
  publishedAt: string;
  readTime: number;
}

export default async function BlogPage() {
  let posts: Post[] = [];
  try {
    posts = await client.fetch(postsQuery);
  } catch {
    // fallback to empty
  }

  return (
    <main className="bg-white min-h-screen">
      <section className="pt-32 pb-12 bg-gradient-to-br from-grey-soft to-blue-tint border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div>
              <p className="text-sm text-mid-grey mb-2">
                <a href="/" className="hover:text-red-brand">Home</a>
                {' '}<span className="text-gray-300">›</span>{' '}
                <span className="text-red-brand">Blog</span>
              </p>
              <h1 className="text-4xl md:text-5xl font-display text-navy-brand mb-2">
                Car Tips & Guides
              </h1>
              <p className="text-mid-grey text-lg">
                Expert advice on importing and maintaining Japanese cars in Kenya
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <BlogListClient posts={posts} />
      </div>
    </main>
  );
}
