import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const PlanningSection = () => {
  const cards = [
    {
      title: "First Time Visitor?",
      subtitle: "We make your debut trip unforgettable with curated plans.",
      image: "/img/firsttimevisitor.jpg",
      color: "from-blue-600 to-blue-900"
    },
    {
      title: "Confused About Islands?",
      subtitle: "Let us guide you to the perfect island for your vibe.",
      image: "/img/character1.jpg",
      color: "from-teal-600 to-teal-900"
    },
    {
      title: "Worried About Costs?",
      subtitle: "Transparent pricing with no hidden fees, guaranteed.",
      image: "/img/worriedaboutcost.jpg",
      color: "from-orange-600 to-orange-900"
    }
  ];

  const Card = ({ card }) => (
    <div className="group relative rounded-3xl overflow-hidden shadow-lg cursor-pointer h-80 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <img 
        src={card.image} 
        alt={card.title} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className={`absolute inset-0 bg-gradient-to-t ${card.color} opacity-80 mix-blend-multiply transition-opacity duration-300`}></div>
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
      
      <div className="absolute bottom-0 left-0 p-8 w-full">
        <h3 className="text-2xl font-bold text-white mb-2">{card.title}</h3>
        <p className="text-gray-200 text-sm mb-6 opacity-90 leading-relaxed">
            {card.subtitle}
        </p>
        <div className="flex items-center text-white font-bold text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
            Get Started <ArrowRight size={16} className="ml-2" />
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Planning a Trip to <span className="text-brand-blue">Andaman?</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              We know planning can be overwhelming. Here's how we help you start.
            </p>
        </div>

        {/* Desktop View */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <Card key={index} card={card} />
          ))}
        </div>

        {/* Mobile View */}
        <div className="md:hidden">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1.2}
            centeredSlides={true}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            className="pb-12"
          >
            {cards.map((card, index) => (
              <SwiperSlide key={index}>
                <Card card={card} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default PlanningSection;
