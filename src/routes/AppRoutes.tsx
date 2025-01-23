import { Routes, Route } from 'react-router-dom';
// import { ProtectedRoutes } from './ProtectedRoutes';
import Layout from '../components/layout/Layout';
import { Home } from '../pages/Home';
import { VenueList } from '../pages/VenueList';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route index element={<Home />} />
        <Route path="venues" element={<VenueList />} />
        {/* <Route path="venues/:id" element={<VenueDetails />} />
          <Route path="login" element={<Login />} />
          <Route path="register/customer" element={<CustomerRegister />} />
          <Route path="register/manager" element={<ManagerRegister />} /> */}

        {/* Customer Routes */}
        {/* <Route element={<ProtectedRoutes />}>
            <Route path="profile" element={<Profile />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="avatar" element={<UpdateAvatar />} />
          </Route> */}

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
