import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Lock, Eye, Database } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      
      <div className="bg-brand-green py-12 text-white text-center">
        <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
        <p className="opacity-90">We value your privacy and trust.</p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm p-8 space-y-8">
          
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Eye className="text-brand-green" /> 1. Information Collection
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We collect personal information such as your name, contact number, email address, and travel preferences when you enquire or book with us. This information is used solely for the purpose of planning and executing your trip.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Database className="text-brand-blue" /> 2. Use of Information
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Your information helps us:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Process your bookings for hotels, ferries, and activities.</li>
              <li>Communicate important trip updates and confirmations.</li>
              <li>Improve our services based on your feedback.</li>
              <li>Send promotional offers (you can opt-out at any time).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Lock className="text-orange-500" /> 3. Data Security
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We implement strict security measures to protect your personal data. We do not sell, trade, or transfer your personal information to outside parties, except for trusted partners (hotels, ferry operators) who assist us in operating your tour, provided they agree to keep this information confidential.
            </p>
          </section>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
