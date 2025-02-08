export const API_LOGIN = '/auth/login';
export const API_REGISTER = '/auth/register';
export const API_PROFILES = '/holidaze/profiles';
export const API_PROFILE_SEARCH = '/holidaze/profiles/search';
export const API_VENUES = '/holidaze/venues';
export const API_VENUES_SEARCH = '/holidaze/venues/search';
export const API_BOOKINGS = '/holidaze/bookings';

export const getProfileUrl = (name: string) => `${API_PROFILES}/${name}`;
export const getProfileBookingsUrl = (name: string) => `${API_PROFILES}/${name}/bookings`;
export const getProfileVenuesUrl = (name: string) => `${API_PROFILES}/${name}/venues`;

export const getVenueUrl = (id: string) => `${API_VENUES}/${id}`;
export const getBookingUrl = (id: string) => `${API_BOOKINGS}/${id}`;
