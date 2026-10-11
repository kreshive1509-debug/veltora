/**
 * ImgBB Image Upload Client
 * Uploads images to ImgBB API or falls back to optimized data URLs.
 */

export async function uploadImageToImgBB(file: File): Promise<{ url: string; deleteUrl?: string }> {
  const apiKey = import.meta.env.VITE_IMGBB_API_KEY;

  if (apiKey && !apiKey.includes('placeholder')) {
    const formData = new FormData();
    formData.append('image', file);

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: 'POST',
      body: formData,
    });

    const data = await res.json().catch(() => null);
    if (!res.ok || !data?.success || !data.data?.url) {
      throw new Error(data?.error?.message || `ImgBB upload failed (HTTP ${res.status}).`);
    }
    return {
      url: data.data.url,
      deleteUrl: data.data.delete_url,
    };
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
