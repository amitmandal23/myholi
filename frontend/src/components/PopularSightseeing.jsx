import React, { useEffect, useState } from 'react';
import { MapPin, Star } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const PopularSightseeing = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch('https://andamanholidaytrips.in/api/activities');
        if (response.ok) {
          const data = await response.json();
          const mappedData = data.slice(0, 6).map(activity => ({
            name: activity.title,
            location: activity.location,
            image: activity.images && activity.images.length > 0 
                  ? (activity.images[0].startsWith('http') ? activity.images[0] : `https://andamanholidaytrips.in${activity.images[0]}`)
                  : '/img/hero-1.jpg',
            rating: "4.9", // Placeholder
            slug: activity.slug,
            locationSlug: activity.location.toLowerCase().replace(/\s+/g, '-')
          }));
          setPlaces(mappedData);
        }
      } catch (error) {
        console.error("Failed to fetch activities:", error);
      }
    };
    fetchActivities();
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Must-Visit Sightseeing Spots
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Iconic landmarks you simply cannot miss on your Andaman trip.
            </p>
        </div>
        
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
            1280: {
              slidesPerView: 4,
            },
            1536: {
              slidesPerView: 5,
            },
          }}
          className="pb-12 px-4"
        >
          <style>
            {`
              .swiper-button-next, .swiper-button-prev {
                background-color: white;
                width: 24px;
                height: 24px;
                border-radius: 50%;
                color: #111827;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
              }
              .swiper-button-next::after, .swiper-button-prev::after {
                font-size: 8px;
                font-weight: bold;
              }
            `}
          </style>
          {places.map((place, index) => (
            <SwiperSlide key={index}>
              <Link to={`/activities/${place.locationSlug}/${place.slug}`} className="relative group cursor-pointer overflow-hidden rounded-2xl h-80 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 block">
                <img 
                  src={place.image} 
                  alt={place.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80"></div>
                
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                    <Star size={14} className="text-yellow-500 fill-yellow-500" />
                    <span className="text-xs font-bold text-gray-800">{place.rating}</span>
                </div>

                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <h3 className="text-white font-bold text-xl mb-1">{place.name}</h3>
                  <div className="flex items-center text-gray-300 text-sm">
                    <MapPin size={14} className="mr-1 text-brand-green" />
                    {place.location}
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default PopularSightseeing;
