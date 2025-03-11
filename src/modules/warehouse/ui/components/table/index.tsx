import DataTable from '@/lib/ui/components/ui/data-table';
import { DataTableProvider } from '@/lib/ui/components/ui/data-table/provider';
import { ColumnVisibility } from '@/lib/ui/components/ui/data-table/visibility';
import { listWarehouses } from '../../actions/list-warehouses';
import WarehouseActions from './actions';
import { warehouseColumns } from './columns';

const WarehouseTable = async ({
  name,
  page,
  pageSize,
  sort,
}: {
  name: string | null;
  page?: number;
  pageSize?: number;
  sort: string | null;
}) => {
  const response = await listWarehouses({
    filters: name ? [{ field: 'name', operator: 'contains', value: name }] : undefined,
    pagination: page && pageSize ? { page: page + 1, limit: pageSize } : undefined,
    order: sort ? { field: sort?.split(':')[0], order: sort?.split(':')[1] } : undefined,
  });
  return (
    <DataTableProvider>
      <div className="w-full flex flex-col gap-4">
        <div className="flex py-7 w-full gap-3">
          <ColumnVisibility />
          <WarehouseActions />
        </div>
        <div className="w-full">
          <DataTable
            columns={warehouseColumns}
            data={response!.data!}
            meta={{
              page: (page ?? 0) + 1,
              pages: Math.ceil((response?.data?.length ?? 1) / (pageSize ?? 10)),
              size: pageSize ?? 10,
              total: response?.data?.length ?? 0,
            }}
            initialColumnVisibility={{}}
            actions={{}}
            columnsKey="warehouse-columns"
          />
        </div>
      </div>
    </DataTableProvider>
  );
};

export default WarehouseTable;
