import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useGetVenuesQuery } from '../services/venuesApi';
import { SearchBar } from '../components/common/searchBar/SearchBar';
import { VenueGrid } from '../components/venues/venues/VenueGrid';
import { MessageDisplay } from '../components/common/feedback/MessageDisplay';
import placeholder from '../../public/placeholder.jpg';
import { VenueHero } from '../components/common/VenueHero';

const HomePage = () => {
  const navigate = useNavigate();
  const {
    data: venues,
    isLoading,
    error,
  } = useGetVenuesQuery({
    page: 1,
    limit: 3,
    sort: 'created',
    sortOrder: 'desc',
  });

  return (
<>
 <Helmet>
   <title>Holidaze - Find Your Perfect Stay</title>
   <meta
     name="description"
     content="Search and book unique accommodation venues across beautiful destinations with Holidaze"
   />
 </Helmet>
 <div className="flex flex-col items-center">
 <div className="relative max-w-screen-lg">
   <img
     src={placeholder}
     alt="Holiday destination"
     className="w-full h-[500px] object-cover"
   />
   <VenueHero />
 </div>

   <div className="max-w-screen-lg w-full min-h-screen flex flex-col items-center py-8 md:py-12 space-y-12">
     <div className="w-full max-w-3xl">
       <h1 className="text-4xl font-bold text-center mb-8">Find Your Perfect Venue</h1>
       <SearchBar navigate={navigate} />
     </div>
     
     <div className="w-full">
       <div className="w-screen bg-neutral h-60 -mx-[50vw] left-1/2 relative"> 
         <div className="max-w-screen-lg mx-auto">
           <span className="text-primary p-4">luxurious</span>
           <h2 className="text-white text-2xl font-semibold p-4">NEW & NOTABLE VENUES</h2>
         </div>
       </div>
       {isLoading ? (
         <MessageDisplay
           title="Loading venues"
           message="Please wait while we fetch the venues"
           variant="loading"
         />
       ) : error ? (
         <MessageDisplay
           title="Error occurred"
           message="There was a problem loading venues"
           variant="error"
         />
       ) : venues?.data ? (
         <div className="-mt-28">
           <VenueGrid venues={venues.data} />
         </div>
       ) : null}
     </div>
   </div>
 </div>
</>
  );
};

export default HomePage;
