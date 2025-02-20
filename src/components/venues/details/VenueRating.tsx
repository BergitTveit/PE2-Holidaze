import { Star } from 'lucide-react';

interface VenueRatingProps {
  rating: number;
}

export const VenueRating = ({ rating }: VenueRatingProps) => {
  const roundedRating = Math.round(rating * 2) / 2;

  return (
    <div className="flex items-center gap-2">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => {
          const fillPercentage = Math.min(Math.max((roundedRating - (star - 1)) * 100, 0), 100);

          return (
            <div key={star} className="relative w-5 h-5">
              <Star className="w-full h-full absolute text-gray-200" fill="currentColor" />

              <div
                className="absolute w-full h-full overflow-hidden"
                style={{ width: `${fillPercentage}%` }}
              >
                <Star className="w-full h-full text-yellow-400" fill="currentColor" />
              </div>
            </div>
          );
        })}
      </div>
      <span className="text-sm font-medium text-gray-700">{rating.toFixed(1)}</span>
    </div>
  );
};
