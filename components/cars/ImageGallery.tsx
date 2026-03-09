'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageGalleryProps {
  images: any[];
  title: string;
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const nextImage = () => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <div className="space-y-16">
        <motion.div
          whileHover={{ scale: 1.02 }}
          onClick={() => setLightboxOpen(true)}
          className="relative h-96 md:h-[500px] rounded-lg overflow-hidden cursor-pointer"
        >
          {images[selectedIndex] && (
            <Image
              src={images[selectedIndex]}
              alt={`${title} - Image ${selectedIndex + 1}`}
              fill
              className="object-cover"
            />
          )}
        </motion.div>

        <div className="grid grid-cols-4 gap-12">
          {images.map((image, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedIndex(index)}
              className={`relative h-80 rounded-lg overflow-hidden cursor-pointer border-2 transition-colors ${
                selectedIndex === index ? 'border-gold' : 'border-transparent'
              }`}
            >
              <Image
                src={image}
                alt={`${title} thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-midnight/95 z-50 flex items-center justify-center p-16"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-24 right-24 text-cloud hover:text-gold transition-colors"
            >
              <X size={32} />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-24 text-cloud hover:text-gold transition-colors"
            >
              <ChevronLeft size={48} />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-24 text-cloud hover:text-gold transition-colors"
            >
              <ChevronRight size={48} />
            </button>

            <div className="relative w-full max-w-5xl h-[80vh]" onClick={(e) => e.stopPropagation()}>
              <Image
                src={images[selectedIndex]}
                alt={`${title} - Image ${selectedIndex + 1}`}
                fill
                className="object-contain"
              />
            </div>

            <div className="absolute bottom-24 text-cloud">
              {selectedIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
