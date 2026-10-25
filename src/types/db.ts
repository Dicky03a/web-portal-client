/**
 * Row types inferred from the Drizzle schema (Task 2.8).
 *
 * `*Row` = selected row (InferSelectModel). `New*` = insert shape
 * (InferInsertModel, with defaults/optionals). Import these instead of
 * reaching into the schema modules from app code.
 */

import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';

import type {
  bankAccounts,
  installments,
  invoices,
  numberSequences,
  payments,
} from '@/db/schema/billing';
import type { activityLogs, files } from '@/db/schema/common';
import type {
  documentDecisions,
  documentTemplates,
  documentVersionItems,
  documentVersions,
  documents,
} from '@/db/schema/document';
import type { portalLinks, portalSessions, users } from '@/db/schema/portal';
import type { clients, projectStatusHistories, projects } from '@/db/schema/project';

export type UserRow = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;

export type ClientRow = InferSelectModel<typeof clients>;
export type NewClient = InferInsertModel<typeof clients>;

export type ProjectRow = InferSelectModel<typeof projects>;
export type NewProject = InferInsertModel<typeof projects>;

export type ProjectStatusHistoryRow = InferSelectModel<typeof projectStatusHistories>;
export type NewProjectStatusHistory = InferInsertModel<typeof projectStatusHistories>;

export type DocumentRow = InferSelectModel<typeof documents>;
export type NewDocument = InferInsertModel<typeof documents>;

export type DocumentVersionRow = InferSelectModel<typeof documentVersions>;
export type NewDocumentVersion = InferInsertModel<typeof documentVersions>;

export type DocumentVersionItemRow = InferSelectModel<typeof documentVersionItems>;
export type NewDocumentVersionItem = InferInsertModel<typeof documentVersionItems>;

export type DocumentDecisionRow = InferSelectModel<typeof documentDecisions>;
export type NewDocumentDecision = InferInsertModel<typeof documentDecisions>;

export type DocumentTemplateRow = InferSelectModel<typeof documentTemplates>;
export type NewDocumentTemplate = InferInsertModel<typeof documentTemplates>;

export type InstallmentRow = InferSelectModel<typeof installments>;
export type NewInstallment = InferInsertModel<typeof installments>;

export type InvoiceRow = InferSelectModel<typeof invoices>;
export type NewInvoice = InferInsertModel<typeof invoices>;

export type PaymentRow = InferSelectModel<typeof payments>;
export type NewPayment = InferInsertModel<typeof payments>;

export type BankAccountRow = InferSelectModel<typeof bankAccounts>;
export type NewBankAccount = InferInsertModel<typeof bankAccounts>;

export type NumberSequenceRow = InferSelectModel<typeof numberSequences>;
export type NewNumberSequence = InferInsertModel<typeof numberSequences>;

export type PortalLinkRow = InferSelectModel<typeof portalLinks>;
export type NewPortalLink = InferInsertModel<typeof portalLinks>;

export type PortalSessionRow = InferSelectModel<typeof portalSessions>;
export type NewPortalSession = InferInsertModel<typeof portalSessions>;

export type FileRow = InferSelectModel<typeof files>;
export type NewFile = InferInsertModel<typeof files>;

export type ActivityLogRow = InferSelectModel<typeof activityLogs>;
export type NewActivityLog = InferInsertModel<typeof activityLogs>;
