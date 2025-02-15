import { useNavigate } from 'react-router-dom';
import Button from '../common/Buttons';

const LoginPrompt = ({ selectedDates }: { selectedDates: boolean }) => {
  const navigate = useNavigate();

  return (
    <div className="mt-4 p-6 border rounded-lg bg-white shadow-sm">
      <div className="text-center space-y-4">
        {selectedDates ? (
          <>
            <h3 className="text-lg">Ready to book your stay?</h3>
            <p>Sign in or create an account to complete your booking</p>
            <div className="space-x-4">
              <Button onClick={() => navigate('/login')}>Sign In</Button>
              <Button onClick={() => navigate('/register')}>Create Account</Button>
            </div>
          </>
        ) : (
          <p>Select your dates to get started</p>
        )}
      </div>
    </div>
  );
};

export default LoginPrompt;
