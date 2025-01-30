import * as z from 'zod';

export const mediaSchema = z.object({
  url: z
    .string()
    .trim()
    .url('Must be a valid URL')
    .regex(/^https?:\/\/.+\..+/, 'Must be a valid URL starting with http:// or https://')
    .max(300, 'URL cannot be longer than 300 characters'),
  alt: z.string().min(1, 'Alt text is required'),
});
export type Media = z.infer<typeof mediaSchema>;
