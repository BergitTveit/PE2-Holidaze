export const Footer = () => {
  const quickLinks = [
    { to: '/about', text: 'About Us' },
    { to: '/venues', text: 'Venues' },
    { to: '/support', text: 'Support' },
  ];

  return (
    <footer className="bg-neutral-900 text-white">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-bold mb-4">Holidaze</h3>
          <p className="text-neutral-400">Find your perfect holiday accommodation</p>
        </div>

        <div className="border-t border-neutral-800 mt-8 pt-4 text-neutral-400">
          <p>© {new Date().getFullYear()} Holidaze. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
