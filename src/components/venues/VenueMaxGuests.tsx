interface VenueMaxGuestsProps {
  maxGuests: number;
}

const VenueMaxGuests = ({ maxGuests }: VenueMaxGuestsProps) => <p>Max Guests: {maxGuests}</p>;

export default VenueMaxGuests;
