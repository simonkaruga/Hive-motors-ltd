import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Clock, Calendar, ArrowLeft } from 'lucide-react';
import { client } from '@/lib/sanity/client';
import { postBySlugQuery } from '@/lib/sanity/queries';
import { formatDate } from '@/lib/utils';

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await client.fetch(postBySlugQuery, { slug: params.slug });

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen pt-96 pb-64">
      <article className="max-w-4xl mx-auto px-16">
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-8 text-steel hover:text-gold transition-colors mb-32"
        >
          <ArrowLeft size={20} />
          Back to Blog
        </Link>

        <div className="text-xs text-gold uppercase mb-16 font-medium">
          {post.category.replace('-', ' ')}
        </div>

        <h1 className="text-4xl md:text-5xl font-display text-gold mb-24">
          {post.title}
        </h1>

        <div className="flex items-center gap-24 text-steel mb-48 pb-32 border-b border-gold/20">
          <div className="flex items-center gap-8">
            <Calendar size={18} />
            {formatDate(post.publishedAt)}
          </div>
          <div className="flex items-center gap-8">
            <Clock size={18} />
            {post.readTime} min read
          </div>
        </div>

        <div className="prose prose-invert prose-gold max-w-none">
          <div className="text-cloud leading-relaxed space-y-24">
            {post.body && (
              <div>
                {/* Render Portable Text content here */}
                <p className="text-lg">
                  Blog content will be rendered here using Portable Text renderer.
                  Install @portabletext/react for full rich text support.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-64 pt-32 border-t border-gold/20">
          <Link 
            href="/blog"
            className="inline-flex items-center gap-8 text-gold hover:text-gold/80 transition-colors"
          >
            <ArrowLeft size={20} />
            View All Posts
          </Link>
        </div>
      </article>
    </main>
  );
}
