import { sqliteTable, primaryKey } from "drizzle-orm/sqlite-core";
import { relations, sql } from "drizzle-orm";
import { meetingInvites, meeting } from "../schema";
import { links } from "./link.schema";

export const user = sqliteTable("user", (t) => ({
	id: t.text("id").primaryKey(),
	firstName: t.text("first_name", { length: 255 }).notNull(),
	lastName: t.text("last_name", { length: 255 }).notNull(),
	email: t.text("email").notNull().unique(),
	pronouns: t.text("pronouns", { length: 255 }),
	createdAt: t
		.integer("created_at", { mode: "timestamp_ms" })
		.notNull()
		.default(sql`(current_timestamp)`),
	emailVerified: t.integer("email_verified", { mode: "boolean" }).notNull(),
	image: t.text("image"),
	updatedAt: t.integer("updated_at", { mode: "timestamp" }).notNull(),
}));

export const userRelations = relations(user, ({ one, many }) => ({
	userToPositions: many(usersToPositions),
	meetingsCreated: many(meeting),
	meetingInvites: many(meetingInvites),
	links: many(links),
}));

export const position = sqliteTable("position", (t) => ({
	positionID: t.integer("positionID").primaryKey(),
	name: t.text("name", { length: 255 }).notNull(),
	description: t.text("description", { length: 255 }),
}));

export const positionRelations = relations(position, ({ many }) => ({
	usersToPositions: many(usersToPositions),
}));

export const usersToPositions = sqliteTable(
	"users_to_positions",
	(t) => ({
		userID: t
			.text("userID")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		positionID: t
			.integer("positionID")
			.notNull()
			.references(() => position.positionID, { onDelete: "cascade" }),
	}),
	(table) => [
		primaryKey({
			columns: [table.userID, table.positionID],
		}),
	],
);

export const usersToPositionsRelations = relations(
	usersToPositions,
	({ one }) => ({
		user: one(user, {
			fields: [usersToPositions.userID],
			references: [user.id],
		}),
		position: one(position, {
			fields: [usersToPositions.positionID],
			references: [position.positionID],
		}),
	}),
);
