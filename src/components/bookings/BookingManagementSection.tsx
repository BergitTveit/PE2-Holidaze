import { IVenue } from '../../types/venue';
import VenueBookingCard from './VenueBookingCard';

interface BookingManagementSectionProps {
  venues: IVenue[];
}

const BookingManagementSection = ({ venues }: BookingManagementSectionProps) => {
  return (
    <>
      {venues.map((venue) => (
        <section key={venue.id} className="mt-8 p-4 border-t border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Bookings for {venue.name}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {venue.bookings.map((booking) => (
              <VenueBookingCard key={booking.id} booking={booking} venue={venue} />
            ))}
          </div>
        </section>
      ))}
    </>
  );
};

export default BookingManagementSection;
