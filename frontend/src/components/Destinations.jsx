import React, { useEffect, useState } from 'react';
import { MapPin, ArrowRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { API_ENDPOINTS, IMAGE_BASE_URL } from '../config/api';
import 'swiper/css';
import 'swiper/css/pagination';

const Destinations = () => {
  const [islands, setIslands] = useState([]);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.DESTINATIONS);
        if (response.ok) {
          const data = await response.json();
          const mappedData = data.slice(0, 4).map(dest => ({
            name: dest.title,
            description: dest.description.substring(0, 50) + '...',
            image: dest.hero_image && !dest.hero_image.startsWith('http') 
                  ? `${IMAGE_BASE_URL}${dest.hero_image}` 
                  : dest.hero_image,
            count: "View Details", // Placeholder as API doesn't return count yet
            slug: dest.slug
          }));
          setIslands(mappedData);
        }
      } catch (error) {
        console.error("Failed to fetch destinations:", error);
      }
    };
    fetchDestinations();
  }, []);

  const DestinationCard = ({ island }) => (
    <Link to={`/destinations/${island.slug}`} className="group relative h-[400px] rounded-3xl overflow-hidden shadow-lg cursor-pointer block">
      <img 
        src={island.image} 
        alt={island.name} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90"></div>
      
      <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30">
          <span className="text-white text-xs font-medium">{island.count}</span>
      </div>

      <div className="absolute bottom-0 left-0 p-6 w-full transform transition-transform duration-300 translate-y-2 group-hover:translate-y-0">
        <div className="flex items-center text-brand-green mb-2">
            <MapPin size={16} className="mr-1" />
            <span className="text-xs font-bold uppercase tracking-wider">Island</span>
        </div>
        <h3 className="text-2xl font-bold text-white mb-1">{island.name}</h3>
        <p className="text-gray-300 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
            {island.description}
        </p>
        <div className="w-10 h-10 rounded-full bg-white text-brand-blue flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
            <ArrowRight size={20} />
        </div>
      </div>
    </Link>
  );

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Explore Top Destinations
                </h2>
                <p className="text-gray-600 text-lg">Discover the gems of the Andaman archipelago</p>
            </div>
            <Link to="/destinations" className="hidden md:flex items-center text-brand-blue font-bold hover:underline">
                View All Destinations <ArrowRight size={18} className="ml-2" />
            </Link>
        </div>
        
        {/* Desktop View */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {islands.map((island, index) => (
            <DestinationCard key={index} island={island} />
          ))}
        </div>

        {/* Mobile View */}
        <div className="md:hidden">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1.1}
            centeredSlides={true}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            className="pb-12"
          >
            {islands.map((island, index) => (
              <SwiperSlide key={index}>
                <DestinationCard island={island} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        
        <div className="mt-8 text-center md:hidden">
             <a href="#" className="inline-flex items-center text-brand-blue font-bold hover:underline">
                View All Destinations <ArrowRight size={18} className="ml-2" />
            </a>
        </div>
      </div>
    </section>
  );
};

export default Destinations;
