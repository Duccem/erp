'use client';
import EditSubCategorySheet from '../edit-subcategory/sheet';
import DeleteSubCategoryDialog from './delete-sub-category';

type SubCategory = {
  id: string;
  name: string;
  color: string;
};

interface SubCategoryListProps {
  subCategories: SubCategory[];
  categoryId: string;
}
export default function SubCategoryList({ subCategories, categoryId }: SubCategoryListProps) {
  return (
    <ul className="space-y-3">
      {subCategories.map((subCategory, index) => (
        <li
          key={index}
          className="flex items-center justify-between gap-3 p-3 border rounded-md hover:bg-muted/50 transition-colors"
        >
          <div className="flex justify-start items-center gap-2">
            <div className="w-4 h-4 rounded-md flex-shrink-0" style={{ backgroundColor: subCategory.color }}></div>
            <span className="font-medium">{subCategory.name}</span>
          </div>
          <div className="flex gap-1">
            <EditSubCategorySheet subCategory={subCategory} categoryId={categoryId} />
            <DeleteSubCategoryDialog subCategory={subCategory} categoryId={categoryId} />
          </div>
        </li>
      ))}
    </ul>
  );
}
