import { IBooking } from '../../types/booking';
import BookingGrid from './BookingGrid';

interface BookingManagementSectionProps {
  bookings: IBooking[];
  isOwner: boolean;
  title: string; 
}

const BookingManagementSection = ({ bookings, title, isOwner }: BookingManagementSectionProps) => {
  return (
    <section className="mt-8 p-4 border-t border-gray-200">
      <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-bold">{title}</h2>
      </div>
      <BookingGrid bookings={bookings} isOwner={isOwner} />
    </section>
  );
};

export default BookingManagementSection;