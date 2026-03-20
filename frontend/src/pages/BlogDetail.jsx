import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Calendar, User, Clock, ArrowRight } from 'lucide-react';
import SEO from '../components/common/SEO';
import { API_ENDPOINTS, IMAGE_BASE_URL } from '../config/api';

const BlogDetail = () => {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.BLOG_BY_SLUG(slug));
        if (!response.ok) throw new Error('Blog not found');
        const result = await response.json();
        
        // Fix image path
        if (result.image && !result.image.startsWith('http')) {
            result.image = `${IMAGE_BASE_URL}${result.image}`;
        }
        
        // Parse related posts if needed (though API returns JSON usually)
        if (typeof result.related_posts === 'string') {
            try {
                result.relatedPosts = JSON.parse(result.related_posts);
            } catch (e) {
                result.relatedPosts = [];
            }
        } else {
             result.relatedPosts = result.related_posts || [];
        }

        // Format date
        if (result.published_at) {
            result.date = new Date(result.published_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }

        setData(result);
      } catch (err) {
        console.error("Failed to fetch blog:", err);
        setError(err.message);
      }
    };

    fetchBlogData();
    window.scrollTo(0, 0);
  }, [slug]);

  if (error) {
      return (
          <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
              <h1 className="text-2xl font-bold text-gray-800">Blog Not Found</h1>
              <a href="/" className="text-brand-blue hover:underline">Go back home</a>
          </div>
      );
  }

  if (!data) return <div>Loading...</div>;

  return (
    <div className="bg-gray-50 min-h-screen">
      <SEO 
        title={data.title}
        description={data.excerpt || `Read about ${data.title} - expert travel tips and guides for Andaman holidays.`}
        image={data.image}
        type="article"
        keywords={`${data.title}, Andaman blog, travel tips, ${data.author}`}
      />
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-4">
                <span className="flex items-center gap-1"><Calendar size={14} /> {data.date}</span>
                <span className="flex items-center gap-1"><User size={14} /> {data.author}</span>
                <span className="flex items-center gap-1"><Clock size={14} /> 5 min read</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">{data.title}</h1>
            <div className="w-full h-[400px] rounded-2xl overflow-hidden shadow-lg">
                <img src={data.image} alt={data.title} className="w-full h-full object-cover" />
            </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 prose prose-lg max-w-none prose-blue prose-img:rounded-xl prose-img:w-full prose-img:object-cover overflow-hidden break-words">
            <div dangerouslySetInnerHTML={{ __html: data.content }} />
        </div>

        {/* Related Posts */}
        <div className="mt-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Read Next</h3>
            <div className="grid md:grid-cols-3 gap-6">
                {data.relatedPosts.map((post, idx) => (
                    <Link key={idx} to={`/blog/${post.slug}`} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition group">
                        <h4 className="font-bold text-gray-900 group-hover:text-brand-blue transition-colors mb-2">{post.title}</h4>
                        <span className="text-brand-blue text-sm font-medium flex items-center gap-1">
                            Read Article <ArrowRight size={14} />
                        </span>
                    </Link>
                ))}
            </div>
        </div>

      </div>

      <Footer />
    </div>
  );
};

export default BlogDetail;
