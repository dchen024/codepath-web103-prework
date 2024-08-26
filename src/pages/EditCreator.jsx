import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../client';

const AddCreator = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const newCreator = {
      name: e.target.elements.name.value,
      url: e.target.elements.url.value,
      description: e.target.elements.description.value,
      imageURL: e.target.elements.imageURL.value || null,
    };

    try {
      await supabase.from('creators').insert(newCreator);
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
          <input name='name' placeholder='Name' required />
        </label>
        <label>
          URL
          <input name='url' placeholder='URL' required />
        </label>
        <label>
          Description
          <textarea name='description' placeholder='Description' required />
        </label>
        <label>
          Image URL
          <input name='imageURL' placeholder='Image URL (optional)' />
        </label>
      </div>
      <div className='button-group'>
        <button type='submit' disabled={loading}>
          {loading ? 'Adding...' : 'Add Creator'}
        </button>
        <button type='button' onClick={() => navigate('/')}>
          Cancel
        </button>
      </div>
      {error && <p>Error: {error}</p>}
    </form>
  );
};

export default AddCreator;
