import { IMeta } from '../../types/venue'; 

interface VenueMetaProps {
  meta: IMeta; 
}

const VenueMeta = ({ meta }: VenueMetaProps) => (
  <div className="flex gap-4 mt-2">
    {meta.wifi && <span className="text-sm">Wi-Fi Available</span>}
    {meta.parking && <span className="text-sm">Parking Available</span>}
    {meta.breakfast && <span className="text-sm">Breakfast Included</span>}
    {meta.pets && <span className="text-sm">Pets Allowed</span>}
  </div>
);

export default VenueMeta;
