import { IMedia } from './media';
import { IBooking } from './booking';
import { IVenue } from './venue';

export interface IProfile {
  name: string;
  email: string;
  bio: string;
  avatar: IMedia;
  banner: IMedia;
  venueManager: boolean;
  venues: IVenue[];
  bookings: IBooking[];
  _count: {
    venues: number;
    bookings: number;
  };
}
