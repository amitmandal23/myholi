import React from 'react';
import { Star, Quote, CheckCircle } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Testimonials = () => {
  const reviews = [
    {
      name: "Romeo & Juliet",
      location: "Mumbai, India",
      image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      text: "Amazing trip! Well organized and stress free. The team took care of everything from airport pickup to ferry bookings. The candlelight dinner at Havelock was the highlight of our honeymoon.",
      rating: 5,
      date: "Jan 2024"
    },
    {
      name: "Pratik & Priti",
      location: "Bangalore, India",
      image: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      text: "Best honeymoon experience, highly recommend! The hotels suggested were top-notch and exactly within our budget. We loved the private photography session at Radhanagar Beach.",
      rating: 5,
      date: "Dec 2023"
    },
    {
      name: "Renize & Seamen",
      location: "Pune, India",
      image: "https://images.unsplash.com/photo-1542596594-649edbc13630?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      text: "Great service and value for money. The local guide was very knowledgeable and helped us explore hidden gems in Neil Island. Will definitely book with them again for our family trip.",
      rating: 5,
      date: "Feb 2024"
    },
    {
      name: "Amit & Family",
      location: "Delhi, India",
      image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      text: "A perfect family vacation! The itinerary was relaxed enough for my parents and exciting enough for the kids. Scuba diving was organized perfectly with safety as top priority.",
      rating: 5,
      date: "Mar 2024"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-blue mb-4">
            Happy Travelers Sharing Their Experiences
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Don't just take our word for it. Read what our guests have to say about their Andaman journey.
            </p>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
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
          {reviews.map((review, index) => (
            <SwiperSlide key={index} className="h-auto">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 flex flex-col h-full hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-48 overflow-hidden group">
                  <img 
                    src={review.image} 
                    alt={review.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="font-bold text-lg">{review.name}</h3>
                      <p className="text-xs text-gray-200 flex items-center gap-1">
                          <MapPin size={12} className="text-brand-green" /> {review.location}
                      </p>
                  </div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <div className="mb-4">
                      <Quote className="text-brand-blue/20 fill-brand-blue/10 mb-2" size={32} />
                      <div 
                        className="text-gray-600 italic leading-relaxed text-sm prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: review.text }}
                      />
                  </div>
                  
                  <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                    <div className="flex gap-1">
                        {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                        ))}
                    </div>
                    <div className="flex items-center text-brand-green gap-1 bg-green-50 px-2 py-1 rounded-full">
                        <CheckCircle size={12} />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Verified Trip</span>
                    </div>
                  </div>
                  <div className="text-right mt-2">
                       <span className="text-xs text-gray-400 font-medium">{review.date}</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        
        <div className="mt-12 text-center">
            <a href="#" className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 hover:text-brand-blue hover:border-brand-blue transition-all duration-300">
                Read 500+ Reviews on Google
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" className="w-5 h-5 ml-2" />
            </a>
        </div>
      </div>
    </section>
  );
};

// Missing import fix
import { MapPin } from 'lucide-react';

export default Testimonials;
