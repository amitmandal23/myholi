import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getActivityData } from '../data/activityDetails';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ActivityBookingModal from '../components/ActivityBookingModal';
import { 
  MapPin, Clock, CheckCircle, XCircle, 
  Phone, Mail, Share2, Download,
  Info, AlertTriangle, Shield
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import SEO from '../components/common/SEO';

const ActivityDetail = () => {
  const { location, slug } = useParams();
  const [activityData, setActivityData] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Fetch data based on URL params
    const fetchActivityData = async () => {
      try {
        setError(null);
        const response = await fetch(`http://localhost:8000/api/activities/slug/${slug}`);
        if (!response.ok) {
          throw new Error('Activity not found');
        }
        const data = await response.json();
        
        // Helper to handle mixed content (HTML string or JSON array string)
          const parseHtmlOrJson = (content) => {
             if (!content) return '';
             // If it's already an object/array (not string), handle it
             if (typeof content !== 'string') {
                 if (Array.isArray(content)) {
                     return `<ul class="list-disc pl-5 space-y-2">${content.map(item => `<li>${item}</li>`).join('')}</ul>`;
                 }
                 return '';
             }
             
             try {
                 // Try parsing as JSON first (for legacy data)
                 const parsed = JSON.parse(content);
                 if (Array.isArray(parsed)) {
                     return `<ul class="list-disc pl-5 space-y-2">${parsed.map(item => `<li>${item}</li>`).join('')}</ul>`;
                 }
                 return content; 
             } catch (e) {
                 // Not JSON, assume it's HTML string
                 return content;
             }
          };

          const parsedData = {
          ...data,
          highlights: parseHtmlOrJson(data.highlights),
          inclusions: parseHtmlOrJson(data.inclusions),
          exclusions: parseHtmlOrJson(data.exclusions),
          guidelines: parseHtmlOrJson(data.guidelines),
          slots: typeof data.slots === 'string' ? JSON.parse(data.slots) : (data.slots || []),
          images: typeof data.images === 'string' ? JSON.parse(data.images) : (data.images || []),
          discountedPrice: Number(data.discounted_price || data.price || 0),
          price: Number(data.price || 0),
        };

        // If no images in gallery, use featured_image as first slide
        if (!parsedData.images || parsedData.images.length === 0) {
            parsedData.images = parsedData.featured_image ? [`http://localhost:8000${parsedData.featured_image}`] : [];
        } else {
             // Prepend base URL to images if needed
             parsedData.images = parsedData.images.map(img => img.startsWith('http') ? img : `http://localhost:8000${img}`);
        }

        setActivityData(parsedData);
      } catch (error) {
        console.error("Failed to fetch activity:", error);
        setError(error.message);
      }
    };

    fetchActivityData();
    window.scrollTo(0, 0);
  }, [location, slug]);

  if (error) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
            <h1 className="text-2xl font-bold text-gray-800">Activity Not Found</h1>
            <p className="text-gray-600">The activity you are looking for does not exist or has been removed.</p>
            <a href="/" className="text-brand-blue hover:underline">Go back home</a>
        </div>
    );
  }

  if (!activityData) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const images = Array.isArray(activityData.images) ? activityData.images : [];
  const slots = Array.isArray(activityData.slots) ? activityData.slots : [];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'highlights', label: 'Highlights' },
    { id: 'inclusions', label: 'Inclusions' },
    { id: 'guidelines', label: 'Important Guidelines' }
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      <SEO 
        title={`${activityData.title} in ${activityData.location}`}
        description={`Experience ${activityData.title} in ${activityData.location}. Book now for best prices and guided tours in Andaman.`}
        image={activityData.images?.[0] || ''}
        keywords={`${activityData.title}, ${activityData.location} activities, things to do in ${activityData.location}, Andaman adventure`}
      />
      <Navbar />

      {/* Breadcrumb & Title Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="text-sm text-gray-500 mb-1 capitalize">
                        Home &gt; Activities &gt; {activityData.location} &gt; {activityData.title}
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                        {activityData.title}
                    </h1>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <span className="flex items-center gap-1"><MapPin size={16} /> {activityData.location}</span>
                        <span className="flex items-center gap-1"><Clock size={16} /> {activityData.duration}</span>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 border border-brand-blue text-brand-blue rounded-lg hover:bg-blue-50 transition-colors font-medium">
                        <Download size={18} /> Download Info
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
            <div className="bg-white rounded-xl overflow-hidden shadow-md">
                <Swiper
                    modules={[Navigation, Autoplay, Pagination]}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 4000 }}
                    loop={true}
                    className="h-[300px] md:h-[400px] w-full"
                >
                    {activityData.images.map((img, idx) => (
                        <SwiperSlide key={idx}>
                            <img src={img} alt={`${activityData.title} - ${idx + 1}`} className="w-full h-full object-cover" />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

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
                    <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Info className="text-brand-blue" /> Overview
                    </h2>
                    <div 
                        className="text-gray-600 leading-relaxed prose prose-blue max-w-none prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-p:text-gray-600 prose-img:rounded-xl prose-img:w-full prose-img:object-cover overflow-hidden break-words"
                        dangerouslySetInnerHTML={{ __html: activityData.overview }}
                    />
                </section>

                {/* Highlights */}
                <section id="highlights" className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 scroll-mt-32">
                    <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Shield className="text-yellow-500" /> Highlights
                    </h2>
                    <div 
                        className="text-gray-600 leading-relaxed prose prose-blue max-w-none prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-p:text-gray-600 prose-img:rounded-xl prose-img:w-full prose-img:object-cover overflow-hidden break-words"
                        dangerouslySetInnerHTML={{ __html: activityData.highlights }}
                    />
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
                                dangerouslySetInnerHTML={{ __html: activityData.inclusions }}
                            />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <XCircle className="text-red-500" /> Exclusions
                            </h2>
                            <div 
                                className="text-gray-600 leading-relaxed prose prose-blue max-w-none prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-p:text-gray-600 prose-img:rounded-xl prose-img:w-full prose-img:object-cover overflow-hidden break-words"
                                dangerouslySetInnerHTML={{ __html: activityData.exclusions }}
                            />
                        </div>
                    </div>
                </section>

                {/* Guidelines */}
                <section id="guidelines" className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 scroll-mt-32">
                    <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <AlertTriangle className="text-orange-500" /> Important Guidelines
                    </h2>
                    <div 
                        className="text-gray-600 leading-relaxed prose prose-blue max-w-none prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-p:text-gray-600 prose-img:rounded-xl prose-img:w-full prose-img:object-cover overflow-hidden break-words"
                        dangerouslySetInnerHTML={{ __html: activityData.guidelines }}
                    />
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
                            <span className="text-gray-400 line-through text-lg">₹{activityData.price.toLocaleString()}</span>
                            <span className="text-3xl font-bold text-gray-900">₹{activityData.discountedPrice.toLocaleString()}</span>
                            <span className="text-xs text-gray-500">Per Person</span>
                        </div>
                    </div>
                    
                    <div className="p-5 space-y-4">
                        <a 
                            href={`https://wa.me/919933288398?text=Hi, I am interested in ${activityData.title}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full bg-brand-orange text-white font-bold py-3 rounded-lg shadow-md hover:bg-orange-600 transition-transform transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                        >
                            <Phone size={18} /> Chat with Activity Expert
                        </a>
                        <button 
                            onClick={() => setIsModalOpen(true)}
                            className="w-full bg-white text-brand-blue font-bold py-3 rounded-lg border-2 border-brand-blue hover:bg-blue-50 transition-colors"
                        >
                            ENQUIRE NOW
                        </button>
                        
                        <div className="pt-4 border-t border-gray-100">
                            <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Available Slots</p>
                            <div className="flex flex-wrap gap-2">
                                {slots.map((slot, i) => (
                                    <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded border border-gray-200">
                                        {slot}
                                    </span>
                                ))}
                            </div>
                        </div>
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

      {/* Activity Booking Modal */}
      <ActivityBookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        activityName={activityData.title}
      />
    </div>
  );
};

export default ActivityDetail;
