'use client';

import { authClient } from '@/lib/auth/client';
import { Button } from '@/lib/ui/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/lib/ui/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/lib/ui/components/ui/form';
import { Input } from '@/lib/ui/components/ui/input';
import { InputPassword } from '@/lib/ui/components/ui/input-password';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useResetPassword } from '../utils/hooks';
import { useRecoveryPasswordStore } from '../utils/provider';
import { formSchema, FormValues } from '../utils/schema';
import EmailForm from './email-form';
import SuccessDialog from './success-dialog';

const RecoveryPasswordForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      code: '',
    },
  });
  const { resetPassword } = useResetPassword();
  const { sended } = useRecoveryPasswordStore((store) => store);
  const { isSubmitting } = form.formState;
  const router = useRouter();
  const { data } = authClient.useSession();

  if (data) {
    router.push('/');
  }

  if (!sended) {
    return <EmailForm />;
  }
  return (
    <div className="grid w-full h-full grow items-center px-20">
      <Form {...form}>
        <form action="" className="w-full" onSubmit={form.handleSubmit(resetPassword)}>
          <Card className="border-none shadow-none w-full">
            <CardHeader>
              <CardTitle>Bienvenido a Helsa</CardTitle>
              <CardDescription>
                Helsa es una plataforma que te ayuda a mantener un seguimiento de tu salud. Comienza creando una cuenta.
              </CardDescription>
            </CardHeader>
            <CardContent className="">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="my-2">
                    <FormLabel className="text-sm  font-bold text-color-foreground-secondary ">
                      Tu nueva contraseña
                    </FormLabel>
                    <FormControl>
                      <InputPassword {...field} autoComplete="current-password"></InputPassword>
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem className="my-2">
                    <FormLabel className="text-sm  font-bold text-color-foreground-secondary ">
                      El código de recuperación
                    </FormLabel>
                    <FormControl>
                      <Input {...field}></Input>
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <div className="grid w-full gap-y-4">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Cambiar contraseña'}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </form>
      </Form>
      <SuccessDialog />
    </div>
  );
};

export default RecoveryPasswordForm;
