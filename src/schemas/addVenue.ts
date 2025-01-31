import * as z from 'zod';
import { mediaSchema } from './shared/media';

export const addVenueSchema = z.object({
  name: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .regex(/^[a-zA-Z0-9\s]+$/, {
      message: 'Venue title can only contain letters, numbers, and spaces.',
    }),
  description: z
    .string()
    .min(5, 'Venue description must be at least 5 characters')
    .regex(/^[a-zA-Z0-9\s.,!?-]+$/, {
      message: 'Venue description can only contain letters, numbers, and basic punctuation.',
    }),
  price: z.number().min(1, 'Price must be at least 1'),
  maxGuests: z.number().min(1, 'Must have at least 1 maximum guest'),
  media: z.array(mediaSchema.optional()),
  meta: z
    .object({
      wifi: z.boolean().optional().default(false),
      parking: z.boolean().optional().default(false),
      breakfast: z.boolean().optional().default(false),
      pets: z.boolean().optional().default(false),
    })
    .optional(),
  location: z
    .object({
      address: z.string().optional(),
      city: z.string().optional(),
      zip: z.string().optional(),
      country: z.string().optional(),
      continent: z.string().optional(),
      lat: z.number().optional(),
      lng: z.number().optional(),
    })
    .optional(),
});

export type CreateVenueDTO = z.infer<typeof addVenueSchema>;
