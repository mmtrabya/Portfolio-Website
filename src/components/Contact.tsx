import React from 'react';
import { Github, Linkedin, Facebook, Instagram, Mail } from 'lucide-react';

export const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">
          <span className="border-b-4 border-green-500 pb-2">Contact Me</span>
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          <a
            href="https://github.com/mmtrabya"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white hover:text-green-500 transition-colors duration-200"
          >
            <Github size={24} />
            <span>GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/themohammedtarabay/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white hover:text-green-500 transition-colors duration-200"
          >
            <Linkedin size={24} />
            <span>LinkedIn</span>
          </a>
          <a
            href="https://www.facebook.com/mohamed.tarabay.77/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white hover:text-green-500 transition-colors duration-200"
          >
            <Facebook size={24} />
            <span>Facebook</span>
          </a>
          <a
            href="https://www.instagram.com/themohammedtarabay/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white hover:text-green-500 transition-colors duration-200"
          >
            <Instagram size={24} />
            <span>Instagram</span>
          </a>
        </div>
        <div className="mt-8 flex flex-col items-center gap-4">
          <a
            href="mailto:midotarabay66@gmail.com"
            className="flex items-center gap-2 text-white hover:text-green-500 transition-colors duration-200"
          >
            <Mail size={24} />
            <span>Personal: midotarabay66@gmail.com</span>
          </a>
          <a
            href="mailto:mohammedtarabay25@outlook.com"
            className="flex items-center gap-2 text-white hover:text-green-500 transition-colors duration-200"
          >
            <Mail size={24} />
            <span>Work: mohammedtarabay25@outlook.com</span>
          </a>
          <a
            href="mailto:mohammedtarabay@std.mans.edu.eg"
            className="flex items-center gap-2 text-white hover:text-green-500 transition-colors duration-200"
          >
            <Mail size={24} />
            <span>University: mohammedtarabay@std.mans.edu.eg</span>
          </a>
        </div>
      </div>
    </section>
  );
};