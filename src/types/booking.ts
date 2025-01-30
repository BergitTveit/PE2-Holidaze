import { Venue, VenueOwner } from './venue';

export interface Booking {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created: string;
  updated: string;
  venue: Venue;
  customer: VenueOwner;
}

export interface BookingCreate {
  dateFrom: string;
  dateTo: string;
  guests: number;
  venueId: string;
}
