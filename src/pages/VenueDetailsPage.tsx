import { Helmet } from 'react-helmet-async';
import { VenueDetails } from '../components/venues/venues/VenueDetails';
import { useParams } from 'react-router-dom';
import { useGetVenueByIdQuery } from '../services/venuesApi';

const VenueDetailsPage = () => {
  const { id } = useParams();
  const { data: venue } = useGetVenueByIdQuery(id!);

  return (
    <>
      <Helmet>
        <title>{venue?.name ? `${venue.name} - Holidaze` : 'Venue Details - Holidaze'}</title>
        <meta
          name="description"
          content={venue?.description || 'View detailed information about this accommodation venue'}
        />
      </Helmet>
      <VenueDetails />
    </>
  );
};

export default VenueDetailsPage;
