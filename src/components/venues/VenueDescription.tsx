interface VenueDescriptionProps {
  description: string;
}

const VenueDescription = ({ description }: VenueDescriptionProps) => <p>{description}</p>;

export default VenueDescription;
