import { authClient } from '@/lib/auth/client';
import { useRecoveryPasswordStore } from '@/providers/auth/recovery-password';
import { toast } from 'sonner';

import { z } from 'zod';

export const formSchema = z.object({
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
  code: z.string().min(6, { message: 'Code must be at least 6 characters' }),
});

export type FormValues = z.infer<typeof formSchema>;

export const useResetPassword = () => {
  const { email, setShowSuccessModal } = useRecoveryPasswordStore((store) => store);
  const resetPassword = async (data: FormValues) => {
    try {
      await authClient.emailOtp.resetPassword({ email, password: data.password, otp: data.code });
      setShowSuccessModal(true);
    } catch (error) {
      toast.error('Error al actualizar la contraseña');
    }
  };

  return {
    resetPassword,
  };
};
