import { sql, relations } from "drizzle-orm";
import { integer, sqliteTable, text, primaryKey } from "drizzle-orm/sqlite-core";

export const user = sqliteTable("user", {
  userID: text("userID").primaryKey(),
  firstName: text("firstName", { length: 255 }).notNull(),
  lastName: text("lastName", { length: 255 }).notNull(),
  email: text("email", { length: 255 }).unique().notNull(),
  pronouns: text("pronouns", { length: 255 }),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .default(sql`(current_timestamp)`),
});

export const userRelations = relations(user, ({ one,many }) => ({
  userToPositions:many(usersToPositions),
  meetingsCreated:many(meeting),
  meetingInvites: many(meetingInvites),
}));


export const position = sqliteTable("position", {
  positionID: integer("positionID").primaryKey(),
  name: text("name", { length: 255 }).notNull(),
  description: text("description", { length: 255 }),
});

export const positionRelations = relations(position, ({ many }) => ({
  usersToPositions: many(usersToPositions),
}));


export const usersToPositions = sqliteTable("users_to_positions", {
  userID: text("userID")
    .notNull()
    .references(() => user.userID, { onDelete: "cascade" }),
  positionID: integer("positionID")
    .notNull()
    .references(() => position.positionID, { onDelete: "cascade" }),
},
(table)=>[primaryKey({columns:[table.userID, table.positionID]})]);

export const usersToPositionsRelations = relations(usersToPositions, ({ one }) => ({
  user: one(user, {
    fields: [usersToPositions.userID],
    references: [user.userID],
  }),
  position: one(position, {
    fields: [usersToPositions.positionID],
    references: [position.positionID],
  }),
}));

export const meeting = sqliteTable("meeting", {
  meetingID: text("meetingID", { length: 255 }).primaryKey(),
  creatorID: text("creatorID")
    .notNull()
    .references(() => user.userID, { onDelete: "cascade" }),
  title: text("title", { length: 255 }).notNull(),
  description: text("description", { length: 255 }),
  rangeStart: integer("range_start", { mode: "timestamp_ms" }).notNull(),
  rangeEnd: integer("range_end", { mode: "timestamp_ms" }).notNull(),
  startTime: integer("start_time", { mode: "timestamp_ms" }),
  endTime: integer("end_time", { mode: "timestamp_ms" }),
  showAttendees: integer("show_attendees",{mode:"boolean"}).notNull().default(false),
  location: text("location", { length: 255 }),
  meetingLinks:text("meeting_links", { mode:"json" }).$type<string[]>().default([]),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .default(sql`(current_timestamp)`),
});

export const meetingRelations = relations(meeting, ({ one, many }) => ({
  creator: one(user, {
    fields: [meeting.creatorID],
    references: [user.userID],
  }),
  attendees: many(meetingInvites),
}));


export const meetingInvites = sqliteTable("meeting_invites", {
  inviteID:integer("inviteID").primaryKey(),
  meetingID: text("meetingID").notNull()
    .references(() => meeting.meetingID, { onDelete: "cascade" }),
  userID: text("userID")
    .notNull()
    .references(() => user.userID, { onDelete: "cascade" }),
    hasAccepted: integer("has_accepted",{mode:"boolean"}).notNull().default(false),
});

export const meetingInvitesRelations = relations(meetingInvites, ({ one }) => ({
  meeting: one(meeting, {
    fields: [meetingInvites.meetingID],
    references: [meeting.meetingID],
  }),
  user: one(user, {
    fields: [meetingInvites.userID],
    references: [user.userID],
  }),
}));