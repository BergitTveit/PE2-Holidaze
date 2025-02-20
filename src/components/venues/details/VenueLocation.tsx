import { IVenueLocation } from '../../../types/venue';

interface VenueLocationProps {
  venueLocation: IVenueLocation;
}

export const VenueLocation = ({ venueLocation }: VenueLocationProps) => {
  if (!venueLocation) {
    return <p>No location information available</p>;
  }

  const { address, city, zip, country } = venueLocation;
  if (!address && !city && !zip && !country) {
    return <p>Adress will be sent out with booking confirmation.</p>;
  }

  const locationParts = [address, city, zip, country].filter(Boolean);
  const formattedLocation = locationParts.join(', ');

  return <p className="mt-4">{formattedLocation}</p>;
};
