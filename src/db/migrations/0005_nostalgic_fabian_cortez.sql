ALTER TABLE "users" DROP CONSTRAINT "users_email_unique";--> statement-breakpoint
ALTER TABLE "document_version_items" DROP CONSTRAINT "dvi_subtotal_check";--> statement-breakpoint
ALTER TABLE "document_version_items" DROP CONSTRAINT "dvi_quantity_check";--> statement-breakpoint
ALTER TABLE "installments" DROP CONSTRAINT "installments_amount_check";--> statement-breakpoint
ALTER TABLE "invoices" DROP CONSTRAINT "invoices_amount_check";--> statement-breakpoint
ALTER TABLE "payments" DROP CONSTRAINT "payments_amount_check";--> statement-breakpoint
ALTER TABLE "files" DROP CONSTRAINT "files_size_bytes_check";--> statement-breakpoint
ALTER TABLE "document_decisions" DROP CONSTRAINT "document_decisions_document_version_id_document_versions_id_fk";
--> statement-breakpoint
ALTER TABLE "document_versions" DROP CONSTRAINT "document_versions_document_id_documents_id_fk";
--> statement-breakpoint
ALTER TABLE "documents" DROP CONSTRAINT "documents_project_id_projects_id_fk";
--> statement-breakpoint
ALTER TABLE "installments" DROP CONSTRAINT "installments_project_id_projects_id_fk";
--> statement-breakpoint
ALTER TABLE "payments" DROP CONSTRAINT "payments_invoice_id_invoices_id_fk";
--> statement-breakpoint
ALTER TABLE "activity_logs" DROP CONSTRAINT "activity_logs_project_id_projects_id_fk";
--> statement-breakpoint
DROP INDEX "idx_portal_links_token_hash";--> statement-breakpoint
DROP INDEX "idx_portal_sessions_session_token_hash";--> statement-breakpoint
DROP INDEX "idx_document_versions_document_id";--> statement-breakpoint
DROP INDEX "idx_installments_project_id";--> statement-breakpoint
DROP INDEX "idx_activity_logs_project_id";--> statement-breakpoint
ALTER TABLE "document_decisions" ALTER COLUMN "user_agent" SET NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX "uq_document_versions_id_hash" ON "document_versions" USING btree ("id","content_hash");--> statement-breakpoint
ALTER TABLE "document_decisions" ADD CONSTRAINT "document_decisions_version_hash_fk" FOREIGN KEY ("document_version_id","client_hash") REFERENCES "public"."document_versions"("id","content_hash") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "document_decisions" ADD CONSTRAINT "document_decisions_document_version_id_document_versions_id_fk" FOREIGN KEY ("document_version_id") REFERENCES "public"."document_versions"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "document_versions" ADD CONSTRAINT "document_versions_document_id_documents_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."documents"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "documents" ADD CONSTRAINT "documents_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "installments" ADD CONSTRAINT "installments_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_invoice_id_invoices_id_fk" FOREIGN KEY ("invoice_id") REFERENCES "public"."invoices"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "activity_logs" ADD CONSTRAINT "activity_logs_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_portal_links_project_id" ON "portal_links" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "idx_portal_links_created_by" ON "portal_links" USING btree ("created_by_user_id");--> statement-breakpoint
CREATE INDEX "idx_portal_sessions_portal_link_id" ON "portal_sessions" USING btree ("portal_link_id");--> statement-breakpoint
CREATE UNIQUE INDEX "uq_users_email_lower" ON "users" USING btree (lower("email"));--> statement-breakpoint
CREATE UNIQUE INDEX "uq_document_decisions_one_approval" ON "document_decisions" USING btree ("document_version_id") WHERE "document_decisions"."decision" = 'approved';--> statement-breakpoint
CREATE UNIQUE INDEX "uq_dvi_version_sort" ON "document_version_items" USING btree ("document_version_id","sort_order");--> statement-breakpoint
CREATE INDEX "idx_document_versions_created_by" ON "document_versions" USING btree ("created_by_user_id");--> statement-breakpoint
CREATE INDEX "idx_documents_latest_version_id" ON "documents" USING btree ("latest_version_id");--> statement-breakpoint
CREATE INDEX "idx_documents_created_by" ON "documents" USING btree ("created_by_user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "uq_installments_project_number" ON "installments" USING btree ("project_id","installment_number");--> statement-breakpoint
CREATE UNIQUE INDEX "uq_invoices_installment_live" ON "invoices" USING btree ("installment_id") WHERE "invoices"."status" <> 'cancelled';--> statement-breakpoint
CREATE INDEX "idx_payments_verified_by" ON "payments" USING btree ("verified_by_user_id");--> statement-breakpoint
CREATE INDEX "idx_activity_logs_project_created" ON "activity_logs" USING btree ("project_id","created_at" DESC NULLS LAST);--> statement-breakpoint
CREATE INDEX "idx_activity_logs_entity" ON "activity_logs" USING btree ("entity_type","entity_id");--> statement-breakpoint
CREATE UNIQUE INDEX "uq_files_storage_path" ON "files" USING btree ("storage_path");--> statement-breakpoint
ALTER TABLE "portal_links" ADD CONSTRAINT "pl_token_hash_hex" CHECK ("portal_links"."token_hash" ~ '^[0-9a-f]{64}$');--> statement-breakpoint
ALTER TABLE "portal_links" ADD CONSTRAINT "pl_failed_attempts_check" CHECK ("portal_links"."failed_attempts" BETWEEN 0 AND 5);--> statement-breakpoint
ALTER TABLE "portal_links" ADD CONSTRAINT "pl_lockout_count_check" CHECK ("portal_links"."lockout_count" BETWEEN 0 AND 3);--> statement-breakpoint
ALTER TABLE "portal_links" ADD CONSTRAINT "pl_expiry_check" CHECK ("portal_links"."expires_at" > "portal_links"."created_at");--> statement-breakpoint
ALTER TABLE "portal_sessions" ADD CONSTRAINT "ps_session_token_hash_hex" CHECK ("portal_sessions"."session_token_hash" ~ '^[0-9a-f]{64}$');--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_totp_secret_check" CHECK (NOT "users"."totp_enabled" OR "users"."totp_secret" IS NOT NULL);--> statement-breakpoint
ALTER TABLE "clients" ADD CONSTRAINT "clients_email_lower" CHECK ("clients"."email" = lower("clients"."email"));--> statement-breakpoint
ALTER TABLE "project_status_histories" ADD CONSTRAINT "psh_distinct_check" CHECK ("project_status_histories"."from_status" IS DISTINCT FROM "project_status_histories"."to_status");--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_cancelled_state" CHECK (("projects"."status" = 'cancelled') = ("projects"."cancelled_at" IS NOT NULL));--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_completed_state" CHECK (("projects"."status" = 'completed') = ("projects"."completed_at" IS NOT NULL));--> statement-breakpoint
ALTER TABLE "document_decisions" ADD CONSTRAINT "dd_client_hash_hex" CHECK ("document_decisions"."client_hash" ~ '^[0-9a-f]{64}$');--> statement-breakpoint
ALTER TABLE "document_version_items" ADD CONSTRAINT "dvi_subtotal_math" CHECK ("document_version_items"."subtotal" = "document_version_items"."quantity"::bigint * "document_version_items"."unit_price");--> statement-breakpoint
ALTER TABLE "document_version_items" ADD CONSTRAINT "dvi_quantity_check" CHECK ("document_version_items"."quantity" > 0);--> statement-breakpoint
ALTER TABLE "document_versions" ADD CONSTRAINT "dv_content_hash_hex" CHECK ("document_versions"."content_hash" ~ '^[0-9a-f]{64}$');--> statement-breakpoint
ALTER TABLE "document_versions" ADD CONSTRAINT "dv_version_number_positive" CHECK ("document_versions"."version_number" > 0);--> statement-breakpoint
ALTER TABLE "installments" ADD CONSTRAINT "installments_amount_check" CHECK ("installments"."amount" > 0);--> statement-breakpoint
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_paid_state" CHECK (("invoices"."status" = 'paid') = ("invoices"."paid_at" IS NOT NULL));--> statement-breakpoint
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_due_after_issue" CHECK ("invoices"."due_at" >= "invoices"."issued_at");--> statement-breakpoint
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_amount_check" CHECK ("invoices"."amount" > 0);--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_state_check" CHECK (("payments"."status" = 'verified' AND "payments"."verified_at" IS NOT NULL AND "payments"."verified_by_user_id" IS NOT NULL)
          OR ("payments"."status" = 'rejected' AND "payments"."rejection_reason" IS NOT NULL)
          OR ("payments"."status" = 'pending' AND "payments"."verified_at" IS NULL));--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_amount_check" CHECK ("payments"."amount" > 0);--> statement-breakpoint
ALTER TABLE "activity_logs" ADD CONSTRAINT "activity_logs_system_actor_check" CHECK ("activity_logs"."actor_type" <> 'system' OR "activity_logs"."actor_id" IS NULL);--> statement-breakpoint
ALTER TABLE "files" ADD CONSTRAINT "files_mime_type_check" CHECK ("files"."mime_type" IN ('image/jpeg', 'image/png', 'image/webp', 'application/pdf'));--> statement-breakpoint
ALTER TABLE "files" ADD CONSTRAINT "files_uploaded_by_check" CHECK ("files"."uploaded_by" IN ('admin', 'client', 'system'));--> statement-breakpoint
ALTER TABLE "files" ADD CONSTRAINT "files_size_bytes_check" CHECK ("files"."size_bytes" BETWEEN 1 AND 5242880);--> statement-breakpoint
-- Strengthen freeze: once sent_at is set, NO field of a version may change
-- (including clearing sent_at, which previously bypassed the guard).
CREATE OR REPLACE FUNCTION fn_freeze_document_version()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.sent_at IS NOT NULL THEN
    IF NEW.sent_at IS DISTINCT FROM OLD.sent_at
       OR NEW.document_id IS DISTINCT FROM OLD.document_id
       OR NEW.version_number IS DISTINCT FROM OLD.version_number
       OR NEW.created_by_user_id IS DISTINCT FROM OLD.created_by_user_id
       OR NEW.content_snapshot IS DISTINCT FROM OLD.content_snapshot
       OR NEW.content_hash IS DISTINCT FROM OLD.content_hash
       OR NEW.rendered_pdf_path IS DISTINCT FROM OLD.rendered_pdf_path THEN
      RAISE EXCEPTION 'Cannot modify frozen document version (sent_at is set)';
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
--> statement-breakpoint
-- Block deleting a frozen version (preserves the approval audit trail).
CREATE OR REPLACE FUNCTION fn_block_frozen_version_delete()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.sent_at IS NOT NULL THEN
    RAISE EXCEPTION 'Cannot delete frozen document version (sent_at is set)';
  END IF;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;
--> statement-breakpoint
CREATE TRIGGER trg_block_frozen_version_delete
BEFORE DELETE ON document_versions
FOR EACH ROW EXECUTE FUNCTION fn_block_frozen_version_delete();
--> statement-breakpoint
-- Items of a frozen version are immutable (INSERT/UPDATE/DELETE blocked).
CREATE OR REPLACE FUNCTION fn_freeze_version_items()
RETURNS TRIGGER AS $$
DECLARE v_sent timestamptz;
BEGIN
  SELECT sent_at INTO v_sent FROM document_versions
   WHERE id = COALESCE(NEW.document_version_id, OLD.document_version_id);
  IF v_sent IS NOT NULL THEN
    RAISE EXCEPTION 'Cannot modify items of frozen document version';
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;
--> statement-breakpoint
CREATE TRIGGER trg_freeze_version_items
BEFORE INSERT OR UPDATE OR DELETE ON document_version_items
FOR EACH ROW EXECUTE FUNCTION fn_freeze_version_items();
--> statement-breakpoint
-- document_decisions are append-only (approval proof must not change).
CREATE OR REPLACE FUNCTION fn_protect_document_decisions()
RETURNS TRIGGER AS $$
BEGIN
  RAISE EXCEPTION 'document_decisions is append-only: % not allowed', TG_OP;
END;
$$ LANGUAGE plpgsql;
--> statement-breakpoint
CREATE TRIGGER trg_protect_document_decisions_update
BEFORE UPDATE ON document_decisions
FOR EACH ROW EXECUTE FUNCTION fn_protect_document_decisions();
--> statement-breakpoint
CREATE TRIGGER trg_protect_document_decisions_delete
BEFORE DELETE ON document_decisions
FOR EACH ROW EXECUTE FUNCTION fn_protect_document_decisions();
