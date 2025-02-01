import { Venue } from './venue';

export interface SearchProps {
  onSubmit: (query: string) => void;
  onChange?: (query: string) => void;
  venues: Venue[];
  initialValue?: string;
  showDropdown?: boolean;
}
