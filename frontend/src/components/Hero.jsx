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
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          className="w-full h-full object-cover animate-slow-zoom"
          src="https://images.unsplash.com/photo-1544634076-a901606f41b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
          alt="Andaman Radhanagar Beach"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center h-full pb-20">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2 rounded-full border border-white/20 mb-8 animate-fade-in-down shadow-lg">
           <Star className="text-yellow-400 fill-yellow-400" size={16} />
           <span className="text-white text-sm font-medium tracking-wide">Rated #1 Travel Agency in Andaman</span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white mb-6 tracking-tight drop-shadow-2xl leading-tight">
          Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-200 to-cyan-400">Paradise</span> <br/>
          Before the Rest
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto font-light leading-relaxed drop-shadow-lg">
          Exclusive packages, hidden gems, and unforgettable experiences curated by locals.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 mb-16 w-full sm:w-auto">
          <a 
            href="https://wa.me/919933288398"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-brand-green hover:bg-green-500 text-white font-bold py-4 px-10 rounded-full flex items-center justify-center gap-3 transition-all transform hover:scale-105 shadow-2xl backdrop-blur-sm bg-opacity-90 border border-green-400/30"
          >
            <MessageCircle size={24} className="group-hover:animate-bounce" />
            <span className="text-lg">Plan via WhatsApp</span>
          </a>
          <a 
            href="tel:+919933288398"
            className="group bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-10 rounded-full flex items-center justify-center gap-3 transition-all transform hover:scale-105 shadow-2xl backdrop-blur-md border border-white/30"
          >
            <Phone size={24} />
            <span className="text-lg">Call Expert</span>
          </a>
        </div>

        {/* Search/Filter Widget - Floating Glass Card */}
        <div className="hidden lg:flex bg-white/95 backdrop-blur-xl rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.3)] p-3 w-full max-w-5xl items-center gap-2 border border-white/40 absolute bottom-12 transform hover:-translate-y-1 transition-transform duration-300">
            <div className="flex-1 px-6 relative border-r border-gray-200/50">
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Destination</label>

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
                  <div className="flex-1 px-6 relative border-r border-gray-200/50">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Duration</label>
                    <div className="flex items-center gap-2 text-gray-800 font-bold cursor-pointer hover:text-brand-blue relative">
                      <Calendar size={20} className="text-brand-blue flex-shrink-0" />
                      <select 
                        className="w-full bg-transparent appearance-none focus:outline-none cursor-pointer text-gray-800 font-bold z-10 relative"
                        value={selectedDur}
                        onChange={(e) => setSelectedDur(e.target.value)}
                      >
                        <option value="">Any Days</option>
                        <option value="4">Upto 4 Days</option>
                        <option value="5">Upto 5 Days</option>
                        <option value="6">Upto 6 Days</option>
                        <option value="7">Upto 7 Days</option>
                        <option value="8">Upto 8 Days</option>
                      </select>
                      <ChevronDown size={16} className="text-gray-400 absolute right-0 pointer-events-none" />
                    </div>
                  </div>
                  
                  <div className="flex-1 px-6 relative">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Travel Type</label>
                    <div className="flex items-center gap-2 text-gray-800 font-bold cursor-pointer hover:text-brand-blue relative">
                      <Search size={20} className="text-brand-blue flex-shrink-0" />
                       <select 
                        className="w-full bg-transparent appearance-none focus:outline-none cursor-pointer text-gray-800 font-bold z-10 relative"
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                      >
                        <option value="">All Categories</option>
                        <option value="honeymoon">Honeymoon</option>
                        <option value="family">Family</option>
                        <option value="adventure">Adventure</option>
                        <option value="group">Group</option>
                        <option value="luxury">Luxury</option>
                      </select>
                      <ChevronDown size={16} className="text-gray-400 absolute right-0 pointer-events-none" />
                    </div>
                  </div>

                  <button 
                    onClick={handleSearch}
                    className="bg-brand-blue hover:bg-blue-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex-shrink-0"
                  >
                    <Search size={24} />
                  </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
