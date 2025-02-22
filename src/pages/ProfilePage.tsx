import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetProfileByNameQuery, useGetProfileVenuesQuery } from '../services/profileApi';
import { UpdateProfileForm } from '../components/profile/UpdateProfileForm';
import { Profile } from '../components/profile/Profile';
import { Modal } from '../components/common/Modal';
import { BookingGrid } from '../components/venues/bookings/UserBookingGrid';
import { VenueManagementSection } from '../components/venues/venues/VenueManagementSection';
import { useAppSelector } from '../hooks/useStore';
import { BookingManagementSection } from '../components/venues/bookings/BookingManagementSection';
import { MessageDisplay } from '../components/common/feedback/MessageDisplay';
import { ProfileNav } from '../components/profile/ProfileNav';
import { ProfileSection } from '../components/profile/ProfileNav';

const ProfilePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState<ProfileSection>('bookings');
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

  if (isLoading || venuesLoading) {
    return (
      <MessageDisplay
        title="Loading profile"
        message="Please wait while we fetch the profile details"
        variant="loading"
      />
    );
  }

  if (error) {
    return (
      <MessageDisplay
        title="Error occurred"
        message="There was a problem loading the profile"
        variant="error"
      />
    );
  }
  if (!profile) {
    return (
      <MessageDisplay
        title="Profile not found"
        message="The profile you're looking for doesn't exist"
        variant="empty"
      />
    );
  }

  const isOwnProfile = userName === profile.name;
  return (
    <div className="container mx-auto px-4">
      <Profile profile={profile} onEditClick={() => setIsModalOpen(true)} />

      <ProfileNav
        isVenueManager={profile.venueManager}
        currentSection={currentSection}
        onSectionChange={setCurrentSection}
      />

      {profile.venueManager ? (
        <>
          {currentSection === 'venues' && (
            <VenueManagementSection venues={profile.venues || []} showOwnerActions={isOwnProfile} />
          )}
          {currentSection === 'bookings' && <BookingGrid bookings={profile.bookings} />}
          {currentSection === 'venueBookings' && (
            <BookingManagementSection venues={venuesWithBookings || []} />
          )}
        </>
      ) : (
        <BookingGrid bookings={profile.bookings} />
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Edit Profile">
        <UpdateProfileForm onSuccess={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default ProfilePage;
