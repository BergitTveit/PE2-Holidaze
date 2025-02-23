import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSearchVenuesQuery, useGetVenueSuggestionsQuery } from '../services/venuesApi';

/**
 * Custom hook for handling venue search, pagination, and suggestions.
 *
 * @param {function} [navigate] - Optional navigation function for handling URL changes.
 * @returns {Object} An object containing:
 * - `searchTerm` {string} - The current search term from URL parameters.
 * - `currentPage` {number} - The current page number.
 * - `venues` {Array<Venue>} - The list of retrieved venues.
 * - `meta` {MetaData | undefined} - Pagination metadata.
 * - `inputValue` {string} - The current value of the search input.
 * - `handleInputChange` {(value: string) => void} - Function to update the search input.
 * - `suggestions` {Array<VenueSuggestion>} - Venue search suggestions.
 * - `isLoading` {boolean} - Whether venue data is currently loading.
 * - `isFetching` {boolean} - Whether venue data is being fetched.
 * - `isOpen` {boolean} - Whether the search suggestion dropdown is open.
 * - `setIsOpen` {(isOpen: boolean) => void} - Function to toggle the dropdown.
 * - `highlightedIndex` {number} - The index of the currently highlighted suggestion.
 * - `setHighlightedIndex` {(index: number) => void} - Function to set the highlighted suggestion index.
 * - `handleSearch` {(query: string, shouldNavigate?: boolean) => void} - Function to perform a search.
 * - `handlePageChange` {(page: number) => void} - Function to update the current page.
 */
export const useVenueSearch = (navigate?: (url: string) => void) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [inputValue, setInputValue] = useState(searchParams.get('search') || '');
  const searchTerm = searchParams.get('search') || '';
  const currentPage = Number(searchParams.get('page')) || 1;

  const {
    data: venues,
    isLoading,
    isFetching,
  } = useSearchVenuesQuery(
    {
      query: searchTerm,
      page: currentPage,
      limit: 12,
    },
    {
      skip: !searchTerm.trim(),
    }
  );

  const { data: suggestions = [] } = useGetVenueSuggestionsQuery(inputValue, {
    skip: !inputValue.trim() || !isOpen || !navigate,
  });

  /**
   * Handles searching by updating URL parameters or navigating.
   *
   * @param {string} query - The search term.
   * @param {boolean} [shouldNavigate=false] - Whether to navigate instead of updating URL params.
   */
  const handleSearch = (query: string, shouldNavigate: boolean = false) => {
    if (navigate && shouldNavigate) {
      navigate(`/venues?search=${encodeURIComponent(query)}&page=1`);
    } else {
      setSearchParams({ search: query, page: '1' });
    }
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  /**
   * Handles changes in the search input.
   *
   * @param {string} value - The new search input value.
   */
  const handleInputChange = (value: string) => {
    setInputValue(value);
    if (!navigate) {
      handleSearch(value, false);
    }
    setIsOpen(true);
    setHighlightedIndex(-1);
  };

  /**
   * Updates the current page in the URL parameters.
   *
   * @param {number} page - The new page number.
   */
  const handlePageChange = (page: number) => {
    setSearchParams((current) => ({
      ...Object.fromEntries(current),
      page: String(page),
    }));
  };

  return {
    searchTerm,
    currentPage,
    venues: venues?.data || [],
    meta: venues?.meta,
    inputValue,
    handleInputChange,
    suggestions,
    isLoading,
    isFetching,
    isOpen,
    setIsOpen,
    highlightedIndex,
    setHighlightedIndex,
    handleSearch,
    handlePageChange,
  };
};
