import { Criteria, Operator } from '@/lib/ddd/core/criteria';
import { Category } from '../domain/category';
import { CategoryRepository } from '../domain/category-repository';

interface SaveCategoryRequest {
  id: string;
  name: string;
  color: string;
  organizationId: string;
}

export class SaveCategory {
  constructor(private categoryRepository: CategoryRepository) {}

  async run({ id, name, color, organizationId }: SaveCategoryRequest): Promise<void> {
    const criteria = Criteria.fromValues([{ field: 'id', value: id, operator: Operator.EQUAL }]);
    let category = await this.categoryRepository.get(criteria);

    if (!category) {
      category = Category.create(id, name, color, organizationId);
    } else {
      category.updateCategory(name, color);
    }

    await this.categoryRepository.save(category);
  }
}
