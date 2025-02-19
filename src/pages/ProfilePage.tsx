import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetProfileByNameQuery, useGetProfileVenuesQuery } from '../services/profileApi';
import { UpdateProfileForm } from '../components/profile/UpdateProfileForm';
import { Profile } from '../components/profile/Profile';
import { Modal } from '../components/common/Modal';
import { BookingGrid } from '../components/bookings/BookingGrid';
import { VenueManagementSection } from '../components/venues/VenueManagementSection';
import { useAppSelector } from '../hooks/useStore';
import { BookingManagementSection } from '../components/bookings/BookingManagementSection';

const ProfilePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { username } = useParams();
  const { userName } = useAppSelector((state) => state.auth);
  const {
    data: profile,
    isLoading,
    error,
  } = useGetProfileByNameQuery(username!, {
    skip: !username,
  });

  const { data: venuesWithBookings, isLoading: venuesLoading } = useGetProfileVenuesQuery(
    username!,
    {
      skip: !username,
    }
  );

  if (isLoading || venuesLoading) return <div>Loading...</div>;
  if (error) {
    return <div>Error loading profile</div>;
  }
  if (!profile) return <div>No profile found</div>;

  const isOwnProfile = userName === profile.name;

  return (
    <div className="container mx-auto px-4">
      <Profile profile={profile} onEditClick={() => setIsModalOpen(true)} />

      {profile.venueManager && (
        <>
          <VenueManagementSection venues={profile.venues || []} showOwnerActions={isOwnProfile} />
          <BookingManagementSection venues={venuesWithBookings || []} />
        </>
      )}

      <BookingGrid bookings={profile.bookings} />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Edit Profile">
        <UpdateProfileForm onSuccess={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default ProfilePage;
