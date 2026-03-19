import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  Package, 
  Map, 
  Palmtree, 
  FileText, 
  MessageSquare, 
  Settings, 
  LogOut, 
  Briefcase,
  Users
} from 'lucide-react';

const AdminLayout = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/securelogin');
  };
  
  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/dashboard/packages', icon: Package, label: 'Packages' },
    { path: '/dashboard/activities', icon: Palmtree, label: 'Activities' },
    { path: '/dashboard/destinations', icon: Map, label: 'Destinations' },
    { path: '/dashboard/blogs', icon: FileText, label: 'Blogs' },
    { path: '/dashboard/services', icon: Briefcase, label: 'Services' },
    { path: '/dashboard/testimonials', icon: Users, label: 'Testimonials' },
    { path: '/dashboard/inquiries', icon: MessageSquare, label: 'Inquiries' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md hidden md:flex flex-col">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-brand-blue">Admin Panel</h1>
          <p className="text-xs text-gray-500 mt-1">Manage Website Content</p>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link 
                  to={item.path} 
                  className={`flex items-center px-6 py-3 transition-colors ${
                    isActive(item.path) 
                      ? 'bg-brand-blue/10 text-brand-blue border-r-4 border-brand-blue' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon size={20} className="mr-3" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t">
          <Link to="#" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md">
            <Settings size={20} className="mr-3" />
            Settings
          </Link>
          <button 
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 mt-2 text-red-600 hover:bg-red-50 hover:text-red-800 rounded-md transition-colors"
          >
            <LogOut size={20} className="mr-3" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center md:hidden sticky top-0 z-10">
            <span className="font-bold text-xl text-brand-blue">Admin</span>
            <button className="p-2 rounded-md bg-gray-100">
              <LayoutDashboard size={20} />
            </button>
        </header>

        <div className="p-4 md:p-8">
            <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
