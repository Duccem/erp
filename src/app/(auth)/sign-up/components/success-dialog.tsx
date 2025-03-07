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
import { CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSignUpStore } from '../utils/provider';

const SuccessDialog = () => {
  const { showSuccessModal, setShowSuccessModal } = useSignUpStore((state) => state);
  const router = useRouter();
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
  );
};

export default SuccessDialog;
