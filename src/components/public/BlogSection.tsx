import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { BlogPost } from '../../types';
import { Calendar, Clock, ArrowRight, X, User } from 'lucide-react';

interface BlogSectionProps {
  selectedSlug?: string | null;
  onSelectBlog?: (slug: string | null) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({
  selectedSlug,
  onSelectBlog,
}) => {
  const { blogPosts } = useCms();
  const [internalSelected, setInternalSelected] = useState<BlogPost | null>(null);

  const publishedPosts = blogPosts.filter((b) => b.isPublished);

  const activeModalPost =
    internalSelected ||
    (selectedSlug ? blogPosts.find((b) => b.slug === selectedSlug) : null);

  if (publishedPosts.length === 0) {
    return null;
  }

  return (
    <section id="blog" className="py-24 bg-[#FAF7F1] border-t border-[#EAE2D0]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold text-[#926E28] tracking-wider uppercase mb-3 block">
              Engineering Journal
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#191C1E]">
              Perspectives & System Insights.
            </h2>
          </div>
          <p className="text-sm text-[#5C6169] max-w-sm">
            Deep dives into modern web architecture, student leadership, and production-grade engineering philosophies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {publishedPosts.map((post) => (
            <article
              key={post.id}
              className="group bg-[#FFFFFF] rounded-3xl border border-[#E6DECE] hover:border-[#C59A4E]/60 overflow-hidden transition-all duration-300 shadow-xs hover:shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/9] overflow-hidden bg-[#F4EBD9]/40 border-b border-[#F0E8D9]">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-[11px] font-medium px-3 py-1 rounded-full">
                    {post.category}
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  {/* Unboxed metadata line with dot separators */}
                  <div className="flex items-center gap-2 text-xs text-[#6B7280] mb-3">
                    <span>{post.publishDate}</span>
                    <span aria-hidden="true">·</span>
                    <span>{post.readTime}</span>
                    <span aria-hidden="true">·</span>
                    <span>{post.author}</span>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#191C1E] mb-3 group-hover:text-[#926E28] transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-sm text-[#4A4E54] leading-relaxed line-clamp-3 font-normal">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 sm:px-8 py-4 bg-[#FAF8F5] border-t border-[#F0E8D9] flex items-center justify-between">
                <button
                  onClick={() => {
                    if (onSelectBlog) onSelectBlog(post.slug);
                    else setInternalSelected(post);
                  }}
                  className="text-xs font-semibold text-[#191C1E] group-hover:text-[#926E28] transition-colors flex items-center gap-1.5 focus:outline-none"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="flex items-center gap-2 text-[11px] text-[#8C929C]">
                  {post.tags.slice(0, 2).map((tag, idx) => (
                    <span key={idx}>#{tag}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Article Detail Modal */}
      {activeModalPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#FAF8F5] rounded-2xl border border-[#E6DECE] max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => {
                setInternalSelected(null);
                if (onSelectBlog) onSelectBlog(null);
              }}
              className="absolute top-4 right-4 p-2 text-[#656A72] hover:text-[#191C1E] rounded-lg hover:bg-[#F0E8D9] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4">
              <div className="flex items-center gap-2 text-xs text-[#806429] font-medium mb-2">
                <span>{activeModalPost.category}</span>
                <span>·</span>
                <span>{activeModalPost.publishDate}</span>
                <span>·</span>
                <span>{activeModalPost.readTime}</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#191C1E] leading-tight">
                {activeModalPost.title}
              </h3>
              <p className="text-xs text-[#6B7280] mt-2">By {activeModalPost.author}</p>
            </div>

            <div className="aspect-[16/9] rounded-xl overflow-hidden mb-6 border border-[#E6DECE]">
              <img
                src={activeModalPost.coverImage}
                alt={activeModalPost.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-sm sm:text-base text-[#373A40] leading-relaxed space-y-4 whitespace-pre-line font-normal mb-8">
              {activeModalPost.content}
            </div>

            <div className="pt-4 border-t border-[#EAE2D0] flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {activeModalPost.tags.map((t, idx) => (
                  <span key={idx} className="text-xs text-[#806429] bg-[#FAF6EE] px-2.5 py-1 rounded-md border border-[#E8DFC9]">
                    #{t}
                  </span>
                ))}
              </div>
              <button
                onClick={() => {
                  setInternalSelected(null);
                  if (onSelectBlog) onSelectBlog(null);
                }}
                className="px-4 py-2 text-xs font-semibold bg-[#191C1E] text-white rounded-lg hover:bg-[#2B2F34] transition-colors"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
