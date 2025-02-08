import { baseApi } from './baseApi';
import type { LoginCredentials, RegisterCredentials } from '../schemas/auth';
import type { IUser } from '../types/auth';
import { API_LOGIN, API_REGISTER } from './apiConstants';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<IUser, RegisterCredentials>({
      query: (credentials) => ({
        url: API_REGISTER,
        method: 'POST',
        body: credentials,
      }),
      transformResponse: (response: { data: IUser }) => response.data,
    }),
    login: builder.mutation<IUser, LoginCredentials>({
      query: (credentials) => ({
        url: API_LOGIN,
        method: 'POST',
        body: credentials,
      }),
      transformResponse: (response: { data: IUser }) => response.data,
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
