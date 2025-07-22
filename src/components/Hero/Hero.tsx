import React from 'react';
import { HeroImage } from './HeroImage';
import { SocialLinks } from '../shared/SocialLinks';

export const Hero = () => {
  const handleDownloadCV = () => {
    // Replace with your Google Drive direct download link
    const cvUrl = 'https://drive.usercontent.google.com/u/0/uc?id=1iRyljFaEmW57XI0Kw6CkLjyXYxq563YL&export=download';
    window.open(cvUrl, '_blank'); // Opens in new tab (recommended)
  };

  return (
    <section className="pt-[80px] min-h-screen flex items-center bg-black text-white py-0 border-b-[20px] border-green-500">
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center">
              <button
                onClick={handleDownloadCV}
                className="
                  bg-green-600 hover:bg-green-700 text-white font-bold
                  py-3 px-6 rounded-lg transition-all duration-300
                  border-2 border-green-500 hover:border-green-400
                  shadow-lg hover:shadow-green-500/30
                  flex items-center gap-2
                "
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Download CV
              </button>
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