import { supabase } from '../lib/supabase';
import { Project, ProjectCapability, ProjectImage, ProjectTechnology } from '../types';

const readCapabilities = (value: unknown) => {
  const settings = value && !Array.isArray(value) && typeof value === 'object'
    ? value as { heading?: string; hideWhenEmpty?: boolean; items?: unknown[] }
    : undefined;
  const rows = Array.isArray(value) ? value : settings?.items || [];
  const items = rows.flatMap((item): ProjectCapability[] => {
    if (typeof item === 'string') return item.trim() ? [{ title: item }] : [];
    if (!item || typeof item !== 'object') return [];
    const capability = item as { title?: string; name?: string; description?: string };
    const title = capability.title || capability.name || '';
    return title.trim() ? [{ title, description: capability.description || undefined }] : [];
  });
  return {
    items,
    heading: settings?.heading || '',
    hideWhenEmpty: settings?.hideWhenEmpty ?? true,
  };
};

const readTechnologies = (value: unknown) => {
  const settings = value && !Array.isArray(value) && typeof value === 'object'
    ? value as { heading?: string; hideWhenEmpty?: boolean; items?: unknown[] }
    : undefined;
  const rows = Array.isArray(value) ? value : settings?.items || [];
  const items = rows.flatMap((item): ProjectTechnology[] => {
    if (typeof item === 'string') return item.trim() ? [{ name: item }] : [];
    if (!item || typeof item !== 'object') return [];
    const technology = item as { name?: string; icon?: string; category?: string };
    return technology.name?.trim()
      ? [{ name: technology.name, icon: technology.icon || undefined, category: technology.category || undefined }]
      : [];
  });
  return {
    items,
    heading: settings?.heading || '',
    hideWhenEmpty: settings?.hideWhenEmpty ?? true,
  };
};

const mapProject = (p: any): Project => {
  const capabilities = readCapabilities(p.key_features);
  const technologies = readTechnologies(p.technologies);
  return {
    id: p.id,
    name: p.name,
    slug: p.slug,
    client: p.client,
    category: p.category,
    year: p.year,
    status: p.status,
    shortDescription: p.short_description,
    fullDescription: p.full_description,
    thumbnail: p.thumbnail || '',
    heroImageUrl: p.hero_image_url || undefined,
    liveUrl: p.live_url || undefined,
    githubUrl: p.github_url || undefined,
    externalUrl: p.external_url || undefined,
    caseStudyUrl: p.case_study_url || undefined,
    technologies: technologies.items.map((technology) => technology.name),
    technologyItems: technologies.items,
    technologyHeading: technologies.heading,
    hideTechnologiesWhenEmpty: technologies.hideWhenEmpty,
    keyFeatures: capabilities.items.map((capability) => capability.title),
    capabilities: capabilities.items,
    capabilityHeading: capabilities.heading,
    hideCapabilitiesWhenEmpty: capabilities.hideWhenEmpty,
    projectChallenges: p.project_challenges || undefined,
    projectSolution: p.project_solution || undefined,
    projectOutcome: p.project_outcome || undefined,
    partnerId: p.partner_id || undefined,
    metrics: p.metrics || [],
    isFeatured: p.is_featured,
    isActive: p.is_active,
    displayOrder: p.display_order,
  };
};

const capabilityPayload = (project: Partial<Project>) => ({
  heading: project.capabilityHeading || '',
  hideWhenEmpty: project.hideCapabilitiesWhenEmpty ?? true,
  items: project.capabilities || (project.keyFeatures || []).map((title) => ({ title })),
});

const technologyPayload = (project: Partial<Project>) => ({
  heading: project.technologyHeading || '',
  hideWhenEmpty: project.hideTechnologiesWhenEmpty ?? true,
  items: project.technologyItems || (project.technologies || []).map((name) => ({ name })),
});

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

    return data.map(mapProject);
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
        technologies: technologyPayload(project),
        key_features: capabilityPayload(project),
        project_challenges: project.projectChallenges,
        project_solution: project.projectSolution,
        project_outcome: project.projectOutcome,
        partner_id: project.partnerId || null,
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

    return mapProject(data);
  },

  async updateProject(id: string, project: Partial<Project>): Promise<void> {
    if (!supabase) throw new Error('Supabase is not configured');
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
    if (project.technologies !== undefined || project.technologyItems !== undefined || project.technologyHeading !== undefined || project.hideTechnologiesWhenEmpty !== undefined) {
      payload.technologies = technologyPayload(project);
    }
    if (project.keyFeatures !== undefined || project.capabilities !== undefined || project.capabilityHeading !== undefined || project.hideCapabilitiesWhenEmpty !== undefined) {
      payload.key_features = capabilityPayload(project);
    }
    if (project.projectChallenges !== undefined) payload.project_challenges = project.projectChallenges;
    if (project.projectSolution !== undefined) payload.project_solution = project.projectSolution;
    if (project.projectOutcome !== undefined) payload.project_outcome = project.projectOutcome;
    if (project.partnerId !== undefined) payload.partner_id = project.partnerId || null;
    if (project.metrics !== undefined) payload.metrics = project.metrics;
    if (project.isFeatured !== undefined) payload.is_featured = project.isFeatured;
    if (project.isActive !== undefined) payload.is_active = project.isActive;
    if (project.displayOrder !== undefined) payload.display_order = project.displayOrder;

    const { data, error } = await supabase
      .from('projects')
      .update(payload)
      .eq('id', id)
      .select('id')
      .single();

    if (error) {
      console.error(`Error updating project ${id}:`, error);
      throw error;
    }
    if (!data) throw new Error(`Project ${id} was not updated`);
  },

  async deleteProject(id: string): Promise<void> {
    if (!supabase) throw new Error('Supabase is not configured');
    const { data, error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id)
      .select('id')
      .single();

    if (error) {
      console.error(`Error deleting project ${id}:`, error);
      throw error;
    }
    if (!data) throw new Error(`Project ${id} was not deleted`);
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
    if (!supabase) throw new Error('Supabase is not configured');
    const payload: Record<string, any> = {};
    if (image.imageUrl !== undefined) payload.image_url = image.imageUrl;
    if (image.altText !== undefined) payload.alt_text = image.altText;
    if (image.caption !== undefined) payload.caption = image.caption;
    if (image.displayOrder !== undefined) payload.display_order = image.displayOrder;

    const { data, error } = await supabase
      .from('project_images')
      .update(payload)
      .eq('id', id)
      .select('id')
      .single();

    if (error) {
      console.error(`Error updating project image ${id}:`, error);
      throw error;
    }
    if (!data) throw new Error(`Project image ${id} was not updated`);
  },

  async deleteProjectImage(id: string): Promise<void> {
    if (!supabase) throw new Error('Supabase is not configured');
    const { data, error } = await supabase
      .from('project_images')
      .delete()
      .eq('id', id)
      .select('id')
      .single();

    if (error) {
      console.error(`Error deleting project image ${id}:`, error);
      throw error;
    }
    if (!data) throw new Error(`Project image ${id} was not deleted`);
  },
};
