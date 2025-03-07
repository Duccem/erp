import SignUpForm from './components/form';
import { SignUpProvider } from './utils/provider';

const Page = () => {
  return (
    <SignUpProvider>
      <SignUpForm />;
    </SignUpProvider>
  );
};

export default Page;
