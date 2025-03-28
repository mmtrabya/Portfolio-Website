import React from 'react';
import { SectionTitle } from './shared/SectionTitle';
import { GraduationCap } from 'lucide-react';

export const Education = () => {
  return (
    <section id="education" className="py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <SectionTitle>Education</SectionTitle>
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-900 p-8 rounded-lg">
            <div className="flex items-start gap-6">
              <div className="p-3 bg-green-600 rounded-lg">
                <GraduationCap size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Mansoura University</h3>
                <p className="text-green-500 text-lg mb-2">
                  Bachelor of Engineering, Artificial Intelligence Engineering
                </p>
                <p className="text-gray-400">Score: 3.4 (B+)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}