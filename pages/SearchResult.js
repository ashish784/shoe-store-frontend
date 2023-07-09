import { useRouter } from 'next/router';
import { fetchDataFromApi } from '@/utils/api';
import ProductCard from '@/components/ProductCard';

const SearchResults = ({ searchQuery }) => {
  const router = useRouter();

  // Fetch search results based on the search query 'q'
  const { data: searchResults, error } = fetchDataFromApi(`/api/products?search=${searchQuery}`);

  if (error) {
    // Handle error
    console.error(error);
    return <div>Error occurred while fetching search results.</div>;
  }

  return (
    <div>
      <h1>Search Results for "{searchQuery}"</h1>
      {searchResults?.data?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
          {searchResults.data.map((product) => (
            <ProductCard key={p.id} data={p} />
          ))}
        </div>
      ) : (
        <div>No search results found.</div>
      )}
    </div>
  );
};

export default SearchResults;
