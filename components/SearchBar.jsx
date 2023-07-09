import { useState } from 'react';
import { useRouter } from 'next/router';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center">
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-r-md hover:bg-gray-400 focus:outline-none"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
