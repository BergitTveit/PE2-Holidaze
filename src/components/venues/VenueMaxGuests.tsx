import { Users } from 'lucide-react';

interface VenueMaxGuestsProps {
  maxGuests: number;
}

const VenueMaxGuests = ({ maxGuests }: VenueMaxGuestsProps) => (
  <div className="flex items-center text-gray-700">
    <Users className="w-5 h-5 mr-2" />
    <p>Max Guests: {maxGuests}</p>
  </div>
);

export default VenueMaxGuests;
