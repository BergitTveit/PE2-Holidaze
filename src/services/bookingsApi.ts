import { IBooking, IBookingCreate } from '../types/booking';
import { API_BOOKINGS } from './apiConstants';
import { baseApi } from './baseApi';

export const bookingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation<IBooking, IBookingCreate>({
      query: (booking) => ({
        url: API_BOOKINGS,
        method: 'POST',
        body: booking,
      }),
      invalidatesTags: [
        { type: 'Booking', id: 'LIST' },
        { type: 'Profile' },
        { type: 'Venue', id: 'LIST' },
      ],
    }),
  }),
});

export const { useCreateBookingMutation } = bookingsApi;
