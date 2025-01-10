import React from 'react';
import { Quote } from 'lucide-react';

interface TestimonialCardProps {
  text: string;
  author: string;
  role: string;
  image?: string;
}

export const TestimonialCard = ({ text, author, role }: TestimonialCardProps) => {
  return (
    <div
      className="bg-gray-900 p-8 rounded-lg relative shadow-md hover:shadow-lg transition-shadow duration-300 w-[735px] h-[300px]"
    >
      {/* Quote Icon in the Bottom Right */}
      <Quote
        className="absolute bottom-6 right-6 text-green-600 opacity-20"
        size={50}
      />

      {/* Testimonial Text */}
      <div className="relative z-10 h-[160px] overflow-y-auto scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-gray-700">
        <p className="text-gray-300 italic text-lg leading-relaxed">“{text}”</p>
      </div>

      {/* Author and Role */}
      <div className="flex items-center gap-4 mt-6">
        <div>
          <p className="text-green-500 font-semibold text-lg">{author}</p>
          <p className="text-white text-sm italic">{role}</p>
        </div>
      </div>
    </div>
  );
};
