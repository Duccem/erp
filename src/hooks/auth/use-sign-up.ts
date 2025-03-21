import { authClient } from '@/lib/auth/client';
import { useSignUpStore } from '@/providers/auth/sign-up';
import { toast } from 'sonner';

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

export const useSignUp = () => {
  const { setVerification, verification, setSignEmail } = useSignUpStore((state) => state);
  const signUp = async (values: FormValues) => {
    try {
      const res = await authClient.signUp.email({
        email: values.email,
        password: values.password,
        name: values.name,
        image: undefined,
        role: 'ADMIN',
      });
      toast.error('A un solo paso de poder iniciar');
      setSignEmail(values.email);
      setVerification({ ...verification, state: 'pending' });
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
      toast.error('An error occurred. Please try again later.');
    }
  };

  return {
    signUp,
  };
};
