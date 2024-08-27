import { Link } from 'react-router-dom';

const Card = ({ creator }) => {
  return (
    <article className='card'>
      <header>
        <h2>{creator.name}</h2>
      </header>
      <div className='creator-card'>
        <p>{creator.description}</p>
        <a href={creator.url} target='_blank' rel='noopener noreferrer'>
          Visit Channel
        </a>
        {creator.imageURL && (
          <img src={creator.imageURL} alt={`${creator.name}'s image`} />
        )}
      </div>
      <footer className='footer-links'>
        <Link to={`/creator/${creator.id}`} role='button' className='primary'>
          View
        </Link>
        <Link
          to={`/creator/${creator.id}/edit`}
          role='button'
          className='secondary'
        >
          Edit
        </Link>
      </footer>
    </article>
  );
};

export default Card;
