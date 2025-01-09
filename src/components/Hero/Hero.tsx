import React, { useEffect } from 'react';
import { HeroImage } from './HeroImage';
import { SocialLinks } from '../shared/SocialLinks';

export const Hero = () => {
  useEffect(() => {
    const canvas = document.getElementById('matrixCanvas') as HTMLCanvasElement;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const fontSize = 10;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(0);

    const matrixEffect = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height); // Clear the canvas with slight transparency

      ctx.fillStyle = '#0F0'; // Green color
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const character = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(character, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;

        drops[i]++;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const interval = setInterval(matrixEffect, 33);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <section className="relative pt-[80px] min-h-screen flex items-center bg-black text-white py-0 border-b-[20px] border-green-500">
      {/* Matrix Canvas Background */}
      <canvas id="matrixCanvas" className="absolute top-0 left-0 z-0 w-full h-full" />
      
      <div className="container mx-auto px-4 z-10">
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
          <div className="md:w-1/2 flex justify-center mt-10 md:mt-0">
            <HeroImage />
          </div>
        </div>
      </div>
    </section>
  );
};
