import { relations } from "drizzle-orm/relations";
import { categoryInErp, subCategoryInErp, organizationInErp, memberInErp, userInErp, invitationInErp, teamInErp, productInErp, sessionInErp, accountInErp, stockInErp, warehouseInErp, subCategoryProductsInErp, providerProductsInErp, providerInErp } from "./schema";

export const subCategoryInErpRelations = relations(subCategoryInErp, ({one, many}) => ({
	categoryInErp: one(categoryInErp, {
		fields: [subCategoryInErp.categoryId],
		references: [categoryInErp.id]
	}),
	subCategoryProductsInErps: many(subCategoryProductsInErp),
}));

export const categoryInErpRelations = relations(categoryInErp, ({one, many}) => ({
	subCategoryInErps: many(subCategoryInErp),
	organizationInErp: one(organizationInErp, {
		fields: [categoryInErp.organizationId],
		references: [organizationInErp.id]
	}),
}));

export const memberInErpRelations = relations(memberInErp, ({one}) => ({
	organizationInErp: one(organizationInErp, {
		fields: [memberInErp.organizationId],
		references: [organizationInErp.id]
	}),
	userInErp: one(userInErp, {
		fields: [memberInErp.userId],
		references: [userInErp.id]
	}),
}));

export const organizationInErpRelations = relations(organizationInErp, ({many}) => ({
	memberInErps: many(memberInErp),
	invitationInErps: many(invitationInErp),
	teamInErps: many(teamInErp),
	productInErps: many(productInErp),
	categoryInErps: many(categoryInErp),
	warehouseInErps: many(warehouseInErp),
}));

export const userInErpRelations = relations(userInErp, ({many}) => ({
	memberInErps: many(memberInErp),
	invitationInErps: many(invitationInErp),
	sessionInErps: many(sessionInErp),
	accountInErps: many(accountInErp),
}));

export const invitationInErpRelations = relations(invitationInErp, ({one}) => ({
	userInErp: one(userInErp, {
		fields: [invitationInErp.inviterId],
		references: [userInErp.id]
	}),
	organizationInErp: one(organizationInErp, {
		fields: [invitationInErp.organizationId],
		references: [organizationInErp.id]
	}),
}));

export const teamInErpRelations = relations(teamInErp, ({one}) => ({
	organizationInErp: one(organizationInErp, {
		fields: [teamInErp.organizationId],
		references: [organizationInErp.id]
	}),
}));

export const productInErpRelations = relations(productInErp, ({one, many}) => ({
	organizationInErp: one(organizationInErp, {
		fields: [productInErp.organizationId],
		references: [organizationInErp.id]
	}),
	stockInErps: many(stockInErp),
	subCategoryProductsInErps: many(subCategoryProductsInErp),
	providerProductsInErps: many(providerProductsInErp),
}));

export const sessionInErpRelations = relations(sessionInErp, ({one}) => ({
	userInErp: one(userInErp, {
		fields: [sessionInErp.userId],
		references: [userInErp.id]
	}),
}));

export const accountInErpRelations = relations(accountInErp, ({one}) => ({
	userInErp: one(userInErp, {
		fields: [accountInErp.userId],
		references: [userInErp.id]
	}),
}));

export const stockInErpRelations = relations(stockInErp, ({one}) => ({
	productInErp: one(productInErp, {
		fields: [stockInErp.productId],
		references: [productInErp.id]
	}),
	warehouseInErp: one(warehouseInErp, {
		fields: [stockInErp.warehouseId],
		references: [warehouseInErp.id]
	}),
}));

export const warehouseInErpRelations = relations(warehouseInErp, ({one, many}) => ({
	stockInErps: many(stockInErp),
	organizationInErp: one(organizationInErp, {
		fields: [warehouseInErp.organizationId],
		references: [organizationInErp.id]
	}),
}));

export const subCategoryProductsInErpRelations = relations(subCategoryProductsInErp, ({one}) => ({
	productInErp: one(productInErp, {
		fields: [subCategoryProductsInErp.a],
		references: [productInErp.id]
	}),
	subCategoryInErp: one(subCategoryInErp, {
		fields: [subCategoryProductsInErp.b],
		references: [subCategoryInErp.id]
	}),
}));

export const providerProductsInErpRelations = relations(providerProductsInErp, ({one}) => ({
	productInErp: one(productInErp, {
		fields: [providerProductsInErp.a],
		references: [productInErp.id]
	}),
	providerInErp: one(providerInErp, {
		fields: [providerProductsInErp.b],
		references: [providerInErp.id]
	}),
}));

export const providerInErpRelations = relations(providerInErp, ({many}) => ({
	providerProductsInErps: many(providerProductsInErp),
}));