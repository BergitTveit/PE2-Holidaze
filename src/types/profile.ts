import { IMedia } from './media';
import { IBooking } from './booking';
import { IVenue } from './venue';

export interface IProfile {
  name: string;
  email: string;
  bio: string;
  avatar: IMedia;
  venueManager: boolean;
  venues: IVenue[];
  bookings: IBooking[];
}
