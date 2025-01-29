import * as z from 'zod';

export const loginSchema = z.object({
  email: z.string().refine((email) => email.endsWith('@stud.noroff.no'), {
    message: 'Email must be a @stud.noroff.no address',
  }),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(3, 'Name must be at least 3 characters')
      .regex(/^[a-zA-Z0-9_]+$/, {
        message: 'Name can only contain letters, numbers, and underscores (_)',
      }),
    email: z.string().refine((email) => email.endsWith('@stud.noroff.no'), {
      message: 'Email must be a @stud.noroff.no address',
    }),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
    venueManager: z.boolean().default(false),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
