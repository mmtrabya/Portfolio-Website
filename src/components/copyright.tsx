import React from 'react';

export const Copyrights = () => {
  return (
    <footer className="w-full text-center py-4 bg-gray-800 text-white">
      <p>© {new Date().getFullYear()} Mohammed Tarabay. All rights reserved.</p>
    </footer>
  );
};
