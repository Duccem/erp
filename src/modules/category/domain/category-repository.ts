import { Criteria } from '@/lib/ddd/core/criteria';
import { Category } from './category';

export interface CategoryRepository {
  save(category: Category): Promise<void>;
  search(criteria: Criteria): Promise<Category[]>;
  get(criteria: Criteria): Promise<Category | null>;
  removeSubCategory(categoryId: string, subCategoryId: string): Promise<void>;
  delete(categoryId: string): Promise<void>;
}
