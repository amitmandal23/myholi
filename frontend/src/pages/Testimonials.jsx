import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Star, Quote, User, Loader } from 'lucide-react';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('https://andamanholidaytrips.in/api/testimonials');
      if (response.ok) {
        const data = await response.json();
        const processed = data.map(item => ({
            ...item,
            image: item.image && !item.image.startsWith('http') ? `https://andamanholidaytrips.in${item.image}` : item.image
        }));
        setTestimonials(processed);
      }
    } catch (err) {
      console.error("Failed to fetch testimonials", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-brand-blue py-16 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pattern-dots"></div>
        <h1 className="text-4xl font-bold mb-4 relative z-10">Guest Reviews</h1>
        <p className="opacity-90 max-w-2xl mx-auto px-4 relative z-10 text-lg">
          Don't just take our word for it. Here's what our happy travelers have to say about their Andaman experience with us.
        </p>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 mb-12">
        <div className="bg-white rounded-xl shadow-lg p-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-4">
            <div className="text-3xl font-bold text-brand-blue mb-1">5000+</div>
            <div className="text-gray-500 text-sm">Happy Travelers</div>
          </div>
          <div className="p-4 border-l border-gray-100">
            <div className="text-3xl font-bold text-brand-blue mb-1">4.8/5</div>
            <div className="text-gray-500 text-sm">Average Rating</div>
          </div>
          <div className="p-4 border-l border-gray-100">
            <div className="text-3xl font-bold text-brand-blue mb-1">10+</div>
            <div className="text-gray-500 text-sm">Years Experience</div>
          </div>
          <div className="p-4 border-l border-gray-100">
            <div className="text-3xl font-bold text-brand-blue mb-1">24/7</div>
            <div className="text-gray-500 text-sm">Support</div>
          </div>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {loading ? (
           <div className="flex justify-center p-20"><Loader className="animate-spin" /></div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((review, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 flex flex-col h-full">
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src={review.image} 
                  alt={review.name} 
                  className="w-14 h-14 rounded-full object-cover border-2 border-brand-blue/10"
                />
                <div>
                  <h3 className="font-bold text-gray-900">{review.name}</h3>
                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    {review.location}
                  </div>
                </div>
              </div>

              <div className="mb-4 text-brand-yellow flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    fill={i < review.rating ? "currentColor" : "none"} 
                    className={i < review.rating ? "text-yellow-400" : "text-gray-300"}
                  />
                ))}
              </div>

              <div className="relative flex-grow">
                <Quote size={24} className="text-brand-blue/10 absolute -top-2 -left-2 transform -scale-x-100" />
                <div 
                  className="text-gray-600 italic relative z-10 pl-4 text-sm leading-relaxed prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: review.text }}
                />
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100 text-xs text-gray-400 font-medium text-right">
                Visited in {review.date}
              </div>
            </div>
          ))}
        </div>
        )}
        
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Ready to create your own memories?</h2>
          <a 
            href="https://wa.me/919933288398" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-brand-blue hover:bg-brand-blue/90 md:py-4 md:text-lg md:px-10 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            Start Planning Your Trip
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Testimonials;
