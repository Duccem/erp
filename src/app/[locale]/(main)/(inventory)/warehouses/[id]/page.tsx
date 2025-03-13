import { ErrorFallback } from '@/lib/ui/components/internal/error-fallback';
import DetailsWarehouse from '@/modules/warehouse/ui/components/details';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import { Suspense } from 'react';

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return (
    <ErrorBoundary errorComponent={ErrorFallback}>
      <Suspense fallback={<div>Loading...</div>}>
        <DetailsWarehouse id={id} />
      </Suspense>
    </ErrorBoundary>
  );
};

export default Page;
