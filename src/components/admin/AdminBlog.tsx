import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { BlogPost } from '../../types';
import { Plus, Edit2, Trash2, Save, BookOpen } from 'lucide-react';

export const AdminBlog: React.FC = () => {
  const { blogPosts, addBlogPost, updateBlogPost, deleteBlogPost } = useCms();
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;

    if (isCreating) {
      const { id, ...rest } = editingPost;
      addBlogPost(rest);
    } else {
      updateBlogPost(editingPost.id, editingPost);
    }
    setEditingPost(null);
    setIsCreating(false);
  };

  const startCreate = () => {
    setIsCreating(true);
    const today = new Date().toISOString().split('T')[0];
    setEditingPost({
      id: 'temp',
      title: '',
      slug: '',
      author: 'Veltora Engineering Team',
      coverImage: '/src/assets/images/project_saas_platform_1791103524205.jpg',
      excerpt: '',
      content: '',
      category: 'Architecture',
      tags: ['Engineering', 'TypeScript'],
      isPublished: true,
      isFeatured: true,
      publishDate: today,
      readTime: '4 min read',
    });
  };

  return (
    <div className="bg-white rounded-3xl border border-[#E6DECE] p-8 shadow-xs max-w-5xl">
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-[#F0E8D9]">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#926E28] block mb-1">
            Publishing Center
          </span>
          <h1 className="font-display text-2xl font-bold text-[#191C1E]">
            Blog & Engineering Articles CRUD
          </h1>
        </div>
        <button
          onClick={startCreate}
          className="px-4 py-2 text-xs font-semibold text-white bg-[#191C1E] hover:bg-[#2B2F34] rounded-xl transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5 text-[#C59A4E]" />
          <span>Write Article</span>
        </button>
      </div>

      {editingPost ? (
        <form onSubmit={handleSave} className="space-y-4 p-6 bg-[#FAF8F5] rounded-2xl border border-[#E6DECE]">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold text-[#191C1E]">
              {isCreating ? 'Write Article' : `Editing: ${editingPost.title}`}
            </h3>
            <button
              type="button"
              onClick={() => setEditingPost(null)}
              className="text-xs text-[#6B7280]"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1">Article Title</label>
              <input
                type="text"
                required
                value={editingPost.title}
                onChange={(e) => {
                  const val = e.target.value;
                  const slug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                  setEditingPost({ ...editingPost, title: val, slug });
                }}
                className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1">URL Slug</label>
              <input
                type="text"
                required
                value={editingPost.slug}
                onChange={(e) => setEditingPost({ ...editingPost, slug: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1">Author Name</label>
              <input
                type="text"
                required
                value={editingPost.author}
                onChange={(e) => setEditingPost({ ...editingPost, author: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1">Category</label>
              <input
                type="text"
                required
                value={editingPost.category}
                onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1">Read Time</label>
              <input
                type="text"
                value={editingPost.readTime}
                onChange={(e) => setEditingPost({ ...editingPost, readTime: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#191C1E] mb-1">Cover Image URL</label>
            <input
              type="text"
              required
              value={editingPost.coverImage}
              onChange={(e) => setEditingPost({ ...editingPost, coverImage: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#191C1E] mb-1">Short Excerpt</label>
            <input
              type="text"
              required
              value={editingPost.excerpt}
              onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#191C1E] mb-1">Article Content (Rich Markdown formatted)</label>
            <textarea
              rows={6}
              required
              value={editingPost.content}
              onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg font-mono resize-none"
            />
          </div>

          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 text-xs text-[#191C1E] cursor-pointer">
              <input
                type="checkbox"
                checked={editingPost.isPublished}
                onChange={(e) => setEditingPost({ ...editingPost, isPublished: e.target.checked })}
              />
              <span>Is Published</span>
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setEditingPost(null)}
              className="px-4 py-2 text-xs text-[#6B7280]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-[#191C1E] rounded-xl flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5 text-[#C59A4E]" />
              <span>Save Article</span>
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-3">
          {blogPosts.map((b) => (
            <div
              key={b.id}
              className="p-4 bg-[#FAF8F5] border border-[#E6DECE] rounded-2xl flex items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-[#191C1E]">{b.title}</span>
                  <span className="text-[10px] text-[#806429] font-mono">/blog/{b.slug}</span>
                  {!b.isPublished && (
                    <span className="text-[10px] bg-gray-200 text-gray-700 px-1.5 py-0.5 rounded">
                      Draft
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#6B7280] line-clamp-1">{b.excerpt}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setIsCreating(false);
                    setEditingPost(b);
                  }}
                  className="p-1.5 text-[#656A72] hover:text-[#191C1E] rounded-lg hover:bg-white border border-[#E6DECE]"
                  title="Edit"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Delete article ${b.title}?`)) deleteBlogPost(b.id);
                  }}
                  className="p-1.5 text-red-600 hover:text-red-800 rounded-lg hover:bg-white border border-[#E6DECE]"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
