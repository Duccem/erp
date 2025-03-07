'use client';

import { authClient } from '@/lib/auth/client';
import Google from '@/lib/ui/components/icons/google';
import { Button } from '@/lib/ui/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/lib/ui/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/lib/ui/components/ui/form';
import { Input } from '@/lib/ui/components/ui/input';
import { InputPassword } from '@/lib/ui/components/ui/input-password';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
  email: z.string().min(3, { message: 'Invalid email' }).email({ message: 'Invalid email' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
});

type FormValues = z.infer<typeof formSchema>;

const SignInForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { isSubmitting } = form.formState;
  const router = useRouter();
  const onSubmit = async (data: FormValues) => {
    const { error } = await authClient.signIn.email({
      email: data.email,
      password: data.password,
    });
    if (error) {
      return toast.error(error.message);
    }
    return router.push('/dashboard');
  };
  const onOauthPress = async (strategy: 'google') => {
    try {
      await authClient.signIn.social({ provider: strategy, callbackURL: '/dashboard' });
    } catch (error) {
      toast.error('An error occurred while trying to sign in with Google');
    }
  };
  return (
    <div className="grid w-full h-full grow items-center px-20">
      <Form {...form}>
        <form action="" className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="border-none shadow-none w-full">
            <CardHeader>
              <CardTitle>
                <h1 className="text-2xl font-bold">Inicia sesión</h1>
              </CardTitle>
              <CardDescription>El ERP más completo para tu negocio</CardDescription>
            </CardHeader>
            <CardContent className="">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="my-2">
                    <FormLabel className="text-sm  font-bold ">Email</FormLabel>
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
                    <FormLabel className="text-sm  font-bold">Contraseña</FormLabel>
                    <FormControl>
                      <InputPassword {...field} autoComplete="current-password" className=""></InputPassword>
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <div className="grid w-full">
                <Button type="submit" disabled={isSubmitting} className="cursor-pointer">
                  {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Iniciar sesión'}
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
                <Button variant="link" size="sm">
                  <Link href="/sign-up">¿No tienes una cuenta? Crea una</Link>
                </Button>
                <Button variant="link" size="sm">
                  <Link href="/recovery-password">¿Olvidaste tu contraseña? Recupérala aquí</Link>
                </Button>
              </div>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default SignInForm;
