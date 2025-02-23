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
    <div className={`w-full md:py-6 mb-6 md:mb-0 ${isExpanded ? 'mb-8' : ''}`}>
      <div className="relative">
        <div className={`h-auto bg-neutral-light transition-all duration-300 ease-in-out md:h-16`}>
          <div className="p-4 md:hidden w-full">
            <div className="flex justify-between items-center">
              <VenueTitle title={venue.name} as="h3" className="bg-white text-xl text-neutral" />
              {showExpand && onToggle && (
                <Button variant="round" onClick={onToggle} className="ml-4">
                  {isExpanded ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </Button>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row ">
            <div className="w-full md:w-[260px] md:pl-6">
              <div className="md:relative md:-top-16">
                <div className="w-full md:w-[240px] h-[200px] overflow-hidden">
                  <VenueCardImage media={venue.media} venueName={venue.name} />
                </div>
              </div>
            </div>
            <div className="flex-1 p-4">
              <div className="hidden md:flex justify-between items-start -mt-16">
                <VenueTitle title={venue.name} as="h3" className="bg-white text-xl text-neutral" />
                <div className="flex items-center gap-4">
                  <VenueRating rating={venue.rating} />
                  {showExpand && onToggle && (
                    <Button variant="round" onClick={onToggle}>
                      {isExpanded ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`bg-neutral-light transition-all duration-300 ease-in-out overflow-hidden
          ${isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <div className="flex flex-col md:flex-row">
            <div className="hidden md:block md:w-[260px]" />
            <div className="flex-1 p-4 md:p-4">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
