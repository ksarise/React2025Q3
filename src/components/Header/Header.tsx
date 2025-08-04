import Search from '../Search/Search.tsx';
import type { HeaderProps } from '../../types';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext.tsx';
import { FaMoon, FaSun } from 'react-icons/fa';

const Header = ({ onQuery, initialQuery }: HeaderProps) => {
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <header className="bg-gray-300 dark:bg-black py-4 px-6 flex items-center justify-between border-b border-gray-200 dark:border-gray-800">
      <nav className="flex items-center space-x-4">
        <Link to="/" className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold text-red-600">almost.fm</h1>
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

      <Search onQuery={onQuery} initialQuery={initialQuery} />

      <div className="ml-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-md bg-gray-400 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </header>
  );
};

export default Header;
