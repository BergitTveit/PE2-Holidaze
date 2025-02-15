import { UpdateProfileFormData } from '../schemas/updateProfile';
import { IProfile } from '../types/profile';
import { ApiResponse } from './venuesApi';
import { API_PROFILES, API_PROFILE_SEARCH, getProfileUrl } from './apiConstants';
import { baseApi } from './baseApi';

export const profilesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfiles: builder.query<ApiResponse<IProfile[]>, void>({
      query: () => API_PROFILES,
      transformResponse: (response: ApiResponse<IProfile[]>) => response,
    }),
    searchProfiles: builder.query<ApiResponse<IProfile[]>, string>({
      query: (query) => ({
        url: API_PROFILE_SEARCH,
        params: { q: query },
      }),
      transformResponse: (response: ApiResponse<IProfile[]>) => response,
    }),
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
  }),
  overrideExisting: false,
});

export const {
  useGetProfilesQuery,
  useSearchProfilesQuery,
  useGetProfileByNameQuery,
  useUpdateProfileMutation,
} = profilesApi;
