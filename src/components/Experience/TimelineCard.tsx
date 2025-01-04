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
    <div
  ref={ref}
  className="relative pl-10 pb-14 group animate-on-scroll"
>
  {/* Vertical Line with a gradient */}
  <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-green-600 to-green-400 group-last:h-6 transition-all duration-300" />

  {/* Circle indicator with glow effect */}
  <div
    className="absolute left-[-10px] top-0 w-6 h-6 rounded-full bg-green-500 
                border-4 border-black group-hover:shadow-[0_0_10px_2px_rgba(34,197,94,0.8)] 
                transition-all duration-300"
  />

  {/* Card Content */}
  <div className="bg-gray-900 p-6 rounded-xl ml-6 shadow-md hover:shadow-lg transition-shadow duration-300">
    <div className="flex items-center gap-4 mb-4">
      {/* Company Logo */}
      <CompanyLogo company={company} />
      <div>
        <h3 className="text-2xl font-semibold leading-tight">{title}</h3>
        <p className="text-green-500 text-sm font-medium">{company}</p>
      </div>
    </div>
    <p className="text-gray-400 text-sm mb-4 italic">{period}</p>
    <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
  </div>
</div>

  );
};
