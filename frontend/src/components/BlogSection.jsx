import React from 'react';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const BlogSection = () => {
  const blogs = [
    {
      category: "Travel Guide",
      title: "Complete Guide to Havelock Island: Beaches, Cafes & Stays",
      image: "https://images.unsplash.com/photo-1590050752117-238cb0fb9dce?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      date: "Jan 15, 2024",
      author: "Priya Sharma",
      slug: "complete-guide-to-havelock-island"
    },
    {
      category: "Adventure",
      title: "Scuba Diving in Andaman: Best Spots for Beginners",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      date: "Jan 10, 2024",
      author: "Mike Johnson",
      slug: "scuba-diving-in-andaman"
    },
    {
      category: "Tips & Tricks",
      title: "Packing for Andaman: 10 Things You Must Not Forget",
      image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      date: "Jan 05, 2024",
      author: "Team Andaman",
      slug: "packing-for-andaman"
    },
    {
      category: "Culture",
      title: "Top 5 Local Dishes You Must Try in Port Blair",
      image: "https://images.unsplash.com/photo-1606471191009-63994c53433b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      date: "Dec 28, 2023",
      author: "Anjali Gupta",
      slug: "top-5-local-dishes"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Travel Tips & <span className="text-brand-blue">Inspiration</span>
                </h2>
                <p className="text-gray-600 text-lg">
                  Expert advice to help you plan the perfect island getaway.
                </p>
            </div>
            <button className="hidden md:flex bg-white border border-gray-200 hover:border-brand-blue hover:text-brand-blue text-gray-700 font-bold py-3 px-6 rounded-full transition-all duration-300 items-center gap-2">
                View All Articles <ArrowRight size={18} />
            </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {blogs.map((blog, index) => (
            <Link to={`/blog/${blog.slug}`} key={index} className="group cursor-pointer bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col h-full">
              <div className="h-56 relative overflow-hidden">
                <img 
                  src={blog.image} 
                  alt={blog.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-brand-blue text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                  {blog.category}
                </span>
              </div>
              
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {blog.date}</span>
                    <span className="flex items-center gap-1"><User size={12} /> {blog.author}</span>
                </div>
                
                <h3 className="font-bold text-lg text-gray-900 mb-4 line-clamp-2 group-hover:text-brand-blue transition-colors flex-1">
                  {blog.title}
                </h3>
                
                <div className="flex items-center text-brand-blue font-bold text-sm mt-auto group/link">
                  Read Article <ArrowRight size={16} className="ml-2 transition-transform duration-300 group-hover/link:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-12 text-center md:hidden">
           <button className="bg-white border border-gray-200 hover:border-brand-blue hover:text-brand-blue text-gray-700 font-bold py-3 px-8 rounded-full transition-all duration-300 inline-flex items-center gap-2">
            View All Articles <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
