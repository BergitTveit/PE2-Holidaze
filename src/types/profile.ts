import { Media } from './media';
import { Booking } from './booking';
import { Venue } from './venue';

export interface Profile {
  name: string;
  email: string;
  bio: string;
  avatar: Media;
  banner: Media;
  venueManager: boolean;
  venues: Venue[];
  bookings: Booking[];
  _count: {
    venues: number;
    bookings: number;
  };
}

