import React, { useState } from 'react';
import { X, MapPin, User, Phone, Mail, Minus, Plus, Calendar } from 'lucide-react';

const ActivityBookingModal = ({ isOpen, onClose, activityName }) => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    date: '',
    adults: 2,
    children: 0
  });

  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCounter = (field, operation) => {
    setFormData(prev => ({
      ...prev,
      [field]: operation === 'increment' ? prev[field] + 1 : Math.max(0, prev[field] - 1)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const inquiryData = {
      type: 'activity',
      reference_id: activityName,
      name: formData.name,
      email: formData.email,
      phone: formData.mobile,
      travel_date: formData.date,
      message: `Inquiry for ${activityName}. Adults: ${formData.adults}, Children: ${formData.children}`,
      status: 'pending'
    };

    try {
      const response = await fetch('http://localhost:8000/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(inquiryData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit inquiry');
      }

      alert('Thank you! We have received your inquiry.');
      onClose();
    } catch (error) {
      alert('Error submitting inquiry: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 pb-2">
          <h2 className="text-2xl font-bold text-gray-900">Book Your Adventure</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-full"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 pt-2 space-y-6">
          
          {/* Activity Name */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Activity Name</label>
            <div className="relative">
              <input 
                type="text" 
                value={activityName} 
                readOnly
                className="w-full pl-4 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none"
              />
              <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>

          {/* Personal Details Section */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <h3 className="text-lg font-bold text-gray-900">Your Details</h3>
              <div className="h-px flex-1 bg-gray-200"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Name */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Name</label>
                <div className="relative">
                  <input 
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-4 pr-10 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-none transition-all"
                  />
                  <User className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                </div>
              </div>

              {/* Mobile */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Mobile No.</label>
                <div className="relative flex">
                  <div className="flex items-center justify-center px-3 border border-r-0 border-gray-200 rounded-l-lg bg-gray-50 text-gray-600 font-medium">
                    +91
                  </div>
                  <input 
                    type="tel"
                    name="mobile"
                    placeholder="Mobile No."
                    value={formData.mobile}
                    onChange={handleInputChange}
                    className="w-full pl-4 pr-10 py-3 border border-gray-200 rounded-r-lg focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-none transition-all"
                  />
                  <Phone className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Email ID</label>
                <div className="relative">
                  <input 
                    type="email"
                    name="email"
                    placeholder="Your E-Mail Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-4 pr-10 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-none transition-all"
                  />
                  <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                </div>
              </div>

              {/* Date */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Preferred Date</label>
                <div className="relative">
                  <input 
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full pl-4 pr-10 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-none transition-all"
                  />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                </div>
              </div>
            </div>
          </div>

          {/* Counters */}
          <div className="grid grid-cols-2 gap-4">
            {['Adult', 'Child'].map((type) => {
              const field = type === 'Adult' ? 'adults' : 'children';
              return (
                <div key={type} className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">{type}</label>
                  <div className="flex items-center justify-between border border-gray-200 rounded-lg p-1">
                    <button 
                      type="button"
                      onClick={() => handleCounter(field, 'decrement')}
                      className="p-2 text-gray-500 hover:text-brand-blue hover:bg-blue-50 rounded-md transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="font-bold text-gray-900 w-8 text-center">{formData[field]}</span>
                    <button 
                      type="button"
                      onClick={() => handleCounter(field, 'increment')}
                      className="p-2 text-gray-500 hover:text-brand-blue hover:bg-blue-50 rounded-md transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            disabled={loading}
            className={`w-full bg-brand-blue text-white font-bold py-4 rounded-full shadow-lg transition-all transform hover:-translate-y-0.5 mt-4 ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700 hover:shadow-xl'}`}
          >
            {loading ? 'Submitting...' : 'Check Availability & Enquire'}
          </button>

        </form>
      </div>
    </div>
  );
};

export default ActivityBookingModal;
