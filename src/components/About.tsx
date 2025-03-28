import React from 'react';
import { SectionTitle } from './shared/SectionTitle';

export const About = () => {
  return (
    <section id="about" className="py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-12">
          {/* About Content */}
          <div className="text-center">
            <SectionTitle>About Me</SectionTitle>
            <p className="text-gray-300 mb-8">
              I’m an AI Engineering student at Mansoura University with a passion for using AI to solve real-world challenges.
              As the Founder and Team President of the Connectors Team, I lead 60+ students in AI-driven projects.
              I also founded Octware, an initiative to empower students in AI and Data Science. With experience in robotics, Autonomous, and embedded systems, I’m focused on integrating AI with hardware.
              Additionally, I’m the PR/FR Director for Hult Prize Mansoura University Campus and have held leadership roles in Startup Grind and the Entrepreneurship Rally.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
