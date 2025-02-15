import { IBooking, IBookingCreate } from '../types/booking';
import { API_BOOKINGS, getBookingUrl } from './apiConstants';
import { baseApi } from './baseApi';
import { ApiResponse } from './venuesApi';

interface GetBookingsParams {
  _customer?: boolean;
  _venue?: boolean;
  offset?: number;
  limit?: number;
}

export const bookingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBookings: builder.query<ApiResponse<IBooking>, GetBookingsParams | void>({
      query: (params = {}) => ({
        url: API_BOOKINGS,
        params: {
          _customer: true,
          _venue: true,
          offset: params?.offset,
          limit: params?.limit,
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: 'Booking' as const, id })),
              { type: 'Booking', id: 'LIST' },
            ]
          : [{ type: 'Booking', id: 'LIST' }],
    }),

    getBookingById: builder.query<IBooking, string>({
      query: (id) => ({
        url: getBookingUrl(id),
        params: {
          _customer: true,
          _venue: true,
        },
      }),
      providesTags: (_result, _error, id) => [{ type: 'Booking', id }],
    }),

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

    updateBooking: builder.mutation<IBooking, { id: string; booking: Partial<IBookingCreate> }>({
      query: ({ id, booking }) => ({
        url: getBookingUrl(id),
        method: 'PUT',
        body: booking,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Booking', id },
        { type: 'Booking', id: 'LIST' },
        { type: 'Profile' },
        { type: 'Venue', id: 'LIST' },
      ],
    }),

    deleteBooking: builder.mutation<void, string>({
      query: (id) => ({
        url: getBookingUrl(id),
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'Booking', id },
        { type: 'Booking', id: 'LIST' },
        { type: 'Profile' },
        { type: 'Venue', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetBookingsQuery,
  useGetBookingByIdQuery,
  useCreateBookingMutation,
  useUpdateBookingMutation,
  useDeleteBookingMutation,
} = bookingsApi;
