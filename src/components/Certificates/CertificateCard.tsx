import React from 'react';
import { Award, ExternalLink } from 'lucide-react';

interface CertificateCardProps {
  title: string;
  organization: string;
  certificateId?: string;
  certificateUrl: string;
}

export const CertificateCard = ({ 
  title, 
  organization, 
  certificateId, 
  certificateUrl 
}: CertificateCardProps) => {
  return (
    <div className="bg-gray-900 p-6 rounded-lg hover:transform hover:scale-105 
                    transition-all duration-300 group">
      <div className="flex items-start gap-4">
        <Award className="text-green-500 group-hover:text-green-400 
                         transition-colors duration-300" size={24} />
        <div className="flex-1">
          <h3 className="text-lg font-bold mb-2">{title}</h3>
          <p className="text-green-500 mb-2">{organization}</p>
          <p className="text-gray-400 text-sm mb-4 italic">ID: {certificateId}</p>
          <a
            href={certificateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white hover:text-green-500 
                     transition-colors duration-200"
          >
            <ExternalLink size={16} />
            View Certificate
          </a>
        </div>
      </div>
    </div>
  );
}