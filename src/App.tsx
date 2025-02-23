import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';
import { AuthWrapper } from './components/auth/AuthWrapper';
import useHotjar from './hooks/useHotjar';
import { ToastContainer } from './components/common/feedback/ToastContainer';

export default function App() {
  useHotjar(5313147);
  return (
    <BrowserRouter>
      <AuthWrapper>
        <AppRoutes />
        <ToastContainer />
      </AuthWrapper>
    </BrowserRouter>
  );
}
