import { IVenue } from '../../../types/venue';
import { SearchBarItem } from './SearchBarItem';


interface SearchBarListProps {
  venues: IVenue[];
  highlightedIndex: number;
  onSelect: (venue: IVenue) => void;
  onHighlight: (index: number) => void;
}

export const SearchBarList = ({
  venues,
  highlightedIndex,
  onSelect,
  onHighlight,
}: SearchBarListProps) => (
  <ul
    id="venue-listbox"
    role="listbox"
    className="absolute w-full mt-1 bg-white border shadow-lg max-h-[300px] overflow-y-auto z-10"
  >
    {venues.map((venue, index) => (
      <SearchBarItem
        key={venue.id}
        venue={venue}
        isHighlighted={highlightedIndex === index}
        onSelect={() => onSelect(venue)}
        onHighlight={() => onHighlight(index)}
      />
    ))}
  </ul>
);
