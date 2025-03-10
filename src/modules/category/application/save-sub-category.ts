import { Criteria, Operator } from '@/lib/ddd/core/criteria';
import { NotFoundError } from '@/lib/ddd/core/errors/not-found-error';
import { CategoryRepository } from '../domain/category-repository';

interface SaveSubCategoryRequest {
  categoryId: string;
  subCategoryId: string;
  name: string;
  color: string;
}

export class SaveSubCategory {
  constructor(private categoryRepository: CategoryRepository) {}

  async run({ categoryId, subCategoryId, name, color }: SaveSubCategoryRequest): Promise<void> {
    const criteria = Criteria.fromValues([{ field: 'id', value: categoryId, operator: Operator.EQUAL }]);
    const category = await this.categoryRepository.get(criteria);

    if (!category) {
      throw new NotFoundError('Category not found');
    }

    const subCategory = category.subCategories.find((sub) => sub.id.getValue() === subCategoryId);

    if (!subCategory) {
      category.addSubCategory(name, color);
    } else {
      category.updateSubCategory(subCategoryId, name, color);
    }

    await this.categoryRepository.save(category);
  }
}
