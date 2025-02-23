export const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-white py-8">
      <div className="max-w-screen-lg mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold mb-4">Holidaze</h3>
            <p className="text-neutral-400">Find your perfect holiday accommodation</p>
          </div>
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="text-neutral-400 space-y-2">
              <li>Find Venues</li>
              <li>List Your Property</li>
              <li>Support</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Contact</h3>
            <ul className="text-neutral-400 space-y-2">
              <li>contact@holidaze.com</li>
              <li>+47 123 45 678</li>
              <li>Bergen, Norway</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-neutral-800 mt-8 pt-4 text-neutral-400">
          <p>© {new Date().getFullYear()} Holidaze. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
