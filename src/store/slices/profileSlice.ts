import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import { Profile } from '../../types/profile';
import { API_PROFILES } from '../../services/apiConstants';
import { UpdateProfileFormData } from '../../schemas/updateProfile';

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

export const fetchProfile = createAsyncThunk<Profile, string>('profile/fetch', async (name) => {
  const response = await api.get(`${API_PROFILES}/${name}`);
  return response.data.data;
});

export const updateProfile = createAsyncThunk<
  Profile,
  { name: string; data: UpdateProfileFormData }
>('profile/update', async ({ name, data }) => {
  const response = await api.put(`${API_PROFILES}/${name}`, data);
  return response.data.data;
});
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
