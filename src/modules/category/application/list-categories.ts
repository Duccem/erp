import { Criteria, Filter, Order, Pagination } from '@/lib/ddd/core/criteria';
import { Primitives } from '@/lib/ddd/types/primitives';
import { Category } from '../domain/category';
import { CategoryRepository } from '../domain/category-repository';

interface ListCategoriesRequest {
  filters: Filter[];
  order: Order;
  pagination: Pagination;
}

export class ListCategories {
  constructor(private categoryRepository: CategoryRepository) {}

  async run(criteria: ListCategoriesRequest): Promise<Primitives<Category>[]> {
    const categories = await this.categoryRepository.search(
      Criteria.fromValues(criteria.filters, criteria.order, criteria.pagination)
    );
    return categories.map((category) => category.toPrimitives());
  }
}
