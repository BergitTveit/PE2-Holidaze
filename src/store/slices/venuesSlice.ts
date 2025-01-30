import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../services/api';
import { Venue } from '../../types/venue';
import { API_VENUES } from '../../services/apiConstants';

interface VenuesState {
  data: Venue[];
  isLoading: boolean;
  error: string | null;
}

const initialState: VenuesState = {
  data: [],
  isLoading: false,
  error: null,
};

export const fetchVenues = createAsyncThunk<Venue[], void>('venues/fetchVenues', async () => {
  const response = await api.get(API_VENUES);

  return response.data.data;
});

const venuesSlice = createSlice({
  name: 'venues',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVenues.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchVenues.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchVenues.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch venues';
      });
  },
});

export default venuesSlice.reducer;
