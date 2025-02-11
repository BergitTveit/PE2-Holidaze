import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSearchVenuesQuery, useGetVenueSuggestionsQuery } from '../services/venuesApi';

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

  const handleSearch = (query: string, shouldNavigate: boolean = false) => {
    if (navigate && shouldNavigate) {
      navigate(`/venues?search=${encodeURIComponent(query)}&page=1`);
    } else {
      setSearchParams({ search: query, page: '1' });
    }
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
    if (!navigate) {
      handleSearch(value, false);
    }
    setIsOpen(true);
    setHighlightedIndex(-1);
  };

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
