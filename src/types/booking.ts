import { IVenue, IVenueOwner } from './venue';

export interface IBooking {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created: string;
  updated: string;
  venue: IVenue;
  customer: IVenueOwner;
}

export interface IBookingCreate {
  dateFrom: string;
  dateTo: string;
  guests: number;
  venueId: string;
}
