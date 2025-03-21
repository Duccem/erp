'use client';

import { Button } from '@/lib/ui/components/ui/button';
import Link from 'next/link';

const CreateCheckout = () => {
  return (
    <Link href={'/api/payment/checkout/free'}>
      <Button>Pagar</Button>
    </Link>
  );
};

export default CreateCheckout;
