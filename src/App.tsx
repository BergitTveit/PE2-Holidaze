import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';
import { AuthWrapper } from './components/auth/AuthWrapper';

export default function App() {
  return (
    <BrowserRouter>
      <AuthWrapper>
        <AppRoutes />
      </AuthWrapper>
    </BrowserRouter>
  );
}
