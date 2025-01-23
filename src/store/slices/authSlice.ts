import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthState } from '../../types/auth';
import api from '../../services/api';

const initialState: AuthState = {
 user: null,
 isLoading: false,
 error: null,
};

export const loginUser = createAsyncThunk(
 'auth/login',
 async (credentials: { email: string; password: string }) => {
   const response = await api.post('/auth/login', credentials);
   return response.data;
 }
);

export const registerUser = createAsyncThunk(
 'auth/register',
 async (data: { 
   name: string; 
   email: string; 
   password: string; 
   venueManager: boolean; 
 }) => {
   const response = await api.post('/auth/register', data);
   return response.data;
 }
);

const authSlice = createSlice({
 name: 'auth',
 initialState,
 reducers: {
   logout: (state) => {
     state.user = null;
     localStorage.removeItem('user');
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
       localStorage.setItem('user', JSON.stringify(action.payload));
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
       localStorage.setItem('user', JSON.stringify(action.payload));
     })
     .addCase(registerUser.rejected, (state, action) => {
       state.isLoading = false;
       state.error = action.error.message || 'Registration failed';
     });
 },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;