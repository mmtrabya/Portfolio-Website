import React from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills/Skills';
import { Education } from './components/Education';
import { Experience } from './components/Experience/Experience';
import { Projects } from './components/Projects/Projects';
import { Certificates } from './components/Certificates/certificates';
/* import { Achievements } from './components/Achievements/Achievements'; */
import { Testimonials } from './components/Testimonials/Testimonials';
import { Contact } from './components/Contact';
import { Copyrights }  from './components/copyright';
import './styles/animations.css';

function App() {
  return (
    <div className="bg-black">
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Education />
      <Experience />
      <Projects />
      <Certificates />
{/*       <Achievements /> */}
      <Testimonials />
      <Contact />
      <Copyrights />
    </div>
  );
}
export default App;