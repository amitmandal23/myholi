import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/common/SEO';
import { Clock, ArrowRight, Tag, Star, MapPin, Filter } from 'lucide-react';
import Loader from '../components/common/Loader';
import { API_ENDPOINTS, IMAGE_BASE_URL } from '../config/api';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Extract params
  const destination = searchParams.get('destination') || '';
  const duration = searchParams.get('duration') || '';
  const category = searchParams.get('category') || '';
  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        // Build query string
        const params = new URLSearchParams();
        if (destination && destination !== 'All Islands') params.append('destination', destination);
        if (duration && duration !== 'Any Days') params.append('duration', duration);
        if (category && category !== 'All Types') params.append('category', category);
        if (searchQuery) params.append('search', searchQuery);

        const response = await fetch(`${API_ENDPOINTS.PACKAGES}?${params.toString()}`);
        if (response.ok) {
          const data = await response.json();
          // Map data
          const mappedData = data.map(pkg => ({
            id: pkg.id,
            title: pkg.title,
            duration: pkg.duration,
            price: pkg.price ? `₹${Number(pkg.price).toLocaleString('en-IN')}` : 'Get Quote',
            discounted_price: pkg.discounted_price ? `₹${Number(pkg.discounted_price).toLocaleString('en-IN')}` : null,
            image: pkg.featured_image && !pkg.featured_image.startsWith('http')
                  ? `${IMAGE_BASE_URL}${pkg.featured_image}`
                  : (pkg.featured_image || (pkg.images && pkg.images[0]) || '/img/hero-1.jpg'),
            type: pkg.category.replace('-', ' '),
            rating: 4.8, 
            category: pkg.category,
            slug: pkg.slug
          }));
          setPackages(mappedData);
        }
      } catch (error) {
        console.error("Failed to fetch search results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
    window.scrollTo(0, 0);
  }, [destination, duration, category, searchQuery]);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col font-sans">
      <SEO 
        title="Search Results" 
        description="Find your perfect Andaman holiday package."
      />
      <Navbar />
      
      {/* Hero Header */}
      <div className="relative bg-brand-blue py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
            <img src="/img/hero-1.jpg" alt="Background" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-blue to-blue-900 opacity-90"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
                Your Dream Vacation Awaits
            </h1>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-8">
                Explore our handpicked packages tailored just for you.
            </p>
            
            {/* Active Filters Badge */}
            <div className="inline-flex flex-wrap justify-center gap-3">
                {destination && destination !== 'All Islands' && (
                    <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 border border-white/30">
                        <MapPin size={14} /> {destination}
                    </span>
                )}
                {duration && duration !== 'Any Days' && (
                    <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 border border-white/30">
                        <Clock size={14} /> {duration.includes('+') ? duration : `Upto ${duration} Days`}
                    </span>
                )}
                {category && category !== 'All Types' && (
                    <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 border border-white/30">
                        <Tag size={14} /> {category}
                    </span>
                )}
                 {searchQuery && (
                    <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 border border-white/30">
                        <Filter size={14} /> "{searchQuery}"
                    </span>
                )}
            </div>
        </div>
      </div>

      <div className="flex-1 max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 w-full">
        {loading ? (
           <div className="flex flex-col justify-center items-center h-64 gap-4">
             <Loader className="animate-spin text-brand-blue" size={48} />
             <p className="text-gray-500 font-medium">Finding the best packages for you...</p>
           </div>
        ) : packages.length > 0 ? (
          <>
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800">
                    Found {packages.length} Packages
                </h2>
                {/* Could add a Sort By dropdown here later */}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {packages.map((pkg) => (
                <div key={pkg.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group flex flex-col border border-gray-100 transform hover:-translate-y-1">
                    <div className="relative h-64 overflow-hidden">
                        <img 
                        src={pkg.image} 
                        alt={pkg.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                        
                        <div className="absolute top-4 left-4">
                            <span className="bg-white/90 backdrop-blur-sm text-brand-blue text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1 uppercase tracking-wide">
                            <Tag size={12} /> {pkg.type}
                            </span>
                        </div>
                        
                        <div className="absolute bottom-4 left-4 text-white">
                            <div className="flex items-center gap-1 text-yellow-400 mb-1">
                                <Star size={16} fill="currentColor" />
                                <span className="text-sm font-bold">{pkg.rating}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-6 flex-1 flex flex-col">
                        <h3 className="font-bold text-xl text-gray-900 mb-3 line-clamp-2 group-hover:text-brand-blue transition-colors">
                            {pkg.title}
                        </h3>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-6 border-b border-gray-100 pb-4">
                            <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1 rounded-lg">
                                <Clock size={16} className="text-brand-green" />
                                <span className="font-medium">{pkg.duration}</span>
                            </div>
                        </div>
                        
                        <div className="mt-auto flex items-center justify-between gap-4">
                            <div>
                                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Starting From</p>
                                <div className="flex items-baseline gap-2">
                                    {pkg.discounted_price ? (
                                        <>
                                            <span className="text-2xl font-bold text-brand-blue">{pkg.discounted_price}</span>
                                            <span className="text-sm text-gray-400 line-through">{pkg.price}</span>
                                        </>
                                    ) : (
                                        <span className="text-2xl font-bold text-brand-blue">{pkg.price}</span>
                                    )}
                                </div>
                            </div>
                            
                            <Link 
                            to={`/packages/${pkg.category}/${pkg.slug}`}
                            className="bg-brand-blue text-white hover:bg-blue-700 p-3 rounded-full shadow-md transition-all transform hover:scale-110 hover:shadow-lg"
                            title="View Details"
                            >
                            <ArrowRight size={20} />
                            </Link>
                        </div>
                    </div>
                </div>
                ))}
            </div>
          </>
        ) : (
          <div className="text-center py-24 bg-white rounded-3xl shadow-sm border border-gray-100 max-w-3xl mx-auto">
             <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-blue animate-pulse">
                <MapPin size={48} />
             </div>
             <h3 className="text-2xl font-bold text-gray-900 mb-3">No Packages Found</h3>
             <p className="text-gray-500 max-w-md mx-auto mb-8 text-lg">
               We couldn't find any packages matching your exact criteria. Try adjusting your filters or browse all our amazing tours.
             </p>
             <Link 
                to="/" 
                className="inline-flex items-center gap-2 bg-brand-blue text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
             >
                View All Packages <ArrowRight size={18} />
             </Link>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default SearchPage;
