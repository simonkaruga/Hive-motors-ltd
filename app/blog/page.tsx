'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Clock, Calendar } from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';
import { client } from '@/lib/sanity/client';
import { postsQuery } from '@/lib/sanity/queries';
import { formatDate } from '@/lib/utils';

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  coverImage: any;
  category: string;
  excerpt: string;
  publishedAt: string;
  readTime: number;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  const categories = [
    { value: 'all', label: 'All Posts' },
    { value: 'buying-tips', label: 'Buying Tips' },
    { value: 'import-process', label: 'Import Process' },
    { value: 'car-maintenance', label: 'Car Maintenance' },
  ];

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await client.fetch(postsQuery);
        setPosts(data);
        setFilteredPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter(post => post.category === selectedCategory));
    }
  }, [selectedCategory, posts]);

  return (
    <main className="min-h-screen pt-96 pb-64">
      <div className="max-w-7xl mx-auto px-16">
        <SectionHeader 
          title="Car Buying Tips & Guides" 
          subtitle="Expert advice on importing and maintaining Japanese cars in Kenya"
        />

        <div className="flex flex-wrap gap-12 justify-center mb-48">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-24 py-12 rounded-full transition-colors ${
                selectedCategory === cat.value
                  ? 'bg-gold text-midnight'
                  : 'bg-cloud/5 text-cloud border border-gold/20 hover:border-gold'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center text-steel py-64">
            <div className="animate-spin w-48 h-48 border-4 border-gold border-t-transparent rounded-full mx-auto mb-16" />
            <p>Loading posts...</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-64">
            <p className="text-2xl text-steel">No posts found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-32">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/blog/${post.slug.current}`}>
                  <div className="bg-cloud/5 border border-gold/20 rounded-lg overflow-hidden hover:border-gold transition-colors group">
                    <div className="relative h-64 bg-steel/20">
                      {/* Image placeholder - integrate with Sanity CDN */}
                      <div className="absolute inset-0 flex items-center justify-center text-steel">
                        Cover Image
                      </div>
                    </div>
                    <div className="p-24">
                      <div className="text-xs text-gold uppercase mb-8 font-medium">
                        {post.category.replace('-', ' ')}
                      </div>
                      <h3 className="text-xl font-semibold text-cloud mb-12 group-hover:text-gold transition-colors">
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="text-steel text-sm mb-16 line-clamp-2">{post.excerpt}</p>
                      )}
                      <div className="flex items-center gap-16 text-xs text-steel">
                        <div className="flex items-center gap-4">
                          <Calendar size={14} />
                          {formatDate(post.publishedAt)}
                        </div>
                        <div className="flex items-center gap-4">
                          <Clock size={14} />
                          {post.readTime} min read
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
