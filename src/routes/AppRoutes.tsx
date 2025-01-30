import { Routes, Route } from 'react-router-dom';
import { ProtectedRoutes } from './ProtectedRoutes';

import Layout from '../components/layout/Layout';
import HomePage from '../pages/HomePage';
import ProfilePage from '../pages/ProfilePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import VenuesPage from '../pages/VenuesPage';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="venues" element={<VenuesPage />} />
        <Route path="register" element={<RegisterPage />} />
        {/* <Route path="venues/:id" element={<VenueDetails />} />*/}

        {/* Customer Routes */}
        <Route element={<ProtectedRoutes />}>
          <Route path="profile/:username" element={<ProfilePage />} />
          {/* <Route path="bookings" element={<Bookings />} /> */}
          {/* <Route path="avatar" element={<UpdateAvatar />} /> */}
        </Route>

        {/* Manager Routes */}
        {/* <Route element={<ProtectedRoutes requireManager />}>
            <Route path="venues/create" element={<CreateVenue />} />
            <Route path="venues/:id/edit" element={<EditVenue />} />
            <Route path="venues/:id/bookings" element={<VenueBookings />} />
          </Route> */}
      </Route>
    </Routes>
  );
};
