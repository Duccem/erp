import { sql } from 'drizzle-orm';
import {
  boolean,
  doublePrecision,
  foreignKey,
  index,
  integer,
  pgSchema,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from 'drizzle-orm/pg-core';

export const erp = pgSchema('erp');
export const providerStatusInErp = erp.enum('provider_status', ['ACTIVE', 'INACTIVE']);
export const providerTypeInErp = erp.enum('provider_type', ['COMPANY', 'PERSON']);

export const subCategoryInErp = erp.table(
  'sub_category',
  {
    id: text().primaryKey().notNull(),
    name: text().notNull(),
    color: text().notNull(),
    categoryId: text().notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.categoryId],
      foreignColumns: [categoryInErp.id],
      name: 'sub_category_categoryId_fkey',
    })
      .onUpdate('cascade')
      .onDelete('restrict'),
  ]
);

export const memberInErp = erp.table(
  'member',
  {
    id: text().primaryKey().notNull(),
    organizationId: text().notNull(),
    userId: text().notNull(),
    role: text().notNull(),
    teamId: text(),
    createdAt: timestamp({ precision: 3, mode: 'string' }).notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.organizationId],
      foreignColumns: [organizationInErp.id],
      name: 'member_organizationId_fkey',
    })
      .onUpdate('cascade')
      .onDelete('cascade'),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [userInErp.id],
      name: 'member_userId_fkey',
    })
      .onUpdate('cascade')
      .onDelete('cascade'),
  ]
);

export const userInErp = erp.table(
  'user',
  {
    id: text().primaryKey().notNull(),
    name: text().notNull(),
    email: text().notNull(),
    emailVerified: boolean().notNull(),
    image: text(),
    createdAt: timestamp({ precision: 3, mode: 'string' }).notNull(),
    updatedAt: timestamp({ precision: 3, mode: 'string' }).notNull(),
    role: text(),
  },
  (table) => [uniqueIndex('user_email_key').using('btree', table.email.asc().nullsLast().op('text_ops'))]
);

export const invitationInErp = erp.table(
  'invitation',
  {
    id: text().primaryKey().notNull(),
    organizationId: text().notNull(),
    email: text().notNull(),
    role: text(),
    teamId: text(),
    status: text().notNull(),
    expiresAt: timestamp({ precision: 3, mode: 'string' }).notNull(),
    inviterId: text().notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.inviterId],
      foreignColumns: [userInErp.id],
      name: 'invitation_inviterId_fkey',
    })
      .onUpdate('cascade')
      .onDelete('cascade'),
    foreignKey({
      columns: [table.organizationId],
      foreignColumns: [organizationInErp.id],
      name: 'invitation_organizationId_fkey',
    })
      .onUpdate('cascade')
      .onDelete('cascade'),
  ]
);

export const teamInErp = erp.table(
  'team',
  {
    id: text().primaryKey().notNull(),
    name: text().notNull(),
    organizationId: text().notNull(),
    createdAt: timestamp({ precision: 3, mode: 'string' }).notNull(),
    updatedAt: timestamp({ precision: 3, mode: 'string' }),
  },
  (table) => [
    foreignKey({
      columns: [table.organizationId],
      foreignColumns: [organizationInErp.id],
      name: 'team_organizationId_fkey',
    })
      .onUpdate('cascade')
      .onDelete('cascade'),
  ]
);

export const productInErp = erp.table(
  'product',
  {
    id: text().primaryKey().notNull(),
    name: text().notNull(),
    code: text().notNull(),
    brand: text().notNull(),
    state: text().notNull(),
    description: text().notNull(),
    image: text().notNull(),
    cost: doublePrecision().notNull(),
    price: doublePrecision().notNull(),
    weight: doublePrecision().notNull(),
    height: doublePrecision().notNull(),
    width: doublePrecision().notNull(),
    length: doublePrecision().notNull(),
    color: text().notNull(),
    material: text().notNull(),
    organizationId: text().notNull(),
    createdAt: timestamp({ precision: 3, mode: 'string' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp({ precision: 3, mode: 'string' }).notNull(),
  },
  (table) => [
    uniqueIndex('product_code_key').using('btree', table.code.asc().nullsLast().op('text_ops')),
    foreignKey({
      columns: [table.organizationId],
      foreignColumns: [organizationInErp.id],
      name: 'product_organizationId_fkey',
    })
      .onUpdate('cascade')
      .onDelete('restrict'),
  ]
);

export const sessionInErp = erp.table(
  'session',
  {
    id: text().primaryKey().notNull(),
    expiresAt: timestamp({ precision: 3, mode: 'string' }).notNull(),
    token: text().notNull(),
    createdAt: timestamp({ precision: 3, mode: 'string' }).notNull(),
    updatedAt: timestamp({ precision: 3, mode: 'string' }).notNull(),
    ipAddress: text(),
    userAgent: text(),
    userId: text().notNull(),
    activeOrganizationId: text(),
  },
  (table) => [
    uniqueIndex('session_token_key').using('btree', table.token.asc().nullsLast().op('text_ops')),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [userInErp.id],
      name: 'session_userId_fkey',
    })
      .onUpdate('cascade')
      .onDelete('cascade'),
  ]
);

