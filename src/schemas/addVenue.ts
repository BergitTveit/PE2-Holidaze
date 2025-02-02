// import * as z from 'zod';

// export const addVenueSchema = z.object({
//   name: z.string().min(1, 'Required'),
//   description: z.string().min(1, 'Required'),
//   price: z.number().min(1, 'Price must be at least 1'),
//   maxGuests: z.number().min(1, 'Must have at least 1 maximum guest'),
// });

// export type CreateVenueDTO = z.infer<typeof addVenueSchema>;

import * as z from 'zod';
import { mediaSchema } from './shared/media';

// const locationSchema = z.object({
//   address: z.string().min(1, 'Address is required'),
//   city: z.string().min(1, 'City is required'),
//   zip: z.string().min(1, 'Zip code is required'),
//   country: z.string().min(1, 'Country is required'),
//   continent: z.string().min(1, 'Continent is required'),
//   lat: z.number().min(-90).max(90),
//   lng: z.number().min(-180).max(180),
// });

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
});

export type CreateVenueDTO = z.infer<typeof addVenueSchema>;
