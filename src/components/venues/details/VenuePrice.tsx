import { DollarSign } from 'lucide-react';

interface VenuePriceProps {
  price: number;
}

export const VenuePrice = ({ price }: VenuePriceProps) => (
  <div className="flex items-center text-gray-700">
    <DollarSign className="w-5 h-5 mr-2" />
    <p>{price} / night</p>
  </div>
);
