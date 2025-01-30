import { Media } from './media';

export interface Venue {
  id: string;
  name: string;
  description: string;
  media: Media[];
  price: number;
  maxGuests: number;
  rating: number;
  created: string;
  updated: string;
  meta: Meta;
  venueLocation: IVenueLocation;
  owner: VenueOwner;
  _count: {
    bookings: number;
  };
}

export interface Meta {
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
  continent: string;
  lat: number;
  lng: number;
}

export interface VenueOwner {
  name: string;
  email: string;
  bio: string;
  avatar: Media;
  banner: Media;
}
