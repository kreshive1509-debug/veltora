import { supabase } from '../lib/supabase';
import { BlogPost } from '../types';

export const blogService = {
  async getBlogPosts(): Promise<BlogPost[]> {
    if (!supabase) return [];
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('publish_date', { ascending: false });

    if (error) {
      console.error('Error fetching blog_posts from Supabase:', error);
      throw error;
    }
    if (!data) return [];

    return data.map((b: any) => ({
      id: b.id,
      title: b.title,
      slug: b.slug,
      author: b.author || 'Veltora Editorial',
      coverImage: b.cover_image,
      excerpt: b.excerpt,
      content: b.content,
      category: b.category || 'Technology',
      tags: b.tags || [],
      isPublished: b.is_published,
      isFeatured: b.is_featured,
      publishDate: b.publish_date,
      readTime: b.read_time || '4 min read',
      seoTitle: b.seo_title || undefined,
      seoDescription: b.seo_description || undefined,
      ogImage: b.og_image || undefined,
    }));
  },

  async addBlogPost(post: Omit<BlogPost, 'id'>): Promise<BlogPost> {
    if (!supabase) throw new Error('Supabase not configured');
    const { data, error } = await supabase
      .from('blog_posts')
      .insert({
        title: post.title,
        slug: post.slug,
        author: post.author,
        cover_image: post.coverImage,
        excerpt: post.excerpt,
        content: post.content,
        category: post.category,
        tags: post.tags,
        is_published: post.isPublished,
        is_featured: post.isFeatured,
        publish_date: post.publishDate,
        read_time: post.readTime,
        seo_title: post.seoTitle,
        seo_description: post.seoDescription,
        og_image: post.ogImage,
      })
      .select()
      .single();

    if (error) {
      console.error('Error adding blog post:', error);
      throw error;
    }

    return {
      id: data.id,
      title: data.title,
      slug: data.slug,
      author: data.author,
      coverImage: data.cover_image,
      excerpt: data.excerpt,
      content: data.content,
      category: data.category,
      tags: data.tags || [],
      isPublished: data.is_published,
      isFeatured: data.is_featured,
      publishDate: data.publish_date,
      readTime: data.read_time,
      seoTitle: data.seo_title || undefined,
      seoDescription: data.seo_description || undefined,
      ogImage: data.og_image || undefined,
    };
  },

  async updateBlogPost(id: string, post: Partial<BlogPost>): Promise<void> {
    if (!supabase) return;
    const payload: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };
    if (post.title !== undefined) payload.title = post.title;
    if (post.slug !== undefined) payload.slug = post.slug;
    if (post.author !== undefined) payload.author = post.author;
    if (post.coverImage !== undefined) payload.cover_image = post.coverImage;
    if (post.excerpt !== undefined) payload.excerpt = post.excerpt;
    if (post.content !== undefined) payload.content = post.content;
    if (post.category !== undefined) payload.category = post.category;
    if (post.tags !== undefined) payload.tags = post.tags;
    if (post.isPublished !== undefined) payload.is_published = post.isPublished;
    if (post.isFeatured !== undefined) payload.is_featured = post.isFeatured;
    if (post.publishDate !== undefined) payload.publish_date = post.publishDate;
    if (post.readTime !== undefined) payload.read_time = post.readTime;
    if (post.seoTitle !== undefined) payload.seo_title = post.seoTitle;
    if (post.seoDescription !== undefined) payload.seo_description = post.seoDescription;
    if (post.ogImage !== undefined) payload.og_image = post.ogImage;

    const { error } = await supabase
      .from('blog_posts')
      .update(payload)
      .eq('id', id);

    if (error) {
      console.error(`Error updating blog post ${id}:`, error);
      throw error;
    }
  },

  async deleteBlogPost(id: string): Promise<void> {
    if (!supabase) return;
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);

    if (error) {
      console.error(`Error deleting blog post ${id}:`, error);
      throw error;
    }
  },
};
