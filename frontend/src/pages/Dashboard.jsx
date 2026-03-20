import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, Users, FileText, Settings, LogOut } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md hidden md:block">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-brand-blue">Admin Panel</h1>
        </div>
        <nav className="mt-6">
          <Link to="/dashboard" className="flex items-center px-6 py-3 bg-brand-green/10 text-brand-green border-r-4 border-brand-green">
            <LayoutDashboard size={20} className="mr-3" />
            Dashboard
          </Link>
          <Link to="#" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900">
            <Users size={20} className="mr-3" />
            Users
          </Link>
          <Link to="#" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900">
            <FileText size={20} className="mr-3" />
            Bookings
          </Link>
          <Link to="#" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900">
            <Settings size={20} className="mr-3" />
            Settings
          </Link>
        </nav>
        <div className="absolute bottom-0 w-64 p-6">
            <button className="flex items-center text-red-600 hover:text-red-800">
                <LogOut size={20} className="mr-3" />
                Logout
            </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center md:hidden">
            <span className="font-bold text-xl">Admin</span>
            <button className="p-2 rounded-md bg-gray-200">Menu</button>
        </header>

        <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium uppercase">Total Bookings</h3>
                    <p className="text-3xl font-bold text-gray-800 mt-2">1,245</p>
                    <span className="text-green-500 text-sm font-medium mt-2 inline-block">↑ 12% from last month</span>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium uppercase">Active Users</h3>
                    <p className="text-3xl font-bold text-gray-800 mt-2">843</p>
                    <span className="text-green-500 text-sm font-medium mt-2 inline-block">↑ 5% from last month</span>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium uppercase">Revenue</h3>
                    <p className="text-3xl font-bold text-gray-800 mt-2">$45,200</p>
                    <span className="text-red-500 text-sm font-medium mt-2 inline-block">↓ 2% from last month</span>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <h3 className="font-bold text-lg mb-4">Recent Bookings</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Package</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#1001</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">John Doe</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Havelock Premium</td>
                                <td className="px-6 py-4 whitespace-nowrap"><span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Confirmed</span></td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-10-15</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#1002</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Jane Smith</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Neil Island Escape</td>
                                <td className="px-6 py-4 whitespace-nowrap"><span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span></td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-10-16</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
