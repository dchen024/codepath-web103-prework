import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../client';

const EditCreator = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [creator, setCreator] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: '',
  });

  useEffect(() => {
    const fetchCreatorById = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('creators')
          .select('*')
          .eq('id', id)
          .single();
        if (error) throw error;
        setCreator(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCreatorById();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreator((prevCreator) => ({ ...prevCreator, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase
        .from('creators')
        .update(creator)
        .eq('id', id);
      if (error) throw error;
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this content creator?'
    );
    if (!confirmDelete) return;

    setLoading(true);
    try {
      const { error } = await supabase.from('creators').delete().eq('id', id);
      if (error) throw error;
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='vertical-form'>
      <div className='form-group'>
        <label>
          Name
          <input
            name='name'
            value={creator.name}
            onChange={handleChange}
            placeholder='Name'
            required
          />
        </label>
        <label>
          URL
          <input
            name='url'
            value={creator.url}
            onChange={handleChange}
            placeholder='URL'
            required
          />
        </label>
        <label>
          Description
          <textarea
            name='description'
            value={creator.description}
            onChange={handleChange}
            placeholder='Description'
            required
          />
        </label>
        <label>
          Image URL
          <input
            name='imageURL'
            value={creator.imageURL}
            onChange={handleChange}
            placeholder='Image URL (optional)'
          />
        </label>
      </div>
      <div className='button-group'>
        <button type='submit' disabled={loading}>
          {loading ? 'Updating...' : 'Update Creator'}
        </button>
        <button
          type='button'
          className='cancel-button'
          onClick={() => navigate('/')}
        >
          Cancel
        </button>
        <button type='button' className='cancel-button' onClick={handleDelete}>
          Delete
        </button>
      </div>
      {error && <p>Error: {error}</p>}
    </form>
  );
};

export default EditCreator;
