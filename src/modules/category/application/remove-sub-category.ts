import { Criteria, Operator } from '@/lib/ddd/core/criteria';
import { NotFoundError } from '@/lib/ddd/core/errors/not-found-error';
import { CategoryRepository } from '../domain/category-repository';

interface RemoveSubCategoryRequest {
  categoryId: string;
  subCategoryId: string;
}

export class RemoveSubCategory {
  constructor(private categoryRepository: CategoryRepository) {}

  async run({ categoryId, subCategoryId }: RemoveSubCategoryRequest): Promise<void> {
    const criteria = Criteria.fromValues([{ field: 'id', value: categoryId, operator: Operator.EQUAL }]);
    const category = await this.categoryRepository.get(criteria);

    if (!category) {
      throw new NotFoundError('Category not found');
    }
    await this.categoryRepository.removeSubCategory(categoryId, subCategoryId);
  }
}
