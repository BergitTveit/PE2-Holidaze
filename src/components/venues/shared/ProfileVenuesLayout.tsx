import React from 'react';

interface ProfileVenuesLayoutProps {
  children: React.ReactNode;
  actionButtons?: React.ReactNode;
  className?: string;
}

export const ProfileVenuesLayout = ({
  children,
  actionButtons,
  className = '',
}: ProfileVenuesLayoutProps) => {
  return (
    <section className={`mt-8 mb-8 p-4 ${className}`}>
      <div className="mt-8 space-y-28">{children}</div>
      {actionButtons && <div className="flex justify-center py-24  ">{actionButtons}</div>}
    </section>
  );
};
