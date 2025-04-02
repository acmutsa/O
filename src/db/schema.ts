import { sql, relations } from "drizzle-orm";
import { integer, sqliteTable, text, primaryKey } from "drizzle-orm/sqlite-core";

/*
  * This file defines the database schema for the application using
  * drizzle-orm with Turso (Sqlite). It includes tables for users, positions,
  * meetings, and session management for authentication. 
  *
  * The schema is designed to support a meeting management system with
  * user roles and relationships between users and meetings.
  *
  * Note: Do not modify the auth-related tables unless you know what you're doing.
*/

export const user = sqliteTable("user", {
  id: text("id").primaryKey(),
  firstName: text("first_name", { length: 255 }).notNull(),
  lastName: text("last_name", { length: 255 }).notNull(),
  email: text("email").notNull().unique(),
  pronouns: text("pronouns", { length: 255 }),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .default(sql`(current_timestamp)`),
  emailVerified: integer("email_verified", { mode: "boolean" }).notNull(),
  image: text("image"),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
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
    .references(() => user.id, { onDelete: "cascade" }),
  positionID: integer("positionID")
    .notNull()
    .references(() => position.positionID, { onDelete: "cascade" }),
},
(table)=>[
  primaryKey(
    {
      columns:[
      table.userID, 
      table.positionID
    ]
  }
)
]);

export const usersToPositionsRelations = relations(usersToPositions, ({ one }) => ({
  user: one(user, {
    fields: [usersToPositions.userID],
    references: [user.id],
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
    .references(() => user.id, { onDelete: "cascade" }),
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
    references: [user.id],
  }),
  attendees: many(meetingInvites),
}));


export const meetingInvites = sqliteTable("meeting_invites", {
  inviteID:integer("inviteID").primaryKey(),
  meetingID: text("meetingID").notNull()
    .references(() => meeting.meetingID, { onDelete: "cascade" }),
  id: text("id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
    hasAccepted: integer("has_accepted",{mode:"boolean"}).notNull().default(false),
});

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


// AUTH STUFF - DO NOT MODIFY

export const session = sqliteTable("session", {
  id: text("id").primaryKey(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  token: text("token").notNull().unique(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = sqliteTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: integer("access_token_expires_at", {
    mode: "timestamp",
  }),
  refreshTokenExpiresAt: integer("refresh_token_expires_at", {
    mode: "timestamp",
  }),
  scope: text("scope"),
  password: text("password"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const verification = sqliteTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }),
  updatedAt: integer("updated_at", { mode: "timestamp" }),
});
