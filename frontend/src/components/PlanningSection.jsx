import React from 'react';
import { ArrowRight, Compass, Map, Wallet, CheckCircle } from 'lucide-react';

const PlanningSection = () => {
  const steps = [
    {
      icon: <Compass size={40} className="text-brand-blue" />,
      title: "First Time Visitor?",
      description: "We curate the perfect debut itinerary so you don't miss the highlights.",
      bg: "bg-blue-50",
      border: "border-blue-100"
    },
    {
      icon: <Map size={40} className="text-teal-600" />,
      title: "Confused About Islands?",
      description: "From Havelock's beaches to Neil's tranquility, we guide you right.",
      bg: "bg-teal-50",
      border: "border-teal-100"
    },
    {
      icon: <Wallet size={40} className="text-orange-600" />,
      title: "Worried About Costs?",
      description: "Transparent pricing with zero hidden fees. Luxury on a budget.",
      bg: "bg-orange-50",
      border: "border-orange-100"
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-teal-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
            <span className="text-brand-blue font-bold tracking-wider uppercase text-sm mb-2 block">Start Your Journey</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
              Planning Made <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-teal-400">Simple</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-xl font-light">
              We know planning a trip to Andaman can be overwhelming. We're here to simplify every step.
            </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
                key={index} 
                className={`group p-8 rounded-[2rem] border ${step.border} ${step.bg} hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden`}
            >
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-150 transition-transform duration-700">
                    {step.icon}
                </div>
                
                <div className="relative z-10">
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                        {step.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                    <p className="text-gray-600 mb-8 leading-relaxed">
                        {step.description}
                    </p>
                    <div className="flex items-center text-gray-900 font-bold group-hover:gap-2 transition-all cursor-pointer">
                        Get Started <ArrowRight size={18} className="ml-2" />
                    </div>
                </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlanningSection;
