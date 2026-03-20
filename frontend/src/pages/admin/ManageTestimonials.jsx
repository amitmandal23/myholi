import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Loader, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { API_ENDPOINTS, IMAGE_BASE_URL } from '../../config/api';

const ManageTestimonials = () => {
  const { token } = useAuth();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token) {
        fetchTestimonials();
    }
  }, [token]);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.TESTIMONIALS, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch testimonials');
      }
      const data = await response.json();
      setTestimonials(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      try {
        await fetch(`${API_ENDPOINTS.TESTIMONIALS}/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        });
        setTestimonials(testimonials.filter(item => item.id !== id));
      } catch (err) {
        alert('Failed to delete testimonial');
      }
    }
  };

  if (loading) return <div className="flex justify-center p-10"><Loader className="animate-spin" /></div>;
  if (error) return <div className="text-red-500 p-10">Error: {error}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Manage Testimonials</h2>
        <Link to="/dashboard/testimonials/create" className="bg-brand-blue text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-brand-blue/90">
          <Plus size={20} />
          Add New Testimonial
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {testimonials.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      {item.image ? (
                         <img className="h-10 w-10 rounded-full object-cover" src={`${IMAGE_BASE_URL}${item.image}`} alt={item.name} />
                      ) : (
                         <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs">No Img</div>
                      )}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{item.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill={i < item.rating ? "currentColor" : "none"} stroke="currentColor" className={i < item.rating ? "text-yellow-400" : "text-gray-300"} />
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.location}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link to={`/dashboard/testimonials/edit/${item.id}`} className="text-blue-600 hover:text-blue-900 mr-3 inline-block">
                    <Edit size={18} />
                  </Link>
                  <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageTestimonials;
