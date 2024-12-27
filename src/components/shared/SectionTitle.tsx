import React, { ReactNode } from 'react';

interface SectionTitleProps {
  children: ReactNode;
}

export const SectionTitle = ({ children }: SectionTitleProps) => {
  return (
    <h2 className="text-3xl font-bold mb-12 text-center">
      <span className="border-b-4 border-green-500 pb-2">{children}</span>
    </h2>
  );
};