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

const VenueDetails = () => {
  const { id } = useParams();
  const {
    data: venue,
    isLoading,
    error,
  } = useGetVenueByIdQuery(id!, {
    skip: !id,
  });

  if (isLoading) return <Loader />;
  if (error) return <div>Error loading venue</div>;
  if (!venue) return <div>Venue not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
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
