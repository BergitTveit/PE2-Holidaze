import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';
import { AuthWrapper } from './components/auth/AuthWrapper';
import useHotjar from './hooks/useHotjar';
import { ToastContainer } from './components/common/feedback/ToastContainer';
import { HelmetProvider } from 'react-helmet-async';

export default function App() {
  useHotjar(5313147);
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AuthWrapper>
          <AppRoutes />
          <ToastContainer />
        </AuthWrapper>
      </BrowserRouter>
    </HelmetProvider>
  );
}
