import { Criteria, Operator } from '@/lib/ddd/core/criteria';
import { NotFoundError } from '@/lib/ddd/core/errors/not-found-error';
import { Category } from '../domain/category';
import { CategoryRepository } from '../domain/category-repository';

interface GetCategoryRequest {
  categoryId: string;
}

export class GetCategory {
  constructor(private categoryRepository: CategoryRepository) {}

  async run({ categoryId }: GetCategoryRequest): Promise<Category> {
    const criteria = Criteria.fromValues([{ field: 'id', value: categoryId, operator: Operator.EQUAL }]);
    const category = await this.categoryRepository.get(criteria);

    if (!category) {
      throw new NotFoundError('Category not found');
    }

    return category;
  }
}
