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
    <form onSubmit={handleSubmit}>
      <input name='name' placeholder='Name' required />
      <input name='url' placeholder='URL' required />
      <textarea name='description' placeholder='Description' required />
      <input name='imageURL' placeholder='Image URL (optional)' />
      <button type='submit' disabled={loading}>
        {loading ? 'Adding...' : 'Add Creator'}
      </button>
      {error && <p>Error: {error}</p>}
    </form>
  );
};

export default AddCreator;
