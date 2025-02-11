import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IAuthState {
  userName: string | null;
  accessToken: string | null;
}

const initialState: IAuthState = {
  userName: null,
  accessToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        accessToken: string;
        userName: string;
      }>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.userName = action.payload.userName;
    },
    logout: (state) => {
      state.userName = null;
      state.accessToken = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
