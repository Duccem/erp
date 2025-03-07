'use client';
import { authClient } from '@/lib/auth/client';
import Google from '@/lib/ui/components/icons/google';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/lib/ui/components/ui/alert-dialog';
import { Button } from '@/lib/ui/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/lib/ui/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/lib/ui/components/ui/form';
import { Input } from '@/lib/ui/components/ui/input';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/lib/ui/components/ui/input-otp';
import { InputPassword } from '@/lib/ui/components/ui/input-password';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z
  .object({
    email: z.string().min(3, { message: 'Invalid email' }).email({ message: 'Invalid email' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
    confirmPassword: z.string().min(8, { message: 'Password must be at least 8 characters' }),
    name: z.string().min(3, { message: 'Name must be at least 3 characters' }),
  })
  .superRefine((data) => {
    if (data.password !== data.confirmPassword) {
      return { confirmPassword: 'Passwords do not match' };
    }
    return {};
  });

type FormValues = z.infer<typeof formSchema>;
const SignUpForm = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verification, setVerification] = useState({
    state: '',
    code: '',
    error: '',
  });
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
  const onSubmit = async (data: FormValues) => {
    try {
      const res = await authClient.signUp.email({
        email: data.email,
        password: data.password,
        name: data.name,
        image: undefined,
        role: 'ADMIN',
      });
      console.log(res);
      toast.error('A un solo paso de poder iniciar');
      setVerification({ ...verification, state: 'pending' });
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
      toast.error('An error occurred. Please try again later.');
    }
  };

  const handleVerification = async () => {
    try {
      setVerifying(true);
      const user = await authClient.emailOtp.verifyEmail({
        email: form.getValues().email,
        otp: verification.code,
      });

      if (!user.error) {
        setVerification({ ...verification, state: 'success' });
        setShowSuccessModal(true);
      } else {
        console.error(user.error.message);
      }
      setVerifying(false);
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
      toast.error('An error occurred. Please try again later.');
    }
  };

  const onOauthPress = async (strategy: 'google' | 'facebook') => {
    try {
      await authClient.signIn.social({
        provider: strategy,
        callbackURL: `${window.location.origin}/select-role`,
      });
    } catch (error) {
      alert('An error occurred. Please try again later.');
    }
  };

  if (verification.state === 'pending') {
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
              <Button onClick={handleVerification} disabled={verifying} className="rounded-none">
                {verifying ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Verify'}
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid w-full h-full grow items-center px-20">
      <Form {...form}>
        <form action="" className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
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
      <AlertDialog open={showSuccessModal}>
        <AlertDialogContent>
          <CheckCircle2 className="size-24 text-green-500" />
          <AlertDialogHeader className="my-0">
            <AlertDialogTitle className="text-center text-2xl">Verificado!</AlertDialogTitle>
            <AlertDialogDescription className="text-center text-lg">
              Has verificado tu correo electrónico exitosamente
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="flex w-full sm:justify-center items-center">
            <AlertDialogAction asChild>
              <Button
                onClick={() => {
                  setShowSuccessModal(false);
                  router.push(`/start-organization`);
                }}
                size="lg"
              >
                Continuar
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SignUpForm;
