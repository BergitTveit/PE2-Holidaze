import { useState, useCallback } from 'react';
import { Venue } from '../types/venue';

interface UseSearchProps {
  venues: Venue[];
  initialValue?: string;
  maxSuggestions?: number;
}

export const useSearch = ({ venues, initialValue = '', maxSuggestions = 15 }: UseSearchProps) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const filteredVenues =
    searchTerm.trim().length > 0
      ? venues
          .filter((venue) => venue.name.toLowerCase().includes(searchTerm.toLowerCase().trim()))
          .slice(0, maxSuggestions)
      : [];

  const resetSearch = useCallback(() => {
    setHighlightedIndex(-1);
    setIsOpen(false);
  }, []);

  return {
    searchTerm,
    setSearchTerm,
    isOpen,
    setIsOpen,
    highlightedIndex,
    setHighlightedIndex,
    filteredVenues,
    resetSearch,
  };
};
