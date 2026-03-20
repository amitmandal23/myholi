import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { CheckCircle, Phone } from 'lucide-react';
import SEO from '../components/common/SEO';
import { API_ENDPOINTS, IMAGE_BASE_URL } from '../config/api';

const ServiceDetail = () => {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.SERVICE_BY_SLUG(slug));
        if (!response.ok) throw new Error('Service not found');
        const result = await response.json();
        
        // Fix image path
        if (result.image && !result.image.startsWith('http')) {
            result.image = `${IMAGE_BASE_URL}${result.image}`;
        }

        // Parse features
        if (typeof result.features === 'string') {
            try {
                result.features = JSON.parse(result.features);
            } catch (e) {
                result.features = [];
            }
        } else {
            result.features = result.features || [];
        }

        setData(result);
      } catch (err) {
        console.error("Failed to fetch service:", err);
        setError(err.message);
      }
    };

    fetchServiceData();
    window.scrollTo(0, 0);
  }, [slug]);

  if (error) {
      return (
          <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
              <h1 className="text-2xl font-bold text-gray-800">Service Not Found</h1>
              <a href="/" className="text-brand-blue hover:underline">Go back home</a>
          </div>
      );
  }

  if (!data) return <div>Loading...</div>;

  return (
    <div className="bg-gray-50 min-h-screen">
      <SEO 
        title={`${data.title} Services`}
        description={`Best ${data.title} services in Andaman. ${data.description.replace(/<[^>]*>?/gm, '').substring(0, 100)}...`}
        image={data.image}
        keywords={`${data.title}, Andaman services, travel booking, car rental, ferry booking`}
      />
      <Navbar />
      
      <div className="relative h-[50vh]">
        <img src={data.image} alt={data.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white">{data.title}</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Overview</h2>
          <div 
            className="text-gray-600 leading-relaxed text-lg mb-8 prose prose-blue max-w-none prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-p:text-gray-600 prose-img:rounded-xl prose-img:w-full prose-img:object-cover overflow-hidden break-words"
            dangerouslySetInnerHTML={{ __html: data.description }}
          />

          <h3 className="text-xl font-bold text-gray-900 mb-6">Why Choose Our {data.title}?</h3>
          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {data.features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-blue-50 p-4 rounded-lg text-brand-blue font-medium">
                <CheckCircle size={20} />
                {feature}
              </div>
            ))}
          </div>

          <div className="bg-brand-orange text-white rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-2">Ready to Book?</h3>
            <p className="opacity-90 mb-6">Contact our experts to get the best deals on {data.title}</p>
            <a href="tel:+919933288398" className="inline-flex items-center gap-2 bg-white text-brand-orange px-8 py-3 rounded-lg font-bold hover:bg-orange-50 transition">
              <Phone size={20} /> Call Now
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ServiceDetail;
