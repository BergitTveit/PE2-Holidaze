import { IVenue } from '../../types/venue';
import { Hotel } from 'lucide-react';
import ImageComponent from '../common/Image';

interface SearchBarItemProps {
  venue: IVenue;
  isHighlighted: boolean;
  onSelect: () => void;
  onHighlight: () => void;
}

const SearchBarItem = ({ venue, isHighlighted, onSelect, onHighlight }: SearchBarItemProps) => (
  <li
    id={`venue-${venue.id}`}
    role="option"
    aria-selected={isHighlighted}
    onClick={onSelect}
    onMouseEnter={onHighlight}
    className={`flex items-center gap-3 p-3 cursor-pointer transition-colors
      ${isHighlighted ? 'bg-blue-500 text-white' : 'hover:bg-gray-50'}`}
  >
    {venue.media[0]?.url ? (
      <ImageComponent
        src={venue.media[0].url}
        alt={venue.media[0].alt || venue.name}
        className="w-12 h-12 object-cover rounded"
      />
    ) : (
      <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded">
        <Hotel className="w-6 h-6 text-orange-500" />
      </div>
    )}
    <div className="flex flex-col min-w-0">
      <span className={`font-medium truncate ${isHighlighted ? 'text-white' : ''}`}>
        {venue.name}
      </span>
      <span className={`text-sm truncate ${isHighlighted ? 'text-white/90' : 'text-gray-500'}`}>
        {venue.location?.country || ''}
      </span>
    </div>
  </li>
);

export default SearchBarItem;
