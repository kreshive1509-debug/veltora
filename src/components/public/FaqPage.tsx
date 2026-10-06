import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { ChevronDown, HelpCircle, Search, Sparkles, MessageSquare } from 'lucide-react';

interface FaqPageProps {
  onNavigateContact?: () => void;
  isHomepageSection?: boolean;
}

export const FaqPage: React.FC<FaqPageProps> = ({ onNavigateContact, isHomepageSection = false }) => {
  const { faqs } = useCms();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    'faq-1': true,
  });
  const [searchQuery, setSearchQuery] = useState<string>('');

  const enabledFaqs = faqs.filter((f) => f.isEnabled).sort((a, b) => a.displayOrder - b.displayOrder);

  const categories = ['All', ...Array.from(new Set(enabledFaqs.map((f) => f.category)))];

  const filteredFaqs = enabledFaqs.filter((f) => {
    const matchesCategory = activeCategory === 'All' || f.category === activeCategory;
    const matchesSearch =
      searchQuery === '' ||
      f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFaq = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const containerClasses = isHomepageSection
    ? 'py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'
    : 'pt-24 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8';

  return (
    <section id="faq" className={containerClasses}>
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-white border border-[#E6DECE] text-[#B58A3E] shadow-2xs">
          <HelpCircle className="w-3.5 h-3.5" />
          Clear Answers & Transparent Processes
        </span>

        <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#191C1E]">
          Frequently Asked Questions
        </h2>

        <p className="text-xs sm:text-sm text-[#5F6368] leading-relaxed">
          Everything you need to know about partnering with Veltora, our software engineering standards, student fellowships, and delivery models.
        </p>
      </div>

      {/* Category Pills & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#191C1E] text-white shadow-xs'
                  : 'bg-white text-[#5F6368] hover:text-[#191C1E] border border-[#E6DECE]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-[#8C9199] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-[#E6DECE] rounded-xl focus:outline-none focus:border-[#B58A3E]"
          />
        </div>
      </div>

      {/* FAQ Accordion */}
      {filteredFaqs.length === 0 ? (
        <div className="bg-white rounded-3xl border border-[#E6DECE] p-12 text-center">
          <p className="text-xs text-[#5F6368]">No questions found matching your search.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openIds[faq.id];
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-[#E6DECE] overflow-hidden transition-all shadow-2xs hover:border-[#B58A3E]"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <span className="font-display text-sm sm:text-base font-bold text-[#191C1E]">
                    {faq.question}
                  </span>
                  <div
                    className={`w-6 h-6 rounded-full bg-[#FAF8F5] border border-[#E6DECE] flex items-center justify-center text-[#191C1E] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-[#191C1E] text-white border-transparent' : ''
                    }`}
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#5F6368] leading-relaxed border-t border-[#F0E8D9] animate-in fade-in duration-200">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Footer Support CTA */}
      {onNavigateContact && (
        <div className="mt-12 p-6 rounded-3xl bg-white border border-[#E6DECE] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-2xs">
          <div>
            <h3 className="font-display text-sm font-bold text-[#191C1E]">
              Have a question not covered above?
            </h3>
            <p className="text-xs text-[#5F6368] mt-0.5">
              Our engineering leadership will be happy to assist with technical architectures or partnership queries.
            </p>
          </div>
          <button
            onClick={onNavigateContact}
            className="px-5 py-2.5 text-xs font-semibold text-white bg-[#191C1E] hover:bg-[#2B2F34] rounded-xl transition-all shadow-xs flex items-center gap-1.5 shrink-0 cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#C59A4E]" />
            <span>Contact Us Directly</span>
          </button>
        </div>
      )}
    </section>
  );
};
