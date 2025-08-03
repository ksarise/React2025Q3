import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen min-w-[50vw] bg-gray-100 text-black dark:bg-gray-900 dark:text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <Link
        to="/"
        className="ml-2 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg text-sm font-medium flex items-center visited:text-white"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
