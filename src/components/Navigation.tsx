import React, { useState, useEffect, MouseEvent } from 'react';
import { Menu, X } from 'lucide-react';

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);

  // Custom function to handle smooth scrolling with controlled speed
  const smoothScroll = (target: HTMLElement, duration: number) => {
    const start = window.pageYOffset;
    const end = target.offsetTop;
    const distance = end - start;
    let startTime: number | null = null;

    const scroll = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = easeInOutCubic(timeElapsed, start, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) {
        requestAnimationFrame(scroll);
      }
    };

    const easeInOutCubic = (t: number, b: number, c: number, d: number) => {
      const time = t / (d / 2);
      if (time < 1) return (c / 2) * time * time * time + b;
      const timeAdjusted = time - 2;
      return (c / 2) * (timeAdjusted * timeAdjusted * timeAdjusted + 2) + b;
    };

    requestAnimationFrame(scroll);
  };

  const handleLinkClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    const targetElement = document.querySelector(href) as HTMLElement;
    if (targetElement) {
      smoothScroll(targetElement, 1000); // Duration in ms (1000ms = 1 second)
      setIsOpen(false);
    }
  };

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#experience', label: 'Experience' },
    { href: '#testimonials', label: 'Testimonials' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <a href="#" className="text-white font-bold text-xl">
            Mohammed Tarabay
          </a>

          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-white hover:text-green-500 transition-colors duration-200"
                onClick={(event) => handleLinkClick(event, link.href)}
              >
                {link.label}
              </a>
            ))}
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden fixed inset-0 bg-black bg-opacity-90 z-50">
            <div className="flex flex-col items-center justify-center h-full space-y-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-white text-lg hover:text-green-500 transition-colors duration-200"
                  onClick={(event) => handleLinkClick(event, link.href)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
