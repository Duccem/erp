import DetailsProvider from '@/components/provider/details';
import { ErrorFallback } from '@/components/shared/error-fallback';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import { Suspense } from 'react';

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return (
    <ErrorBoundary errorComponent={ErrorFallback}>
      <Suspense fallback={<div>Loading...</div>}>
        <DetailsProvider id={id} />
      </Suspense>
    </ErrorBoundary>
  );
};

export default Page;
