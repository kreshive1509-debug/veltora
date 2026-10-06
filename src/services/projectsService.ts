import { supabase } from '../lib/supabase';
import { Project, ProjectImage } from '../types';

export const projectsService = {
  async getProjects(): Promise<Project[]> {
    if (!supabase) return [];
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching projects from Supabase:', error);
      throw error;
    }
    if (!data) return [];

    return data.map((p: any) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      client: p.client,
      category: p.category || 'Web Development',
      year: p.year || '2026',
      status: p.status || 'Live',
      shortDescription: p.short_description,
      fullDescription: p.full_description,
      thumbnail: p.thumbnail,
      heroImageUrl: p.hero_image_url || undefined,
      liveUrl: p.live_url || undefined,
      githubUrl: p.github_url || undefined,
      externalUrl: p.external_url || undefined,
      caseStudyUrl: p.case_study_url || undefined,
      technologies: p.technologies || [],
      keyFeatures: p.key_features || [],
      projectChallenges: p.project_challenges || undefined,
      projectSolution: p.project_solution || undefined,
      projectOutcome: p.project_outcome || undefined,
      partnerId: p.partner_id || undefined,
      metrics: p.metrics || [],
      isFeatured: p.is_featured,
      isActive: p.is_active,
      displayOrder: p.display_order,
    }));
  },

  async addProject(project: Omit<Project, 'id'>): Promise<Project> {
    if (!supabase) throw new Error('Supabase not configured');
    const { data, error } = await supabase
      .from('projects')
      .insert({
        name: project.name,
        slug: project.slug,
        client: project.client,
        category: project.category,
        year: project.year,
        status: project.status,
        short_description: project.shortDescription,
        full_description: project.fullDescription,
        thumbnail: project.thumbnail,
        hero_image_url: project.heroImageUrl,
        live_url: project.liveUrl,
        github_url: project.githubUrl,
        external_url: project.externalUrl,
        case_study_url: project.caseStudyUrl,
        technologies: project.technologies,
        key_features: project.keyFeatures,
        project_challenges: project.projectChallenges,
        project_solution: project.projectSolution,
        project_outcome: project.projectOutcome,
        partner_id: project.partnerId,
        metrics: project.metrics,
        is_featured: project.isFeatured,
        is_active: project.isActive,
        display_order: project.displayOrder,
      })
      .select()
      .single();

    if (error) {
      console.error('Error adding project to Supabase:', error);
      throw error;
    }

    return {
      id: data.id,
      name: data.name,
      slug: data.slug,
      client: data.client,
      category: data.category,
      year: data.year,
      status: data.status,
      shortDescription: data.short_description,
      fullDescription: data.full_description,
      thumbnail: data.thumbnail,
      heroImageUrl: data.hero_image_url || undefined,
      liveUrl: data.live_url || undefined,
      githubUrl: data.github_url || undefined,
      externalUrl: data.external_url || undefined,
      caseStudyUrl: data.case_study_url || undefined,
      technologies: data.technologies || [],
      keyFeatures: data.key_features || [],
      projectChallenges: data.project_challenges || undefined,
      projectSolution: data.project_solution || undefined,
      projectOutcome: data.project_outcome || undefined,
      partnerId: data.partner_id || undefined,
      metrics: data.metrics || [],
      isFeatured: data.is_featured,
      isActive: data.is_active,
      displayOrder: data.display_order,
    };
  },

  async updateProject(id: string, project: Partial<Project>): Promise<void> {
    if (!supabase) return;
    const payload: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };
    if (project.name !== undefined) payload.name = project.name;
    if (project.slug !== undefined) payload.slug = project.slug;
    if (project.client !== undefined) payload.client = project.client;
    if (project.category !== undefined) payload.category = project.category;
    if (project.year !== undefined) payload.year = project.year;
    if (project.status !== undefined) payload.status = project.status;
    if (project.shortDescription !== undefined) payload.short_description = project.shortDescription;
    if (project.fullDescription !== undefined) payload.full_description = project.fullDescription;
    if (project.thumbnail !== undefined) payload.thumbnail = project.thumbnail;
    if (project.heroImageUrl !== undefined) payload.hero_image_url = project.heroImageUrl;
    if (project.liveUrl !== undefined) payload.live_url = project.liveUrl;
    if (project.githubUrl !== undefined) payload.github_url = project.githubUrl;
    if (project.externalUrl !== undefined) payload.external_url = project.externalUrl;
    if (project.caseStudyUrl !== undefined) payload.case_study_url = project.caseStudyUrl;
    if (project.technologies !== undefined) payload.technologies = project.technologies;
    if (project.keyFeatures !== undefined) payload.key_features = project.keyFeatures;
    if (project.projectChallenges !== undefined) payload.project_challenges = project.projectChallenges;
    if (project.projectSolution !== undefined) payload.project_solution = project.projectSolution;
    if (project.projectOutcome !== undefined) payload.project_outcome = project.projectOutcome;
    if (project.partnerId !== undefined) payload.partner_id = project.partnerId;
    if (project.metrics !== undefined) payload.metrics = project.metrics;
    if (project.isFeatured !== undefined) payload.is_featured = project.isFeatured;
    if (project.isActive !== undefined) payload.is_active = project.isActive;
    if (project.displayOrder !== undefined) payload.display_order = project.displayOrder;

    const { error } = await supabase
      .from('projects')
      .update(payload)
      .eq('id', id);

    if (error) {
      console.error(`Error updating project ${id}:`, error);
      throw error;
    }
  },

  async deleteProject(id: string): Promise<void> {
    if (!supabase) return;
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) {
      console.error(`Error deleting project ${id}:`, error);
      throw error;
    }
  },

  // Project Images
  async getProjectImages(projectId?: string): Promise<ProjectImage[]> {
    if (!supabase) return [];
    let query = supabase
      .from('project_images')
      .select('*')
      .order('display_order', { ascending: true });

    if (projectId) {
      query = query.eq('project_id', projectId);
    }

    const { data, error } = await query;
    if (error) {
      console.error('Error fetching project_images:', error);
      throw error;
    }
    if (!data) return [];

    return data.map((img: any) => ({
      id: img.id,
      projectId: img.project_id,
      imageUrl: img.image_url,
      altText: img.alt_text || undefined,
      caption: img.caption || undefined,
      displayOrder: img.display_order,
      createdAt: img.created_at,
    }));
  },

  async addProjectImage(image: Omit<ProjectImage, 'id' | 'createdAt'>): Promise<ProjectImage> {
    if (!supabase) throw new Error('Supabase not configured');
    const { data, error } = await supabase
      .from('project_images')
      .insert({
        project_id: image.projectId,
        image_url: image.imageUrl,
        alt_text: image.altText,
        caption: image.caption,
        display_order: image.displayOrder,
      })
      .select()
      .single();

    if (error) {
      console.error('Error adding project image:', error);
      throw error;
    }

    return {
      id: data.id,
      projectId: data.project_id,
      imageUrl: data.image_url,
      altText: data.alt_text || undefined,
      caption: data.caption || undefined,
      displayOrder: data.display_order,
      createdAt: data.created_at,
    };
  },

  async updateProjectImage(id: string, image: Partial<ProjectImage>): Promise<void> {
    if (!supabase) return;
    const payload: Record<string, any> = {};
    if (image.imageUrl !== undefined) payload.image_url = image.imageUrl;
    if (image.altText !== undefined) payload.alt_text = image.altText;
    if (image.caption !== undefined) payload.caption = image.caption;
    if (image.displayOrder !== undefined) payload.display_order = image.displayOrder;

    const { error } = await supabase
      .from('project_images')
      .update(payload)
      .eq('id', id);

    if (error) {
      console.error(`Error updating project image ${id}:`, error);
      throw error;
    }
  },

  async deleteProjectImage(id: string): Promise<void> {
    if (!supabase) return;
    const { error } = await supabase
      .from('project_images')
      .delete()
      .eq('id', id);

    if (error) {
      console.error(`Error deleting project image ${id}:`, error);
      throw error;
    }
  },
};
