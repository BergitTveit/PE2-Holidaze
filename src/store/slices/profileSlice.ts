import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { ProfileSection } from '../../components/profile/ProfileNav';

interface ProfileState {
  currentSection: ProfileSection;
}

const initialState: ProfileState = {
  currentSection: 'bookings',
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setCurrentSection: (state, action: PayloadAction<ProfileSection>) => {
      state.currentSection = action.payload;
    },
    resetProfileState: (state) => {
      state.currentSection = 'bookings';
    },
  },
});

export const { setCurrentSection, resetProfileState } = profileSlice.actions;

export const selectCurrentSection = (state: RootState) => state.profile.currentSection;

export default profileSlice.reducer;
