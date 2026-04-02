import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Calendar, ArrowLeft, Tag } from 'lucide-react';
import { PortableText } from '@portabletext/react';
import { client, urlFor } from '@/lib/sanity/client';
import { postBySlugQuery } from '@/lib/sanity/queries';
import { formatDate } from '@/lib/utils';
import { WHATSAPP_NUMBER } from '@/lib/constants';

export const revalidate = 3600;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await client.fetch<{ slug: string }[]>(
    `*[_type == "post"]{ "slug": slug.current }`
  );
  return slugs.map(({ slug }) => ({ slug }));
}

const BASE_URL = 'https://www.hivemotorsltd.com';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch(postBySlugQuery, { slug });
  if (!post) return { title: 'Post Not Found' };
  const ogImage = post.coverImage ? urlFor(post.coverImage).width(1200).height(630).url() : null;
  const description = post.excerpt || `Read ${post.title} — expert car tips from Hive Motors Kenya.`;
  return {
    title: `${post.title} | Hive Motors Blog`,
    description,
    alternates: { canonical: `${BASE_URL}/blog/${slug}` },
    openGraph: {
      title: post.title,
      description,
      url: `${BASE_URL}/blog/${slug}`,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630, alt: post.title }] : [],
    },
    twitter: { card: 'summary_large_image', title: post.title, description, images: ogImage ? [ogImage] : [] },
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
  types: {
    image: ({ value }: any) => {
      if (!value?.asset) return null;
      const imgUrl = urlFor(value).width(800).auto('format').url();
      return (
        <figure className="my-8">
          <div className="relative w-full rounded-xl overflow-hidden" style={{ aspectRatio: '16/9' }}>
            <Image src={imgUrl} alt={value.alt || ''} fill sizes="(max-width: 768px) 100vw, 768px" className="object-cover" />
          </div>
          {value.caption && (
            <figcaption className="text-center text-xs text-mid-grey mt-2 italic">{value.caption}</figcaption>
          )}
        </figure>
      );
    },
  },
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await client.fetch(postBySlugQuery, { slug });

  if (!post) notFound();

  const coverImageUrl = post.coverImage
    ? urlFor(post.coverImage).width(1200).height(630).auto('format').url()
    : null;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: `${BASE_URL}/blog/${slug}` },
    ],
  };

  const blogPostingJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: coverImageUrl,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: { '@type': 'Person', name: post.authorName || 'Hive Motors' },
    publisher: { '@type': 'Organization', name: 'Hive Motors Ltd', url: 'https://www.hivemotorsltd.com' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://www.hivemotorsltd.com/blog/${slug}` },
    keywords: post.tags?.join(', '),
  };

  return (
    <main className="bg-white min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }} />

      {/* Cover Image */}
      {coverImageUrl && (
        <div className="relative h-72 md:h-96 w-full">
          <Image
            src={coverImageUrl}
            alt={post.title}
            fill
            sizes="100vw"
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
        <div className="flex flex-wrap items-center gap-4 text-sm text-mid-grey mb-6 pb-6 border-b border-gray-200">
          {post.authorName && (
            <span className="flex items-center gap-2">
              {post.authorPhoto?.asset && (
                <div className="relative w-7 h-7 rounded-full overflow-hidden bg-gray-200">
                  <Image
                    src={urlFor(post.authorPhoto).width(56).height(56).auto('format').url()}
                    alt={post.authorName}
                    fill
                    sizes="28px"
                    className="object-cover"
                  />
                </div>
              )}
              <span className="font-medium text-navy-brand">{post.authorName}</span>
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <Calendar size={15} />
            {formatDate(post.publishedAt)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={15} />
            {post.readTime} min read
          </span>
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag: string) => (
              <span key={tag} className="flex items-center gap-1 text-xs bg-grey-soft text-mid-grey px-3 py-1 rounded-full border border-gray-200">
                <Tag size={11} />
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Body */}
        <div className="max-w-none">
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
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20Hive%20Motors!%20I%20have%20a%20question%20about%20a%20car.`}
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
