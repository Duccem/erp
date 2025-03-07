import { authClient } from '@/lib/auth/client';
import { toast } from 'sonner';
import { useSignUpStore } from './provider';
import { FormValues } from './schema';

export const useSubmit = () => {
  const { setVerification, verification, setSignEmail } = useSignUpStore((state) => state);
  const submit = async (values: FormValues) => {
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
    submit,
  };
};

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
