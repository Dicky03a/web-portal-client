/**
 * Drizzle `relations()` for all domain tables (Task 2.8).
 *
 * Relations are query-time sugar for `db.query.*.findMany({ with: ... })`;
 * they do not change the SQL schema. Where two tables are linked more than
 * once (documents has both `versions` and a `latest_version` pointer), each
 * pair carries an explicit `relationName` to disambiguate.
 */

import { relations } from 'drizzle-orm';

import { bankAccounts, installments, invoices, numberSequences, payments } from './billing';
import { activityLogs, files } from './common';
import {
  documentDecisions,
  documentTemplates,
  documentVersionItems,
  documentVersions,
  documents,
} from './document';
import { portalLinks, portalSessions, users } from './portal';
import { clients, projectStatusHistories, projects } from './project';

export const usersRelations = relations(users, ({ many }) => ({
  documents: many(documents),
  documentVersions: many(documentVersions),
  portalLinks: many(portalLinks),
  verifiedPayments: many(payments),
  statusChanges: many(projectStatusHistories),
}));

export const clientsRelations = relations(clients, ({ many }) => ({
  projects: many(projects),
}));

export const projectsRelations = relations(projects, ({ one, many }) => ({
  client: one(clients, { fields: [projects.clientId], references: [clients.id] }),
  statusHistories: many(projectStatusHistories),
  documents: many(documents),
  installments: many(installments),
  portalLinks: many(portalLinks),
  files: many(files),
  activityLogs: many(activityLogs),
}));

export const projectStatusHistoriesRelations = relations(projectStatusHistories, ({ one }) => ({
  project: one(projects, {
    fields: [projectStatusHistories.projectId],
    references: [projects.id],
  }),
  changedByUser: one(users, {
    fields: [projectStatusHistories.changedByUserId],
    references: [users.id],
  }),
}));

export const documentsRelations = relations(documents, ({ one, many }) => ({
  project: one(projects, { fields: [documents.projectId], references: [projects.id] }),
  createdByUser: one(users, { fields: [documents.createdByUserId], references: [users.id] }),
  // `latest_version_id` is a plain FK column; no relations() helper for it
  // (the inverse one()-without-fields is unsupported in this drizzle version).
  versions: many(documentVersions),
}));

export const documentVersionsRelations = relations(documentVersions, ({ one, many }) => ({
  document: one(documents, {
    fields: [documentVersions.documentId],
    references: [documents.id],
  }),
  createdByUser: one(users, {
    fields: [documentVersions.createdByUserId],
    references: [users.id],
  }),
  items: many(documentVersionItems),
  decisions: many(documentDecisions),
}));

export const documentVersionItemsRelations = relations(documentVersionItems, ({ one }) => ({
  documentVersion: one(documentVersions, {
    fields: [documentVersionItems.documentVersionId],
    references: [documentVersions.id],
  }),
}));

export const documentDecisionsRelations = relations(documentDecisions, ({ one }) => ({
  documentVersion: one(documentVersions, {
    fields: [documentDecisions.documentVersionId],
    references: [documentVersions.id],
  }),
}));

// document_templates has no FK relations.
export const documentTemplatesRelations = relations(documentTemplates, () => ({}));

export const installmentsRelations = relations(installments, ({ one, many }) => ({
  project: one(projects, { fields: [installments.projectId], references: [projects.id] }),
  invoices: many(invoices),
}));

export const invoicesRelations = relations(invoices, ({ one, many }) => ({
  installment: one(installments, {
    fields: [invoices.installmentId],
    references: [installments.id],
  }),
  payments: many(payments),
}));

export const paymentsRelations = relations(payments, ({ one }) => ({
  invoice: one(invoices, { fields: [payments.invoiceId], references: [invoices.id] }),
  verifiedByUser: one(users, { fields: [payments.verifiedByUserId], references: [users.id] }),
}));

export const bankAccountsRelations = relations(bankAccounts, () => ({}));
export const numberSequencesRelations = relations(numberSequences, () => ({}));

export const portalLinksRelations = relations(portalLinks, ({ one, many }) => ({
  project: one(projects, { fields: [portalLinks.projectId], references: [projects.id] }),
  createdByUser: one(users, { fields: [portalLinks.createdByUserId], references: [users.id] }),
  sessions: many(portalSessions),
}));

export const portalSessionsRelations = relations(portalSessions, ({ one }) => ({
  portalLink: one(portalLinks, {
    fields: [portalSessions.portalLinkId],
    references: [portalLinks.id],
  }),
}));

export const filesRelations = relations(files, ({ one }) => ({
  project: one(projects, { fields: [files.projectId], references: [projects.id] }),
}));

export const activityLogsRelations = relations(activityLogs, ({ one }) => ({
  project: one(projects, { fields: [activityLogs.projectId], references: [projects.id] }),
}));
