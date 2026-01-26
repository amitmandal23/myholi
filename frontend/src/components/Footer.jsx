import React from 'react';
import { MessageCircle, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="text-2xl font-bold mb-2 tracking-wider">ANDAMAN HOLIDAY TRIPS</div>
          <p className="text-gray-400 text-sm max-w-md">
            Crafting unforgettable memories in the Andaman Islands since 2010.
          </p>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
           <div>
              <h4 className="font-bold text-lg mb-4 text-white">Office Address</h4>
              <p className="text-gray-400">123, Marine Hill,<br />Port Blair, Andaman & Nicobar Islands<br />India - 744101</p>
           </div>
           <div>
              <h4 className="font-bold text-lg mb-4 text-white">Quick Links</h4>
              <ul className="space-y-2">
                 <li><Link to="/packages/family/family-fun" className="hover:text-brand-green text-gray-400 transition-colors">Packages</Link></li>
                 <li><Link to="/destinations/port-blair" className="hover:text-brand-green text-gray-400 transition-colors">Destinations</Link></li>
                 <li><Link to="/activities/port-blair/scuba-diving" className="hover:text-brand-green text-gray-400 transition-colors">Activities</Link></li>
                 <li><Link to="/about-us" className="hover:text-brand-green text-gray-400 transition-colors">About Us</Link></li>
                 <li><Link to="/testimonials" className="hover:text-brand-green text-gray-400 transition-colors">Testimonials</Link></li>
              </ul>
           </div>
           <div>
              <h4 className="font-bold text-lg mb-4 text-white">Support</h4>
              <ul className="space-y-2">
                 <li><Link to="/contact" className="hover:text-brand-green text-gray-400 transition-colors">Contact Us</Link></li>
                 <li><Link to="/faq" className="hover:text-brand-green text-gray-400 transition-colors">FAQs</Link></li>
                 <li><Link to="/terms-conditions" className="hover:text-brand-green text-gray-400 transition-colors">Terms & Conditions</Link></li>
                 <li><Link to="/privacy-policy" className="hover:text-brand-green text-gray-400 transition-colors">Privacy Policy</Link></li>
              </ul>
           </div>
           <div>
              <h4 className="font-bold text-lg mb-4 text-white">Get in Touch</h4>
              <p className="text-gray-400 mb-2">+91 99332 88398</p>
              <p className="text-gray-400 mb-4">info@andamanholidaytrips.com</p>
              <div className="flex gap-4">
                 <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-brand-blue transition-colors text-white">
                    <Facebook size={16} />
                 </a>
                 <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-brand-blue transition-colors text-white">
                    <Instagram size={16} />
                 </a>
                 <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-brand-blue transition-colors text-white">
                    <Twitter size={16} />
                 </a>
                 <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-brand-blue transition-colors text-white">
                    <Youtube size={16} />
                 </a>
              </div>
           </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-xs">
           &copy; {new Date().getFullYear()} Andaman Travels. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
