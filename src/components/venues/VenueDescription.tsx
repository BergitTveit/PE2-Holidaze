interface VenueDescriptionProps {
  description: string;
}

const VenueDescription = ({ description }: VenueDescriptionProps) => {
  if (!description) {
    return <p>No description available</p>;
  }

  return <p className="mt-4">{description}</p>;
};

export default VenueDescription;
