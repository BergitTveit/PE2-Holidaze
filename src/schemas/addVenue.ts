import * as z from 'zod';

export const addVenueSchema = z.object({
  name: z.string().min(1, 'Required'),
  description: z.string().min(1, 'Required'),
  price: z.number().min(1, 'Price must be at least 1'),
  maxGuests: z.number().min(1, 'Must have at least 1 maximum guest'),
});

export type CreateVenueDTO = z.infer<typeof addVenueSchema>;
