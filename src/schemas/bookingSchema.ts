import * as z from 'zod';

export const bookingSchema = z.object({
  dateFrom: z.string(),
  dateTo: z.string(),
  guests: z.number().int().min(1, 'Must have at least 1 guest'),
  venueId: z.string(),
});

export type BookingFormData = z.infer<typeof bookingSchema>;
