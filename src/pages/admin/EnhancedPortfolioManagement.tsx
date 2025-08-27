import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { portfolioAPI, uploadAPI } from '@/lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { toast } from 'sonner';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Eye, 
  EyeOff, 
  Upload, 
  Star, 
  X,
  Move,
  GripVertical
} from 'lucide-react';

interface Project {
  _id: string;
  title: string;
  subtitle?: string;
  slug?: string;
  description: string;
  longDescription?: string;
  category: string;
  client: string;
  image: string;
  heroImage?: string;
  fullImageUrl?: string;
  tags: string[];
  link?: string;
  externalLink?: string;
  liveUrl?: string;
  featured: boolean;
  status: 'draft' | 'published' | 'archived';
  order: number;
  duration?: string;
  teamSize?: string;
  budget?: string;
  completionDate?: string;
  challenge?: string;
  solution?: string;
  keyResults?: Array<{
    metric: string;
    description: string;
    icon?: string;
  }>;
  technologies?: Array<{
    name: string;
    category: string;
    color?: string;
  }>;
  timeline?: Array<{
    phase: string;
    duration?: string;
    description?: string;
    deliverables?: string[];
  }>;
  features?: string[];
  testimonials?: Array<{
    quote: string;
    author: string;
    position: string;
    company?: string;
    avatar?: string;
  }>;
  images?: string[];
  createdBy: {
    firstName: string;
    lastName: string;
  };
  createdAt: string;
  updatedAt: string;
}

