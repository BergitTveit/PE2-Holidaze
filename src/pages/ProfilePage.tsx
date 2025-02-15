import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetProfileByNameQuery } from '../services/profileApi';
import { UpdateProfileForm } from '../components/profile/UpdateProfileForm';
import Profile from '../components/profile/Profile';
import Modal from '../components/common/Modal';
import BookingGrid from '../components/bookings/BookingGrid';
import VenueManagementSection from '../components/venues/VenueManagementSection';
import { useAppSelector } from '../hooks/useStore';
import BookingManagementSection from '../components/bookings/BookingManagementSection';
import { useGetVenueByIdQuery } from '../services/venuesApi';

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


  const { data: venueWithBookings, isLoading: venueLoading } = useGetVenueByIdQuery(
    profile?.venues[0]?.id ?? '', 
    { skip: !profile?.venues?.length }
  );



  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error loading profile</div>;
  }
  if (!profile) return <div>No profile found</div>;
  const { userName } = useAppSelector((state) => state.auth);
  const isOwnProfile = userName === profile.name;
  return (
    <div className="container mx-auto px-4">
      <Profile profile={profile} onEditClick={() => setIsModalOpen(true)} />



      {profile.venueManager && (
        <>
          <VenueManagementSection 
            venues={profile.venues || []} 
            showOwnerActions={isOwnProfile} 
          />
          {/* Bookings received on user's venues */}
          <BookingManagementSection 
            bookings={venueWithBookings?.bookings || []}
            title="Bookings on Your Venues"
            isOwner={isOwnProfile}
          />
        </>
      )}

      {/* {profile.venueManager && (
        <VenueManagementSection venues={profile.venues || []} showOwnerActions={true} />
      
      
      
      
      )} */}




   <BookingManagementSection 
        bookings={profile.bookings}
        title="Your Bookings"
        isOwner={isOwnProfile}
      />
      {/* <BookingGrid bookings={profile.bookings} /> */}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Edit Profile">
        <UpdateProfileForm onSuccess={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default ProfilePage;
