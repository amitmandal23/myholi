import React, { useState, useEffect } from 'react';
import { Loader } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { API_ENDPOINTS } from '../../config/api';

const DashboardHome = () => {
  const { token } = useAuth();
  const [stats, setStats] = useState({
    packages_count: 0,
    activities_count: 0,
    destinations_count: 0,
    blogs_count: 0,
    inquiries_pending: 0,
    recent_inquiries: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.DASHBOARD_STATS, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        });
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        } else {
            setError('Failed to load dashboard data.');
        }
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        setError('Network error.');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
        fetchStats();
    }
  }, [token]);

  if (loading) return <div className="flex justify-center p-10"><Loader className="animate-spin" /></div>;

  if (error) return (
      <div className="flex flex-col items-center justify-center p-10 text-red-500">
          <p className="font-bold mb-2">Error</p>
          <p>{error}</p>
      </div>
  );

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium uppercase">Total Packages</h3>
          <p className="text-3xl font-bold text-brand-blue mt-2">{stats.packages_count}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium uppercase">Active Inquiries</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">{stats.inquiries_pending}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium uppercase">Total Activities</h3>
          <p className="text-3xl font-bold text-purple-600 mt-2">{stats.activities_count}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium uppercase">Blogs Published</h3>
          <p className="text-3xl font-bold text-orange-600 mt-2">{stats.blogs_count}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h3 className="font-bold text-lg mb-4">Recent Inquiries</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stats.recent_inquiries && stats.recent_inquiries.length > 0 ? (
                stats.recent_inquiries.map((inquiry) => (
                  <tr key={inquiry.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(inquiry.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {inquiry.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="capitalize">{inquiry.type}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        inquiry.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                        inquiry.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {inquiry.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                    No recent inquiries found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
