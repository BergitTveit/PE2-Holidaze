import { useParams } from 'react-router-dom';
import { useGetVenueByIdQuery } from '../../../services/venuesApi';
import { VenueTitle } from '../details/VenueTitle';
import { VenueGallery } from '../details/VenueGallery';
import { VenueMeta } from '../details/VenueMeta';
import { VenueDescription } from '../details/VenueDescription';
import { VenuePrice } from '../details/VenuePrice';
import { VenueMaxGuests } from '../details/VenueMaxGuests';
import { VenueLocation } from '../details/VenueLocation';
import { BookingForm } from '../bookings/BookingForm';
import { useApiError } from '../../../hooks/useApiError';
import { ErrorDisplay } from '../../common/feedback/ErrorDisplay';
import { MessageDisplay } from '../../common/feedback/MessageDisplay';

export const VenueDetails = () => {
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

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <MessageDisplay
          title="Loading venue"
          message="Please wait while we fetch the venue details"
          variant="loading"
        />
      </div>
    );
  }

  if (!venue) {
    return (
      <div className="container mx-auto px-4 py-8">
        <MessageDisplay
          title="Venue not found"
          message="The venue you're looking for doesn't exist"
          variant="empty"
        />
      </div>
    );
  }
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
          <VenueMeta meta={venue.meta} variant="details" />
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
