import { useRouter } from 'next/router';
import { BiSearch } from 'react-icons/bi';
import { useState, useEffect } from 'react';
import { fetchDataFromApi } from '@/utils/api';

const SearchButton = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [productSuggestions, setProductSuggestions] = useState([]);

  useEffect(() => {
    if (searchQuery.trim() !== '') {
      // Fetch product suggestions based on search query
      fetchData();
    } else {
      // Reset product suggestions when search query is empty
      setProductSuggestions([]);
    }
  }, [searchQuery]);

  const fetchData = async () => {
    try {
      const response = await fetchDataFromApi(`/api/products?name_contains=${searchQuery}&_limit=5`);
      const products = response.data || [];
      setProductSuggestions(products);
    } catch (error) {
      console.log('Error fetching product suggestions:', error);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="flex items-center">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Search..."
      />
      <button
        onClick={handleSearch}
        className="flex items-center justify-center p-2 rounded-r-md bg-gray-200 hover:bg-gray-300"
      >
        <BiSearch size={20} />
      </button>

      {/* Render product suggestions */}
      {productSuggestions.length > 0 && (
        <ul className="absolute top-full bg-white border border-gray-300 rounded-md mt-1 w-full">
          {productSuggestions.map((product) => (
            <li key={product.id} className="px-4 py-2 cursor-pointer hover:bg-gray-100">
              {product.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchButton;
