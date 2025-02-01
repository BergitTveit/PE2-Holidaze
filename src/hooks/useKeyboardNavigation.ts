import { useCallback } from 'react';
import { Venue } from '../types/venue';

interface UseKeyboardNavigationProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  highlightedIndex: number;
  setHighlightedIndex: React.Dispatch<React.SetStateAction<number>>;
  items: Venue[];
  onSubmit: () => void;
  onSelect: (venue: Venue) => void;
}

export const useKeyboardNavigation = ({
  isOpen,
  setIsOpen,
  highlightedIndex,
  setHighlightedIndex,
  items,
  onSubmit,
  onSelect,
}: UseKeyboardNavigationProps) => {
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      const hasItems = items.length > 0;

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
            if (hasItems) {
              setHighlightedIndex(0);
            }
            return;
          }
          setHighlightedIndex((prev: number) => {
            if (prev >= items.length - 1) return 0;
            return prev + 1;
          });
          break;

        case 'ArrowUp':
          event.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
            if (hasItems) {
              setHighlightedIndex(items.length - 1);
            }
            return;
          }
          setHighlightedIndex((prev: number) => {
            if (prev <= 0) return items.length - 1;
            return prev - 1;
          });
          break;

        case 'Enter':
          event.preventDefault();
          if (highlightedIndex >= 0 && items[highlightedIndex]) {
            onSelect(items[highlightedIndex]);
          } else {
            onSubmit();
          }
          break;

        case 'Escape':
          event.preventDefault();
          setIsOpen(false);
          setHighlightedIndex(-1);
          break;
      }
    },
    [isOpen, setIsOpen, highlightedIndex, setHighlightedIndex, items, onSubmit, onSelect]
  );

  return { handleKeyDown };
};
