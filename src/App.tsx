import React from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero/Hero';
import { Skills } from './components/Skills/Skills';
import { Projects } from './components/Projects/Projects';
import { Experience } from './components/Experience/Experience';
/* import { Testimonials } from './components/Testimonials/Testimonials'; */
import { Contact } from './components/Contact';
import './styles/animations.css';
import { Copyrights } from './components/copyright';
import { About } from './components/About';

function App() {
  return (
    <div className="bg-black">
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      {/* <Testimonials /> */}
      <Contact />
      <Copyrights />
    </div>
  );
}

export default App;