const EnhancedPortfolioManagement: React.FC = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    slug: '',
    description: '',
    longDescription: '',
    category: 'Web Development',
    client: '',
    image: '',
    heroImage: '',
    tags: [] as string[],
    link: '',
    externalLink: '',
    liveUrl: '',
    featured: false,
    status: 'published' as 'draft' | 'published' | 'archived',
    order: 0,
    duration: '',
    teamSize: '',
    budget: '',
    completionDate: '',
    challenge: '',
    solution: '',
    keyResults: [] as Array<{
      metric: string;
      description: string;
      icon?: string;
    }>,
    technologies: [] as Array<{
      name: string;
      category: string;
      color?: string;
    }>,
    timeline: [] as Array<{
      phase: string;
      duration?: string;
      description?: string;
      deliverables?: string[];
    }>,
    features: [] as string[],
    testimonials: [] as Array<{
      quote: string;
      author: string;
      position: string;
      company?: string;
      avatar?: string;
    }>,
    images: [] as string[]
  });

  // Image upload state
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [heroImagePreview, setHeroImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Helper states for dynamic fields
  const [currentTag, setCurrentTag] = useState('');
  const [currentFeature, setCurrentFeature] = useState('');

  // Available icons for key results
  const availableIcons = [
    'trending-up', 'users', 'zap', 'clock', 'dollar-sign', 
    'palette', 'code', 'check-circle'
  ];

  // Technology colors
  const techColors = [
    'text-[#F24E1E]', 'text-[#61DAFB]', 'text-[#3178C6]', 'text-[#06B6D4]',
    'text-[#000000]', 'text-[#635BFF]', 'text-[#47A248]', 'text-[#FF7849]',
    'text-[#2DD4BF]', 'text-[#EAEAEA]'
  ];

  // Fetch projects
  const { data: projectsData, isLoading, error } = useQuery({
    queryKey: ['portfolio-admin', searchTerm, statusFilter, categoryFilter],
    queryFn: async () => {
      console.log('🔐 Making admin portfolio API call');
      console.log('Search:', searchTerm, 'Status:', statusFilter, 'Category:', categoryFilter);
      try {
        const response = await portfolioAPI.getAllAdmin({
          search: searchTerm,
          status: statusFilter === 'all' ? undefined : statusFilter,
          category: categoryFilter === 'all' ? undefined : categoryFilter
        });
        console.log('📦 Admin Portfolio API Success:', response.status, response.data);
        return response;
      } catch (err) {
        console.error('❌ Admin Portfolio API Error:', err);
        throw err;
      }
    },
    staleTime: 30000,
    gcTime: 300000,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  // Handle fetch errors
  useEffect(() => {
    if (error) {
      console.error('Portfolio fetch error:', error);
      if ((error as any).response?.status === 401) {
        toast.error('Authentication required. Please login again.');
      } else {
        toast.error('Failed to fetch projects: ' + ((error as any).response?.data?.message || (error as any).message));
      }
    }
  }, [error]);

  // Reset form when create dialog opens/closes
  useEffect(() => {
    if (isCreateDialogOpen) {
      resetForm();
      setEditingProject(null);
    }
  }, [isCreateDialogOpen]);

  // Ensure form is populated when edit dialog opens
  useEffect(() => {
    if (isEditDialogOpen && editingProject) {
      setFormData({
        title: editingProject.title,
        subtitle: editingProject.subtitle || '',
        slug: editingProject.slug || '',
        description: editingProject.description,
        longDescription: editingProject.longDescription || '',
        category: editingProject.category,
        client: editingProject.client,
        image: editingProject.image,
        heroImage: editingProject.heroImage || '',
        tags: editingProject.tags || [],
        link: editingProject.link || '',
        externalLink: editingProject.externalLink || '',
        liveUrl: editingProject.liveUrl || '',
        featured: editingProject.featured,
        status: editingProject.status,
        order: editingProject.order,
        duration: editingProject.duration || '',
        teamSize: editingProject.teamSize || '',
        budget: editingProject.budget || '',
        completionDate: editingProject.completionDate || '',
        challenge: editingProject.challenge || '',
        solution: editingProject.solution || '',
        keyResults: editingProject.keyResults || [],
        technologies: editingProject.technologies || [],
        timeline: editingProject.timeline || [],
        features: editingProject.features || [],
        testimonials: editingProject.testimonials || [],
        images: editingProject.images || []
      });
      setImagePreview(editingProject.fullImageUrl || editingProject.image || null);
      setHeroImagePreview(editingProject.heroImage || null);
    }
  }, [isEditDialogOpen, editingProject]);

  // Mutations
  const createProjectMutation = useMutation({
    mutationFn: (data: any) => portfolioAPI.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio-admin'] });
      queryClient.invalidateQueries({ queryKey: ['portfolio'] });
      toast.success('Project created successfully');
      setIsCreateDialogOpen(false);
      resetForm();
    },
    onError: (error: any) => {
      const msg = error.response?.data?.message;
      const firstDetail = error.response?.data?.errors?.[0]?.msg;
      toast.error(firstDetail || msg || 'Failed to create project');
    }
  });

  const updateProjectMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => portfolioAPI.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio-admin'] });
      queryClient.invalidateQueries({ queryKey: ['portfolio'] });
      toast.success('Project updated successfully');
      setIsEditDialogOpen(false);
      setEditingProject(null);
      resetForm();
    },
    onError: (error: any) => {
      const msg = error.response?.data?.message;
      const firstDetail = error.response?.data?.errors?.[0]?.msg;
      toast.error(firstDetail || msg || 'Failed to update project');
    }
  });

  const deleteProjectMutation = useMutation({
    mutationFn: (id: string) => portfolioAPI.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio-admin'] });
      queryClient.invalidateQueries({ queryKey: ['portfolio'] });
      toast.success('Project deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete project');
    }
  });

  const resetForm = () => {
    setFormData({
      title: '',
      subtitle: '',
      slug: '',
      description: '',
      longDescription: '',
      category: 'Web Development',
      client: '',
      image: '',
      heroImage: '',
      tags: [],
      link: '',
      externalLink: '',
      liveUrl: '',
      featured: false,
      status: 'published',
      order: 0,
      duration: '',
      teamSize: '',
      budget: '',
      completionDate: '',
      challenge: '',
      solution: '',
      keyResults: [],
      technologies: [],
      timeline: [],
      features: [],
      testimonials: [],
      images: []
    });
    setImagePreview(null);
    setHeroImagePreview(null);
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setIsEditDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingProject) {
      updateProjectMutation.mutate({
        id: editingProject._id,
        data: formData
      });
    } else {
      createProjectMutation.mutate(formData);
    }
  };

  // Helper functions for dynamic fields
  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag('');
    }
  };

  const removeTag = (index: number) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };

  const addFeature = () => {
    if (currentFeature.trim() && !formData.features.includes(currentFeature.trim())) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, currentFeature.trim()]
      }));
      setCurrentFeature('');
    }
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const addKeyResult = () => {
    setFormData(prev => ({
      ...prev,
      keyResults: [...prev.keyResults, { metric: '', description: '', icon: 'trending-up' }]
    }));
  };

  const updateKeyResult = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      keyResults: prev.keyResults.map((result, i) => 
        i === index ? { ...result, [field]: value } : result
      )
    }));
  };

  const removeKeyResult = (index: number) => {
    setFormData(prev => ({
      ...prev,
      keyResults: prev.keyResults.filter((_, i) => i !== index)
    }));
  };

  const addTechnology = () => {
    setFormData(prev => ({
      ...prev,
      technologies: [...prev.technologies, { name: '', category: '', color: 'text-[#2DD4BF]' }]
    }));
  };

  const updateTechnology = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.map((tech, i) => 
        i === index ? { ...tech, [field]: value } : tech
      )
    }));
  };

  const removeTechnology = (index: number) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter((_, i) => i !== index)
    }));
  };

  const addTimelinePhase = () => {
    setFormData(prev => ({
      ...prev,
      timeline: [...prev.timeline, { phase: '', duration: '', description: '', deliverables: [] }]
    }));
  };

  const updateTimelinePhase = (index: number, field: string, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      timeline: prev.timeline.map((phase, i) => 
        i === index ? { ...phase, [field]: value } : phase
      )
    }));
  };

  const removeTimelinePhase = (index: number) => {
    setFormData(prev => ({
      ...prev,
      timeline: prev.timeline.filter((_, i) => i !== index)
    }));
  };

  const addTestimonial = () => {
    setFormData(prev => ({
      ...prev,
      testimonials: [...prev.testimonials, { quote: '', author: '', position: '', company: '', avatar: '' }]
    }));
  };

  const updateTestimonial = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      testimonials: prev.testimonials.map((testimonial, i) => 
        i === index ? { ...testimonial, [field]: value } : testimonial
      )
    }));
  };

  const removeTestimonial = (index: number) => {
    setFormData(prev => ({
      ...prev,
      testimonials: prev.testimonials.filter((_, i) => i !== index)
    }));
  };

  // Image upload handler
  const handleImageUpload = async (file: File, type: 'main' | 'hero' | 'gallery') => {
    setIsUploading(true);
    try {
      const res = await uploadAPI.uploadImage(file);
      const url = res.data?.data?.url;
      if (url) {
        if (type === 'main') {
          setFormData(prev => ({ ...prev, image: url }));
          setImagePreview(url);
        } else if (type === 'hero') {
          setFormData(prev => ({ ...prev, heroImage: url }));
          setHeroImagePreview(url);
        } else if (type === 'gallery') {
          setFormData(prev => ({ ...prev, images: [...prev.images, url] }));
        }
        toast.success('Image uploaded successfully');
      } else {
        toast.error('Upload succeeded but no URL returned');
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Image upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  // Extract projects with multiple fallback paths
  const projects = projectsData?.data?.data?.projects || projectsData?.data?.projects || [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-500';
      case 'draft': return 'bg-yellow-500';
      case 'archived': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Portfolio Management</h1>
          <p className="text-gray-400 mt-2">Manage your portfolio projects with rich content and dynamic templates</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <Button 
            className="bg-teal-600 hover:bg-teal-700"
            onClick={() => {
              resetForm();
              setEditingProject(null);
              setIsCreateDialogOpen(true);
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Project
          </Button>
          <DialogContent className="max-w-[95vw] lg:max-w-6xl max-h-[95vh] overflow-y-auto p-0">
            <div className="p-6 pb-0">
              <DialogHeader>
                <DialogTitle>Add New Project</DialogTitle>
                <DialogDescription>
                  Create a comprehensive portfolio project with rich content for dynamic detail pages.
                </DialogDescription>
              </DialogHeader>
            </div>
            <div className="px-6 pb-6">
              <ProjectForm
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleSubmit}
                isLoading={createProjectMutation.isPending}
                imagePreview={imagePreview}
                heroImagePreview={heroImagePreview}
                isUploading={isUploading}
                onImageUpload={handleImageUpload}
                onCancel={() => setIsCreateDialogOpen(false)}
                // Helper functions
                currentTag={currentTag}
                setCurrentTag={setCurrentTag}
                addTag={addTag}
                removeTag={removeTag}
                currentFeature={currentFeature}
                setCurrentFeature={setCurrentFeature}
                addFeature={addFeature}
                removeFeature={removeFeature}
                addKeyResult={addKeyResult}
                updateKeyResult={updateKeyResult}
                removeKeyResult={removeKeyResult}
                addTechnology={addTechnology}
                updateTechnology={updateTechnology}
                removeTechnology={removeTechnology}
                addTimelinePhase={addTimelinePhase}
                updateTimelinePhase={updateTimelinePhase}
                removeTimelinePhase={removeTimelinePhase}
                addTestimonial={addTestimonial}
                updateTestimonial={updateTestimonial}
                removeTestimonial={removeTestimonial}
                availableIcons={availableIcons}
                techColors={techColors}
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Search</Label>
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All categories</SelectItem>
                  {['Web Design', 'Web Development', 'Mobile Apps', 'Games', 'Maintenance', 'Featured'].map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Projects List */}
      {isLoading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Card key={i} className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-6">
                <div className="h-6 bg-gray-700 rounded animate-pulse mb-2" />
                <div className="h-4 bg-gray-700 rounded animate-pulse w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((project: Project) => (
            <Card key={project._id} className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="w-20 h-20 bg-gray-700 rounded overflow-hidden flex-shrink-0">
                      {(project.fullImageUrl || project.image) && (
                        <img
                          src={project.fullImageUrl || project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-semibold text-white truncate">{project.title}</h3>
                        {project.featured && <Star className="h-4 w-4 text-yellow-400" />}
                        {project.slug && (
                          <Badge variant="outline" className="text-xs">
                            /{project.slug}
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-400 text-sm mb-2 line-clamp-2">{project.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Client: {project.client}</span>
                        <span>Category: {project.category}</span>
                        <span>Created: {new Date(project.createdAt).toLocaleDateString()}</span>
                      </div>
                      {/* Rich content indicators */}
                      <div className="flex items-center space-x-2 mt-2">
                        {project.keyResults && project.keyResults.length > 0 && (
                          <Badge variant="secondary" className="text-xs">
                            {project.keyResults.length} Results
                          </Badge>
                        )}
                        {project.technologies && project.technologies.length > 0 && (
                          <Badge variant="secondary" className="text-xs">
                            {project.technologies.length} Tech
                          </Badge>
                        )}
                        {project.timeline && project.timeline.length > 0 && (
                          <Badge variant="secondary" className="text-xs">
                            {project.timeline.length} Phases
                          </Badge>
                        )}
                        {project.testimonials && project.testimonials.length > 0 && (
                          <Badge variant="secondary" className="text-xs">
                            {project.testimonials.length} Testimonials
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={`${getStatusColor(project.status)} text-white`}>
                      {project.status}
                    </Badge>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(project)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="outline" className="text-red-400 hover:text-red-300">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Project</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{project.title}"? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteProjectMutation.mutate(project._id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {projects.length === 0 && !isLoading && (
        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-12 text-center">
            <h3 className="text-lg font-semibold text-white mb-2">No projects found</h3>
            <p className="text-gray-400 mb-4">
              {searchTerm || statusFilter || categoryFilter 
                ? 'Try adjusting your filters to see more projects.'
                : 'Get started by creating your first portfolio project.'
              }
            </p>
            {!searchTerm && !statusFilter && !categoryFilter && (
              <Button onClick={() => {
                resetForm();
                setEditingProject(null);
                setIsCreateDialogOpen(true);
              }}>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Project
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-[95vw] lg:max-w-6xl max-h-[95vh] overflow-y-auto p-0">
          <div className="p-6 pb-0">
            <DialogHeader>
              <DialogTitle>Edit Project</DialogTitle>
              <DialogDescription>
                Update project details and rich content for dynamic pages.
              </DialogDescription>
            </DialogHeader>
          </div>
          <div className="px-6 pb-6">
            <ProjectForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
              isLoading={updateProjectMutation.isPending}
              imagePreview={imagePreview}
              heroImagePreview={heroImagePreview}
              isUploading={isUploading}
              onImageUpload={handleImageUpload}
              onCancel={() => setIsEditDialogOpen(false)}
              isEdit={true}
              // Helper functions
              currentTag={currentTag}
              setCurrentTag={setCurrentTag}
              addTag={addTag}
              removeTag={removeTag}
              currentFeature={currentFeature}
              setCurrentFeature={setCurrentFeature}
              addFeature={addFeature}
              removeFeature={removeFeature}
              addKeyResult={addKeyResult}
              updateKeyResult={updateKeyResult}
              removeKeyResult={removeKeyResult}
              addTechnology={addTechnology}
              updateTechnology={updateTechnology}
              removeTechnology={removeTechnology}
              addTimelinePhase={addTimelinePhase}
              updateTimelinePhase={updateTimelinePhase}
              removeTimelinePhase={removeTimelinePhase}
              addTestimonial={addTestimonial}
              updateTestimonial={updateTestimonial}
              removeTestimonial={removeTestimonial}
              availableIcons={availableIcons}
              techColors={techColors}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Separate ProjectForm component to reduce complexity
interface ProjectFormProps {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  imagePreview: string | null;
  heroImagePreview: string | null;
  isUploading: boolean;
  onImageUpload: (file: File, type: 'main' | 'hero' | 'gallery') => Promise<void>;
  onCancel: () => void;
  isEdit?: boolean;
  // Helper functions
  currentTag: string;
  setCurrentTag: React.Dispatch<React.SetStateAction<string>>;
  addTag: () => void;
  removeTag: (index: number) => void;
  currentFeature: string;
  setCurrentFeature: React.Dispatch<React.SetStateAction<string>>;
  addFeature: () => void;
  removeFeature: (index: number) => void;
  addKeyResult: () => void;
  updateKeyResult: (index: number, field: string, value: string) => void;
  removeKeyResult: (index: number) => void;
  addTechnology: () => void;
  updateTechnology: (index: number, field: string, value: string) => void;
  removeTechnology: (index: number) => void;
  addTimelinePhase: () => void;
  updateTimelinePhase: (index: number, field: string, value: string | string[]) => void;
  removeTimelinePhase: (index: number) => void;
  addTestimonial: () => void;
  updateTestimonial: (index: number, field: string, value: string) => void;
  removeTestimonial: (index: number) => void;
  availableIcons: string[];
  techColors: string[];
}

const ProjectForm: React.FC<ProjectFormProps> = ({
  formData,
  setFormData,
  onSubmit,
  isLoading,
  imagePreview,
  heroImagePreview,
  isUploading,
  onImageUpload,
  onCancel,
  isEdit = false,
  currentTag,
  setCurrentTag,
  addTag,
  removeTag,
  currentFeature,
  setCurrentFeature,
  addFeature,
  removeFeature,
  addKeyResult,
  updateKeyResult,
  removeKeyResult,
  addTechnology,
  updateTechnology,
  removeTechnology,
  addTimelinePhase,
  updateTimelinePhase,
  removeTimelinePhase,
  addTestimonial,
  updateTestimonial,
  removeTestimonial,
  availableIcons,
  techColors
}) => {
  const [activeTab, setActiveTab] = useState('basic');
  
  // Tab validation and completion tracking
  const validateTab = (tab: string) => {
    switch (tab) {
      case 'basic':
        return formData.title && formData.description && formData.client;
      case 'content':
        return formData.longDescription || 
               formData.challenge || 
               formData.solution || 
               formData.keyResults.length > 0 || 
               formData.features.length > 0;
      case 'media':
        return formData.image;
      case 'technical':
        return formData.technologies.length > 0 || 
               formData.timeline.length > 0;
      case 'social':
        return formData.testimonials.length > 0;
      default:
        return false;
    }
  };

  // Calculate completion percentage
  const getCompletionPercentage = () => {
    const totalSections = 5;
    const completedSections = ['basic', 'content', 'media', 'technical', 'social'].filter(validateTab).length;
    return Math.round((completedSections / totalSections) * 100);
  };

  const getTabStatus = (tab: string) => {
    if (validateTab(tab)) return '✓';
    
    // Check if tab has some content but isn't fully complete
    switch (tab) {
      case 'basic':
        if (formData.title || formData.description || formData.client) return '⚠';
        break;
      case 'content':
        if (formData.longDescription || formData.challenge || formData.solution || 
            formData.keyResults.length > 0 || formData.features.length > 0) return '⚠';
        break;
      case 'media':
        if (formData.image) return '✓';
        if (formData.heroImage || formData.images.length > 0) return '⚠';
        break;
      case 'technical':
        if (formData.technologies.length > 0 || formData.timeline.length > 0) return '✓';
        break;
      case 'social':
        if (formData.testimonials.length > 0) return '✓';
        break;
    }
    
    // Required sections that are incomplete
    if (tab === 'basic' || tab === 'media') return '!';
    
    return '';
  };

  return (
    <form onSubmit={onSubmit} className="w-full">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* Responsive Tab Layout */}
        <div className="mb-6">
          {/* Desktop Tabs */}
          <TabsList className="hidden lg:grid w-full grid-cols-5 h-auto">
            {[
              { value: 'basic', label: 'Basic Info', icon: '📝' },
              { value: 'content', label: 'Rich Content', icon: '📋' },
              { value: 'media', label: 'Media', icon: '🖼️' },
              { value: 'technical', label: 'Technical', icon: '⚙️' },
              { value: 'social', label: 'Social Proof', icon: '💬' }
            ].map((tab) => (
              <TabsTrigger 
                key={tab.value} 
                value={tab.value}
                className="flex-col gap-1 py-3 data-[state=active]:bg-teal-600 data-[state=active]:text-white"
              >
                <div className="flex items-center gap-1">
                  <span>{tab.icon}</span>
                  <span className="text-xs font-medium">{getTabStatus(tab.value)}</span>
                </div>
                <span className="text-xs">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Mobile Tabs - Dropdown Style */}
          <div className="lg:hidden">
            <Select value={activeTab} onValueChange={setActiveTab}>
              <SelectTrigger className="w-full">
                <SelectValue>
                  <div className="flex items-center gap-2">
                    <span>
                      {activeTab === 'basic' && '📝 Basic Info'}
                      {activeTab === 'content' && '📋 Rich Content'}
                      {activeTab === 'media' && '🖼️ Media'}
                      {activeTab === 'technical' && '⚙️ Technical'}
                      {activeTab === 'social' && '💬 Social Proof'}
                    </span>
                    <span className="text-xs">{getTabStatus(activeTab)}</span>
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {[
                  { value: 'basic', label: 'Basic Info', icon: '📝' },
                  { value: 'content', label: 'Rich Content', icon: '📋' },
                  { value: 'media', label: 'Media', icon: '🖼️' },
                  { value: 'technical', label: 'Technical', icon: '⚙️' },
                  { value: 'social', label: 'Social Proof', icon: '💬' }
                ].map((tab) => (
                  <SelectItem key={tab.value} value={tab.value}>
                    <div className="flex items-center gap-2">
                      <span>{tab.icon}</span>
                      <span>{tab.label}</span>
                      <span className="text-xs ml-auto">{getTabStatus(tab.value)}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Progress Indicator */}
          <div className="mt-4 flex justify-between text-xs text-gray-500">
            <span>Step {['basic', 'content', 'media', 'technical', 'social'].indexOf(activeTab) + 1} of 5</span>
            <span>Required fields marked with *</span>
          </div>
        </div>

        <TabsContent value="basic" className="space-y-4 mt-6">
          {/* Responsive Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="flex items-center gap-1">
                Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Project title"
                maxLength={100}
                required
                className="text-base" // Better touch target
              />
              <p className="text-xs text-gray-500">
                {formData.title.length}/100 characters
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subtitle">Subtitle</Label>
              <Input
                id="subtitle"
                value={formData.subtitle}
                onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
                placeholder="Project subtitle"
                maxLength={200}
                className="text-base"
              />
              <p className="text-xs text-gray-500">
                {formData.subtitle.length}/200 characters
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">URL Slug</Label>
            <Input
              id="slug"
              value={formData.slug}
              onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
              placeholder="project-url-slug"
              className="text-base"
            />
            <p className="text-xs text-gray-500">Leave empty to auto-generate from title</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="flex items-center gap-1">
              Card Short Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Brief project description for cards and listings"
              rows={3}
              maxLength={1000}
              required
              className="text-base resize-none"
            />
            <p className="text-xs text-gray-500">
              {formData.description.length}/1000 characters
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="longDescription">Detailed Description</Label>
            <Textarea
              id="longDescription"
              value={formData.longDescription}
              onChange={(e) => setFormData(prev => ({ ...prev, longDescription: e.target.value }))}
              placeholder="Comprehensive project description for detail page"
              rows={4}
              maxLength={2000}
              className="text-base resize-none"
            />
            <p className="text-xs text-gray-500">
              {formData.longDescription.length}/2000 characters
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category" className="flex items-center gap-1">
                Category <span className="text-red-500">*</span>
              </Label>
              <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                <SelectTrigger className="text-base">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {['Web Design', 'Web Development', 'Mobile Apps', 'Games', 'Maintenance', 'Featured'].map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="client" className="flex items-center gap-1">
                Client <span className="text-red-500">*</span>
              </Label>
              <Input
                id="client"
                value={formData.client}
                onChange={(e) => setFormData(prev => ({ ...prev, client: e.target.value }))}
                placeholder="Client name"
                maxLength={100}
                required
                className="text-base"
              />
              <p className="text-xs text-gray-500">
                {formData.client.length}/100 characters
              </p>
            </div>
          </div>

          {/* Responsive Project Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                placeholder="4 months"
                className="text-base"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="teamSize">Team Size</Label>
              <Input
                id="teamSize"
                value={formData.teamSize}
                onChange={(e) => setFormData(prev => ({ ...prev, teamSize: e.target.value }))}
                placeholder="5 professionals"
                className="text-base"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="budget">Budget</Label>
              <Input
                id="budget"
                value={formData.budget}
                onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                placeholder="₹8,50,000"
                className="text-base"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="completionDate">Completion Date</Label>
              <Input
                id="completionDate"
                value={formData.completionDate}
                onChange={(e) => setFormData(prev => ({ ...prev, completionDate: e.target.value }))}
                placeholder="March 2024"
                className="text-base"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="link">Internal Link</Label>
              <Input
                id="link"
                value={formData.link}
                onChange={(e) => setFormData(prev => ({ ...prev, link: e.target.value }))}
                placeholder="/portfolio/project-slug"
                className="text-base"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="externalLink">External Link</Label>
              <Input
                id="externalLink"
                value={formData.externalLink}
                onChange={(e) => setFormData(prev => ({ ...prev, externalLink: e.target.value }))}
                placeholder="https://example.com"
                className="text-base"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="liveUrl">Live URL</Label>
              <Input
                id="liveUrl"
                value={formData.liveUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, liveUrl: e.target.value }))}
                placeholder="https://live-project.com"
                className="text-base"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
            <div className="space-y-2">
              <Label htmlFor="status" className="flex items-center gap-1">
                Status <span className="text-red-500">*</span>
              </Label>
              <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value as 'draft' | 'published' | 'archived' }))}>
                <SelectTrigger className="text-base">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2 mt-8">
              <Checkbox
                id="featured"
                checked={formData.featured}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked as boolean }))}
              />
              <Label htmlFor="featured">Featured Project</Label>
            </div>
          </div>

          {/* Tags - Improved Mobile Layout */}
          <div className="space-y-3">
            <Label>Project Tags</Label>
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  placeholder="Add a tag"
                  className="text-base flex-1"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                />
                <Button 
                  type="button" 
                  onClick={addTag} 
                  variant="outline" 
                  className="sm:w-auto w-full"
                  disabled={!currentTag.trim()}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Tag
                </Button>
              </div>
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1 px-3 py-1">
                      <span>{tag}</span>
                      <X 
                        className="h-3 w-3 cursor-pointer hover:text-red-500" 
                        onClick={() => removeTag(index)} 
                      />
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="content" className="space-y-6 mt-6">
          {/* Challenge & Solution - Responsive Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="challenge">Project Challenge</Label>
              <Textarea
                id="challenge"
                value={formData.challenge}
                onChange={(e) => setFormData(prev => ({ ...prev, challenge: e.target.value }))}
                placeholder="Describe the main challenge or problem this project addressed"
                rows={4}
                className="text-base resize-none"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="solution">Our Solution</Label>
              <Textarea
                id="solution"
                value={formData.solution}
                onChange={(e) => setFormData(prev => ({ ...prev, solution: e.target.value }))}
                placeholder="Describe your solution approach and methodology"
                rows={4}
                className="text-base resize-none"
              />
            </div>
          </div>

          {/* Key Results - Improved Mobile Layout */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <Label className="text-lg font-medium">Key Results & Metrics</Label>
                <p className="text-sm text-gray-500">Quantifiable outcomes and achievements</p>
              </div>
              <Button 
                type="button" 
                onClick={addKeyResult} 
                variant="outline" 
                size="sm"
                className="w-full sm:w-auto"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Result
              </Button>
            </div>
            
            {formData.keyResults.length === 0 ? (
              <Card className="p-6 text-center border-dashed">
                <p className="text-gray-500 mb-3">No key results added yet</p>
                <Button type="button" onClick={addKeyResult} variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Result
                </Button>
              </Card>
            ) : (
              <div className="space-y-4">
                {formData.keyResults.map((result, index) => (
                  <Card key={index} className="p-4 border-l-4 border-l-teal-500">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Metric Value</Label>
                          <Input
                            value={result.metric}
                            onChange={(e) => updateKeyResult(index, 'metric', e.target.value)}
                            placeholder="45% or 150k+"
                            className="text-base"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Description</Label>
                          <Input
                            value={result.description}
                            onChange={(e) => updateKeyResult(index, 'description', e.target.value)}
                            placeholder="Increase in conversion rate"
                            className="text-base"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Icon</Label>
                          <div className="flex gap-2">
                            <Select 
                              value={result.icon} 
                              onValueChange={(value) => updateKeyResult(index, 'icon', value)}
                            >
                              <SelectTrigger className="text-base flex-1">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {availableIcons.map(icon => (
                                  <SelectItem key={icon} value={icon}>{icon}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <Button 
                              type="button" 
                              onClick={() => removeKeyResult(index)} 
                              variant="outline" 
                              size="sm"
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Features - Improved Mobile Layout */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <Label className="text-lg font-medium">Features Implemented</Label>
                <p className="text-sm text-gray-500">Key features and functionalities delivered</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  value={currentFeature}
                  onChange={(e) => setCurrentFeature(e.target.value)}
                  placeholder="Add a key feature"
                  className="text-base flex-1"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                />
                <Button 
                  type="button" 
                  onClick={addFeature} 
                  variant="outline"
                  className="sm:w-auto w-full"
                  disabled={!currentFeature.trim()}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Feature
                </Button>
              </div>
              
              {formData.features.length === 0 ? (
                <Card className="p-4 text-center border-dashed">
                  <p className="text-gray-500">No features added yet</p>
                </Card>
              ) : (
                <div className="space-y-2">
                  {formData.features.map((feature, index) => (
                    <Card key={index} className="p-3 border-l-4 border-l-blue-500">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                          <span className="text-sm flex-1">{feature}</span>
                        </div>
                        <Button 
                          type="button" 
                          onClick={() => removeFeature(index)} 
                          variant="outline" 
                          size="sm"
                          className="text-red-500 hover:text-red-700 flex-shrink-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="media" className="space-y-6 mt-6">
          {/* Main Project Image - Improved Mobile Layout */}
          <div className="space-y-3">
            <div>
              <Label className="text-lg font-medium flex items-center gap-1">
                Main Project Image <span className="text-red-500">*</span>
              </Label>
              <p className="text-sm text-gray-500">Primary image shown in project cards and hero sections</p>
            </div>
            
            <Card className="p-6">
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-gray-500 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="image-upload"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        await onImageUpload(file, 'main');
                      }
                    }}
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    {imagePreview ? (
                      <div className="space-y-3">
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="w-full max-w-sm h-32 sm:h-48 object-cover rounded-lg mx-auto"
                        />
                        <p className="text-sm text-gray-400">Click to change image</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <Upload className="h-12 w-12 mx-auto text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-400 mb-1">
                            {isUploading ? 'Uploading...' : 'Click to upload main image'}
                          </p>
                          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        </div>
                      </div>
                    )}
                  </label>
                </div>
                
                {isUploading && (
                  <div className="text-center">
                    <div className="inline-flex items-center gap-2 text-sm text-blue-400">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400"></div>
                      Uploading image to Cloudinary...
                    </div>
                  </div>
                )}
                
                {formData.image && !imagePreview && (
                  <div className="text-center">
                    <img 
                      src={formData.image} 
                      alt="Current" 
                      className="w-full max-w-sm h-32 sm:h-48 object-cover rounded-lg mx-auto"
                    />
                    <p className="text-xs text-gray-500 mt-2">Current main image</p>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Hero Image - Improved Layout */}
          <div className="space-y-3">
            <div>
              <Label className="text-lg font-medium">Hero Image</Label>
              <p className="text-sm text-gray-500">Large banner image for the project detail page (optional)</p>
            </div>
            
            <Card className="p-6">
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-gray-500 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="hero-image-upload"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        await onImageUpload(file, 'hero');
                      }
                    }}
                  />
                  <label htmlFor="hero-image-upload" className="cursor-pointer">
                    {heroImagePreview ? (
                      <div className="space-y-3">
                        <img 
                          src={heroImagePreview} 
                          alt="Hero Preview" 
                          className="w-full max-w-md h-32 sm:h-40 object-cover rounded-lg mx-auto"
                        />
                        <p className="text-sm text-gray-400">Click to change hero image</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <Upload className="h-10 w-10 mx-auto text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-400 mb-1">
                            {isUploading ? 'Uploading...' : 'Click to upload hero image'}
                          </p>
                          <p className="text-xs text-gray-500">Recommended: 1200x600px or larger</p>
                        </div>
                      </div>
                    )}
                  </label>
                </div>
                
                {formData.heroImage && !heroImagePreview && (
                  <div className="text-center">
                    <img 
                      src={formData.heroImage} 
                      alt="Current Hero" 
                      className="w-full max-w-md h-32 sm:h-40 object-cover rounded-lg mx-auto"
                    />
                    <p className="text-xs text-gray-500 mt-2">Current hero image</p>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Project Gallery - Improved Mobile Layout */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <Label className="text-lg font-medium">Project Gallery</Label>
                <p className="text-sm text-gray-500">Additional images showcasing different aspects of the project</p>
              </div>
              <div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="gallery-upload"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      await onImageUpload(file, 'gallery');
                    }
                  }}
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  asChild
                  className="w-full sm:w-auto"
                >
                  <label htmlFor="gallery-upload" className="cursor-pointer">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Image
                  </label>
                </Button>
              </div>
            </div>
            
            {formData.images.length === 0 ? (
              <Card className="p-8 text-center border-dashed">
                <div className="space-y-3">
                  <div className="w-16 h-16 mx-auto bg-gray-100 rounded-lg flex items-center justify-center">
                    <Upload className="h-8 w-8 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-gray-500 mb-2">No gallery images added yet</p>
                    <Button type="button" variant="outline" size="sm" asChild>
                      <label htmlFor="gallery-upload" className="cursor-pointer">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Your First Image
                      </label>
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="p-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img 
                        src={image} 
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-20 sm:h-24 object-cover rounded border group-hover:opacity-75 transition-opacity"
                      />
                      <Button
                        type="button"
                        onClick={() => setFormData(prev => ({
                          ...prev,
                          images: prev.images.filter((_, i) => i !== index)
                        }))}
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-500 hover:bg-red-600 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        size="sm"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-3 text-center">
                  {formData.images.length} image{formData.images.length !== 1 ? 's' : ''} in gallery
                </p>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="technical" className="space-y-6 mt-6">
          {/* Technologies - Improved Mobile Layout */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <Label className="text-lg font-medium">Technologies Used</Label>
                <p className="text-sm text-gray-500">Technical stack and tools utilized in the project</p>
              </div>
              <Button 
                type="button" 
                onClick={addTechnology} 
                variant="outline" 
                size="sm"
                className="w-full sm:w-auto"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Technology
              </Button>
            </div>
            
            {formData.technologies.length === 0 ? (
              <Card className="p-6 text-center border-dashed">
                <div className="space-y-3">
                  <div className="w-12 h-12 mx-auto bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">⚙️</span>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-3">No technologies added yet</p>
                    <Button type="button" onClick={addTechnology} variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Your First Technology
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              <div className="space-y-4">
                {formData.technologies.map((tech, index) => (
                  <Card key={index} className="p-4 border-l-4 border-l-purple-500">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Technology Name</Label>
                          <Input
                            value={tech.name}
                            onChange={(e) => updateTechnology(index, 'name', e.target.value)}
                            placeholder="React, Node.js, MongoDB"
                            className="text-base"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Category</Label>
                          <Input
                            value={tech.category}
                            onChange={(e) => updateTechnology(index, 'category', e.target.value)}
                            placeholder="Frontend, Backend, Database"
                            className="text-base"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Display Color</Label>
                          <div className="flex gap-2">
                            <Select 
                              value={tech.color} 
                              onValueChange={(value) => updateTechnology(index, 'color', value)}
                            >
                              <SelectTrigger className="text-base flex-1">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {techColors.map(color => (
                                  <SelectItem key={color} value={color}>
                                    <div className="flex items-center gap-2">
                                      <div className={`w-4 h-4 rounded-full bg-current ${color}`}></div>
                                      <span>{color.replace('text-', '').replace('[', '').replace(']', '')}</span>
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <Button 
                              type="button" 
                              onClick={() => removeTechnology(index)} 
                              variant="outline" 
                              size="sm"
                              className="text-red-500 hover:text-red-700 flex-shrink-0"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      {/* Preview */}
                      {tech.name && (
                        <div className="pt-2 border-t">
                          <p className="text-xs text-gray-500 mb-2">Preview:</p>
                          <div className="flex items-center gap-2">
                            <span className={`text-sm font-medium ${tech.color || 'text-gray-500'}`}>
                              {tech.name}
                            </span>
                            {tech.category && (
                              <Badge variant="outline" className="text-xs">
                                {tech.category}
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Timeline - Improved Mobile Layout */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <Label className="text-lg font-medium">Project Timeline</Label>
                <p className="text-sm text-gray-500">Development phases and milestones</p>
              </div>
              <Button 
                type="button" 
                onClick={addTimelinePhase} 
                variant="outline" 
                size="sm"
                className="w-full sm:w-auto"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Phase
              </Button>
            </div>
            
            {formData.timeline.length === 0 ? (
              <Card className="p-6 text-center border-dashed">
                <div className="space-y-3">
                  <div className="w-12 h-12 mx-auto bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">📅</span>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-3">No timeline phases added yet</p>
                    <Button type="button" onClick={addTimelinePhase} variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Your First Phase
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              <div className="space-y-4">
                {formData.timeline.map((phase, index) => (
                  <Card key={index} className="p-4 border-l-4 border-l-green-500">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-green-600">
                          Phase {index + 1}
                        </span>
                        <Button 
                          type="button" 
                          onClick={() => removeTimelinePhase(index)} 
                          variant="outline" 
                          size="sm"
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Phase Name</Label>
                          <Input
                            value={phase.phase}
                            onChange={(e) => updateTimelinePhase(index, 'phase', e.target.value)}
                            placeholder="Research & Discovery"
                            className="text-base"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Duration</Label>
                          <Input
                            value={phase.duration || ''}
                            onChange={(e) => updateTimelinePhase(index, 'duration', e.target.value)}
                            placeholder="3 weeks"
                            className="text-base"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Phase Description</Label>
                        <Textarea
                          value={phase.description || ''}
                          onChange={(e) => updateTimelinePhase(index, 'description', e.target.value)}
                          placeholder="Detailed description of what happens in this phase"
                          rows={2}
                          maxLength={300}
                          className="text-base resize-none"
                        />
                        <p className="text-xs text-gray-500">
                          {(phase.description || '').length}/300 characters
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Key Deliverables</Label>
                        <Textarea
                          value={phase.deliverables?.join('\n') || ''}
                          onChange={(e) => updateTimelinePhase(index, 'deliverables', e.target.value.split('\n').filter(Boolean))}
                          placeholder="User personas&#10;Journey maps&#10;Technical audit"
                          rows={3}
                          className="text-base resize-none"
                        />
                        <p className="text-xs text-gray-500">Enter one deliverable per line</p>
                      </div>
                      
                      {/* Preview deliverables */}
                      {phase.deliverables && phase.deliverables.length > 0 && (
                        <div className="pt-2 border-t">
                          <p className="text-xs text-gray-500 mb-2">Deliverables preview:</p>
                          <div className="space-y-1">
                            {phase.deliverables.map((deliverable, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-sm">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0"></div>
                                <span>{deliverable}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="social" className="space-y-6 mt-6">
          {/* Testimonials - Improved Mobile Layout */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <Label className="text-lg font-medium">Client Testimonials</Label>
                <p className="text-sm text-gray-500">Feedback and testimonials from clients about this project</p>
              </div>
              <Button 
                type="button" 
                onClick={addTestimonial} 
                variant="outline" 
                size="sm"
                className="w-full sm:w-auto"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Testimonial
              </Button>
            </div>
            
            {formData.testimonials.length === 0 ? (
              <Card className="p-8 text-center border-dashed">
                <div className="space-y-4">
                  <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-3xl">💬</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-700 mb-2">No testimonials added yet</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Client testimonials add credibility and showcase the impact of your work
                    </p>
                    <Button type="button" onClick={addTestimonial} variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Your First Testimonial
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              <div className="space-y-6">
                {formData.testimonials.map((testimonial, index) => (
                  <Card key={index} className="p-6 border-l-4 border-l-blue-500">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">💬</span>
                          <span className="text-sm font-medium text-blue-600">
                            Testimonial {index + 1}
                          </span>
                        </div>
                        <Button 
                          type="button" 
                          onClick={() => removeTestimonial(index)} 
                          variant="outline" 
                          size="sm"
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Testimonial Quote</Label>
                          <Textarea
                            value={testimonial.quote}
                            onChange={(e) => updateTestimonial(index, 'quote', e.target.value)}
                            placeholder="The redesign exceeded our expectations and significantly improved our user engagement..."
                            rows={4}
                            maxLength={500}
                            className="text-base resize-none"
                          />
                          <p className="text-xs text-gray-500">
                            {testimonial.quote.length}/500 characters
                          </p>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Author Name</Label>
                            <Input
                              value={testimonial.author}
                              onChange={(e) => updateTestimonial(index, 'author', e.target.value)}
                              placeholder="Priya Sharma"
                              className="text-base"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Position/Title</Label>
                            <Input
                              value={testimonial.position}
                              onChange={(e) => updateTestimonial(index, 'position', e.target.value)}
                              placeholder="CEO & Founder"
                              className="text-base"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Company</Label>
                            <Input
                              value={testimonial.company || ''}
                              onChange={(e) => updateTestimonial(index, 'company', e.target.value)}
                              placeholder="Fashion Forward"
                              className="text-base"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Avatar URL (Optional)</Label>
                          <Input
                            value={testimonial.avatar || ''}
                            onChange={(e) => updateTestimonial(index, 'avatar', e.target.value)}
                            placeholder="https://example.com/avatar.jpg"
                            className="text-base"
                          />
                          <p className="text-xs text-gray-500">
                            Direct link to profile image or upload to your media library
                          </p>
                        </div>
                      </div>
                      
                      {/* Testimonial Preview */}
                      {(testimonial.quote || testimonial.author) && (
                        <div className="pt-4 border-t bg-gray-50 rounded-lg p-4">
                          <p className="text-xs text-gray-500 mb-3">Preview:</p>
                          <div className="space-y-3">
                            {testimonial.quote && (
                              <blockquote className="text-sm italic text-gray-700 border-l-2 border-blue-500 pl-3">
                                "{testimonial.quote}"
                              </blockquote>
                            )}
                            <div className="flex items-center gap-3">
                              {testimonial.avatar ? (
                                <img 
                                  src={testimonial.avatar} 
                                  alt={testimonial.author}
                                  className="w-8 h-8 rounded-full object-cover"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none';
                                  }}
                                />
                              ) : (
                                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                                  <span className="text-xs text-gray-600">
                                    {testimonial.author ? testimonial.author.charAt(0).toUpperCase() : '?'}
                                  </span>
                                </div>
                              )}
                              <div className="text-sm">
                                <p className="font-medium text-gray-800">{testimonial.author || 'Author Name'}</p>
                                <p className="text-gray-600">
                                  {testimonial.position}
                                  {testimonial.company && testimonial.position && ' at '}
                                  {testimonial.company}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Enhanced Action Bar with Better Progress */}
      <div className="sticky bottom-0 bg-gray-900/95 backdrop-blur-sm border-t border-gray-700 -mx-6 px-6 py-4 mt-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          {/* Enhanced Progress Section */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-sm text-gray-400">Progress:</span>
              <div className="flex gap-1">
                {['basic', 'content', 'media', 'technical', 'social'].map((tab, index) => (
                  <div
                    key={tab}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      validateTab(tab) ? 'bg-green-500' : 'bg-gray-600'
                    }`}
                    title={`${tab.charAt(0).toUpperCase() + tab.slice(1)} section ${validateTab(tab) ? 'completed' : 'incomplete'}`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-green-400">
                  {['basic', 'content', 'media', 'technical', 'social'].filter(validateTab).length}/5 sections completed
                </span>
                <span className="text-xs text-gray-500">
                  ({getCompletionPercentage()}%)
                </span>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
              <div 
                className="bg-gradient-to-r from-teal-500 to-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${getCompletionPercentage()}%` }}
              />
            </div>
            
            {/* Status Messages */}
            <div className="text-xs text-gray-500">
              {!validateTab('basic') && (
                <span className="text-yellow-400">
                  Complete basic info (title, description, client) to continue
                </span>
              )}
              {validateTab('basic') && !validateTab('media') && (
                <span className="text-yellow-400">
                  Add a main project image to enable publishing
                </span>
              )}
              {validateTab('basic') && validateTab('media') && getCompletionPercentage() < 100 && (
                <span className="text-blue-400">
                  Add content, technologies, or testimonials for a richer project page
                </span>
              )}
              {getCompletionPercentage() === 100 && (
                <span className="text-green-400">
                  Excellent! All sections completed 🎉
                </span>
              )}
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading || !validateTab('basic') || !validateTab('media')}
              className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  {isEdit ? 'Updating...' : 'Creating...'}
                </div>
              ) : (
                <span>{isEdit ? 'Update Project' : 'Create Project'}</span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EnhancedPortfolioManagement;
