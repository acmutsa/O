CREATE TABLE `account` (
	`id` text PRIMARY KEY NOT NULL,
	`account_id` text NOT NULL,
	`provider_id` text NOT NULL,
	`user_id` text NOT NULL,
	`access_token` text,
	`refresh_token` text,
	`id_token` text,
	`access_token_expires_at` integer,
	`refresh_token_expires_at` integer,
	`scope` text,
	`password` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
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
	FOREIGN KEY (`creatorID`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `meeting_invites` (
	`inviteID` integer PRIMARY KEY NOT NULL,
	`meetingID` text NOT NULL,
	`id` text NOT NULL,
	`has_accepted` integer DEFAULT false NOT NULL,
	FOREIGN KEY (`meetingID`) REFERENCES `meeting`(`meetingID`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `position` (
	`positionID` integer PRIMARY KEY NOT NULL,
	`name` text(255) NOT NULL,
	`description` text(255)
);
--> statement-breakpoint
CREATE TABLE `session` (
	`id` text PRIMARY KEY NOT NULL,
	`expires_at` integer NOT NULL,
	`token` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`ip_address` text,
	`user_agent` text,
	`user_id` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `session_token_unique` ON `session` (`token`);--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`first_name` text(255) NOT NULL,
	`last_name` text(255) NOT NULL,
	`email` text NOT NULL,
	`pronouns` text(255),
	`created_at` integer DEFAULT (current_timestamp) NOT NULL,
	`email_verified` integer NOT NULL,
	`image` text,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);--> statement-breakpoint
CREATE TABLE `users_to_positions` (
	`userID` text NOT NULL,
	`positionID` integer NOT NULL,
	PRIMARY KEY(`userID`, `positionID`),
	FOREIGN KEY (`userID`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`positionID`) REFERENCES `position`(`positionID`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `verification` (
	`id` text PRIMARY KEY NOT NULL,
	`identifier` text NOT NULL,
	`value` text NOT NULL,
	`expires_at` integer NOT NULL,
	`created_at` integer,
	`updated_at` integer
);
