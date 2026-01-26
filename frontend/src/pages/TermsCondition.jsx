import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FileText, Shield, AlertCircle } from 'lucide-react';

const TermsCondition = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      
      <div className="bg-brand-blue py-12 text-white text-center">
        <h1 className="text-3xl font-bold mb-2">Terms & Conditions</h1>
        <p className="opacity-90">Please read these terms carefully before booking.</p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm p-8 space-y-8">
          
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="text-brand-blue" /> 1. Booking Policy
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              To confirm your booking, an advance payment of 50% of the total package cost is required. The remaining 50% must be paid at least 15 days prior to the travel date. For bookings made within 15 days of travel, 100% payment is required at the time of booking.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <AlertCircle className="text-red-500" /> 2. Cancellation Policy
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Cancellations made 30 days or more prior to departure: 25% of the package cost will be charged as a cancellation fee.</li>
              <li>Cancellations made between 15-29 days prior to departure: 50% of the package cost will be charged.</li>
              <li>Cancellations made less than 15 days prior to departure: 100% of the package cost will be charged (No Refund).</li>
              <li>In case of unforeseen weather conditions or ferry cancellations, we will try to provide the best alternative, but refunds are subject to operator policies.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Shield className="text-green-500" /> 3. ID Proof & Permits
            </h2>
            <p className="text-gray-600 leading-relaxed">
              All guests must carry a valid government-issued photo ID (Aadhar Card, Voter ID, Passport, or Driving License) during the trip. PAN Cards are not accepted as valid address proof. Foreign nationals must carry a valid Passport and Indian Visa.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">4. Refund Process</h2>
            <p className="text-gray-600 leading-relaxed">
              Refunds (if applicable) will be processed within 7-10 working days via the original mode of payment.
            </p>
          </section>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TermsCondition;
