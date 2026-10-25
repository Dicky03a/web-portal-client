# Desain Basis Data — Portal Proyek Jasa Website

Oct 16, 2026 · @Dicky Adi Saputra

## Status dan ringkasan

Basis data portal terdiri dari 22 tabel di PostgreSQL 18 untuk ( Stack nya telah di rubah ke Next.Js dan ikuti sesuai dari dokuemn2 .10x ) 13, dikelompokkan ke 7 domain. Dokumen ini keluaran fase **Desain** SDLC dan menjadi kontrak untuk fase Implementasi (migration, model, factory).

- Gambar ERD (versi 3, tipe PostgreSQL): papan FigJam [Portal Proyek](https://www.figma.com/board/dCR3xUrw1hIZHo6yevidA8), di samping flowchart swimlane.
- Sumber kebutuhan: [PRD Portal Proyek Jasa Website](https://claude.ai/code/artifact/975cf95e-7a23-45e5-87cf-3ed7a27e69df), termasuk state machine 9 status.
- Tingkat ERD: fisik (nama tabel, kolom, tipe, kunci). Tabel bawaan ( Stack nya telah di rubah ke Next.Js dan ikuti sesuai dari dokuemn2 .10x ) (`sessions`, `cache`, `jobs`, `failed_jobs`, `password_reset_tokens`) tidak digambar.

Prinsip yang dipegang: satu sumber kebenaran per fakta, nilai turunan dihitung (bukan disimpan) kecuali harus dibekukan, data keuangan dan persetujuan tidak pernah dihapus atau diubah, dan setiap aturan bisnis penting dijaga juga oleh database, bukan hanya oleh kode.

## Konvensi

Semua tabel memakai konvensi yang sama supaya migration, model, dan query bisa ditebak tanpa membuka dokumen ini.

| Aspek                            | Aturan                                                                                                                             | Alasan                                                                                                                                                                                                                                 |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Nama tabel dan kolom             | Bahasa Inggris, `snake_case`, tabel jamak (`projects`, `invoices`)                                                                 | Pluralizer ( Stack nya telah di rubah ke Next.Js dan ikuti sesuai dari dokuemn2 .10x ) berbahasa Inggris: model `Klien` otomatis mencari tabel `kliens`. Istilah Indonesia tetap dipakai di UI dan dokumen (glosarium di Peta domain). |
| Primary key                      | `BIGINT` identity (`$table->id()`)                                                                                                 | Join cepat, standar ( Stack nya telah di rubah ke Next.Js dan ikuti sesuai dari dokuemn2 .10x ). PostgreSQL tidak punya tipe unsigned; identity tidak pernah menghasilkan nilai negatif.                                               |
| ID publik                        | Kolom `ulid CHAR(26) UNIQUE` pada tabel yang muncul di URL portal                                                                  | ID berurutan di URL memudahkan tebak-tebakan (IDOR). Scoping per token tetap wajib; ULID lapisan kedua.                                                                                                                                |
| Uang                             | `BIGINT` rupiah bulat, `CHECK (amount >= 0)`                                                                                       | `INTEGER` mentok di Rp2,1 miliar; `NUMERIC` atau float tidak perlu karena tanpa sen.                                                                                                                                                   |
| Persen                           | `INTEGER` basis poin: 5000 = 50%, 3333 = 33,33%                                                                                    | Menghindari pecahan; total termin persen wajib 10000.                                                                                                                                                                                  |
| Bilangan kecil (kuota, hitungan) | `SMALLINT` atau `INTEGER` + `CHECK (... >= 0)`                                                                                     | PostgreSQL tidak punya `TINYINT` maupun unsigned; batas bawah dijaga CHECK.                                                                                                                                                            |
| Waktu kejadian                   | `TIMESTAMPTZ` (`timestampsTz()`, `timestampTz()`), ditampilkan sebagai WIB                                                         | Menyimpan titik waktu yang tidak ambigu terhadap zona waktu server; tanpa batas tahun 2038.                                                                                                                                            |
| Tanggal bisnis                   | `DATE` (`due_on`, `warranty_ends_on`)                                                                                              | Jatuh tempo dan garansi bersifat tanggal, bukan jam; akhiran `_on` vs `_at` membedakannya.                                                                                                                                             |
| Status                           | `VARCHAR(32)` + PHP backed enum + `CHECK (status IN (...))`                                                                        | Tipe `ENUM` PostgreSQL butuh `ALTER TYPE` untuk tiap status baru dan nilainya tidak bisa dihapus; CHECK lebih mudah diubah dan tetap menolak nilai liar.                                                                               |
| Data semi-terstruktur            | `JSONB`                                                                                                                            | Bisa diindeks dan di-query; dipakai untuk isian template dan properti log. Tidak dipakai untuk apa pun yang di-hash.                                                                                                                   |
| Snapshot yang di-hash            | `TEXT`, disimpan byte-per-byte                                                                                                     | `JSONB` menyusun ulang kunci dan membuang spasi; hash hanya bisa diverifikasi ulang dari teks yang persis sama.                                                                                                                        |
| Hash                             | `CHAR(64)` heksadesimal SHA-256                                                                                                    | Panjang tetap, mudah dibandingkan.                                                                                                                                                                                                     |
| Alamat IP                        | `INET` (`ipAddress()`)                                                                                                             | Database menjamin IPv4/IPv6 yang valid; bisa difilter per subnet.                                                                                                                                                                      |
| Email                            | `VARCHAR(255)` + unique index pada `lower(email)`                                                                                  | PostgreSQL membandingkan teks secara case-sensitive; tanpa ini `Admin@x.com` dan `admin@x.com` dianggap dua akun.                                                                                                                      |
| Penghapusan                      | Tidak ada `DELETE` untuk data proyek, dokumen, keuangan; pakai kolom `cancelled_at` + alasan, atau `archived_at` untuk master data | Sesuai PRD. `SoftDeletes` ( Stack nya telah di rubah ke Next.Js dan ikuti sesuai dari dokuemn2 .10x ) tidak dipakai di tabel keuangan karena menyembunyikan baris diam-diam dari query dan rekap.                                      |
| Foreign key                      | Selalu ada, `ON DELETE RESTRICT`, ditambah index eksplisit di setiap kolom FK                                                      | PostgreSQL tidak membuat index FK otomatis; tanpa index, join dan pengecekan RESTRICT memindai tabel penuh.                                                                                                                            |

## Peta domain

Semua data menggantung pada `projects`; rantai uang berjalan Dokumen → Versi → Termin → Invoice → Pembayaran. Relasi lengkapnya ada di gambar ERD FigJam; tabel ini memetakan nama tabel ke istilah PRD dan modul.

| Domain (modul PRD)                | Tabel                                                                                                  | Istilah PRD                                                        | Rilis                           |
| --------------------------------- | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------- |
| Klien & proyek (Lifecycle Proyek) | `clients`, `projects`, `project_status_histories`                                                      | Klien, Proyek, riwayat status                                      | MVP                             |
| Dokumen & persetujuan             | `documents`, `document_versions`, `document_version_items`, `document_decisions`, `document_templates` | Penawaran/SPK, Addendum, BAST, VersiDokumen, Persetujuan, template | MVP (Addendum, BAST: iterasi 2) |
| Penagihan                         | `installments`, `invoices`, `payments`, `bank_accounts`, `number_sequences`                            | Termin, Invoice, Pembayaran, rekening, penomoran                   | MVP                             |
| Progres                           | `milestones`, `progress_updates`                                                                       | Milestone, PembaruanProgres                                        | Iterasi 2                       |
| Revisi & garansi                  | `revision_requests`, `warranty_claims`                                                                 | PermintaanRevisi, KlaimGaransi                                     | Iterasi 2 dan 3                 |
| Akses portal                      | `portal_links`, `portal_sessions`, `users`                                                             | TautanPortal, sesi klien, admin                                    | MVP                             |
| Lintas modul                      | `files`, `activity_logs`                                                                               | berkas unggahan, LogAktivitas                                      | MVP                             |

Relasi yang paling menentukan:

1. `projects` 1–N `documents` 1–N `document_versions`; satu versi punya paling banyak satu `document_decisions`.
2. `document_versions` 1–N `installments`: jadwal termin adalah bagian dari isi dokumen yang disetujui, bukan data lepas.
3. `installments` 1–0..1 `invoices` 1–N `payments`: satu termin ditagih oleh satu invoice, invoice bisa dibayar bertahap.
4. `documents.parent_document_id` menghubungkan Addendum ke Penawaran induk; `revision_requests` dan `warranty_claims` menunjuk Addendum yang mereka picu.
5. `projects` 1–N `portal_links` 1–N `portal_sessions`; setiap tindakan klien (keputusan, unggah bukti, pengajuan) menyimpan `portal_session_id` sebagai jejak.

## Kamus data

Setiap tabel punya `id` dan, kecuali disebut lain, `created_at` + `updated_at` (`TIMESTAMPTZ`, UTC); kolom-kolom itu tidak diulang di bawah. "Wajib" berarti `NOT NULL`.

### Klien & proyek

**`users`** — admin (penyedia jasa). Satu baris di produksi, tetapi tabel tetap ada untuk login, 2FA, dan jejak siapa memverifikasi.

| Kolom                        | Tipe         | Aturan                            | Keterangan                     |
| ---------------------------- | ------------ | --------------------------------- | ------------------------------ |
| name                         | VARCHAR(100) | wajib                             |                                |
| email                        | VARCHAR(255) | wajib, UNIQUE pada `lower(email)` | login                          |
| password                     | VARCHAR(255) | wajib                             | hash bcrypt/argon2             |
| two\_factor\_secret          | TEXT         | null                              | terenkripsi (`encrypted` cast) |
| two\_factor\_recovery\_codes | TEXT         | null                              | terenkripsi                    |
| two\_factor\_confirmed\_at   | TIMESTAMPTZ  | null                              | 2FA aktif bila terisi          |

**`clients`** — data klien yang dipakai ulang di semua dokumen.

| Kolom          | Tipe         | Aturan       | Keterangan                                                                              |
| -------------- | ------------ | ------------ | --------------------------------------------------------------------------------------- |
| name           | VARCHAR(100) | wajib        | nama kontak                                                                             |
| business\_name | VARCHAR(150) | null         | nama usaha                                                                              |
| whatsapp       | VARCHAR(20)  | wajib, INDEX | dinormalisasi `62xxxxxxxxxx` (tanpa `+`, tanpa `0` awal) agar tautan wa.me selalu benar |
| email          | VARCHAR(255) | null         |                                                                                         |
| notes          | TEXT         | null         | catatan internal, tidak tampil di portal                                                |
| archived\_at   | TIMESTAMPTZ  | null         | pengganti hapus                                                                         |

**`projects`** — inti state machine.

| Kolom                | Tipe                | Aturan                                  | Keterangan                                                                                                                                                                  |
| -------------------- | ------------------- | --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| client\_id           | BIGINT FK → clients | wajib                                   |                                                                                                                                                                             |
| code                 | VARCHAR(20)         | wajib, UNIQUE                           | `PRJ-2026-0001` dari `number_sequences`                                                                                                                                     |
| name                 | VARCHAR(150)        | wajib                                   | dipakai di pesan WhatsApp                                                                                                                                                   |
| status               | VARCHAR(32)         | wajib, CHECK, INDEX                     | `draft` (Draft penawaran), `quotation_sent`, `awaiting_down_payment`, `in_progress`, `client_review`, `handover_sent` (BAST terkirim), `warranty`, `completed`, `cancelled` |
| warranty\_starts\_on | DATE                | null                                    | diisi sekali saat BAST disetujui                                                                                                                                            |
| warranty\_ends\_on   | DATE                | null, CHECK ≥ starts\_on                | dibekukan, tidak dihitung ulang                                                                                                                                             |
| cancelled\_at        | TIMESTAMPTZ         | null                                    |                                                                                                                                                                             |
| cancel\_reason       | TEXT                | wajib bila cancelled\_at terisi (CHECK) |                                                                                                                                                                             |
| completed\_at        | TIMESTAMPTZ         | null                                    |                                                                                                                                                                             |

**`project_status_histories`** — satu baris per transisi state machine. Hanya `created_at` (append-only).

| Kolom        | Tipe                 | Aturan                                  | Keterangan                                                      |
| ------------ | -------------------- | --------------------------------------- | --------------------------------------------------------------- |
| project\_id  | BIGINT FK → projects | wajib, INDEX (project\_id, created\_at) |                                                                 |
| from\_status | VARCHAR(32)          | null                                    | null untuk baris pertama                                        |
| to\_status   | VARCHAR(32)          | wajib                                   |                                                                 |
| action       | VARCHAR(50)          | wajib                                   | nama transisi, misal `approve_quotation`, `verify_down_payment` |
| actor\_type  | VARCHAR(16)          | wajib                                   | `admin`, `client`, `system`                                     |
| actor\_id    | BIGINT               | null                                    | `users.id` atau `portal_links.id`; null untuk system            |
| reason       | TEXT                 | null                                    | wajib untuk pembatalan                                          |

### Dokumen & persetujuan

**`documents`** — wadah satu dokumen bernomor; isinya ada di versi.

| Kolom                         | Tipe                  | Aturan        | Keterangan                                       |
| ----------------------------- | --------------------- | ------------- | ------------------------------------------------ |
| ulid                          | CHAR(26)              | wajib, UNIQUE | ID di URL portal                                 |
| project\_id                   | BIGINT FK → projects  | wajib, INDEX  |                                                  |
| type                          | VARCHAR(16)           | wajib, CHECK  | `quotation` (Penawaran/SPK), `addendum`, `bast`  |
| number                        | VARCHAR(20)           | wajib, UNIQUE | `PNW-2026-0001`, `ADD-…`, `BAST-…`               |
| parent\_document\_id          | BIGINT FK → documents | null          | wajib untuk `addendum`, menunjuk Penawaran induk |
| cancelled\_at, cancel\_reason | TIMESTAMPTZ, TEXT     | null          | batal, tidak dihapus                             |

**`document_versions`** — isi dokumen. Bisa diubah hanya selama `draft`; begitu `sent`, baris ini dan semua anaknya beku.

| Kolom                     | Tipe                  | Aturan                                                  | Keterangan                                                                                                                                                                                                            |
| ------------------------- | --------------------- | ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ulid                      | CHAR(26)              | wajib, UNIQUE                                           |                                                                                                                                                                                                                       |
| document\_id              | BIGINT FK → documents | wajib                                                   |                                                                                                                                                                                                                       |
| version\_no               | INTEGER               | wajib, UNIQUE (document\_id, version\_no)               | 1, 2, 3 …                                                                                                                                                                                                             |
| status                    | VARCHAR(20)           | wajib, CHECK                                            | `draft`, `sent`, `approved`, `rejected`, `changes_requested`, `superseded`                                                                                                                                            |
| title                     | VARCHAR(200)          | wajib                                                   |                                                                                                                                                                                                                       |
| scope                     | TEXT                  | null                                                    | lingkup kerja (Penawaran) atau catatan serah terima (BAST)                                                                                                                                                            |
| subtotal, discount, total | BIGINT                | wajib, default 0, CHECK total = subtotal − discount ≥ 0 | rupiah                                                                                                                                                                                                                |
| revision\_quota           | SMALLINT              | wajib, default 0                                        | Penawaran: kuota awal; Addendum: kuota tambahan (revisi berbayar)                                                                                                                                                     |
| revision\_policy          | TEXT                  | null                                                    | definisi "revisi" vs "perubahan lingkup"                                                                                                                                                                              |
| warranty\_days            | SMALLINT              | null                                                    | durasi garansi; dalam hari agar tidak ambigu soal "1 bulan"                                                                                                                                                           |
| warranty\_scope           | TEXT                  | null                                                    | cakupan garansi                                                                                                                                                                                                       |
| content                   | TEXT                  | null saat draft, wajib saat sent                        | snapshot kanonik seluruh isi (header, item, termin, teks): JSON dengan kunci terurut, disimpan byte-per-byte sebagai teks. Bukan `JSONB`, karena `JSONB` menyusun ulang isinya dan hash tidak bisa diverifikasi ulang |
| content\_sha256           | CHAR(64)              | null saat draft, wajib saat sent                        | hash dari `content`                                                                                                                                                                                                   |
| pdf\_sha256               | CHAR(64)              | null                                                    | hash berkas PDF yang disimpan (`files` purpose `version_pdf`)                                                                                                                                                         |
| sent\_at                  | TIMESTAMPTZ           | null                                                    | titik beku                                                                                                                                                                                                            |
| created\_by               | BIGINT FK → users     | wajib                                                   |                                                                                                                                                                                                                       |

**`document_version_items`** — baris item. Beku bersama versinya.

| Kolom                 | Tipe                           | Aturan                                      | Keterangan                                        |
| --------------------- | ------------------------------ | ------------------------------------------- | ------------------------------------------------- |
| document\_version\_id | BIGINT FK → document\_versions | wajib                                       |                                                   |
| sort                  | SMALLINT                       | wajib, UNIQUE (document\_version\_id, sort) | urutan tampil                                     |
| description           | TEXT                           | wajib                                       | item pekerjaan, atau hasil yang diserahkan (BAST) |
| quantity              | INTEGER                        | wajib, default 1                            |                                                   |
| unit\_price           | BIGINT                         | null                                        | null untuk BAST                                   |
| amount                | BIGINT                         | null, CHECK = quantity × unit\_price        |                                                   |

Tanpa `updated_at`: baris item tidak pernah diubah setelah versi dikirim; selama draft, item diganti utuh.

**`document_decisions`** — keputusan klien atas satu versi; inilah bukti persetujuan. Append-only, tanpa `updated_at` kecuali `admin_seen_at`.

| Kolom                 | Tipe                           | Aturan                        | Keterangan                                                                          |
| --------------------- | ------------------------------ | ----------------------------- | ----------------------------------------------------------------------------------- |
| document\_version\_id | BIGINT FK → document\_versions | wajib, UNIQUE                 | satu versi, satu keputusan                                                          |
| portal\_session\_id   | BIGINT FK → portal\_sessions   | wajib                         | sesi tempat keputusan dibuat                                                        |
| decision              | VARCHAR(20)                    | wajib, CHECK                  | `approved`, `rejected`, `changes_requested`                                         |
| signer\_name          | VARCHAR(150)                   | wajib untuk `approved`        | nama yang diketik klien                                                             |
| consent\_text         | TEXT                           | wajib untuk `approved`        | teks pernyataan persis seperti yang dicentang                                       |
| note                  | TEXT                           | wajib untuk selain `approved` | alasan menolak atau permintaan perubahan                                            |
| content\_sha256       | CHAR(64)                       | wajib                         | hash versi yang dilihat klien; harus sama dengan `document_versions.content_sha256` |
| pin\_reverified\_at   | TIMESTAMPTZ                    | wajib                         | bukti PIN dimasukkan ulang                                                          |
| ip\_address           | INET                           | wajib                         | muat IPv6                                                                           |
| user\_agent           | TEXT                           | wajib                         |                                                                                     |
| decided\_at           | TIMESTAMPTZ                    | wajib                         | waktu server, bukan waktu perangkat                                                 |
| admin\_seen\_at       | TIMESTAMPTZ                    | null                          | null = masuk antrean "menunggu tindak lanjut"                                       |

**`document_templates`** — isian awal untuk membuat versi draft. Tidak direferensikan oleh dokumen, karena isi versi sudah disalin dan dibekukan.

| Kolom        | Tipe         | Aturan       | Keterangan                                                  |
| ------------ | ------------ | ------------ | ----------------------------------------------------------- |
| type         | VARCHAR(16)  | wajib, CHECK | sama dengan `documents.type`                                |
| name         | VARCHAR(100) | wajib        | misal "Company profile 5 halaman"                           |
| defaults     | JSONB        | wajib        | item, skema termin, kuota revisi, kebijakan revisi, garansi |
| archived\_at | TIMESTAMPTZ  | null         |                                                             |

### Penagihan

**`installments`** — termin. Bagian dari isi versi Penawaran/Addendum, jadi ikut beku saat versi dikirim. Tanpa timestamp terpisah.

| Kolom                 | Tipe                           | Aturan                                          | Keterangan                                                                                 |
| --------------------- | ------------------------------ | ----------------------------------------------- | ------------------------------------------------------------------------------------------ |
| project\_id           | BIGINT FK → projects           | wajib, UNIQUE (id, project\_id)                 | duplikasi sengaja untuk scoping portal; konsistensi dijaga composite FK (lihat Constraint) |
| document\_version\_id | BIGINT FK → document\_versions | wajib                                           | versi yang menetapkan termin ini                                                           |
| sequence              | SMALLINT                       | wajib, UNIQUE (document\_version\_id, sequence) | 1, 2, 3 … (N termin)                                                                       |
| label                 | VARCHAR(50)                    | wajib                                           | "DP", "Termin 2", "Pelunasan"                                                              |
| basis                 | VARCHAR(10)                    | wajib, CHECK                                    | `percent` atau `fixed`                                                                     |
| percent\_bp           | INT                            | wajib bila percent, CHECK 1–10000               | basis poin                                                                                 |
| amount                | BIGINT                         | wajib, CHECK > 0                                | rupiah final; sisa pembulatan masuk termin terakhir                                        |
| is\_down\_payment     | BOOLEAN                        | wajib, default false                            | menjadi syarat transisi ke `in_progress`                                                   |
| trigger\_event        | VARCHAR(20)                    | wajib, CHECK                                    | `on_approval` (DP), `on_bast` (pelunasan saat BAST disetujui), `manual` (termin tengah)    |
| due\_in\_days         | SMALLINT                       | wajib, default 7                                | jatuh tempo = tanggal invoice terbit + N hari                                              |

**`invoices`** — dibuat saat pemicu termin terjadi, langsung bernomor.

| Kolom             | Tipe                       | Aturan                                | Keterangan                                                 |
| ----------------- | -------------------------- | ------------------------------------- | ---------------------------------------------------------- |
| ulid              | CHAR(26)                   | wajib, UNIQUE                         |                                                            |
| project\_id       | BIGINT                     | wajib, INDEX (project\_id, status)    | ikut composite FK                                          |
| installment\_id   | BIGINT                     | wajib, UNIQUE                         | composite FK (installment\_id, project\_id) → installments |
| bank\_account\_id | BIGINT FK → bank\_accounts | wajib                                 | rekening tujuan saat terbit                                |
| number            | VARCHAR(20)                | wajib, UNIQUE                         | `INV-2026-0001`                                            |
| amount            | BIGINT                     | wajib, CHECK > 0                      | salinan `installments.amount` saat terbit                  |
| status            | VARCHAR(20)                | wajib, CHECK, INDEX (status, due\_on) | `issued`, `partially_paid`, `paid`, `void`                 |
| issued\_on        | DATE                       | wajib                                 |                                                            |
| due\_on           | DATE                       | wajib, CHECK ≥ issued\_on             | daftar tagihan terlambat memakai index (status, due\_on)   |
| paid\_at          | TIMESTAMPTZ                | null                                  | diisi saat total pembayaran terverifikasi ≥ amount         |
| void\_reason      | TEXT                       | wajib bila void                       |                                                            |

"Menunggu verifikasi" bukan status invoice, melainkan adanya `payments` berstatus `pending`; jadi satu fakta hanya ada di satu tempat.

**`payments`** — setiap transfer yang dilaporkan, dari klien atau dicatat admin.

| Kolom               | Tipe                         | Aturan                                        | Keterangan                                                      |
| ------------------- | ---------------------------- | --------------------------------------------- | --------------------------------------------------------------- |
| ulid                | CHAR(26)                     | wajib, UNIQUE                                 |                                                                 |
| invoice\_id         | BIGINT FK → invoices         | wajib, INDEX                                  |                                                                 |
| amount              | BIGINT                       | wajib, CHECK > 0                              |                                                                 |
| transferred\_on     | DATE                         | wajib                                         | tanggal transfer menurut bukti; dasar rekap pemasukan per bulan |
| source              | VARCHAR(16)                  | wajib, CHECK                                  | `client_upload`, `admin_manual`                                 |
| status              | VARCHAR(16)                  | wajib, CHECK, INDEX (status, transferred\_on) | `pending`, `verified`, `rejected`, `reversed`                   |
| sender\_name        | VARCHAR(150)                 | null                                          | nama pengirim di mutasi                                         |
| portal\_session\_id | BIGINT FK → portal\_sessions | wajib bila client\_upload                     |                                                                 |
| pin\_reverified\_at | TIMESTAMPTZ                  | wajib bila client\_upload                     |                                                                 |
| verified\_by        | BIGINT FK → users            | wajib bila verified/rejected                  |                                                                 |
| verified\_at        | TIMESTAMPTZ                  | idem                                          |                                                                 |
| rejection\_reason   | TEXT                         | wajib bila rejected/reversed                  | `reversed` = koreksi verifikasi yang keliru, tanpa menghapus    |

**`bank_accounts`** — rekening tujuan. Tidak pernah diedit: ganti rekening = baris baru, yang lama `is_active = false`, sehingga invoice lama tetap menampilkan rekening aslinya. Hanya `created_at`.

| Kolom           | Tipe         | Aturan | Keterangan                                        |
| --------------- | ------------ | ------ | ------------------------------------------------- |
| bank\_name      | VARCHAR(50)  | wajib  |                                                   |
| account\_number | VARCHAR(30)  | wajib  | disimpan sebagai teks, bukan angka (nol di depan) |
| account\_holder | VARCHAR(150) | wajib  |                                                   |
| is\_active      | BOOLEAN      | wajib  |                                                   |

**`number_sequences`** — penghitung nomor dokumen. Tanpa timestamp.

| Kolom        | Tipe        | Aturan                       | Keterangan                                                                       |
| ------------ | ----------- | ---------------------------- | -------------------------------------------------------------------------------- |
| prefix       | VARCHAR(10) | wajib, UNIQUE (prefix, year) | `INV`, `PNW`, `ADD`, `BAST`, `PRJ`                                               |
| year         | SMALLINT    | wajib                        |                                                                                  |
| last\_number | INTEGER     | wajib, default 0             | dibaca dengan `SELECT … FOR UPDATE` di transaksi yang sama dengan insert dokumen |

### Progres

**`milestones`**

| Kolom         | Tipe                 | Aturan                            | Keterangan                                                           |
| ------------- | -------------------- | --------------------------------- | -------------------------------------------------------------------- |
| project\_id   | BIGINT FK → projects | wajib, UNIQUE (project\_id, sort) |                                                                      |
| sort          | SMALLINT             | wajib                             |                                                                      |
| title         | VARCHAR(150)         | wajib                             |                                                                      |
| description   | TEXT                 | null                              |                                                                      |
| due\_on       | DATE                 | null                              | target                                                               |
| completed\_at | TIMESTAMPTZ          | null                              | persen progres = milestone selesai ÷ total, dihitung, tidak disimpan |

**`progress_updates`** — entri linimasa portal.

| Kolom         | Tipe                   | Aturan                                    | Keterangan                              |
| ------------- | ---------------------- | ----------------------------------------- | --------------------------------------- |
| ulid          | CHAR(26)               | wajib, UNIQUE                             |                                         |
| project\_id   | BIGINT FK → projects   | wajib, INDEX (project\_id, published\_at) |                                         |
| milestone\_id | BIGINT FK → milestones | null                                      | pembaruan boleh tidak terkait milestone |
| body          | TEXT                   | wajib                                     |                                         |
| staging\_url  | VARCHAR(500)           | null                                      | divalidasi `https://`                   |
| published\_at | TIMESTAMPTZ            | null                                      | null = draf, tidak tampil di portal     |
| created\_by   | BIGINT FK → users      | wajib                                     |                                         |

### Revisi & garansi

**`revision_requests`**

| Kolom                  | Tipe                         | Aturan                             | Keterangan                                                       |
| ---------------------- | ---------------------------- | ---------------------------------- | ---------------------------------------------------------------- |
| ulid                   | CHAR(26)                     | wajib, UNIQUE                      |                                                                  |
| project\_id            | BIGINT FK → projects         | wajib, INDEX (project\_id, status) |                                                                  |
| portal\_session\_id    | BIGINT FK → portal\_sessions | wajib                              | diajukan klien lewat portal                                      |
| description            | TEXT                         | wajib                              |                                                                  |
| classification         | VARCHAR(16)                  | null, CHECK                        | `revision`, `scope_change`; null = belum diklasifikasi           |
| status                 | VARCHAR(20)                  | wajib, CHECK                       | `submitted`, `accepted`, `done`, `rejected`, `awaiting_addendum` |
| consumes\_quota        | BOOLEAN                      | wajib, default false               | true hanya bila `classification = revision` dan diterima         |
| addendum\_document\_id | BIGINT FK → documents        | null                               | Addendum untuk perubahan lingkup atau revisi berbayar            |
| classified\_at         | TIMESTAMPTZ                  | null                               |                                                                  |
| resolution\_note       | TEXT                         | null                               |                                                                  |
| resolved\_at           | TIMESTAMPTZ                  | null                               |                                                                  |

Sisa kuota = jumlah `revision_quota` dari semua versi Penawaran/Addendum yang `approved` − jumlah permintaan dengan `consumes_quota = true`. Tidak ada kolom "sisa kuota".

**`warranty_claims`**

| Kolom                  | Tipe                         | Aturan                             | Keterangan                                                                     |
| ---------------------- | ---------------------------- | ---------------------------------- | ------------------------------------------------------------------------------ |
| ulid                   | CHAR(26)                     | wajib, UNIQUE                      |                                                                                |
| project\_id            | BIGINT FK → projects         | wajib, INDEX (project\_id, status) |                                                                                |
| portal\_session\_id    | BIGINT FK → portal\_sessions | wajib                              |                                                                                |
| description            | TEXT                         | wajib                              | tangkapan layar di `files`                                                     |
| within\_period         | BOOLEAN                      | wajib                              | dihitung server saat diajukan dari `projects.warranty_ends_on`, lalu dibekukan |
| in\_scope              | BOOLEAN                      | null                               | dinilai admin; cakupan tidak bisa diputuskan mesin                             |
| status                 | VARCHAR(20)                  | wajib, CHECK                       | `submitted`, `in_progress`, `resolved`, `rejected`, `paid_offer`               |
| addendum\_document\_id | BIGINT FK → documents        | null                               | perbaikan berbayar                                                             |
| resolution\_note       | TEXT                         | wajib bila resolved/rejected       |                                                                                |
| resolved\_at           | TIMESTAMPTZ                  | null                               |                                                                                |

### Akses portal

**`portal_links`** — satu tautan per proyek; PIN melekat di tautan, bukan di klien.

| Kolom             | Tipe                 | Aturan              | Keterangan                                                                                                                                                          |
| ----------------- | -------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| project\_id       | BIGINT FK → projects | wajib, INDEX        |                                                                                                                                                                     |
| token\_hash       | CHAR(64)             | wajib, UNIQUE       | SHA-256 dari token acak ≥ 128 bit. SHA-256 cukup karena token berentropi tinggi; lookup tetap cepat lewat index                                                     |
| token\_encrypted  | TEXT                 | wajib               | token terenkripsi (encrypted cast, APP\_KEY) agar pesan WhatsApp berikutnya bisa memuat tautan yang sama; tidak pernah dipakai untuk lookup, tidak pernah masuk log |
| pin\_hash         | VARCHAR(255)         | wajib               | bcrypt/argon2; PIN berentropi rendah, jadi wajib hash lambat                                                                                                        |
| must\_change\_pin | BOOLEAN              | wajib, default true | true selama masih PIN awal atau setelah reset                                                                                                                       |
| pin\_changed\_at  | TIMESTAMPTZ          | null                |                                                                                                                                                                     |
| failed\_attempts  | SMALLINT             | wajib, default 0    | reset ke 0 saat PIN benar atau kunci berakhir                                                                                                                       |
| locked\_until     | TIMESTAMPTZ          | null                | +15 menit setelah 5 salah                                                                                                                                           |
| lockout\_count    | SMALLINT             | wajib, default 0    | 3 kali terkunci → beku                                                                                                                                              |
| frozen\_at        | TIMESTAMPTZ          | null                | hanya admin yang bisa mencairkan (reset PIN)                                                                                                                        |
| revoked\_at       | TIMESTAMPTZ          | null                | tautan dicabut permanen                                                                                                                                             |
| revoke\_reason    | TEXT                 | null                |                                                                                                                                                                     |
| last\_used\_at    | TIMESTAMPTZ          | null                |                                                                                                                                                                     |
| created\_by       | BIGINT FK → users    | wajib               |                                                                                                                                                                     |

Hanya satu tautan aktif per proyek, dijaga oleh partial unique index `portal_links (project_id) WHERE revoked_at IS NULL`. Tautan yang sudah dicabut tidak ikut dihitung, jadi riwayatnya tetap tersimpan.

**`portal_sessions`** — sesi "tetap masuk 30 hari" per perangkat. Hanya `created_at`.

| Kolom            | Tipe                      | Aturan                                       | Keterangan                                                                       |
| ---------------- | ------------------------- | -------------------------------------------- | -------------------------------------------------------------------------------- |
| portal\_link\_id | BIGINT FK → portal\_links | wajib, INDEX (portal\_link\_id, revoked\_at) |                                                                                  |
| token\_hash      | CHAR(64)                  | wajib, UNIQUE                                | hash nilai cookie; cookie mentah tidak disimpan                                  |
| ip\_address      | INET                      | wajib                                        | IP saat sesi dibuat                                                              |
| user\_agent      | TEXT                      | wajib                                        |                                                                                  |
| last\_seen\_at   | TIMESTAMPTZ               | wajib                                        | diperbarui paling sering sekali per 5 menit agar tidak menulis di setiap request |
| expires\_at      | TIMESTAMPTZ               | wajib                                        | dibuat + 30 hari                                                                 |
| revoked\_at      | TIMESTAMPTZ               | null                                         | ganti PIN, reset PIN, cabut tautan → semua sesi tautan itu diisi                 |

Sesi ini terpisah dari sesi ( Stack nya telah di rubah ke Next.Js dan ikuti sesuai dari dokuemn2 .10x ) milik admin. Cookie sesi portal hanya membawa token; validitas selalu dicek ke tabel ini, sehingga pencabutan langsung berlaku.

### Lintas modul

**`files`** — metadata semua berkas di storage privat. Hanya `created_at`; berkas tidak pernah ditimpa.

| Kolom                                | Tipe                      | Aturan                | Keterangan                                                                                                       |
| ------------------------------------ | ------------------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------- |
| ulid                                 | CHAR(26)                  | wajib, UNIQUE         | dipakai di URL bertanda tangan                                                                                   |
| fileable\_type, fileable\_id         | VARCHAR(50), BIGINT       | wajib, INDEX keduanya | relasi polimorfik ke `payments`, `warranty_claims`, `progress_updates`, `document_versions`, `revision_requests` |
| purpose                              | VARCHAR(30)               | wajib, CHECK          | `payment_proof`, `claim_screenshot`, `progress_attachment`, `version_pdf`, `revision_attachment`                 |
| disk, path                           | VARCHAR(20), VARCHAR(500) | wajib                 | path acak, bukan nama asli                                                                                       |
| original\_name                       | VARCHAR(255)              | wajib                 | hanya untuk tampilan unduhan                                                                                     |
| mime\_type                           | VARCHAR(100)              | wajib                 | hasil deteksi server, bukan dari browser                                                                         |
| size\_bytes                          | BIGINT                    | wajib                 |                                                                                                                  |
| sha256                               | CHAR(64)                  | wajib                 | integritas; untuk PDF versi harus sama dengan `document_versions.pdf_sha256`                                     |
| uploaded\_by\_type, uploaded\_by\_id | VARCHAR(16), BIGINT       | wajib                 | `admin` + users.id atau `client` + portal\_sessions.id                                                           |

**`activity_logs`** — jejak audit append-only. Hanya `created_at`.

| Kolom                      | Tipe                 | Aturan                                 | Keterangan                                                              |
| -------------------------- | -------------------- | -------------------------------------- | ----------------------------------------------------------------------- |
| project\_id                | BIGINT FK → projects | null, INDEX (project\_id, created\_at) | null untuk kejadian non-proyek (login admin)                            |
| actor\_type                | VARCHAR(16)          | wajib                                  | `admin`, `client`, `system`                                             |
| actor\_id                  | BIGINT               | null                                   |                                                                         |
| action                     | VARCHAR(60)          | wajib, INDEX                           | misal `pin.failed`, `link.locked`, `invoice.issued`, `payment.verified` |
| subject\_type, subject\_id | VARCHAR(50), BIGINT  | null                                   | objek yang terkena                                                      |
| properties                 | JSONB                | null                                   | nilai sebelum/sesudah; tidak pernah berisi PIN, token, atau hash-nya    |
| ip\_address                | INET                 | null                                   |                                                                         |
| user\_agent                | TEXT                 | null                                   |                                                                         |

## Constraint dan integritas

Aturan yang kalau dilanggar menimbulkan sengketa atau salah uang dijaga di dua lapis: kode (Action/Service + transaksi) dan database. Tabel ini memisahkan mana yang dijaga database dan mana yang hanya bisa dijaga kode.

| Aturan bisnis (PRD)                                     | Dijaga database                                                                                                                    | Dijaga kode                                                                                           |
| ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Nomor invoice/dokumen unik, aman dari request bersamaan | `UNIQUE(number)`, `UNIQUE(prefix, year)`                                                                                           | `SELECT … FOR UPDATE` pada `number_sequences` di transaksi yang sama                                  |
| Satu termin, satu invoice                               | `UNIQUE(invoices.installment_id)`                                                                                                  | —                                                                                                     |
| Invoice dan termin milik proyek yang sama               | composite FK `(installment_id, project_id)` → `installments(id, project_id)`                                                       | —                                                                                                     |
| Satu versi, satu keputusan                              | `UNIQUE(document_decisions.document_version_id)`                                                                                   | lock baris versi saat memutuskan                                                                      |
| Versi beku setelah dikirim                              | trigger `BEFORE UPDATE` menolak perubahan kolom isi bila `sent_at IS NOT NULL`                                                     | Policy/Action menolak edit; model melempar exception                                                  |
| Klien menyetujui isi yang ia lihat                      | —                                                                                                                                  | `document_decisions.content_sha256` dibandingkan dengan hash versi sebelum insert                     |
| Jumlah termin = total dokumen                           | — (lintas baris, tidak bisa CHECK)                                                                                                 | Action menyimpan versi + termin dalam satu transaksi; unit test pembulatan                            |
| Satu tautan aktif per proyek                            | `partial unique index pada project_id WHERE revoked_at IS NULL`                                                                    | Action "buat ulang tautan" mencabut yang lama dulu                                                    |
| Uang tidak negatif, tanggal masuk akal                  | `CHECK` pada amount, due\_on ≥ issued\_on, warranty\_ends\_on ≥ warranty\_starts\_on                                               | validasi Form Request                                                                                 |
| Status hanya nilai yang dikenal                         | `CHECK (status IN (…))`                                                                                                            | PHP backed enum                                                                                       |
| Status proyek hanya berubah lewat transisi sah          | —                                                                                                                                  | satu kelas state machine; kolom `status` tidak masuk `$fillable`                                      |
| Log audit tidak bisa diubah                             | trigger menolak `UPDATE`/`DELETE` pada `activity_logs`, `project_status_histories`, `document_decisions` (kecuali `admin_seen_at`) | tidak ada method update/delete di model                                                               |
| Tidak ada hapus permanen                                | semua FK `ON DELETE RESTRICT`                                                                                                      | tidak ada route delete untuk tabel keuangan                                                           |
| Kuota revisi tidak minus                                | —                                                                                                                                  | klasifikasi "revisi" mengunci baris `projects` (`FOR UPDATE`), hitung sisa, baru set `consumes_quota` |
| Scoping portal (anti IDOR)                              | `project_id` ada di setiap tabel yang dibaca portal                                                                                | semua query portal lewat `$link->project->…`, ditambah ULID di URL                                    |

Index di luar FK dan UNIQUE sudah tercantum di kamus data; patokannya: setiap daftar di dasbor (tagihan terlambat, antrean tindak lanjut, rekap bulanan) punya index komposit yang cocok dengan filter + urutannya.

## Keputusan desain dan koreksi terhadap PRD

Empat keputusan pertama mengubah atau mempertegas PRD dan sudah disetujui serta dimasukkan ke PRD; sisanya pilihan desain yang konsisten dengan PRD.

**Mengubah atau mempertegas PRD**

1. **Versi beku saat dikirim, bukan saat disetujui.** PRD (story 15, aturan "immutable setelah disetujui") membuka celah: versi yang sudah dikirim masih bisa diedit, lalu klien menyetujui isi yang berbeda dari yang ia baca. Di desain ini `sent_at` adalah titik beku; perubahan apa pun setelahnya = versi baru (story 14 tetap terpenuhi).
2. **Hash utama dari data kanonik, PDF dibuat sekali.** Library PDF tidak menjamin byte yang sama di setiap render, jadi hash PDF tidak bisa dipakai untuk membuktikan isi. `content_sha256` dihitung dari JSON kanonik (kunci terurut, tanpa spasi) yang disimpan apa adanya sebagai TEXT; PDF dirender sekali saat dikirim, disimpan, dan `pdf_sha256`-nya dicatat. Yang diunduh klien selalu berkas itu, tidak pernah render ulang.
3. **Kuota revisi dihitung, bukan dikurangi.** Flowchart menulis "Kurangi kuota". Kolom penghitung yang dikurangi bisa melenceng (request ganda, bug, koreksi manual) dan tidak bisa diaudit. Sisa kuota = total kuota dari versi yang disetujui − jumlah permintaan `consumes_quota`.
4. **Tanggal garansi disimpan beku di `projects`.** Keputusan terbuka "garansi mulai saat BAST atau saat pelunasan" cukup mengubah kapan kolom itu diisi, tanpa mengubah skema. Klaim juga menyimpan `within_period` saat diajukan, sehingga perubahan aturan di masa depan tidak mengubah status klaim lama.

**Pilihan desain**

5. **Termin melekat pada versi dokumen.** `installments.document_version_id` membuat jadwal pembayaran ikut disetujui dan ikut beku. Addendum otomatis bisa membawa termin tambahan tanpa tabel baru.
6. **Invoice dibuat saat pemicunya terjadi.** DP terbit saat Penawaran disetujui, pelunasan saat BAST disetujui, termin tengah secara manual. Nomor hanya terpakai oleh invoice yang benar-benar ada, dan "mengaktifkan invoice pelunasan" sama dengan menerbitkannya.
7. **Satu tabel keputusan untuk setuju, tolak, dan minta perubahan.** Setiap versi diputuskan tepat sekali, jadi `UNIQUE(document_version_id)` cukup tanpa partial index.
8. **PIN tidak pernah masuk bukti.** Bukti menyimpan `pin_reverified_at` dan `portal_session_id`, bukan PIN atau hash-nya. Kekuatan bukti datang dari rangkaian: sesi → tautan → PIN yang hanya diketahui klien → riwayat ganti PIN di `activity_logs`.
9. **Antrean "menunggu tindak lanjut" diturunkan, bukan disimpan.** Isinya: `payments` berstatus `pending`, `revision_requests` dan `warranty_claims` berstatus `submitted`, `document_decisions` dengan `admin_seen_at` kosong. Tabel notifikasi terpisah akan menjadi fakta kedua yang bisa tidak sinkron.
10. **`project_status_histories` terpisah dari `activity_logs`.** Log aktivitas mencatat semua hal; riwayat status khusus state machine, sehingga durasi per status (misal "Menunggu DP" rata-rata berapa hari) bisa dihitung dengan satu query. Ini juga bahan indikator bila sistem menjadi tugas akhir.
11. **`files` polimorfik.** Trade-off yang disadari: kolom `fileable_id` tidak bisa diberi FK. Dikompensasi dengan morph map yang di-enforce (`Relation::enforceMorphMap`), tanpa penghapusan, dan `purpose` yang dicek.
12. **Rekap pemasukan tanpa tabel.** Rekap = `SUM(amount)` dari `payments` `verified` per bulan `transferred_on` (basis kas). Tabel rekap terpisah akan basi setiap kali ada koreksi.
13. **Tautan per proyek, bukan per klien.** Sesuai asumsi A2. Akibatnya klien dengan dua proyek punya dua PIN. Bila nanti mengganggu, tautan bisa dipindah ke `clients` dengan migrasi data satu arah; ini sengaja ditunda.

14) **PostgreSQL 18, bukan MySQL.** Diputuskan 16 Okt 2026 bersama stack ( Stack nya telah di rubah ke Next.Js dan ikuti sesuai dari dokuemn2 .10x ) 13. Yang langsung dipakai skema ini: partial unique index (satu tautan aktif per proyek), DDL transaksional (migration yang gagal dibatalkan utuh, tidak meninggalkan tabel setengah jadi), `TIMESTAMPTZ`, `INET`, dan CHECK yang selalu ditegakkan. Konsekuensinya: tidak ada tipe unsigned, dan setiap kolom FK butuh index eksplisit.
15) **Snapshot dokumen disimpan sebagai `TEXT`.** Koreksi atas bug laten di versi awal dokumen ini, yang memakai tipe JSON untuk `content`. MySQL `JSON` dan PostgreSQL `JSONB` sama-sama menormalkan isi (urutan kunci, spasi), sehingga hash yang dihitung ulang bisa berbeda dari hash saat persetujuan, tepat ketika bukti dibutuhkan dalam sengketa. Teks kini disimpan persis seperti saat di-hash.

