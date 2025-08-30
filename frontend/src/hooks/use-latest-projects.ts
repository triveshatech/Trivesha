import { useState, useEffect } from 'react';
import { portfolioAPI } from '@/lib/api';

interface Project {
  _id: string;
  title: string;
  subtitle?: string;
  slug: string;
  description: string;
  image: string;
  results: string[];
  category: string;
  client: string;
  fullImageUrl?: string;
  createdAt: string;
}

interface UseLatestProjectsReturn {
  projects: Project[];
  loading: boolean;
  error: string | null;
}

export const useLatestProjects = (limit: number = 3): UseLatestProjectsReturn => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLatestProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('🔄 Fetching latest projects with limit:', limit);
        const response = await portfolioAPI.getAll({ 
          limit, 
          page: 1
        });

        if (response.data.success) {
          const fetchedProjects = response.data.data.projects;
          console.log('✅ Latest projects fetched:', fetchedProjects.length);
          setProjects(fetchedProjects);
        } else {
          throw new Error('Failed to fetch projects');
        }
      } catch (err: any) {
        console.error('❌ Error fetching latest projects:', err);
        setError(err.message || 'Failed to load projects');
        setProjects([]); // Fallback to empty array
      } finally {
        setLoading(false);
      }
    };

    fetchLatestProjects();
  }, [limit]);

  return { projects, loading, error };
};
