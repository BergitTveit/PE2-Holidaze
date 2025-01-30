interface VenueRatingProps {
  rating: number;
}

const VenueRating = ({ rating }: VenueRatingProps) => (
  <div>
    <span>⭐</span>
    <span className="ml-2">{rating}</span>
  </div>
);

export default VenueRating;
