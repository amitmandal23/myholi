import React, { useState } from 'react';
import { Ship, Clock, Star } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import BookingModal from './BookingModal';

const PopularFerries = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFerry, setSelectedFerry] = useState('');

  const handleBookNow = (ferryName) => {
    setSelectedFerry(ferryName);
    setIsModalOpen(true);
  };
  const ferries = [
    {
      name: "Makruzz",
      route: "Port Blair ↔ Havelock",
      image: "https://makruzz.com/assets/img/gallery/gallery-02.jpg",
      rating: "4.8",
      time: "90 mins",
      price: "From ₹1,500"
    },
    {
      name: "Green Ocean",
      route: "Port Blair ↔ Havelock",
      image: "https://greenoceanseaways.com/assets/images/gallery/1.jpg",
      rating: "4.5",
      time: "120 mins",
      price: "From ₹1,200"
    },
    {
      name: "Nautika",
      route: "Havelock ↔ Neil Island",
      image: "https://www.gonautika.com/assets/images/gallery/nautika-lite-2.jpg",
      rating: "4.7",
      time: "60 mins",
      price: "From ₹1,400"
    },
    {
      name: "ITT Majestic",
      route: "Port Blair ↔ Neil Island",
      image: "https://ittmajestic.com/assets/images/gallery/1.jpg",
      rating: "4.6",
      time: "90 mins",
      price: "From ₹1,300"
    },
    {
      name: "Sea Link",
      route: "Port Blair ↔ Havelock",
      image: "https://sealinkandaman.com/assets/images/gallery/1.jpg",
      rating: "4.4",
      time: "90 mins",
      price: "From ₹1,100"
    },
    {
      name: "Aashi",
      route: "Havelock ↔ Neil Island",
      image: "https://aashiandaman.com/assets/images/gallery/1.jpg",
      rating: "4.3",
      time: "70 mins",
      price: "From ₹1,000"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Popular Ferries in Andaman
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Seamless island transfers with the most trusted ferry operators.
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
          {ferries.map((ferry, index) => (
            <SwiperSlide key={index}>
              <div className="relative group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="h-48 overflow-hidden">
                    <img 
                    src={ferry.image} 
                    alt={ferry.name} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                </div>
                <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{ferry.name}</h3>
                        <div className="flex items-center gap-1 bg-green-100 px-2 py-1 rounded text-xs font-bold text-green-700">
                            <Star size={12} className="fill-current" />
                            {ferry.rating}
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                        <Ship size={16} />
                        <span>{ferry.route}</span>
                    </div>
                     <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                        <Clock size={16} />
                        <span>{ferry.time}</span>
                    </div>
                    <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                        <span className="text-brand-blue font-bold text-lg">{ferry.price}</span>
                        <button 
                            onClick={() => handleBookNow(ferry.name)}
                            className="text-brand-green font-semibold text-sm hover:underline"
                        >
                            Book Now →
                        </button>
                    </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        packageName={selectedFerry} 
        title="Book Ferry Tickets" 
      />
    </section>
  );
};

export default PopularFerries;
