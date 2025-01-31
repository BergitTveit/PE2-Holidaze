import Profile from '../components/profile/Profile';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../hooks/useStore';

const ProfilePage = () => {
  const { profile } = useAppSelector((state) => state.profile);

  return (
    <div className="container mx-auto px-4">
      <Profile />
      {/* Add margin-top and ensure it's visible */}
      {profile?.venueManager && (
        <div className="mt-8 p-4 border-t border-gray-200">
          <h2 className="text-xl font-bold mb-4">Venue Management</h2>
          <Link
            to="/venues/create"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Create New Venue
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
