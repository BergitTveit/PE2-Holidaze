interface VenuePriceProps {
  price: number;
}

export const VenuePrice = ({ price }: VenuePriceProps) => (
  <div className="flex items-center justify-center  bg-primary h-[45px] w-[103px]">
    <span className="text-neutral font-medium">£{price}</span>
  </div>
);
