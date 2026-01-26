import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "Best time to visit Andaman?",
      answer: "The best time to visit Andaman is between October and May when the weather is pleasant and perfect for sightseeing and water sports. Monsoons (June to September) can have heavy rainfall but are great for nature lovers."
    },
    {
      question: "Which are the best family-friendly beaches?",
      answer: "Radhanagar Beach (Havelock) is perfect for families with its calm waters and white sand. Elephant Beach offers easy water sports. In Port Blair, Corbyn's Cove is very accessible and family-friendly."
    },
    {
      question: "How does the WhatsApp booking process work?",
      answer: "It's simple! Just click the 'Get Free Itinerary' button, and you'll be connected to our travel expert on WhatsApp. Share your dates and preferences, and we'll send you a customized plan instantly. You can then confirm and pay securely."
    },
    {
      question: "Do I need a permit to visit Andaman?",
      answer: "Indian nationals do not need a permit for Port Blair, Havelock, and Neil Island. However, a permit is required for visiting tribal areas (which is generally restricted). Foreign nationals no longer need a Restricted Area Permit (RAP) for major tourist islands."
    },
    {
      question: "Is vegetarian food easily available?",
      answer: "Yes, absolutely! Most restaurants and hotels in Andaman serve delicious vegetarian food (North Indian, South Indian, and Jain options). We can also arrange specific dietary requirements if informed in advance."
    },
    {
      question: "Can we rent bikes in Andaman?",
      answer: "Yes, bike rentals are very popular, especially in Havelock and Neil Islands. You can rent scooters for ₹500-₹800 per day. A valid driving license is mandatory."
    },
    {
      question: "Are ATMs available on the islands?",
      answer: "ATMs are readily available in Port Blair. Havelock and Neil Island have fewer ATMs which may sometimes run out of cash, so it is advisable to carry sufficient cash when traveling to these islands."
    },
    {
      question: "Is internet connectivity good?",
      answer: "Internet speed is generally slow compared to the mainland. BSNL and Airtel work best. Most hotels offer Wi-Fi, but it might be intermittent. It's a great opportunity to do a digital detox!"
    },
    {
      question: "What should I pack for the trip?",
      answer: "Pack light cotton clothes, beachwear, sunglasses, hats, sunscreen, and comfortable flip-flops. Don't forget your personal medicines and rain gear if you're visiting during the monsoon."
    },
    {
      question: "Is it safe for solo female travelers?",
      answer: "Yes, Andaman is considered one of the safest tourist destinations in India. The locals are friendly and helpful. However, standard safety precautions should always be taken."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-brand-blue mb-4 flex items-center justify-center gap-2">
            <HelpCircle className="text-brand-green" /> Frequently Asked Questions
          </h2>
          <p className="text-gray-600">
            Have questions? We have answers to help you plan your trip without hesitation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`border rounded-lg overflow-hidden transition-all duration-300 h-fit ${openIndex === index ? 'border-brand-blue shadow-md' : 'border-gray-200'}`}
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center bg-white hover:bg-gray-50 focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <span className={`font-semibold text-lg ${openIndex === index ? 'text-brand-blue' : 'text-gray-800'}`}>
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="text-brand-blue shrink-0 ml-2" />
                ) : (
                  <ChevronDown className="text-gray-500 shrink-0 ml-2" />
                )}
              </button>
              
              <div 
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-48 py-4 opacity-100' : 'max-h-0 py-0 opacity-0'}`}
              >
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
