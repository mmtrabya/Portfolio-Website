import React from 'react';
import { Building2, Rocket, GraduationCap, Code, Cpu, Brain } from 'lucide-react';

interface CompanyLogoProps {
  company: string;
  className?: string;
}

export const CompanyLogo = ({ company, className = '' }: CompanyLogoProps) => {
  const getLogoComponent = () => {
    switch (company.toLowerCase()) {
      case 'connectors team':
        return <Rocket className="text-green-500" />;
      case 'learn in depth':
        return <Code className="text-green-500" />;
      case 'kernel masters':
        return <Cpu className="text-green-500" />;
      case 'revive team':
        return <Brain className="text-green-500" />;
      case 'entrepreneurship rally mansoura university society':
        return <GraduationCap className="text-green-500" />;
      case 'hult prize mansoura university campus':
        return <GraduationCap className="text-green-500" />;
      case 'depi':
        return <Code className="text-green-500" />;
      case 'startup grind mansoura chapter':
        return <Rocket className="text-green-500" />;
      case 'imt school':
        return <GraduationCap className="text-green-500" />;
      case 'octware':
        return <Building2 className="text-green-500" />;
      default:
        return <Building2 className="text-green-500" />;
    }
  };

  return (
    <div className={`w-8 h-8 flex items-center justify-center ${className}`}>
      {getLogoComponent()}
    </div>
  );
};