import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { MapPin, Sun, Compass } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import SEO from '../components/common/SEO';
import { API_ENDPOINTS, IMAGE_BASE_URL } from '../config/api';

const DestinationDetail = () => {
  const { slug } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDestinationData = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.DESTINATION_BY_SLUG(slug));
        if (!response.ok) throw new Error('Destination not found');
        const result = await response.json();
        
        // Helper to parse HTML or JSON
        const parseHtmlOrJson = (content) => {
             if (!content) return '';
             const convertItem = (i) => {
                 if (typeof i === 'string') return i;
                 if (typeof i === 'object' && i !== null) return `<strong>${i.title || ''}</strong>: ${i.description || ''}`;
                 return JSON.stringify(i);
             };

             if (typeof content !== 'string') {
                 if (Array.isArray(content)) {
                     return `<ul class="list-disc pl-5 space-y-2">${content.map(item => `<li>${convertItem(item)}</li>`).join('')}</ul>`;
                 }
                 return '';
             }
             try {
                 const parsed = JSON.parse(content);
                 if (Array.isArray(parsed)) {
                     return `<ul class="list-disc pl-5 space-y-2">${parsed.map(item => `<li>${convertItem(item)}</li>`).join('')}</ul>`;
                 }
                 return content;
             } catch {
                 return content;
             }
        };

        // Parse JSON fields
        const parsedData = {
          ...result,
          attractions: parseHtmlOrJson(result.attractions),
          images: typeof result.images === 'string' ? JSON.parse(result.images) : (result.images || []),
          bestTime: result.best_time,
          howToReach: parseHtmlOrJson(result.how_to_reach)
        };

        // Fix image paths if needed
        if (parsedData.hero_image && !parsedData.hero_image.startsWith('http')) {
            parsedData.heroImage = `${IMAGE_BASE_URL}${parsedData.hero_image}`;
        } else {
            parsedData.heroImage = parsedData.hero_image;
        }

        setData(parsedData);
      } catch (err) {
        console.error("Failed to fetch destination:", err);
      }
    };

    fetchDestinationData();
    window.scrollTo(0, 0);
  }, [slug]);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="bg-gray-50 min-h-screen">
      <SEO 
        title={`${data.title} Travel Guide`}
        description={`Explore ${data.title} in Andaman. Best places to visit, attractions, and travel guide for ${data.title}.`}
        image={data.heroImage}
        keywords={`${data.title}, ${data.title} tourism, places to visit in ${data.title}, Andaman islands guide`}
      />
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-[60vh]">
        <img src={data.heroImage} alt={data.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{data.title}</h1>
            <div className="flex items-center justify-center gap-2 text-lg">
              <MapPin size={24} />
              <span>Andaman Islands</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12 min-w-0">
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About {data.title}</h2>
              <div 
                className="text-gray-600 leading-relaxed text-lg prose prose-blue max-w-none prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-p:text-gray-600 prose-img:rounded-xl prose-img:w-full prose-img:object-cover overflow-hidden break-words"
                dangerouslySetInnerHTML={{ __html: data.description }}
              />
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Top Attractions</h2>
              <div 
                className="text-gray-600 leading-relaxed text-lg prose prose-blue max-w-none prose-h1:text-2xl prose-h2:text-xl prose-img:rounded-xl overflow-hidden break-words"
                dangerouslySetInnerHTML={{ __html: data.attractions }}
              />
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8 sticky top-24 self-start">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Sun className="text-orange-500" /> Best Time to Visit
              </h3>
              <p className="text-gray-600 text-sm">{data.bestTime}</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Compass className="text-blue-500" /> How to Reach
              </h3>
              <div 
                className="text-gray-600 text-sm prose prose-sm prose-blue max-w-none prose-h1:text-xl prose-h2:text-lg prose-p:text-sm prose-img:rounded-xl prose-img:w-full prose-img:object-cover overflow-hidden break-words"
                dangerouslySetInnerHTML={{ __html: data.howToReach }}
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DestinationDetail;