## Penelusuran ke user story dan flowchart

Ke-58 user story punya tempat di skema; dua temuan mengubah PRD dan satu mengubah flowchart.

| Story                        | Tabel dan kolom yang memenuhi                                                                                                            |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| 1–4 Klien dan proyek         | `clients`, `projects.status`, `projects.cancelled_at` + `cancel_reason`                                                                  |
| 5–16 Penawaran/SPK           | `document_templates`, `document_versions` (kuota, kebijakan revisi, garansi, `sent_at`, hash), `installments`, `document_decisions`      |
| 17–27 Tagihan dan pembayaran | `installments.trigger_event`, `invoices` + `number_sequences`, `payments`, `bank_accounts`; DP gate lewat `installments.is_down_payment` |
| 28–31 Progres                | `milestones`, `progress_updates`, `files` (lampiran)                                                                                     |
| 32–36 Revisi dan lingkup     | `revision_requests`, `documents.parent_document_id` (Addendum), `document_versions.revision_quota`                                       |
| 37–39 BAST                   | `documents.type = bast`, `document_version_items`, `installments.trigger_event = on_bast`                                                |
| 40–43 Garansi                | `projects.warranty_*_on`, `warranty_claims.within_period` + `in_scope`                                                                   |
| 44–55 Akses dan keamanan     | `users` (2FA), `portal_links`, `portal_sessions`, `activity_logs`, `files` (`version_pdf`)                                               |
| 56–58 Konfirmasi WhatsApp    | tidak perlu tabel; antrean tindak lanjut diturunkan dari status (keputusan 9)                                                            |

