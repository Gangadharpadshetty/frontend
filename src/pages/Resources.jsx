import React, { useState, useCallback } from 'react';
import './Resources.css';

const resourcesData = [
  { id: 1, category: 'AI', level: 'beginner', name: 'AI for Beginners', description: 'A beginner-friendly guide to understanding AI concepts and applications.' },
  { id: 2, category: 'Full Stack', level: 'medium', name: 'Full Stack Web Development', description: 'Learn how to build web applications from front-end to back-end.' },
  { id: 3, category: 'Cloud Computing', level: 'advanced', name: 'Advanced Cloud Architecting', description: 'Dive deep into cloud architectures and scalable solutions for enterprises.' },
  { id: 4, category: 'AI', level: 'advanced', name: 'Deep Learning Mastery', description: 'Master advanced deep learning techniques and neural network architectures.' },
  { id: 5, category: 'Full Stack', level: 'beginner', name: 'Intro to Full Stack', description: 'Introduction to full-stack development focusing on HTML, CSS, and JavaScript.' },
];

const Filters = ({ filter, setFilter }) => {
  const handleCategoryChange = (e) => setFilter((prev) => ({ ...prev, category: e.target.value }));
  const handleLevelChange = (e) => setFilter((prev) => ({ ...prev, level: e.target.value }));

  return (
    <div className="filters">
      <select value={filter.category} onChange={handleCategoryChange}>
        <option value="All">All Categories</option>
        <option value="AI">AI</option>
        <option value="Full Stack">Full Stack</option>
        <option value="Cloud Computing">Cloud Computing</option>
      </select>
      <select value={filter.level} onChange={handleLevelChange}>
        <option value="All">All Levels</option>
        <option value="beginner">Beginner</option>
        <option value="medium">Medium</option>
        <option value="advanced">Advanced</option>
      </select>
    </div>
  );
};

const ResourceCard = ({ resource }) => (
  <div className="resource-card">
    <div className="card-content">
      <h3>{resource.name}</h3>
      <p className="category-level">{resource.category} - {resource.level}</p>
      <p className="description">{resource.description}</p>
    </div>
  </div>
);

const Resources = () => {
  const [filter, setFilter] = useState({ category: 'All', level: 'All' });

  const filterResources = useCallback(
    (resources) => {
      return resources.filter((resource) => {
        return (
          (filter.category === 'All' || resource.category === filter.category) &&
          (filter.level === 'All' || resource.level === filter.level)
        );
      });
    },
    [filter]
  );

  const filteredResources = filterResources(resourcesData);

  return (
    <div className="resources-container">
      <h1>Resources</h1>
      <Filters filter={filter} setFilter={setFilter} />
      <div className="resource-cards">
        {filteredResources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </div>
  );
};

export default Resources;
