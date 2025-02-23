import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useStore';
import { useState } from 'react';
import { useProfile } from '../../hooks/useProfile';
import { Button } from '../common/Buttons';
import { Menu, X } from 'lucide-react';
import { ProfileSection } from '../profile/ProfileNav';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { userName } = useAppSelector((state) => state.auth);
  const { isVenueManager, currentSection, onSectionChange } = useProfile();

  const handleNavigation = (path: string, section?: ProfileSection) => {
    setIsOpen(false);
    navigate(path);
    if (section) {
      onSectionChange(section);
    }
  };

  return (
    <header
      className="bg-neutral shadow relative"
      style={{
        backgroundImage: `url('/src/assets/placeholder.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '50px',
      }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-neutral opacity-90"></div>

      <nav className="container mx-auto px-4 py-4 relative z-10 hidden md:block">
        <button onClick={() => handleNavigation('/')} className="ml-4 text-white">
          HOLIDAZE
        </button>
        <button onClick={() => handleNavigation('/venues')} className="ml-4 text-white">
          Venues
        </button>
        {userName ? (
          <button
            onClick={() => handleNavigation(`/profile/${userName}`, 'bookings')}
            className="ml-4 text-white"
          >
            {currentSection === 'venues' ? 'My Venues' : 'Profile'}
          </button>
        ) : (
          <>
            <button onClick={() => handleNavigation('/register')} className="ml-4 text-white">
              Register
            </button>
            <button onClick={() => handleNavigation('/login')} className="ml-4 text-white">
              Login
            </button>
          </>
        )}
      </nav>

      <div className="md:hidden relative z-20">
        <button onClick={() => handleNavigation('/')} className="absolute top-3 left-4 text-white">
          HOLIDAZE
        </button>

        <Button
          variant="round"
          onClick={() => setIsOpen(!isOpen)}
          className="absolute top-2 right-4 z-50"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? <X className="w-4 h-4 text-white" /> : <Menu className="w-4 h-4 text-white" />}
        </Button>

        {isOpen && (
          <div className="fixed inset-0 bg-white z-40">
            <div className="pt-16 px-4">
              <nav className="space-y-4">
                <button
                  onClick={() => handleNavigation('/venues')}
                  className="block w-full text-left text-lg p-4 text-neutral"
                >
                  Venues
                </button>

                {userName && (
                  <>
                    <button
                      onClick={() => handleNavigation(`/profile/${userName}`, 'bookings')}
                      className="block w-full text-left text-lg p-4 text-neutral"
                    >
                      Profile
                    </button>
                    <button
                      onClick={() => handleNavigation(`/profile/${userName}`, 'bookings')}
                      className="block w-full text-left text-lg p-4 text-neutral"
                    >
                      My Bookings
                    </button>

                    {isVenueManager && (
                      <>
                        <button
                          onClick={() => handleNavigation(`/profile/${userName}`, 'venues')}
                          className="block w-full text-left text-lg p-4 text-neutral"
                        >
                          My Venues
                        </button>
                        <button
                          onClick={() => handleNavigation(`/profile/${userName}`, 'venueBookings')}
                          className="block w-full text-left text-lg p-4 text-neutral"
                        >
                          Venue Bookings
                        </button>
                      </>
                    )}
                  </>
                )}

                {!userName && (
                  <>
                    <button
                      onClick={() => handleNavigation('/register')}
                      className="block w-full text-left text-lg p-4 text-neutral"
                    >
                      Register
                    </button>
                    <button
                      onClick={() => handleNavigation('/login')}
                      className="block w-full text-left text-lg p-4 text-neutral"
                    >
                      Login
                    </button>
                  </>
                )}
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
