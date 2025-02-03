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
  name: z.string().min(1, 'Required'),
  description: z.string().min(1, 'Required'),
  media: z.array(mediaSchema).optional(),
  price: z.number().min(1, 'Price must be at least 1'),
  maxGuests: z.number().min(1, 'Must have at least 1 maximum guest'),
  meta: metaSchema,
  location: locationSchema.optional(),
});

export type CreateVenueDTO = z.infer<typeof addVenueSchema>;
