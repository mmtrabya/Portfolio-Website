import React from 'react';
import { Trophy } from 'lucide-react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface AchievementCardProps {
  title: string;
  description: string;
  date: string;
  category: string;
}

export const AchievementCard = ({ 
  title, 
  description, 
  date, 
  category 
}: AchievementCardProps) => {
  const ref = useIntersectionObserver();

  return (
    <div
      ref={ref}
      className="animate-on-scroll bg-gray-900 p-6 rounded-lg hover:transform 
                 hover:scale-105 transition-all duration-300 group"
    >
      <div className="flex items-start gap-4">
        <div className="p-3 bg-green-600 rounded-lg group-hover:bg-green-500 
                      transition-colors duration-300">
          <Trophy size={24} />
        </div>
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-bold">{title}</h3>
            <span className="text-sm text-green-500 px-2 py-1 bg-green-900/30 rounded-full">
              {category}
            </span>
          </div>
          <p className="text-gray-400 mb-2 italic">{description}</p>
          <p className="text-sm text-gray-500">{date}</p>
        </div>
      </div>
    </div>
  );
};