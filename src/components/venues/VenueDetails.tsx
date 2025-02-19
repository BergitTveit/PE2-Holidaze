import { useParams } from 'react-router-dom';
import { useGetVenueByIdQuery } from '../../services/venuesApi';
import Loader from '../common/Loader';
import VenueTitle from './VenueTitle';
import VenueGallery from './VenueGallery';
import VenueMeta from './VenueMeta';
import VenueDescription from './VenueDescription';
import VenuePrice from './VenuePrice';
import VenueMaxGuests from './VenueMaxGuests';
import VenueLocation from './VenueLocation';
import BookingForm from '../bookings/BookingForm';
import { useApiError } from '../../hooks/useApiError';
import { ErrorDisplay } from '../common/ErrorDisplay';

const VenueDetails = () => {
  const { id } = useParams();
  const { error, handleError } = useApiError();
  const {
    data: venue,
    isLoading,
    error: queryError,
  } = useGetVenueByIdQuery(id!, {
    skip: !id,
  });

  if (queryError) {
    handleError(queryError);
  }

  //Style divs same as main outlet content
  if (isLoading)
    return (
      <div className="container mx-auto px-4 py-8">
        <Loader />
      </div>
    );

  if (!venue)
    return (
      <div className="container mx-auto px-4 py-8">
        <div>Venue not found</div>;
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <ErrorDisplay error={error} />
      <header>
        <VenueTitle title={venue.name} className="text-3xl font-bold mb-4" as="h1" />
      </header>
      <main>
        <section>
          <VenueGallery images={venue.media} />
        </section>
        <section>
          <VenueMeta meta={venue.meta} />
          <VenueDescription description={venue.description} />
          <div className="mt-4">
            <VenuePrice price={venue.price} />
            <VenueMaxGuests maxGuests={venue.maxGuests} />
          </div>
        </section>
        <section>
          <VenueLocation venueLocation={venue.location} />
        </section>
        <section className="mt-6">
          <BookingForm venue={venue} />
        </section>
      </main>
    </div>
  );
};

export default VenueDetails;
