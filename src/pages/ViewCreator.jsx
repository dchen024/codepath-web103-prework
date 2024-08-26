import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../client';

const ViewCreator = () => {
  const { id } = useParams();
  const [creator, setCreator] = useState(null);
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <article>
      <header>
        <h1>{creator.name}</h1>
      </header>
      <p>{creator.description}</p>
      <a href={creator.url} target='_blank' rel='noopener noreferrer'>
        Visit Channel
      </a>
      {creator.imageURL && (
        <img src={creator.imageURL} alt={`${creator.name}'s image`} />
      )}
      <footer>
        <Link to={`/creator/${id}/edit`} role='button' className='secondary'>
          Edit
        </Link>
      </footer>
    </article>
  );
};

export default ViewCreator;
