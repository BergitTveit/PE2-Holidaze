import { useState, useRef, useEffect } from 'react';
import { Venue } from '../../types/venue';
import useDebounce from '../../hooks/useDebounce';
import { Building2, Hotel, Search } from 'lucide-react';
import Button from './Buttons';

interface SearchBarProps {
  onSearch: (query: string) => void;
  venues: Venue[];
}

const SearchBar = ({ onSearch, venues }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredVenues =
    searchTerm.trim().length > 0
      ? venues
          .filter((venue) => venue.name.toLowerCase().includes(searchTerm.toLowerCase().trim()))
          .slice(0, 5)
      : [];

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setIsOpen(true);
    setHighlightedIndex(-1);
  };

  const handleVenueSelect = (venue: Venue) => {
    setSearchTerm(venue.name);
    onSearch(venue.name);
    setIsOpen(false);
  };
  const handleSearch = () => {
    onSearch(searchTerm);
    setIsOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const hasFilteredVenues = filteredVenues.length > 0;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          if (hasFilteredVenues) {
            setHighlightedIndex(0);
          }
          return;
        }
        setHighlightedIndex((prev) => {
          if (prev >= filteredVenues.length - 1) return 0;
          return prev + 1;
        });
        break;

      case 'ArrowUp':
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          if (hasFilteredVenues) {
            setHighlightedIndex(filteredVenues.length - 1);
          }
          return;
        }
        setHighlightedIndex((prev) => {
          if (prev <= 0) return filteredVenues.length - 1;
          return prev - 1;
        });
        break;

      case 'Enter':
        event.preventDefault();
        if (highlightedIndex >= 0 && filteredVenues[highlightedIndex]) {
          handleVenueSelect(filteredVenues[highlightedIndex]);
        } else {
          handleSearch();
        }
        break;

      case 'Escape':
        event.preventDefault();
        setIsOpen(false);
        break;
    }
  };

  return (
    <div className="relative w-full" ref={searchRef}>
      <div className="relative  flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            role="combobox"
            aria-expanded={isOpen}
            aria-autocomplete="list"
            aria-controls="venue-listbox"
            aria-activedescendant={
              highlightedIndex >= 0 ? `venue-${filteredVenues[highlightedIndex]?.id}` : undefined
            }
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsOpen(true)}
            placeholder="Search for your dream venue..."
            className="w-full p-3 border 
             shadow-sm focus:outline-none focus:ring-2 focus:ring-black
              focus:border-transparent"
          />
        </div>
        <Button
          onClick={handleSearch}
          className="px-6 py-3 bg-blue-500 text-white  hover:bg-blue-600 transition-colors flex items-center gap-2"
        >
          <Search size={20} />
          <span>Search</span>
        </Button>
      </div>
      {isOpen && searchTerm && (
        <ul
          id="venue-listbox"
          role="listbox"
          className="absolute w-full mt-1 bg-white border  shadow-lg max-h-[300px] overflow-y-auto z-10"
        >
          {filteredVenues.length > 0 ? (
            filteredVenues.map((venue, index) => (
              <li
                key={venue.id}
                id={`venue-${venue.id}`}
                role="option"
                aria-selected={highlightedIndex === index}
                onClick={() => handleVenueSelect(venue)}
                onMouseEnter={() => setHighlightedIndex(index)}
                className={`flex items-center gap-3 p-3 cursor-pointer transition-colors
                  ${
                    highlightedIndex === index
                      ? 'bg-blue-500 ' //CHANGE COLOUR: Made strong due to old monitor.
                      : 'hover:bg-gray-50'
                  }`}
              >
                {venue.media[0]?.url ? (
                  <img
                    src={venue.media[0].url}
                    alt=""
                    className="w-12 h-12 object-cover rounded"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded">
                    <Hotel className="w-6 h-6 text-orange-500" />
                  </div>
                )}
                <div className="flex flex-col min-w-0">
                  <span className="font-medium truncate">{venue.name}</span>
                  <span className="text-sm text-gray-500 truncate">
                    {venue.venueLocation?.country || ''}
                  </span>
                </div>
              </li>
            ))
          ) : (
            <li className="p-3 text-center text-gray-500">
              No venues found matching "{searchTerm}"
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
