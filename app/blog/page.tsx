'use client';

import { useState, useEffect } from 'react';
import RevealOnScroll from '@/components/shared/RevealOnScroll';
import BlogCard from '@/components/blog/BlogCard';
import { client } from '@/lib/sanity/client';
import { postsQuery } from '@/lib/sanity/queries';

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

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await client.fetch(postsQuery);
        setPosts(data);
        setFilteredPosts(data);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  useEffect(() => {
    setFilteredPosts(
      selectedCategory === 'all' ? posts : posts.filter(p => p.category === selectedCategory)
    );
  }, [selectedCategory, posts]);

  return (
    <main className="bg-white min-h-screen">

      {/* Hero */}
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

        {/* Category Filter Tabs */}
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

        {error ? (
          <div className="text-center py-24">
            <p className="text-4xl mb-4">⚠️</p>
            <p className="text-2xl font-bold text-navy-brand mb-2">Failed to load posts</p>
            <p className="text-mid-grey">Please check your connection and try again.</p>
          </div>
        ) : loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-grey-soft rounded-2xl h-64 animate-pulse" />
            ))}
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-4xl mb-4">📝</p>
            <p className="text-2xl font-bold text-navy-brand mb-2">No posts found</p>
            <p className="text-mid-grey">Check back soon for new content!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, i) => (
              <RevealOnScroll key={post._id} delay={(i % 3) * 0.07}>
                <BlogCard post={post} />
              </RevealOnScroll>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
