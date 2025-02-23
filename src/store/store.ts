import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './slices/authSlice';
import profileReducer from './slices/profileSlice';
import { baseApi } from '../services/baseApi';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['accessToken', 'userName'],
};

const profilePersistConfig = {
  key: 'profile',
  storage,
  whitelist: ['currentSection'],
};

if (!storage) {
  throw new Error('No storage mechanism found for redux-persist');
}

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedProfileReducer = persistReducer(profilePersistConfig, profileReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    profile: persistedProfileReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
