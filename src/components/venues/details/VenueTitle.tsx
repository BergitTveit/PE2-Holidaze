interface VenueTitleProps {
  title: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const VenueTitle = ({ title, className = '', as = 'h2' }: VenueTitleProps) => {
  const Component = as;
  return (
    <div className="bg-neutral-light border-b-2 border-primary-dark">
      <Component className={`text-neutral px-4 text-lg ${className}`}>{title}</Component>
    </div>
  );
};
