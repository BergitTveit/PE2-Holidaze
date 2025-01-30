import { Routes, Route } from 'react-router-dom';
import { ProtectedRoutes } from './ProtectedRoutes';

import Layout from '../components/layout/Layout';
import HomePage from '../pages/HomePage';
import ProfilePage from '../pages/ProfilePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import VenuesPage from '../pages/VenuesPage';
import IdVenuePage from '../pages/IdVenuePage';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="venues" element={<VenuesPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="venue/:id" element={<IdVenuePage />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="profile/:username" element={<ProfilePage />} />
          {/* <Route path="bookings" element={<Bookings />} /> */}
        </Route>

        {/* <Route element={<ProtectedRoutes requireManager />}>
            <Route path="venues/create" element={<CreateVenue />} />
            <Route path="venues/:id/edit" element={<EditVenue />} />
            <Route path="venues/:id/bookings" element={<VenueBookings />} />
          </Route> */}
      </Route>
    </Routes>
  );
};
