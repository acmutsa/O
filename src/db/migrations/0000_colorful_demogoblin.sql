CREATE TABLE `meeting` (
	`meetingID` text(255) PRIMARY KEY NOT NULL,
	`creatorID` text NOT NULL,
	`title` text(255) NOT NULL,
	`description` text(255),
	`range_start` integer NOT NULL,
	`range_end` integer NOT NULL,
	`start_time` integer,
	`end_time` integer,
	`show_attendees` integer DEFAULT false NOT NULL,
	`location` text(255),
	`meeting_links` text DEFAULT '[]',
	`created_at` integer DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`creatorID`) REFERENCES `user`(`userID`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `meeting_invites` (
	`inviteID` integer PRIMARY KEY NOT NULL,
	`meetingID` text NOT NULL,
	`userID` text NOT NULL,
	`has_accepted` integer DEFAULT false NOT NULL,
	FOREIGN KEY (`meetingID`) REFERENCES `meeting`(`meetingID`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`userID`) REFERENCES `user`(`userID`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `position` (
	`positionID` integer PRIMARY KEY NOT NULL,
	`name` text(255) NOT NULL,
	`description` text(255)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`userID` text PRIMARY KEY NOT NULL,
	`firstName` text(255) NOT NULL,
	`lastName` text(255) NOT NULL,
	`email` text(255) NOT NULL,
	`pronouns` text(255),
	`created_at` integer DEFAULT (current_timestamp) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);--> statement-breakpoint
CREATE TABLE `users_to_positions` (
	`userID` text NOT NULL,
	`positionID` integer NOT NULL,
	PRIMARY KEY(`userID`, `positionID`),
	FOREIGN KEY (`userID`) REFERENCES `user`(`userID`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`positionID`) REFERENCES `position`(`positionID`) ON UPDATE no action ON DELETE cascade
);
