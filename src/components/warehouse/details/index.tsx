import { Card, CardContent, CardHeader, CardTitle } from '@/lib/ui/components/ui/card';
import { findWarehouse } from '../../../actions/warehouse/find-warehouse';

const DetailsWarehouse = async ({ id }: { id: string }) => {
  const response = await findWarehouse({ id });
  const warehouse = response!.data!;
  return (
    <div className="p-4 w-2/3 flex gap-5">
      <Card className="w-full">
        <CardHeader className="pb-2 border-b-2">
          <div className="flex justify-between items-center ">
            <CardTitle className="text-2xl">{warehouse.name}</CardTitle>
            <div className="flex gap-2 items-center"></div>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <p>
            <span>Dirección: </span>
            <span>{warehouse.address}</span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailsWarehouse;
