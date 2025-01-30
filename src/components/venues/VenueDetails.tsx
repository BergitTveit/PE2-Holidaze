import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/useStore';
import { useEffect } from 'react';
import { fetchVenueById } from '../../store/slices/venuesSlice';
import Loader from '../common/Loader';
import VenueGallery from './VenueGallery';
import VenueDescription from './VenueDescription';
import VenuePrice from './VenuePrice';
import VenueMaxGuests from './VenueMaxGuests';
import VenueTitle from './VenueTitle';
import VenueMeta from './VenueMeta';

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
      <VenueTitle title={currentVenue.name} className="text-3xl font-bold mb-4" as="h1" />
      <VenueGallery images={currentVenue.media} />
      <VenueDescription description={currentVenue.description} />
      <VenueMeta meta={currentVenue.meta} />
      <div className="mt-4">
        <VenuePrice price={currentVenue.price} />
        <VenueMaxGuests maxGuests={currentVenue.maxGuests} />
      </div>
    </div>
  );
};

export default VenueDetails;
