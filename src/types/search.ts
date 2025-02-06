import { IVenue } from './venue';

export interface SearchProps {
  onSubmit: (query: string) => void;
  onChange?: (query: string) => void;
  venues: IVenue[];
  initialValue?: string;
  showDropdown?: boolean;
}
