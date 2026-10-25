CREATE TABLE "document_decisions" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"document_version_id" bigint NOT NULL,
	"decision" varchar(20) NOT NULL,
	"decided_by_name" varchar(100) NOT NULL,
	"decided_by_title" varchar(100),
	"client_hash" char(64) NOT NULL,
	"ip_address" "inet" NOT NULL,
	"user_agent" text,
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "document_decisions_decision_check" CHECK ("document_decisions"."decision" IN ('approved', 'rejected'))
);
--> statement-breakpoint
CREATE TABLE "document_templates" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"type" varchar(32) NOT NULL,
	"template_fields" jsonb NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "document_templates_type_check" CHECK ("document_templates"."type" IN ('quotation', 'invoice', 'addendum', 'bast'))
);
--> statement-breakpoint
CREATE TABLE "document_version_items" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"document_version_id" bigint NOT NULL,
	"sort_order" smallint NOT NULL,
	"description" varchar(500) NOT NULL,
	"quantity" smallint DEFAULT 1 NOT NULL,
	"unit" varchar(20) DEFAULT 'unit' NOT NULL,
	"unit_price" bigint NOT NULL,
	"subtotal" bigint NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "dvi_quantity_check" CHECK ("document_version_items"."quantity" >= 0),
	CONSTRAINT "dvi_unit_price_check" CHECK ("document_version_items"."unit_price" >= 0),
	CONSTRAINT "dvi_subtotal_check" CHECK ("document_version_items"."subtotal" >= 0)
);
--> statement-breakpoint
CREATE TABLE "document_versions" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"document_id" bigint NOT NULL,
	"version_number" smallint NOT NULL,
	"content_snapshot" text NOT NULL,
	"content_hash" char(64) NOT NULL,
	"notes" text,
	"sent_at" timestamp with time zone,
	"rendered_pdf_path" varchar(500),
	"created_by_user_id" bigint NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "documents" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"project_id" bigint NOT NULL,
	"type" varchar(32) NOT NULL,
	"latest_version_id" bigint,
	"created_by_user_id" bigint NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "documents_type_check" CHECK ("documents"."type" IN ('quotation', 'invoice', 'addendum', 'bast'))
);
--> statement-breakpoint
ALTER TABLE "document_decisions" ADD CONSTRAINT "document_decisions_document_version_id_document_versions_id_fk" FOREIGN KEY ("document_version_id") REFERENCES "public"."document_versions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "document_version_items" ADD CONSTRAINT "document_version_items_document_version_id_document_versions_id_fk" FOREIGN KEY ("document_version_id") REFERENCES "public"."document_versions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "document_versions" ADD CONSTRAINT "document_versions_document_id_documents_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "document_versions" ADD CONSTRAINT "document_versions_created_by_user_id_users_id_fk" FOREIGN KEY ("created_by_user_id") REFERENCES "public"."users"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "documents" ADD CONSTRAINT "documents_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "documents" ADD CONSTRAINT "documents_latest_version_id_document_versions_id_fk" FOREIGN KEY ("latest_version_id") REFERENCES "public"."document_versions"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "documents" ADD CONSTRAINT "documents_created_by_user_id_users_id_fk" FOREIGN KEY ("created_by_user_id") REFERENCES "public"."users"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_document_decisions_document_version_id" ON "document_decisions" USING btree ("document_version_id");--> statement-breakpoint
CREATE INDEX "idx_dvi_document_version_id" ON "document_version_items" USING btree ("document_version_id");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_document_versions_doc_version" ON "document_versions" USING btree ("document_id","version_number");--> statement-breakpoint
CREATE INDEX "idx_document_versions_document_id" ON "document_versions" USING btree ("document_id");--> statement-breakpoint
CREATE INDEX "idx_documents_project_id" ON "documents" USING btree ("project_id");--> statement-breakpoint
CREATE OR REPLACE FUNCTION fn_freeze_document_version()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.sent_at IS NOT NULL THEN
    IF NEW.content_snapshot IS DISTINCT FROM OLD.content_snapshot
       OR NEW.content_hash IS DISTINCT FROM OLD.content_hash
       OR NEW.rendered_pdf_path IS DISTINCT FROM OLD.rendered_pdf_path THEN
      RAISE EXCEPTION 'Cannot modify frozen document version (sent_at is set)';
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
--> statement-breakpoint
CREATE TRIGGER trg_freeze_document_version
BEFORE UPDATE ON document_versions
FOR EACH ROW EXECUTE FUNCTION fn_freeze_document_version();
