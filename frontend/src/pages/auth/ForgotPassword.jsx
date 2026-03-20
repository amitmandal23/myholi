import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call for password reset
    setTimeout(() => {
        setSubmitted(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden">
        <div className="bg-gray-800 p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-2">Reset Password</h2>
            <p className="text-gray-300">We'll send you instructions to reset it</p>
        </div>
        
        <div className="p-8">
            {submitted ? (
                <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Check Your Email</h3>
                    <p className="text-gray-600 mb-6">We've sent password reset instructions to <strong>{email}</strong></p>
                    <Link to="/securelogin" className="text-brand-blue font-bold hover:underline flex items-center justify-center gap-2">
                        <ArrowLeft size={16} /> Back to Login
                    </Link>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gray-800 text-white font-bold py-3 rounded-lg hover:bg-gray-900 transition-colors"
                    >
                        Send Reset Link
                    </button>
                    
                    <div className="text-center">
                        <Link to="/securelogin" className="text-gray-600 hover:text-gray-900 text-sm flex items-center justify-center gap-2">
                            <ArrowLeft size={16} /> Back to Login
                        </Link>
                    </div>
                </form>
            )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
