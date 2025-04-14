import { sqliteTable, index } from "drizzle-orm/sqlite-core";
import { relations, sql } from "drizzle-orm";
import { user } from "./user.schema";

export const links = sqliteTable(
	"links",
	(t) => ({
		id: t.text("id").primaryKey(),
		host: t.text("host").notNull(),
		slug: t.text("slug").notNull(),
		toUrl: t.text("to_url").notNull(),
		clicks: t.integer("clicks").notNull().default(0),
		createdAt: t
			.integer("created_at", { mode: "timestamp_ms" })
			.notNull()
			.default(sql`(current_timestamp)`),
		authorId: t.text("author_id").references(() => user.id),
	}),
	(links) => [
		index("links_host_idx").on(links.host),
		index("links_slug_idx").on(links.slug),
	],
);

export const clicks = sqliteTable("clicks", (t) => ({
	id: t.integer("id").primaryKey({ autoIncrement: true }),
	linkId: t.text("link_id").references(() => links.id),
	referrer: t.text("referrer"),
	createdAt: t
		.integer("created_at", { mode: "timestamp_ms" })
		.notNull()
		.default(sql`(current_timestamp)`),
}));

export const linksRelations = relations(links, ({ one }) => ({
	author: one(user, {
		fields: [links.authorId],
		references: [user.id],
	}),
}));
