import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPackageData } from '../data/packageDetails';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BookingModal from '../components/BookingModal';
import { 
  MapPin, Clock, Calendar, CheckCircle, XCircle, 
  Phone, Mail, FileText, Download, Share2, 
  Utensils, Car, BedDouble, Camera, ChevronDown, ChevronUp
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import SEO from '../components/common/SEO';
import { API_ENDPOINTS, IMAGE_BASE_URL } from '../config/api';

const PackageDetail = () => {
  const { category, slug } = useParams();
  const [packageData, setPackageData] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedPolicy, setExpandedPolicy] = useState('booking');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Fetch data based on URL params
    const fetchPackageData = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.PACKAGE_BY_SLUG(category, slug), {
            headers: {
                'Accept': 'application/json'
            }
        });
        if (!response.ok) {
           throw new Error('Package not found');
        }
        const data = await response.json();

        // Helper to parse HTML or JSON
        const parseHtmlOrJson = (content) => {
             if (!content) return '';
             if (typeof content !== 'string') {
                 if (Array.isArray(content)) {
                     return `<ul class="list-disc pl-5 space-y-2">${content.map(item => `<li>${item}</li>`).join('')}</ul>`;
                 }
                 return '';
             }
             try {
                 const parsed = JSON.parse(content);
                 if (Array.isArray(parsed)) {
                     return `<ul class="list-disc pl-5 space-y-2">${parsed.map(item => `<li>${item}</li>`).join('')}</ul>`;
                 }
                 return content;
             } catch {
                 return content;
             }
        };

        // Ensure JSON fields are parsed
        const parsedData = {
          ...data,
          hotel_details: typeof data.hotel_details === 'string' ? JSON.parse(data.hotel_details) : (data.hotel_details || []),
          itinerary: typeof data.itinerary === 'string' ? JSON.parse(data.itinerary) : (data.itinerary || []),
          inclusions: parseHtmlOrJson(data.inclusions),
          exclusions: parseHtmlOrJson(data.exclusions),
          images: typeof data.images === 'string' ? JSON.parse(data.images) : (data.images || []),
          discountedPrice: Number(data.discounted_price || data.price), // Map snake_case to camelCase
          price: Number(data.price),
        };

        // If no images in gallery, use featured_image as first slide
        if (!parsedData.images || parsedData.images.length === 0) {
            parsedData.images = parsedData.featured_image ? [`${IMAGE_BASE_URL}${parsedData.featured_image}`] : [];
        } else {
             // Prepend base URL to images if needed
             parsedData.images = parsedData.images.map(img => img.startsWith('http') ? img : `${IMAGE_BASE_URL}${img}`);
        }

        setPackageData(parsedData);
      } catch (err) {
        console.error("Failed to fetch package:", err);
        setError(err.message);
      }
    };

    fetchPackageData();
    window.scrollTo(0, 0);
  }, [category, slug]);

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">Error: {error}</div>;
  }

  if (!packageData) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // Destructure and prepare data for rendering
  const { 
      hotel_details, 
      itinerary = [], 
      inclusions = '', 
      exclusions = '', 
      price, 
      discountedPrice, 
      duration, 
      title, 
      overview, 
      images 
  } = packageData;

  // Handle hotelData: it might be an array or object. We expect an array based on Form, but JSX expects an object.
  // Taking the first hotel if it's an array.
  const hotelData = Array.isArray(hotel_details) ? (hotel_details[0] || {}) : (hotel_details || {});

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'itinerary', label: 'Day Wise Itinerary' },
    { id: 'inclusions', label: 'Inclusions/Exclusions' },
    { id: 'policies', label: 'Additional Info' }
  ];

  const togglePolicy = (policy) => {
    setExpandedPolicy(expandedPolicy === policy ? null : policy);
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      <SEO 
        title={packageData.title}
        description={`Book ${packageData.title} - ${packageData.duration} package. Best price guaranteed for ${category.replace(/-/g, ' ')} in Andaman.`}
        image={packageData.images[0]}
        keywords={`${packageData.title}, Andaman packages, ${category} packages, holiday in Andaman`}
      />
      <Navbar />
      
      {/* Breadcrumb & Title Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="text-sm text-gray-500 mb-1 capitalize">
                        Home &gt; {category.replace(/-/g, ' ')} &gt; {packageData.title}
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                        {packageData.title} <span className="text-lg font-normal text-gray-500 ml-2">{packageData.duration}</span>
                        <span className="ml-3 inline-block px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded-full uppercase tracking-wide">Land Only</span>
                    </h1>
                    <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                        <MapPin size={16} /> 2N Port Blair | 2N Havelock | 1N Neil Island
                    </div>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 border border-brand-blue text-brand-blue rounded-lg hover:bg-blue-50 transition-colors font-medium">
                        <Download size={18} /> Download PDF
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                        <Share2 size={18} />
                    </button>
                </div>
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Content Column */}
          <div className="lg:col-span-2 space-y-8 min-w-0">
            
            {/* Image Slider */}
            {packageData.images && packageData.images.length > 0 ? (
            <div className="bg-white rounded-xl overflow-hidden shadow-md">
                <Swiper
                    modules={[Navigation, Autoplay, Pagination]}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 4000 }}
                    loop={packageData.images.length > 1}
                    className="h-[300px] md:h-[400px] w-full"
                >
                    {packageData.images.map((img, idx) => (
                        <SwiperSlide key={idx}>
                            <img src={img} alt={`${packageData.title} - ${idx + 1}`} className="w-full h-full object-cover" />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            ) : (
                <div className="bg-gray-200 h-[300px] md:h-[400px] w-full rounded-xl flex items-center justify-center text-gray-400">
                    No images available
                </div>
            )}

            {/* Navigation Tabs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 sticky top-20 z-40 overflow-x-auto">
                <div className="flex border-b min-w-max">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => {
                                setActiveTab(tab.id);
                                document.getElementById(tab.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }}
                            className={`px-6 py-4 font-semibold text-sm transition-colors relative ${
                                activeTab === tab.id 
                                ? 'text-brand-blue' 
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            {tab.label}
                            {activeTab === tab.id && (
                                <span className="absolute bottom-0 left-0 w-full h-1 bg-brand-blue rounded-t-full"></span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Sections */}
            <div className="space-y-8">
                
                {/* Overview */}
                <section id="overview" className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 scroll-mt-32">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Package Overview</h2>
                    <div 
                        className="text-gray-600 leading-relaxed prose prose-blue max-w-none prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-p:text-gray-600 prose-img:rounded-xl prose-img:w-full prose-img:object-cover overflow-hidden break-words"
                        dangerouslySetInnerHTML={{ __html: packageData.overview }}
                    />
                </section>

                {/* Hotel Details */}
                {hotelData.name && (
                <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Hotel Details</h2>
                    <div className="flex flex-col md:flex-row gap-4 border rounded-lg p-4 hover:shadow-md transition-shadow">
                        {hotelData.image && <img src={hotelData.image} alt={hotelData.name} className="w-full md:w-32 h-24 object-cover rounded-lg" />}
                        <div className="flex-1">
                            <h3 className="font-bold text-lg text-gray-800">{hotelData.name}</h3>
                            <div className="flex items-center gap-1 text-yellow-500 my-1">
                                {[...Array(Number(hotelData.star) || 0)].map((_, i) => <span key={i}>★</span>)}
                            </div>
                            <p className="text-sm text-gray-500 flex items-center gap-1">
                                <MapPin size={14} /> {hotelData.location}
                            </p>
                        </div>
                        <div className="flex items-center">
                            <button className="text-brand-blue font-semibold text-sm border border-brand-blue px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
                                View More
                            </button>
                        </div>
                    </div>
                </section>
                )}

                {/* Day Wise Itinerary */}
                <section id="itinerary" className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 scroll-mt-32">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Day Wise Itinerary</h2>
                    <div className="space-y-6">
                        {itinerary.map((day, idx) => (
                            <div key={idx} className="relative pl-8 md:pl-0">
                                {/* Timeline Line for Desktop */}
                                <div className="hidden md:block absolute left-[27px] top-8 bottom-[-24px] w-0.5 bg-gray-200 last:bottom-auto"></div>
                                
                                <div className="flex flex-col md:flex-row gap-4">
                                    {/* Day Badge */}
                                    <div className="flex-shrink-0 z-10">
                                        <div className="w-14 h-14 bg-brand-blue text-white rounded-full flex items-center justify-center font-bold shadow-md text-sm text-center leading-tight">
                                            Day<br/><span className="text-lg">{day.day || idx + 1}</span>
                                        </div>
                                    </div>
                                    
                                    {/* Content */}
                                    <div className="flex-1 bg-blue-50/50 rounded-xl p-5 border border-blue-100">
                                        <h3 className="text-lg font-bold text-gray-900 mb-3">{day.title}</h3>
                                        
                                        {/* Render HTML Content if available, else fallback to activities array */}
                                        {day.content ? (
                                            <div 
                                                className="text-gray-700 text-sm prose prose-blue max-w-none prose-h1:text-lg prose-h2:text-base prose-p:text-sm prose-img:rounded-xl prose-img:w-full prose-img:object-cover overflow-hidden break-words"
                                                dangerouslySetInnerHTML={{ __html: day.content }}
                                            />
                                        ) : (
                                            <ul className="space-y-2">
                                                {(day.activities || []).map((activity, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-gray-700 text-sm">
                                                        <span className="mt-1.5 w-1.5 h-1.5 bg-brand-blue rounded-full flex-shrink-0"></span>
                                                        {activity}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Inclusions / Exclusions */}
                <section id="inclusions" className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 scroll-mt-32">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <CheckCircle className="text-green-500" /> Inclusions
                            </h2>
                            <div 
                                className="text-gray-600 leading-relaxed prose prose-blue max-w-none prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-p:text-gray-600 prose-img:rounded-xl prose-img:w-full prose-img:object-cover overflow-hidden break-words"
                                dangerouslySetInnerHTML={{ __html: inclusions }}
                            />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <XCircle className="text-red-500" /> Exclusions
                            </h2>
                            <div 
                                className="text-gray-600 leading-relaxed prose prose-blue max-w-none prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-p:text-gray-600 prose-img:rounded-xl prose-img:w-full prose-img:object-cover overflow-hidden break-words"
                                dangerouslySetInnerHTML={{ __html: exclusions }}
                            />
                        </div>
                    </div>
                </section>

                {/* Policies / Terms */}
                <section id="policies" className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 scroll-mt-32">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Terms & Conditions</h2>
                    <div className="space-y-3">
                        {[
                            { id: 'validity', title: 'Tour Validity', content: 'The deal is valid for travel till 31st March 2026.' },
                            { id: 'booking', title: 'Booking Policy', content: 'At the time of booking: 50% of total package cost. Within 30 days of departure: 100% of full tour cost.' },
                            { id: 'cancellation', title: 'Cancellation Policy', content: '21 days prior: 50% refund. 15 days prior: 25% refund. Less than 15 days: No refund.' },
                            { id: 'visa', title: 'Visa Easy', content: 'Indian nationals do not require a visa for Andaman. Foreign nationals require a permit.' }
                        ].map((policy) => (
                            <div key={policy.id} className="border border-gray-200 rounded-lg overflow-hidden">
                                <button 
                                    onClick={() => togglePolicy(policy.id)}
                                    className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                                >
                                    <span className="font-semibold text-gray-900">{policy.title}</span>
                                    {expandedPolicy === policy.id ? <ChevronUp size={20} className="text-gray-500"/> : <ChevronDown size={20} className="text-gray-500"/>}
                                </button>
                                {expandedPolicy === policy.id && (
                                    <div className="p-4 bg-white text-sm text-gray-600 border-t border-gray-200">
                                        {policy.content}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

            </div>
          </div>

          {/* Right Sidebar - Sticky Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
                
                {/* Price & Booking Card */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="bg-blue-50 p-4 border-b border-blue-100">
                        <p className="text-sm text-gray-500 mb-1">Starting from</p>
                        <div className="flex items-baseline gap-2">
                            <span className="text-gray-400 line-through text-lg">₹{packageData.price.toLocaleString()}</span>
                            <span className="text-3xl font-bold text-gray-900">₹{packageData.discountedPrice.toLocaleString()}</span>
                            <span className="text-xs text-gray-500">Per Person</span>
                        </div>
                    </div>
                    
                    <div className="p-5 space-y-4">
                        <a 
                            href={`https://wa.me/919933288398?text=Hi, I am interested in ${packageData.title} package`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full bg-brand-orange text-white font-bold py-3 rounded-lg shadow-md hover:bg-orange-600 transition-transform transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                        >
                            <Phone size={18} /> Chat with your tour manager
                        </a>
                        <button 
                            onClick={() => setIsModalOpen(true)}
                            className="w-full bg-white text-brand-blue font-bold py-3 rounded-lg border-2 border-brand-blue hover:bg-blue-50 transition-colors"
                        >
                            ENQUIRE NOW
                        </button>
                        
                        <div className="pt-4 border-t border-gray-100 grid grid-cols-2 gap-4 text-center">
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wide">Duration</p>
                                <p className="font-semibold text-gray-800 text-sm">{packageData.duration}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wide">Places to Visit</p>
                                <p className="font-semibold text-gray-800 text-sm">3 Cities</p>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-100">
                            <p className="text-xs text-center text-gray-500 uppercase tracking-wide mb-3">Package Includes</p>
                            <div className="flex justify-between px-2">
                                {[
                                    { icon: <BedDouble size={20} />, label: 'Hotel' },
                                    { icon: <Camera size={20} />, label: 'Sightseeing' },
                                    { icon: <Car size={20} />, label: 'Transfer' },
                                    { icon: <Utensils size={20} />, label: 'Meal' }
                                ].map((item, i) => (
                                    <div key={i} className="flex flex-col items-center gap-1 text-gray-600">
                                        <div className="p-2 bg-gray-100 rounded-full text-brand-blue">{item.icon}</div>
                                        <span className="text-[10px] font-medium">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Offers Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold text-gray-900">Offers & Promo Code</h3>
                        <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded font-bold">New</span>
                    </div>
                    <div className="border border-dashed border-gray-300 bg-gray-50 p-3 rounded-lg">
                        <div className="flex justify-between items-center mb-1">
                            <span className="font-bold text-gray-800">ANDAMAN20</span>
                            <button className="text-xs text-blue-600 font-semibold hover:underline">Apply</button>
                        </div>
                        <p className="text-xs text-gray-500">Get flat Rs. 2000 instant discount on holiday packages.</p>
                    </div>
                </div>

                {/* Help Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                    <h3 className="font-bold text-gray-900 mb-3">Need Help?</h3>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-brand-blue">
                                <Phone size={16} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400">Call Us</p>
                                <p className="font-semibold text-gray-800">+91 99332 88398</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-brand-blue">
                                <Mail size={16} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400">Email Us</p>
                                <p className="font-semibold text-gray-800">info@andamanholidaytrips.com</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
          </div>

        </div>
      </div>
      <Footer />
      
      {/* Booking Modal */}
      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        packageName={packageData.title}
      />
    </div>
  );
};

export default PackageDetail;
