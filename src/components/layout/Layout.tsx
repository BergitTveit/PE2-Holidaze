import { Outlet, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Header } from './Header';
import { Footer } from './Footer';

const Layout = () => {
  const location = useLocation();
  const noFramePages = ['/register', '/login'];
  const shouldHaveFrame = !noFramePages.includes(location.pathname);

  return (
    <>
      <Helmet>
        <title>Holidaze - Book Your Perfect Stay</title>
        <meta
          name="description"
          content="Find and book accommodations for your next holiday with Holidaze"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#AD974F" />
      </Helmet>
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
    </>
  );
};

export default Layout;
