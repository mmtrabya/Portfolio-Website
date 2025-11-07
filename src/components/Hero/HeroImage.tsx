import React from 'react';

export const HeroImage = () => {
  return (
    <div className="relative w-full h-auto max-w-[350px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] xl:max-w-[650px] mx-auto">
      <img
        src={`${import.meta.env.BASE_URL}hero.png`}
        alt="Profile"
        className="w-full h-auto object-contain"  // Keep object-contain to avoid cropping
      />
    </div>
  );
};
