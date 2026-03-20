import React from 'react';
import { MessageSquare, FileText, Plane, Palmtree } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const StepsSection = () => {
  const steps = [
    {
      id: 1,
      title: "Talk to Experts",
      description: "Connect with our local experts to share your preferences and travel style.",
      icon: <MessageSquare size={32} className="text-white" />,
      color: "bg-blue-500",
    },
    {
      id: 2,
      title: "Get Itinerary",
      description: "Receive a customized itinerary crafted just for you within 24 hours.",
      icon: <FileText size={32} className="text-white" />,
      color: "bg-green-500",
    },
    {
      id: 3,
      title: "Book Securely",
      description: "Confirm your trip with a small deposit and transparent pricing.",
      icon: <Plane size={32} className="text-white" />,
      color: "bg-purple-500",
    },
    {
      id: 4,
      title: "Enjoy Your Trip",
      description: "Relax and explore while we handle all the logistics for you.",
      icon: <Palmtree size={32} className="text-white" />,
      color: "bg-orange-500",
    }
  ];

  const StepCard = ({ step }) => (
    <div className="flex flex-col items-center text-center group h-full">
      <div className={`w-24 h-24 rounded-full ${step.color} flex items-center justify-center shadow-lg mb-6 transform group-hover:scale-110 transition-transform duration-300 relative z-10 border-4 border-white`}>
        {step.icon}
        <div className="absolute -top-2 -right-2 bg-gray-900 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold border-2 border-white">
            {step.id}
        </div>
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-3">{step.title}</h3>
      <p className="text-gray-500 leading-relaxed px-2">{step.description}</p>
    </div>
  );

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Your Journey to Paradise in <span className="text-brand-blue">4 Simple Steps</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            We've simplified the process so you can focus on dreaming about your vacation.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop Only) */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-1 bg-gray-100 -z-10 transform -translate-y-1/2"></div>

          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-4 gap-8">
            {steps.map((step) => (
              <StepCard key={step.id} step={step} />
            ))}
          </div>

          {/* Mobile Slider */}
          <div className="md:hidden">
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              loop={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              pagination={{ clickable: true }}
              className="pb-12"
            >
              {steps.map((step) => (
                <SwiperSlide key={step.id}>
                  <StepCard step={step} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        <div className="mt-16 text-center">
            <a 
              href="https://wa.me/919933288398"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white font-bold py-3 px-8 rounded-full transition-colors duration-300"
            >
                Start Planning Now
            </a>
        </div>
      </div>
    </section>
  );
};

export default StepsSection;
