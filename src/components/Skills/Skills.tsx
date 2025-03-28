import React from 'react';
import { Brain, Cog, Cpu, Terminal, Smartphone, Server, Car, vehicle} from 'lucide-react';
import { SkillCard } from './SkillCard';
import { SectionTitle } from '../shared/SectionTitle';

const skills = [
  {
    icon: Brain,
    title: 'Artificial Intelligence',
    description: 'Machine Learning, Deep Learning, Neural Networks, and Computer vision'
  },
  {
    icon: Cog,
    title: 'Robotics',
    description: 'Robot Control Systems and Automation'
  },
  {
    icon: Terminal,
    title: 'Autonomous Systems',
    description: 'ROS, SLAM, Navigation, and Path Planning'
  },
  {
    icon: Cpu,
    title: 'Embedded Systems',
    description: 'Arduino, Raspberry Pi, AVR, Embedded C, and RTOS'
  },
  {
    icon: Server,
    title: 'DevOps',
    description: 'CI/CD, Container Orchestration, and Cloud Infrastructure'
  },
  {
    icon: Smartphone,
    title: 'Mobile Development',
    description: 'Cross-platform Mobile Applications, Java, Kotlin, and Flutter'
  },
  {
    icon: Car,
    title: 'Self-Driving Cars',
    description: 'Computer Vision, Sensor Fusion, and Control Systems'
  },
  
];

export const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <SectionTitle>My Skills</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <SkillCard key={index} {...skill} />
          ))}
        </div>
      </div>
    </section>
  );
};