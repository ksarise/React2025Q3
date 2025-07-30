import Search from '../Search/Search.tsx';
import type { HeaderProps } from '../../types';
import { Link, useLocation } from 'react-router-dom';

const Header = (props: HeaderProps) => {
  const location = useLocation();
  return (
    <header className="bg-black py-4 px-6 flex items-center justify-between border-b border-gray-800 ">
      <nav className=" md:flex space-x-4 flex items-center ">
        <Link
          to="/"
          className={`px-3 py-2 rounded-md ${location.pathname === '/'}`}
        >
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-red-600 mr-6">almost.fm</h1>
          </div>
        </Link>
        <Link
          to="/about"
          className={`px-3 py-2 rounded-md ${location.pathname === '/about'}`}
        >
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-white-600 mr-6 visited:text-white hover:text-red-600">
              About
            </h1>
          </div>
        </Link>
      </nav>

      <Search onQuery={props.onQuery} initialQuery={props.initialQuery} />
    </header>
  );
};

export default Header;
