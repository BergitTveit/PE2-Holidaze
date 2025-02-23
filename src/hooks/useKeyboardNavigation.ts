import { useCallback } from 'react';
import { IVenue } from '../types/venue';

interface UseKeyboardNavigationProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  highlightedIndex: number;
  setHighlightedIndex: React.Dispatch<React.SetStateAction<number>>;
  items: IVenue[];
  onSubmit: () => void;
  onSelect: (venue: IVenue) => void;
}
/**
 * Custom hook to manage keyboard navigation for a list of items.
 *
 * @param {Object} params - Hook parameters.
 * @param {boolean} params.isOpen - Whether the dropdown/list is currently open.
 * @param {(open: boolean) => void} params.setIsOpen - Function to toggle the open state.
 * @param {number} params.highlightedIndex - The currently highlighted index in the list.
 * @param {(index: number) => void} params.setHighlightedIndex - Function to update the highlighted index.
 * @param {Array<any>} params.items - The list of items to navigate through.
 * @param {() => void} params.onSubmit - Function to execute when the Enter key is pressed without a selection.
 * @param {(item: any) => void} params.onSelect - Function to execute when an item is selected with the Enter key.
 *
 * @returns {Object} - An object containing:
 * - `handleKeyDown` {(event: React.KeyboardEvent<HTMLInputElement>) => void} - Keydown event handler for navigation.
 */
export const useKeyboardNavigation = ({
  isOpen,
  setIsOpen,
  highlightedIndex,
  setHighlightedIndex,
  items,
  onSubmit,
  onSelect,
}: UseKeyboardNavigationProps) => {
  /**
   * Handles keyboard events for navigating and selecting items.
   *
   * @param {React.KeyboardEvent<HTMLInputElement>} event - The keyboard event.
   */
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
          setHighlightedIndex((prev: number) => (prev >= items.length - 1 ? 0 : prev + 1));
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
          setHighlightedIndex((prev: number) => (prev <= 0 ? items.length - 1 : prev - 1));
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
