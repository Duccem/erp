'use client';
import { useVerify } from '@/hooks/auth/use-verify-code';
import { Button } from '@/lib/ui/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/lib/ui/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/lib/ui/components/ui/input-otp';
import { Loader2 } from 'lucide-react';
import { useSignUpStore } from '../../../providers/auth/sign-up';

const VerifyForm = () => {
  const { verification, setVerification, verifying } = useSignUpStore((state) => state);
  const { verify } = useVerify();
  return (
    <div className="grid w-full h-full grow items-center px-20">
      <Card className="border-none shadow-none w-full">
        <CardHeader>
          <CardTitle>Verify your email</CardTitle>
          <CardDescription>
            We have sent a verification code to your email. Please enter the code below.
          </CardDescription>
        </CardHeader>
        <CardContent className="my-5">
          <InputOTP
            className="w-full items-center justify-center rounded-none"
            maxLength={6}
            onChange={(value) => setVerification({ ...verification, code: value })}
          >
            <InputOTPGroup className="w-full justify-center rounded-none">
              <InputOTPSlot index={0} className="border rounded-none border-gray-300 mx-2 first:rounded-none" />
              <InputOTPSlot index={1} className="border rounded-none border-gray-300 mx-2" />
              <InputOTPSlot index={2} className="border rounded-none border-gray-300 mx-2" />
              <InputOTPSeparator />
              <InputOTPSlot index={3} className="border rounded-none border-gray-300 mx-2" />
              <InputOTPSlot index={4} className="border rounded-none border-gray-300 mx-2" />
              <InputOTPSlot index={5} className="border rounded-none border-gray-300 mx-2 last:rounded-none" />
            </InputOTPGroup>
          </InputOTP>
        </CardContent>
        <CardFooter>
          <div className="grid w-full">
            <Button onClick={verify} disabled={verifying} className="rounded-none">
              {verifying ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Verify'}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default VerifyForm;
