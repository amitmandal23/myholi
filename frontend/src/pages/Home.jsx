import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import PlanningSection from '../components/PlanningSection';
import TrendingPackages from '../components/TrendingPackages';
import StepsSection from '../components/StepsSection';
import Destinations from '../components/Destinations';
import PopularSightseeing from '../components/PopularSightseeing';
import PopularActivities from '../components/PopularActivities';
import PopularFerries from '../components/PopularFerries';
import Features from '../components/Features';
import PromoBanner from '../components/PromoBanner';
import Testimonials from '../components/Testimonials';
import BlogSection from '../components/BlogSection';
import FAQSection from '../components/FAQSection';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';
import SEO from '../components/common/SEO';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="Home" 
        description="Discover the beauty of Andaman & Nicobar Islands with our best travel packages. Book hotels, ferries, and activities at affordable prices."
        keywords="Andaman tourism, Andaman holiday packages, Port Blair hotels, Havelock ferry booking, Scuba diving Andaman"
      />
      <Navbar />
      <Hero />
      <PlanningSection />
      <TrendingPackages />
      <StepsSection />
      <Destinations />
      <PopularSightseeing />
      <PopularActivities />
      <PopularFerries />
      <Features />
      <PromoBanner />
      <Testimonials />
      <BlogSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Home;
