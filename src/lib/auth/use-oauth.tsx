import { authClient } from '@/lib/auth/client';

export const useOauth = (flow: 'sign-in' | 'sign-up') => {
  const onOauthPress = async (provider: 'google') => {
    try {
      await authClient.signIn.social({
        provider,
        callbackURL: `/`,
      });
    } catch (error) {
      alert('An error occurred. Please try again later.');
    }
  };
  return {
    onOauthPress,
  };
};
