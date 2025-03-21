import SignUpForm from '@/components/auth/sign-up/form';
import { SignUpProvider } from '@/providers/auth/sign-up';

const Page = () => {
  return (
    <SignUpProvider>
      <SignUpForm />;
    </SignUpProvider>
  );
};

export default Page;
