import { CategoryRepository } from '../domain/category-repository';

export class DeleteCategory {
  constructor(private readonly repository: CategoryRepository) {}

  async run(categoryId: string): Promise<void> {
    await this.repository.delete(categoryId);
  }
}
