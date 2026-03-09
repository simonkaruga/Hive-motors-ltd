import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Calendar, ArrowLeft, Tag } from 'lucide-react';
import { PortableText } from '@portabletext/react';
import { client, urlFor } from '@/lib/sanity/client';
import { postBySlugQuery } from '@/lib/sanity/queries';
import { formatDate } from '@/lib/utils';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await client.fetch(postBySlugQuery, { slug: params.slug });
  if (!post) return { title: 'Post Not Found' };
  return {
    title: `${post.title} | Hive Motors Blog`,
    description: post.excerpt || `Read ${post.title} — expert car tips from Hive Motors Kenya.`,
    openGraph: {
      title: post.title,
      images: post.coverImage ? [{ url: urlFor(post.coverImage).width(1200).height(630).url() }] : [],
    },
  };
}

const categoryLabels: Record<string, string> = {
  'buying-tips': 'Buying Tips',
  'import-process': 'Import Process',
  'car-maintenance': 'Car Maintenance',
};

const portableTextComponents = {
  block: {
    h2: ({ children }: any) => <h2 className="text-2xl font-display text-navy-brand mt-8 mb-4">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-xl font-bold text-navy-brand mt-6 mb-3">{children}</h3>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-red-brand pl-6 my-6 italic text-charcoal bg-blue-tint rounded-r-xl py-4 pr-4">
        {children}
      </blockquote>
    ),
    normal: ({ children }: any) => <p className="text-charcoal leading-relaxed mb-4">{children}</p>,
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-bold text-navy-brand">{children}</strong>,
    em: ({ children }: any) => <em className="italic">{children}</em>,
    link: ({ children, value }: any) => (
      <a href={value.href} className="text-red-brand hover:text-red-dark underline" target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc list-inside mb-4 space-y-2 text-charcoal">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal list-inside mb-4 space-y-2 text-charcoal">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: any) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }: any) => <li className="leading-relaxed">{children}</li>,
  },
};

export default async function BlogPostPage({ params }: Props) {
  const post = await client.fetch(postBySlugQuery, { slug: params.slug });

  if (!post) notFound();

  const coverImageUrl = post.coverImage
    ? urlFor(post.coverImage).width(1200).height(630).auto('format').url()
    : null;

  return (
    <main className="bg-white min-h-screen">

      {/* Cover Image */}
      {coverImageUrl && (
        <div className="relative h-72 md:h-96 w-full">
          <Image
            src={coverImageUrl}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-brand/60 to-transparent" />
        </div>
      )}

      <article className={`max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 ${coverImageUrl ? 'pt-8' : 'pt-32'} pb-20`}>

        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-mid-grey hover:text-navy-brand transition-colors text-sm mb-8"
        >
          <ArrowLeft size={16} />
          Back to Blog
        </Link>

        {/* Category */}
        <div className="flex items-center gap-2 mb-4">
          <span className="bg-red-brand text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
            {categoryLabels[post.category] || post.category}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-display text-navy-brand mb-6 leading-tight">
          {post.title}
        </h1>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-mid-grey mb-8 pb-8 border-b border-gray-200">
          <span className="flex items-center gap-1.5">
            <Calendar size={15} />
            {formatDate(post.publishedAt)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={15} />
            {post.readTime} min read
          </span>
        </div>

        {/* Body */}
        <div className="prose-sm sm:prose max-w-none">
          {post.body ? (
            <PortableText value={post.body} components={portableTextComponents} />
          ) : (
            <p className="text-mid-grey">No content available for this post yet.</p>
          )}
        </div>

        {/* Footer Nav */}
        <div className="mt-16 pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-navy-brand font-semibold hover:text-red-brand transition-colors"
          >
            <ArrowLeft size={16} />
            All Blog Posts
          </Link>

          <a
            href="https://wa.me/254722800436?text=Hi%20Hive%20Motors!%20I%20have%20a%20question%20about%20a%20car."
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-mid-grey hover:text-navy-brand transition-colors"
          >
            Have questions? WhatsApp us →
          </a>
        </div>
      </article>
    </main>
  );
}
