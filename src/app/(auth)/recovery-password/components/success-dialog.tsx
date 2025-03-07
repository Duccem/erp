'use client';
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
import { useRouter } from 'next/navigation';
import { useRecoveryPasswordStore } from '../utils/provider';
import { CheckCircle2 } from 'lucide-react';

const SuccessDialog = () => {
  const router = useRouter();
  const { showSuccessModal, setShowSuccessModal } = useRecoveryPasswordStore((store) => store);
  return (
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
                router.push('/dashboard');
              }}
              size="lg"
            >
              Ir al inicio
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SuccessDialog;
