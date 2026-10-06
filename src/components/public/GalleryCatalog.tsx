import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { ImageLightbox, LightboxImage } from './ImageLightbox';
import {
  ArrowLeft,
  Calendar,
  Image as ImageIcon,
  Maximize2,
  Share2,
} from 'lucide-react';

interface GalleryCatalogProps {
  albumSlug?: string | null;
  onNavigateHome: () => void;
  onSelectAlbum: (slug: string) => void;
}

export const GalleryCatalog: React.FC<GalleryCatalogProps> = ({
  albumSlug,
  onNavigateHome,
  onSelectAlbum,
}) => {
  const { galleryAlbums, galleryImages } = useCms();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Lightbox
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const activeAlbums = galleryAlbums.filter((a) => a.isActive);

  // Single Album Detail View (/gallery/:slug)
  if (albumSlug) {
    const album = galleryAlbums.find((a) => a.slug === albumSlug) || galleryAlbums[0];

    if (!album) {
      return (
        <div className="min-h-screen pt-32 pb-20 px-4 text-center max-w-xl mx-auto">
          <h2 className="font-display text-2xl font-bold text-[#191C1E] mb-3">Album Not Found</h2>
          <p className="text-xs text-[#6B7280] mb-6">The requested photo album could not be found.</p>
          <button
            onClick={() => onSelectAlbum('')}
            className="px-4 py-2 text-xs font-semibold bg-[#191C1E] text-white rounded-xl"
          >
            Back to Gallery
          </button>
        </div>
      );
    }

    const currentImages = galleryImages
      .filter((img) => img.albumId === album.id)
      .sort((a, b) => a.displayOrder - b.displayOrder);

    const lightboxImages: LightboxImage[] = [
      { url: album.coverImageUrl, alt: album.title, caption: `${album.title} (Cover Photo)` },
      ...currentImages.map((img) => ({
        url: img.imageUrl,
        alt: img.altText || album.title,
        caption: img.caption || img.altText,
      })),
    ];

    const openLightboxAt = (idx: number) => {
      setLightboxIndex(idx);
      setLightboxOpen(true);
    };

    return (
      <div className="min-h-screen pt-28 pb-24 bg-[#FAF8F5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs text-[#6B7280] mb-8">
            <button
              onClick={() => onSelectAlbum('')}
              className="hover:text-[#191C1E] flex items-center gap-1 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Albums</span>
            </button>
            <span>/</span>
            <span className="text-[#191C1E] font-medium">{album.title}</span>
          </div>

          {/* Album Hero Header */}
          <div className="bg-white rounded-3xl border border-[#E6DECE] p-8 sm:p-10 shadow-xs mb-10">
            <div className="flex flex-wrap items-center gap-3 text-xs text-[#6B7280] mb-3">
              <span className="px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase bg-[#FAF6EE] text-[#806429] border border-[#E8DFC9]">
                {album.category}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1 font-mono text-[#8C929C]">
                <Calendar className="w-3.5 h-3.5 text-[#B58A3E]" />
                {album.eventDate}
              </span>
              <span>·</span>
              <span>{lightboxImages.length} Photographs</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#191C1E] mb-4 leading-tight">
              {album.title}
            </h1>

            <p className="text-sm sm:text-base text-[#4A4E54] leading-relaxed max-w-3xl font-normal whitespace-pre-line">
              {album.description}
            </p>
          </div>

          {/* Album Photo Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {lightboxImages.map((img, idx) => (
              <div
                key={idx}
                onClick={() => openLightboxAt(idx)}
                className="group bg-white rounded-2xl border border-[#E6DECE] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div className="aspect-[4/3] bg-gray-50 overflow-hidden relative">
                  <img
                    src={img.url}
                    alt={img.alt || album.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="p-2 bg-black/60 text-white rounded-full">
                      <Maximize2 className="w-4 h-4" />
                    </span>
                  </div>
                </div>
                {img.caption && (
                  <div className="p-3.5 bg-[#FAF8F5] border-t border-[#F0E8D9]">
                    <p className="text-xs text-[#52575E] leading-normal">{img.caption}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Lightbox Component */}
          <ImageLightbox
            images={lightboxImages}
            currentIndex={lightboxIndex}
            isOpen={lightboxOpen}
            onClose={() => setLightboxOpen(false)}
            onNavigate={setLightboxIndex}
          />
        </div>
      </div>
    );
  }

  // Full Gallery Album Catalog (/gallery)
  const categories = ['All', 'Fellowship & Hackathons', 'Events & Keynotes', 'Workshops & Training'];

  const filteredAlbums = activeAlbums.filter(
    (a) => selectedCategory === 'All' || a.category === selectedCategory
  );

  return (
    <div className="min-h-screen pt-28 pb-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <button
            onClick={onNavigateHome}
            className="text-xs text-[#6B7280] hover:text-[#191C1E] flex items-center gap-1 mb-4 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Homepage</span>
          </button>
          <span className="text-xs font-semibold text-[#926E28] tracking-wider uppercase mb-2 block">
            Inside Veltora
          </span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#191C1E]">
            Official Image Gallery & Albums
          </h1>
          <p className="text-sm sm:text-base text-[#595E66] mt-3">
            Moments from our software engineering cohorts, hackathons, client sprints, and milestone summits.
          </p>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-1.5 p-1 bg-[#FAF6EE] border border-[#E8DFC9] rounded-xl w-fit mb-12 overflow-x-auto max-w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-white text-[#191C1E] shadow-xs'
                  : 'text-[#6B7280] hover:text-[#191C1E]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Albums Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAlbums.map((album) => {
            const count = galleryImages.filter((img) => img.albumId === album.id).length;
            return (
              <div
                key={album.id}
                onClick={() => onSelectAlbum(album.slug)}
                className="group bg-white rounded-3xl border border-[#E6DECE] hover:border-[#C59A4E]/60 overflow-hidden transition-all duration-300 shadow-xs hover:shadow-xl cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#F4EBD9]/40 border-b border-[#F0E8D9]">
                    <img
                      src={album.coverImageUrl}
                      alt={album.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-[11px] font-medium px-3 py-1 rounded-full">
                      {album.category}
                    </div>
                    <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md text-white text-[10px] font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1">
                      <ImageIcon className="w-3 h-3 text-[#C59A4E]" />
                      <span>{count + 1} Photos</span>
                    </div>
                  </div>

                  <div className="p-6 sm:p-7">
                    <span className="text-[11px] text-[#8C929C] flex items-center gap-1 mb-2 font-mono">
                      <Calendar className="w-3 h-3 text-[#B58A3E]" />
                      <span>{album.eventDate}</span>
                    </span>
                    <h3 className="font-display text-xl font-bold text-[#191C1E] mb-2 group-hover:text-[#926E28] transition-colors">
                      {album.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#52575E] leading-relaxed line-clamp-2">
                      {album.description}
                    </p>
                  </div>
                </div>

                <div className="px-6 py-4 bg-[#FAF8F5] border-t border-[#F0E8D9] flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#191C1E] group-hover:text-[#926E28] transition-colors">
                    Explore Album Photos →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
