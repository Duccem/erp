import { Criteria, Direction, Filter, Operator, Order, Pagination } from '@/lib/ddd/core/criteria';
import { Primitives } from '@/lib/ddd/types/primitives';
import { Category } from '../domain/category';
import { CategoryRepository } from '../domain/category-repository';

interface ListCategoriesRequest {
  filters?: Filter[];
  order?: Order;
  pagination?: Pagination;
  organizationId: string;
}

export class ListCategories {
  constructor(private categoryRepository: CategoryRepository) {}

  async run(request: ListCategoriesRequest): Promise<Primitives<Category>[]> {
    try {
      const criteria = Criteria.fromValues(
        [
          { field: 'organizationId', operator: Operator.EQUAL, value: request.organizationId },
          ...(request.filters ?? []),
        ],
        request.order ?? { field: 'createdAt', order: Direction.DESC },
        request.pagination ?? { offset: 0, limit: 10 }
      );
      const categories = await this.categoryRepository.search(criteria);
      return categories.map((category) => category.toPrimitives());
    } catch (error) {
      console.log('ERROR');
      console.log(error);
      return [];
    }
  }
}
