import VenueCard from './VenueCard';
import { useAppDispatch, useAppSelector } from '../../hooks/useStore';
import { useEffect } from 'react';
import { fetchVenues } from '../../store/slices/venuesSlice';
import Loader from '../common/Loader';

const VenueGrid = () => {
  const dispatch = useAppDispatch();
  const { data: venues, isLoading, error } = useAppSelector((state) => state.venues);

  useEffect(() => {
    dispatch(fetchVenues());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (venues.length === 0) {
    return <div>No venues found.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {venues.map((venue) => (
        <VenueCard key={venue.id} venue={venue} />
      ))}
    </div>
  );
};
export default VenueGrid;
