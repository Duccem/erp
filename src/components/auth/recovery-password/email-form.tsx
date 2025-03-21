'use client';

import { useSendVerificationCode } from '@/hooks/auth/use-send-verification-code';
import { Button } from '@/lib/ui/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/lib/ui/components/ui/card';
import { Input } from '@/lib/ui/components/ui/input';
import { useRecoveryPasswordStore } from '@/providers/auth/recovery-password';
import { Loader2 } from 'lucide-react';

const EmailForm = () => {
  const { email, setEmail } = useRecoveryPasswordStore((store) => store);
  const { isSubmitting, sendVerificationCode } = useSendVerificationCode();
  return (
    <div className="grid w-full h-full grow items-center px-20">
      <Card className="border-none shadow-none w-full">
        <CardHeader>
          <CardTitle>Recuperación de contraseña</CardTitle>
          <CardDescription>Ingresa tu email y te enviaremos un código de verificación</CardDescription>
        </CardHeader>
        <CardContent className="">
          <Input value={email} onChange={(event) => setEmail(event.target.value)}></Input>
        </CardContent>
        <CardFooter>
          <div className="grid w-full gap-y-4">
            <Button type="submit" disabled={isSubmitting} onClick={sendVerificationCode}>
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Enviar código de verificación'}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EmailForm;
