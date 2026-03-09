import Link from 'next/link';
import Image from 'next/image';
import { Clock } from 'lucide-react';

interface BlogCardProps {
  post: {
    _id: string;
    title: string;
    slug: { current: string };
    coverImage?: any;
    category: string;
    excerpt?: string;
    publishedAt: string;
    readTime: number;
  };
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug.current}`}>
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
        {post.coverImage && (
          <div className="relative h-48 bg-gray-100">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="p-5">
          <span className="inline-block bg-red-brand/10 text-red-brand text-xs font-semibold px-3 py-1 rounded-full mb-3">
            {post.category}
          </span>
          <h3 className="font-bold text-navy-brand text-lg mb-2 line-clamp-2">
            {post.title}
          </h3>
          {post.excerpt && (
            <p className="text-mid-grey text-sm mb-3 line-clamp-2">{post.excerpt}</p>
          )}
          <div className="flex items-center text-mid-grey text-xs">
            <Clock size={14} className="mr-1" />
            <span>{post.readTime} min read</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
