import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import { Profile } from '../../types';
import { UpdateProfileData } from '../../types/profile';

interface ProfileState {
  profile: Profile | null;
  isLoading: boolean;
  error: string | null;
}
const initialState: ProfileState = {
  profile: null,
  isLoading: false,
  error: null,
};

export const fetchProfile = createAsyncThunk('profile/fetch', async (name: string) => {
  const response = await api.get(`/holidaze/profiles/${name}`);
  return response.data.data;
});
// check syntax/structure for strict typing

export const updateProfile = createAsyncThunk(
  'profile/update',
  async ({ name, data }: { name: string; data: UpdateProfileData }) => {
    const response = await api.put(`/holidaze/profiles/${name}`, data);
    return response.data.data;
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch profile';
      })
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to update profile';
      });
  },
});

export default profileSlice.reducer;
