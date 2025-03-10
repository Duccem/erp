import { authClient } from '@/lib/auth/client';
import { useState } from 'react';
import { toast } from 'sonner';
import { useRecoveryPasswordStore } from './provider';
import { FormValues } from './schema';

export const useSendVerificationCode = () => {
  const { email, setSended } = useRecoveryPasswordStore((store) => store);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sendVerificationCode = async () => {
    try {
      setIsSubmitting(true);
      await authClient.emailOtp.sendVerificationOtp({ email, type: 'forget-password' });
      setSended(true);
    } catch (error) {
      toast.error('Error al enviar el código de verificación');
    } finally {
      setIsSubmitting(false);
    }
  };
  return {
    sendVerificationCode,
    isSubmitting,
  };
};

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
