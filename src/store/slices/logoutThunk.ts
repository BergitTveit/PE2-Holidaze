import { createAsyncThunk } from '@reduxjs/toolkit';
import { persistor } from '../store';
import { logout } from './authSlice';

const logoutThunk = createAsyncThunk<void, void>('auth/logout', async (_, { dispatch }) => {
  await persistor.purge();
  dispatch(logout());
});

export default logoutThunk;
