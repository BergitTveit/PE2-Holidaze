// src/store/slices/toastSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ToastType } from '../../components/common/feedback/Toast';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastState {
  toast: Toast | null;
}

const initialState: ToastState = {
  toast: null,
};

export const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    setToast: (state, action: PayloadAction<{ message: string; type: ToastType }>) => {
      state.toast = {
        ...action.payload,
        id: Date.now().toString(),
      };
    },
    clearToast: (state) => {
      state.toast = null;
    },
  },
});

export const { setToast, clearToast } = toastSlice.actions;
export default toastSlice.reducer;
