import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

import { useLocation } from 'react-router-dom';

const Layout = () => {
  const location = useLocation();
  const noFramePages = ['/register', '/login', '/venues/create'];
  const shouldHaveFrame = !noFramePages.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col bg-neutral">
      <Header />
      <main className="flex-1 flex justify-center px-4 sm:px-8">
        <div
          className={`w-full max-w-screen-lg ${shouldHaveFrame ? 'bg-white shadow-xl p-6' : ''}`}
        >
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
