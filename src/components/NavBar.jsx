import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='container'>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/new'>Add Creator</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
