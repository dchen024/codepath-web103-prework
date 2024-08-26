import { useEffect, useState } from 'react';
import { supabase } from '../client';
import Card from '../components/Card';

const ShowCreators = () => {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const { data, error } = await supabase.from('creators').select();
        if (error) throw new Error(error.message);
        setCreators(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCreators();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>All Content Creators</h1>
      <div className='creator-list'>
        {creators.map((creator) => (
          <Card key={creator.id} creator={creator} />
        ))}
      </div>
    </div>
  );
};

export default ShowCreators;
