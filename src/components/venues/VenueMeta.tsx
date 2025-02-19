import { Wifi, Car, Coffee, Dog } from 'lucide-react';
import { IMeta } from '../../types/venue';

interface VenueMetaProps {
  meta: IMeta;
}

export const VenueMeta = ({ meta }: VenueMetaProps) => (
  <div className="flex flex-wrap gap-4 mt-2">
    {meta.wifi && (
      <div className="flex items-center text-gray-700">
        <Wifi className="w-4 h-4 mr-1" />
        <span className="text-sm">Wi-Fi</span>
      </div>
    )}
    {meta.parking && (
      <div className="flex items-center text-gray-700">
        <Car className="w-4 h-4 mr-1" />
        <span className="text-sm">Parking</span>
      </div>
    )}
    {meta.breakfast && (
      <div className="flex items-center text-gray-700">
        <Coffee className="w-4 h-4 mr-1" />
        <span className="text-sm">Breakfast</span>
      </div>
    )}
    {meta.pets && (
      <div className="flex items-center text-gray-700">
        <Dog className="w-4 h-4 mr-1" />
        <span className="text-sm">Pets</span>
      </div>
    )}
  </div>
);
