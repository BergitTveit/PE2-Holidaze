export type ProfileSection = 'venues' | 'bookings' | 'venueBookings';

interface ProfileNavProps {
  isVenueManager: boolean;
  onSectionChange: (section: ProfileSection) => void;
  currentSection: ProfileSection;
}

export const ProfileNav = ({
  isVenueManager,
  onSectionChange,
  currentSection,
}: ProfileNavProps) => {
  if (!isVenueManager) {
    return (
      <div className="flex items-center">
        <div className="h-px bg-primary-dark flex-grow"></div>
        <h2 className="text-xl font-medium px-4 bg-white">My Bookings</h2>
        <div className="h-px bg-primary-dark flex-grow"></div>
      </div>
    );
  }
  const sections: ProfileSection[] = ['venues', 'bookings', 'venueBookings'];
  return (
    <div className="flex items-center">
      <div className="h-px bg-primary-dark flex-grow"></div>
      {sections.map((section) => (
        <div key={section} className="flex items-center flex-grow">
          <button
            onClick={() => onSectionChange(section)}
            className={`text-xl font-medium px-4 bg-white transition-colors
              ${currentSection === section ? 'text-primary-dark' : 'text-gray-500 hover:text-gray-700'}`}
          >
            {section === 'venues' && 'My Venues'}
            {section === 'bookings' && 'My Bookings'}
            {section === 'venueBookings' && 'Venue Bookings'}
          </button>
          <div className="h-px bg-primary-dark flex-grow"></div>
        </div>
      ))}
    </div>
  );
};
