import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { isWithinInterval, startOfDay, endOfDay } from 'date-fns';
import { useAppSelector } from '../../hooks/useStore';
import { useCreateBookingMutation } from '../../services/bookingsApi';
import { useApiError } from '../../hooks/useApiError';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { Loader } from 'lucide-react';
import { IVenue } from '../../types/venue';
import { BookingFormData, bookingSchema } from '../../schemas/bookingSchema';
import LoginPrompt from '../auth/LoginPrompt';
import NumberInput from '../common/NumberInput';
import Button from '../common/Buttons';
import BookingTotalPrice from './BookingTotalPrice';

interface BookingFormProps {
  venue: IVenue;
}

const BookingForm = ({ venue }: BookingFormProps) => {
  const navigate = useNavigate();
  const { accessToken, userName } = useAppSelector((state) => state.auth);
  const [createBooking] = useCreateBookingMutation();
  const { error, handleError, clearError } = useApiError();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      venueId: venue.id,
      guests: 1,
    },
  });

  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [startDate, endDate] = dateRange;

  const bookedDates = useMemo(
    () =>
      venue.bookings.flatMap(({ dateFrom, dateTo }) => {
        const start = new Date(dateFrom);
        const end = new Date(dateTo);
        const dates = [];
        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
          dates.push(new Date(d));
        }
        return dates;
      }),
    [venue.bookings]
  );

  const isDateRangeAvailable = useCallback(
    (start: Date, end: Date) => {
      return !venue.bookings.some((booking) => {
        const bookingStart = new Date(booking.dateFrom);
        const bookingEnd = new Date(booking.dateTo);
        return (
          isWithinInterval(start, { start: bookingStart, end: bookingEnd }) ||
          isWithinInterval(end, { start: bookingStart, end: bookingEnd }) ||
          (start <= bookingStart && end >= bookingEnd)
        );
      });
    },
    [venue.bookings]
  );

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setDateRange(dates);

    if (start && end) {
      if (!isDateRangeAvailable(start, end)) {
        clearError();
        handleError(
          {
            status: 400,
            data: { message: 'Selected dates are not available' },
          } as FetchBaseQueryError,
          'Date Selection'
        );
        setDateRange([null, null]);
        setValue('dateFrom', '');
        setValue('dateTo', '');
        return;
      }

      setValue('dateFrom', startOfDay(start).toISOString());
      setValue('dateTo', endOfDay(end).toISOString());
      clearError();
    }
  };

  const handleFormReset = useCallback(() => {
    reset();
    setDateRange([null, null]);
    clearError();
  }, [reset, clearError]);

  const onSubmit = async (data: BookingFormData) => {
    if (!accessToken) {
      handleError(
        {
          status: 401,
          data: { message: 'Please sign in to make a booking' },
        } as FetchBaseQueryError,
        'Authentication'
      );
      return;
    }

    try {
      await createBooking(data).unwrap();
      handleFormReset();
      navigate(`/profile/${userName}`);
    } catch (err) {
      handleError(err as FetchBaseQueryError | SerializedError, 'Create Booking');
    }
  };

  return (
    <div className="space-y-6 border p-5" role="form" aria-label="Booking form">
      <h2 className="text-2xl font-medium">Book Your Stay at {venue.name}</h2>

      {error.message && (
        <div
          className="bg-red-100 text-red-700 border border-red-400 px-4 py-3 rounded"
          role="alert"
          aria-live="polite"
        >
          {error.message}
        </div>
      )}

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Select Dates</h3>
        <DatePicker
          inline
          selectsRange
          startDate={startDate}
          endDate={endDate}
          onChange={handleDateChange}
          minDate={new Date()}
          excludeDates={bookedDates}
          className="w-full"
          aria-label="Select date range"
        />
      </div>

      {accessToken && userName ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
          <div className="space-y-4">
            <NumberInput
              label="Number of Guests"
              name="guests"
              register={register}
              error={errors.guests?.message}
              aria-label="Number of guests"
            />
            <p className="text-sm text-gray-600">Maximum {venue.maxGuests} guests</p>
          </div>

          {startDate && endDate && (
            <div className="space-y-4 border-t pt-4">
              <div className="text-sm">
                <span>Selected dates: </span>
                <span>
                  {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
                </span>
              </div>

              <BookingTotalPrice
                booking={{
                  dateFrom: startDate.toISOString(),
                  dateTo: endDate.toISOString(),
                  venue,
                }}
              />

              <div className="flex gap-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-busy={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader className="animate-spin" size={16} aria-hidden="true" />
                      <span>Processing</span>
                    </div>
                  ) : (
                    'Complete Booking'
                  )}
                </Button>

                <Button
                  type="button"
                  onClick={handleFormReset}
                  className="px-4 py-2 border rounded-md hover:bg-gray-50"
                  disabled={isSubmitting}
                >
                  Reset
                </Button>
              </div>
            </div>
          )}
        </form>
      ) : (
        <LoginPrompt selectedDates={!!(startDate && endDate)} />
      )}
    </div>
  );
};

export default BookingForm;
