import React from 'react';
import { TimelineCard } from './TimelineCard';
import { SectionTitle } from '../shared/SectionTitle';

const experiences = [
  {
    title: 'DevOps Engineer Intern',
    company: 'Banque Misr',
    period: '07/2025 - Present',
    description: 'Assisting in DevOps practices and cloud infrastructure management.'
  },
  {
    title: 'Team Advisor',
    company: 'Connectors Team',
    period: '07/2025 - Present',
    description: 'Advising and guiding team projects and initiatives.'
  },
  {
    title: 'Embedded Software Engineer Intern',
    company: 'Learn in Depth',
    period: '04/2024 - Present',
    description: 'Developing embedded systems and software solutions.'
  },
  {
    title: 'Embedded Software Engineer & Automotive Cybersecurity Intern',
    company: 'Kernel Masters',
    period: '08/2024 - Present',
    description: 'Working on automotive cybersecurity and embedded systems.'
  },
  {
    title: 'Founder & Team President',
    company: 'Connectors Team',
    period: '04/2023 - 07/2025',
    description: 'Leading and managing team initiatives and projects.'
  },
  {
    title: 'Head of Software',
    company: 'Revive Team',
    period: '08/2024 - 03/2025',
    description: 'Leading software development initiatives and team management.'
  },
  {
    title: 'Vice President',
    company: 'Entrepreneurship Rally Mansoura University Society',
    period: '12/2023 - 03/2025',
    description: 'Previously Entrepreneurs Development Director, now leading entrepreneurship initiatives.'
  },
  {
    title: 'PR/FR Director',
    company: 'Hult Prize Mansoura University Campus',
    period: '11/2024 - 03/2025',
    description: 'Managing public and foreign relations for Hult Prize events.'
  },
  {
    title: 'Mobile App Development Graduate',
    company: 'Digital Egypt Pioneers Initiative (DEPI)',
    period: '03/2024 - 12/2024',
    description: 'Specialized training in mobile application development.'
  },
  {
    title: 'Team Manager & People & Culture Director',
    company: 'Startup Grind Mansoura Chapter',
    period: '04/2024 - 09/2024',
    description: 'Led team operations and managed organizational culture.'
  },
  {
    title: 'Embedded Systems Intern',
    company: 'IMT School',
    period: '09/2023 - 04/2024',
    description: 'Gained hands-on experience in embedded systems development.'
  },
  {
    title: 'Embedded Automotive Intern',
    company: 'Siemens & Eitsal NGO',
    period: '10/2023 - 12/2023',
    description: 'Specialized internship in automotive embedded systems.'
  },
  {
    title: 'AI & IoT Intern',
    company: 'National Telecommunications Institute (NTI)',
    period: '01/2023 - 03/2023',
    description: 'Worked on artificial intelligence and Internet of Things projects.'
  },
  {
    title: 'Founder',
    company: 'Octware',
    period: '01/2022 - Present',
    description: 'Founded and established Octware.'
  }
];

export const Experience = () => {
  return (
    <section id="experience" className="py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <SectionTitle>Experience</SectionTitle>
        <div className="max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <TimelineCard key={index} {...exp} />
          ))}
        </div>
      </div>
    </section>
  );
};