import { Users } from 'lucide-react';

interface VenueMaxGuestsProps {
  maxGuests: number;
}

export const VenueMaxGuests = ({ maxGuests }: VenueMaxGuestsProps) => (
  <div className="flex items-center justify-center bg-neutral/70 h-[45px] w-[100px]">
    <Users className="w-5 h-5 text-white mr-2" />
    <span className="text-white">{maxGuests}</span>
  </div>
);
