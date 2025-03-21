import { authClient } from '@/lib/auth/client';
import { useSignUpStore } from '@/providers/auth/sign-up';
import { toast } from 'sonner';

export const useVerify = () => {
  const { setVerification, verification, signEmail } = useSignUpStore((state) => state);
  const verify = async () => {
    try {
      const { error } = await authClient.emailOtp.verifyEmail({
        email: signEmail,
        otp: verification.code,
      });

      if (!error) {
        setVerification({ ...verification, state: 'success' });
      } else {
        console.error(error.message);
        toast.error('An error occurred. Please try again later.');
      }
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
      toast.error('An error occurred. Please try again later.');
    }
  };

  return {
    verify,
  };
};
