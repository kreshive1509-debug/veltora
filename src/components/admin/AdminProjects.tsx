import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { Project, ProjectCapability, ProjectImage, ProjectStatus, ProjectTechnology } from '../../types';
import { uploadImageToImgBB } from '../../lib/imgbb';
import {
  Plus,
  Edit2,
  Trash2,
  Save,
  Image as ImageIcon,
  Upload,
  ExternalLink,
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
  const [activeTab, setActiveTab] = useState<'basic' | 'media' | 'capabilities' | 'technologies' | 'links'>('basic');
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [pendingGalleryFiles, setPendingGalleryFiles] = useState<Array<{ file: File; previewUrl: string; caption: string }>>([]);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [savingProject, setSavingProject] = useState(false);
  const [deletingProjectId, setDeletingProjectId] = useState<string | null>(null);
  const [operationError, setOperationError] = useState<string | null>(null);
  const [operationNotice, setOperationNotice] = useState<string | null>(null);

  const currentProjectId = editingProject?.id;
  const currentImages = currentProjectId
    ? projectImages.filter((img) => img.projectId === currentProjectId).sort((a, b) => a.displayOrder - b.displayOrder)
    : [];

  const releasePreviews = () => {
    if (coverPreview?.startsWith('blob:')) URL.revokeObjectURL(coverPreview);
    pendingGalleryFiles.forEach((image) => URL.revokeObjectURL(image.previewUrl));
    setCoverFile(null);
    setCoverPreview(null);
    setPendingGalleryFiles([]);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject || savingProject) return;

    const missingFields = [
      ['name', 'project title'],
      ['slug', 'slug'],
      ['client', 'client or organization'],
      ['category', 'category'],
      ['shortDescription', 'short description'],
      ['fullDescription', 'full description'],
    ].filter(([field]) => !String(editingProject[field as keyof Project] || '').trim()).map(([, label]) => label);
    if (missingFields.length) {
      setActiveTab('basic');
      setOperationError(`Complete the required fields: ${missingFields.join(', ')}.`);
      return;
    }

    setSavingProject(true);
    setOperationError(null);
    setOperationNotice(null);
    let projectRecordSaved = false;
    try {
      let projectToSave = editingProject;
      if (coverFile) {
        setUploadingImage(true);
        const uploadedCover = await uploadImageToImgBB(coverFile);
        projectToSave = { ...projectToSave, thumbnail: uploadedCover.url, heroImageUrl: uploadedCover.url };
      }

      let savedProjectId = editingProject.id;
      if (isCreating) {
        const { id, ...newProject } = projectToSave;
        savedProjectId = await addProject(newProject);
        projectRecordSaved = true;
        projectToSave = { ...projectToSave, id: savedProjectId };
        setEditingProject(projectToSave);
        setIsCreating(false);
      } else {
        await updateProject(editingProject.id, projectToSave);
        projectRecordSaved = true;
        setEditingProject(projectToSave);
      }
      if (coverFile) {
        if (coverPreview?.startsWith('blob:')) URL.revokeObjectURL(coverPreview);
        setCoverFile(null);
        setCoverPreview(projectToSave.thumbnail || null);
      }

      for (const image of pendingGalleryFiles) {
        setUploadingImage(true);
        const uploadedImage = await uploadImageToImgBB(image.file);
        await addProjectImage({
          projectId: savedProjectId,
          imageUrl: uploadedImage.url,
          altText: image.caption || `${projectToSave.name} screenshot`,
          caption: image.caption,
          displayOrder: currentImages.length + pendingGalleryFiles.indexOf(image) + 1,
        });
        URL.revokeObjectURL(image.previewUrl);
        setPendingGalleryFiles((previous) => previous.filter((pending) => pending.previewUrl !== image.previewUrl));
      }

      setOperationNotice(isCreating ? 'Project created successfully.' : 'Project updated successfully.');
      releasePreviews();
      setEditingProject(null);
      setIsCreating(false);
    } catch (error) {
      const action = projectRecordSaved
        ? 'Project record saved, but an image could not be uploaded or linked'
        : isCreating ? 'Project could not be saved' : 'Project changes could not be saved';
      setOperationError(`${action}: ${getErrorMessage(error)}`);
    } finally {
      setUploadingImage(false);
      setSavingProject(false);
    }
  };

  const startCreate = () => {
    setOperationError(null);
    setOperationNotice(null);
    releasePreviews();
    setActiveTab('basic');
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
      thumbnail: '',
      heroImageUrl: '',
      liveUrl: '',
      githubUrl: '',
      externalUrl: '',
      caseStudyUrl: '',
      technologies: [],
      keyFeatures: [],
      technologyItems: [],
      technologyHeading: '',
      hideTechnologiesWhenEmpty: true,
      capabilities: [],
      capabilityHeading: '',
      hideCapabilitiesWhenEmpty: true,
      projectChallenges: '',
      projectSolution: '',
      projectOutcome: '',
      partnerId: '',
      isFeatured: false,
      isActive: false,
      displayOrder: projects.length + 1,
      metrics: [],
    });
  };

  const handleSelectGalleryImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.currentTarget.files || []);
    if (!files.length) return;
    setPendingGalleryFiles((previous) => [
      ...previous,
      ...files.map((file) => ({ file, previewUrl: URL.createObjectURL(file), caption: '' })),
    ]);
    e.currentTarget.value = '';
  };

  const handleSelectCover = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (!file) return;
    if (coverPreview?.startsWith('blob:')) URL.revokeObjectURL(coverPreview);
    setCoverFile(file);
    setCoverPreview(URL.createObjectURL(file));
    setOperationError(null);
    e.currentTarget.value = '';
  };

  const removePendingGalleryImage = (previewUrl: string) => {
    URL.revokeObjectURL(previewUrl);
    setPendingGalleryFiles((previous) => previous.filter((image) => image.previewUrl !== previewUrl));
  };

  const handleUpdateImageCaption = async (image: ProjectImage, caption: string) => {
    if (caption === (image.caption || '')) return;
    setOperationError(null);
    try {
      await updateProjectImage(image.id, { caption, altText: caption || image.altText });
      setOperationNotice('Screenshot caption updated.');
    } catch (error) {
      setOperationError(`Screenshot caption could not be saved: ${getErrorMessage(error)}`);
    }
  };

  const moveProjectImage = async (image: ProjectImage, direction: -1 | 1) => {
    const index = currentImages.findIndex((current) => current.id === image.id);
    const target = currentImages[index + direction];
    if (!target) return;
    const reordered = [...currentImages];
    [reordered[index], reordered[index + direction]] = [reordered[index + direction], reordered[index]];
    setOperationError(null);
    try {
      await Promise.all(reordered.map((current, order) => updateProjectImage(current.id, { displayOrder: order + 1 })));
      setOperationNotice('Project gallery order updated.');
    } catch (error) {
      setOperationError(`Gallery order could not be saved: ${getErrorMessage(error)}`);
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
              disabled={savingProject}
              onClick={() => {
                releasePreviews();
                setEditingProject(null);
                setIsCreating(false);
                setOperationError(null);
              }}
              className="text-xs text-[#6B7280] hover:text-black"
            >
              Cancel
            </button>
          </div>

          <div role="tablist" aria-label="Project details" className="flex flex-wrap gap-2 border-b border-[#E6DECE] pb-4">
            {([
              ['basic', 'Basic Information'],
              ['media', 'Cover Image & Gallery'],
              ['capabilities', 'Technical Capabilities'],
              ['technologies', 'Technology Stack'],
              ['links', 'Links & Project Status'],
            ] as const).map(([tab, label]) => (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={activeTab === tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-2 text-xs font-semibold border-b-2 transition-colors ${activeTab === tab ? 'border-[#B58A3E] text-[#191C1E]' : 'border-transparent text-[#6B7280] hover:text-[#191C1E]'}`}
              >
                {label}
              </button>
            ))}
          </div>

          {activeTab === 'basic' && <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
          </div>}

          {activeTab === 'basic' && <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
          </div>}

          {activeTab === 'links' && <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#191C1E] mb-1">Project Status</label>
              <select
                value={editingProject.status}
                onChange={(e) => setEditingProject({ ...editingProject, status: e.target.value as ProjectStatus })}
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
          </div>}

          {activeTab === 'media' && <section className="space-y-4 rounded-xl border border-[#E6DECE] bg-white p-4">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#191C1E]">Project Cover Image</h4>
              <p className="mt-1 text-xs text-[#6B7280]">Used on project cards and the project details page.</p>
            </div>
            {(coverPreview || editingProject.thumbnail || editingProject.heroImageUrl) ? (
              <img
                src={coverPreview || editingProject.thumbnail || editingProject.heroImageUrl}
                alt={`${editingProject.name || 'Project'} cover preview`}
                className="aspect-video w-full max-w-2xl rounded-lg border border-[#E6DECE] bg-[#FAF8F5] object-cover"
              />
            ) : (
              <div className="flex aspect-video w-full max-w-2xl items-center justify-center rounded-lg border border-dashed border-[#D8D0C1] bg-[#FAF8F5] text-sm text-[#6B7280]">
                <ImageIcon className="mr-2 h-5 w-5" /> No cover image
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-[#191C1E] px-3 py-2 text-xs font-semibold text-white">
                <Upload className="h-3.5 w-3.5 text-[#C59A4E]" />
                {coverFile ? 'Replace selected image' : 'Upload cover image'}
                <input type="file" accept="image/*" onChange={handleSelectCover} className="hidden" />
              </label>
              {(coverPreview || editingProject.thumbnail || editingProject.heroImageUrl) && (
                <button
                  type="button"
                  onClick={() => {
                    if (coverPreview?.startsWith('blob:')) URL.revokeObjectURL(coverPreview);
                    setCoverFile(null);
                    setCoverPreview(null);
                    setEditingProject({ ...editingProject, thumbnail: '', heroImageUrl: '' });
                  }}
                  className="rounded-lg border border-[#E6DECE] px-3 py-2 text-xs text-[#6B7280] hover:text-red-700"
                >
                  Remove cover
                </button>
              )}
            </div>
          </section>}

          {activeTab === 'basic' && <div>
            <label className="block text-xs font-semibold text-[#191C1E] mb-1">Short Summary (1-2 sentences)</label>
            <input
              type="text"
              required
              value={editingProject.shortDescription}
              onChange={(e) => setEditingProject({ ...editingProject, shortDescription: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg"
            />
          </div>}

          {activeTab === 'basic' && <div>
            <label className="block text-xs font-semibold text-[#191C1E] mb-1">Full Detailed Narrative</label>
            <textarea
              rows={3}
              required
              value={editingProject.fullDescription}
              onChange={(e) => setEditingProject({ ...editingProject, fullDescription: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-white border border-[#E6DECE] rounded-lg resize-none"
            />
          </div>}

          {activeTab === 'basic' && <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
          </div>}

          {activeTab === 'links' && <div className="flex items-center gap-6 pt-2">
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
          </div>}

          {activeTab === 'media' && (
            <div className="p-4 bg-white rounded-xl border border-[#E6DECE] space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-[#191C1E] uppercase tracking-wider">
                  Project Gallery Screenshots ({currentImages.length + pendingGalleryFiles.length})
                </h4>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 p-3 bg-[#FAF8F5] rounded-xl border border-[#E6DECE]">
                <label className="px-3.5 py-1.5 text-xs font-semibold bg-[#191C1E] text-white rounded-lg cursor-pointer flex items-center gap-1.5 shrink-0">
                  <Upload className="w-3.5 h-3.5 text-[#C59A4E]" />
                  <span>Add screenshots</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    disabled={savingProject}
                    onChange={handleSelectGalleryImages}
                    className="hidden"
                  />
                </label>
                <span className="text-xs text-[#6B7280]">Selected files upload when you save the project.</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {currentImages.map((img) => (
                  <div key={img.id} className="overflow-hidden rounded-lg border border-[#E6DECE] bg-white">
                    <div className="relative aspect-16/10 bg-gray-100">
                      <img src={img.imageUrl} alt={img.altText || img.caption || 'Project screenshot'} className="h-full w-full object-cover" />
                    </div>
                    <input
                      type="text"
                      aria-label="Screenshot caption"
                      defaultValue={img.caption || ''}
                      onBlur={(e) => void handleUpdateImageCaption(img, e.target.value)}
                      className="w-full border-b border-[#E6DECE] px-2 py-1.5 text-[11px]"
                      placeholder="Caption"
                    />
                    <div className="flex flex-wrap items-center justify-between gap-1 p-1.5">
                      <div className="flex gap-1">
                        <button type="button" disabled={currentImages[0]?.id === img.id} onClick={() => void moveProjectImage(img, -1)} className="rounded border border-[#E6DECE] px-1.5 py-1 text-[10px] disabled:opacity-40" aria-label="Move screenshot earlier">Up</button>
                        <button type="button" disabled={currentImages[currentImages.length - 1]?.id === img.id} onClick={() => void moveProjectImage(img, 1)} className="rounded border border-[#E6DECE] px-1.5 py-1 text-[10px] disabled:opacity-40" aria-label="Move screenshot later">Down</button>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          if (coverPreview?.startsWith('blob:')) URL.revokeObjectURL(coverPreview);
                          setCoverFile(null);
                          setCoverPreview(img.imageUrl);
                          setEditingProject({ ...editingProject, thumbnail: img.imageUrl, heroImageUrl: img.imageUrl });
                        }}
                        className="px-1.5 py-1 text-[10px] font-semibold text-[#806429]"
                      >
                        Use as cover
                      </button>
                      <button
                        type="button"
                        onClick={async () => {
                          setOperationError(null);
                          try {
                            await deleteProjectImage(img.id);
                            setOperationNotice('Project image deleted successfully.');
                          } catch (error) {
                            setOperationError(`Project image could not be deleted: ${getErrorMessage(error)}`);
                          }
                        }}
                        className="p-1 text-red-700"
                        title="Remove image"
                        aria-label="Remove project screenshot"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
                {pendingGalleryFiles.map((image, index) => (
                  <div key={image.previewUrl} className="overflow-hidden rounded-lg border border-dashed border-[#C59A4E] bg-white">
                    <div className="relative aspect-16/10 bg-gray-100">
                      <img src={image.previewUrl} alt={image.caption || 'Selected project screenshot preview'} className="h-full w-full object-cover" />
                    </div>
                    <input
                      type="text"
                      aria-label="New screenshot caption"
                      value={image.caption}
                      onChange={(e) => setPendingGalleryFiles((previous) => previous.map((item) => item.previewUrl === image.previewUrl ? { ...item, caption: e.target.value } : item))}
                      className="w-full border-b border-[#E6DECE] px-2 py-1.5 text-[11px]"
                      placeholder="Caption"
                    />
                    <div className="flex items-center justify-between gap-1 p-1.5">
                      <div className="flex gap-1">
                        <button type="button" disabled={index === 0} onClick={() => setPendingGalleryFiles((previous) => { const next = [...previous]; [next[index - 1], next[index]] = [next[index], next[index - 1]]; return next; })} className="rounded border border-[#E6DECE] px-1.5 py-1 text-[10px] disabled:opacity-40">Up</button>
                        <button type="button" disabled={index === pendingGalleryFiles.length - 1} onClick={() => setPendingGalleryFiles((previous) => { const next = [...previous]; [next[index + 1], next[index]] = [next[index], next[index + 1]]; return next; })} className="rounded border border-[#E6DECE] px-1.5 py-1 text-[10px] disabled:opacity-40">Down</button>
                      </div>
                      <button type="button" onClick={() => { if (coverPreview?.startsWith('blob:') && coverPreview !== image.previewUrl) URL.revokeObjectURL(coverPreview); setCoverFile(image.file); setCoverPreview(image.previewUrl); setEditingProject({ ...editingProject, thumbnail: '', heroImageUrl: '' }); }} className="px-1.5 py-1 text-[10px] font-semibold text-[#806429]">Use as cover</button>
                      <button type="button" onClick={() => removePendingGalleryImage(image.previewUrl)} className="p-1 text-red-700" aria-label="Remove selected screenshot"><Trash2 className="h-3.5 w-3.5" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'capabilities' && <section className="space-y-4 rounded-xl border border-[#E6DECE] bg-white p-4">
            <div>
              <label className="mb-1 block text-xs font-semibold text-[#191C1E]">Section heading</label>
              <input type="text" value={editingProject.capabilityHeading || ''} onChange={(e) => setEditingProject({ ...editingProject, capabilityHeading: e.target.value })} className="w-full rounded-lg border border-[#E6DECE] px-3 py-2 text-xs" />
            </div>
            <label className="flex items-center gap-2 text-xs text-[#191C1E]">
              <input type="checkbox" checked={editingProject.hideCapabilitiesWhenEmpty ?? true} onChange={(e) => setEditingProject({ ...editingProject, hideCapabilitiesWhenEmpty: e.target.checked })} />
              Hide section when it has no items
            </label>
            {(editingProject.capabilities || editingProject.keyFeatures.map((title): ProjectCapability => ({ title }))).map((capability, index, items) => (
              <div key={`${index}-${capability.title}`} className="grid grid-cols-1 gap-2 rounded-lg border border-[#E6DECE] p-3 sm:grid-cols-[1fr_1.5fr_auto]">
                <input type="text" aria-label="Capability title" value={capability.title} onChange={(e) => setEditingProject({ ...editingProject, capabilities: items.map((item, itemIndex) => itemIndex === index ? { ...item, title: e.target.value } : item), keyFeatures: items.map((item, itemIndex) => itemIndex === index ? e.target.value : item.title) })} className="rounded border border-[#E6DECE] px-2 py-1.5 text-xs" placeholder="Capability" />
                <input type="text" aria-label="Capability description" value={capability.description || ''} onChange={(e) => setEditingProject({ ...editingProject, capabilities: items.map((item, itemIndex) => itemIndex === index ? { ...item, description: e.target.value } : item) })} className="rounded border border-[#E6DECE] px-2 py-1.5 text-xs" placeholder="Optional description" />
                <div className="flex gap-1">
                  <button type="button" disabled={index === 0} onClick={() => { const next = [...items]; [next[index - 1], next[index]] = [next[index], next[index - 1]]; setEditingProject({ ...editingProject, capabilities: next, keyFeatures: next.map((item) => item.title) }); }} className="rounded border border-[#E6DECE] px-2 text-xs disabled:opacity-40">Up</button>
                  <button type="button" disabled={index === items.length - 1} onClick={() => { const next = [...items]; [next[index + 1], next[index]] = [next[index], next[index + 1]]; setEditingProject({ ...editingProject, capabilities: next, keyFeatures: next.map((item) => item.title) }); }} className="rounded border border-[#E6DECE] px-2 text-xs disabled:opacity-40">Down</button>
                  <button type="button" onClick={() => { const next = items.filter((_, itemIndex) => itemIndex !== index); setEditingProject({ ...editingProject, capabilities: next, keyFeatures: next.map((item) => item.title) }); }} className="p-2 text-red-700" aria-label="Remove capability"><Trash2 className="h-3.5 w-3.5" /></button>
                </div>
              </div>
            ))}
            <button type="button" onClick={() => { const items = editingProject.capabilities || editingProject.keyFeatures.map((title) => ({ title })); setEditingProject({ ...editingProject, capabilities: [...items, { title: '' }], keyFeatures: [...items.map((item) => item.title), ''] }); }} className="rounded-lg border border-[#E6DECE] px-3 py-2 text-xs font-semibold">Add capability</button>
          </section>}

          {activeTab === 'technologies' && <section className="space-y-4 rounded-xl border border-[#E6DECE] bg-white p-4">
            <div>
              <label className="mb-1 block text-xs font-semibold text-[#191C1E]">Section heading</label>
              <input type="text" value={editingProject.technologyHeading || ''} onChange={(e) => setEditingProject({ ...editingProject, technologyHeading: e.target.value })} className="w-full rounded-lg border border-[#E6DECE] px-3 py-2 text-xs" />
            </div>
            <label className="flex items-center gap-2 text-xs text-[#191C1E]">
              <input type="checkbox" checked={editingProject.hideTechnologiesWhenEmpty ?? true} onChange={(e) => setEditingProject({ ...editingProject, hideTechnologiesWhenEmpty: e.target.checked })} />
              Hide section when it has no items
            </label>
            {(editingProject.technologyItems || editingProject.technologies.map((name): ProjectTechnology => ({ name }))).map((technology, index, items) => (
              <div key={`${index}-${technology.name}`} className="grid grid-cols-1 gap-2 rounded-lg border border-[#E6DECE] p-3 sm:grid-cols-[1fr_1fr_1fr_auto]">
                <input type="text" aria-label="Technology name" value={technology.name} onChange={(e) => setEditingProject({ ...editingProject, technologyItems: items.map((item, itemIndex) => itemIndex === index ? { ...item, name: e.target.value } : item), technologies: items.map((item, itemIndex) => itemIndex === index ? e.target.value : item.name) })} className="rounded border border-[#E6DECE] px-2 py-1.5 text-xs" placeholder="Technology" />
                <input type="text" aria-label="Technology icon" value={technology.icon || ''} onChange={(e) => setEditingProject({ ...editingProject, technologyItems: items.map((item, itemIndex) => itemIndex === index ? { ...item, icon: e.target.value } : item) })} className="rounded border border-[#E6DECE] px-2 py-1.5 text-xs" placeholder="Optional icon or icon name" />
                <input type="text" aria-label="Technology category" value={technology.category || ''} onChange={(e) => setEditingProject({ ...editingProject, technologyItems: items.map((item, itemIndex) => itemIndex === index ? { ...item, category: e.target.value } : item) })} className="rounded border border-[#E6DECE] px-2 py-1.5 text-xs" placeholder="Optional category" />
                <div className="flex gap-1">
                  <button type="button" disabled={index === 0} onClick={() => { const next = [...items]; [next[index - 1], next[index]] = [next[index], next[index - 1]]; setEditingProject({ ...editingProject, technologyItems: next, technologies: next.map((item) => item.name) }); }} className="rounded border border-[#E6DECE] px-2 text-xs disabled:opacity-40">Up</button>
                  <button type="button" disabled={index === items.length - 1} onClick={() => { const next = [...items]; [next[index + 1], next[index]] = [next[index], next[index + 1]]; setEditingProject({ ...editingProject, technologyItems: next, technologies: next.map((item) => item.name) }); }} className="rounded border border-[#E6DECE] px-2 text-xs disabled:opacity-40">Down</button>
                  <button type="button" onClick={() => { const next = items.filter((_, itemIndex) => itemIndex !== index); setEditingProject({ ...editingProject, technologyItems: next, technologies: next.map((item) => item.name) }); }} className="p-2 text-red-700" aria-label="Remove technology"><Trash2 className="h-3.5 w-3.5" /></button>
                </div>
              </div>
            ))}
            <button type="button" onClick={() => { const items = editingProject.technologyItems || editingProject.technologies.map((name) => ({ name })); setEditingProject({ ...editingProject, technologyItems: [...items, { name: '' }], technologies: [...items.map((item) => item.name), ''] }); }} className="rounded-lg border border-[#E6DECE] px-3 py-2 text-xs font-semibold">Add technology</button>
          </section>}

          <div className="flex justify-end gap-3 pt-4 border-t border-[#E6DECE]">
            <button
              type="button"
              disabled={isCreating || !editingProject.slug}
              onClick={() => window.open(`/projects/${editingProject.slug}?preview=1`, '_blank', 'noopener,noreferrer')}
              className="px-4 py-2 text-xs font-semibold text-[#191C1E] disabled:opacity-40"
            >
              Preview saved project
            </button>
            <button
              type="button"
              disabled={savingProject}
              onClick={() => {
                releasePreviews();
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
          {projects.length === 0 ? (
            <p className="rounded-xl border border-dashed border-[#D8D0C1] px-4 py-10 text-center text-sm text-[#6B7280]">No projects have been added yet.</p>
          ) : projects.map((p) => {
            const count = projectImages.filter((img) => img.projectId === p.id).length;
            return (
              <div
                key={p.id}
                className="p-4 bg-[#FAF8F5] border border-[#E6DECE] rounded-2xl flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {p.thumbnail || p.heroImageUrl ? (
                    <img src={p.thumbnail || p.heroImageUrl} alt={p.name} className="w-12 h-12 rounded-lg object-cover border border-[#E6DECE] shrink-0" />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-[#E6DECE] bg-white"><ImageIcon className="h-4 w-4 text-[#9CA3AF]" /></div>
                  )}
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
                      releasePreviews();
                      setActiveTab('basic');
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
