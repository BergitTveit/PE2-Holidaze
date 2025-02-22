import { Minus, Plus } from 'lucide-react';
import { VenueTitle } from '../details/VenueTitle';
import { VenueCardImage } from '../details/VenueCardImage';
import { IVenue } from '../../../types/venue';
import { VenueRating } from '../details/VenueRating';
import { Button } from '../../common/Buttons';

interface BaseVenueCardProps {
  venue: IVenue;
  isExpanded?: boolean;
  onToggle?: () => void;
  showExpand?: boolean;
  children?: React.ReactNode;
}

export const BaseVenueCard = ({
  venue,
  isExpanded = false,
  onToggle,
  showExpand = false,
  children,
}: BaseVenueCardProps) => {
  return (
    <div className="w-full py-6">
      <div className="relative bg-neutral-light min-h-[80px] flex">
        <div className="absolute left-6 -top-16">
          <div className="w-[240px] h-[200px] overflow-hidden">
            <VenueCardImage media={venue.media} venueName={venue.name} />
          </div>
        </div>
        <div className="ml-[260px] flex-1 p-4">
          <div className="flex justify-between items-start -mt-16">
            <VenueTitle title={venue.name} as="h3" className="bg-white text-xl text-neutral" />
            <VenueRating rating={venue.rating} />
          </div>
        </div>
        {showExpand && onToggle && (
          <div className="absolute right-4 bottom-4">
            <Button variant="round" onClick={onToggle}>
              {isExpanded ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            </Button>
          </div>
        )}
      </div>

      <div
        className={` bg-neutral-light overflow-hidden transition-all duration-300 ease-in-out
            ${isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        {children}
      </div>
    </div>
  );
};
