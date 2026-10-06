import React from 'react';
import { useCms } from '../../context/CmsContext';
import { Star, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const { testimonials } = useCms();

  const activeTestimonials = testimonials
    .filter((t) => t.isActive && t.isFeatured)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  if (activeTestimonials.length === 0) {
    return null;
  }

  return (
    <section id="testimonials" className="py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16 text-center sm:text-left">
          <span className="text-xs font-semibold text-[#926E28] tracking-wider uppercase mb-3 block">
            Endorsements
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#191C1E]">
            Client & Fellow Perspectives.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activeTestimonials.map((test) => (
            <div
              key={test.id}
              className="bg-[#FFFFFF] rounded-2xl border border-[#E6DECE] p-7 transition-all duration-300 shadow-xs hover:shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-[#B58A3E] mb-4">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>

                <p className="text-sm text-[#4A4E54] leading-relaxed mb-6 italic font-normal">
                  "{test.message}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#F0E8D9]">
                <h4 className="font-display text-sm font-bold text-[#191C1E]">
                  {test.name}
                </h4>
                <p className="text-xs text-[#6B7280]">
                  {test.designation}, <span className="text-[#191C1E] font-medium">{test.organization}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
