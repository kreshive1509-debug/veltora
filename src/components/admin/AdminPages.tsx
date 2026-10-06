import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { CustomPage } from '../../types';
import { Plus, Edit2, Trash2, FileText, ExternalLink, X, Save, AlertCircle } from 'lucide-react';

const RESERVED_SLUGS = [
  'admin',
  'services',
  'projects',
  'partners',
  'gallery',
  'team',
  'leadership',
  'contact',
  'careers',
  'faq',
  'privacy-policy',
  'terms-and-conditions',
  'cookie-policy',
  'blog',
  'testimonials',
  'programs',
];

export const AdminPages: React.FC = () => {
  const { customPages, addCustomPage, updateCustomPage, deleteCustomPage } = useCms();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<Omit<CustomPage, 'id' | 'updatedAt'>>({
    title: '',
    slug: '',
    content: '',
    featuredImage: '',
    seoTitle: '',
    seoDescription: '',
    isPublished: true,
    showInNav: false,
    displayOrder: 1,
  });

  const handleOpenAdd = () => {
    setError(null);
    setEditingId(null);
    setFormData({
      title: '',
      slug: '',
      content: '### New Page Section\n\nEnter page details here...',
      featuredImage: '',
      seoTitle: '',
      seoDescription: '',
      isPublished: true,
      showInNav: false,
      displayOrder: customPages.length + 1,
    });
    setShowModal(true);
  };

  const handleOpenEdit = (page: CustomPage) => {
    setError(null);
    setEditingId(page.id);
    setFormData({
      title: page.title,
      slug: page.slug,
      content: page.content,
      featuredImage: page.featuredImage || '',
      seoTitle: page.seoTitle || '',
      seoDescription: page.seoDescription || '',
      isPublished: page.isPublished,
      showInNav: page.showInNav,
      displayOrder: page.displayOrder,
    });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanSlug = formData.slug.toLowerCase().trim().replace(/[^a-z0-9-]/g, '-');

    if (RESERVED_SLUGS.includes(cleanSlug)) {
      setError(`"${cleanSlug}" is a reserved system route. Please choose a different slug.`);
      return;
    }

    if (editingId) {
      updateCustomPage(editingId, { ...formData, slug: cleanSlug });
    } else {
      addCustomPage({ ...formData, slug: cleanSlug });
    }
    setShowModal(false);
    setEditingId(null);
  };

  return (
    <div className="space-y-6 max-w-5xl pb-16">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-[#E6DECE] p-6 lg:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#B58A3E] block mb-1">
            Custom Page Builder
          </span>
          <h1 className="font-display text-2xl lg:text-3xl font-bold text-[#191C1E]">
            Dynamic Pages CMS
          </h1>
          <p className="text-xs text-[#5F6368] mt-1">
            Build custom editorial pages accessible via clean dynamic URLs (e.g. /company-profile).
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 text-xs font-semibold text-white bg-[#191C1E] hover:bg-[#2B2F34] rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-[#C59A4E]" />
          <span>Create New Page</span>
        </button>
      </div>

      {/* Pages List */}
      <div className="bg-white rounded-3xl border border-[#E6DECE] overflow-hidden shadow-xs">
        <div className="divide-y divide-[#F0E8D9]">
          {customPages.map((page) => (
            <div key={page.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#FAF8F5]/50 transition-colors">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] text-[#B58A3E] font-semibold bg-[#FAF8F5] px-2 py-0.5 rounded border border-[#E6DECE]">
                    /{page.slug}
                  </span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${page.isPublished ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                    {page.isPublished ? 'Published' : 'Draft'}
                  </span>
                </div>
                <h3 className="font-display text-base font-bold text-[#191C1E]">
                  {page.title}
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={`/${page.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-[#5F6368] hover:text-[#191C1E] hover:bg-[#FAF8F5] rounded-lg transition-colors"
                  title="View Live Page"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
                <button
                  onClick={() => handleOpenEdit(page)}
                  className="p-2 text-[#5F6368] hover:text-[#191C1E] hover:bg-[#FAF8F5] rounded-lg transition-colors cursor-pointer"
                  title="Edit Page"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    if (confirm('Delete this custom page?')) deleteCustomPage(page.id);
                  }}
                  className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                  title="Delete Page"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#E6DECE] max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#F0E8D9] pb-4">
              <h3 className="font-display text-lg font-bold text-[#191C1E]">
                {editingId ? 'Edit Page' : 'Create Custom Page'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 text-[#8C9199] hover:text-[#191C1E] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#191C1E] mb-1.5">
                    Page Title
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        title: e.target.value,
                        slug: formData.slug || e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '-'),
                      })
                    }
                    className="w-full px-3.5 py-2.5 text-xs text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-xl focus:outline-none focus:border-[#B58A3E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#191C1E] mb-1.5">
                    URL Slug (e.g. company-profile)
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs font-mono text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-xl focus:outline-none focus:border-[#B58A3E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#191C1E] mb-1.5">
                  Page Content (Markdown)
                </label>
                <textarea
                  rows={8}
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-4 py-3 text-xs font-mono text-[#191C1E] bg-[#FAF8F5] border border-[#E6DECE] rounded-xl focus:outline-none focus:border-[#B58A3E] leading-relaxed resize-y"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs font-medium text-[#191C1E] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                    className="accent-[#B58A3E]"
                  />
                  <span>Published</span>
                </label>
              </div>

              <div className="pt-4 border-t border-[#F0E8D9] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-[#5F6368] hover:text-[#191C1E] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-[#191C1E] hover:bg-[#2B2F34] rounded-xl transition-all shadow-md cursor-pointer"
                >
                  {editingId ? 'Save Changes' : 'Create Page'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
