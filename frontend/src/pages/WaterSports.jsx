import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/common/SEO';
import { Waves, Anchor, Camera, LifeBuoy, MapPin, Clock, CheckCircle } from 'lucide-react';
import BookingModal from '../components/BookingModal';

const WaterSports = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState('Water Activity');

  const activities = [
    {
      title: "Scuba Diving",
      location: "Havelock & Neil Island",
      duration: "45-60 Mins",
      price: "₹3,500",
      image: "https://www.andamanisland.in/assets/images/activites/scuba-diving-in-andaman.jpg",
      description: "Explore the vibrant coral reefs and marine life. No swimming skills required for beginners.",
      features: ["Training Included", "Underwater Photos", "Certified Instructor"]
    },
    {
      title: "Sea Walk",
      location: "North Bay & Havelock",
      duration: "30 Mins",
      price: "₹3,200",
      image: "https://www.andamanisland.in/assets/images/activites/sea-walk-in-andaman.jpg",
      description: "Walk on the ocean floor surrounded by colorful fish. A unique experience for non-swimmers.",
      features: ["Helmet Provided", "Safe & Easy", "Video Footage"]
    },
    {
      title: "Parasailing",
      location: "Corbyn's Cove & Havelock",
      duration: "10-15 Mins",
      price: "₹3,000",
      image: "https://www.andamanisland.in/assets/images/activites/parasailing-in-andaman.jpg",
      description: "Fly high above the sea and enjoy breathtaking aerial views of the coastline.",
      features: ["Tandem Available", "Thrilling View", "Speed Boat Ride"]
    },
    {
      title: "Jet Ski Ride",
      location: "Port Blair & Havelock",
      duration: "10 Mins",
      price: "₹600",
      image: "https://www.andamanisland.in/assets/images/activites/jet-ski-ride-in-andaman.jpg",
      description: "Feel the rush of speed as you zip across the waves on a powerful jet ski.",
      features: ["Self-Drive Option", "Life Jacket", "Instructor Guide"]
    },
    {
      title: "Snorkeling",
      location: "Elephant Beach & North Bay",
      duration: "30 Mins",
      price: "₹1,000",
      image: "https://www.andamanisland.in/assets/images/activites/snorkeling-in-andaman.jpg",
      description: "Float on the surface and watch the underwater world. Perfect for families.",
      features: ["Gear Included", "Guided Tour", "Clear Waters"]
    },
    {
      title: "Kayaking",
      location: "Havelock Mangroves",
      duration: "90 Mins",
      price: "₹2,500",
      image: "https://www.andamanisland.in/assets/images/activites/kayaking-in-andaman.jpg",
      description: "Paddle through serene mangroves and enjoy the peaceful side of nature.",
      features: ["Night Kayaking", "Training", "Nature Tour"]
    }
  ];

  const handleBook = (activityName) => {
    setSelectedActivity(activityName);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <SEO 
        title="Water Sports in Andaman | Scuba, Sea Walk, Parasailing"
        description="Book thrilling water sports in Andaman. Scuba diving, sea walk, parasailing, jet ski, and snorkeling at best prices. Certified instructors and safety gear included."
        keywords="water sports andaman, scuba diving havelock, sea walk north bay, parasailing port blair, snorkeling elephant beach"
      />
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-[60vh] bg-blue-900 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/img/hero-2.jpg" 
            alt="Water Sports Andaman" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 to-transparent"></div>
        </div>
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center text-center text-white">
          <div className="inline-block p-3 rounded-full bg-white/20 backdrop-blur-md mb-6">
            <Waves size={32} />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
            Dive Into Adventure
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl opacity-90">
            Discover the underwater paradise of Andaman with our world-class water sports activities.
          </p>
          <button 
            onClick={() => handleBook('General Water Sports Inquiry')}
            className="bg-brand-green text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-green-600 transition-all transform hover:scale-105 shadow-lg"
          >
            Plan Your Adventure
          </button>
        </div>
      </div>

      {/* Activities Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Top Activities</h2>
                <p className="text-gray-600">Choose from a wide range of thrilling experiences.</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {activities.map((activity, index) => (
                    <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 group flex flex-col">
                        <div className="h-64 overflow-hidden relative">
                            <img 
                                src={activity.image} 
                                alt={activity.title} 
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                                <h3 className="text-xl font-bold text-white">{activity.title}</h3>
                            </div>
                        </div>
                        
                        <div className="p-6 flex-grow flex flex-col">
                            <div className="flex justify-between text-sm text-gray-500 mb-4">
                                <span className="flex items-center gap-1"><MapPin size={14} /> {activity.location}</span>
                                <span className="flex items-center gap-1"><Clock size={14} /> {activity.duration}</span>
                            </div>
                            
                            <p className="text-gray-600 mb-6 flex-grow">{activity.description}</p>
                            
                            <ul className="space-y-2 mb-6">
                                {activity.features.map((feat, i) => (
                                    <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                                        <CheckCircle size={14} className="text-brand-green" /> {feat}
                                    </li>
                                ))}
                            </ul>
                            
                            <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                                <div>
                                    <span className="text-xs text-gray-400 block">Starting from</span>
                                    <span className="text-xl font-bold text-brand-blue">{activity.price}</span>
                                </div>
                                <button 
                                    onClick={() => handleBook(activity.title)}
                                    className="bg-brand-green/10 text-brand-green px-4 py-2 rounded-lg font-bold hover:bg-brand-green hover:text-white transition-colors"
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

      {/* Safety Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-3xl p-8 md:p-16 shadow-sm border border-gray-100 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 text-red-600 rounded-full mb-6">
                    <LifeBuoy size={32} />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Safety First Policy</h2>
                <p className="text-gray-600 max-w-3xl mx-auto mb-10 text-lg">
                    We prioritize your safety above all. All our activities are conducted by PADI certified instructors and use international standard safety equipment. Regular maintenance checks are performed on all gear.
                </p>
                <div className="grid md:grid-cols-3 gap-6 text-left max-w-4xl mx-auto">
                    <div className="flex items-start gap-4">
                        <CheckCircle className="text-green-500 flex-shrink-0 mt-1" />
                        <p className="text-gray-700">Certified Instructors for all technical sports.</p>
                    </div>
                    <div className="flex items-start gap-4">
                        <CheckCircle className="text-green-500 flex-shrink-0 mt-1" />
                        <p className="text-gray-700">High-quality, regularly serviced equipment.</p>
                    </div>
                    <div className="flex items-start gap-4">
                        <CheckCircle className="text-green-500 flex-shrink-0 mt-1" />
                        <p className="text-gray-700">Briefing and training provided before every activity.</p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        packageName={selectedActivity} 
        title="Book Water Sports" 
      />
      <Footer />
    </div>
  );
};

export default WaterSports;
