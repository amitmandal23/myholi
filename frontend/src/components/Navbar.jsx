import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, ChevronDown, Minus, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/api';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expanded, setExpanded] = useState({});
  const [packagesMenu, setPackagesMenu] = useState([]);
  const [destinationsMenu, setDestinationsMenu] = useState([]);
  const [activitiesMenu, setActivitiesMenu] = useState([]);
  const [servicesMenu, setServicesMenu] = useState([]);
  const [blogsMenu, setBlogsMenu] = useState([]);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        // Fetch Packages
        const pkgRes = await fetch(`${API_ENDPOINTS.PACKAGES}?menu_only=true`);
        if (pkgRes.ok) {
          const pkgs = await pkgRes.json();
          const groupedPkgs = pkgs.reduce((acc, pkg) => {
            if (!acc[pkg.category]) {
              acc[pkg.category] = [];
            }
            acc[pkg.category].push({ title: pkg.title, slug: pkg.slug });
            return acc;
          }, {});
          const formattedPkgs = Object.keys(groupedPkgs).map(cat => ({
            title: cat.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            slug: cat,
            items: groupedPkgs[cat]
          }));
          setPackagesMenu(formattedPkgs);
        }

        // Fetch Destinations
        const destRes = await fetch(`${API_ENDPOINTS.DESTINATIONS}?menu_only=true`);
        if (destRes.ok) {
          const dests = await destRes.json();
          setDestinationsMenu(dests);
        }

        // Fetch Activities
        const actRes = await fetch(`${API_ENDPOINTS.ACTIVITIES}?menu_only=true`);
        if (actRes.ok) {
          const acts = await actRes.json();
          const groupedActs = acts.reduce((acc, act) => {
            if (!acc[act.location]) {
              acc[act.location] = [];
            }
            acc[act.location].push({ title: act.title, slug: act.slug });
            return acc;
          }, {});
          const formattedActs = Object.keys(groupedActs).map(loc => ({
            location: loc,
            items: groupedActs[loc]
          }));
          setActivitiesMenu(formattedActs);
        }

        // Fetch Services (More Menu)
        const servRes = await fetch(`${API_ENDPOINTS.SERVICES}?menu_only=true`);
        if (servRes.ok) {
          const servs = await servRes.json();
          setServicesMenu(servs);
        }

        // Fetch Blogs (Note: Blog Menu is now a direct link, but if we used a dropdown, we'd use ?menu_only=true)
        // Since we removed the dropdown, we might not strictly need this for the menu, 
        // but if we ever re-add it or use it for a "Latest Blogs" preview, it's good to have.
        // However, the current Navbar code for Blogs is just a Link to /blogs.
        // The fetch logic for blogs in Navbar is actually dead code now?
        // Let's check the Navbar code again.
        
      } catch (error) {
        console.error("Failed to fetch menu data:", error);
      }
    };
    fetchMenuData();
  }, []);

  const toggleExpand = (key) => {
    setExpanded(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const createSlug = (text) => {
    return text
      .toString()
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special chars
      .trim()
      .replace(/\s+/g, '-'); // Replace spaces with -
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center relative">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="w-32 font-bold text-brand-green flex items-center gap-2">
              <img src="/img/new-logo.png" alt="Logo" />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 h-full">
            
            {/* Packages Mega Menu */}
            <div className="group h-full flex items-center">
                <button className="text-gray-700 hover:text-brand-blue font-medium flex items-center gap-1 h-full">
                    Packages <ChevronDown size={16} />
                </button>
                <div className="absolute left-0 top-full w-[1400px] bg-white rounded-lg shadow-xl border-t-4 border-brand-green hidden group-hover:block transition-all duration-200 z-50">
                    <div className="grid grid-cols-5 gap-6 p-6">
                        {packagesMenu.map((category, index) => (
                            <div key={index} className="space-y-4">
                                <h3 className="font-bold text-brand-blue border-b pb-2">{category.title}</h3>
                                <ul className="space-y-2">
                                    {category.items.map((item, idx) => (
                                        <li key={idx}>
                                            <Link 
                                                to={`/packages/${category.slug}/${item.slug}`}
                                                className="text-sm text-gray-600 hover:text-brand-green hover:translate-x-1 transition-transform inline-block whitespace-nowrap"
                                            >
                                                {item.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Destinations Mega Menu */}
             <div className="group h-full flex items-center">
                <button className="text-gray-700 hover:text-brand-blue font-medium flex items-center gap-1 h-full">
                    Destinations <ChevronDown size={16} />
                </button>
                <div className="absolute left-1/2 transform -translate-x-1/2 top-full w-[800px] bg-white rounded-lg shadow-xl border-t-4 border-brand-green hidden group-hover:block transition-all duration-200 z-50">
                    <div className="p-6">
                        <h3 className="font-bold text-brand-blue border-b pb-2 mb-4">Explore Andaman</h3>
                        <div className="grid grid-cols-4 gap-x-4 gap-y-3">
                            {destinationsMenu.map((place, index) => (
                                <Link key={index} to={`/destinations/${place.slug}`} className="text-sm text-gray-600 hover:text-brand-green hover:translate-x-1 transition-transform block">
                                    {place.title}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Activities Mega Menu */}
            <div className="group h-full flex items-center">
                <button className="text-gray-700 hover:text-brand-blue font-medium flex items-center gap-1 h-full">
                    Activities <ChevronDown size={16} />
                </button>
                <div className="absolute left-1/2 transform -translate-x-1/2 top-full w-[800px] bg-white rounded-lg shadow-xl border-t-4 border-brand-green hidden group-hover:block transition-all duration-200 z-50">
                    <div className="grid grid-cols-4 gap-6 p-6">
                        {activitiesMenu.map((location, index) => (
                            <div key={index} className="space-y-4">
                                <h3 className="font-bold text-brand-blue border-b pb-2">{location.location}</h3>
                                <ul className="space-y-2">
                                    {location.items.map((item, idx) => (
                                        <li key={idx}>
                                            <Link 
                                                to={`/activities/${createSlug(location.location)}/${item.slug}`}
                                                className="text-sm text-gray-600 hover:text-brand-green hover:translate-x-1 transition-transform inline-block"
                                            >
                                                {item.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Blogs Menu - direct link */}
            <Link to="/blogs" className="text-gray-700 hover:text-brand-blue font-medium h-full flex items-center">Blog</Link>

            <Link to="/about-us" className="text-gray-700 hover:text-brand-blue font-medium h-full flex items-center">About Us</Link>
            
            {/* More Dropdown */}
            <div className="relative group h-full flex items-center">
                <button className="text-gray-700 hover:text-brand-blue font-medium flex items-center gap-1 h-full">
                    More <ChevronDown size={16} />
                </button>
                <div className="absolute left-0 top-full mt-0 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block border border-gray-100 z-50">
                    {servicesMenu.map((service, index) => (
                        <Link key={index} to={`/services/${service.slug}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                            {service.title}
                        </Link>
                    ))}
                </div>
            </div>

            <Link to="/contact" className="text-gray-700 hover:text-brand-blue font-medium h-full flex items-center">Contact</Link>
            <div className="h-full flex items-center">
                <a 
                href="tel:+919933288398" 
                className="bg-brand-green text-white px-4 py-2 rounded-md font-bold flex items-center gap-2 hover:bg-green-700 transition"
                >
                <Phone size={18} />
                +91 99332 88398
                </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-brand-blue focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[60] transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}>
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsOpen(false)}></div>
        
        {/* Menu Content */}
        <div className="relative w-[85%] max-w-sm bg-white h-full shadow-2xl flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b bg-brand-green text-white">
                <span className="font-bold text-lg">Menu</span>
                <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/20 rounded-full transition-colors">
                    <X size={24} />
                </button>
            </div>
            
            {/* Scrollable Items */}
            <div className="flex-1 overflow-y-auto">
                <Link to="/" className="block p-4 font-medium text-gray-700 border-b hover:bg-gray-50">Home</Link>
                
                {/* Packages */}
                <div className="border-b">
                    <button 
                        onClick={() => toggleExpand('packages')} 
                        className={`w-full flex justify-between items-center p-4 font-medium transition-colors ${expanded['packages'] ? 'bg-gray-50 text-brand-green' : 'text-gray-700 hover:bg-gray-50'}`}
                    >
                        Packages
                        {expanded['packages'] ? <Minus size={20} className="text-brand-green" /> : <Plus size={20} />}
                    </button>
                    {expanded['packages'] && (
                        <div className="bg-brand-blue text-white">
                            {packagesMenu.map((category, index) => (
                                <div key={index} className="border-b border-blue-900/50 last:border-0">
                                    <button 
                                        onClick={() => toggleExpand(`pkg-${index}`)} 
                                        className="w-full flex justify-between items-center p-3 pl-6 text-sm font-medium hover:bg-blue-900/30 transition-colors"
                                    >
                                        {category.title}
                                        {expanded[`pkg-${index}`] ? <Minus size={16} /> : <Plus size={16} />}
                                    </button>
                                    {expanded[`pkg-${index}`] && (
                                        <div className="bg-[#001e38]">
                                            {category.items.map((item, idx) => (
                                                <Link 
                                                    key={idx} 
                                                    to={`/packages/${category.slug}/${item.slug}`}
                                                    className="block p-3 pl-10 text-sm text-gray-300 hover:text-white hover:bg-white/5 border-b border-blue-900/30 last:border-0"
                                                    onClick={() => setIsOpen(false)}
                                                >
                                                    {item.title}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Destinations */}
                <div className="border-b">
                    <button 
                        onClick={() => toggleExpand('destinations')} 
                        className={`w-full flex justify-between items-center p-4 font-medium transition-colors ${expanded['destinations'] ? 'bg-gray-50 text-brand-green' : 'text-gray-700 hover:bg-gray-50'}`}
                    >
                        Destinations
                        {expanded['destinations'] ? <Minus size={20} className="text-brand-green" /> : <Plus size={20} />}
                    </button>
                    {expanded['destinations'] && (
                        <div className="bg-brand-blue text-white grid grid-cols-1">
                            {destinationsMenu.map((place, index) => (
                                <Link 
                                    key={index} 
                                    to={`/destinations/${place.slug}`}
                                    className="block p-3 pl-6 text-sm text-gray-300 hover:text-white hover:bg-white/5 border-b border-blue-900/50 last:border-0"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {place.title}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                {/* Activities */}
                <div className="border-b">
                    <button 
                        onClick={() => toggleExpand('activities')} 
                        className={`w-full flex justify-between items-center p-4 font-medium transition-colors ${expanded['activities'] ? 'bg-gray-50 text-brand-green' : 'text-gray-700 hover:bg-gray-50'}`}
                    >
                        Activities
                        {expanded['activities'] ? <Minus size={20} className="text-brand-green" /> : <Plus size={20} />}
                    </button>
                    {expanded['activities'] && (
                        <div className="bg-brand-blue text-white">
                            {activitiesMenu.map((location, index) => (
                                <div key={index} className="border-b border-blue-900/50 last:border-0">
                                    <button 
                                        onClick={() => toggleExpand(`act-${index}`)} 
                                        className="w-full flex justify-between items-center p-3 pl-6 text-sm font-medium hover:bg-blue-900/30 transition-colors"
                                    >
                                        {location.location}
                                        {expanded[`act-${index}`] ? <Minus size={16} /> : <Plus size={16} />}
                                    </button>
                                    {expanded[`act-${index}`] && (
                                        <div className="bg-[#001e38]">
                                            {location.items.map((item, idx) => (
                                                <Link 
                                                    key={idx} 
                                                    to={`/activities/${createSlug(location.location)}/${item.slug}`}
                                                    className="block p-3 pl-10 text-sm text-gray-300 hover:text-white hover:bg-white/5 border-b border-blue-900/30 last:border-0"
                                                    onClick={() => setIsOpen(false)}
                                                >
                                                    {item.title}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Blog */}
                <Link to="/blogs" className="block p-4 font-medium text-gray-700 border-b hover:bg-gray-50" onClick={() => setIsOpen(false)}>Blog</Link>
                
                <Link to="/about-us" onClick={() => setIsOpen(false)} className="block p-4 font-medium text-gray-700 border-b hover:bg-gray-50">About Us</Link>
                
                {/* More */}
                <div className="border-b">
                    <button 
                        onClick={() => toggleExpand('more')} 
                        className={`w-full flex justify-between items-center p-4 font-medium transition-colors ${expanded['more'] ? 'bg-gray-50 text-brand-green' : 'text-gray-700 hover:bg-gray-50'}`}
                    >
                        More
                        {expanded['more'] ? <Minus size={20} className="text-brand-green" /> : <Plus size={20} />}
                    </button>
                    {expanded['more'] && (
                        <div className="bg-brand-blue text-white">
                            {servicesMenu.map((service, index) => (
                                <Link 
                                    key={index} 
                                    to={`/services/${service.slug}`} 
                                    onClick={() => setIsOpen(false)} 
                                    className="block p-3 pl-6 text-sm text-gray-300 hover:text-white border-b border-blue-900/50"
                                >
                                    {service.title}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                <Link to="/contact" onClick={() => setIsOpen(false)} className="block p-4 font-medium text-gray-700 border-b hover:bg-gray-50">Contact</Link>
            </div>
            
            {/* Mobile Footer */}
            <div className="p-4 bg-gray-50 border-t">
                <a 
                    href="tel:+919876543210" 
                    className="block w-full text-center bg-brand-green text-white px-4 py-3 rounded-md font-bold hover:bg-green-700 transition shadow-md"
                >
                    Call Us Now
                </a>
            </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
