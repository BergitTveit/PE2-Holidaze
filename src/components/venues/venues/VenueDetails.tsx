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
        <div className="mt-6 flex flex-col lg:flex-row lg:gap-8">
          <div className="flex-1">
            <VenueDescription description={venue.description} />
            <div className="mt-4">
              <VenuePrice price={venue.price} />
              <VenueMaxGuests maxGuests={venue.maxGuests} />
            </div>
            <div className="relative mt-6">
              <div className="absolute left-[50%] right-[50%] mx-[-50vw] w-screen h-48 bg-neutral" />{' '}
              <div className="relative">
                <VenueMeta meta={venue.meta} variant="details" />
                <div className="mt-12">
                  <VenueLocation venueLocation={venue.location} />
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-[400px] mt-6 lg:mt-0">
            <div className="bg-white rounded-lg p-6">
              <BookingForm venue={venue} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
