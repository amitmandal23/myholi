import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, X, Loader } from 'lucide-react';
import RichTextEditor from '../../../components/common/RichTextEditor';

const BlogForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;
  
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditMode);
  
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    published_at: '',
    content: '',
    related_posts: JSON.stringify([], null, 2),
    show_in_menu: true
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (isEditMode) {
      fetchBlog();
    }
  }, [id]);

  const fetchBlog = async () => {
    try {
      const response = await fetch(`https://andamanholidaytrips.in/api/blogs/${id}`);
      if (!response.ok) throw new Error('Failed to fetch blog post');
      const data = await response.json();
      
      setFormData({
        ...data,
        related_posts: typeof data.related_posts === 'string' ? data.related_posts : JSON.stringify(data.related_posts, null, 2),
      });
      setFetching(false);
    } catch (err) {
      alert('Error loading blog post: ' + err.message);
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
      ? `https://andamanholidaytrips.in/api/blogs/${id}`
      : 'https://andamanholidaytrips.in/api/blogs';

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
        throw new Error(errData.message || 'Failed to save blog post');
      }

      navigate('/dashboard/blogs');
    } catch (err) {
      alert('Error saving blog post: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="flex justify-center p-10"><Loader className="animate-spin" /></div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{isEditMode ? 'Edit Blog Post' : 'Create Blog Post'}</h2>
        <button onClick={() => navigate('/dashboard/blogs')} className="text-gray-500 hover:text-gray-700">
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Published At</label>
            <input
              type="date"
              name="published_at"
              value={formData.published_at}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent"
            />
          </div>

          <div className="md:col-span-2">
            <RichTextEditor
              label="Content"
              value={formData.content}
              onChange={(value) => handleEditorChange('content', value)}
              placeholder="Enter blog content..."
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Related Posts (JSON List of IDs or Slugs)</label>
            <textarea
              name="related_posts"
              value={formData.related_posts}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border rounded-lg font-mono text-sm bg-gray-50 focus:ring-2 focus:ring-brand-blue focus:border-transparent"
              placeholder='["slug-1", "slug-2"]'
            />
            <p className="text-xs text-gray-500 mt-1">Enter related posts as a JSON array of strings.</p>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Featured Image</label>
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

          <div className="md:col-span-2 flex items-center gap-4">
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
            {isEditMode ? 'Update Blog Post' : 'Create Blog Post'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
