import { Helmet } from 'react-helmet-async';
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
import { useProfile } from '../hooks/useProfile';

const ProfilePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { currentSection, onSectionChange } = useProfile();
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

  const getTitle = () => {
    if (isLoading) return 'Loading Profile';
    if (error) return 'Error Loading Profile';
    if (!profile) return 'Profile Not Found';
    return `${profile.name}'s Profile`;
  };

  return (
    <>
      <Helmet>
        <title>{`${getTitle()} - Holidaze`}</title>
        <meta
          name="description"
          content={
            profile
              ? `View ${profile.name}'s profile, bookings and venues on Holidaze`
              : 'View user profile on Holidaze'
          }
        />
      </Helmet>

      {isLoading || venuesLoading ? (
        <MessageDisplay
          title="Loading profile"
          message="Please wait while we fetch the profile details"
          variant="loading"
        />
      ) : error ? (
        <MessageDisplay
          title="Error occurred"
          message="There was a problem loading the profile"
          variant="error"
        />
      ) : !profile ? (
        <MessageDisplay
          title="Profile not found"
          message="The profile you're looking for doesn't exist"
          variant="empty"
        />
      ) : (
        <div className="container mx-auto px-4">
          <Profile profile={profile} onEditClick={() => setIsModalOpen(true)} />
          <ProfileNav
            isVenueManager={profile.venueManager}
            currentSection={currentSection}
            onSectionChange={onSectionChange}
          />
          {profile.venueManager ? (
            <>
              {currentSection === 'venues' && (
                <VenueManagementSection
                  venues={profile.venues || []}
                  showOwnerActions={userName === profile.name}
                />
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
      )}
    </>
  );
};

export default ProfilePage;
