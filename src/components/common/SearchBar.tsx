import { Venue } from '../../types/venue';
import { Search } from 'lucide-react';
import Button from './Buttons';
import { useSearch } from '../../hooks/useSearch';
import { useCallback, useEffect, useRef } from 'react';
import { SearchProps } from '../../types/search';
import { SearchInput } from './SearchInput';
import { SearchBarList } from './SearchBarList';
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation';

const SearchBar = ({ onSubmit, onChange, venues, initialValue = '',showDropdown = true  }: SearchProps) => {
  const searchRef = useRef<HTMLDivElement>(null);
  const {
    searchTerm,
    setSearchTerm,
    isOpen,
    setIsOpen,
    highlightedIndex,
    setHighlightedIndex,
    filteredVenues,
    resetSearch,
  } = useSearch({ venues, initialValue });

  const handleSubmit = useCallback(() => {
    if (searchTerm.trim()) {
      onSubmit(searchTerm.trim());
      resetSearch();
    }
  }, [searchTerm, onSubmit, resetSearch]);

  const handleVenueSelect = useCallback(
    (venue: Venue) => {
      setSearchTerm(venue.name);
      onSubmit(venue.name);
      resetSearch();
    },
    [onSubmit, setSearchTerm, resetSearch]
  );

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setSearchTerm(value);
      setIsOpen(showDropdown);
      setHighlightedIndex(-1);
      onChange?.(value);
    },
    [setSearchTerm, setIsOpen, setHighlightedIndex, onChange]
  );

  const { handleKeyDown } = useKeyboardNavigation({
    isOpen,
    setIsOpen,
    highlightedIndex,
    setHighlightedIndex,
    items: filteredVenues,
    onSubmit: handleSubmit,
    onSelect: handleVenueSelect,
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={searchRef}>
      <div className="relative  flex gap-2">
        <div className="relative flex-1">
          <SearchInput
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsOpen(true)}
            placeholder="Search for your dream venue..."
            highlightedVenue={
              highlightedIndex >= 0 ? `venue-${filteredVenues[highlightedIndex]?.id}` : undefined
            }
          />
        </div>
        <Button
          onClick={handleSubmit}
          className="px-6 py-3 bg-blue-500 text-white  hover:bg-blue-600 transition-colors flex items-center gap-2"
        >
          <Search size={20} />
          <span>Search</span>
        </Button>
      </div>
      {isOpen && searchTerm && (
        <SearchBarList
          venues={filteredVenues}
          highlightedIndex={highlightedIndex}
          onSelect={handleVenueSelect}
          onHighlight={setHighlightedIndex}
        />
      )}
    </div>
  );
};

export default SearchBar;
