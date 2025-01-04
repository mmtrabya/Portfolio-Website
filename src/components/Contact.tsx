import React from 'react';
import { Github, Linkedin, Facebook, Instagram, Mail, Phone } from 'lucide-react';

export const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">
          <span className="border-b-4 border-green-500 pb-2">Contact Me</span>
        </h2>
        <div className="flex flex-col items-start gap-8">
          {/* Social Links */}
          <div className="flex flex-col gap-4">
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
          {/* Email and Phone */}
          <div className="flex flex-col gap-4">
            <a
              href="mailto:mohammedtarabay25@outlook.com"
              className="flex items-center gap-2 text-white hover:text-green-500 transition-colors duration-200"
            >
              <Mail size={24} />
              <span>Work: mohammedtarabay25@outlook.com</span>
            </a>
            <a
              href="tel:+201014849994"
              className="flex items-center gap-2 text-white hover:text-green-500 transition-colors duration-200"
            >
              <Phone size={24} />
              <span>Phone: +201014849994</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
