-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE SCHEMA "erp";
--> statement-breakpoint
CREATE TYPE "erp"."provider_status" AS ENUM('ACTIVE', 'INACTIVE');--> statement-breakpoint
CREATE TYPE "erp"."provider_type" AS ENUM('COMPANY', 'PERSON');--> statement-breakpoint
CREATE TABLE "erp"."sub_category" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"color" text NOT NULL,
	"categoryId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "erp"."member" (
	"id" text PRIMARY KEY NOT NULL,
	"organizationId" text NOT NULL,
	"userId" text NOT NULL,
	"role" text NOT NULL,
	"teamId" text,
	"createdAt" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "erp"."user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"emailVerified" boolean NOT NULL,
	"image" text,
	"createdAt" timestamp(3) NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"role" text
);
--> statement-breakpoint
CREATE TABLE "erp"."invitation" (
	"id" text PRIMARY KEY NOT NULL,
	"organizationId" text NOT NULL,
	"email" text NOT NULL,
	"role" text,
	"teamId" text,
	"status" text NOT NULL,
	"expiresAt" timestamp(3) NOT NULL,
	"inviterId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "erp"."team" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"organizationId" text NOT NULL,
	"createdAt" timestamp(3) NOT NULL,
	"updatedAt" timestamp(3)
);
--> statement-breakpoint
CREATE TABLE "erp"."product" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"code" text NOT NULL,
	"brand" text NOT NULL,
	"state" text NOT NULL,
	"description" text NOT NULL,
	"image" text NOT NULL,
	"cost" double precision NOT NULL,
	"price" double precision NOT NULL,
	"weight" double precision NOT NULL,
	"height" double precision NOT NULL,
	"width" double precision NOT NULL,
	"length" double precision NOT NULL,
	"color" text NOT NULL,
	"material" text NOT NULL,
	"organizationId" text NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "erp"."session" (
	"id" text PRIMARY KEY NOT NULL,
	"expiresAt" timestamp(3) NOT NULL,
	"token" text NOT NULL,
	"createdAt" timestamp(3) NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"ipAddress" text,
	"userAgent" text,
	"userId" text NOT NULL,
	"activeOrganizationId" text
);
--> statement-breakpoint
CREATE TABLE "erp"."account" (
	"id" text PRIMARY KEY NOT NULL,
	"accountId" text NOT NULL,
	"providerId" text NOT NULL,
	"userId" text NOT NULL,
	"accessToken" text,
	"refreshToken" text,
	"idToken" text,
	"accessTokenExpiresAt" timestamp(3),
	"refreshTokenExpiresAt" timestamp(3),
	"scope" text,
	"password" text,
	"createdAt" timestamp(3) NOT NULL,
	"updatedAt" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "erp"."organization" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" text,
	"logo" text,
	"createdAt" timestamp(3) NOT NULL,
	"metadata" text
);
--> statement-breakpoint
CREATE TABLE "erp"."verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expiresAt" timestamp(3) NOT NULL,
	"createdAt" timestamp(3),
	"updatedAt" timestamp(3)
);
--> statement-breakpoint
CREATE TABLE "erp"."category" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"color" text NOT NULL,
	"organizationId" text NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "erp"."stock" (
	"id" text PRIMARY KEY NOT NULL,
	"productId" text NOT NULL,
	"warehouseId" text NOT NULL,
	"quantity" integer NOT NULL,
	"minQuantity" integer NOT NULL,
	"maxQuantity" integer NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "erp"."warehouse" (
	"id" text PRIMARY KEY NOT NULL,
	"address" text NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"name" text NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"organizationId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "erp"."provider" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"type" "erp"."provider_type" DEFAULT 'COMPANY' NOT NULL,
	"status" "erp"."provider_status" DEFAULT 'ACTIVE' NOT NULL,
	"phone" text NOT NULL,
	"email" text NOT NULL,
	"address" text NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"image" text NOT NULL,
	"deletedAt" timestamp(3)
);
--> statement-breakpoint
CREATE TABLE "erp"."_sub_category_products" (
	"A" text NOT NULL,
	"B" text NOT NULL,
	CONSTRAINT "_sub_category_products_AB_pkey" PRIMARY KEY("A","B")
);
--> statement-breakpoint
CREATE TABLE "erp"."_provider_products" (
	"A" text NOT NULL,
	"B" text NOT NULL,
	CONSTRAINT "_provider_products_AB_pkey" PRIMARY KEY("A","B")
);
--> statement-breakpoint
ALTER TABLE "erp"."sub_category" ADD CONSTRAINT "sub_category_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "erp"."category"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "erp"."member" ADD CONSTRAINT "member_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "erp"."organization"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "erp"."member" ADD CONSTRAINT "member_userId_fkey" FOREIGN KEY ("userId") REFERENCES "erp"."user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "erp"."invitation" ADD CONSTRAINT "invitation_inviterId_fkey" FOREIGN KEY ("inviterId") REFERENCES "erp"."user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "erp"."invitation" ADD CONSTRAINT "invitation_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "erp"."organization"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "erp"."team" ADD CONSTRAINT "team_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "erp"."organization"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "erp"."product" ADD CONSTRAINT "product_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "erp"."organization"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "erp"."session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "erp"."user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "erp"."account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "erp"."user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "erp"."category" ADD CONSTRAINT "category_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "erp"."organization"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "erp"."stock" ADD CONSTRAINT "stock_productId_fkey" FOREIGN KEY ("productId") REFERENCES "erp"."product"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "erp"."stock" ADD CONSTRAINT "stock_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "erp"."warehouse"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "erp"."warehouse" ADD CONSTRAINT "warehouse_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "erp"."organization"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "erp"."_sub_category_products" ADD CONSTRAINT "_sub_category_products_A_fkey" FOREIGN KEY ("A") REFERENCES "erp"."product"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "erp"."_sub_category_products" ADD CONSTRAINT "_sub_category_products_B_fkey" FOREIGN KEY ("B") REFERENCES "erp"."sub_category"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "erp"."_provider_products" ADD CONSTRAINT "_provider_products_A_fkey" FOREIGN KEY ("A") REFERENCES "erp"."product"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "erp"."_provider_products" ADD CONSTRAINT "_provider_products_B_fkey" FOREIGN KEY ("B") REFERENCES "erp"."provider"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
CREATE UNIQUE INDEX "user_email_key" ON "erp"."user" USING btree ("email" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "product_code_key" ON "erp"."product" USING btree ("code" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "session_token_key" ON "erp"."session" USING btree ("token" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "organization_slug_key" ON "erp"."organization" USING btree ("slug" text_ops);--> statement-breakpoint
CREATE INDEX "_sub_category_products_B_index" ON "erp"."_sub_category_products" USING btree ("B" text_ops);--> statement-breakpoint
CREATE INDEX "_provider_products_B_index" ON "erp"."_provider_products" USING btree ("B" text_ops);
*/