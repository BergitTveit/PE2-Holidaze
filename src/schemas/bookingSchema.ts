import * as z from 'zod';

export const bookingSchema = (maxGuests: number) =>z.object({
  dateFrom: z.string(),
  dateTo: z.string(),
  guests: z.number().int().min(1, 'Must have at least 1 guest').max(maxGuests, `Cannot exceed ${maxGuests} guests`),
  venueId: z.string(),
});

export type BookingFormData = z.infer<ReturnType<typeof bookingSchema>>;
