import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, X, Loader } from 'lucide-react';
import RichTextEditor from '../../../components/common/RichTextEditor';

const DestinationForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;
  
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditMode);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    best_time: '',
    how_to_reach: '',
    attractions: JSON.stringify([], null, 2),
    images: JSON.stringify([], null, 2),
    show_in_menu: true
  });
  const [heroImage, setHeroImage] = useState(null);

  useEffect(() => {
    if (isEditMode) {
      fetchDestination();
    }
  }, [id]);

  const fetchDestination = async () => {
    try {
      const response = await fetch(`https://andamanholidaytrips.in/api/destinations/${id}`);
      if (!response.ok) throw new Error('Failed to fetch destination');
      const data = await response.json();
      
      // Helper to convert legacy JSON/Array to HTML
      const toHtml = (val) => {
        if (!val) return '';
        const convertItem = (i) => {
            if (typeof i === 'string') return i;
            if (typeof i === 'object' && i !== null) return `<strong>${i.title || ''}</strong>: ${i.description || ''}`;
            return JSON.stringify(i);
        };
        
        if (Array.isArray(val)) return `<ul>${val.map(i => `<li>${convertItem(i)}</li>`).join('')}</ul>`;
        try {
             const parsed = JSON.parse(val);
             if (Array.isArray(parsed)) return `<ul>${parsed.map(i => `<li>${convertItem(i)}</li>`).join('')}</ul>`;
             return val;
        } catch { return val; }
      };

      setFormData({
        ...data,
        attractions: toHtml(data.attractions),
        how_to_reach: toHtml(data.how_to_reach),
        images: typeof data.images === 'string' ? data.images : JSON.stringify(data.images, null, 2),
        show_in_menu: data.show_in_menu !== undefined ? Boolean(data.show_in_menu) : true
      });
      setFetching(false);
    } catch (err) {
      alert('Error loading destination: ' + err.message);
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
    setHeroImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (formData[key] !== null) {
          if (key === 'show_in_menu') {
              data.append(key, formData[key] ? '1' : '0');
          } else {
              data.append(key, formData[key]);
          }
      }
    });
    
    if (heroImage) {
      data.append('hero_image', heroImage);
    }

    if (isEditMode) {
      data.append('_method', 'PUT');
    }

    const url = isEditMode 
      ? `https://andamanholidaytrips.in/api/destinations/${id}`
      : 'https://andamanholidaytrips.in/api/destinations';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        body: data,
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Failed to save destination');
      }

      navigate('/dashboard/destinations');
    } catch (err) {
      alert('Error saving destination: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="flex justify-center p-10"><Loader className="animate-spin" /></div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{isEditMode ? 'Edit Destination' : 'Create Destination'}</h2>
        <button onClick={() => navigate('/dashboard/destinations')} className="text-gray-500 hover:text-gray-700">
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 space-y-6">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Best Time to Visit</label>
            <input
              type="text"
              name="best_time"
              value={formData.best_time}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
            />
          </div>

          <div>
            <RichTextEditor
              label="Description"
              value={formData.description}
              onChange={(value) => handleEditorChange('description', value)}
              placeholder="Enter destination description..."
            />
          </div>

          <div>
            <RichTextEditor
              label="How to Reach"
              value={formData.how_to_reach}
              onChange={(value) => handleEditorChange('how_to_reach', value)}
              placeholder="Enter how to reach details..."
            />
          </div>

          <div>
            <RichTextEditor
              label="Attractions"
              value={formData.attractions}
              onChange={(value) => handleEditorChange('attractions', value)}
              placeholder="List attractions..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hero Image</label>
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              className="w-full"
            />
            {isEditMode && formData.hero_image && (
               <div className="mt-2 text-sm text-gray-500">Current: {formData.hero_image}</div>
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
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-brand-blue text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-brand-blue/90 disabled:opacity-50"
          >
            {loading ? <Loader className="animate-spin" size={20} /> : <Save size={20} />}
            {isEditMode ? 'Update Destination' : 'Create Destination'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DestinationForm;
