import React from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { CompanyLogo } from './CompanyLogo';

interface TimelineCardProps {
  title: string;
  company: string;
  period: string;
  description: string;
}

export const TimelineCard = ({ title, company, period, description }: TimelineCardProps) => {
  const ref = useIntersectionObserver();

  return (
    <div ref={ref} className="relative pl-8 pb-12 group animate-on-scroll">
      <div className="absolute left-0 top-0 w-2 h-full bg-green-600 group-last:h-6" />
      <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-green-500 
                    border-4 border-black group-hover:bg-green-400 transition-colors duration-300" />
      <div className="bg-gray-900 p-6 rounded-lg ml-4">
        <div className="flex items-center gap-4 mb-4">
          <CompanyLogo company={company} />
          <div>
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="text-green-500">{company}</p>
          </div>
        </div>
        <p className="text-gray-400 text-sm mb-4">{period}</p>
        <p className="text-gray-300">{description}</p>
      </div>
    </div>
  );
};