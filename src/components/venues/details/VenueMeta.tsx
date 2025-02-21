import { Wifi, Car, Coffee, Dog } from 'lucide-react';
import { IMeta } from '../../../types/venue';

interface VenueMetaProps {
  meta: IMeta;
  variant?: 'card' | 'details';
}

export const VenueMeta = ({ meta, variant = 'card' }: VenueMetaProps) => {
  if (variant === 'card') {
    return (
      <div className="flex items-center gap-6 py-3 px-4 bg-neutral flex-grow">
        {' '}
        {meta.wifi && <Wifi className="w-5 h-5 text-white" />}
        {meta.parking && <Car className="w-5 h-5 text-white" />}
        {meta.breakfast && <Coffee className="w-5 h-5 text-white" />}
        {meta.pets && <Dog className="w-5 h-5 text-white" />}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-6 mt-4">
      <div className={`flex items-center gap-2 ${meta.wifi ? 'text-brass' : 'text-gray-300'}`}>
        <Wifi className="w-6 h-6" />
        <span className="text-sm font-medium">{meta.wifi ? 'Wi-Fi Available' : 'No Wi-Fi'}</span>
      </div>

      <div className={`flex items-center gap-2 ${meta.parking ? 'text-brass' : 'text-gray-300'}`}>
        <Car className="w-6 h-6" />
        <span className="text-sm font-medium">
          {meta.parking ? 'Parking Available' : 'No Parking'}
        </span>
      </div>

      <div className={`flex items-center gap-2 ${meta.breakfast ? 'text-brass' : 'text-gray-300'}`}>
        <Coffee className="w-6 h-6" />
        <span className="text-sm font-medium">
          {meta.breakfast ? 'Breakfast Included' : 'No Breakfast'}
        </span>
      </div>

      <div className={`flex items-center gap-2 ${meta.pets ? 'text-brass' : 'text-gray-300'}`}>
        <Dog className="w-6 h-6" />
        <span className="text-sm font-medium">
          {meta.pets ? 'Pet Friendly' : 'No Pets Allowed'}
        </span>
      </div>
    </div>
  );
};
