'use client';
import Google from '@/lib/ui/components/icons/google';
import { Button } from '@/lib/ui/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/lib/ui/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/lib/ui/components/ui/form';
import { Input } from '@/lib/ui/components/ui/input';
import { InputPassword } from '@/lib/ui/components/ui/input-password';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useOauth } from '../../use-oauth';
import { useSubmit } from '../utils/hooks';
import { useSignUpStore } from '../utils/provider';
import { formSchema, FormValues } from '../utils/schema';
import SuccessDialog from './success-dialog';
import VerifyForm from './verify-form';

const SignUpForm = () => {
  const { verification } = useSignUpStore((state) => state);
  const { submit } = useSubmit();
  const { onOauthPress } = useOauth('sign-up');
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
    },
    mode: 'all',
  });
  const { isSubmitting } = form.formState;

  const router = useRouter();

  if (verification.state === 'pending') {
    return <VerifyForm />;
  }

  return (
    <div className="grid w-full h-full grow items-center px-20">
      <Form {...form}>
        <form action="" className="w-full" onSubmit={form.handleSubmit(submit)}>
          <Card className="border-none shadow-none w-full">
            <CardHeader>
              <CardTitle>
                <h1 className="text-2xl">Crea tu cuenta</h1>
              </CardTitle>
            </CardHeader>
            <CardContent className="">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="my-2 flex-1">
                    <FormLabel className="text-sm">Nombre</FormLabel>
                    <FormControl>
                      <Input {...field} className=""></Input>
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="my-2">
                    <FormLabel className="text-sm">Email</FormLabel>
                    <FormControl>
                      <Input {...field} className=""></Input>
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="my-2">
                    <FormLabel className="text-sm">Contraseña</FormLabel>
                    <FormControl>
                      <InputPassword {...field} autoComplete="current-password" className=""></InputPassword>
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="my-2">
                    <FormLabel className="text-sm">Confirma tu contraseña</FormLabel>
                    <FormControl>
                      <InputPassword {...field} autoComplete="current-password" className=""></InputPassword>
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <div className="grid w-full gap-y-4">
                <Button type="submit" className="cursor-pointer" disabled={isSubmitting}>
                  {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Crear cuenta'}
                </Button>
                <p className="flex items-center gap-x-3 text-sm text-muted-foreground before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border my-3">
                  or
                </p>
                <div className="grid grid-cols-1 gap-x-4 mb-3">
                  <Button
                    variant="outline"
                    type="button"
                    className="cursor-pointer"
                    onClick={() => onOauthPress('google')}
                  >
                    <Google className="mr-2 size-4" />
                    Google
                  </Button>
                </div>
                <Button variant="link" size="sm" asChild>
                  <Link href="/sign-in">¿Ya tienes una cuenta? Inicia sesión</Link>
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

export default SignUpForm;
