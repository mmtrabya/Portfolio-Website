import React from 'react';
import { SectionTitle } from '../shared/SectionTitle';
import { AchievementCard } from './AchievementCard';

const achievements = [
  {
    title: '1st Place Winners In MOYS Incubation',
    description: 'Continuing the Journey of Shot-Bot 106, We Entered A first-of-Kind Incubation and Qualified among 20 other Teams from 87 team Applied for the Incubation Sponsored by The Minister of Youth & Sports Dr. Ashraf Sobhy and the Ministry of Youth and Sports and won first place in the Incubation with a Grand Prize of 200K EGP for Developing, Building and Fabricating the Complete Solution that will take the game of Basketball into a whole new era of evolution The Project was Developed under the name of Student Activity Teams Connectors & Luminous',
    date: '2024',
    category: 'Competition',
  },
  {
    title: '3rd Place Winners in Benha University Hackathon for Empowering People of Determination',
    description: 'I was the team leader for the project Shoot-Bot 106 which is made by two powerful teams Connectors & Luminous, My team and I managed to grab the 3rd place in this competition among 30 other teams which qualified from 195 teams in the competition We won 3rd Place in the (Health & Sports) track and 3rd in the whole competition ',
    date: '2024',
    category: 'Competition',
  },
  {
    title: 'Two Times Best Student in Student Activities',
    date: '2022 & 2023',
    category: 'Student Activities',
  },
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
};