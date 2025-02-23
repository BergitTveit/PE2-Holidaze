import { useParams } from 'react-router-dom';
import { useGetProfileByNameQuery } from '../services/profileApi';
import { ProfileSection } from '../components/profile/ProfileNav';
import { useAppDispatch, useAppSelector } from './useStore';
import { setCurrentSection } from '../store/slices/profileSlice';
import { useEffect } from 'react';

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

  const onSectionChange = (section: ProfileSection) => {
    dispatch(setCurrentSection(section));
  };

  return {
    currentSection,
    onSectionChange,
    isVenueManager: profile?.venueManager || false,
  };
};
