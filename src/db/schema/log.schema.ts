import { sql } from "drizzle-orm";
import { sqliteTable } from "drizzle-orm/sqlite-core";

export const log = sqliteTable("log", (t) => ({
	id: t.integer("id").primaryKey({ autoIncrement: true }),
	level: t
		.text("level", { enum: ["info", "record", "warn", "error"] })
		.notNull(),
	vertical: t
		.text("vertical", { enum: ["links", "meet", "finance", "other"] })
		.notNull(),
	message: t.text("message").notNull(),
	createdAt: t
		.integer("created_at", { mode: "timestamp" })
		.notNull()
		.default(sql`CURRENT_TIMESTAMP`),
}));
