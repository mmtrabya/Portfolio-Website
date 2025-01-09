import React from 'react';
import { HeroImage } from './HeroImage';
import { SocialLinks } from '../shared/SocialLinks';

export const Hero = () => {
  return (
    <section className="pt-[80px] min-h-screen flex items-center bg-black text-white py-0 border-b-[20px] border-green-500">
      {/* Added pt-[80px] to prevent overlapping with navbar */}
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              Mohammed Tarabay
            </h1>
            <h2 className="text-xl md:text-2xl mb-4 text-green-500">
              Artificial Intelligence Engineer
            </h2>
            <p className="text-lg mb-8 text-gray-300">
              Crafting Intelligent Solutions through Code and Innovation
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <SocialLinks className="justify-center md:justify-start" />
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center mt-[170px]">
            <HeroImage />
          </div>
        </div>
      </div>
    </section>
  );
};
