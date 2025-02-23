import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { SearchBar } from '../components/common/searchBar/SearchBar';

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>Holidaze - Find Your Perfect Stay</title>
        <meta
          name="description"
          content="Search and book unique accommodation venues across beautiful destinations with Holidaze"
        />
      </Helmet>

      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-3xl">
          <h1 className="text-4xl font-bold text-center mb-8">Find Your Perfect Venue</h1>
          <SearchBar navigate={navigate} />
        </div>
      </div>
    </>
  );
};

export default HomePage;