**Temuan**

1. **Token tautan tidak bisa hanya disimpan sebagai hash.** PRD menulis "database hanya menyimpan hash-nya", tetapi story 10, 25, dan 31 meminta pesan WhatsApp berisi tautan portal berkali-kali sepanjang proyek. Dengan hash saja, tautan hanya bisa ditampilkan sekali. Solusi: `token_hash` untuk lookup + `token_encrypted` untuk menyusun pesan. Risiko sisa: bila database dan `APP_KEY` bocor bersamaan, tautan terbaca, tetapi PIN klien tetap menghalangi. PRD bagian Keamanan perlu disesuaikan.
2. **Batas pembatalan DP belum punya tempat.** Flowchart Pembayaran memakai "lewat batas pembatalan?" dan keputusan terbuka PRD menanyakan berapa hari serta berapa kali pengingat. Untuk sekarang batas hari menjadi konfigurasi aplikasi, dan jumlah pengingat dihitung dari `activity_logs` aksi `invoice.reminder_opened`. Bila nanti berbeda per proyek, tambahkan `projects.cancel_after_days`.
3. **Flowchart ringkasan end-to-end melompati klasifikasi.** Di sana "Ajukan revisi" langsung ke "Kurangi kuota revisi", sedangkan flowchart Progres & Revisi lewat "Klasifikasi permintaan" dulu. Skema mengikuti flowchart rinci; ringkasan sebaiknya diperbaiki agar penguji tidak menemukan dua versi aturan.

