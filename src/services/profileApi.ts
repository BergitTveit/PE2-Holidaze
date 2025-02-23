import { UpdateProfileFormData } from '../schemas/updateProfile';
import { IProfile } from '../types/profile';
import { getProfileUrl } from './apiConstants';
import { baseApi } from './baseApi';
import { IVenue } from '../types/venue';

export const profilesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfileByName: builder.query<IProfile, string>({
      query: (name) => ({
        url: getProfileUrl(name),
        params: { _bookings: true, _venues: true },
      }),
      transformResponse: (response: { data: IProfile }) => response.data,
      providesTags: (_result, _error, name) => [{ type: 'Profile', id: name }],
    }),

    updateProfile: builder.mutation<IProfile, { name: string; data: UpdateProfileFormData }>({
      query: ({ name, data }) => ({
        url: getProfileUrl(name),
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, { name }) => [{ type: 'Profile', id: name }],
    }),

    getProfileVenues: builder.query<IVenue[], string>({
      query: (username) => ({
        url: `${getProfileUrl(username)}/venues`,
        params: {
          _bookings: true,
        },
      }),
      transformResponse: (response: { data: IVenue[] }) => response.data,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Venue' as const, id })),
              { type: 'Venue', id: 'LIST' },
            ]
          : [{ type: 'Venue', id: 'LIST' }],
    }),
  }),
  overrideExisting: false,
});

export const { useGetProfileByNameQuery, useGetProfileVenuesQuery, useUpdateProfileMutation } =
  profilesApi;
