import { PrismaCriteriaConverter } from '@/lib/database/converter';
import { Criteria } from '@/lib/ddd/core/criteria';
import { Primitives } from '@/lib/ddd/types/primitives';
import { PrismaClient } from '@prisma/client';
import { Category } from '../domain/category';
import { CategoryRepository } from '../domain/category-repository';

export class PrismaCategoryRepository implements CategoryRepository {
  private converter = new PrismaCriteriaConverter();
  constructor(private prisma: PrismaClient) {}

  get model() {
    return this.prisma.category;
  }

  async save(category: Category): Promise<void> {
    const data = category.toPrimitives();

    await this.model.upsert({
      where: { id: data.id },
      update: {
        name: data.name,
        color: data.color,
        organizationId: data.organizationId,
        subCategories: {
          create: data.subCategories,
        },
      },
      create: {
        id: data.id,
        name: data.name,
        color: data.color,
        organizationId: data.organizationId,
        subCategories: {
          create: data.subCategories,
        },
      },
    });
  }

  async search(criteria: Criteria): Promise<Category[]> {
    const { where, take, skip, orderBy } = this.converter.criteria(criteria);
    const categories = await this.model.findMany({ where, take, skip, orderBy });

    return categories.map((category) => Category.fromPrimitives(category as unknown as Primitives<Category>));
  }

  async get(criteria: Criteria): Promise<Category | null> {
    const { where } = this.converter.criteria(criteria);
    const category = await this.model.findFirst({ where });

    if (!category) return null;

    return Category.fromPrimitives(category as unknown as Primitives<Category>);
  }
}
