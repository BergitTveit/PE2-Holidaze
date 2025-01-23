// src/types/index.ts
export interface Venue {
  id: string;
  name: string;
  description: string;
  media: string[];
  price: number;
  maxGuests: number;
  rating: number;
  location: {
    address: string;
    city: string;
    country: string;
  };
  meta: {
    wifi: boolean;
    parking: boolean;
    breakfast: boolean;
    pets: boolean;
  };
}

export interface Booking {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  venueId: string;
  created: string;
  updated: string;
}

export interface BookingCreate {
  dateFrom: string;
  dateTo: string;
  guests: number;
  venueId: string;
}
