CREATE TABLE "users" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"name" varchar(100) NOT NULL,
	"password_hash" varchar(255) NOT NULL,
	"totp_secret" varchar(255),
	"totp_enabled" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "clients" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"company_name" varchar(150),
	"email" varchar(255) NOT NULL,
	"phone" varchar(20) NOT NULL,
	"address" text,
	"notes" text,
	"archived_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "project_status_histories" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"project_id" bigint NOT NULL,
	"from_status" varchar(32),
	"to_status" varchar(32) NOT NULL,
	"changed_by_user_id" bigint,
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "psh_to_status_check" CHECK (to_status IN ('draft', 'quotation_sent', 'awaiting_down_payment', 'in_progress', 'client_review', 'handover_sent', 'warranty', 'completed', 'cancelled')),
	CONSTRAINT "psh_from_status_check" CHECK (from_status IS NULL OR from_status IN ('draft', 'quotation_sent', 'awaiting_down_payment', 'in_progress', 'client_review', 'handover_sent', 'warranty', 'completed', 'cancelled'))
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"client_id" bigint NOT NULL,
	"code" varchar(20) NOT NULL,
	"name" varchar(150) NOT NULL,
	"description" text,
	"status" varchar(32) DEFAULT 'draft' NOT NULL,
	"total_value" bigint,
	"revision_quota" smallint DEFAULT 0 NOT NULL,
	"warranty_days" smallint DEFAULT 0 NOT NULL,
	"started_at" timestamp with time zone,
	"deadline" timestamp with time zone,
	"completed_at" timestamp with time zone,
	"cancelled_at" timestamp with time zone,
	"cancel_reason" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "projects_code_unique" UNIQUE("code"),
	CONSTRAINT "projects_status_check" CHECK (status IN ('draft', 'quotation_sent', 'awaiting_down_payment', 'in_progress', 'client_review', 'handover_sent', 'warranty', 'completed', 'cancelled')),
	CONSTRAINT "projects_revision_quota_check" CHECK ("projects"."revision_quota" >= 0),
	CONSTRAINT "projects_warranty_days_check" CHECK ("projects"."warranty_days" >= 0),
	CONSTRAINT "projects_total_value_check" CHECK ("projects"."total_value" IS NULL OR "projects"."total_value" >= 0),
	CONSTRAINT "projects_cancel_reason_check" CHECK (("projects"."cancelled_at" IS NULL AND "projects"."cancel_reason" IS NULL) OR ("projects"."cancelled_at" IS NOT NULL AND "projects"."cancel_reason" IS NOT NULL))
);
--> statement-breakpoint
ALTER TABLE "project_status_histories" ADD CONSTRAINT "project_status_histories_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_status_histories" ADD CONSTRAINT "project_status_histories_changed_by_user_id_users_id_fk" FOREIGN KEY ("changed_by_user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_client_id_clients_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."clients"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_psh_project_id" ON "project_status_histories" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "idx_psh_changed_by_user_id" ON "project_status_histories" USING btree ("changed_by_user_id");--> statement-breakpoint
CREATE INDEX "idx_projects_client_id" ON "projects" USING btree ("client_id");--> statement-breakpoint
CREATE INDEX "idx_projects_status" ON "projects" USING btree ("status");