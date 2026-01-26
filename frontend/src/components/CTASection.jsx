import React from 'react';
import { MessageCircle, ShieldCheck, Users, MapPin, Phone } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-24 bg-brand-blue relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1540206395-688085723adb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="Andaman Ocean" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/90 to-blue-900/90"></div>
      </div>

      {/* Decorative Pattern */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-green/20 rounded-full blur-3xl -ml-16 -mb-16"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
          Ready to Escape to <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-200 to-green-400">Paradise?</span>
        </h2>
        <p className="text-xl md:text-2xl text-blue-100 mb-10 font-light leading-relaxed max-w-2xl mx-auto">
          Let our local experts craft the perfect itinerary for you. No hidden costs, just pure island magic.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-5 mb-16">
          <a 
            href="https://wa.me/919933288398"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand-green hover:bg-green-600 text-white font-bold py-4 px-10 rounded-full shadow-xl shadow-green-900/20 transform hover:scale-105 transition-all duration-300 flex items-center gap-3 text-lg border-2 border-transparent"
          >
            <MessageCircle size={24} />
            Chat on WhatsApp
          </a>
          <a 
            href="tel:+919933288398"
            className="bg-transparent hover:bg-white/10 text-white font-bold py-4 px-10 rounded-full shadow-none transform hover:scale-105 transition-all duration-300 flex items-center gap-3 text-lg border-2 border-white/30 hover:border-white"
          >
            <Phone size={24} />
            Request Callback
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white border-t border-white/10 pt-10">
          <div className="flex flex-col items-center group">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-3 group-hover:bg-white/20 transition-colors">
                <ShieldCheck size={24} className="text-teal-300" />
            </div>
            <span className="font-bold text-lg">Secure Booking</span>
            <span className="text-sm text-blue-200">Payment Protection</span>
          </div>
          <div className="flex flex-col items-center group">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-3 group-hover:bg-white/20 transition-colors">
                <Users size={24} className="text-teal-300" />
            </div>
            <span className="font-bold text-lg">5,000+ Happy Guests</span>
            <span className="text-sm text-blue-200">Rated 4.9/5 Stars</span>
          </div>
          <div className="flex flex-col items-center group">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-3 group-hover:bg-white/20 transition-colors">
                <MapPin size={24} className="text-teal-300" />
            </div>
            <span className="font-bold text-lg">Local Office</span>
            <span className="text-sm text-blue-200">Port Blair Based</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
