/**
 * Test data factories (Task 2.7).
 *
 * Each `make*` returns a valid insert row for its table with sensible
 * defaults; pass `overrides` to set the fields a test cares about. FK columns
 * default to 0 — callers must override them with real ids. Defaults that must
 * be unique (email, code, invoice_number, token hashes) are varied by an
 * internal counter so repeated calls do not collide.
 *
 * The seed script (src/db/seed.ts) uses these with explicit overrides from
 * docs/design/FIXTURES.md.
 */

import type {
  NewActivityLog,
  NewBankAccount,
  NewClient,
  NewDocument,
  NewDocumentDecision,
  NewDocumentTemplate,
  NewDocumentVersion,
  NewDocumentVersionItem,
  NewFile,
  NewInstallment,
  NewInvoice,
  NewNumberSequence,
  NewPayment,
  NewPortalLink,
  NewPortalSession,
  NewProject,
  NewProjectStatusHistory,
  NewUser,
} from '@/types/db';

let counter = 0;
const seq = () => ++counter;
// Valid lowercase-hex 64-char string (satisfies the *_hex CHECK constraints).
const hex64 = (n: number) => n.toString(16).padStart(64, '0');
const thirtyDays = () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

export function makeUser(overrides: Partial<NewUser> = {}): NewUser {
  const n = seq();
  return {
    email: `user${n}@portal.local`,
    name: `User ${n}`,
    passwordHash: 'argon2-placeholder',
    totpEnabled: false,
    ...overrides,
  };
}

export function makeClient(overrides: Partial<NewClient> = {}): NewClient {
  const n = seq();
  return {
    name: `Client ${n}`,
    email: `client${n}@example.com`,
    phone: '08120000000',
    ...overrides,
  };
}

export function makeProject(overrides: Partial<NewProject> = {}): NewProject {
  const n = seq();
  return {
    clientId: 0,
    code: `PRJ-TEST-${String(n).padStart(4, '0')}`,
    name: `Project ${n}`,
    status: 'draft',
    revisionQuota: 3,
    warrantyDays: 90,
    ...overrides,
  };
}

export function makeProjectStatusHistory(
  overrides: Partial<NewProjectStatusHistory> = {},
): NewProjectStatusHistory {
  return { projectId: 0, toStatus: 'draft', ...overrides };
}

export function makeDocument(overrides: Partial<NewDocument> = {}): NewDocument {
  return { projectId: 0, type: 'quotation', createdByUserId: 0, ...overrides };
}

export function makeDocumentVersion(
  overrides: Partial<NewDocumentVersion> = {},
): NewDocumentVersion {
  return {
    documentId: 0,
    versionNumber: 1,
    contentSnapshot: '{}',
    contentHash: hex64(0),
    createdByUserId: 0,
    ...overrides,
  };
}

export function makeDocumentVersionItem(
  overrides: Partial<NewDocumentVersionItem> = {},
): NewDocumentVersionItem {
  return {
    documentVersionId: 0,
    sortOrder: 1,
    description: 'Item',
    quantity: 1,
    unit: 'unit',
    unitPrice: 0n,
    subtotal: 0n,
    ...overrides,
  };
}

export function makeDocumentDecision(
  overrides: Partial<NewDocumentDecision> = {},
): NewDocumentDecision {
  return {
    documentVersionId: 0,
    decision: 'approved',
    decidedByName: 'Client',
    clientHash: hex64(0),
    ipAddress: '0.0.0.0',
    userAgent: 'factory',
    ...overrides,
  };
}

export function makeDocumentTemplate(
  overrides: Partial<NewDocumentTemplate> = {},
): NewDocumentTemplate {
  const n = seq();
  return { name: `Template ${n}`, type: 'quotation', templateFields: {}, ...overrides };
}

export function makeInstallment(overrides: Partial<NewInstallment> = {}): NewInstallment {
  return {
    projectId: 0,
    installmentNumber: 1,
    label: 'DP 50%',
    percentageBasisPoints: 5000,
    amount: 1n,
    ...overrides,
  };
}

export function makeInvoice(overrides: Partial<NewInvoice> = {}): NewInvoice {
  const n = seq();
  return {
    installmentId: 0,
    invoiceNumber: `INV-TEST-${String(n).padStart(4, '0')}`,
    amount: 1n,
    dueAt: thirtyDays(),
    status: 'draft',
    ...overrides,
  };
}

export function makePayment(overrides: Partial<NewPayment> = {}): NewPayment {
  return {
    invoiceId: 0,
    amount: 1n,
    paymentMethod: 'bank_transfer',
    paymentDate: '2026-01-01',
    status: 'pending',
    ...overrides,
  };
}

export function makeBankAccount(overrides: Partial<NewBankAccount> = {}): NewBankAccount {
  const n = seq();
  return {
    bankName: 'BCA',
    accountNumber: `00000000${n}`,
    accountHolder: 'Admin',
    isActive: true,
    ...overrides,
  };
}

export function makeNumberSequence(overrides: Partial<NewNumberSequence> = {}): NewNumberSequence {
  return { prefix: 'INV', year: 2026, lastValue: 0, ...overrides };
}

export function makePortalLink(overrides: Partial<NewPortalLink> = {}): NewPortalLink {
  const n = seq();
  return {
    projectId: 0,
    tokenHash: hex64(n),
    encryptedToken: 'seed-placeholder',
    pinHash: 'argon2-placeholder',
    expiresAt: thirtyDays(),
    createdByUserId: 0,
    ...overrides,
  };
}

export function makePortalSession(overrides: Partial<NewPortalSession> = {}): NewPortalSession {
  const n = seq();
  return {
    portalLinkId: 0,
    sessionTokenHash: hex64(n),
    ipAddress: '0.0.0.0',
    userAgent: 'seed',
    expiresAt: thirtyDays(),
    ...overrides,
  };
}

export function makeFile(overrides: Partial<NewFile> = {}): NewFile {
  const n = seq();
  return {
    filename: `file-${n}.pdf`,
    originalName: `file-${n}.pdf`,
    mimeType: 'application/pdf',
    sizeBytes: 1024,
    storagePath: `/storage/file-${n}.pdf`,
    ...overrides,
  };
}

export function makeActivityLog(overrides: Partial<NewActivityLog> = {}): NewActivityLog {
  return { actorType: 'system', action: 'seed', entityType: 'system', ...overrides };
}
