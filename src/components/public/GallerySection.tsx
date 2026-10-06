import React from 'react';
import { useCms } from '../../context/CmsContext';
import { ArrowRight, Image as ImageIcon, Calendar } from 'lucide-react';

interface GallerySectionProps {
  onViewGallery: () => void;
  onSelectAlbum: (slug: string) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({
  onViewGallery,
  onSelectAlbum,
}) => {
  const { galleryAlbums, galleryImages } = useCms();

  const activeAlbums = galleryAlbums
    .filter((a) => a.isActive && a.isFeatured)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  if (activeAlbums.length === 0) {
    return null;
  }

  return (
    <section id="gallery" className="py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold text-[#926E28] tracking-wider uppercase mb-3 block">
              Inside Veltora
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#191C1E] leading-tight">
              Life, Sprints & Engineering Milestones.
            </h2>
            <p className="text-sm sm:text-base text-[#595E66] mt-3">
              Glimpses into our student developer fellowships, architecture hackathons, partner summits, and technical workshops.
            </p>
          </div>

          <div>
            <button
              onClick={onViewGallery}
              className="px-5 py-2.5 text-xs font-semibold text-[#191C1E] bg-white border border-[#E6DECE] hover:border-[#C59A4E] rounded-xl transition-all shadow-xs flex items-center gap-2 group whitespace-nowrap"
            >
              <span>Explore Full Gallery ({galleryAlbums.filter((a) => a.isActive).length} Albums)</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C59A4E] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Gallery Albums Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activeAlbums.slice(0, 3).map((album) => {
            const albumImageCount = galleryImages.filter((img) => img.albumId === album.id).length;

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
                      <span>{albumImageCount} Photos</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <span className="text-[11px] text-[#6B7280] flex items-center gap-1 mb-2">
                      <Calendar className="w-3 h-3 text-[#B58A3E]" />
                      <span>{album.eventDate}</span>
                    </span>
                    <h3 className="font-display text-xl font-bold text-[#191C1E] mb-2 group-hover:text-[#926E28] transition-colors">
                      {album.title}
                    </h3>
                    <p className="text-xs text-[#52575E] leading-relaxed line-clamp-2">
                      {album.description}
                    </p>
                  </div>
                </div>

                <div className="px-6 py-3.5 bg-[#FAF8F5] border-t border-[#F0E8D9] flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#191C1E] group-hover:text-[#926E28] transition-colors flex items-center gap-1">
                    <span>View Album</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C59A4E]" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
