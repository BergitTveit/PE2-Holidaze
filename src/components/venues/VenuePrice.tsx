interface VenuePriceProps {
  price: number;
}

const VenuePrice = ({ price }: VenuePriceProps) => <p>${price} / night</p>;

export default VenuePrice;
