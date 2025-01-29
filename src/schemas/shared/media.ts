import * as z from 'zod';

export const mediaSchema = z.object({
  url: z.string().url('Must be a valid URL'),
  alt: z.string().min(1, 'Alt text is required'),
});

export type Media = z.infer<typeof mediaSchema>;