Identitas usaha (nama, alamat, logo, nomor WhatsApp penyedia) cukup di konfigurasi, karena yang tercetak di dokumen sudah ikut dibekukan di `document_versions.content`.

## Risiko dan pertanyaan terbuka

| Risiko                                             | Akibat                                                                        | Mitigasi di skema                                                                                                                            |
| -------------------------------------------------- | ----------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Trigger lupa ikut saat restore atau pindah server  | Versi beku dan log bisa diubah tanpa ketahuan                                 | Trigger dibuat di migration, bukan manual; feature test memastikan `UPDATE` pada versi `sent` gagal                                          |
| Versi PostgreSQL di laptop, CI, dan server berbeda | Perilaku planner, collation, atau fungsi berbeda; bug baru muncul di produksi | Kunci versi mayor 18 di image Docker yang sama untuk lokal, tes, dan produksi; upgrade versi mayor direncanakan sebagai pekerjaan tersendiri |
| JSON kanonik berubah format antar versi kode       | Hash lama tidak bisa diverifikasi ulang                                       | Simpan `content` apa adanya; verifikasi = hash ulang dari kolom tersimpan, bukan dari data yang disusun ulang                                |
| `files` polimorfik tanpa FK                        | Berkas yatim bila ada bug                                                     | Tanpa delete, morph map ketat, job pemeriksa berkas tanpa pemilik                                                                            |
| Kebocoran `APP_KEY`                                | Token terenkripsi, secret 2FA terbaca                                         | `APP_KEY` hanya di env server, rotasi dengan `APP_PREVIOUS_KEYS`; PIN tetap melindungi portal                                                |
| Skema terlalu lengkap untuk MVP                    | Waktu habis di migration yang belum dipakai                                   | Buat migration per rilis: MVP 18 tabel, iterasi 2 menambah 3 (progres, revisi), iterasi 3 menambah 1 (garansi)                               |

**Perlu dijawab sebelum migration ditulis**

- [x] Setujui empat koreksi PRD di bagian Keputusan desain (beku saat kirim, hash data kanonik, kuota dihitung, garansi disimpan beku) dan temuan token terenkripsi. Disetujui 16 Oktober 2026; PRD sudah diperbarui.
- [ ] Garansi mulai saat BAST disetujui atau saat pelunasan? Skema siap untuk keduanya; jawabannya hanya menentukan kapan `warranty_starts_on` diisi.
- [ ] Batas hari pembatalan bila DP tidak dibayar, dan apakah boleh berbeda per proyek.
- [x] Bolehkah invoice dibayar bertahap (`partially_paid`)? Diputuskan 16 Oktober 2026: boleh bertahap. Status partially\_paid dipakai; portal menampilkan sisa tagihan dan riwayat pembayaran per invoice.
- [ ] Apakah sistem ini topik tugas akhir? Bila ya, `project_status_histories` dan `activity_logs` menjadi sumber data indikator, dan baseline perlu diisi sebelum implementasi.
