import DataTable from '@/lib/ui/components/ui/data-table';
import { DataTableProvider } from '@/lib/ui/components/ui/data-table/provider';
import { ColumnVisibility } from '@/lib/ui/components/ui/data-table/visibility';
import { createLoader, parseAsInteger, parseAsString, SearchParams } from 'nuqs/server';
import { listCategories } from '../../actions/list-categories';
import CategoryActions from './actions';
import { categoryColumns } from './columns';

const categoryParams = {
  name: parseAsString,
  sort: parseAsString,
  page: parseAsInteger.withDefault(0),
  pageSize: parseAsInteger.withDefault(10),
};
const loadSearchParams = createLoader(categoryParams);

const CategoryTable = async ({ searchParams }: { searchParams: Promise<SearchParams> }) => {
  const { name, page, pageSize, sort } = await loadSearchParams(searchParams);
  const response = await listCategories({
    filters: name ? [{ field: 'name', operator: 'contains', value: name }] : undefined,
    pagination: page && pageSize ? { page: page + 1, limit: pageSize } : undefined,
    order: sort ? { field: sort?.split(':')[0], order: sort?.split(':')[1] } : undefined,
  });
  return (
    <DataTableProvider>
      <div className="w-full flex flex-col gap-4">
        <div className="flex px-4 py-7 w-full gap-3">
          <ColumnVisibility />
          <CategoryActions />
        </div>
        <div className="px-4 w-full">
          <DataTable
            columns={categoryColumns}
            data={response!.data!}
            meta={{
              page: page + 1,
              pages: Math.ceil((response?.data?.length ?? 1) / (pageSize ?? 10)),
              size: pageSize ?? 10,
              total: response?.data?.length ?? 0,
            }}
            initialColumnVisibility={{}}
            actions={{}}
            columnsKey="category-columns"
          />
        </div>
      </div>
    </DataTableProvider>
  );
};

export default CategoryTable;
