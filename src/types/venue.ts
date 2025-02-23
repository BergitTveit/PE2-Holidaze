import { IBooking } from './booking';
import { IMedia } from './media';

export interface IVenue {
  id: string;
  name: string;
  description: string;
  media: IMedia[];
  price: number;
  maxGuests: number;
  rating: number;
  created: string;
  updated: string;
  meta: IMeta;
  location: IVenueLocation;
  bookings: IBooking[];
  _count: {
    bookings: number;
  };
}

export interface IMeta {
  wifi: boolean;
  parking: boolean;
  breakfast: boolean;
  pets: boolean;
}

export interface IVenueLocation {
  address: string;
  city: string;
  zip: string;
  country: string;
}
