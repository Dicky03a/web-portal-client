/**
 * Database seed (Task 2.7). Data is taken from docs/design/FIXTURES.md —
 * no invented values. Idempotent: truncates all seed tables (RESTART
 * IDENTITY CASCADE) before inserting, so it can be re-run.
 *
 * Admin credentials per Task 2.7: admin@portal.local / "password123"
 * (argon2 hash). Portal PINs use fixture {pin_awal} 482916.
 *
 * Run: npm run db:seed
 */

import { createHash } from 'node:crypto';

import argon2 from 'argon2';
import { eq, sql } from 'drizzle-orm';

import { db } from '@/db';
import {
  makeBankAccount,
  makeClient,
  makeDocument,
  makeDocumentDecision,
  makeDocumentVersion,
  makeDocumentVersionItem,
  makeInstallment,
  makeInvoice,
  makePayment,
  makePortalLink,
  makeProject,
  makeProjectStatusHistory,
  makeUser,
} from '@/db/factories';
import {
  bankAccounts,
  clients,
  documentDecisions,
  documentVersionItems,
  documentVersions,
  documents,
  installments,
  invoices,
  numberSequences,
  payments,
  portalLinks,
  projectStatusHistories,
  projects,
  users,
} from '@/db/schema';
import type { ProjectStatus } from '@/lib/constants';

const sha256 = (s: string) => createHash('sha256').update(s, 'utf8').digest('hex');
const canonical = (data: Record<string, unknown>) => JSON.stringify(data, Object.keys(data).sort());
const d = (iso: string) => new Date(`${iso}T00:00:00+07:00`);

