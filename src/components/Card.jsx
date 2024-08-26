import { Link } from 'react-router-dom';

const Card = ({ creator }) => {
  return (
    <div className='card'>
      <h2>{creator.name}</h2>
      <p>{creator.description}</p>
      <a href={creator.url} target='_blank' rel='noopener noreferrer'>
        Visit Channel
      </a>
      {creator.imageURL && (
        <img src={creator.imageURL} alt={`${creator.name}'s image`} />
      )}
      <Link to={`/creator/${creator.id}/edit`}>
        <button>Edit</button>
      </Link>
    </div>
  );
};

export default Card;
