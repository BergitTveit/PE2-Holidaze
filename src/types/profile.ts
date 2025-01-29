interface Media {
  url: string;
  alt: string;
}

interface Meta {
  wifi: boolean;
  parking: boolean;
  breakfast: boolean;
  pets: boolean;
}

interface Location {
  address: string;
  city: string;
  zip: string;
  country: string;
  continent: string;
  lat: number;
  lng: number;
}

interface VenueOwner {
  name: string;
  email: string;
  bio: string;
  avatar: Media;
  banner: Media;
}

interface Venue {
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
  location: Location;
  owner: VenueOwner;
  _count: {
    bookings: number;
  };
}

interface Booking {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created: string;
  updated: string;
  venue: Venue;
  customer: VenueOwner;
}

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

export interface ProfileState {
  profile: Profile | null;
  isLoading: boolean;
  error: string | null;
}

export type UpdateProfileData = Partial<
  Pick<Profile, 'bio' | 'avatar' | 'banner' | 'venueManager'>
>;
