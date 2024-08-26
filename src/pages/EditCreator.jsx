import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../client';

const EditCreator = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [creator, setCreator] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCreatorById = async () => {
      try {
        const { data, error } = await supabase
          .from('creators')
          .select()
          .eq('id', id)
          .single();
        if (error) throw new Error(error.message);
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
    setCreator({ ...creator, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await supabase.from('creators').update(creator).eq('id', id);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        name='name'
        value={creator.name}
        onChange={handleChange}
      />
      <input
        type='text'
        name='url'
        value={creator.url}
        onChange={handleChange}
      />
      <textarea
        name='description'
        value={creator.description}
        onChange={handleChange}
      />
      <input
        type='text'
        name='imageURL'
        value={creator.imageURL}
        onChange={handleChange}
      />
      <button type='submit'>Update Creator</button>
    </form>
  );
};

export default EditCreator;
