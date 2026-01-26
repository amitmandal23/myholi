import React from 'react';
import { Star, Heart } from 'lucide-react';

const PromoBanner = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-900 to-blue-600 rounded-3xl overflow-hidden shadow-2xl relative min-h-[400px] flex items-center">
          
          {/* Content Side */}
          <div className="w-full md:w-1/2 p-8 md:p-12 z-10 text-white">
            <h3 className="font-handwriting text-3xl md:text-4xl mb-2 text-yellow-300 italic font-bold">
              Built On Trust,
            </h3>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Loved For Experiences!
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-md">
              Read stories from travelers who trusted us to craft their perfect journeys!
            </p>
            
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105">
              View Testimonials
            </button>
          </div>

          {/* Image Collage Side (Hidden on mobile, visible on md+) */}
          <div className="hidden md:block absolute right-0 top-0 bottom-0 w-1/2 overflow-hidden">
             {/* Center Image (Main) */}
             <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 w-48 h-64 border-4 border-white rounded-xl shadow-xl rotate-0 overflow-hidden">
                <img src="/img/havelockisland.png" alt="Traveler" className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                   <Star size={10} className="text-yellow-400 fill-yellow-400" />
                   <Star size={10} className="text-yellow-400 fill-yellow-400" />
                   <Star size={10} className="text-yellow-400 fill-yellow-400" />
                   <Star size={10} className="text-yellow-400 fill-yellow-400" />
                   <Star size={10} className="text-yellow-400 fill-yellow-400" />
                </div>
             </div>

             {/* Left Image (Tilted) */}
             <div className="absolute top-1/2 left-20 transform -translate-y-1/2 -rotate-12 z-10 w-40 h-56 border-4 border-white rounded-xl shadow-lg overflow-hidden opacity-90">
                <img src="/img/neilisland.jpg" alt="Traveler" className="w-full h-full object-cover" />
                <div className="absolute bottom-4 left-4 bg-red-500 p-1.5 rounded-full shadow-sm">
                    <Heart size={14} className="text-white fill-white" />
                </div>
             </div>

             {/* Right Image (Tilted) */}
             <div className="absolute top-1/2 right-20 transform -translate-y-1/2 rotate-12 z-10 w-40 h-56 border-4 border-white rounded-xl shadow-lg overflow-hidden opacity-90">
                <img src="/img/character1.jpg" alt="Traveler" className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2">
                   <Star size={16} className="text-yellow-400 fill-yellow-400 animate-pulse" />
                </div>
             </div>
          </div>
          
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;