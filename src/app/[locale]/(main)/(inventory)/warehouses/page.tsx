import { ErrorFallback } from '@/components/shared/error-fallback';
import WarehouseTable from '@/components/warehouse/table';
import { Loading } from '@/lib/ui/components/ui/data-table/loading';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import { createLoader, parseAsInteger, parseAsString, SearchParams } from 'nuqs/server';
import { Suspense } from 'react';

const warehouseParams = {
  name: parseAsString,
  sort: parseAsString,
  page: parseAsInteger.withDefault(0),
  pageSize: parseAsInteger.withDefault(10),
};

const loadSearchParams = createLoader(warehouseParams);

const Page = async ({ searchParams }: { searchParams: Promise<SearchParams> }) => {
  const { name, page, pageSize, sort } = await loadSearchParams(searchParams);
  return (
    <div className="w-full p-4 space-y-3">
      <h2 className="text-xl font-semibold">Warehouses</h2>
      <div className="">
        <ErrorBoundary errorComponent={ErrorFallback}>
          <Suspense fallback={<Loading />}>
            <WarehouseTable name={name} page={page} pageSize={pageSize} sort={sort} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default Page;
