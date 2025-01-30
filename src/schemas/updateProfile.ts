import * as z from 'zod';
import { mediaSchema } from './shared/media';

export const updateProfileSchema = z.object({
  bio: z.string().optional(),
  avatar: mediaSchema.optional(),
  banner: mediaSchema.optional(),
  venueManager: z.boolean().optional(),
});

export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;
