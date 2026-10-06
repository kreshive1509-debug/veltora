import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { uploadImageToImgBB } from '../../lib/imgbb';
import { Upload, Copy, Check, Trash2, Image as ImageIcon } from 'lucide-react';

export const AdminMedia: React.FC = () => {
  const { media, addMediaItem, deleteMediaItem } = useCms();
  const [uploading, setUploading] = useState(false);
  const [altText, setAltText] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const res = await uploadImageToImgBB(file);
      addMediaItem({
        fileName: file.name,
        url: res.url,
        type: file.type,
        altText: altText || file.name,
        size: `${(file.size / 1024).toFixed(1)} KB`,
        usedIn: ['Media Library'],
      });
      setAltText('');
    } catch (err) {
      alert('Failed to process image upload.');
    } finally {
      setUploading(false);
    }
  };

  const copyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-white rounded-3xl border border-[#E6DECE] p-8 shadow-xs max-w-5xl">
      <div className="mb-8 pb-6 border-b border-[#F0E8D9]">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#926E28] block mb-1">
          Assets Hub
        </span>
        <h1 className="font-display text-2xl font-bold text-[#191C1E]">
          Media Library & ImgBB Uploader
        </h1>
        <p className="text-xs text-[#6B7280] mt-1">
          Upload project screenshots, team portraits, or background imagery. Hosted via ImgBB API.
        </p>
      </div>

      {/* Uploader Box */}
      <div className="p-6 bg-[#FAF8F5] border-2 border-dashed border-[#E6DECE] rounded-2xl mb-8 text-center">
        <Upload className="w-8 h-8 text-[#926E28] mx-auto mb-2" />
        <p className="text-xs font-semibold text-[#191C1E] mb-1">
          Select image asset to upload
        </p>
        <p className="text-[11px] text-[#6B7280] mb-4">
          PNG, JPG, WEBP, or SVG up to 10MB
        </p>

        <div className="max-w-xs mx-auto mb-4">
          <input
            type="text"
            placeholder="Asset label / Alt text (optional)"
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
            className="w-full px-3 py-1.5 text-xs bg-white border border-[#E6DECE] rounded-lg mb-2"
          />
          <label className="inline-block px-4 py-2 text-xs font-semibold text-white bg-[#191C1E] hover:bg-[#2B2F34] rounded-xl cursor-pointer transition-colors">
            {uploading ? 'Uploading Asset...' : 'Browse Local Files'}
            <input
              type="file"
              accept="image/*"
              disabled={uploading}
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {media.map((item) => (
          <div
            key={item.id}
            className="bg-[#FAF8F5] border border-[#E6DECE] rounded-2xl overflow-hidden group flex flex-col justify-between"
          >
            <div className="aspect-square bg-black/5 overflow-hidden relative">
              <img
                src={item.url}
                alt={item.altText || item.fileName}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-3">
              <p className="text-[11px] font-semibold text-[#191C1E] truncate mb-0.5">
                {item.fileName}
              </p>
              <p className="text-[10px] text-[#8C929C] mb-2">{item.size || 'Web Asset'}</p>
              <div className="flex items-center justify-between pt-2 border-t border-[#E6DECE]">
                <button
                  onClick={() => copyUrl(item.url, item.id)}
                  className="text-[10px] font-semibold text-[#806429] hover:underline flex items-center gap-1"
                >
                  {copiedId === item.id ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedId === item.id ? 'Copied' : 'Copy Link'}</span>
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Remove asset ${item.fileName}?`)) deleteMediaItem(item.id);
                  }}
                  className="text-red-500 hover:text-red-700 p-1"
                  title="Delete"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
