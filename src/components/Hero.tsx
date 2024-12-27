import React from 'react';
import { ArrowDown, Download } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-black text-white relative">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
          John Doe
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-300">
          AI Engineer & Machine Learning Specialist
        </p>
        <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto text-gray-400">
          Building the future of artificial intelligence, one project at a time.
        </p>
        <a
          href="/cv.pdf"
          className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 
                     text-white font-semibold rounded-lg transition-colors duration-200"
        >
          <Download className="mr-2" size={20} />
          Download CV
        </a>
      </div>
      <div className="absolute bottom-8 w-full text-center animate-bounce">
        <ArrowDown className="mx-auto" size={32} />
      </div>
    </section>
  );
};