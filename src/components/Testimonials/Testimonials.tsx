import React from 'react';
import { TestimonialCard } from './TestimonialCard';
import { SectionTitle } from '../shared/SectionTitle';

const testimonials = [
  {
    text: "I have had the opportunity to observe Mohammed Tarabay's work in Machine Learning, Embedded Systems, and Mobile Application Development. His deep understanding of these fields, coupled with his evident passion and dedication, is truly remarkable. He consistently demonstrates a strong work ethic and a commitment to producing high-quality results. I am confident that Mohammed Tarabay would be a valuable asset to any team.",
    author: "Mohammed Wael Elsamman",
    role: "Data Engineer, DEPI Graduate",
  },
  {
    text: "During the Benha University Hackathon, despite being a competitor, his technical expertise and collaborative spirit stood out. Mohammed supported us in our project, Roaia, providing valuable insights into Embedded Systems that helped us integrate Hardware like the Raspberry Pi and Sensors effectively. Achieving third place out of two hundred teams highlights his exceptional skills and dedication to innovation. We were truly delighted and honored to work with him and get to know him during this experience.",
    author: "Shehab Lotfallah",
    role: "Software Engineer, .NET Web Developer, C#, ASP.NET Core, MVC, API",
  },
  {
    text: "Mohammed has helped us at Startup grind building our community, organized our team and Circles properly as the people & culture director and Team Manager. He is a great leader and high-value person helping the members and directors connect better and understand each other.",
    author: "Alaa Fawzy",
    role: "Video editor, Media director @Startup Grind Mansoura Chapter",
  },
  {
    text: "You have shown remarkable dedication and effort in your studies, it’s truly inspiring. I'm really proud of your progress, You're improving every day. You have such a creative mind! Your ideas are always so unique. You contribute so much to class discussions and Your input is always valuable. I appreciate how actively you participate, as It makes the class more engaging. Your collaboration skills are outstanding, You make group work so much easier. You never give up, even when things get tough. That’s a fantastic quality. You handle challenges with such a positive attitude. Keep going. Wishing you a thriving career and endless opportunities for growth. May you achieve all your goals and continue to excel in your field.",
    author: "Hager Hamdy",
    role: "Teaching Assistant, Embedded Systems Engineer",
  }
];

export const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 bg-black text-white parallax" data-speed="0.3">
      <div className="container mx-auto px-4">
        <SectionTitle>Testimonials</SectionTitle>
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div className="parallax" data-speed="0.5" key={index}>
              <TestimonialCard {...testimonial} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
