CREATE TABLE `extensions` (
	`id` text PRIMARY KEY NOT NULL,
	`repo_full_name` text NOT NULL,
	`repo_url` text NOT NULL,
	`directory` text,
	`commit_sha` text,
	`name` text NOT NULL,
	`author` text DEFAULT '' NOT NULL,
	`title` text NOT NULL,
	`description` text DEFAULT '' NOT NULL,
	`icon` text,
	`version` text DEFAULT '0.0.0' NOT NULL,
	`homepage` text,
	`install_count` integer DEFAULT 0 NOT NULL,
	`stars` integer DEFAULT 0 NOT NULL,
	`topics` text DEFAULT '[]' NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
