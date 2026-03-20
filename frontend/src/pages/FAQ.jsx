import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "What is the best time to visit Andaman?",
      answer: "The best time to visit Andaman is between October and May. The weather is pleasant, perfect for sightseeing and water sports. Monsoons (June to September) are also beautiful but water sports might be restricted."
    },
    {
      question: "Do I need a passport/visa to visit Andaman?",
      answer: "Indian nationals do not need a passport or visa, but a valid government ID (Aadhar, Voter ID, DL) is required. Foreign nationals require a valid Indian Visa."
    },
    {
      question: "Is there mobile connectivity in Andaman?",
      answer: "Port Blair has good 4G connectivity (Airtel, Jio, BSNL). Havelock and Neil Island have decent connectivity, but it can be patchy in remote areas. BSNL works best across the islands."
    },
    {
      question: "Are there ATMs available on the islands?",
      answer: "Yes, Port Blair has many ATMs. Havelock and Neil Island also have ATMs, but they can run out of cash or face network issues. It is advisable to carry sufficient cash."
    },
    {
      question: "Can I book water sports on the spot?",
      answer: "Yes, but during peak season, slots fill up fast. We recommend pre-booking activities like Scuba Diving and Sea Walk to avoid disappointment."
    },
    {
      question: "Is vegetarian food available easily?",
      answer: "Absolutely! Most hotels and restaurants serve both vegetarian and non-vegetarian food. There are also pure veg restaurants available in Port Blair and Havelock."
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      
      <div className="bg-brand-blue py-12 text-white text-center">
        <h1 className="text-3xl font-bold mb-2">Frequently Asked Questions</h1>
        <p className="opacity-90">Got questions? We have answers.</p>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-gray-50 transition-colors"
              >
                <span className="font-bold text-gray-900 flex items-center gap-3">
                  <HelpCircle size={20} className="text-brand-blue" />
                  {faq.question}
                </span>
                {openIndex === index ? <ChevronUp size={20} className="text-gray-500" /> : <ChevronDown size={20} className="text-gray-500" />}
              </button>
              {openIndex === index && (
                <div className="p-5 pt-0 text-gray-600 leading-relaxed border-t border-gray-100 bg-gray-50/50">
                  <div className="pt-4">{faq.answer}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FAQ;
