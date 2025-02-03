import { IVenueLocation } from '../../types/venue'; // Adjust import path as needed

interface VenueLocationProps {
  venueLocation: IVenueLocation;
}

const VenueLocation = ({ venueLocation }: VenueLocationProps) => {
  if (!venueLocation) {
    return <p>No location information available</p>;
  }

  const { address, city, zip, country } = venueLocation;
  if (!address && !city && !zip && !country) {
    return <p>No location information available</p>;
  }

  const locationParts = [address, city, zip, country].filter(Boolean);
  const formattedLocation = locationParts.join(', ');

  return <p className="mt-4">{formattedLocation}</p>;
};

export default VenueLocation;
