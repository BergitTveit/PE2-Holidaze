import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/useStore';
import { fetchVenueById } from '../../store/slices/venuesSlice';

import Loader from '../common/Loader';
import VenueTitle from './VenueTitle';
import VenueGallery from './VenueGallery';
import VenueDescription from './VenueDescription';
import VenueMeta from './VenueMeta';
import VenuePrice from './VenuePrice';
import VenueMaxGuests from './VenueMaxGuests';
import VenueCalendar from './VenueCalendar';
import VenueLocation from './VenueLocation';

const VenueDetails = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { currentVenue, isLoading, error } = useAppSelector((state) => state.venues);

  useEffect(() => {
    if (id) {
      dispatch(fetchVenueById(id));
    }
  }, [dispatch, id]);

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!currentVenue) {
    return <div>Venue not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header>
        <VenueTitle title={currentVenue.name} className="text-3xl font-bold mb-4" as="h1" />
      </header>
      <main>
        <section>
          <VenueGallery images={currentVenue.media} />
        </section>
        <section>
          <VenueMeta meta={currentVenue.meta} />{' '}
          <VenueDescription description={currentVenue.description} />
          <div className="mt-4">
            <VenuePrice price={currentVenue.price} />
            <VenueMaxGuests maxGuests={currentVenue.maxGuests} />
          </div>
        </section>
        <section>
          <VenueLocation venueLocation={currentVenue.location} />
        </section>
        <section className="mt-6">
          <VenueCalendar bookings={currentVenue.bookings} />
        </section>
      </main>
    </div>
  );
};

export default VenueDetails;
