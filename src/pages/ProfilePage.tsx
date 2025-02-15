import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useGetProfileByNameQuery } from '../services/profileApi';
import { UpdateProfileForm } from '../components/profile/UpdateProfileForm';
import Profile from '../components/profile/Profile';
import Modal from '../components/common/Modal';
import VenueGrid from '../components/venues/VenueGrid';
import BookingGrid from '../components/bookings/BookingGrid';

const ProfilePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { username } = useParams();

  const {
    data: profile,
    isLoading,
    error,
  } = useGetProfileByNameQuery(username!, {
    skip: !username,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading profile</div>;
  }
  if (!profile) return <div>No profile found</div>;

  return (
    <div className="container mx-auto px-4">
      <Profile profile={profile} onEditClick={() => setIsModalOpen(true)} />

      {profile?.venueManager && (
        <div className="mt-8 p-4 border-t border-gray-200">
          <h2 className="text-xl font-bold mb-4">Venue Management</h2>
          <Link to="/venues/create" className="inline-block bg-blue-600 text-white px-6 py-2">
            Create New Venue
          </Link>
        </div>
      )}

      <VenueGrid venues={profile.venues || []} />
      <h2 className="text-xl font-bold mb-4">Upcoming bookings</h2>
      <BookingGrid bookings={profile.bookings} />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Edit Profile">
        <UpdateProfileForm onSuccess={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default ProfilePage;
