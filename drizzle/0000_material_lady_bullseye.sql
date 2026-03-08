CREATE TABLE `user_todo` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`changedAt` integer NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`metricOfCompletion` text
);
