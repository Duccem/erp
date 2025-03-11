import { Card, CardContent, CardHeader, CardTitle } from '@/lib/ui/components/ui/card';
import { getCategory } from '../../actions/get-category';
import CreateSubCategorySheet from '../create-subcategory/sheet';
import DeleteCategoryDialog from '../delete/delete-dialog';
import EditCategorySheet from '../edit/sheet';
import SubCategoryList from './sub-categories-list';

const DetailsCategory = async ({ id }: { id: string }) => {
  const response = await getCategory({ id });
  const category = response!.data!;
  return (
    <div className="p-4 w-2/3 flex gap-5">
      <Card className="w-full">
        <CardHeader className="pb-2" style={{ borderBottom: `4px solid ${category.color}` }}>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl">{category.name}</CardTitle>
            <div className="flex gap-2 items-center">
              <EditCategorySheet category={category} />
              <DeleteCategoryDialog category={category} />
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-4 h-4 rounded-md" style={{ backgroundColor: category.color }}></div>
            <span className="text-sm text-muted-foreground">Color: {category.color}</span>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            Esta categoría tiene {category.subCategories.length} subcategorías
          </p>
          <div className="flex justify-between items-center my-2">
            <p className="text-2xl">Sub Categorías</p>
            <CreateSubCategorySheet categoryId={category.id} />
          </div>
          <SubCategoryList subCategories={category.subCategories} categoryId={category.id} />
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailsCategory;
