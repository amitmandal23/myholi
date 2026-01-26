import React from 'react';
import { MapPin, ArrowRight, Zap } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const PopularActivities = () => {
  const activities = [
    {
      name: "Scuba Diving",
      location: "Havelock & Neil",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      price: "From ₹3,500",
      slug: "scuba-diving",
      locationSlug: "havelock-island"
    },
    {
      name: "Sea Walk",
      location: "North Bay & Elephant Beach",
      image: "https://images.unsplash.com/photo-1599940824399-b87987ced72a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      price: "From ₹4,000",
      slug: "sea-walk",
      locationSlug: "port-blair"
    },
    {
      name: "Snorkeling",
      location: "Elephant Beach & Bharatpur",
      image: "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      price: "From ₹1,000",
      slug: "snorkeling",
      locationSlug: "havelock-island"
    },
    {
      name: "Parasailing",
      location: "Corbyn's Cove & Havelock",
      image: "https://images.unsplash.com/photo-1564594736624-def7a10ab047?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      price: "From ₹3,000",
      slug: "parasailing",
      locationSlug: "port-blair"
    },
    {
      name: "Kayaking",
      location: "Havelock Mangroves",
      image: "https://images.unsplash.com/photo-1541336032412-2048a678540d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      price: "From ₹2,500",
      slug: "kayaking",
      locationSlug: "havelock-island"
    },
    {
      name: "Glass Bottom Boat",
      location: "North Bay & Jolly Buoy",
      image: "https://images.unsplash.com/photo-1534008897995-27a23e859048?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      price: "From ₹1,500",
      slug: "glass-bottom-boat",
      locationSlug: "port-blair"
    }
  ];

  return (
    <section className="py-20 bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
            <div className="inline-flex items-center gap-1 bg-white px-3 py-1 rounded-full text-brand-blue text-xs font-bold mb-2 shadow-sm">
                <Zap size={12} className="fill-brand-blue" /> ADVENTURE AWAITS
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Thrilling Activities in Andaman
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Add some adrenaline to your island vacation with these top-rated experiences.
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
          {activities.map((activity, index) => (
            <SwiperSlide key={index}>
              <Link to={`/activities/${activity.locationSlug}/${activity.slug}`} className="relative group cursor-pointer overflow-hidden rounded-2xl h-80 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 block">
                <img 
                  src={activity.image} 
                  alt={activity.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80"></div>
                
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                    <span className="text-xs font-bold text-gray-800">{activity.price}</span>
                </div>

                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <h3 className="text-white font-bold text-xl mb-1">{activity.name}</h3>
                  <div className="flex items-center text-gray-300 text-sm mb-3">
                    <MapPin size={14} className="mr-1 text-brand-green" />
                    {activity.location}
                  </div>
                  <div className="flex items-center text-brand-green font-bold text-xs uppercase tracking-wider opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      Book Now <ArrowRight size={14} className="ml-1" />
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

export default PopularActivities;