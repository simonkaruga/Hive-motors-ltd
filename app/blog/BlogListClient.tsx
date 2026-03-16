'use client';

import { useState } from 'react';
import RevealOnScroll from '@/components/shared/RevealOnScroll';
import BlogCard from '@/components/blog/BlogCard';

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

const CATEGORIES = [
  { value: 'all', label: 'All Posts' },
  { value: 'buying-tips', label: 'Buying Tips' },
  { value: 'import-process', label: 'Import Process' },
  { value: 'car-maintenance', label: 'Car Maintenance' },
];

export default function BlogListClient({ posts }: { posts: Post[] }) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filtered = selectedCategory === 'all'
    ? posts
    : posts.filter(p => p.category === selectedCategory);

  return (
    <>
      <RevealOnScroll>
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${
                selectedCategory === cat.value
                  ? 'bg-red-brand text-white'
                  : 'bg-grey-soft text-navy-brand border border-gray-200 hover:border-navy-brand'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </RevealOnScroll>

      {filtered.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-4xl mb-4">📝</p>
          <p className="text-2xl font-bold text-navy-brand mb-2">No posts found</p>
          <p className="text-mid-grey">Check back soon for new content!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post, i) => (
            <RevealOnScroll key={post._id} delay={(i % 3) * 0.07}>
              <BlogCard post={post} />
            </RevealOnScroll>
          ))}
        </div>
      )}
    </>
  );
}
