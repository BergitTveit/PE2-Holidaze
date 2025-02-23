import React from 'react';

interface ProfileVenuesLayoutProps {
  children: React.ReactNode;
  actionButtons?: React.ReactNode;
  className?: string;
}

/**
 * Layout component for displaying profile venues with optional action buttons.
 *
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - The main content inside the layout.
 * @param {React.ReactNode} [props.actionButtons] - Optional action buttons to be displayed at the bottom.
 * @param {string} [props.className] - Additional CSS classes for styling the section.
 *
 * @returns {JSX.Element} - The rendered ProfileVenuesLayout component.
 */
export const ProfileVenuesLayout = ({
  children,
  actionButtons,
  className = '',
}: ProfileVenuesLayoutProps): JSX.Element => {
  return (
    <section className={`mt-8 mb-8 p-4 ${className}`}>
      <div className="mt-8 space-y-28">{children}</div>
      {actionButtons && <div className="flex justify-center py-24">{actionButtons}</div>}
    </section>
  );
};
