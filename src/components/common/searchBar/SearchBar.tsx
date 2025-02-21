import { Search } from 'lucide-react';
import {Button} from '../Buttons';
import { useCallback, useEffect, useRef } from 'react';
import { IVenue } from '../../../types/venue';
import { SearchInput } from './SearchInput';
import { SearchBarList } from './SearchBarList';
import { useKeyboardNavigation } from '../../../hooks/useKeyboardNavigation';
import { useVenueSearch } from '../../../hooks/useSearch';

export const SearchBar = ({ navigate }: { navigate?: (url: string) => void }) => {
  const searchRef = useRef<HTMLDivElement>(null);
  const {
    inputValue,
    suggestions,
    isOpen,
    setIsOpen,
    highlightedIndex,
    setHighlightedIndex,
    handleSearch,
    handleInputChange,
  } = useVenueSearch(navigate);

  const handleSubmit = useCallback(() => {
    if (inputValue.trim()) {
      handleSearch(inputValue.trim(), true);
    }
  }, [inputValue, handleSearch]);

  const handleVenueSelect = useCallback(
    (venue: IVenue) => {
      handleSearch(venue.name, true);
    },
    [handleSearch]
  );

  const onInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      handleInputChange(event.target.value);
    },
    [handleInputChange]
  );

  const { handleKeyDown } = useKeyboardNavigation({
    isOpen,
    setIsOpen,
    highlightedIndex,
    setHighlightedIndex,
    items: suggestions,
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
  }, [setIsOpen]);

  return (
    <div className="relative w-full" ref={searchRef}>
      <div className="relative flex gap-2">
        <div className="relative flex-1">
          <SearchInput
            value={inputValue}
            onChange={onInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsOpen(true)}
            placeholder="Search for your dream venue..."
            highlightedVenue={
              highlightedIndex >= 0 ? `venue-${suggestions[highlightedIndex]?.id}` : undefined
            }
          />
        </div>
        <Button
          onClick={handleSubmit}
          className="px-6 py-3 bg-blue-500 text-white transition-colors flex items-center gap-2"
        >
          <Search size={20} />
          <span>Search</span>
        </Button>
      </div>

      {isOpen && inputValue && suggestions.length > 0 && (
        <SearchBarList
          venues={suggestions}
          highlightedIndex={highlightedIndex}
          onSelect={handleVenueSelect}
          onHighlight={setHighlightedIndex}
        />
      )}
    </div>
  );
};
