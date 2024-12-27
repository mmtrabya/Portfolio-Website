import React from 'react';
import { Github } from 'lucide-react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface ProjectCardProps {
  title: string;
  description: string;
  githubUrl: string;
  image: string;
  isEven: boolean;
}

export const ProjectCard = ({ title, description, githubUrl, image, isEven }: ProjectCardProps) => {
  const ref = useIntersectionObserver();

  return (
    <div
      ref={ref}
      className={`${isEven ? 'slide-in-right' : 'slide-in-left'} 
                 bg-gray-900 rounded-lg overflow-hidden hover:transform 
                 hover:scale-105 transition-all duration-300`}
    >
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-gray-400 mb-4">{description}</p>
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-white hover:text-green-500 
                   transition-colors duration-200"
        >
          <Github size={20} />
          View on GitHub
        </a>
      </div>
    </div>
  );
};