interface VenueDescriptionProps {
  description: string;
}

export const VenueDescription = ({ description }: VenueDescriptionProps) => {
  if (!description) {
    return <p>No description available</p>;
  }

  return <p className="mt-4">{description}</p>;
};
