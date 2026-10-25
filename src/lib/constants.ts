/**
 * Domain enums and the project state machine's allowed transitions.
 *
 * `PROJECT_STATUSES` is the single source of truth for the 9 lifecycle
 * statuses. `TRANSITIONS` maps each status to the statuses it may move to;
 * terminal states map to `[]`. Action-level transition validation (which
 * action triggers which move) lives in `project-lifecycle.service.ts`.
 * See portal-proyek-design.md §4 and implementation-standards.md §2.
 */

export const PROJECT_STATUSES = [
  "draft",
  "quotation_sent",
  "awaiting_down_payment",
  "in_progress",
  "client_review",
  "handover_sent",
  "warranty",
  "completed",
  "cancelled",
] as const;

export type ProjectStatus = (typeof PROJECT_STATUSES)[number];

/** Allowed next statuses per current status. */
export const TRANSITIONS: Record<ProjectStatus, readonly ProjectStatus[]> = {
  draft: ["quotation_sent", "cancelled"],
  quotation_sent: ["awaiting_down_payment", "cancelled"],
  awaiting_down_payment: ["in_progress", "cancelled"],
  in_progress: ["client_review", "cancelled"],
  client_review: ["in_progress", "handover_sent"],
  handover_sent: ["client_review", "warranty"],
  warranty: ["completed"],
  completed: [],
  cancelled: [],
};

/** Document kinds. Quotation is MVP; addendum and BAST land in later iterations. */
export const DOCUMENT_TYPES = ["quotation", "addendum", "bast"] as const;
export type DocumentType = (typeof DOCUMENT_TYPES)[number];

/**
 * Payment methods for recorded payments (`payments.payment_method`, varchar(30)).
 * Provisional set — the spec does not enumerate these; adjust when billing is
 * finalized (Task 2.4).
 */
export const PAYMENT_METHODS = [
  "bank_transfer",
  "cash",
  "qris",
  "other",
] as const;
export type PaymentMethod = (typeof PAYMENT_METHODS)[number];
