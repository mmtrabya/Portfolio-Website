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
    <div className="bg-gray-900 p-6 rounded-lg relative shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Quote Icon in the Bottom Left */}
      <Quote
        className="absolute bottom-4 right-4 text-green-600 opacity-20"
        size={40}
      />

      {/* Testimonial Text */}
      <p className="text-gray-300 italic mb-6 relative z-10">“{text}”</p>

      {/* Author and Role */}
      <div className="flex items-center gap-4">
        <div>
          <p className="text-green-500 font-semibold">{author}</p>
          <p className="text-white text-sm italic">{role}</p>
        </div>
      </div>
    </div>
  );
};