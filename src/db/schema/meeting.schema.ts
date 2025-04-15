import { sqliteTable } from "drizzle-orm/sqlite-core";
import { relations, sql } from "drizzle-orm";
import { user } from "../schema";

export const meeting = sqliteTable("meeting", (t) => ({
	meetingID: t.text("meetingID", { length: 255 }).primaryKey(),
	creatorID: t
		.text("creatorID")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	title: t.text("title", { length: 255 }).notNull(),
	description: t.text("description", { length: 255 }),
	rangeStart: t.integer("range_start", { mode: "timestamp_ms" }).notNull(),
	rangeEnd: t.integer("range_end", { mode: "timestamp_ms" }).notNull(),
	startTime: t.integer("start_time", { mode: "timestamp_ms" }),
	endTime: t.integer("end_time", { mode: "timestamp_ms" }),
	showAttendees: t
		.integer("show_attendees", { mode: "boolean" })
		.notNull()
		.default(false),
	location: t.text("location", { length: 255 }),
	meetingLinks: t
		.text("meeting_links", { mode: "json" })
		.$type<string[]>()
		.default([]),
	createdAt: t
		.integer("created_at", { mode: "timestamp_ms" })
		.notNull()
		.default(sql`(current_timestamp)`),
}));

export const meetingRelations = relations(meeting, ({ one, many }) => ({
	creator: one(user, {
		fields: [meeting.creatorID],
		references: [user.id],
	}),
	attendees: many(meetingInvites),
}));

export const meetingInvites = sqliteTable("meeting_invites", (t) => ({
	inviteID: t.integer("inviteID").primaryKey(),
	meetingID: t
		.text("meetingID")
		.notNull()
		.references(() => meeting.meetingID, { onDelete: "cascade" }),
	id: t
		.text("id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	hasAccepted: t
		.integer("has_accepted", { mode: "boolean" })
		.notNull()
		.default(false),
}));

export const meetingInvitesRelations = relations(meetingInvites, ({ one }) => ({
	meeting: one(meeting, {
		fields: [meetingInvites.meetingID],
		references: [meeting.meetingID],
	}),
	user: one(user, {
		fields: [meetingInvites.id],
		references: [user.id],
	}),
}));
