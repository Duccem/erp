import { z } from 'zod';

export const formSchema = z.object({
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
  code: z.string().min(6, { message: 'Code must be at least 6 characters' }),
});

export type FormValues = z.infer<typeof formSchema>;
