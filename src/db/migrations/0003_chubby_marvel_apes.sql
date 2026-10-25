CREATE TABLE "portal_links" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"project_id" bigint NOT NULL,
	"token_hash" char(64) NOT NULL,
	"encrypted_token" text NOT NULL,
	"pin_hash" varchar(255) NOT NULL,
	"is_pin_changed" boolean DEFAULT false NOT NULL,
	"failed_attempts" smallint DEFAULT 0 NOT NULL,
	"locked_until" timestamp with time zone,
	"lockout_count" smallint DEFAULT 0 NOT NULL,
	"revoked_at" timestamp with time zone,
	"expires_at" timestamp with time zone NOT NULL,
	"created_by_user_id" bigint NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "portal_links_token_hash_unique" UNIQUE("token_hash")
);
--> statement-breakpoint
CREATE TABLE "portal_sessions" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"portal_link_id" bigint NOT NULL,
	"session_token_hash" char(64) NOT NULL,
	"ip_address" "inet" NOT NULL,
	"user_agent" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "portal_sessions_session_token_hash_unique" UNIQUE("session_token_hash")
);
--> statement-breakpoint
CREATE TABLE "activity_logs" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"project_id" bigint,
	"actor_type" varchar(20) NOT NULL,
	"actor_id" bigint,
	"action" varchar(100) NOT NULL,
	"entity_type" varchar(50) NOT NULL,
	"entity_id" bigint,
	"metadata" jsonb,
	"ip_address" "inet",
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "activity_logs_actor_type_check" CHECK ("activity_logs"."actor_type" IN ('admin', 'client', 'system'))
);
--> statement-breakpoint
CREATE TABLE "files" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"project_id" bigint,
	"filename" varchar(255) NOT NULL,
	"original_name" varchar(255) NOT NULL,
	"mime_type" varchar(100) NOT NULL,
	"size_bytes" integer NOT NULL,
	"storage_path" varchar(500) NOT NULL,
	"uploaded_by" varchar(50) DEFAULT 'admin' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "files_size_bytes_check" CHECK ("files"."size_bytes" >= 0)
);
--> statement-breakpoint
ALTER TABLE "portal_links" ADD CONSTRAINT "portal_links_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "portal_links" ADD CONSTRAINT "portal_links_created_by_user_id_users_id_fk" FOREIGN KEY ("created_by_user_id") REFERENCES "public"."users"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "portal_sessions" ADD CONSTRAINT "portal_sessions_portal_link_id_portal_links_id_fk" FOREIGN KEY ("portal_link_id") REFERENCES "public"."portal_links"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "activity_logs" ADD CONSTRAINT "activity_logs_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "files" ADD CONSTRAINT "files_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "idx_portal_links_active_project" ON "portal_links" USING btree ("project_id") WHERE "portal_links"."revoked_at" IS NULL;--> statement-breakpoint
CREATE INDEX "idx_portal_links_token_hash" ON "portal_links" USING btree ("token_hash");--> statement-breakpoint
CREATE INDEX "idx_portal_sessions_session_token_hash" ON "portal_sessions" USING btree ("session_token_hash");--> statement-breakpoint
CREATE INDEX "idx_activity_logs_project_id" ON "activity_logs" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "idx_files_project_id" ON "files" USING btree ("project_id");--> statement-breakpoint
CREATE OR REPLACE FUNCTION fn_protect_activity_logs()
RETURNS TRIGGER AS $$
BEGIN
  RAISE EXCEPTION 'activity_logs is append-only: % not allowed', TG_OP;
END;
$$ LANGUAGE plpgsql;
--> statement-breakpoint
CREATE TRIGGER trg_protect_activity_logs_update
BEFORE UPDATE ON activity_logs
FOR EACH ROW EXECUTE FUNCTION fn_protect_activity_logs();
--> statement-breakpoint
CREATE TRIGGER trg_protect_activity_logs_delete
BEFORE DELETE ON activity_logs
FOR EACH ROW EXECUTE FUNCTION fn_protect_activity_logs();
