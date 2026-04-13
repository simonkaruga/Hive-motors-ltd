'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

const BLUR_PLACEHOLDER = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB2aWV3Qm94PSIwIDAgMSAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNGN0Y4RkEiLz48L3N2Zz4=';

interface GalleryImage { url: string; thumbUrl?: string; alt?: string; }
interface ImageGalleryProps { images: GalleryImage[]; title: string; }

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const nextImage = () => setSelectedIndex(p => (p + 1) % images.length);
  const prevImage = () => setSelectedIndex(p => (p - 1 + images.length) % images.length);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape')      setLightboxOpen(false);
      if (e.key === 'ArrowRight')  nextImage();
      if (e.key === 'ArrowLeft')   prevImage();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightboxOpen, images.length]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = lightboxOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightboxOpen]);

  if (!images || images.length === 0) {
    return (
      <div className="h-96 bg-grey-soft rounded-2xl flex items-center justify-center text-mid-grey">
        <p>No images available</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-3">
        <div
          role="button"
          tabIndex={0}
          aria-label="Open image gallery"
          onClick={() => setLightboxOpen(true)}
          onKeyDown={e => e.key === 'Enter' && setLightboxOpen(true)}
          className="relative h-72 md:h-[420px] rounded-2xl overflow-hidden cursor-zoom-in group border border-gray-200 bg-grey-soft"
        >
          <Image
            src={images[selectedIndex].url}
            alt={images[selectedIndex].alt || title}
            fill
            sizes="(max-width: 1024px) 100vw, 66vw"
            priority
            placeholder="blur"
            blurDataURL={BLUR_PLACEHOLDER}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-brand/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-4 right-4 bg-white/90 text-navy-brand p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            <ZoomIn size={18} />
          </div>
          <div className="absolute bottom-4 left-4 bg-navy-brand/80 text-white text-xs px-3 py-1 rounded-full font-medium">
            {selectedIndex + 1} / {images.length}
          </div>
        </div>

        {images.length > 1 && (
          <div className="grid grid-cols-4 gap-2">
            {images.slice(0, 4).map((image, index) => (
              <div
                key={index}
                role="button"
                tabIndex={0}
                aria-label={`View photo ${index + 1}`}
                onClick={() => setSelectedIndex(index)}
                onKeyDown={e => e.key === 'Enter' && setSelectedIndex(index)}
                className={`relative h-20 rounded-xl overflow-hidden cursor-pointer border-2 transition-all hover:scale-[1.03] ${
                  selectedIndex === index ? 'border-red-brand shadow-md' : 'border-transparent hover:border-gray-300'
                }`}
              >
                <Image src={image.thumbUrl || image.url} alt={image.alt || `${title} photo ${index + 1}`} fill sizes="25vw" placeholder="blur" blurDataURL={BLUR_PLACEHOLDER} className="object-cover" />
              </div>
            ))}
          </div>
        )}
      </div>

      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
          className="fixed inset-0 bg-navy-dark/95 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            aria-label="Close lightbox"
            className="absolute top-6 right-6 text-white/80 hover:text-white bg-white/10 p-2 rounded-full transition-colors"
          >
            <X size={24} />
          </button>

          {images.length > 1 && (
            <>
              <button
                onClick={e => { e.stopPropagation(); prevImage(); }}
                aria-label="Previous image"
                className="absolute left-4 md:left-8 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
              >
                <ChevronLeft size={32} />
              </button>
              <button
                onClick={e => { e.stopPropagation(); nextImage(); }}
                aria-label="Next image"
                className="absolute right-4 md:right-8 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
              >
                <ChevronRight size={32} />
              </button>
            </>
          )}

          <div
            className="relative w-full max-w-5xl max-h-[85vh] aspect-[4/3]"
            onClick={e => e.stopPropagation()}
          >
            <Image src={images[selectedIndex].url} alt={images[selectedIndex].alt || title} fill sizes="100vw" className="object-contain" />
          </div>

          <div className="absolute bottom-6 text-white/70 text-sm font-medium">
            {selectedIndex + 1} / {images.length}
            <span className="ml-3 text-white/40 text-xs hidden sm:inline">← → to navigate · Esc to close</span>
          </div>
        </div>
      )}
    </>
  );
}
