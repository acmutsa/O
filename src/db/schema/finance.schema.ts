import { relations, sql } from "drizzle-orm";
import { sqliteTable } from "drizzle-orm/sqlite-core";
import { user } from "./user.schema";

export const transaction = sqliteTable("transaction", (t) => ({
	id: t.text("id").primaryKey(),
	amount: t.integer("amount").notNull(),
	date: t.integer("date").notNull(),
	description: t.text("description").notNull(),
	payee: t.text("payee").notNull(),
	memo: t.text("memo"),
	internalNotes: t.text("internal_notes"),
	createdAt: t
		.integer("created_at", { mode: "timestamp" })
		.notNull()
		.default(sql`CURRENT_TIMESTAMP`),
	updatedAt: t
		.integer("updated_at", { mode: "timestamp" })
		.notNull()
		.default(sql`CURRENT_TIMESTAMP`),
	updatedByUserId: t
		.text("updated_by_user_id")
		.notNull()
		.references(() => user.id),
}));

export const transactionRelations = relations(transaction, ({ one }) => ({
	updatedByUser: one(user, {
		fields: [transaction.updatedByUserId],
		references: [user.id],
	}),
}));
