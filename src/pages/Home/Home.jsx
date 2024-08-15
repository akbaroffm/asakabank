import React from 'react';
import Values from './Values';
import Hero from './Hero';
import DirectionSection from './DirectionSection';
import VacanciesSection from './VacanciesSection';
import ProcessSection from './ProcessSection';
import BlogSection from './BlogSection';
import FeedbackSection from './FeedbackSection';

function Home() {
  return (
    <>
      <div>
        <Hero />
        <div className="container mx-auto">
          <Values />
          <DirectionSection />
        </div>
        <VacanciesSection />
        <div className="container mx-auto">
          <ProcessSection />
          <BlogSection />
          <FeedbackSection />
        </div>
      </div>
    </>
  );
}

export default Home;
