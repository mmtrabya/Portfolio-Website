import React from 'react';

export const About = () => {
  return (
    <section id="about" className="py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-12">
          {/* About Content */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">About Me</h2>
            <p className="text-gray-300 mb-8">
            I’m an AI Engineering student at Mansoura University with a passion for using AI to solve real-world challenges. 
            As the Founder and Team President of the Connectors Team, I lead 60+ students in AI-driven projects, including Shot-Bot 106, which earned us multiple competition wins. 
            I also founded Octware, an initiative to empower students in AI and Data Science. With experience in robotics, mechatronics, and embedded systems, 
            I’m focused on integrating AI with hardware. 
            Additionally, I’m the PR/FR Director for Hult Prize Mansoura University Campus and have held leadership roles in Startup Grind and the Entrepreneurship Rally.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
