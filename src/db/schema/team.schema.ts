import { sqliteTable, primaryKey } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { user } from "./user.schema";

export const suborgs = sqliteTable("suborgs", (t) => ({
	slug: t.text("slug").notNull().primaryKey(),
	fullname: t.text("fullname").notNull().unique(),
	shortname: t.text("shortname").notNull().unique(),
}));

export const suborgsRelations = relations(suborgs, ({ many }) => ({
	cohorts: many(cohorts),
}));

export const cohorts = sqliteTable("cohorts", (t) => ({
	id: t.text("id").notNull().primaryKey(),
	name: t.text("name").notNull(),
	startDate: t.integer("start_date", { mode: "timestamp" }).notNull(),
	endDate: t.integer("end_date", { mode: "timestamp" }).notNull(),
	suborgSlug: t
		.text("suborg_slug")
		.notNull()
		.references(() => suborgs.slug),
}));

export const cohortsRelations = relations(cohorts, ({ many, one }) => ({
	members: many(userToCohorts),
	suborg: one(suborgs, {
		fields: [cohorts.suborgSlug],
		references: [suborgs.slug],
	}),
}));

export const userToCohorts = sqliteTable(
	"user_to_cohorts",
	(t) => ({
		cohortId: t
			.text("cohort_id")
			.notNull()
			.references(() => cohorts.id),
		userId: t
			.text("user_id")
			.notNull()
			.references(() => user.id),
	}),
	(table) => [
		primaryKey({
			columns: [table.cohortId, table.userId],
		}),
	],
);

export const userToCohortsRelations = relations(userToCohorts, ({ one }) => ({
	cohort: one(cohorts, {
		fields: [userToCohorts.cohortId],
		references: [cohorts.id],
	}),
	user: one(user, {
		fields: [userToCohorts.userId],
		references: [user.id],
	}),
}));
