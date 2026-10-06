import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export interface LightboxImage {
  url: string;
  alt?: string;
  caption?: string;
}

interface ImageLightboxProps {
  images: LightboxImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const ImageLightbox: React.FC<ImageLightboxProps> = ({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && currentIndex > 0) onNavigate(currentIndex - 1);
      if (e.key === 'ArrowRight' && currentIndex < images.length - 1) onNavigate(currentIndex + 1);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, images.length, onClose, onNavigate]);

  if (!isOpen || images.length === 0) return null;

  const currentImg = images[currentIndex] || images[0];

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 select-none animate-in fade-in duration-200">
      {/* Top Bar */}
      <div className="flex items-center justify-between text-white max-w-7xl mx-auto w-full">
        <span className="text-xs font-mono text-[#D1D5DB]">
          {currentIndex + 1} / {images.length}
        </span>
        <button
          onClick={onClose}
          className="p-2 text-[#9CA3AF] hover:text-white hover:bg-white/10 rounded-full transition-colors"
          aria-label="Close Lightbox"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Image Stage */}
      <div className="relative flex-1 flex items-center justify-center max-w-6xl mx-auto w-full my-4">
        {currentIndex > 0 && (
          <button
            onClick={() => onNavigate(currentIndex - 1)}
            className="absolute left-2 sm:left-4 z-10 p-3 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors backdrop-blur-sm"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        <div className="max-h-[75vh] max-w-full flex flex-col items-center justify-center">
          <img
            src={currentImg.url}
            alt={currentImg.alt || 'Gallery Preview'}
            referrerPolicy="no-referrer"
            className="max-h-[70vh] max-w-full object-contain rounded-lg shadow-2xl transition-all duration-300"
          />
          {currentImg.caption && (
            <p className="text-xs text-[#FAF8F5] text-center mt-3 max-w-xl bg-black/60 px-4 py-1.5 rounded-full backdrop-blur-xs">
              {currentImg.caption}
            </p>
          )}
        </div>

        {currentIndex < images.length - 1 && (
          <button
            onClick={() => onNavigate(currentIndex + 1)}
            className="absolute right-2 sm:right-4 z-10 p-3 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors backdrop-blur-sm"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Bottom Thumbnail Strip */}
      {images.length > 1 && (
        <div className="flex items-center justify-center gap-2 max-w-4xl mx-auto w-full overflow-x-auto py-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => onNavigate(idx)}
              className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                currentIndex === idx ? 'border-[#C59A4E] scale-105 opacity-100' : 'border-transparent opacity-50 hover:opacity-80'
              }`}
            >
              <img src={img.url} alt="thumbnail" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
