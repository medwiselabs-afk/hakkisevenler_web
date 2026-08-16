CREATE TABLE `campaigns` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`title` text NOT NULL,
	`summary` text NOT NULL,
	`description` text NOT NULL,
	`image_url` text NOT NULL,
	`category` text NOT NULL,
	`goal_amount` integer NOT NULL,
	`current_amount` integer DEFAULT 0 NOT NULL,
	`is_share_based` integer DEFAULT false NOT NULL,
	`total_shares` integer,
	`taken_shares` integer DEFAULT 0 NOT NULL,
	`is_active` integer DEFAULT true NOT NULL,
	`created_at` text DEFAULT (current_timestamp) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `donations` (
	`id` text PRIMARY KEY NOT NULL,
	`amount` integer NOT NULL,
	`status` text DEFAULT 'BEKLEMEDE' NOT NULL,
	`is_recurring` integer DEFAULT false NOT NULL,
	`is_anonymous` integer DEFAULT false NOT NULL,
	`donor_name` text,
	`donor_email` text,
	`donor_phone` text,
	`share_count` integer,
	`payment_provider` text DEFAULT 'iyzico' NOT NULL,
	`provider_payment_id` text,
	`provider_raw_result` text,
	`proof_video_url` text,
	`created_at` text DEFAULT (current_timestamp) NOT NULL,
	`updated_at` text DEFAULT (current_timestamp) NOT NULL,
	`user_id` text,
	`campaign_id` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`campaign_id`) REFERENCES `campaigns`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`password_hash` text NOT NULL,
	`full_name` text NOT NULL,
	`phone` text,
	`kvkk_consent` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT (current_timestamp) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `campaigns_slug_unique` ON `campaigns` (`slug`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);