import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Loader } from 'lucide-react';
import { Link } from 'react-router-dom';

const ManageDestinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/destinations');
      if (!response.ok) {
        throw new Error('Failed to fetch destinations');
      }
      const data = await response.json();
      setDestinations(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this destination?')) {
      try {
        await fetch(`http://localhost:8000/api/destinations/${id}`, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
          },
        });
        setDestinations(destinations.filter(item => item.id !== id));
      } catch (err) {
        alert('Failed to delete destination');
      }
    }
  };

  if (loading) return <div className="flex justify-center p-10"><Loader className="animate-spin" /></div>;
  if (error) return <div className="text-red-500 p-10">Error: {error}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Manage Destinations</h2>
        <Link to="/dashboard/destinations/create" className="bg-brand-blue text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-brand-blue/90">
          <Plus size={20} />
          Add New Destination
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Best Time</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {destinations.map((dest) => (
              <tr key={dest.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-10 w-16 bg-gray-200 rounded overflow-hidden">
                     {dest.hero_image ? (
                       <img src={`http://localhost:8000${dest.hero_image}`} alt={dest.title} className="h-full w-full object-cover" />
                     ) : (
                       <span className="text-xs text-gray-400 flex items-center justify-center h-full">No Img</span>
                     )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {dest.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {dest.best_time}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link to={`/dashboard/destinations/edit/${dest.id}`} className="text-blue-600 hover:text-blue-900 mr-3 inline-block">
                    <Edit size={18} />
                  </Link>
                  <button onClick={() => handleDelete(dest.id)} className="text-red-600 hover:text-red-900">
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

export default ManageDestinations;
