import { ErrorFallback } from '@/lib/ui/components/internal/error-fallback';
import { Loading } from '@/lib/ui/components/ui/data-table/loading';
import CategoryTable from '@/modules/category/ui/components/table';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import { SearchParams } from 'nuqs/server';
import { Suspense } from 'react';

const Page = ({ searchParams }: { searchParams: Promise<SearchParams> }) => {
  return (
    <div className="w-full p-4">
      <h2 className="text-xl font-semibold px-4">Categorías y sub categorías</h2>
      <div className="flex px-4 py-7 w-full gap-3"></div>
      <div className="mt-4">
        <ErrorBoundary errorComponent={ErrorFallback}>
          <Suspense fallback={<Loading />}>
            <CategoryTable searchParams={searchParams} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default Page;
