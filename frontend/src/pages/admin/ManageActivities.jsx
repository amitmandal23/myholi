import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Loader, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const ManageActivities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/activities');
      if (!response.ok) {
        throw new Error('Failed to fetch activities');
      }
      const data = await response.json();
      setActivities(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this activity?')) {
      try {
        await fetch(`http://localhost:8000/api/activities/${id}`, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
          },
        });
        setActivities(activities.filter(act => act.id !== id));
      } catch (err) {
        alert('Failed to delete activity');
      }
    }
  };

  if (loading) return <div className="flex justify-center p-10"><Loader className="animate-spin" /></div>;
  if (error) return <div className="text-red-500 p-10">Error: {error}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Manage Activities</h2>
        <Link to="/dashboard/activities/create" className="bg-brand-blue text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-brand-blue/90">
          <Plus size={20} />
          Add New Activity
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {activities.map((act) => (
              <tr key={act.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-10 w-16 bg-gray-200 rounded overflow-hidden">
                     {act.featured_image || act.image ? (
                       <img 
                         src={`http://localhost:8000${act.featured_image || act.image}`} 
                         alt={act.title} 
                         className="h-full w-full object-cover"
                         onError={(e) => {
                           e.target.onerror = null; 
                           e.target.src = 'https://placehold.co/100x100?text=No+Img';
                         }}
                       />
                     ) : (
                       <span className="text-xs text-gray-400 flex items-center justify-center h-full">No Img</span>
                     )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {act.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {act.location}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {act.duration}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ₹{act.price}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <a 
                    href={act.location ? `/activities/${act.location.toLowerCase().replace(/\s+/g, '-')}/${act.slug}` : '#'} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`text-green-600 hover:text-green-900 mr-3 inline-block ${!act.location ? 'pointer-events-none opacity-50' : ''}`}
                    title="View Page"
                  >
                    <Eye size={18} />
                  </a>
                  <Link to={`/dashboard/activities/edit/${act.id}`} className="text-blue-600 hover:text-blue-900 mr-3 inline-block">
                    <Edit size={18} />
                  </Link>
                  <button onClick={() => handleDelete(act.id)} className="text-red-600 hover:text-red-900">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {activities.length === 0 && (
              <tr>
                <td colSpan="6" className="px-6 py-10 text-center text-gray-500">
                  No activities found. Click "Add New Activity" to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageActivities;
