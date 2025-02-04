import * as z from 'zod';
import { mediaSchema } from './shared/media';

const locationSchema = z.object({
  address: z.string().optional(),
  city: z.string().optional(),
  zip: z.string().optional(),
  country: z.string().optional(),
});

const metaSchema = z.object({
  wifi: z.boolean(),
  parking: z.boolean(),
  breakfast: z.boolean(),
  pets: z.boolean(),
});

export const addVenueSchema = z.object({
  name: z.string().min(1, 'Required, your venue needs a title'),
  description: z.string().min(1, 'Required: Please include a description of your venue'),
  media: z.array(mediaSchema).optional(),
  price: z
    .number()
    .min(1, 'Price must be at least 1')
    .max(10000, 'Price cannot be more than 10.000'),
  maxGuests: z
    .number()
    .min(1, 'Must have at least 1 maximum guest')
    .max(100, 'Venues have a limit on a 100 guests.'),
  meta: metaSchema,
  location: locationSchema.optional(),
});

export type CreateVenueDTO = z.infer<typeof addVenueSchema>;
