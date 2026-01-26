import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, X, Plus, Trash2 } from 'lucide-react';
import RichTextEditor from '../../../components/common/RichTextEditor';

const PackageForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;
  
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditMode);
  
  const [formData, setFormData] = useState({
    title: '',
    category: 'honeymoon-packages',
    duration: '',
    price: '',
    discounted_price: '',
    overview: '',
    hotel_details: JSON.stringify([
      { name: "Hotel X", star: 3, location: "Port Blair" }
    ], null, 2),
    itinerary: JSON.stringify([
      { day: 1, title: "Arrival", description: "..." }
    ], null, 2),
    inclusions: '',
    exclusions: '',
    images: JSON.stringify([], null, 2),
    is_active: true,
    show_in_menu: true
  });
  const [featuredImage, setFeaturedImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);

  useEffect(() => {
    if (isEditMode) {
      fetchPackage();
    }
  }, [id]);

  const fetchPackage = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/packages/${id}`);
      if (!response.ok) throw new Error('Failed to fetch package');
      const data = await response.json();
      
      // Helper to convert legacy JSON/Array to HTML for RTE
      const toHtml = (val) => {
        if (!val) return '';
        if (Array.isArray(val)) return `<ul>${val.map(i => `<li>${i}</li>`).join('')}</ul>`;
        try {
             const parsed = JSON.parse(val);
             if (Array.isArray(parsed)) return `<ul>${parsed.map(i => `<li>${i}</li>`).join('')}</ul>`;
             return val;
        } catch { return val; }
      };

      setFormData({
        ...data,
        title: data.title || '',
        category: data.category || 'honeymoon-packages',
        duration: data.duration || '',
        price: data.price || '',
        discounted_price: data.discounted_price || '',
        overview: data.overview || '',
        hotel_details: (typeof data.hotel_details === 'object' && data.hotel_details !== null) ? JSON.stringify(data.hotel_details, null, 2) : (data.hotel_details || ''),
        itinerary: (typeof data.itinerary === 'object' && data.itinerary !== null) ? JSON.stringify(data.itinerary, null, 2) : (data.itinerary || ''),
        inclusions: toHtml(data.inclusions),
        exclusions: toHtml(data.exclusions),
        images: (typeof data.images === 'object' && data.images !== null) ? JSON.stringify(data.images, null, 2) : (data.images || '[]'),
        is_active: Boolean(data.is_active),
        show_in_menu: data.show_in_menu !== undefined ? Boolean(data.show_in_menu) : true
      });
      setFetching(false);
    } catch (err) {
      console.error("Error fetching package:", err);
      alert('Error loading package: ' + err.message);
      setFetching(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleEditorChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFeaturedImage(e.target.files[0]);
  };

  const handleGalleryChange = (e) => {
    setGalleryImages(e.target.files);
  };

  const [itineraryItems, setItineraryItems] = useState([]);

  useEffect(() => {
    if (formData.itinerary) {
      try {
        const parsed = typeof formData.itinerary === 'string' ? JSON.parse(formData.itinerary) : formData.itinerary;
        setItineraryItems(Array.isArray(parsed) ? parsed : []);
      } catch (e) {
        setItineraryItems([]);
      }
    }
  }, [formData.itinerary]);

  // Sync itineraryItems back to formData - REMOVED to avoid loops. 
  // We will update formData.itinerary only on submit.

  const addItineraryDay = () => {
    const newItems = [
        ...itineraryItems, 
        { day: itineraryItems.length + 1, title: '', content: '' }
    ];
    setItineraryItems(newItems);
  };

  const removeItineraryDay = (index) => {
    const newItems = itineraryItems.filter((_, i) => i !== index);
    // Renumber days
    const renumbered = newItems.map((item, idx) => ({ ...item, day: idx + 1 }));
    setItineraryItems(renumbered);
  };

  const updateItineraryDay = (index, field, value) => {
    const newItems = [...itineraryItems];
    newItems[index] = { ...newItems[index], [field]: value };
    setItineraryItems(newItems);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.keys(formData).forEach(key => {
      // Don't append null values
      if (formData[key] !== null) {
          if (key === 'is_active' || key === 'show_in_menu') {
              data.append(key, formData[key] ? '1' : '0');
          } else {
              data.append(key, formData[key]);
          }
      }
    });
    
    if (featuredImage) {
      data.set('featured_image', featuredImage);
    }

    if (galleryImages) {
      for (let i = 0; i < galleryImages.length; i++) {
        data.append('gallery_images[]', galleryImages[i]);
      }
    }

    if (isEditMode) {
      data.append('_method', 'PUT');
    }

    const url = isEditMode 
      ? `http://localhost:8000/api/packages/${id}`
      : 'http://localhost:8000/api/packages';

    try {
      const response = await fetch(url, {
        method: 'POST', // Always POST for FormData with files, use _method for PUT
        headers: {
          'Accept': 'application/json',
        },
        body: data,
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Failed to save package');
      }

      navigate('/dashboard/packages');
    } catch (err) {
      alert('Error saving package: ' + err.message);
    } finally {
      setLoading(false);
    }
  };
  
  // Parse existing images safely
  const existingGalleryImages = useMemo(() => {
    try {
        let imgs = formData.images;
        if (!imgs) return [];
        if (typeof imgs === 'string') {
            try {
                imgs = JSON.parse(imgs);
            } catch (e) {
                console.error("Error parsing images JSON", e);
                return [];
            }
        }
        if (!Array.isArray(imgs)) return [];
        return imgs.filter(img => typeof img === 'string');
    } catch (e) {
        console.error("Error in existingGalleryImages", e);
        return [];
    }
  }, [formData.images]);

  if (fetching) return <div className="flex justify-center p-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{isEditMode ? 'Edit Package' : 'Create New Package'}</h2>
        <button onClick={() => navigate('/dashboard/packages')} className="text-gray-500 hover:text-gray-700">
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Package Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
            >
              <option value="honeymoon-packages">Honeymoon Packages</option>
              <option value="family-packages">Family Packages</option>
              <option value="group-packages">Group Packages</option>
              <option value="adventure-packages">Adventure Packages</option>
              <option value="budget-packages">Budget Packages</option>
              <option value="premium-packages">Premium Packages</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Duration (e.g., 3 Nights / 4 Days)</label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Discounted Price (₹)</label>
            <input
              type="number"
              name="discounted_price"
              value={formData.discounted_price}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Featured Image</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
              accept="image/*"
            />
             {formData.featured_image && typeof formData.featured_image === 'string' && (
                <div className="mt-2 w-32 h-20">
                    <img 
                        src={formData.featured_image.startsWith('http') ? formData.featured_image : `http://localhost:8000${formData.featured_image}`} 
                        alt="Current Featured" 
                        className="w-full h-full object-cover rounded border"
                    />
                </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gallery Images (Slider)</label>
            <input
              type="file"
              onChange={handleGalleryChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
              accept="image/*"
              multiple
            />
             {existingGalleryImages.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                    {existingGalleryImages.map((img, idx) => (
                        <div key={idx} className="relative w-16 h-16">
                            <img 
                                src={img && img.startsWith('http') ? img : `http://localhost:8000${img || ''}`} 
                                alt={`Gallery ${idx}`} 
                                className="w-full h-full object-cover rounded border"
                            />
                        </div>
                    ))}
                </div>
            )}
          </div>
        </div>

        <div>
          <RichTextEditor
            label="Overview"
            value={formData.overview}
            onChange={(value) => handleEditorChange('overview', value)}
            placeholder="Enter package overview..."
          />
        </div>

        {/* JSON Fields for complex data */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hotel Details (JSON)</label>
            <textarea
              name="hotel_details"
              value={formData.hotel_details}
              onChange={handleChange}
              rows="6"
              className="w-full px-4 py-2 border rounded-lg font-mono text-sm bg-gray-50 focus:ring-2 focus:ring-brand-blue focus:border-transparent"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Itinerary Builder</label>
            <div className="space-y-4 border rounded-lg p-4 bg-gray-50 max-h-[600px] overflow-y-auto">
                {itineraryItems.map((item, index) => (
                    <div key={index} className="bg-white p-4 rounded border shadow-sm relative">
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex gap-4 flex-1">
                                <div className="w-20">
                                    <label className="block text-xs text-gray-500">Day</label>
                                    <input 
                                        type="number" 
                                        value={item.day} 
                                        onChange={(e) => updateItineraryDay(index, 'day', parseInt(e.target.value))}
                                        className="w-full border rounded p-1"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-xs text-gray-500">Title</label>
                                    <input 
                                        type="text" 
                                        value={item.title} 
                                        onChange={(e) => updateItineraryDay(index, 'title', e.target.value)}
                                        className="w-full border rounded p-1"
                                        placeholder="e.g. Arrival in Port Blair"
                                    />
                                </div>
                            </div>
                            <button 
                                type="button" 
                                onClick={() => removeItineraryDay(index)}
                                className="text-red-500 hover:text-red-700 ml-2 mt-4"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">Day Details</label>
                            <RichTextEditor
                                value={item.content || (Array.isArray(item.activities) ? `<ul>${item.activities.map(a => `<li>${a}</li>`).join('')}</ul>` : item.description || '')}
                                onChange={(value) => updateItineraryDay(index, 'content', value)}
                                placeholder="Describe the day's activities..."
                            />
                        </div>
                    </div>
                ))}
                
                <button 
                    type="button" 
                    onClick={addItineraryDay}
                    className="w-full py-2 border-2 border-dashed border-brand-blue text-brand-blue rounded-lg hover:bg-blue-50 flex items-center justify-center gap-2 font-medium"
                >
                    <Plus size={20} /> Add Day
                </button>
            </div>
          </div>
          <div>
            <RichTextEditor
              label="Inclusions"
              value={formData.inclusions}
              onChange={(value) => handleEditorChange('inclusions', value)}
              placeholder="List inclusions..."
            />
          </div>
          <div>
            <RichTextEditor
              label="Exclusions"
              value={formData.exclusions}
              onChange={(value) => handleEditorChange('exclusions', value)}
              placeholder="List exclusions..."
            />
          </div>
        </div>

        <div className="flex items-center gap-4 mt-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="is_active"
              checked={formData.is_active}
              onChange={handleChange}
              className="w-4 h-4 text-brand-blue rounded border-gray-300 focus:ring-brand-blue"
            />
            <span className="text-sm font-medium text-gray-700">Active</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="show_in_menu"
              checked={formData.show_in_menu}
              onChange={handleChange}
              className="w-4 h-4 text-brand-blue rounded border-gray-300 focus:ring-brand-blue"
            />
            <span className="text-sm font-medium text-gray-700">Show in Menu</span>
          </label>
        </div>

        <div className="flex justify-end gap-4 pt-4 border-t">
          <button
            type="button"
            onClick={() => navigate('/dashboard/packages')}
            className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-brand-blue text-white rounded-lg hover:bg-brand-blue/90 transition-colors flex items-center gap-2"
          >
            {loading ? <span>Saving...</span> : <Save size={20} />}
            Save Package
          </button>
        </div>
      </form>
    </div>
  );
};

export default PackageForm;
