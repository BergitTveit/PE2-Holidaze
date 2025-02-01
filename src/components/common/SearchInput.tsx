import { forwardRef } from 'react';

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  highlightedVenue?: string;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ highlightedVenue, ...props }, ref) => (
    <input
      ref={ref}
      type="text"
      role="combobox"
      aria-autocomplete="list"
      aria-controls="venue-listbox"
      aria-activedescendant={highlightedVenue}
      className="w-full p-3 border shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
      {...props}
    />
  )
);
