import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, X, Loader } from 'lucide-react';
import RichTextEditor from '../../../components/common/RichTextEditor';

const TestimonialForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;
  
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditMode);
  
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    rating: 5,
    date: '',
    text: '',
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (isEditMode) {
      fetchTestimonial();
    }
  }, [id]);

  const fetchTestimonial = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/testimonials/${id}`);
      if (!response.ok) throw new Error('Failed to fetch testimonial');
      const data = await response.json();
      setFormData(data);
      setFetching(false);
    } catch (err) {
      alert('Error loading testimonial: ' + err.message);
      setFetching(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditorChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
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
          data.append(key, formData[key]);
      }
    });
    
    if (image) {
      data.append('image', image);
    }

    if (isEditMode) {
      data.append('_method', 'PUT');
    }

    const url = isEditMode 
      ? `http://localhost:8000/api/testimonials/${id}`
      : 'http://localhost:8000/api/testimonials';

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
        throw new Error(errData.message || 'Failed to save testimonial');
      }

      navigate('/dashboard/testimonials');
    } catch (err) {
      alert('Error saving testimonial: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="flex justify-center p-10"><Loader className="animate-spin" /></div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{isEditMode ? 'Edit Testimonial' : 'Create Testimonial'}</h2>
        <button onClick={() => navigate('/dashboard/testimonials')} className="text-gray-500 hover:text-gray-700">
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rating (1-5)</label>
            <select
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
            >
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="text"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              placeholder="e.g. October 2023"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
            />
          </div>

          <div className="md:col-span-2">
            <RichTextEditor
              label="Testimonial Text"
              value={formData.text}
              onChange={(value) => handleEditorChange('text', value)}
              placeholder="Enter testimonial text..."
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">User Image</label>
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
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-brand-blue text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-brand-blue/90 disabled:opacity-50"
          >
            {loading ? <Loader className="animate-spin" size={20} /> : <Save size={20} />}
            {isEditMode ? 'Update Testimonial' : 'Create Testimonial'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TestimonialForm;
