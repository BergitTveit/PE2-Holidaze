import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { IBooking } from '../../types/booking';
import { useState } from 'react';
import { isWithinInterval } from 'date-fns';
import clsx from 'clsx';

interface VenueCalendarProps {
  bookings?: IBooking[];
  className?: string;
}

const VenueCalendar = ({ bookings = [] }: VenueCalendarProps) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const bookedDates = bookings.flatMap(({ dateFrom, dateTo }) => {
    const start = new Date(dateFrom);
    const end = new Date(dateTo);
    const dates = [];
    for (let d = new Date(start); d.getTime() <= end.getTime(); d.setDate(d.getDate() + 1)) {
      dates.push(new Date(d));
    }
    return dates;
  });

  const bookedDateRanges = bookings.map((booking) => ({
    start: new Date(booking.dateFrom),
    end: new Date(booking.dateTo),
  }));

  const isDateBooked = (date: Date) => {
    return bookedDateRanges.some((range) =>
      isWithinInterval(date, { start: range.start, end: range.end })
    );
  };

  const dayClassName = (date: Date) =>
    clsx('p-2 transition-colors duration-200 ease-in-out', {
      'bg-gray-200 text-gray-500 cursor-not-allowed': isDateBooked(date),
      'hover:bg-gray-100 text-gray-700': !isDateBooked(date),
    });

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    if (start && end) {
      const isRangeAvailable = !bookedDateRanges.some(
        (range) =>
          isWithinInterval(start, { start: range.start, end: range.end }) ||
          isWithinInterval(end, { start: range.start, end: range.end }) ||
          (start <= range.start && end >= range.end)
      );
      if (!isRangeAvailable) {
        setStartDate(null);
        setEndDate(null);
      }
    }
    setStartDate(start);
    setEndDate(end);
  };
  return (
    <div className={clsx('p-4 bg-white shadow-md ', dayClassName)}>
      <DatePicker
        inline
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        minDate={new Date()}
        dayClassName={dayClassName}
        excludeDates={bookedDates}
        onChange={handleDateChange}
        onClickOutside={() => {
          setStartDate(null);
          setEndDate(null);
        }}
      />
    </div>
  );
};
export default VenueCalendar;
