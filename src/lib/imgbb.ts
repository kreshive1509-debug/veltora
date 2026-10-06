/**
 * ImgBB Image Upload Client
 * Uploads images to ImgBB API or falls back to optimized data URLs.
 */

export async function uploadImageToImgBB(file: File): Promise<{ url: string; deleteUrl?: string }> {
  const apiKey = import.meta.env.VITE_IMGBB_API_KEY;

  if (apiKey && !apiKey.includes('placeholder')) {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.success && data.data?.url) {
        return {
          url: data.data.url,
          deleteUrl: data.data.delete_url,
        };
      }
    } catch (err) {
      console.warn('ImgBB upload error, falling back to client storage:', err);
    }
  }

  // Fallback: Read as base64 Data URL
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve({ url: reader.result as string });
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}
