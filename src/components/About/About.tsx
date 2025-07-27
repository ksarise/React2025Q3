import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-[90vh] bg-gray-900 text-white min-w-[800px]">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">About</h1>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">Created by:</h2>
          <div className="flex items-center mb-6">
            <div>
              <h3 className="text-xl font-medium">Sergey Kravchenko</h3>
              <a
                href="https://github.com/ksarise"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-600 hover:text-red-700 transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <a
            href="https://rs.school/courses/reactjs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-cyan-600 hover:bg-cyan-500 hover:text-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors visited:text-white"
          >
            Visit RS School React Course
          </a>
        </div>

        <div className="mt-8">
          <Link
            to="/"
            className="ml-2 w-fit bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg text-sm font-medium flex items-center visited:text-white"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
