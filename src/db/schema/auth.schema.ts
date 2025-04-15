import { sqliteTable } from "drizzle-orm/sqlite-core";
import { user } from "../schema";

export const session = sqliteTable("session", (t) => ({
	id: t.text("id").primaryKey(),
	expiresAt: t.integer("expires_at", { mode: "timestamp" }).notNull(),
	token: t.text("token").notNull().unique(),
	createdAt: t.integer("created_at", { mode: "timestamp" }).notNull(),
	updatedAt: t.integer("updated_at", { mode: "timestamp" }).notNull(),
	ipAddress: t.text("ip_address"),
	userAgent: t.text("user_agent"),
	userId: t
		.text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
}));

export const account = sqliteTable("account", (t) => ({
	id: t.text("id").primaryKey(),
	accountId: t.text("account_id").notNull(),
	providerId: t.text("provider_id").notNull(),
	userId: t
		.text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	accessToken: t.text("access_token"),
	refreshToken: t.text("refresh_token"),
	idToken: t.text("id_token"),
	accessTokenExpiresAt: t.integer("access_token_expires_at", {
		mode: "timestamp",
	}),
	refreshTokenExpiresAt: t.integer("refresh_token_expires_at", {
		mode: "timestamp",
	}),
	scope: t.text("scope"),
	password: t.text("password"),
	createdAt: t.integer("created_at", { mode: "timestamp" }).notNull(),
	updatedAt: t.integer("updated_at", { mode: "timestamp" }).notNull(),
}));

export const verification = sqliteTable("verification", (t) => ({
	id: t.text("id").primaryKey(),
	identifier: t.text("identifier").notNull(),
	value: t.text("value").notNull(),
	expiresAt: t.integer("expires_at", { mode: "timestamp" }).notNull(),
	createdAt: t.integer("created_at", { mode: "timestamp" }),
	updatedAt: t.integer("updated_at", { mode: "timestamp" }),
}));
