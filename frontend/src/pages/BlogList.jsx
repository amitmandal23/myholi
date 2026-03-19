import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Loader, Calendar, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('https://andamanholidaytrips.in/api/blogs');
      if (response.ok) {
        const data = await response.json();
        const processed = data.map(item => ({
            ...item,
            image: item.image && !item.image.startsWith('http') ? `https://andamanholidaytrips.in${item.image}` : item.image
        }));
        setBlogs(processed);
      }
    } catch (err) {
      console.error("Failed to fetch blogs", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-brand-blue py-16 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pattern-dots"></div>
        <h1 className="text-4xl font-bold mb-4 relative z-10">Our Blog</h1>
        <p className="opacity-90 max-w-2xl mx-auto px-4 relative z-10 text-lg">
          Latest news, travel tips, and stories from the Andaman Islands.
        </p>
      </div>

      {/* Blogs Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
           <div className="flex justify-center p-20"><Loader className="animate-spin" /></div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col h-full group">
              <div className="relative overflow-hidden h-48">
                <img 
                  src={blog.image} 
                  alt={blog.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    {new Date(blog.created_at).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <User size={14} />
                    {blog.author}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-brand-blue transition-colors line-clamp-2">
                  {blog.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                  {blog.excerpt || blog.content.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...'}
                </p>

                <Link 
                  to={`/blog/${blog.slug}`} 
                  className="inline-flex items-center gap-2 text-brand-blue font-semibold text-sm hover:gap-3 transition-all"
                >
                  Read More <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
        )}
        
        {!loading && blogs.length === 0 && (
            <div className="text-center py-20 text-gray-500">
                No blog posts found.
            </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default BlogList;
