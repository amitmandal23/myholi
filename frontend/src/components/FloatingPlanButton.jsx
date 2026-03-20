import React, { useState } from 'react';
import { Send, Phone, MapPin, Calendar, X, MessageSquareText } from 'lucide-react';
import { API_ENDPOINTS } from '../config/api';

const FloatingPlanButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    destination: '',
    travelDate: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const inquiryData = {
      type: 'general',
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: `Floating Planner Inquiry. Destination: ${formData.destination}, Date: ${formData.travelDate}. Message: ${formData.message}`,
      status: 'pending'
    };

    try {
      const response = await fetch(API_ENDPOINTS.INQUIRIES, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(inquiryData),
      });

      if (!response.ok) throw new Error('Failed to submit');

      alert('Thank you! Our expert will call you shortly.');
      setFormData({ name: '', phone: '', email: '', destination: '', travelDate: '', message: '' });
      setIsOpen(false);
    } catch (error) {
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-40 bg-gradient-to-r from-brand-blue to-teal-500 text-white p-4 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.4)] hover:scale-105 transition-all duration-300 group flex items-center gap-3 pr-6"
      >
        <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
            <MessageSquareText size={24} className="animate-pulse" />
        </div>
        <div className="text-left hidden md:block">
            <p className="text-[10px] font-bold uppercase tracking-wider text-blue-100">Need Help?</p>
            <p className="text-sm font-bold">Plan My Trip</p>
        </div>
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(false)}
          ></div>

          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Header */}
            <div className="bg-gradient-to-r from-brand-blue to-teal-500 p-6 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                <div className="relative z-10 flex justify-between items-start">
                    <div>
                        <h2 className="text-2xl font-bold mb-1">Plan Your Holiday</h2>
                        <p className="text-blue-100 text-sm">Tell us what you need, we'll design it.</p>
                    </div>
                    <button 
                        onClick={() => setIsOpen(false)}
                        className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors backdrop-blur-sm"
                    >
                        <X size={20} />
                    </button>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase">Name</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-none transition-all text-sm"
                    placeholder="Your Name"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase">Phone</label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-none transition-all text-sm"
                    placeholder="Phone Number"
                  />
                </div>
              </div>

              <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase">Email (Optional)</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-none transition-all text-sm"
                    placeholder="Email Address"
                  />
                </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">Destination</label>
                    <div className="relative">
                        <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <select 
                            name="destination"
                            value={formData.destination}
                            onChange={handleChange}
                            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-none transition-all text-sm appearance-none cursor-pointer"
                        >
                            <option value="">Select...</option>
                            <option value="Port Blair">Port Blair</option>
                            <option value="Havelock">Havelock</option>
                            <option value="Neil Island">Neil Island</option>
                            <option value="Full Package">Full Package</option>
                        </select>
                    </div>
                </div>
                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">Date</label>
                    <div className="relative">
                        <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input 
                            type="date" 
                            name="travelDate"
                            value={formData.travelDate}
                            onChange={handleChange}
                            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-none transition-all text-sm"
                        />
                    </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">Message</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-none transition-all text-sm resize-none"
                  placeholder="Tell us about your plans..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-brand-green hover:bg-green-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-green-500/30 transform active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
              >
                {loading ? 'Sending...' : (
                  <>
                    Send Inquiry <Send size={18} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingPlanButton;
