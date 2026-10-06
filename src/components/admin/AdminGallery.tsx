import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { GalleryAlbum, GalleryImage } from '../../types';
import { uploadImageToImgBB } from '../../lib/imgbb';
import {
  Plus,
  Edit2,
  Trash2,
  Save,
  Image as ImageIcon,
  Upload,
  Calendar,
  Layers,
} from 'lucide-react';

export const AdminGallery: React.FC = () => {
  const {
    galleryAlbums,
    addGalleryAlbum,
    updateGalleryAlbum,
    deleteGalleryAlbum,
    galleryImages,
    addGalleryImage,
    deleteGalleryImage,
  } = useCms();

  const [editingAlbum, setEditingAlbum] = useState<GalleryAlbum | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [newImageCaption, setNewImageCaption] = useState('');

  const currentAlbumId = editingAlbum?.id;
  const currentImages = currentAlbumId
    ? galleryImages.filter((img) => img.albumId === currentAlbumId)
    : [];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAlbum) return;

    if (isCreating) {
      const { id, createdAt, ...rest } = editingAlbum;
      addGalleryAlbum(rest);
    } else {
      updateGalleryAlbum(editingAlbum.id, editingAlbum);
    }
    setEditingAlbum(null);
    setIsCreating(false);
  };

  const startCreate = () => {
    setIsCreating(true);
    const today = new Date().toISOString().split('T')[0];
    setEditingAlbum({
      id: 'temp',
      title: '',
      slug: '',
      description: '',
      coverImageUrl: '/src/assets/images/gallery_fellowship_team_1791104287245.jpg',
      category: 'Fellowship & Hackathons',
      eventDate: today,
      isFeatured: true,
      isActive: true,
      displayOrder: galleryAlbums.length + 1,
    });
  };

  const handleUploadAlbumPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingAlbum) return;

    setUploadingImage(true);
    try {
      const res = await uploadImageToImgBB(file);
      addGalleryImage({
        albumId: editingAlbum.id,
        imageUrl: res.url,
        altText: newImageCaption || editingAlbum.title,
        caption: newImageCaption || '',
        displayOrder: currentImages.length + 1,
      });
      setNewImageCaption('');
    } catch (err) {
      alert('Failed to upload image to album.');
    } finally {
      setUploadingImage(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-[#E6DECE] p-8 shadow-xs max-w-5xl">
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-[#F0E8D9]">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#926E28] block mb-1">
            Media & Storytelling
          </span>
          <h1 className="font-display text-2xl font-bold text-[#191C1E]">
            Gallery Albums & Moments
          </h1>
        </div>
        <button
          onClick={startCreate}
          className="px-4 py-2 text-xs font-semibold text-white bg-[#191C1E] hover:bg-[#2B2F34] rounded-xl transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5 text-[#C59A4E]" />
          <span>Add New Album</span>
        </button>
      </div>

      {editingAlbum ? (
        <form onSubmit={handleSave} className="space-y-6 p-6 bg-[#FAF8F5] rounded-2xl border border-[#E6DECE]">
          <div className="flex items-center justify-between pb-3 border-b border-[#E6DECE]">
            <h3 className="text-sm font-bold text-[#191C1E]">
              {isCreating ? 'Create Photo Album' : `Editing Album: ${editingAlbum.title}`}
            </h3>
            <button
              type="button"
              onClick={() => setEditingAlbum(null)}
              className="text-xs text-[#6B7280] hover:text-black"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1">Album Title *</label>
              <input
                type="text"
                required
                value={editingAlbum.title}
                onChange={(e) => {
                  const val = e.target.value;
                  const slug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                  setEditingAlbum({ ...editingAlbum, title: val, slug });
                }}
                className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1">URL Slug *</label>
              <input
                type="text"
                required
                value={editingAlbum.slug}
                onChange={(e) => setEditingAlbum({ ...editingAlbum, slug: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1">Category</label>
              <select
                value={editingAlbum.category}
                onChange={(e) => setEditingAlbum({ ...editingAlbum, category: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg"
              >
                <option value="Fellowship & Hackathons">Fellowship & Hackathons</option>
                <option value="Events & Keynotes">Events & Keynotes</option>
                <option value="Workshops & Training">Workshops & Training</option>
                <option value="Team & Culture">Team & Culture</option>
                <option value="Project Launches">Project Launches</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1">Event Date</label>
              <input
                type="date"
                required
                value={editingAlbum.eventDate}
                onChange={(e) => setEditingAlbum({ ...editingAlbum, eventDate: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#191C1E] mb-1">Cover Image URL</label>
            <input
              type="text"
              required
              value={editingAlbum.coverImageUrl}
              onChange={(e) => setEditingAlbum({ ...editingAlbum, coverImageUrl: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#191C1E] mb-1">Album Description</label>
            <textarea
              rows={3}
              required
              value={editingAlbum.description}
              onChange={(e) => setEditingAlbum({ ...editingAlbum, description: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg resize-none"
            />
          </div>

          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 text-xs text-[#191C1E] cursor-pointer">
              <input
                type="checkbox"
                checked={editingAlbum.isFeatured}
                onChange={(e) => setEditingAlbum({ ...editingAlbum, isFeatured: e.target.checked })}
              />
              <span>Feature on Homepage "Inside Veltora"</span>
            </label>
            <label className="flex items-center gap-2 text-xs text-[#191C1E] cursor-pointer">
              <input
                type="checkbox"
                checked={editingAlbum.isActive}
                onChange={(e) => setEditingAlbum({ ...editingAlbum, isActive: e.target.checked })}
              />
              <span>Is Active (Visible in Gallery)</span>
            </label>
          </div>

          {/* Album Photos Manager (for existing albums) */}
          {!isCreating && (
            <div className="p-4 bg-white rounded-xl border border-[#E6DECE] space-y-4">
              <h4 className="text-xs font-bold text-[#191C1E] uppercase tracking-wider">
                Album Photos ({currentImages.length})
              </h4>

              {/* Upload image form */}
              <div className="flex flex-col sm:flex-row items-center gap-3 p-3 bg-[#FAF8F5] rounded-xl border border-[#E6DECE]">
                <input
                  type="text"
                  placeholder="Photo caption / moment description..."
                  value={newImageCaption}
                  onChange={(e) => setNewImageCaption(e.target.value)}
                  className="flex-1 px-3 py-1.5 text-xs bg-white border border-[#E6DECE] rounded-lg"
                />
                <label className="px-3.5 py-1.5 text-xs font-semibold bg-[#191C1E] text-white rounded-lg cursor-pointer flex items-center gap-1.5 shrink-0">
                  <Upload className="w-3.5 h-3.5 text-[#C59A4E]" />
                  <span>{uploadingImage ? 'Uploading...' : 'Upload Photo'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    disabled={uploadingImage}
                    onChange={handleUploadAlbumPhoto}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Photos grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {currentImages.map((img) => (
                  <div key={img.id} className="relative aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden border border-[#E6DECE] group">
                    <img src={img.imageUrl} alt={img.caption || 'Photo'} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => deleteGalleryImage(img.id)}
                      className="absolute top-1.5 right-1.5 p-1 bg-red-600 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Remove Photo"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    {img.caption && (
                      <span className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[10px] p-1 truncate text-center">
                        {img.caption}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4 border-t border-[#E6DECE]">
            <button
              type="button"
              onClick={() => setEditingAlbum(null)}
              className="px-4 py-2 text-xs text-[#6B7280]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 text-xs font-semibold text-white bg-[#191C1E] rounded-xl flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5 text-[#C59A4E]" />
              <span>Save Album</span>
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-3">
          {galleryAlbums.map((alb) => {
            const count = galleryImages.filter((img) => img.albumId === alb.id).length;
            return (
              <div
                key={alb.id}
                className="p-4 bg-[#FAF8F5] border border-[#E6DECE] rounded-2xl flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={alb.coverImageUrl}
                    alt={alb.title}
                    className="w-12 h-12 rounded-xl object-cover border border-[#E6DECE] shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-bold text-[#191C1E] truncate">{alb.title}</span>
                      <span className="text-[10px] text-[#806429] uppercase font-mono">({alb.category})</span>
                    </div>
                    <p className="text-[11px] text-[#6B7280] truncate">
                      {count} Photos · Event Date: {alb.eventDate}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      setIsCreating(false);
                      setEditingAlbum(alb);
                    }}
                    className="p-1.5 text-[#656A72] hover:text-[#191C1E] rounded-lg hover:bg-white border border-[#E6DECE]"
                    title="Manage Album & Photos"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Delete album ${alb.title}?`)) deleteGalleryAlbum(alb.id);
                    }}
                    className="p-1.5 text-red-600 hover:text-red-800 rounded-lg hover:bg-white border border-[#E6DECE]"
                    title="Delete Album"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
