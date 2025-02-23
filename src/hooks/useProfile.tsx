import { useParams } from 'react-router-dom';
import { useGetProfileByNameQuery } from '../services/profileApi';
import { ProfileSection } from '../components/profile/ProfileNav';
import { useAppDispatch, useAppSelector } from './useStore';
import { setCurrentSection } from '../store/slices/profileSlice';
import { useEffect } from 'react';

/**
 * Custom hook to manage user profile data and section state.
 *
 * @returns {Object} An object containing:
 * - `currentSection` {ProfileSection} - The currently selected profile section.
 * - `onSectionChange` {(section: ProfileSection) => void} - Function to update the current section.
 * - `isVenueManager` {boolean} - Boolean indicating if the user is a venue manager.
 */
export const useProfile = () => {
  const { username } = useParams();
  const dispatch = useAppDispatch();
  const { data: profile } = useGetProfileByNameQuery(username!, { skip: !username });
  const currentSection = useAppSelector((state) => state.profile.currentSection);

  useEffect(() => {
    if (!profile?.venueManager && currentSection !== 'bookings') {
      dispatch(setCurrentSection('bookings'));
    }
  }, [profile?.venueManager, currentSection, dispatch]);

  /**
   * Updates the currently active section in the profile.
   *
   * @param {ProfileSection} section - The profile section to set.
   */
  const onSectionChange = (section: ProfileSection) => {
    dispatch(setCurrentSection(section));
  };

  return {
    currentSection,
    onSectionChange,
    isVenueManager: profile?.venueManager || false,
  };
};
