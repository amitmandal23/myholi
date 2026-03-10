import React, { useEffect, useState } from 'react';
import { Clock, ArrowRight, Tag, Star } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';

const TrendingPackages = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/packages');
        if (response.ok) {
          const data = await response.json();
          
          if (!Array.isArray(data)) return;

          // Shuffle the array to show random packages from different categories
          const shuffled = [...data].sort(() => 0.5 - Math.random());
          
          const mappedData = shuffled.slice(0, 4).map(pkg => ({
            title: pkg.title,
            duration: pkg.duration,
            image: pkg.featured_image && !pkg.featured_image.startsWith('http')
                  ? `http://localhost:8000${pkg.featured_image}`
                  : (pkg.featured_image || (pkg.images && pkg.images[0]) || '/img/hero-1.jpg'),
            type: pkg.category.replace('-', ' '),
            rating: 4.8, // Placeholder
            category: pkg.category,
            slug: pkg.slug
          }));
          setPackages(mappedData);
        }
      } catch (error) {
        console.error("Failed to fetch packages:", error);
      }
    };
    fetchPackages();
  }, []);

  const PackageCard = ({ pkg }) => (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group h-full border border-gray-100">
      <div className="relative h-72 overflow-hidden">
        <img 
          src={pkg.image} 
          alt={pkg.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4">
            <span className="bg-white/90 backdrop-blur-md text-brand-blue text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
              <Tag size={12} /> {pkg.type}
            </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 pt-12">
          <div className="flex justify-between items-end">
            <div className="text-white">
                <div className="flex items-center gap-1 text-yellow-400 text-xs font-bold mb-2">
                    <Star size={14} fill="currentColor" /> {pkg.rating} (120+ Reviews)
                </div>
                <h3 className="font-bold text-2xl leading-tight mb-1 group-hover:text-teal-200 transition-colors">{pkg.title}</h3>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
            <div className="flex items-center text-gray-500 text-sm font-medium">
                <Clock size={16} className="mr-2 text-brand-green" />
                {pkg.duration}
            </div>
            <div className="text-brand-blue font-bold text-sm bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                Customizable
            </div>
        </div>
        
        <Link 
          to={`/packages/${pkg.category}/${pkg.slug}`}
          className="w-full bg-white text-brand-blue border-2 border-brand-blue hover:bg-brand-blue hover:text-white py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 group-hover:gap-3"
        >
          View Itinerary <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-brand-blue mb-4">
          Popular Packages Overview
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Explore our most popular itineraries, from romantic escapes to budget-friendly tours.
        </p>
        
        {/* Desktop View */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {packages.map((pkg, index) => (
            <PackageCard key={index} pkg={pkg} />
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
              delay: 3500,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            className="pb-12"
          >
            {packages.map((pkg, index) => (
              <SwiperSlide key={index}>
                <PackageCard pkg={pkg} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default TrendingPackages;
