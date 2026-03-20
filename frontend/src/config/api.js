const API_BASE_URL =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
    ? "http://localhost/myholi/backend/public/api"
    : "https://andamanholidaytrips.in/api";

export const API_ENDPOINTS = {
  // Auth
  LOGIN: `${API_BASE_URL}/login`,
  REGISTER: `${API_BASE_URL}/register`,
  LOGOUT: `${API_BASE_URL}/logout`,
  USER: `${API_BASE_URL}/user`,

  // Dashboard
  DASHBOARD_STATS: `${API_BASE_URL}/dashboard/stats`,

  // Packages
  PACKAGES: `${API_BASE_URL}/packages`,
  PACKAGE_BY_SLUG: (category, slug) =>
    `${API_BASE_URL}/packages/${category}/${slug}`,

  // Activities
  ACTIVITIES: `${API_BASE_URL}/activities`,
  ACTIVITY_BY_SLUG: (slug) => `${API_BASE_URL}/activities/slug/${slug}`,

  // Destinations
  DESTINATIONS: `${API_BASE_URL}/destinations`,
  DESTINATION_BY_SLUG: (slug) => `${API_BASE_URL}/destinations/slug/${slug}`,

  // Blogs
  BLOGS: `${API_BASE_URL}/blogs`,
  BLOG_BY_SLUG: (slug) => `${API_BASE_URL}/blogs/slug/${slug}`,

  // Services
  SERVICES: `${API_BASE_URL}/services`,
  SERVICE_BY_SLUG: (slug) => `${API_BASE_URL}/services/slug/${slug}`,

  // Testimonials
  TESTIMONIALS: `${API_BASE_URL}/testimonials`,

  // Inquiries
  INQUIRIES: `${API_BASE_URL}/inquiries`,
};

export const IMAGE_BASE_URL =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
    ? "http://localhost/myholi/backend/public"
    : "https://andamanholidaytrips.in";

export default API_BASE_URL;
