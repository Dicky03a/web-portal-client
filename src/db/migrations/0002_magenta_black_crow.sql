CREATE TABLE "bank_accounts" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"bank_name" varchar(100) NOT NULL,
	"account_number" varchar(30) NOT NULL,
	"account_holder" varchar(100) NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "installments" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"project_id" bigint NOT NULL,
	"installment_number" smallint NOT NULL,
	"label" varchar(100) NOT NULL,
	"percentage_basis_points" smallint NOT NULL,
	"amount" bigint NOT NULL,
	"due_on" date,
	"paid_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "installments_basis_points_check" CHECK ("installments"."percentage_basis_points" >= 0 AND "installments"."percentage_basis_points" <= 10000),
	CONSTRAINT "installments_amount_check" CHECK ("installments"."amount" >= 0)
);
--> statement-breakpoint
CREATE TABLE "invoices" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"installment_id" bigint NOT NULL,
	"invoice_number" varchar(30) NOT NULL,
	"amount" bigint NOT NULL,
	"issued_at" timestamp with time zone DEFAULT now() NOT NULL,
	"due_at" timestamp with time zone NOT NULL,
	"paid_at" timestamp with time zone,
	"status" varchar(20) DEFAULT 'unpaid' NOT NULL,
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "invoices_invoice_number_unique" UNIQUE("invoice_number"),
	CONSTRAINT "invoices_amount_check" CHECK ("invoices"."amount" >= 0),
	CONSTRAINT "invoices_status_check" CHECK ("invoices"."status" IN ('unpaid', 'pending_verification', 'paid', 'cancelled'))
);
--> statement-breakpoint
CREATE TABLE "number_sequences" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"prefix" varchar(10) NOT NULL,
	"year" smallint NOT NULL,
	"last_value" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "number_sequences_last_value_check" CHECK ("number_sequences"."last_value" >= 0)
);
--> statement-breakpoint
CREATE TABLE "payments" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"invoice_id" bigint NOT NULL,
	"amount" bigint NOT NULL,
	"payment_method" varchar(30) NOT NULL,
	"payment_date" date NOT NULL,
	"reference_number" varchar(100),
	"proof_file_path" varchar(500),
	"status" varchar(20) DEFAULT 'pending' NOT NULL,
	"verified_by_user_id" bigint,
	"verified_at" timestamp with time zone,
	"rejection_reason" text,
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "payments_amount_check" CHECK ("payments"."amount" >= 0),
	CONSTRAINT "payments_status_check" CHECK ("payments"."status" IN ('pending', 'verified', 'rejected'))
);
--> statement-breakpoint
ALTER TABLE "installments" ADD CONSTRAINT "installments_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_installment_id_installments_id_fk" FOREIGN KEY ("installment_id") REFERENCES "public"."installments"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_invoice_id_invoices_id_fk" FOREIGN KEY ("invoice_id") REFERENCES "public"."invoices"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_verified_by_user_id_users_id_fk" FOREIGN KEY ("verified_by_user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_installments_project_id" ON "installments" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "idx_invoices_installment_id" ON "invoices" USING btree ("installment_id");--> statement-breakpoint
CREATE INDEX "idx_invoices_status" ON "invoices" USING btree ("status");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_number_sequences_prefix_year" ON "number_sequences" USING btree ("prefix","year");--> statement-breakpoint
CREATE INDEX "idx_payments_invoice_id" ON "payments" USING btree ("invoice_id");--> statement-breakpoint
CREATE INDEX "idx_payments_status" ON "payments" USING btree ("status");