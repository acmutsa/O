import { sqliteTable, primaryKey } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { user } from "./user.schema";

export const suborgs = sqliteTable("suborgs", (t) => ({
	slug: t.text("slug").notNull().primaryKey(),
	fullname: t.text("fullname").notNull().unique(),
	shortname: t.text("shortname").notNull().unique(),
}));

export const suborgsRelations = relations(suborgs, ({ many }) => ({
	teams: many(teams),
}));

export const teams = sqliteTable("teams", (t) => ({
	id: t.text("id").notNull().primaryKey(),
	name: t.text("name").notNull(),
	startDate: t.integer("start_date", { mode: "timestamp" }).notNull(),
	endDate: t.integer("end_date", { mode: "timestamp" }).notNull(),
	suborgSlug: t
		.text("suborg_slug")
		.notNull()
		.references(() => suborgs.slug),
}));

export const teamsRelations = relations(teams, ({ many, one }) => ({
	members: many(userToTeams),
	suborg: one(suborgs, {
		fields: [teams.suborgSlug],
		references: [suborgs.slug],
	}),
}));

export const userToTeams = sqliteTable(
	"user_to_teams",
	(t) => ({
		teamId: t
			.text("team_id")
			.notNull()
			.references(() => teams.id),
		userId: t
			.text("user_id")
			.notNull()
			.references(() => user.id),
	}),
	(table) => [
		primaryKey({
			columns: [table.teamId, table.userId],
		}),
	],
);

export const userToTeamsRelations = relations(userToTeams, ({ one }) => ({
	team: one(teams, {
		fields: [userToTeams.teamId],
		references: [teams.id],
	}),
	user: one(user, {
		fields: [userToTeams.userId],
		references: [user.id],
	}),
}));
