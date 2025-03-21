import { authClient } from '@/lib/auth/client';
import { useRecoveryPasswordStore } from '@/providers/auth/recovery-password';
import { useState } from 'react';
import { toast } from 'sonner';

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
