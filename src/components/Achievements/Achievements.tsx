/* import React from 'react';
import { SectionTitle } from '../shared/SectionTitle';
import { AchievementCard } from './AchievementCard';

const achievements = [
  {
    title: 'First Place - AI Hackathon',
    description: 'Developed an innovative AI solution for healthcare diagnostics, winning first place among 50+ teams.',
    date: 'December 2023',
    category: 'Competition'
  },
  {
    title: 'Research Publication',
    description: 'Published research paper on "Deep Learning Applications in Autonomous Systems" in IEEE Conference.',
    date: 'October 2023',
    category: 'Academic'
  },
  {
    title: 'Outstanding Student Award',
    description: 'Received recognition for academic excellence and leadership in AI engineering program.',
    date: 'June 2023',
    category: 'Academic'
  },
  {
    title: 'Robotics Competition Winner',
    description: 'Led team to victory in national robotics competition with innovative SLAM implementation.',
    date: 'March 2023',
    category: 'Competition'
  },
  {
    title: 'AI Project Grant',
    description: 'Secured research grant for developing AI-powered healthcare solutions.',
    date: 'January 2023',
    category: 'Research'
  }
];

export const Achievements = () => {
  return (
    <section id="achievements" className="py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <SectionTitle>Achievements</SectionTitle>
        <div className="max-w-4xl mx-auto grid gap-6">
          {achievements.map((achievement, index) => (
            <AchievementCard key={index} {...achievement} />
          ))}
        </div>
      </div>
    </section>
  );
}; */