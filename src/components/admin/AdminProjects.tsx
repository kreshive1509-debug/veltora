import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { Project, ProjectImage, ProjectStatus } from '../../types';
import { uploadImageToImgBB } from '../../lib/imgbb';
import {
  Plus,
  Edit2,
  Trash2,
  Save,
  Image as ImageIcon,
  Upload,
  ExternalLink,
  Layers,
  X,
  Check,
} from 'lucide-react';

const getErrorMessage = (error: unknown): string => {
  if (error && typeof error === 'object' && 'message' in error) {
    const databaseError = error as {
      code?: string;
      message: string;
      details?: string;
      hint?: string;
    };
    return [databaseError.code, databaseError.message, databaseError.details, databaseError.hint]
      .filter(Boolean)
      .join(': ');
  }
  return error instanceof Error ? error.message : String(error);
};

export const AdminProjects: React.FC = () => {
  const {
    projects,
    addProject,
    updateProject,
    deleteProject,
    projectImages,
    addProjectImage,
    updateProjectImage,
    deleteProjectImage,
    partners,
  } = useCms();

  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [savingProject, setSavingProject] = useState(false);
  const [deletingProjectId, setDeletingProjectId] = useState<string | null>(null);
  const [newImageCaption, setNewImageCaption] = useState('');
  const [operationError, setOperationError] = useState<string | null>(null);
  const [operationNotice, setOperationNotice] = useState<string | null>(null);

  const currentProjectId = editingProject?.id;
  const currentImages = currentProjectId
    ? projectImages.filter((img) => img.projectId === currentProjectId)
    : [];

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject || savingProject) return;

    setSavingProject(true);
    setOperationError(null);
    setOperationNotice(null);
    try {
      if (isCreating) {
        const { id, ...rest } = editingProject;
        await addProject(rest);
        setOperationNotice('Project created successfully.');
      } else {
        await updateProject(editingProject.id, editingProject);
        setOperationNotice('Project updated successfully.');
      }
      setEditingProject(null);
      setIsCreating(false);
    } catch (error) {
      setOperationError(`Project could not be saved: ${getErrorMessage(error)}`);
    } finally {
      setSavingProject(false);
    }
  };

  const startCreate = () => {
    setOperationError(null);
    setOperationNotice(null);
    setIsCreating(true);
    setEditingProject({
      id: 'temp',
      name: '',
      slug: '',
      client: '',
      category: 'Enterprise Web Application',
      year: '2026',
      status: 'Live',
      shortDescription: '',
      fullDescription: '',
      thumbnail: '/src/assets/images/project_saas_platform_1791103524205.jpg',
      heroImageUrl: '/src/assets/images/project_saas_platform_1791103524205.jpg',
      liveUrl: '',
      githubUrl: '',
      externalUrl: '',
      caseStudyUrl: '',
      technologies: ['React 19', 'TypeScript', 'Tailwind CSS', 'Supabase'],
      keyFeatures: ['Sub-second latency', 'Automated workflows'],
      projectChallenges: '',
      projectSolution: '',
      projectOutcome: '',
      partnerId: '',
      isFeatured: true,
      isActive: true,
      displayOrder: projects.length + 1,
      metrics: [{ label: 'Speedup', value: '3x' }],
    });
  };

  const handleUploadGalleryImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    const file = e.target.files?.[0];
    if (!file || !editingProject) return;

    setUploadingImage(true);
    setOperationError(null);
    setOperationNotice(null);
    try {
      const res = await uploadImageToImgBB(file);
      await addProjectImage({
        projectId: editingProject.id,
        imageUrl: res.url,
        altText: newImageCaption || `${editingProject.name} screenshot`,
        caption: newImageCaption || '',
        displayOrder: currentImages.length + 1,
      });
      setNewImageCaption('');
      setOperationNotice('Project image uploaded and linked successfully.');
    } catch (error) {
      setOperationError(`Project image could not be saved: ${getErrorMessage(error)}`);
    } finally {
      setUploadingImage(false);
      input.value = '';
    }
  };

  const handleDeleteProject = async (project: Project) => {
    if (!confirm(`Delete project ${project.name}?`)) return;

    setDeletingProjectId(project.id);
    setOperationError(null);
    setOperationNotice(null);
    try {
      await deleteProject(project.id);
      setOperationNotice('Project deleted successfully.');
    } catch (error) {
      setOperationError(`Project could not be deleted: ${getErrorMessage(error)}`);
    } finally {
      setDeletingProjectId(null);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-[#E6DECE] p-8 shadow-xs max-w-5xl">
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-[#F0E8D9]">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#926E28] block mb-1">
            Portfolio Engine
          </span>
          <h1 className="font-display text-2xl font-bold text-[#191C1E]">
            Projects & Multi-Image Case Studies
          </h1>
        </div>
        <button
          onClick={startCreate}
          disabled={savingProject || deletingProjectId !== null}
          className="px-4 py-2 text-xs font-semibold text-white bg-[#191C1E] hover:bg-[#2B2F34] rounded-xl transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5 text-[#C59A4E]" />
          <span>Add New Project</span>
        </button>
      </div>

      {operationError && (
        <p role="alert" className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-800">
          {operationError}
        </p>
      )}
      {operationNotice && (
        <p role="status" className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs text-emerald-800">
          {operationNotice}
        </p>
      )}

      {editingProject ? (
        <form onSubmit={handleSave} className="space-y-6 p-6 bg-[#FAF8F5] rounded-2xl border border-[#E6DECE]">
          <div className="flex items-center justify-between pb-3 border-b border-[#E6DECE]">
            <h3 className="text-sm font-bold text-[#191C1E]">
              {isCreating ? 'Create Case Study' : `Editing: ${editingProject.name}`}
            </h3>
            <button
              type="button"
              onClick={() => {
                setEditingProject(null);
                setIsCreating(false);
                setOperationError(null);
              }}
              className="text-xs text-[#6B7280] hover:text-black"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1">Project Name *</label>
              <input
                type="text"
                required
                value={editingProject.name}
                onChange={(e) => {
                  const val = e.target.value;
                  const slug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                  setEditingProject({ ...editingProject, name: val, slug });
                }}
                className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1">Slug *</label>
              <input
                type="text"
                required
                value={editingProject.slug}
                onChange={(e) => setEditingProject({ ...editingProject, slug: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1">Client Name *</label>
              <input
                type="text"
                required
                value={editingProject.client}
                onChange={(e) => setEditingProject({ ...editingProject, client: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1">Category</label>
              <input
                type="text"
                required
                value={editingProject.category}
                onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1">Status</label>
              <select
                value={editingProject.status}
                onChange={(e) =>
                  setEditingProject({ ...editingProject, status: e.target.value as ProjectStatus })
                }
                className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg"
              >
                <option value="Live">Live</option>
                <option value="Completed">Completed</option>
                <option value="In Development">In Development</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Archived">Archived</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1">Associated Partner</label>
              <select
                value={editingProject.partnerId || ''}
                onChange={(e) => setEditingProject({ ...editingProject, partnerId: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg"
              >
                <option value="">None (Independent Project)</option>
                {partners.map((pt) => (
                  <option key={pt.id} value={pt.id}>
                    {pt.name} ({pt.partnershipType})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1">Live Website URL</label>
              <input
                type="url"
                placeholder="https://client-domain.com"
                value={editingProject.liveUrl || ''}
                onChange={(e) => setEditingProject({ ...editingProject, liveUrl: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1">GitHub Repo URL</label>
              <input
                type="url"
                value={editingProject.githubUrl || ''}
                onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1">Release Year</label>
              <input
                type="text"
                value={editingProject.year}
                onChange={(e) => setEditingProject({ ...editingProject, year: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1">Thumbnail URL</label>
              <input
                type="text"
                required
                value={editingProject.thumbnail}
                onChange={(e) => setEditingProject({ ...editingProject, thumbnail: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1">Hero Image URL</label>
              <input
                type="text"
                value={editingProject.heroImageUrl || ''}
                onChange={(e) => setEditingProject({ ...editingProject, heroImageUrl: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#191C1E] mb-1">Short Summary (1-2 sentences)</label>
            <input
              type="text"
              required
              value={editingProject.shortDescription}
              onChange={(e) => setEditingProject({ ...editingProject, shortDescription: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#191C1E] mb-1">Full Detailed Narrative</label>
            <textarea
              rows={3}
              required
              value={editingProject.fullDescription}
              onChange={(e) => setEditingProject({ ...editingProject, fullDescription: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1">Challenges</label>
              <textarea
                rows={2}
                value={editingProject.projectChallenges || ''}
                onChange={(e) => setEditingProject({ ...editingProject, projectChallenges: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg resize-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1">Solution</label>
              <textarea
                rows={2}
                value={editingProject.projectSolution || ''}
                onChange={(e) => setEditingProject({ ...editingProject, projectSolution: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg resize-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1">Outcome</label>
              <textarea
                rows={2}
                value={editingProject.projectOutcome || ''}
                onChange={(e) => setEditingProject({ ...editingProject, projectOutcome: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg resize-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 text-xs text-[#191C1E] cursor-pointer">
              <input
                type="checkbox"
                checked={editingProject.isFeatured}
                onChange={(e) => setEditingProject({ ...editingProject, isFeatured: e.target.checked })}
              />
              <span>Feature on Homepage Section</span>
            </label>
            <label className="flex items-center gap-2 text-xs text-[#191C1E] cursor-pointer">
              <input
                type="checkbox"
                checked={editingProject.isActive}
                onChange={(e) => setEditingProject({ ...editingProject, isActive: e.target.checked })}
              />
              <span>Is Active (Publicly visible)</span>
            </label>
          </div>

          {/* Multi-Image Gallery Manager (For existing projects) */}
          {!isCreating && (
            <div className="p-4 bg-white rounded-xl border border-[#E6DECE] space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-[#191C1E] uppercase tracking-wider">
                  Project Gallery Screenshots ({currentImages.length})
                </h4>
              </div>

              {/* Upload Screenshot */}
              <div className="flex flex-col sm:flex-row items-center gap-3 p-3 bg-[#FAF8F5] rounded-xl border border-[#E6DECE]">
                <input
                  type="text"
                  placeholder="Screenshot caption / label..."
                  value={newImageCaption}
                  onChange={(e) => setNewImageCaption(e.target.value)}
                  className="flex-1 px-3 py-1.5 text-xs bg-white border border-[#E6DECE] rounded-lg"
                />
                <label className="px-3.5 py-1.5 text-xs font-semibold bg-[#191C1E] text-white rounded-lg cursor-pointer flex items-center gap-1.5 shrink-0">
                  <Upload className="w-3.5 h-3.5 text-[#C59A4E]" />
                  <span>{uploadingImage ? 'Uploading...' : 'Upload Image'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    disabled={uploadingImage}
                    onChange={handleUploadGalleryImage}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Current Images List */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {currentImages.map((img) => (
                  <div key={img.id} className="relative aspect-[16/10] bg-gray-100 rounded-lg overflow-hidden border border-[#E6DECE] group">
                    <img src={img.imageUrl} alt={img.caption || 'Screenshot'} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={async () => {
                        setOperationError(null);
                        setOperationNotice(null);
                        try {
                          await deleteProjectImage(img.id);
                          setOperationNotice('Project image deleted successfully.');
                        } catch (error) {
                          setOperationError(`Project image could not be deleted: ${getErrorMessage(error)}`);
                        }
                      }}
                      className="absolute top-1.5 right-1.5 p-1 bg-red-600 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Remove image"
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
              onClick={() => {
                setEditingProject(null);
                setIsCreating(false);
                setOperationError(null);
              }}
              className="px-4 py-2 text-xs text-[#6B7280]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={savingProject}
              className="px-6 py-2 text-xs font-semibold text-white bg-[#191C1E] rounded-xl flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5 text-[#C59A4E]" />
              <span>{savingProject ? 'Saving...' : 'Save Case Study'}</span>
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-3">
          {projects.map((p) => {
            const count = projectImages.filter((img) => img.projectId === p.id).length;
            return (
              <div
                key={p.id}
                className="p-4 bg-[#FAF8F5] border border-[#E6DECE] rounded-2xl flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={p.thumbnail}
                    alt={p.name}
                    className="w-12 h-12 rounded-lg object-cover border border-[#E6DECE] shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-bold text-[#191C1E] truncate">{p.name}</span>
                      <span className="text-[10px] text-[#806429] font-mono">({p.client})</span>
                      <span className="text-[10px] bg-white border border-[#E6DECE] px-1.5 py-0.5 rounded text-[#52575E]">
                        {p.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#6B7280] truncate">
                      {p.category} · {count} Screenshots · {p.technologies.slice(0, 3).join(', ')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {p.liveUrl && (
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-[#656A72] hover:text-[#191C1E] rounded-lg hover:bg-white border border-[#E6DECE]"
                      title="Open Live Site"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <button
                    onClick={() => {
                      setOperationError(null);
                      setOperationNotice(null);
                      setIsCreating(false);
                      setEditingProject(p);
                    }}
                    className="p-1.5 text-[#656A72] hover:text-[#191C1E] rounded-lg hover:bg-white border border-[#E6DECE]"
                    title="Edit Case Study"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteProject(p)}
                    disabled={deletingProjectId !== null}
                    className="p-1.5 text-red-600 hover:text-red-800 rounded-lg hover:bg-white border border-[#E6DECE]"
                    title="Delete Project"
                  >
                    {deletingProjectId === p.id ? 'Deleting...' : <Trash2 className="w-3.5 h-3.5" />}
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
