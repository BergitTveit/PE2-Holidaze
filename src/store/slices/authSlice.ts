import { createSlice } from '@reduxjs/toolkit';
import { IUser } from '../../types/auth';

interface IAuthState {
  user: IUser | null;
  accessToken: string | null;
}

const initialState: IAuthState = {
  user: null,
  accessToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = {
        name: action.payload.name,
        email: action.payload.email,
        accessToken: action.payload.accessToken,
        venueManager: action.payload.venueManager || false,
      };
      state.accessToken = action.payload.accessToken;
      localStorage.setItem('accessToken', action.payload.accessToken);
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      localStorage.removeItem('accessToken');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
