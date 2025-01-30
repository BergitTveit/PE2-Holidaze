import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import api from '../../services/api';

import { User } from '../../types/auth';
import { AuthState, LoginCredentials, RegisterCredentials } from '../../types/auth';
import { API_LOGIN, API_REGISTER } from '../../services/apiConstants';

// check import pattern for types

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
};

export const loginUser = createAsyncThunk<User, LoginCredentials>(
  'auth/login',
  async (credentials) => {
    const response = await api.post(API_LOGIN, credentials);
    return response.data.data;
  }
);

export const registerUser = createAsyncThunk<
  User,
  RegisterCredentials,
  {
    rejectValue: string;
  }
>('auth/register', async (data, { rejectWithValue }) => {
  try {
    const response = await api.post(API_REGISTER, data);
    return response.data.data;
  } catch (error: unknown) {
    let errorMessage = 'Registration failed';

    if (error instanceof AxiosError && error.response) {
      errorMessage = error.response.data?.errors?.[0]?.message || errorMessage;
    }
    return rejectWithValue(errorMessage);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Login failed';
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
