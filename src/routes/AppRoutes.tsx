import { Routes, Route } from 'react-router-dom';
import { ProtectedRoutes } from './ProtectedRoutes';

import Layout from '../components/layout/Layout';
import HomePage from '../pages/HomePage';
import ProfilePage from '../pages/ProfilePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import VenuesPage from '../pages/VenuesPage';
import VenueDetailsPage from '../pages/VenueDetailsPage';
import CreateVenuePage from '../pages/CreateVenuePage';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="venues" element={<VenuesPage />} />
        <Route path="venue/:id" element={<VenueDetailsPage />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="profile/:username" element={<ProfilePage />} />
        </Route>

        <Route element={<ProtectedRoutes requireManager />}>
          <Route path="venues/create" element={<CreateVenuePage />} />
          <Route path="/venues/:id/edit" element={<CreateVenuePage />} />
        </Route>
      </Route>
    </Routes>
  );
};
