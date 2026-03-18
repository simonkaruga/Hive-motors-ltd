'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { urlFor } from '@/lib/sanity/client';

interface ImageGalleryProps {
  images: any[];
  title: string;
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const nextImage = () => setSelectedIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);

  const getImageUrl = (image: any, width: number, height: number) => {
    return urlFor(image).width(width).height(height).auto('format').quality(80).url();
  };

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
        {/* Main Image */}
        <motion.div
          layoutId={`car-image-${selectedIndex}`}
          onClick={() => setLightboxOpen(true)}
          className="relative h-72 md:h-[420px] rounded-2xl overflow-hidden cursor-zoom-in group border border-gray-200 bg-grey-soft"
        >
          <Image
            src={getImageUrl(images[selectedIndex], 1200, 800)}
            alt={images[selectedIndex]?.alt || title}
            fill
            sizes="(max-width: 1024px) 100vw, 66vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-brand/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-4 right-4 bg-white/90 text-navy-brand p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            <ZoomIn size={18} />
          </div>
          <div className="absolute bottom-4 left-4 bg-navy-brand/80 text-white text-xs px-3 py-1 rounded-full font-medium">
            {selectedIndex + 1} / {images.length}
          </div>
        </motion.div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="grid grid-cols-4 gap-2">
            {images.slice(0, 4).map((image, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03 }}
                onClick={() => setSelectedIndex(index)}
                className={`relative h-20 rounded-xl overflow-hidden cursor-pointer border-2 transition-colors ${
                  selectedIndex === index
                    ? 'border-red-brand shadow-md'
                    : 'border-transparent hover:border-gray-300'
                }`}
              >
                <Image
                  src={getImageUrl(image, 300, 200)}
                  alt={image?.alt || `${title} photo ${index + 1}`}
                  fill
                  sizes="25vw"
                  className="object-cover"
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-navy-dark/95 z-50 flex items-center justify-center p-4"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 text-white/80 hover:text-white bg-white/10 p-2 rounded-full transition-colors"
            >
              <X size={24} />
            </button>

            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  className="absolute left-4 md:left-8 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
                >
                  <ChevronLeft size={32} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  className="absolute right-4 md:right-8 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
                >
                  <ChevronRight size={32} />
                </button>
              </>
            )}

            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-5xl max-h-[85vh] aspect-[4/3]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={getImageUrl(images[selectedIndex], 1600, 1066)}
                alt={images[selectedIndex]?.alt || title}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </motion.div>

            <div className="absolute bottom-6 text-white/70 text-sm font-medium">
              {selectedIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
