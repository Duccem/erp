import { z } from 'zod';

export const formSchema = z
  .object({
    email: z.string().min(3, { message: 'Invalid email' }).email({ message: 'Invalid email' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
    confirmPassword: z.string().min(8, { message: 'Password must be at least 8 characters' }),
    name: z.string().min(3, { message: 'Name must be at least 3 characters' }),
  })
  .superRefine((data) => {
    if (data.password !== data.confirmPassword) {
      return { confirmPassword: 'Passwords do not match' };
    }
    return {};
  });

export type FormValues = z.infer<typeof formSchema>;
