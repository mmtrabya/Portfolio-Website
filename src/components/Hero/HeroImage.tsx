import React from 'react';

export const HeroImage = () => {
  return (
    <div className="relative w-full h-auto md:w-[450px] md:h-auto">
      <img
        src="https://mmtrabya.github.io/Portoflio-Website/67c26305-e25f-4265-b390-a8f550c72952.png"
        alt="Profile"
        className="w-full h-auto object-contain"  // Keep object-contain to avoid cropping
      />
    </div>
  );
};
