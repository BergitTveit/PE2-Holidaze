interface VenueTitleProps {
  title: string;
}

const VenueTitle = ({ title }: VenueTitleProps) => <h3 className="text-xl">{title}</h3>;

export default VenueTitle;
