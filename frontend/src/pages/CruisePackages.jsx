import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/common/SEO';
import { Ship, Music, Utensils, Sunset, Users, Camera, Star, Calendar } from 'lucide-react';
import BookingModal from '../components/BookingModal';

const CruisePackages = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCruise, setSelectedCruise] = useState('Cruise Package');

  const packages = [
    {
      title: "Sunset Cruise",
      duration: "2 Hours",
      location: "Port Blair",
      price: "₹1,500 / person",
      image: "https://www.andamanisland.in/assets/images/activites/sunset-cruise-in-port-blair.jpg",
      features: ["Live Music", "Welcome Drink", "Panoramic Views"],
      description: "Witness the magical Andaman sunset from the deck with soothing live music."
    },
    {
      title: "Dinner Cruise",
      duration: "3 Hours",
      location: "Port Blair",
      price: "₹2,500 / person",
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/5c/4b/9f/tsg-bella-bay-luxury.jpg?w=1200&h=-1&s=1",
      features: ["Buffet Dinner", "DJ Night", "Cultural Show"],
      description: "A perfect blend of delicious food, entertainment, and a starry night sail."
    },
    {
      title: "Island Hopping Cruise",
      duration: "Full Day",
      location: "Havelock & Neil",
      price: "On Request",
      image: "https://media-cdn.tripadvisor.com/media/photo-s/17/7d/5d/46/makruzz-gold.jpg",
      features: ["Luxury Seating", "AC Cabins", "Snacks Included"],
      description: "Travel between islands in style and comfort with premium cruise operators."
    },
    {
      title: "Private Party Yacht",
      duration: "Customizable",
      location: "Anywhere",
      price: "On Request",
      image: "https://oceanblueadventures.in/wp-content/uploads/2021/10/yacht-charter-andaman.jpg",
      features: ["Private Chef", "Exclusive Access", "Water Sports"],
      description: "Charter a private yacht for birthdays, anniversaries, or exclusive gatherings."
    }
  ];

  const amenities = [
    { icon: <Music size={24} />, text: "Live Entertainment" },
    { icon: <Utensils size={24} />, text: "Gourmet Dining" },
    { icon: <Sunset size={24} />, text: "Sunset Views" },
    { icon: <Camera size={24} />, text: "Photo Ops" }
  ];

  const handleBook = (cruiseName) => {
    setSelectedCruise(cruiseName);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <SEO 
        title="Cruise Packages in Andaman | Dinner & Sunset Cruises"
        description="Book luxury cruise packages in Andaman. Enjoy dinner cruises, sunset sails, and private yacht charters. Live music, DJ, and buffet dinner included."
        keywords="cruise booking andaman, dinner cruise port blair, sunset cruise andaman, private yacht rental, tsg bella bay booking"
      />
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/img/hero-1.jpg" 
            alt="Andaman Cruise" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
        </div>
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-20 text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            Luxury on the High Seas
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl opacity-90">
            Experience the Andaman ocean like never before with our premium cruise packages.
          </p>
          <button 
            onClick={() => handleBook('General Cruise Inquiry')}
            className="bg-brand-green text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-green-600 transition-all w-fit flex items-center gap-2 shadow-lg backdrop-blur-sm"
          >
            <Ship size={24} />
            Explore Packages
          </button>
        </div>
      </div>

      {/* Intro Section */}
      <section className="py-20 bg-white">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Unforgettable Ocean Experiences</h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
                Whether you're looking for a romantic dinner under the stars, a fun-filled evening with live music, or a private yacht for your special occasion, we have the perfect cruise package for you.
            </p>
            
            <div className="flex justify-center gap-8 mt-12 flex-wrap">
                {amenities.map((item, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-3">
                        <div className="p-4 bg-blue-50 text-brand-blue rounded-full">
                            {item.icon}
                        </div>
                        <span className="font-medium text-gray-800">{item.text}</span>
                    </div>
                ))}
            </div>
         </div>
      </section>

      {/* Packages Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-12">Featured Cruise Packages</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
                {packages.map((pkg, index) => (
                    <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col md:flex-row group">
                        <div className="md:w-2/5 relative overflow-hidden">
                            <img 
                                src={pkg.image} 
                                alt={pkg.title} 
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                                <Clock size={12} /> {pkg.duration}
                            </div>
                        </div>
                        <div className="p-8 md:w-3/5 flex flex-col justify-between">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.title}</h3>
                                <p className="text-gray-500 text-sm mb-4 flex items-center gap-1">
                                    <MapPin size={14} /> {pkg.location}
                                </p>
                                <p className="text-gray-600 mb-6 line-clamp-2">{pkg.description}</p>
                                
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {pkg.features.map((feat, i) => (
                                        <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded border border-gray-200">
                                            {feat}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="flex items-center justify-between mt-4">
                                <div>
                                    <span className="text-xs text-gray-400 block">Starting at</span>
                                    <span className="text-xl font-bold text-brand-blue">{pkg.price}</span>
                                </div>
                                <button 
                                    onClick={() => handleBook(pkg.title)}
                                    className="bg-brand-blue text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                                >
                                    Book Now
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        packageName={selectedCruise} 
        title="Book Cruise Experience" 
      />
      <Footer />
    </div>
  );
};

// Helper Icon
const Clock = ({ size, className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);
const MapPin = ({ size, className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
);

export default CruisePackages;
