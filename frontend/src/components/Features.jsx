import React from 'react';
import { CalendarCheck, Tag, RefreshCcw, Headphones, Flame, Star } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Features = () => {
  const features = [
    {
      icon: <CalendarCheck size={40} className="text-brand-blue" />,
      title: "Easy Booking",
      description: "We offer easy and convenient flight bookings with attractive offers."
    },
    {
      icon: <Tag size={40} className="text-brand-blue" />,
      title: "Lowest Price",
      description: "We ensure low rates on hotel reservation, holiday packages and on flight tickets."
    },
    {
      icon: <RefreshCcw size={40} className="text-brand-blue" />,
      title: "Instant Refund",
      description: "Get instant refunds effortlessly on your travel bookings with us."
    },
    {
      icon: <Headphones size={40} className="text-brand-blue" />,
      title: "24/7 Support",
      description: "Get assistance 24/7 on any kind of travel related query. We are happy to assist you."
    },
    {
      icon: <Flame size={40} className="text-brand-blue" />,
      title: "Exciting Deals",
      description: "Enjoy exciting deals on flights, hotels, buses, car rental and tour packages."
    }
  ];

  const FeatureCard = ({ feature }) => (
    <div className="flex flex-col items-center group h-full">
        <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
            {feature.icon}
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
        <p className="text-sm text-gray-500 leading-relaxed max-w-xs">{feature.description}</p>
    </div>
  );

  const reviews = [
    {
      title: "Great service overall",
      text: "Great service overall",
      author: "Shehnaz Ansari",
      time: "3 hours ago"
    },
    {
      title: "Good user experience",
      text: "Good user experience",
      author: "Diya",
      time: "3 hours ago"
    },
    {
      title: "Genuine user opinions",
      text: "Genuine user opinions",
      author: "Nishar",
      time: "3 hours ago"
    },
    {
      title: "I had a great experience",
      text: "I had a great experience booking my flight ticket with them. Jack and Robin",
      author: "Abdul Jamil Siddiqui",
      time: "January 13"
    },
    {
      title: "First of all its a very good",
      text: "First of all its a very good app with less platform fees and zero",
      author: "Mohit",
      time: "January 11"
    },
    {
      title: "Excellent Service",
      text: "The support team was very helpful and resolved my query instantly.",
      author: "Priya Sharma",
      time: "Yesterday"
    },
    {
      title: "Highly Recommended",
      text: "Best prices I found online. Will definitely book again.",
      author: "Rahul Verma",
      time: "2 days ago"
    },
    {
      title: "Smooth Experience",
      text: "Booking process was seamless and very fast. Great UI.",
      author: "Ankit Gupta",
      time: "1 week ago"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                Why Book With Us?
            </h2>
            
            {/* Trustpilot Widget Mockup */}
            <div className="flex items-center gap-4 bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-sm">
                <span className="font-bold text-gray-700">Great</span>
                <div className="flex gap-1 bg-green-500 px-2 py-1">
                    {[1, 2, 3, 4, 5].map((_, i) => (
                        <Star key={i} size={16} className="text-white fill-white" />
                    ))}
                </div>
                <div className="text-sm text-gray-500">
                    <span className="font-bold text-gray-900 underline">15,388 reviews</span> on
                </div>
                <div className="flex items-center gap-1">
                    <Star size={20} className="text-green-500 fill-green-500" />
                    <span className="font-bold text-gray-900">Trustpilot</span>
                </div>
            </div>
        </div>

        {/* Features Grid (Desktop) */}
        <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-5 gap-8 mb-16 text-center">
            {features.map((feature, index) => (
                <FeatureCard key={index} feature={feature} />
            ))}
        </div>

        {/* Features Slider (Mobile) */}
        <div className="md:hidden mb-16 text-center">
            <Swiper
                modules={[Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                centeredSlides={true}
                loop={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
                className="pb-12"
            >
                {features.map((feature, index) => (
                    <SwiperSlide key={index}>
                        <FeatureCard feature={feature} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>

        {/* Reviews Slider */}
        <div className="relative pt-8 border-t border-gray-100">
             <Swiper
                modules={[Navigation, Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                navigation
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                breakpoints={{
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 4 },
                    1280: { slidesPerView: 5 },
                }}
                className="pb-12 px-4"
            >
                <style>
                    {`
                    .swiper-button-next, .swiper-button-prev {
                        background-color: white;
                        width: 32px;
                        height: 32px;
                        border-radius: 50%;
                        color: #111827;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                        top: 50%;
                        transform: translateY(-50%);
                    }
                    .swiper-button-next::after, .swiper-button-prev::after {
                        font-size: 12px;
                        font-weight: bold;
                    }
                    `}
                </style>
                {reviews.map((review, index) => (
                    <SwiperSlide key={index}>
                        <div className="bg-gray-50 p-4 rounded-lg h-full flex flex-col hover:bg-white hover:shadow-md transition-all duration-300 border border-gray-100">
                            <div className="flex gap-1 mb-3">
                                {[1, 2, 3, 4, 5].map((_, i) => (
                                    <div key={i} className="bg-green-500 p-1">
                                         <Star size={12} className="text-white fill-white" />
                                    </div>
                                ))}
                            </div>
                            <h4 className="font-bold text-gray-900 text-sm mb-1 truncate">{review.title}</h4>
                            <p className="text-gray-500 text-xs mb-4 line-clamp-3 flex-grow">{review.text}</p>
                            <div className="mt-auto text-xs text-gray-400">
                                <span className="font-bold text-gray-600">{review.author}</span> {review.time}
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>

      </div>
    </section>
  );
};

export default Features;
