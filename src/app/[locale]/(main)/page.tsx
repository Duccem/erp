import CreateCheckout from '@/components/shared/create-checkout';
import { auth } from '@/lib/auth/server';
import { Button } from '@/lib/ui/components/ui/button';
import { headers } from 'next/headers';
import Link from 'next/link';

const Page = async () => {
  const orgs = await auth.api.listOrganizations({
    headers: await headers(),
  });
  const startOrg = orgs.length === 0;
  return (
    <div className="h-full w-full relative">
      <CreateCheckout />
      {startOrg && (
        <div className="h-full w-full flex items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-3">
            <div className="text-3xl font-bold">
              Bienvenido a <span className="text-primary">Lumen</span>
            </div>
            <div className="text-xl">Para comenzar a utilizar la aplicación, primero debes crear una organización.</div>
            <Link href={'/start-organization'}>
              <Button className="cursor-pointer">Crear organización</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
