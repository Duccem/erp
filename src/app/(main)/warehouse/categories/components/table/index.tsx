import DataTable from '@/lib/ui/components/ui/data-table';
import { DataTableProvider } from '@/lib/ui/components/ui/data-table/provider';
import { ColumnVisibility } from '@/lib/ui/components/ui/data-table/visibility';
import CategoryActions from './actions';
import { categoryColumns } from './columns';

const CategoryTable = () => {
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
            data={[
              {
                id: '1',
                name: 'Category 1',
              },
              {
                id: '2',
                name: 'Category 2',
              },
            ]}
            meta={{ page: 1, pages: 1, size: 10, total: 0 }}
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
