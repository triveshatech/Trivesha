import axios from 'axios';

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://trivedia-flow-backend.vercel.app/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important for CORS with credentials
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('❌ API Error:', error.config?.method?.toUpperCase(), error.config?.url, error.response?.status);
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (data: any) => api.post('/auth/register', data),
  login: (data: any) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  getProfile: () => api.get('/auth/me'),
  updateProfile: (data: any) => api.put('/auth/profile', data),
  changePassword: (data: any) => api.put('/auth/change-password', data),
};

// Pricing API
export const pricingAPI = {
  // Public endpoints
  getPlans: () => api.get('/pricing'),
  
  // Admin endpoints
  getAdminPlans: () => api.get('/pricing/admin'),
  getPlan: (id: string) => api.get(`/pricing/admin/${id}`),
  createPlan: (data: any) => api.post('/pricing/admin', data),
  updatePlan: (id: string, data: any) => api.put(`/pricing/admin/${id}`, data),
  togglePopular: (id: string) => api.patch(`/pricing/admin/${id}/popular`),
  deletePlan: (id: string) => api.delete(`/pricing/admin/${id}`),
  restorePlan: (id: string) => api.patch(`/pricing/admin/${id}/restore`),
  reorderPlans: (plans: Array<{ id: string; order: number }>) => 
    api.patch('/pricing/admin/reorder', { plans }),
};

// Admin API
export const adminAPI = {
  getUsers: (params?: any) => api.get('/admin/users', { params }),
  getUser: (id: string) => api.get(`/admin/users/${id}`),
  createUser: (data: any) => api.post('/admin/users', data),
  updateUser: (id: string, data: any) => api.put(`/admin/users/${id}`, data),
  deleteUser: (id: string) => api.delete(`/admin/users/${id}`),
  getStats: () => api.get('/admin/stats'),
  getRecentActivity: (params?: any) => api.get('/admin/recent-activity', { params }),
};

// Portfolio API
export const portfolioAPI = {
  // Public endpoints
  getAll: async (params?: any) => {
    console.log('📡 Portfolio getAll called with params:', params);
    return api.get('/portfolio', { params });
  },
  getById: (id: string) => api.get(`/portfolio/${id}`),
  getBySlug: (slug: string) => api.get(`/portfolio/slug/${slug}`),
  getFeatured: async () => {
    console.log('📡 Portfolio getFeatured called');
    return api.get('/portfolio', { params: { featured: 'true', limit: 1 } });
  },
  getCategories: async () => {
    console.log('📡 Portfolio getCategories called');
    return api.get('/portfolio/categories');
  },
  
  // Admin endpoints
  getAllAdmin: async (params?: any) => {
    console.log('📡 Portfolio getAllAdmin called with params:', params);
    console.log('🔑 Current auth token:', localStorage.getItem('token') ? 'Present' : 'Missing');
    return api.get('/portfolio/admin/all', { params });
  },
  create: (data: any) => api.post('/portfolio', data),
  update: (id: string, data: any) => api.put(`/portfolio/${id}`, data),
  delete: (id: string) => api.delete(`/portfolio/${id}`),
  bulkUpdateStatus: (data: any) => api.patch('/portfolio/bulk-status', data),
  reorder: (data: any) => api.patch('/portfolio/reorder', data),
};

// Content API
export const contentAPI = {
  getAll: () => api.get('/content'),
  getSection: (section: string) => api.get(`/content/${section}`),
  updateSection: (section: string, data: any) => api.put(`/content/${section}`, { data }),
  createSection: (section: string, data: any) => api.post('/content', { section, data }),
  deleteSection: (section: string) => api.delete(`/content/${section}`),
  getSchema: (section: string) => api.get(`/content/schema/${section}`),
};

// Upload API
export const uploadAPI = {
  uploadImage: (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    return api.post('/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  uploadImages: (files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => formData.append('images', file));
    return api.post('/upload/images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  deleteFile: (filename: string) => api.delete(`/upload/${filename}`),
  getFiles: (params?: any) => api.get('/upload/files', { params }),
};

// Contact API
export const contactAPI = {
  // Public endpoints
  submitForm: (data: any) => api.post('/contact', data),
  
  // Admin endpoints
  getAll: (params?: any) => api.get('/contact/admin', { params }),
  getById: (id: string) => api.get(`/contact/admin/${id}`),
  update: (id: string, data: any) => api.put(`/contact/admin/${id}`, data),
  delete: (id: string) => api.delete(`/contact/admin/${id}`),
  getStats: () => api.get('/contact/admin/stats'),
};

export default api;
