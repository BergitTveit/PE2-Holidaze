export type ProfileSection = 'venues' | 'bookings' | 'venueBookings';

const SECTION_TITLES: Record<ProfileSection, string> = {
  venues: 'My Venues',
  bookings: 'My Bookings',
  venueBookings: 'Venue Bookings',
};

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
  const sections: ProfileSection[] = ['venues', 'bookings', 'venueBookings'];

  return (
    <>
      <div className="hidden md:block">
        {isVenueManager ? (
          <div className="flex items-center">
            <div className="h-px bg-primary-dark flex-grow"></div>
            {sections.map((section) => (
              <div key={section} className="flex items-center flex-grow">
                <button
                  onClick={() => onSectionChange(section)}
                  className={`text-xl font-medium px-4 bg-white transition-colors
                    ${currentSection === section ? 'text-primary-dark' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  {SECTION_TITLES[section]}
                </button>
                <div className="h-px bg-primary-dark flex-grow"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center">
            <div className="h-px bg-primary-dark flex-grow"></div>
            <h2 className="text-xl font-medium px-4 bg-white">My Bookings</h2>
            <div className="h-px bg-primary-dark flex-grow"></div>
          </div>
        )}
      </div>

      <div className="md:hidden flex items-center">
        <div className="h-px bg-primary-dark flex-grow"></div>
        <h2 className="text-xl font-medium px-4 bg-white">{SECTION_TITLES[currentSection]}</h2>
        <div className="h-px bg-primary-dark flex-grow"></div>
      </div>
    </>
  );
};
