import { Aggregate } from '@/lib/ddd/core/aggregate';
import { DateValueObject, StringValueObject } from '@/lib/ddd/core/value-object';
import { Uuid } from '@/lib/ddd/core/value-objects/uuid';
import { Primitives } from '@/lib/ddd/types/primitives';
import { SubCategory } from './sub-category';

export class Category extends Aggregate {
  constructor(
    id: Uuid,
    public name: StringValueObject,
    public color: StringValueObject,
    public organizationId: Uuid,
    public subCategories: SubCategory[],
    createdAt: DateValueObject,
    updatedAt: DateValueObject
  ) {
    super(id, createdAt, updatedAt);
  }

  toPrimitives(): Primitives<Category> {
    return {
      id: this.id.getValue(),
      name: this.name.getValue(),
      color: this.color.getValue(),
      organizationId: this.organizationId.getValue(),
      subCategories: this.subCategories ? this.subCategories.map((subCategory) => subCategory.toPrimitives()) : [],
      createdAt: this.createdAt.getValue(),
      updatedAt: this.updatedAt.getValue(),
    };
  }

  static fromPrimitives(primitives: Primitives<Category>): Category {
    return new Category(
      new Uuid(primitives.id),
      new StringValueObject(primitives.name),
      new StringValueObject(primitives.color),
      new Uuid(primitives.organizationId),
      primitives.subCategories
        ? primitives.subCategories.map((subCategory) => SubCategory.fromPrimitives(subCategory))
        : [],
      new DateValueObject(primitives.createdAt),
      new DateValueObject(primitives.updatedAt)
    );
  }

  static create(id: string, name: string, color: string, organizationId: string): Category {
    return new Category(
      new Uuid(id),
      new StringValueObject(name),
      new StringValueObject(color),
      new Uuid(organizationId),
      [],
      DateValueObject.today(),
      DateValueObject.today()
    );
  }

  addSubCategory(name: string, color: string): void {
    const subCategory = SubCategory.create(Uuid.random().value, name, color);
    this.subCategories.push(subCategory);
  }

  removeSubCategory(subCategoryId: string): void {
    this.subCategories = this.subCategories.filter((subCategory) => subCategory.id.value !== subCategoryId);
  }

  updateSubCategory(subCategoryId: string, name: string, color: string): void {
    const subCategory = this.subCategories.find((subCategory) => subCategory.id.value === subCategoryId);
    if (subCategory) {
      subCategory.name = new StringValueObject(name);
      subCategory.color = new StringValueObject(color);
    }
  }

  updateCategory(name?: string, color?: string): void {
    this.name = name ? new StringValueObject(name) : this.name;
    this.color = color ? new StringValueObject(color) : this.color;
  }
}
