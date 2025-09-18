// Category.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // ✅ CHANGE: Added Link import

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Category = () => {
  const [categoryQuery, setcategoryQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const handleCat = async (e) => {
    e.preventDefault();
    if (!categoryQuery.trim()) return; // ✅ CHANGE: Prevent empty category search

    try {
      const response = await axios.get(`${BACKEND_URL}/category`, {
        params: { category: categoryQuery },
      });

      if (response.data.length === 0) { // ✅ CHANGE: Handle empty results
        setError('No books in this category found');
        setResults([]);
      } else {
        setResults(response.data);
        setError(null);
      }
    } catch (err) {
      console.error(err); // ✅ CHANGE: Log errors for debugging
      setError(err.response?.data?.message || 'Failed to fetch category books'); // ✅ CHANGE: Friendly error message
      setResults([]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center pt-12 mt-20 dark:bg-slate-800 dark:text-white">
      <div className="w-full max-w-xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold mb-8 dark:text-white">Categories</h1>

        <form onSubmit={handleCat} className="flex flex-col items-center mb-10">
          <input
            type="text"
            value={categoryQuery}
            onChange={(e) => setcategoryQuery(e.target.value)}
            placeholder="Enter book category"
            className="w-64 px-4 py-2 border border-gray-300 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
          <button
            type="submit"
            className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full shadow-lg hover:from-blue-600 hover:to-indigo-600"
          >
            Search
          </button>
        </form>

        {error && <p className="text-red-500 mb-8">{error}</p>}

        {results.length === 0 && !error && ( // ✅ CHANGE: Fallback message for no results
          <p className="text-gray-500 mt-4 dark:text-white">No books found</p>
        )}

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-10 justify-center items-center">
          {results.map((result, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-800 dark:text-white flex flex-col items-center p-3 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-2"
              style={{ width: '300px', height: '400px', maxWidth: '400px' }}
            >
              <img
                src={result.image}
                alt={result.title}
                className="w-60 h-60 object-contain rounded-md mb-2"
              />
              <div className="text-center">
                <h2 className="text-md font-semibold text-black dark:text-white truncate">
                  {result.title}
                </h2>
                <p className="text-sm text-gray-700 dark:text-gray-300 truncate">
                  Category: {result.category}
                </p>
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 truncate">
                  Price: ${result.price}
                </p>
              </div>

              {/* ✅ CHANGE: Use Link instead of <a> */}
              <Link
                to={`/course/${result.id}`} // ✅ CHANGE: Dynamic route for book/course
                className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full shadow-lg hover:from-blue-600 hover:to-indigo-600"
              >
                See Book
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
