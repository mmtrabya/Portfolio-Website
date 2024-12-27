import React from 'react';

export const HeroImage = () => {
  return (
    <div className="relative w-150 h-150 md:w-[650px] md:h-[650px]">
      <img
        src="/67c26305-e25f-4265-b390-a8f550c72952.png" // path from public folder
        alt="Profile"
        className="w-full h-full object-contain"
      />
    </div>
  );
};
