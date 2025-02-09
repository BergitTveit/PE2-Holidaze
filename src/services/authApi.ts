import { baseApi } from './baseApi';
import type { LoginCredentials, RegisterCredentials } from '../schemas/auth';
import { API_LOGIN, API_REGISTER } from './apiConstants';

interface LoginResponse {
  name: string;
  accessToken: string;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<LoginResponse, RegisterCredentials>({
      query: (credentials) => ({
        url: API_REGISTER,
        method: 'POST',
        body: credentials,
      }),
      transformResponse: (response: { data: LoginResponse }) => response.data,
    }),
    login: builder.mutation<LoginResponse, LoginCredentials>({
      query: (credentials) => ({
        url: API_LOGIN,
        method: 'POST',
        body: credentials,
      }),
      transformResponse: (response: { data: LoginResponse }) => response.data,
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
