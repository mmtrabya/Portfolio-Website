import React from 'react';
import { LucideIcon } from 'lucide-react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface SkillCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const SkillCard = ({ icon: Icon, title, description }: SkillCardProps) => {
  const ref = useIntersectionObserver();

  return (
    <div
      ref={ref}
      className="animate-on-scroll bg-gray-900 p-6 rounded-lg hover:transform 
                 hover:scale-105 transition-all duration-300 group"
    >
      <div className="mb-4">
        <Icon 
          size={40} 
          className="text-green-500 group-hover:text-green-400 
                     transition-colors duration-300"
        />
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};