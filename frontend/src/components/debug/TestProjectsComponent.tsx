import React from 'react';
import { useLatestProjects } from '@/hooks/use-latest-projects';

const TestProjectsComponent = () => {
  const { projects, loading, error } = useLatestProjects(3);

  return (
    <div style={{ padding: '20px', background: '#f0f0f0', margin: '20px', borderRadius: '8px' }}>
      <h3>Debug: Latest Projects Hook</h3>
      <p><strong>Loading:</strong> {loading ? 'Yes' : 'No'}</p>
      <p><strong>Error:</strong> {error || 'None'}</p>
      <p><strong>Projects Count:</strong> {projects.length}</p>
      {projects.length > 0 && (
        <div>
          <h4>Projects:</h4>
          <ul>
            {projects.map((project, index) => (
              <li key={project._id}>
                {index + 1}. {project.title} - {project.category}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TestProjectsComponent;
