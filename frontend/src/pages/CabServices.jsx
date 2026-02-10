import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/common/SEO';
import { Car, MapPin, Shield, Clock, Phone, CheckCircle, Users, Briefcase } from 'lucide-react';
import BookingModal from '../components/BookingModal';

const CabServices = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCab, setSelectedCab] = useState('Cab Service');

  const fleet = [
    {
      name: "Sedan (Dzire/Etios)",
      capacity: "4 Pax",
      luggage: "2 Bags",
      type: "Budget Friendly",
      image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/45691/swift-dzire-exterior-right-front-three-quarter-19.jpeg?q=75",
      price: "Starts ₹800"
    },
    {
      name: "SUV (Ertiga)",
      capacity: "6 Pax",
      luggage: "4 Bags",
      type: "Family Comfort",
      image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/115777/ertiga-exterior-right-front-three-quarter-5.jpeg?isig=0&q=75",
      price: "Starts ₹1,200"
    },
    {
      name: "Innova Crysta",
      capacity: "6-7 Pax",
      luggage: "4-5 Bags",
      type: "Premium Travel",
      image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/140809/innova-crysta-exterior-right-front-three-quarter-2.png?isig=0&q=75",
      price: "Starts ₹2,000"
    },
    {
      name: "Tempo Traveller",
      capacity: "12-26 Pax",
      luggage: "Multiple Bags",
      type: "Group Tours",
      image: "https://5.imimg.com/data5/SELLER/Default/2022/9/MQ/IO/UJ/3638421/force-tempo-traveller-3020-rental-service-500x500.png",
      price: "On Request"
    }
  ];

  const services = [
    {
      icon: <Briefcase size={32} className="text-brand-blue" />,
      title: "Airport Transfers",
      description: "Punctual pick-up and drop-off services from Veer Savarkar International Airport."
    },
    {
      icon: <MapPin size={32} className="text-brand-blue" />,
      title: "Sightseeing Tours",
      description: "Customized full-day tours to Cellular Jail, Corbyn's Cove, Chidiya Tapu & more."
    },
    {
      icon: <Clock size={32} className="text-brand-blue" />,
      title: "Hourly Rentals",
      description: "Flexible hourly packages for shopping, meetings, or leisure travel."
    },
    {
      icon: <Shield size={32} className="text-brand-blue" />,
      title: "Outstation Trips",
      description: "Reliable trips to Baratang, Rangat, Diglipur with experienced drivers."
    }
  ];

  const handleBook = (cabName) => {
    setSelectedCab(cabName);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <SEO 
        title="Cab Services in Andaman | Airport Transfers & Sightseeing"
        description="Book reliable cabs in Andaman. Sedans, SUVs, Innova Crysta & Tempo Travellers for airport transfers and sightseeing. Professional drivers & clean cars."
        keywords="cab booking andaman, taxi service port blair, airport transfer andaman, innova rental andaman, sightseeing taxi"
      />
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-[60vh] bg-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/img/hero-2.jpg" 
            alt="Andaman Cab Service" 
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
        </div>
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 max-w-2xl">
            Travel Andaman with Comfort & Safety
          </h1>
          <p className="text-xl mb-8 max-w-xl opacity-90">
            Professional chauffeurs, sanitized fleet, and on-time service for a hassle-free island experience.
          </p>
          <button 
            onClick={() => handleBook('General Cab Inquiry')}
            className="bg-brand-green text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-green-600 transition-all w-fit flex items-center gap-2 shadow-lg"
          >
            <Car size={24} />
            Book a Cab Now
          </button>
        </div>
      </div>

      {/* Our Fleet Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Premium Fleet</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose the perfect vehicle for your group size and comfort requirements.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {fleet.map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                <div className="h-48 overflow-hidden bg-white flex items-center justify-center p-4">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                     <span className="bg-blue-100 text-brand-blue text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">{item.type}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{item.name}</h3>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <Users size={16} />
                      <span>{item.capacity}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <Briefcase size={16} />
                      <span>{item.luggage}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                    <div>
                        <span className="text-xs text-gray-500 block">Starting from</span>
                        <span className="text-brand-blue font-bold text-lg">{item.price}</span>
                    </div>
                    <button 
                        onClick={() => handleBook(item.name)}
                        className="text-brand-green font-bold text-sm hover:underline"
                    >
                        Book Now →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Services We Offer</h2>
                <p className="text-gray-600">Comprehensive travel solutions for all your transport needs.</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {services.map((service, index) => (
                    <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                        <div className="mb-6 bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center">
                            {service.icon}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{service.description}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Safety & Hygiene */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-brand-blue rounded-2xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-4">Committed to Your Safety</h3>
                    <ul className="space-y-3">
                        <li className="flex items-center gap-3">
                            <CheckCircle className="text-brand-green" />
                            <span>Regular vehicle sanitization before every trip</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <CheckCircle className="text-brand-green" />
                            <span>Professional, verified & vaccinated drivers</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <CheckCircle className="text-brand-green" />
                            <span>24/7 on-road assistance support</span>
                        </li>
                    </ul>
                </div>
                <div className="flex-shrink-0">
                     <a href="tel:+919933288398" className="inline-flex items-center gap-2 bg-brand-green text-white px-8 py-3 rounded-lg font-bold hover:bg-green-600 transition shadow-lg">
                        <Phone size={20} /> Call for Taxi
                    </a>
                </div>
            </div>
        </div>
      </section>

      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        packageName={selectedCab} 
        title="Book Cab Service" 
      />
      <Footer />
    </div>
  );
};

export default CabServices;
