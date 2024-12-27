import React from 'react';
import { ProjectCard } from './ProjectCard';
import { SectionTitle } from '../shared/SectionTitle';

const projects = [
  {
    title: 'Autonomous SLAM Robot',
    description: 'Hospital Mapping and Delivery Robot using ROS and SLAM techniques',
    githubUrl: 'https://github.com/mmtrabya/autords',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=500&h=300'
  },
  {
    title: 'ResNet50 Plant Disease Detection',
    description: 'Deep learning model for detecting plant diseases using ResNet50 architecture',
    githubUrl: 'https://github.com/mmtrabya/ResNet50_Plant_Disease_Detection',
    image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=500&h=300'
  },
  {
    title: 'Telegram Bot',
    description: 'Automated Telegram bot for enhanced user interaction',
    githubUrl: 'https://github.com/mmtrabya/Telegram-Bot',
    image: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=500&h=300'
  },
  {
    title: 'Apache Spark Recommender',
    description: 'Movie recommendation system using Apache Spark and MovieLens dataset',
    githubUrl: 'https://github.com/mmtrabya/Apache-Recommender-MovieLens',
    image: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=500&h=300'
  }
];

export const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <SectionTitle>Featured Projects</SectionTitle>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} isEven={index % 2 === 0} />
          ))}
        </div>
      </div>
    </section>
  );
};