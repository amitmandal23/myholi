import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdminLayout from './pages/admin/AdminLayout';
import DashboardHome from './pages/admin/DashboardHome';
import ManagePackages from './pages/admin/ManagePackages';
import ManageActivities from './pages/admin/ManageActivities';
import ManageDestinations from './pages/admin/ManageDestinations';
import ManageBlogs from './pages/admin/ManageBlogs';
import ManageServices from './pages/admin/ManageServices';
import ManageTestimonials from './pages/admin/ManageTestimonials';
import ManageInquiries from './pages/admin/ManageInquiries';
import PackageForm from './pages/admin/forms/PackageForm';
import ActivityForm from './pages/admin/forms/ActivityForm';
import DestinationForm from './pages/admin/forms/DestinationForm';
import BlogForm from './pages/admin/forms/BlogForm';
import ServiceForm from './pages/admin/forms/ServiceForm';
import TestimonialForm from './pages/admin/forms/TestimonialForm';

import PackageDetail from './pages/PackageDetail';
import ActivityDetail from './pages/ActivityDetail';
import DestinationDetail from './pages/DestinationDetail';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import ServiceDetail from './pages/ServiceDetail';
import BlogDetail from './pages/BlogDetail';
import BlogList from './pages/BlogList';
import TermsCondition from './pages/TermsCondition';
import PrivacyPolicy from './pages/PrivacyPolicy';
import FAQ from './pages/FAQ';
import Testimonials from './pages/Testimonials';

import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import SearchPage from './pages/SearchPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchPage />} />
          
          {/* Auth Routes */}
          <Route path="/admin" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Admin Routes - Protected */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<DashboardHome />} />
          <Route path="packages" element={<ManagePackages />} />
          <Route path="packages/create" element={<PackageForm />} />
          <Route path="packages/edit/:id" element={<PackageForm />} />
          <Route path="activities" element={<ManageActivities />} />
          <Route path="activities/create" element={<ActivityForm />} />
          <Route path="activities/edit/:id" element={<ActivityForm />} />
          <Route path="destinations" element={<ManageDestinations />} />
          <Route path="destinations/create" element={<DestinationForm />} />
          <Route path="destinations/edit/:id" element={<DestinationForm />} />
          <Route path="blogs" element={<ManageBlogs />} />
          <Route path="blogs/create" element={<BlogForm />} />
          <Route path="blogs/edit/:id" element={<BlogForm />} />
          <Route path="services" element={<ManageServices />} />
          <Route path="services/create" element={<ServiceForm />} />
          <Route path="services/edit/:id" element={<ServiceForm />} />
          <Route path="testimonials" element={<ManageTestimonials />} />
          <Route path="testimonials/create" element={<TestimonialForm />} />
          <Route path="testimonials/edit/:id" element={<TestimonialForm />} />
          <Route path="inquiries" element={<ManageInquiries />} />
        </Route>

        <Route path="/packages/:category/:slug" element={<PackageDetail />} />
        <Route path="/activities/:location/:slug" element={<ActivityDetail />} />
        <Route path="/destinations/:slug" element={<DestinationDetail />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/terms-conditions" element={<TermsCondition />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/testimonials" element={<Testimonials />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
