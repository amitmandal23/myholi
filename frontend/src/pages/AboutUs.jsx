import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Users, Target, Heart } from 'lucide-react';
import SEO from '../components/common/SEO';

const AboutUs = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <SEO 
        title="About Us" 
        description="Learn about Andaman Holiday Trips - your trusted local travel partner in Andaman Islands. We offer customized tour packages and expert guidance."
        keywords="About Andaman Holiday Trips, travel agency Andaman, best tour operator Port Blair"
      />
      <Navbar />
      
      {/* Hero */}
      <div className="bg-brand-blue py-20 text-white text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About Andaman Holiday Trips</h1>
        <p className="text-xl opacity-90">Crafting Unforgettable Island Memories Since 2010</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 space-y-20">
        
        {/* Our Story */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Andaman Holiday Trips began with a simple passion: to share the untouched beauty of the Andaman Islands with the world. What started as a small local guide service has grown into a premier travel agency, trusted by thousands of travelers annually.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We believe in sustainable tourism that respects the local ecosystem while providing luxury and comfort to our guests. Our deep local roots allow us to offer experiences that go beyond the standard tourist trail.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <img src="/img/hero-1.jpg" alt="Our Team" className="w-full h-full object-cover" />
          </div>
        </section>

        {/* Values */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose Us?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Users size={40} />, title: "Local Experts", desc: "Our team consists of born-and-raised islanders who know every hidden gem." },
              { icon: <Target size={40} />, title: "Tailored Itineraries", desc: "We don't believe in one-size-fits-all. Your trip is customized to your preferences." },
              { icon: <Heart size={40} />, title: "24/7 Support", desc: "From the moment you land until you leave, we are just a phone call away." }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-8 rounded-xl shadow-sm text-center hover:-translate-y-2 transition-transform">
                <div className="w-16 h-16 bg-blue-50 text-brand-blue rounded-full flex items-center justify-center mx-auto mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

      </div>

      <Footer />
    </div>
  );
};

export default AboutUs;
