import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, X, Loader, Trash2 } from 'lucide-react';
import RichTextEditor from '../../../components/common/RichTextEditor';
import { useAuth } from '../../../context/AuthContext';
import { API_ENDPOINTS, IMAGE_BASE_URL } from '../../../config/api';

const ActivityForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { token } = useAuth();
  const isEditMode = !!id;
  
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditMode);
  
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    duration: '',
    price: '',
    discounted_price: '',
    overview: '',
    highlights: JSON.stringify(["Snorkeling", "Boat Ride"], null, 2),
    inclusions: JSON.stringify(["Equipment", "Guide"], null, 2),
    exclusions: JSON.stringify(["Personal Expenses"], null, 2),
    guidelines: JSON.stringify(["Wear comfortable clothes"], null, 2),
    slots: JSON.stringify(["09:00 AM", "02:00 PM"], null, 2),
    images: JSON.stringify([], null, 2),
    show_in_menu: true
  });
  const [image, setImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [existingGalleryImages, setExistingGalleryImages] = useState([]);

  useEffect(() => {
    if (isEditMode) {
      fetchActivity();
    }
  }, [id]);

  const fetchActivity = async () => {
    try {
      const response = await fetch(`${API_ENDPOINTS.ACTIVITIES}/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      if (!response.ok) throw new Error('Failed to fetch activity');
      const data = await response.json();
      
      let parsedImages = [];
      try {
        parsedImages = typeof data.images === 'string' ? JSON.parse(data.images) : (data.images || []);
      } catch (e) {
        parsedImages = [];
      }
      setExistingGalleryImages(parsedImages);

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
        highlights: toHtml(data.highlights),
        inclusions: toHtml(data.inclusions),
        exclusions: toHtml(data.exclusions),
        guidelines: toHtml(data.guidelines),
        slots: typeof data.slots === 'string' ? data.slots : JSON.stringify(data.slots, null, 2),
        images: JSON.stringify(parsedImages, null, 2), // Keep this for internal consistency, though we won't use it directly for upload
        show_in_menu: data.show_in_menu !== undefined ? Boolean(data.show_in_menu) : true
      });
      setFetching(false);
    } catch (err) {
      alert('Error loading activity: ' + err.message);
      setFetching(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleEditorChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleGalleryChange = (e) => {
    setGalleryImages(e.target.files);
  };

  const removeExistingGalleryImage = (index) => {
    const newImgs = existingGalleryImages.filter((_, i) => i !== index);
    setExistingGalleryImages(newImgs);
    setFormData(prev => ({
        ...prev,
        images: JSON.stringify(newImgs)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.keys(formData).forEach(key => {
      // Don't append 'images' JSON string as we handle it via gallery_images and existing backend logic
      if (key !== 'images' && formData[key] !== null) {
          if (key === 'show_in_menu') {
               data.append(key, formData[key] ? '1' : '0');
          } else {
               data.append(key, formData[key]);
          }
      }
    });
    
    // Append the original images JSON just in case backend uses it for something else (though we'll override in controller)
    // Actually, let's append it so we don't lose existing images if no new ones are uploaded
    data.append('images', JSON.stringify(existingGalleryImages));

    if (image) {
      data.append('image', image);
    }

    if (galleryImages.length > 0) {
        galleryImages.forEach((file) => {
            data.append('gallery_images[]', file);
        });
    }

    if (isEditMode) {
      data.append('_method', 'PUT');
    }

    const url = isEditMode 
      ? `${API_ENDPOINTS.ACTIVITIES}/${id}`
      : API_ENDPOINTS.ACTIVITIES;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: data,
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Failed to save activity');
      }

      navigate('/dashboard/activities');
    } catch (err) {
      alert('Error saving activity: ' + err.message);
    } finally {
      setLoading(false);
    }
  };
  
  if (fetching) return <div className="flex justify-center p-10"><Loader className="animate-spin" /></div>;

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{isEditMode ? 'Edit Activity' : 'Create New Activity'}</h2>
        <button onClick={() => navigate('/dashboard/activities')} className="text-gray-500 hover:text-gray-700">
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Activity Title</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Feature Image</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
              accept="image/*"
            />
             {formData.featured_image && typeof formData.featured_image === 'string' && (
                <div className="mt-2 w-32 h-20">
                    <img 
                        src={formData.featured_image.startsWith('http') ? formData.featured_image : `${IMAGE_BASE_URL}${formData.featured_image}`} 
                        alt="Current Featured" 
                        className="w-full h-full object-cover rounded border"
                    />
                </div>
            )}
          </div>
          <div className="flex items-center gap-4">
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
                        <div key={idx} className="relative w-16 h-16 group">
                            <img 
                                src={img.startsWith('http') ? img : `${IMAGE_BASE_URL}${img}`} 
                                alt={`Gallery ${idx}`} 
                                className="w-full h-full object-cover rounded border"
                            />
                            <button 
                                type="button"
                                onClick={() => removeExistingGalleryImage(idx)}
                                className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <Trash2 size={12} />
                            </button>
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
            placeholder="Enter activity overview..."
          />
        </div>

        {/* Rich Text Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <RichTextEditor
              label="Highlights"
              value={formData.highlights}
              onChange={(value) => handleEditorChange('highlights', value)}
              placeholder="Enter highlights (use bullet points)..."
            />
          </div>
          <div>
            <RichTextEditor
              label="Inclusions"
              value={formData.inclusions}
              onChange={(value) => handleEditorChange('inclusions', value)}
              placeholder="Enter inclusions..."
            />
          </div>
          <div>
            <RichTextEditor
              label="Exclusions"
              value={formData.exclusions}
              onChange={(value) => handleEditorChange('exclusions', value)}
              placeholder="Enter exclusions..."
            />
          </div>
          <div>
            <RichTextEditor
              label="Guidelines"
              value={formData.guidelines}
              onChange={(value) => handleEditorChange('guidelines', value)}
              placeholder="Enter guidelines..."
            />
          </div>
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Time Slots (JSON Array)</label>
            <textarea
              name="slots"
              value={formData.slots}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 border rounded-lg font-mono text-sm bg-gray-50 focus:ring-2 focus:ring-brand-blue focus:border-transparent"
            ></textarea>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-brand-blue text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-brand-blue/90 disabled:opacity-50"
          >
            {loading ? <Loader className="animate-spin" size={20} /> : <Save size={20} />}
            {isEditMode ? 'Update Activity' : 'Create Activity'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ActivityForm;