export const accountInErp = erp.table(
  'account',
  {
    id: text().primaryKey().notNull(),
    accountId: text().notNull(),
    providerId: text().notNull(),
    userId: text().notNull(),
    accessToken: text(),
    refreshToken: text(),
    idToken: text(),
    accessTokenExpiresAt: timestamp({ precision: 3, mode: 'string' }),
    refreshTokenExpiresAt: timestamp({ precision: 3, mode: 'string' }),
    scope: text(),
    password: text(),
    createdAt: timestamp({ precision: 3, mode: 'string' }).notNull(),
    updatedAt: timestamp({ precision: 3, mode: 'string' }).notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.userId],
      foreignColumns: [userInErp.id],
      name: 'account_userId_fkey',
    })
      .onUpdate('cascade')
      .onDelete('cascade'),
  ]
);

export const organizationInErp = erp.table(
  'organization',
  {
    id: text().primaryKey().notNull(),
    name: text().notNull(),
    slug: text(),
    logo: text(),
    createdAt: timestamp({ precision: 3, mode: 'string' }).notNull(),
    metadata: text(),
  },
  (table) => [uniqueIndex('organization_slug_key').using('btree', table.slug.asc().nullsLast().op('text_ops'))]
);

export const verificationInErp = erp.table('verification', {
  id: text().primaryKey().notNull(),
  identifier: text().notNull(),
  value: text().notNull(),
  expiresAt: timestamp({ precision: 3, mode: 'string' }).notNull(),
  createdAt: timestamp({ precision: 3, mode: 'string' }),
  updatedAt: timestamp({ precision: 3, mode: 'string' }),
});

export const categoryInErp = erp.table(
  'category',
  {
    id: text().primaryKey().notNull(),
    name: text().notNull(),
    color: text().notNull(),
    organizationId: text().notNull(),
    createdAt: timestamp({ precision: 3, mode: 'string' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp({ precision: 3, mode: 'string' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.organizationId],
      foreignColumns: [organizationInErp.id],
      name: 'category_organizationId_fkey',
    })
      .onUpdate('cascade')
      .onDelete('restrict'),
  ]
);

export const stockInErp = erp.table(
  'stock',
  {
    id: text().primaryKey().notNull(),
    productId: text().notNull(),
    warehouseId: text().notNull(),
    quantity: integer().notNull(),
    minQuantity: integer().notNull(),
    maxQuantity: integer().notNull(),
    createdAt: timestamp({ precision: 3, mode: 'string' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp({ precision: 3, mode: 'string' }).notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.productId],
      foreignColumns: [productInErp.id],
      name: 'stock_productId_fkey',
    })
      .onUpdate('cascade')
      .onDelete('restrict'),
    foreignKey({
      columns: [table.warehouseId],
      foreignColumns: [warehouse.id],
      name: 'stock_warehouseId_fkey',
    })
      .onUpdate('cascade')
      .onDelete('restrict'),
  ]
);

export const warehouse = erp.table('warehouse', {
  id: uuid().primaryKey().defaultRandom().notNull(),
  address: text('address').notNull(),
  name: text('name').notNull(),
  organizationId: text('organizationId')
    .notNull()
    .references(() => organizationInErp.id),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp(),
});

export const providerInErp = erp.table('provider', {
  id: text().primaryKey().notNull(),
  name: text().notNull(),
  description: text().notNull(),
  type: providerTypeInErp().default('COMPANY').notNull(),
  status: providerStatusInErp().default('ACTIVE').notNull(),
  phone: text().notNull(),
  email: text().notNull(),
  address: text().notNull(),
  createdAt: timestamp({ precision: 3, mode: 'string' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp({ precision: 3, mode: 'string' }).notNull(),
  image: text().notNull(),
  deletedAt: timestamp({ precision: 3, mode: 'string' }),
});

export const subCategoryProductsInErp = erp.table(
  '_sub_category_products',
  {
    a: text('A').notNull(),
    b: text('B').notNull(),
  },
  (table) => [
    index().using('btree', table.b.asc().nullsLast().op('text_ops')),
    foreignKey({
      columns: [table.a],
      foreignColumns: [productInErp.id],
      name: '_sub_category_products_A_fkey',
    })
      .onUpdate('cascade')
      .onDelete('cascade'),
    foreignKey({
      columns: [table.b],
      foreignColumns: [subCategoryInErp.id],
      name: '_sub_category_products_B_fkey',
    })
      .onUpdate('cascade')
      .onDelete('cascade'),
    primaryKey({ columns: [table.a, table.b], name: '_sub_category_products_AB_pkey' }),
  ]
);

export const providerProductsInErp = erp.table(
  '_provider_products',
  {
    a: text('A').notNull(),
    b: text('B').notNull(),
  },
  (table) => [
    index().using('btree', table.b.asc().nullsLast().op('text_ops')),
    foreignKey({
      columns: [table.a],
      foreignColumns: [productInErp.id],
      name: '_provider_products_A_fkey',
    })
      .onUpdate('cascade')
      .onDelete('cascade'),
    foreignKey({
      columns: [table.b],
      foreignColumns: [providerInErp.id],
      name: '_provider_products_B_fkey',
    })
      .onUpdate('cascade')
      .onDelete('cascade'),
    primaryKey({ columns: [table.a, table.b], name: '_provider_products_AB_pkey' }),
  ]
);
