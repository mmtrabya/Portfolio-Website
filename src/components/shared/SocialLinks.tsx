import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

interface SocialLinksProps {
  className?: string;
}

export const SocialLinks = ({ className = '' }: SocialLinksProps) => {
  return (
    <div className={`flex gap-6 ${className}`}>
      <a
        href="https://github.com/mmtrabya"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:text-green-500 transition-colors duration-200"
      >
        <Github size={24} />
      </a>
      <a
        href="https://linkedin.com/in/themohammedtarabay"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:text-green-500 transition-colors duration-200"
      >
        <Linkedin size={24} />
      </a>
      <a
        href="mailto:mohammedtarabay25@outlook.com.com"
        className="text-white hover:text-green-500 transition-colors duration-200"
      >
        <Mail size={24} />
      </a>
    </div>
  );
};