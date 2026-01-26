import { useEffect } from 'react';

const SEO = ({ 
  title, 
  description, 
  keywords, 
  image, 
  url, 
  type = 'website' 
}) => {
  const siteTitle = 'Andaman Holiday Trips';
  const defaultDescription = 'Book your dream vacation to Andaman & Nicobar Islands with Andaman Holiday Trips. Best packages for honeymoon, family, and adventure.';
  const defaultKeywords = 'Andaman, Andaman Nicobar, Travel, Holiday, Vacation, Honeymoon Packages, Scuba Diving, Havelock Island';
  const defaultImage = '/logo.png';
  const siteUrl = 'https://andamanholidaytrips.com';

  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const metaDescription = description || defaultDescription;
  const metaKeywords = keywords || defaultKeywords;
  const metaImage = image ? (image.startsWith('http') ? image : `${siteUrl}${image}`) : `${siteUrl}${defaultImage}`;
  const metaUrl = url ? (url.startsWith('http') ? url : `${siteUrl}${url}`) : siteUrl;

  useEffect(() => {
    // Update Title
    document.title = fullTitle;

    // Helper to update or create meta tags
    const updateMeta = (selector, attribute, value) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        // Extract name/property from selector for creation
        const [attr, val] = selector.replace('meta[', '').replace(']', '').split('=');
        element.setAttribute(attr, val.replace(/"/g, ''));
        document.head.appendChild(element);
      }
      element.setAttribute(attribute, value);
    };

    // Helper for link tags (canonical)
    const updateLink = (rel, href) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // Standard Metadata
    updateMeta('meta[name="description"]', 'content', metaDescription);
    updateMeta('meta[name="keywords"]', 'content', metaKeywords);
    updateLink('canonical', metaUrl);

    // Open Graph
    updateMeta('meta[property="og:type"]', 'content', type);
    updateMeta('meta[property="og:title"]', 'content', fullTitle);
    updateMeta('meta[property="og:description"]', 'content', metaDescription);
    updateMeta('meta[property="og:image"]', 'content', metaImage);
    updateMeta('meta[property="og:url"]', 'content', metaUrl);
    updateMeta('meta[property="og:site_name"]', 'content', siteTitle);

    // Twitter
    updateMeta('meta[name="twitter:card"]', 'content', 'summary_large_image');
    updateMeta('meta[name="twitter:title"]', 'content', fullTitle);
    updateMeta('meta[name="twitter:description"]', 'content', metaDescription);
    updateMeta('meta[name="twitter:image"]', 'content', metaImage);

  }, [fullTitle, metaDescription, metaKeywords, metaImage, metaUrl, type, siteTitle]);

  return null;
};

export default SEO;
