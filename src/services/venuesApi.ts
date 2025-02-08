import { baseApi } from './baseApi';
import type { IVenue } from '../types/venue';
import { CreateVenueDTO } from '../schemas/addVenue';
import { API_VENUES, API_VENUES_SEARCH, getVenueUrl } from './apiConstants';

export interface ApiResponse<T> {
  data: T extends Array<any> ? T : T[];
  meta: {
    isFirstPage: boolean;
    isLastPage: boolean;
    currentPage: number;
    previousPage: number | null;
    nextPage: number | null;
    pageCount: number;
    totalCount: number;
  };
}

interface GetVenuesParams {
  page?: number;
  limit?: number;
  _owner?: boolean;
  _bookings?: boolean;
  sort?: 'created' | 'updated' | 'name' | 'price';
  sortOrder?: 'asc' | 'desc';
}

interface SearchVenuesParams {
  query: string;
  page?: number;
  limit?: number;
  sort?: 'created' | 'updated' | 'name' | 'price';
  sortOrder?: 'asc' | 'desc';
}

export const venuesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getVenues: builder.query<ApiResponse<IVenue[]>, GetVenuesParams | void>({
      query: (params) => {
        const defaultParams: GetVenuesParams = {
          page: 1,
          limit: 12,
          _owner: false,
          _bookings: false,
          sort: 'created',
          sortOrder: 'desc',
        };
        const queryParams = params || defaultParams;

        return {
          url: API_VENUES,
          params: {
            page: queryParams.page,
            limit: queryParams.limit,
            _owner: queryParams._owner,
            _bookings: queryParams._bookings,
            sort: queryParams.sort,
            sortOrder: queryParams.sortOrder,
          },
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: 'Venue' as const, id })),
              { type: 'Venue', id: 'LIST' },
            ]
          : [{ type: 'Venue', id: 'LIST' }],
    }),

    getVenueById: builder.query<IVenue, string>({
      query: (id) => ({
        url: getVenueUrl(id),
        params: {
          _owner: true,
          _bookings: true,
        },
      }),
      transformResponse: (response: { data: IVenue }) => response.data,
      providesTags: (_result, _error, id) => [{ type: 'Venue', id }],
    }),

    createVenue: builder.mutation<IVenue, CreateVenueDTO>({
      query: (venue) => ({
        url: API_VENUES,
        method: 'POST',
        body: venue,
      }),
      transformResponse: (response: { data: IVenue }) => response.data,
      invalidatesTags: [{ type: 'Venue', id: 'LIST' }],
    }),

    updateVenue: builder.mutation<IVenue, { id: string; venue: Partial<CreateVenueDTO> }>({
      query: ({ id, venue }) => ({
        url: getVenueUrl(id),
        method: 'PUT',
        body: venue,
      }),
      transformResponse: (response: { data: IVenue }) => response.data,
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Venue', id }],
    }),

    deleteVenue: builder.mutation<void, string>({
      query: (id) => ({
        url: getVenueUrl(id),
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'Venue', id },
        { type: 'Venue', id: 'LIST' },
      ],
    }),

    searchVenues: builder.query<ApiResponse<IVenue[]>, SearchVenuesParams>({
      query: ({ query, page = 1, limit = 12, sort = 'created', sortOrder = 'desc' }) => ({
        url: API_VENUES_SEARCH,
        params: {
          q: query,
          page,
          limit,
          sort,
          sortOrder,
        },
      }),
      serializeQueryArgs: ({ queryArgs }) => {
        const { page, ...rest } = queryArgs;
        return rest;
      },

      forceRefetch: ({ currentArg, previousArg }) => {
        return currentArg?.page !== previousArg?.page;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: 'Venue' as const, id })),
              { type: 'Venue', id: 'LIST' },
            ]
          : [{ type: 'Venue', id: 'LIST' }],
    }),

    getVenueSuggestions: builder.query<IVenue[], string>({
      query: (searchTerm) => ({
        url: API_VENUES_SEARCH,
        params: {
          q: searchTerm,
          limit: 5,
          page: 1,
          sort: 'created',
          sortOrder: 'desc',
        },
      }),
      transformResponse: (response: ApiResponse<IVenue[]>) => response.data,
      keepUnusedDataFor: 60,
    }),
  }),
});

export const {
  useGetVenuesQuery,
  useGetVenueByIdQuery,
  useCreateVenueMutation,
  useUpdateVenueMutation,
  useDeleteVenueMutation,
  useSearchVenuesQuery,
  useGetVenueSuggestionsQuery,
} = venuesApi;