async function main() {
  // --- reset (idempotent) ---
  await db.execute(
    sql.raw(`TRUNCATE TABLE
    payments, invoices, installments,
    document_decisions, document_version_items, document_versions, documents, document_templates,
    project_status_histories, portal_sessions, portal_links, files, activity_logs,
    projects, clients, bank_accounts, number_sequences, users
    RESTART IDENTITY CASCADE`),
  );

  // --- admin user ---
  const passwordHash = await argon2.hash('password123');
  const [admin] = await db
    .insert(users)
    .values(
      makeUser({
        email: 'admin@portal.local',
        name: 'Dimas Prasetyo',
        passwordHash,
        totpEnabled: false,
      }),
    )
    .returning({ id: users.id });
  const adminId = admin!.id;

  // --- bank accounts (bk01..bk03) ---
  await db.insert(bankAccounts).values([
    makeBankAccount({
      bankName: 'BCA',
      accountNumber: '8730456218',
      accountHolder: 'Dimas Prasetyo',
    }),
    makeBankAccount({
      bankName: 'Bank Rakyat Indonesia',
      accountNumber: '0012-01-054321-50-8',
      accountHolder: 'Dimas Prasetyo',
    }),
    makeBankAccount({
      bankName: 'Bank Mandiri',
      accountNumber: '1570012345678',
      accountHolder: 'Dimas Prasetyo',
    }),
  ]);

  // --- clients (c01..c05) ---
  const clientDefs = [
    {
      key: 'c01',
      name: 'Budi Santoso',
      company: 'PT Mitra Digital Nusantara',
      email: 'budi.santoso@example.com',
      phone: '0813-2000-1001',
      city: 'Surabaya',
    },
    {
      key: 'c02',
      name: 'Siti Nurhaliza Putri Maharani Kusuma Dewi Anggraeni Purnama',
      company: 'CV Harmoni Kreatif Indonesia',
      email: 'siti.nurhaliza@example.com',
      phone: '0857-3000-2002',
      city: 'Jakarta',
    },
    {
      key: 'c03',
      name: 'Made Wirawan',
      company: null,
      email: 'made.wirawan@example.com',
      phone: '0821-4000-3003',
      city: 'Denpasar',
    },
    {
      key: 'c04',
      name: 'Ayu',
      company: 'Ayu Photography',
      email: 'ayu@example.com',
      phone: '0878-5000-4004',
      city: 'Malang',
    },
    {
      key: 'c05',
      name: "Rizky D'Angelo Pratama",
      company: 'PT Sinar Teknologi Abadi',
      email: 'rizky.dangelo@example.com',
      phone: '0856-6000-5005',
      city: 'Bandung',
    },
  ];
  const clientRows = await db
    .insert(clients)
    .values(
      clientDefs.map((c) =>
        makeClient({
          name: c.name,
          companyName: c.company,
          email: c.email,
          phone: c.phone,
          address: c.city,
        }),
      ),
    )
    .returning({ id: clients.id });
  const clientId: Record<string, number> = {};
  clientDefs.forEach((c, i) => (clientId[c.key] = clientRows[i]!.id));

  // --- projects (p01..p09) ---
  const projectDefs = [
    {
      key: 'p01',
      client: 'c01',
      name: 'Website Company Profile PT Mitra Digital',
      status: 'draft',
      total: 8_500_000n,
      quota: 3,
      warranty: 90,
      started: null,
      completed: null,
      cancelled: null,
    },
    {
      key: 'p02',
      client: 'c02',
      name: 'Toko Online Batik Nusantara',
      status: 'quotation_sent',
      total: 25_000_000n,
      quota: 3,
      warranty: 90,
      started: null,
      completed: null,
      cancelled: null,
    },
    {
      key: 'p03',
      client: 'c04',
      name: 'Landing Page Ayu Photography',
      status: 'awaiting_down_payment',
      total: 3_500_000n,
      quota: 2,
      warranty: 60,
      started: null,
      completed: null,
      cancelled: null,
    },
    {
      key: 'p04',
      client: 'c03',
      name: 'Website E-Commerce CV Bali Kreatif',
      status: 'in_progress',
      total: 35_000_000n,
      quota: 3,
      warranty: 90,
      started: '2026-09-01',
      completed: null,
      cancelled: null,
    },
    {
      key: 'p05',
      client: 'c05',
      name: 'Sistem Booking Online Spa & Wellness',
      status: 'client_review',
      total: 18_750_000n,
      quota: 3,
      warranty: 90,
      started: '2026-08-15',
      completed: null,
      cancelled: null,
    },
    {
      key: 'p06',
      client: 'c05',
      name: 'Portal Internal PT Sinar Teknologi Abadi',
      status: 'handover_sent',
      total: 45_000_000n,
      quota: 5,
      warranty: 90,
      started: '2026-07-01',
      completed: null,
      cancelled: null,
    },
    {
      key: 'p07',
      client: 'c04',
      name: 'Website Portofolio Fotografi',
      status: 'warranty',
      total: 5_000_000n,
      quota: 2,
      warranty: 90,
      started: '2026-05-01',
      completed: null,
      cancelled: null,
    },
    {
      key: 'p08',
      client: 'c02',
      name: 'Redesign Website CV Harmoni Kreatif',
      status: 'completed',
      total: 12_000_000n,
      quota: 3,
      warranty: 90,
      started: '2026-02-01',
      completed: '2026-04-29',
      cancelled: null,
    },
    {
      key: 'p09',
      client: 'c01',
      name: 'Aplikasi Inventori Gudang Multi-Cabang dan Sistem Pelaporan Stok Terintegrasi',
      status: 'cancelled',
      total: 50_000_000n,
      quota: 5,
      warranty: 90,
      started: null,
      completed: null,
      cancelled: '2026-09-10',
    },
  ] as const;

  const projectRows = await db
    .insert(projects)
    .values(
      projectDefs.map((p, i) =>
        makeProject({
          clientId: clientId[p.client]!,
          code: `PRJ-2026-${String(i + 1).padStart(4, '0')}`,
          name: p.name,
          status: p.status,
          totalValue: p.total,
          revisionQuota: p.quota,
          warrantyDays: p.warranty,
          startedAt: p.started ? d(p.started) : null,
          completedAt: p.completed ? d(p.completed) : null,
          cancelledAt: p.cancelled ? d(p.cancelled) : null,
          cancelReason: p.cancelled
            ? 'Klien memutuskan untuk menunda proyek karena restrukturisasi internal perusahaan'
            : null,
        }),
      ),
    )
    .returning({ id: projects.id });
  const projectId: Record<string, number> = {};
  projectDefs.forEach((p, i) => (projectId[p.key] = projectRows[i]!.id));

  // initial status history per project
  await db.insert(projectStatusHistories).values(
    projectDefs.map((p) =>
      makeProjectStatusHistory({
        projectId: projectId[p.key]!,
        fromStatus: null,
        toStatus: p.status as ProjectStatus,
        changedByUserId: adminId,
        notes: 'Seed: initial status',
      }),
    ),
  );

  // --- documents / versions / items / decisions (q01..q09) ---
  type Item = { description: string; price: bigint };
  type Quote = {
    project: string;
    version: number;
    sentAt: string | null;
    decision: 'approved' | 'rejected' | null;
    decidedAt: string | null;
    clientName: string;
    items: Item[];
  };
  const quotes: Quote[] = [
    {
      project: 'p01',
      version: 1,
      sentAt: null,
      decision: null,
      decidedAt: null,
      clientName: 'Budi Santoso',
      items: [
        { description: 'Desain UI/UX (5 halaman)', price: 2_500_000n },
        { description: 'Pengembangan Frontend Responsif', price: 2_000_000n },
        { description: 'Integrasi CMS Sederhana', price: 1_500_000n },
        { description: 'Optimasi SEO Dasar', price: 750_000n },
        { description: 'Hosting & Domain (1 tahun)', price: 1_750_000n },
      ],
    },
    {
      project: 'p02',
      version: 1,
      sentAt: '2026-10-12',
      decision: null,
      decidedAt: null,
      clientName: 'Siti Nurhaliza Putri Maharani Kusuma Dewi Anggraeni Purnama',
      items: [],
    },
    {
      project: 'p03',
      version: 1,
      sentAt: '2026-10-02',
      decision: 'approved',
      decidedAt: '2026-10-03',
      clientName: 'Ayu',
      items: [
        { description: 'Desain Landing Page', price: 1_500_000n },
        { description: 'Galeri Portofolio Responsif', price: 1_000_000n },
        { description: 'Form Kontak & Integrasi WhatsApp', price: 1_000_000n },
      ],
    },
    {
      project: 'p04',
      version: 2,
      sentAt: '2026-08-22',
      decision: 'approved',
      decidedAt: '2026-08-25',
      clientName: 'Made Wirawan',
      items: [
        { description: 'Desain UI/UX (12 halaman)', price: 6_000_000n },
        { description: 'Pengembangan Frontend', price: 5_000_000n },
        { description: 'Halaman Katalog Produk', price: 4_000_000n },
        { description: 'Sistem Keranjang & Checkout', price: 5_500_000n },
        { description: 'Integrasi Payment Gateway Midtrans', price: 3_500_000n },
        { description: 'Panel Admin & Manajemen Produk', price: 6_000_000n },
        { description: 'Optimasi SEO & Performa', price: 2_500_000n },
        { description: 'Responsif Mobile & Testing', price: 2_500_000n },
      ],
    },
    {
      project: 'p05',
      version: 1,
      sentAt: '2026-08-07',
      decision: 'approved',
      decidedAt: '2026-08-10',
      clientName: "Rizky D'Angelo Pratama",
      items: [
        { description: 'Desain UI/UX (8 halaman)', price: 3_750_000n },
        { description: 'Halaman Layanan & Harga', price: 2_500_000n },
        { description: 'Sistem Booking & Reservasi Online', price: 5_000_000n },
        { description: 'Notifikasi WhatsApp & Email', price: 3_500_000n },
        { description: 'Panel Admin Dashboard Booking', price: 4_000_000n },
      ],
    },
    {
      project: 'p06',
      version: 1,
      sentAt: '2026-06-22',
      decision: 'approved',
      decidedAt: '2026-06-25',
      clientName: "Rizky D'Angelo Pratama",
      items: [
        { description: 'Desain UI/UX (15 halaman)', price: 7_500_000n },
        { description: 'Dashboard & Visualisasi Data', price: 8_000_000n },
        { description: 'Manajemen Pengguna & Hak Akses', price: 6_500_000n },
        { description: 'Sistem Laporan & Ekspor Data', price: 6_000_000n },
        { description: 'Integrasi API Internal', price: 7_000_000n },
        { description: 'Pengujian & Deployment', price: 5_000_000n },
        { description: 'Pelatihan & Dokumentasi Teknis', price: 5_000_000n },
      ],
    },
    {
      project: 'p07',
      version: 1,
      sentAt: '2026-04-22',
      decision: 'approved',
      decidedAt: '2026-04-25',
      clientName: 'Ayu',
      items: [],
    },
    {
      project: 'p08',
      version: 1,
      sentAt: '2026-01-17',
      decision: 'approved',
      decidedAt: '2026-01-20',
      clientName: 'Siti Nurhaliza Putri Maharani Kusuma Dewi Anggraeni Purnama',
      items: [],
    },
    {
      project: 'p09',
      version: 1,
      sentAt: '2026-09-03',
      decision: 'rejected',
      decidedAt: '2026-09-10',
      clientName: 'Budi Santoso',
      items: [
        {
          description: 'Desain UI/UX Sistem Inventori Multi-Gudang dan Pelaporan Stok Otomatis',
          price: 8_000_000n,
        },
      ],
    },
  ];

  for (const q of quotes) {
    const [doc] = await db
      .insert(documents)
      .values(
        makeDocument({
          projectId: projectId[q.project]!,
          type: 'quotation',
          createdByUserId: adminId,
        }),
      )
      .returning({ id: documents.id });
    const docId = doc!.id;

    const snapshot = canonical({
      project: q.project,
      version: q.version,
      items: q.items.map((it) => ({ description: it.description, unitPrice: it.price.toString() })),
      total: q.items.reduce((s, it) => s + it.price, 0n).toString(),
    });
    const hash = sha256(snapshot);

    // Insert the version UNSENT, add items, then set sent_at — otherwise the
    // fn_freeze_version_items trigger rejects inserting items into a sent version.
    const [ver] = await db
      .insert(documentVersions)
      .values(
        makeDocumentVersion({
          documentId: docId,
          versionNumber: q.version,
          contentSnapshot: snapshot,
          contentHash: hash,
          sentAt: null,
          createdByUserId: adminId,
        }),
      )
      .returning({ id: documentVersions.id });
    const verId = ver!.id;

    await db.update(documents).set({ latestVersionId: verId }).where(eq(documents.id, docId));

    if (q.items.length > 0) {
      await db.insert(documentVersionItems).values(
        q.items.map((it, idx) =>
          makeDocumentVersionItem({
            documentVersionId: verId,
            sortOrder: idx + 1,
            description: it.description,
            quantity: 1,
            unit: 'unit',
            unitPrice: it.price,
            subtotal: it.price,
          }),
        ),
      );
    }

    if (q.sentAt) {
      await db
        .update(documentVersions)
        .set({ sentAt: d(q.sentAt) })
        .where(eq(documentVersions.id, verId));
    }

    if (q.decision) {
      await db.insert(documentDecisions).values(
        makeDocumentDecision({
          documentVersionId: verId,
          decision: q.decision,
          decidedByName: q.clientName,
          clientHash: hash,
          ipAddress: '103.0.0.1',
          userAgent: 'Mozilla/5.0 (seed)',
          createdAt: q.decidedAt ? d(q.decidedAt) : undefined,
        }),
      );
    }
  }

  // --- installments (t01..t20) ---
  type Term = { key: string; project: string; label: string; bps: number; amount: bigint };
  const termDefs: Term[] = [
    { key: 't01', project: 'p01', label: 'DP 50%', bps: 5000, amount: 4_250_000n },
    { key: 't02', project: 'p01', label: 'Pelunasan 50%', bps: 5000, amount: 4_250_000n },
    { key: 't03', project: 'p02', label: 'DP 50%', bps: 5000, amount: 12_500_000n },
    { key: 't04', project: 'p02', label: 'Pelunasan 50%', bps: 5000, amount: 12_500_000n },
    { key: 't05', project: 'p03', label: 'DP 50%', bps: 5000, amount: 1_750_000n },
    { key: 't06', project: 'p03', label: 'Pelunasan 50%', bps: 5000, amount: 1_750_000n },
    { key: 't07', project: 'p04', label: 'DP 50%', bps: 5000, amount: 17_500_000n },
    { key: 't08', project: 'p04', label: 'Progres 30%', bps: 3000, amount: 10_500_000n },
    { key: 't09', project: 'p04', label: 'Pelunasan 20%', bps: 2000, amount: 7_000_000n },
    { key: 't10', project: 'p05', label: 'DP 50%', bps: 5000, amount: 9_375_000n },
    { key: 't11', project: 'p05', label: 'Pelunasan 50%', bps: 5000, amount: 9_375_000n },
    { key: 't12', project: 'p06', label: 'DP 30%', bps: 3000, amount: 13_500_000n },
    { key: 't13', project: 'p06', label: 'Progres 40%', bps: 4000, amount: 18_000_000n },
    { key: 't14', project: 'p06', label: 'Pelunasan 30%', bps: 3000, amount: 13_500_000n },
    { key: 't15', project: 'p07', label: 'DP 50%', bps: 5000, amount: 2_500_000n },
    { key: 't16', project: 'p07', label: 'Pelunasan 50%', bps: 5000, amount: 2_500_000n },
    { key: 't17', project: 'p08', label: 'DP 50%', bps: 5000, amount: 6_000_000n },
    { key: 't18', project: 'p08', label: 'Pelunasan 50%', bps: 5000, amount: 6_000_000n },
    { key: 't19', project: 'p09', label: 'DP 50%', bps: 5000, amount: 25_000_000n },
    { key: 't20', project: 'p09', label: 'Pelunasan 50%', bps: 5000, amount: 25_000_000n },
  ];
  const perProjectCount: Record<string, number> = {};
  const termRows = await db
    .insert(installments)
    .values(
      termDefs.map((t) => {
        perProjectCount[t.project] = (perProjectCount[t.project] ?? 0) + 1;
        return makeInstallment({
          projectId: projectId[t.project]!,
          installmentNumber: perProjectCount[t.project]!,
          label: t.label,
          percentageBasisPoints: t.bps,
          amount: t.amount,
        });
      }),
    )
    .returning({ id: installments.id });
  const termId: Record<string, number> = {};
  termDefs.forEach((t, i) => (termId[t.key] = termRows[i]!.id));

  // --- invoices (inv01..inv13) ---
  type Inv = {
    key: string;
    term: string;
    number: string;
    status: string;
    amount: bigint;
    issued: string;
    due: string;
    paid: string | null;
  };
  const invDefs: Inv[] = [
    {
      key: 'inv01',
      term: 't07',
      number: 'INV-2026-0001',
      status: 'paid',
      amount: 17_500_000n,
      issued: '2026-09-01',
      due: '2026-09-15',
      paid: '2026-09-12',
    },
    {
      key: 'inv02',
      term: 't08',
      number: 'INV-2026-0002',
      status: 'overdue',
      amount: 10_500_000n,
      issued: '2026-10-01',
      due: '2026-10-11',
      paid: null,
    },
    {
      key: 'inv03',
      term: 't10',
      number: 'INV-2026-0003',
      status: 'paid',
      amount: 9_375_000n,
      issued: '2026-08-15',
      due: '2026-08-29',
      paid: '2026-08-25',
    },
    {
      key: 'inv04',
      term: 't12',
      number: 'INV-2026-0004',
      status: 'paid',
      amount: 13_500_000n,
      issued: '2026-07-01',
      due: '2026-07-15',
      paid: '2026-07-10',
    },
    {
      key: 'inv05',
      term: 't13',
      number: 'INV-2026-0005',
      status: 'paid',
      amount: 18_000_000n,
      issued: '2026-09-01',
      due: '2026-09-15',
      paid: '2026-09-12',
    },
    {
      key: 'inv06',
      term: 't14',
      number: 'INV-2026-0006',
      status: 'partially_paid',
      amount: 13_500_000n,
      issued: '2026-10-05',
      due: '2026-10-19',
      paid: null,
    },
    {
      key: 'inv07',
      term: 't15',
      number: 'INV-2026-0007',
      status: 'paid',
      amount: 2_500_000n,
      issued: '2026-05-01',
      due: '2026-05-15',
      paid: '2026-05-10',
    },
    {
      key: 'inv08',
      term: 't16',
      number: 'INV-2026-0008',
      status: 'paid',
      amount: 2_500_000n,
      issued: '2026-07-01',
      due: '2026-07-15',
      paid: '2026-07-08',
    },
    {
      key: 'inv09',
      term: 't17',
      number: 'INV-2026-0009',
      status: 'paid',
      amount: 6_000_000n,
      issued: '2026-02-01',
      due: '2026-02-15',
      paid: '2026-02-10',
    },
    {
      key: 'inv10',
      term: 't18',
      number: 'INV-2026-0010',
      status: 'paid',
      amount: 6_000_000n,
      issued: '2026-04-15',
      due: '2026-04-29',
      paid: '2026-04-20',
    },
    {
      key: 'inv11',
      term: 't05',
      number: 'INV-2026-0011',
      status: 'sent',
      amount: 1_750_000n,
      issued: '2026-10-05',
      due: '2026-10-19',
      paid: null,
    },
    {
      key: 'inv12',
      term: 't09',
      number: 'INV-2026-0012',
      status: 'draft',
      amount: 7_000_000n,
      issued: '2026-10-18',
      due: '2026-10-18',
      paid: null,
    },
    {
      key: 'inv13',
      term: 't19',
      number: 'INV-2026-0013',
      status: 'cancelled',
      amount: 25_000_000n,
      issued: '2026-09-05',
      due: '2026-09-19',
      paid: null,
    },
  ];
  const invRows = await db
    .insert(invoices)
    .values(
      invDefs.map((iv) =>
        makeInvoice({
          installmentId: termId[iv.term]!,
          invoiceNumber: iv.number,
          amount: iv.amount,
          status: iv.status,
          issuedAt: d(iv.issued),
          dueAt: d(iv.due),
          paidAt: iv.paid ? d(iv.paid) : null,
        }),
      ),
    )
    .returning({ id: invoices.id });
  const invoiceId: Record<string, number> = {};
  invDefs.forEach((iv, i) => (invoiceId[iv.key] = invRows[i]!.id));

  // --- payments (pay01..pay11) ---
  type Pay = { invoice: string; amount: bigint; status: string; date: string; reason?: string };
  const payDefs: Pay[] = [
    { invoice: 'inv01', amount: 17_500_000n, status: 'verified', date: '2026-09-12' },
    { invoice: 'inv03', amount: 9_375_000n, status: 'verified', date: '2026-08-25' },
    { invoice: 'inv04', amount: 13_500_000n, status: 'verified', date: '2026-07-10' },
    { invoice: 'inv05', amount: 18_000_000n, status: 'verified', date: '2026-09-12' },
    { invoice: 'inv06', amount: 7_000_000n, status: 'verified', date: '2026-10-10' },
    { invoice: 'inv07', amount: 2_500_000n, status: 'verified', date: '2026-05-10' },
    { invoice: 'inv08', amount: 2_500_000n, status: 'verified', date: '2026-07-08' },
    { invoice: 'inv09', amount: 6_000_000n, status: 'verified', date: '2026-02-10' },
    { invoice: 'inv10', amount: 6_000_000n, status: 'verified', date: '2026-04-20' },
    { invoice: 'inv11', amount: 1_750_000n, status: 'pending', date: '2026-10-17' },
    {
      invoice: 'inv02',
      amount: 5_000_000n,
      status: 'rejected',
      date: '2026-10-12',
      reason: 'Bukti transfer blur, tidak terbaca',
    },
  ];
  await db.insert(payments).values(
    payDefs.map((p, i) =>
      makePayment({
        invoiceId: invoiceId[p.invoice]!,
        amount: p.amount,
        paymentMethod: 'bank_transfer',
        paymentDate: p.date,
        status: p.status,
        proofFilePath: `/storage/seed/bukti-pay${String(i + 1).padStart(2, '0')}.jpg`,
        verifiedByUserId: p.status === 'verified' ? adminId : null,
        verifiedAt: p.status === 'verified' ? d(p.date) : null,
        rejectionReason: p.reason ?? null,
      }),
    ),
  );

  // --- number sequences (continue after seeded numbers) ---
  await db.insert(numberSequences).values([
    { prefix: 'INV', year: 2026, lastValue: 13 },
    { prefix: 'PRJ', year: 2026, lastValue: 9 },
    { prefix: 'QUO', year: 2026, lastValue: 9 },
  ]);

  // --- portal links (pl01..pl06) ---
  const pinHash = await argon2.hash('482916');
  type Link = { project: string; token: string; locked: boolean };
  const linkDefs: Link[] = [
    { project: 'p01', token: 'a1b2c3', locked: false },
    { project: 'p02', token: 'd4e5f6', locked: false },
    { project: 'p04', token: 'g7h8i9', locked: false },
    { project: 'p03', token: 'j0k1l2', locked: false },
    { project: 'p05', token: 'm3n4o5', locked: false },
    { project: 'p06', token: 'p6q7r8', locked: true },
  ];
  await db.insert(portalLinks).values(
    linkDefs.map((l) =>
      makePortalLink({
        projectId: projectId[l.project]!,
        tokenHash: sha256(l.token),
        encryptedToken: Buffer.from(l.token).toString('base64'),
        pinHash,
        isPinChanged: false,
        failedAttempts: l.locked ? 5 : 0,
        lockedUntil: l.locked ? new Date(Date.now() + 15 * 60 * 1000) : null,
        lockoutCount: l.locked ? 1 : 0,
        createdByUserId: adminId,
      }),
    ),
  );

  // eslint-disable-next-line no-console
  console.log('Seed complete.');
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
