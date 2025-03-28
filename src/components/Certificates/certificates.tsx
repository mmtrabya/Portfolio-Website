import React from 'react';
import { SectionTitle } from '../shared/SectionTitle';
import { CertificateCard } from './CertificateCard';

const certificates = [
  {
    title: 'Delivering Quality Work with Agility',
    organization: 'IBM',
    certificateId: 'WZL56QUCW4SX',
    certificateUrl: 'https://www.coursera.org/account/accomplishments/verify/WZL56QUCW4SX',
  },
  {
    title: 'Process Data from Dirty to Clean',
    organization: 'Google',
    certificateId: 'D535FCSSH6XV',
    certificateUrl: 'https://www.coursera.org/account/accomplishments/certificate/D535FCSSH6XV',
  },
  {
    title: 'Neural Networks and Deep Learning',
    organization: 'DeepLearning.AI',
    certificateId: 'B24SQFG7QHNA',
    certificateUrl: 'https://www.coursera.org/account/accomplishments/certificate/B24SQFG7QHNA',
  },
  {
    title: 'Process Data from Dirty to Clean',
    organization: 'Google',
    certificateId: 'MN6T82MDV4DD',
    certificateUrl: 'https://www.coursera.org/account/accomplishments/certificate/MN6T82MDV4DD',
  },
  {
    title: 'Ask Questions to Make Data-Driven Decisions',
    organization: 'Google',
    certificateId: 'AFXKTVJWMUPB',
    certificateUrl: 'https://www.coursera.org/account/accomplishments/certificate/AFXKTVJWMUPB',
  },
  {
    title: 'Foundations: Data, Data, Everywhere',
    organization: 'Google',
    certificateId: 'S95Z4CZB25DK',
    certificateUrl: 'https://www.coursera.org/account/accomplishments/certificate/S95Z4CZB25DK',
  },
  {
    title: 'Machine Learning',
    organization: 'DeepLearning.AI',
    certificateId: 'AFY4A5CCEYPL',
    certificateUrl: 'https://www.coursera.org/account/accomplishments/specialization/certificate/AFY4A5CCEYPL',
  },
  {
    title: 'Unsupervised Learning, Recommenders, Reinforcement Learning',
    organization: 'DeepLearning.AI',
    certificateId: 'EZQEF78NXEGD',
    certificateUrl: 'https://www.coursera.org/account/accomplishments/certificate/EZQEF78NXEGD',
  },
  {
    title: 'AI & IoT',
    organization: 'NTI',
    certificateId: '99362',
    certificateUrl: 'https://drive.google.com/file/d/11HnEeAn_oEbjjsR3tSdy8yFZiYtjemdj/view',
  },
  {
    title: 'Advanced Learning Algorithms',
    organization: 'DeepLearning.AI',
    certificateId: 'W3JWRXYCHVL6',
    certificateUrl: 'https://www.coursera.org/account/accomplishments/certificate/W3JWRXYCHVL6',
  },
  {
    title: 'Python Problem Solving (Basic)',
    organization: 'HackerRank',
    certificateId: '11dde0b20397',
    certificateUrl: 'https://www.hackerrank.com/Certificates/11dde0b20397',
  },
  {
    title: 'Supervised Machine Learning: Regression and Classification',
    organization: 'DeepLearning.AI',
    certificateId: 'N8W9TU7DX3LY',
    certificateUrl: 'https://www.coursera.org/account/accomplishments/certificate/N8W9TU7DX3LY',
  },
  {
    title: 'MATLAB Fundamentals',
    organization: 'MATLAB Academy',
    certificateId: '81bee6e8-ce51-4699-91d8-13c810a1e459',
    certificateUrl: 'https://matlabacademy.mathworks.com/progress/share/certificate.html?id=81bee6e8-ce51-4699-91d8-13c810a1e459&',
  },
  {
    title: 'Data Analysis Challenger Track',
    organization: 'Udacity',
    certificateId: 'GTKUZKPU',
    certificateUrl: 'https://drive.google.com/file/d/1Vid8RjyOg_47Onnk3rJiMIm6EiWRFfFq/view',
  },
  {
    title: 'Embedded Automotive & Electronics',
    organization: 'Siemens & Eitsal',
    certificateUrl: 'https://drive.google.com/file/d/1-oCmtE1rDb392pfimXRo4nRD9CIBEIew/view',
  },
  {
    title: 'Machine Learning Nanodegree',
    organization: 'Udemy',
    certificateId: 'UC-703d4974-f3ea-425b-89c1-dae173f125cc',
    certificateUrl: 'https://www.udemy.com/certificate/UC-703d4974-f3ea-425b-89c1-dae173f125cc/',
  },
];

export const Certificates = () => {
  return (
    <section id="certificates" className="py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <SectionTitle>Certificates</SectionTitle>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((certificate, index) => (
            <CertificateCard key={index} {...certificate} />
          ))}
        </div>
      </div>
    </section>
  );
}