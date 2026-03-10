import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/common/SEO';
import PopularFerries from '../components/PopularFerries';
import { Ship, Calendar, CreditCard, CheckCircle, MapPin, Clock, Info } from 'lucide-react';
import BookingModal from '../components/BookingModal';

const Ferries = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const ferryRoutes = [
    {
      from: "Port Blair",
      to: "Havelock Island",
      duration: "90 - 120 mins",
      distance: "57 km",
      frequency: "Daily (Morning & Afternoon)"
    },
    {
      from: "Havelock Island",
      to: "Neil Island",
      duration: "60 - 70 mins",
      distance: "37 km",
      frequency: "Daily (Morning & Afternoon)"
    },
    {
      from: "Neil Island",
      to: "Port Blair",
      duration: "90 - 120 mins",
      distance: "43 km",
      frequency: "Daily (Afternoon)"
    }
  ];

  const benefits = [
    {
      icon: <Ship size={32} className="text-brand-blue" />,
      title: "Premium Fleet",
      description: "Partnered with top operators like Makruzz, Green Ocean, and Nautika for maximum comfort."
    },
    {
      icon: <Calendar size={32} className="text-brand-blue" />,
      title: "Instant Confirmation",
      description: "Real-time seat availability and instant booking confirmation for your peace of mind."
    },
    {
      icon: <CreditCard size={32} className="text-brand-blue" />,
      title: "Best Price Guarantee",
      description: "Transparent pricing with no hidden charges. Get the official rates."
    },
    {
      icon: <CheckCircle size={32} className="text-brand-blue" />,
      title: "Easy Cancellation",
      description: "Flexible cancellation policies as per operator guidelines with quick refunds."
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <SEO 
        title="Ferry Booking in Andaman | Makruzz, Green Ocean, Nautika"
        description="Book ferry tickets for Port Blair, Havelock, and Neil Island. Official partner for Makruzz, Green Ocean, Nautika & ITT Majestic. Instant confirmation."
        keywords="ferry booking andaman, makruzz booking, green ocean ferry, nautika ferry, port blair to havelock ferry"
      />
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-[60vh] bg-blue-900 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://makruzz.com/assets/img/gallery/gallery-02.jpg" 
            alt="Andaman Ferry" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60"></div>
        </div>
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
            Seamless Island Hopping
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl opacity-90">
            Book official ferry tickets for Port Blair, Havelock & Neil Island with instant confirmation.
          </p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-brand-green text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-green-600 transition-all transform hover:scale-105 shadow-lg flex items-center gap-2"
          >
            <Ship size={24} />
            Book Your Ferry
          </button>
        </div>
      </div>

      {/* Intro Stats Section */}
      <div className="relative -mt-16 z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
                <div className="text-4xl font-bold text-brand-blue mb-2">500+</div>
                <div className="text-gray-600 font-medium">Daily Passengers</div>
            </div>
            <div className="md:border-x border-gray-100">
                <div className="text-4xl font-bold text-brand-blue mb-2">100%</div>
                <div className="text-gray-600 font-medium">Confirmed Tickets</div>
            </div>
            <div>
                <div className="text-4xl font-bold text-brand-blue mb-2">4+</div>
                <div className="text-gray-600 font-medium">Premium Operators</div>
            </div>
        </div>
      </div>

      {/* Popular Ferries Section */}
      <PopularFerries />

      {/* Route Info Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Popular Ferry Routes</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Essential connections between the islands. We recommend booking at least 2 days in advance.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {ferryRoutes.map((route, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8 border border-gray-100 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-blue-100 rounded-full text-brand-blue">
                        <MapPin size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-gray-900">{route.from}</h3>
                        <div className="text-gray-400 rotate-90 md:rotate-0 my-1">↓</div>
                        <h3 className="font-bold text-lg text-gray-900">{route.to}</h3>
                    </div>
                </div>
                
                <div className="space-y-4">
                    <div className="flex justify-between items-center text-gray-600">
                        <span className="flex items-center gap-2"><Clock size={18} /> Duration</span>
                        <span className="font-medium text-gray-900">{route.duration}</span>
                    </div>
                    <div className="flex justify-between items-center text-gray-600">
                        <span className="flex items-center gap-2"><Ship size={18} /> Distance</span>
                        <span className="font-medium text-gray-900">{route.distance}</span>
                    </div>
                    <div className="flex justify-between items-center text-gray-600">
                        <span className="flex items-center gap-2"><Calendar size={18} /> Frequency</span>
                        <span className="font-medium text-gray-900 text-right">{route.frequency}</span>
                    </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Book With Us?</h2>
                <p className="text-gray-600">We make your island transfers smooth and hassle-free.</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {benefits.map((benefit, index) => (
                    <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                        <div className="mb-6 bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center">
                            {benefit.icon}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Important Info / FAQ Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-blue-50 rounded-2xl p-8 md:p-12">
                <div className="flex items-start gap-6">
                    <div className="hidden md:block p-4 bg-white rounded-full text-brand-blue shadow-sm">
                        <Info size={32} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Important Travel Tips</h3>
                        <ul className="space-y-4 text-gray-700">
                            <li className="flex items-start gap-3">
                                <CheckCircle size={20} className="text-brand-green mt-1 flex-shrink-0" />
                                <span>Always book your ferry tickets at least <strong>4-5 days in advance</strong> during peak season (Oct - May).</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle size={20} className="text-brand-green mt-1 flex-shrink-0" />
                                <span>Report to the jetty at least <strong>45 minutes</strong> before departure time.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle size={20} className="text-brand-green mt-1 flex-shrink-0" />
                                <span>Carry a valid ID proof (Aadhar/Passport) for all passengers including children.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-brand-blue text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to set sail?</h2>
            <p className="text-xl opacity-90 mb-10">Avoid the last-minute rush. Secure your ferry seats today.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-brand-green text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-green-600 transition-all shadow-lg"
                >
                    Book Ferry Tickets
                </button>
                <a 
                    href="tel:+919933288398"
                    className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all"
                >
                    Call Support
                </a>
            </div>
        </div>
      </section>

      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} packageName="Ferry Services" title="Book Ferry Tickets" />
      <Footer />
    </div>
  );
};

export default Ferries;
