interface VenueTitleProps {
  title: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const VenueTitle = ({ title, className = '', as = 'h2' }: VenueTitleProps) => {
  const Component = as;
  return <Component className={className}>{title}</Component>;
};

export default VenueTitle;
