import SignUpForm from '@/lib/auth/sign-up/components/form';
import { SignUpProvider } from '@/lib/auth/sign-up/utils/provider';

const Page = () => {
  return (
    <SignUpProvider>
      <SignUpForm />;
    </SignUpProvider>
  );
};

export default Page;
