import React, { useState } from 'react';
import { MessageCircle, Phone, Star, Search, Calendar, MapPin, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  const [selectedDest, setSelectedDest] = useState('');
  const [selectedDur, setSelectedDur] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (selectedDest) params.append('destination', selectedDest);
    if (selectedDur) params.append('duration', selectedDur);
    if (selectedType) params.append('category', selectedType);
    
    navigate(`/search?${params.toString()}`);
  };

  return (
    <div className="relative h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0 z-0">
        <img
          className="w-full h-full object-cover scale-105"
          src="https://images.unsplash.com/photo-1589330273594-fade1ee91647?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          alt="Andaman Beach"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 mb-6 animate-fade-in-down">
           <Star className="text-yellow-400 fill-yellow-400" size={16} />
           <span className="text-white text-sm font-medium tracking-wide">Trusted by 5,000+ Travelers</span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 tracking-tight drop-shadow-lg leading-tight">
          Experience the <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-200 to-cyan-400">Untouched</span> Beauty <br className="hidden md:block"/> of Andaman
        </h1>
        
        <p className="text-lg md:text-2xl text-gray-100 mb-10 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md">
          Curated itineraries, local experts, and zero hidden costs. <br/> Your perfect island getaway starts here.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16 w-full sm:w-auto">
          <a 
            href="https://wa.me/919933288398"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand-green hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full flex items-center justify-center gap-2 transition-all transform hover:scale-105 shadow-xl backdrop-blur-sm bg-opacity-90"
          >
            <MessageCircle size={22} />
            Plan via WhatsApp
          </a>
          <a 
            href="tel:+919933288398"
            className="bg-white hover:bg-gray-50 text-brand-blue font-bold py-4 px-8 rounded-full flex items-center justify-center gap-2 transition-all transform hover:scale-105 shadow-xl"
          >
            <Phone size={22} />
            Call Expert Now
          </a>
        </div>

        {/* Search/Filter Widget - Floating Card */}
        <div className="hidden lg:flex bg-white rounded-2xl shadow-2xl p-4 w-full max-w-4xl items-center gap-4 border border-gray-100 absolute -bottom-16">
            <div className="flex-1 border-r border-gray-200 px-4 relative">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Destination</label>
                    <div className="flex items-center gap-2 text-gray-800 font-semibold cursor-pointer hover:text-brand-blue relative">
                      <MapPin size={20} className="text-brand-blue flex-shrink-0" />
                      <select 
                        className="w-full bg-transparent appearance-none focus:outline-none cursor-pointer text-gray-800 font-semibold z-10 relative"
                        value={selectedDest}
                        onChange={(e) => setSelectedDest(e.target.value)}
                      >
                        <option value="">All Islands</option>
                        <option value="Port Blair">Port Blair only</option>
                        <option value="Port Blair, Havelock">Port Blair and Havelock</option>
                        <option value="Port Blair, Havelock, Neil">Port Blair, Havelock, Neil Island</option>
                        <option value="Port Blair, Havelock, Neil, Baratang">Port Blair, Havelock, Neil, Baratang</option>
                      </select>
                      <ChevronDown size={16} className="text-gray-400 absolute right-0 pointer-events-none" />
                    </div>
                  </div>
                  {/* Duration and Travel Type Dropdowns */}
                  <div className="flex-1 border-r border-gray-200 px-4 relative">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Duration</label>
                    <div className="flex items-center gap-2 text-gray-800 font-semibold cursor-pointer hover:text-brand-blue relative">
                      <Calendar size={20} className="text-brand-blue flex-shrink-0" />
                      <select 
                        className="w-full bg-transparent appearance-none focus:outline-none cursor-pointer text-gray-800 font-semibold z-10 relative"
                        value={selectedDur}
                        onChange={(e) => setSelectedDur(e.target.value)}
                      >
                        <option value="">Any Days</option>
                        <option value="4">Upto 4 Days</option>
                        <option value="5">Upto 5 Days</option>
                        <option value="6">Upto 6 Days</option>
                        <option value="7">Upto 7 Days</option>
                        <option value="8">Upto 8 Days</option>
                        <option value="10+">10+ Days</option>
                      </select>
                    <ChevronDown size={16} className="text-gray-400 absolute right-0 pointer-events-none" />
                </div>
            </div>

            <div className="flex-1 px-4 relative">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Travel Type</label>
                <div className="flex items-center gap-2 text-gray-800 font-semibold cursor-pointer hover:text-brand-blue relative">
                    <Star size={20} className="text-brand-blue flex-shrink-0" />
                    <select 
                        className="w-full bg-transparent appearance-none focus:outline-none cursor-pointer text-gray-800 font-semibold z-10 relative"
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                    >
                        <option value="">All Types</option>
                        <option value="Honeymoon">Honeymoon</option>
                        <option value="Family">Family</option>
                        <option value="Group">Group</option>
                        <option value="Family and Budget">Family and Budget</option>
                    </select>
                    <ChevronDown size={16} className="text-gray-400 absolute right-0 pointer-events-none" />
                </div>
            </div>

            <button 
                onClick={handleSearch}
                className="bg-brand-blue hover:bg-blue-700 text-white p-4 rounded-xl shadow-lg transition-colors"
            >
                <Search size={24} />
            </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
