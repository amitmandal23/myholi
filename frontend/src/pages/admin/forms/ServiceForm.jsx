import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, X, Loader } from 'lucide-react';
import RichTextEditor from '../../../components/common/RichTextEditor';

const ServiceForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;
  
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditMode);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    features: JSON.stringify([], null, 2),
    show_in_menu: true
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (isEditMode) {
      fetchService();
    }
  }, [id]);

  const fetchService = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/services/${id}`);
      if (!response.ok) throw new Error('Failed to fetch service');
      const data = await response.json();
      
      setFormData({
        ...data,
        features: typeof data.features === 'string' ? data.features : JSON.stringify(data.features, null, 2),
        show_in_menu: data.show_in_menu !== undefined ? Boolean(data.show_in_menu) : true
      });
      setFetching(false);
    } catch (err) {
      alert('Error loading service: ' + err.message);
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
    setImage(e.target.files[0]);
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
    
    if (image) {
      data.append('image', image);
    }

    if (isEditMode) {
      data.append('_method', 'PUT');
    }

    const url = isEditMode 
      ? `http://localhost:8000/api/services/${id}`
      : 'http://localhost:8000/api/services';

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
        throw new Error(errData.message || 'Failed to save service');
      }

      navigate('/dashboard/services');
    } catch (err) {
      alert('Error saving service: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="flex justify-center p-10"><Loader className="animate-spin" /></div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{isEditMode ? 'Edit Service' : 'Create Service'}</h2>
        <button onClick={() => navigate('/dashboard/services')} className="text-gray-500 hover:text-gray-700">
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
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

          <div className="md:col-span-2">
            <RichTextEditor
              label="Description"
              value={formData.description}
              onChange={(value) => handleEditorChange('description', value)}
              placeholder="Enter service description..."
            />
          </div>

          <div className="md:col-span-2">
            <RichTextEditor
              label="Features"
              value={formData.features}
              onChange={(value) => handleEditorChange('features', value)}
              placeholder="Enter service features..."
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              className="w-full"
            />
            {isEditMode && formData.image && (
               <div className="mt-2 text-sm text-gray-500">Current: {formData.image}</div>
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
            {isEditMode ? 'Update Service' : 'Create Service'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ServiceForm;
