import Link from 'next/link';
import Image from 'next/image';
import { Clock } from 'lucide-react';
import { urlFor } from '@/lib/sanity/client';

interface SanityImageAsset {
  _ref?: string;
  _type?: string;
  url?: string;
}

interface BlogCardProps {
  post: {
    _id: string;
    title: string;
    slug: { current: string };
    isFeatured?: boolean;
    coverImage?: { asset: SanityImageAsset; alt?: string };
    category: string;
    tags?: string[];
    authorName?: string;
    authorPhoto?: { asset: SanityImageAsset };
    excerpt?: string;
    publishedAt: string;
    readTime: number;
  };
}

const categoryLabels: Record<string, string> = {
  'buying-tips': 'Buying Tips',
  'import-process': 'Import Process',
  'car-maintenance': 'Car Maintenance',
};

export default function BlogCard({ post }: BlogCardProps) {
  const coverImageUrl = post.coverImage
    ? (post.coverImage.asset?.url || urlFor(post.coverImage).width(800).height(400).auto('format').url())
    : null;

  const authorPhotoUrl = post.authorPhoto?.asset
    ? urlFor(post.authorPhoto).width(64).height(64).auto('format').url()
    : null;

  return (
    <Link href={`/blog/${post.slug.current}`}>
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
        {coverImageUrl && (
          <div className="relative h-48 bg-gray-100">
            <Image
              src={coverImageUrl}
              alt={post.coverImage?.alt || post.title}
              fill
              className="object-cover"
            />
            {post.isFeatured && (
              <div className="absolute top-3 left-3 bg-red-brand text-white text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
                Featured
              </div>
            )}
          </div>
        )}
        <div className="p-5 flex flex-col flex-1">
          <span className="inline-block bg-red-brand/10 text-red-brand text-xs font-semibold px-3 py-1 rounded-full mb-3 self-start">
            {categoryLabels[post.category] || post.category}
          </span>
          <h3 className="font-bold text-navy-brand text-lg mb-2 line-clamp-2">
            {post.title}
          </h3>
          {post.excerpt && (
            <p className="text-mid-grey text-sm mb-3 line-clamp-2">{post.excerpt}</p>
          )}

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {post.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="text-xs bg-grey-soft text-mid-grey px-2 py-0.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="mt-auto flex items-center justify-between text-mid-grey text-xs pt-3 border-t border-gray-100">
            {post.authorName ? (
              <div className="flex items-center gap-1.5">
                {authorPhotoUrl && (
                  <div className="relative w-5 h-5 rounded-full overflow-hidden bg-gray-200">
                    <Image src={authorPhotoUrl} alt={post.authorName} fill className="object-cover" />
                  </div>
                )}
                <span className="font-medium text-navy-brand">{post.authorName}</span>
              </div>
            ) : (
              <span />
            )}
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {post.readTime} min
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
