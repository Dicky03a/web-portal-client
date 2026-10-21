# COPY — Portal Proyek Jasa Website

Source: docs/design/UX.md | Bahasa: id | Versi: 0.1

---

## 1. Suara dan nada

- **Sapaan:** Anda
- **Kepribadian:** profesional, jelas, ringkas

| Ya | Jangan |
|---|---|
| "Penawaran berhasil disetujui." | "Penawaran Anda telah berhasil diproses oleh sistem kami." |
| "PIN salah. 3 percobaan tersisa." | "Anda salah memasukkan PIN." |
| "Belum ada invoice." | "Tidak ada invoice yang tersedia saat ini." |
| "Kirim penawaran ke klien?" | "Apakah Anda yakin ingin mengirimkan penawaran ini kepada klien?" |

Nada menyesuaikan konteks:
- **Sukses/konfirmasi:** hangat, singkat, langsung informasi selanjutnya.
- **Error:** tenang, jelas sebabnya, arahkan solusi.
- **Destruktif (hapus/batalkan):** tegas, sebut konsekuensi, tombol spesifik.
- **Empty state:** mengundang, jelaskan fungsi tempat ini, satu aksi untuk mengisi.

---

## 2. Aturan penulisan

Menggunakan default dari copy-guidelines.md kecuali:

- Judul layar admin: maks 40 karakter, sentence case, tanpa titik.
- Portal client: judul maks 36 karakter — layar lebih sempit, terutama di ponsel.
- Semua tanggal: format `12 Okt 2026`.
- Semua waktu: format 24 jam `14.30`.
- Mata uang: `Rp 1.250.000` (spasi setelah Rp, titik pemisah ribuan).
- Nomor invoice: `INV-2026-0001`.
- Field wajib: tanpa tanda bintang — semua field wajib kecuali ditandai "(opsional)".
- PIN: selalu disebut "PIN", bukan "kata sandi" atau "password".
- Status proyek: selalu pakai label Indonesia dari glosarium, bukan kode internal.

---

## 3. Glosarium

| Konsep | Pakai | Hindari |
|---|---|---|
| Penawaran | Penawaran | Quotation, SPK, Proposal, Quote |
| BAST | BAST (Berita Acara Serah Terima) | Handover, Serah Terima (tanpa BAST) |
| Addendum | Addendum | Perubahan penawaran, Revisi penawaran |
| Termin | Termin | Cicilan, Angsuran, Installment |
| Invoice | Invoice | Tagihan, Faktur |
| DP | DP (Uang Muka) | Down payment, Panjar |
| PIN | PIN | Password, Kata sandi, Kode akses |
| PIN awal | PIN awal | PIN sementara, PIN default |
| Bukti transfer | Bukti transfer | Bukti bayar, Struk, Receipt |
| Kuota revisi | Kuota revisi | Jatah revisi, Batas revisi |
| Perubahan lingkup | Perubahan lingkup | Scope creep, Fitur tambahan |
| Tautan portal | Tautan portal | Link portal, URL portal |
| Penyedia jasa | Penyedia jasa | Admin, Freelancer |
| Klien | Klien | Client, Pelanggan, Customer |
| Proyek | Proyek | Project, Pekerjaan |
| Garansi | Garansi | Warranty, Jaminan |
| Klaim garansi | Klaim garansi | Laporan bug, Keluhan |
| Rekening tujuan | Rekening tujuan | Rekening bank, Nomor rekening |
| Jatuh tempo | Jatuh tempo | Deadline, Batas waktu |
| Lunas | Lunas | Paid, Terbayar |
| Verifikasi | Verifikasi | Approve, Konfirmasi pembayaran |
| Log aktivitas | Log aktivitas | Audit trail, Riwayat |

---

## 4. Variabel

| Variabel | Arti | Contoh | Maks |
|---|---|---|---|
| {nama_proyek} | Nama proyek | Website Toko Kue Manis | 80 |
| {nama_klien} | Nama lengkap klien | Dicky Adi Saputra | 60 |
| {nama_usaha} | Nama usaha klien | CV Jaya Abadi | 60 |
| {status_proyek} | Label status proyek (Indonesia) | Menunggu DP | 24 |
| {nomor_invoice} | Nomor invoice | INV-2026-0001 | 16 |
| {jumlah_rupiah} | Nominal dalam Rupiah | Rp 15.000.000 | 20 |
| {tanggal} | Tanggal format Indonesia | 12 Okt 2026 | 12 |
| {sisa_percobaan} | Sisa percobaan PIN | 3 | 1 |
| {durasi_lockout} | Menit sisa lockout | 15 | 2 |
| {versi_dokumen} | Nomor versi dokumen | 2 | 2 |
| {label_termin} | Label termin | DP 50% | 24 |
| {jumlah_item} | Jumlah item penawaran | 5 | 3 |
| {total_harga} | Total harga penawaran | Rp 15.000.000 | 20 |
| {sisa_kuota_revisi} | Sisa kuota revisi | 2 | 2 |
| {total_kuota_revisi} | Total kuota revisi | 3 | 2 |
| {tanggal_jatuh_tempo} | Tanggal jatuh tempo | 12 Okt 2026 | 12 |
| {hari_terlambat} | Jumlah hari lewat jatuh tempo | 7 | 3 |
| {tanggal_mulai_garansi} | Tanggal mulai garansi | 12 Okt 2026 | 12 |
| {tanggal_akhir_garansi} | Tanggal akhir garansi | 12 Jan 2027 | 12 |
| {sisa_hari_garansi} | Sisa hari garansi | 45 | 3 |
| {durasi_garansi} | Durasi garansi | 90 hari | 10 |
| {nama_bank} | Nama bank tujuan | BCA | 20 |
| {nomor_rekening} | Nomor rekening tujuan | 1234567890 | 20 |
| {atas_nama} | Nama pemilik rekening | Dicky Adi Saputra | 60 |
| {nomor_whatsapp} | Nomor WhatsApp penyedia | 08123456789 | 15 |
| {tautan_portal} | URL portal klien | portal.domain.com/p/abc123 | 80 |
| {jumlah_proyek_aktif} | Jumlah proyek aktif | 5 | 3 |
| {total_belum_lunas} | Total tagihan belum lunas | Rp 25.000.000 | 20 |
| {pemasukan_bulan} | Pemasukan bulan ini | Rp 10.000.000 | 20 |
| {ukuran_maks_file} | Ukuran maks file (MB) | 5 | 2 |
| {nomor_dokumen} | Nomor/referensi dokumen | QUO-2026-0001 | 20 |
| {alasan} | Alasan pembatalan/penolakan | Klien meminta perubahan | 80 |
| {catatan} | Catatan dari klien/admin | Mohon revisi warna header | 80 |
| {item} | Nama objek yang dihapus | Termin DP 50% | 60 |
| {jumlah_termin} | Total nilai semua termin | Rp 15.000.000 | 20 |
| {pin_awal} | PIN awal yang digenerate sistem | 827364 | 6 |
| {selisih} | Selisih nominal termin vs total | Rp 500.000 | 20 |
| {skema_termin} | Ringkasan skema termin | 2 termin: DP 50%, Pelunasan 50% | 80 |

---

## 5. Teks global

### 5.1 Tombol umum

| Key | Teks | Maks | Catatan |
|---|---|---|---|
| global.cta.save | Simpan | 20 | |
| global.cta.save_draft | Simpan Draft | 20 | |
| global.cta.cancel | Batal | 20 | |
| global.cta.back | Kembali | 20 | |
| global.cta.close | Tutup | 20 | |
| global.cta.delete | Hapus | 20 | |
| global.cta.edit | Edit | 20 | |
| global.cta.download | Unduh | 20 | |
| global.cta.download_pdf | Unduh PDF | 20 | |
| global.cta.retry | Coba Lagi | 20 | |
| global.cta.confirm | Konfirmasi | 20 | |
| global.cta.send | Kirim | 20 | |
| global.cta.next | Lanjut | 20 | |
| global.cta.add | Tambah | 20 | |
| global.cta.search | Cari | 20 | |
| global.cta.filter | Filter | 20 | |
| global.cta.copy | Salin | 20 | |
| global.cta.preview | Pratinjau | 20 | |

### 5.2 Label umum

| Key | Teks | Maks | Catatan |
|---|---|---|---|
| global.label.required_note | Semua field wajib diisi kecuali ditandai "(opsional)" | 80 | Ditampilkan sekali di awal form |
| global.label.optional | (opsional) | 12 | Suffix pada label field |
| global.label.loading | Memuat... | 12 | |
| global.label.no_data | — | 1 | Dash untuk cell kosong di tabel |

### 5.3 Status proyek (9 status)

| Key | Teks | Maks | Catatan |
|---|---|---|---|
| global.status.draft | Draf | 14 | Badge |
| global.status.quotation_sent | Penawaran Terkirim | 20 | Badge — sengaja melebihi 14 untuk kejelasan |
| global.status.awaiting_down_payment | Menunggu DP | 14 | Badge |
| global.status.in_progress | Dalam Pengerjaan | 18 | Badge |
| global.status.client_review | Review Klien | 14 | Badge |
| global.status.handover_sent | BAST Terkirim | 14 | Badge |
| global.status.warranty | Garansi | 14 | Badge |
| global.status.completed | Selesai | 14 | Badge |
| global.status.cancelled | Dibatalkan | 14 | Badge |

### 5.4 Status invoice (6 status)

| Key | Teks | Maks | Catatan |
|---|---|---|---|
| global.invoice_status.draft | Draf | 14 | |
| global.invoice_status.sent | Terkirim | 14 | |
| global.invoice_status.partially_paid | Sebagian | 14 | |
| global.invoice_status.paid | Lunas | 14 | |
| global.invoice_status.overdue | Jatuh Tempo | 14 | Badge merah |
| global.invoice_status.cancelled | Dibatalkan | 14 | |

### 5.5 Status pembayaran

| Key | Teks | Maks | Catatan |
|---|---|---|---|
| global.payment_status.pending | Menunggu Verifikasi | 20 | |
| global.payment_status.verified | Terverifikasi | 14 | |
| global.payment_status.rejected | Ditolak | 14 | |

### 5.6 Error global

| Key | Teks | Maks | Catatan |
|---|---|---|---|
| global.error.network | Koneksi terputus. Periksa internet Anda lalu coba lagi. | 70 | |
| global.error.server | Terjadi gangguan pada server. Coba lagi dalam beberapa saat. | 70 | |
| global.error.session_expired | Sesi Anda telah berakhir. Silakan masuk kembali. | 60 | |
| global.error.forbidden | Anda tidak memiliki akses ke halaman ini. | 60 | |
| global.error.not_found | Halaman tidak ditemukan. | 40 | |
| global.error.file_too_large | File melebihi {ukuran_maks_file} MB. Pilih file lebih kecil. | 70 | |
| global.error.file_invalid_type | Format file tidak didukung. Gunakan JPG, PNG, atau PDF. | 70 | |
| global.error.file_empty | File kosong. Pilih file lain. | 40 | |
| global.error.generic_field | Field ini wajib diisi. | 30 | |

### 5.7 Toast / notifikasi sukses

| Key | Teks | Maks | Catatan |
|---|---|---|---|
| global.toast.saved | Perubahan berhasil disimpan. | 60 | |
| global.toast.deleted | Data berhasil dihapus. | 60 | |
| global.toast.copied | Berhasil disalin ke clipboard. | 60 | |
| global.toast.sent | Berhasil dikirim. | 60 | |
| global.toast.uploaded | File berhasil diunggah. | 60 | |

### 5.8 Konfirmasi destruktif umum

| Key | Teks | Maks | Catatan |
|---|---|---|---|
| global.confirm.delete.title | Hapus {item}? | 48 | {item} = nama objek |
| global.confirm.delete.body | Data yang dihapus tidak dapat dikembalikan. | 70 | |
| global.confirm.delete.cta | Hapus | 20 | Tombol destructive |

### 5.9 Template pesan WhatsApp

| Key | Teks | Maks | Catatan |
|---|---|---|---|
| global.wa.quotation_sent | Halo {nama_klien}, penawaran untuk proyek "{nama_proyek}" sudah siap. Silakan buka tautan berikut untuk melihat dan menyetujui: {tautan_portal} — PIN dikirim terpisah. | 300 | Admin → klien |
| global.wa.pin_initial | PIN awal Anda: {pin_awal}. Gunakan PIN ini untuk masuk ke portal, lalu buat PIN baru Anda sendiri. Jangan bagikan PIN ini ke siapa pun. | 200 | Admin → klien (pesan terpisah) |
| global.wa.payment_reminder | Halo {nama_klien}, invoice {nomor_invoice} sebesar {jumlah_rupiah} untuk proyek "{nama_proyek}" jatuh tempo pada {tanggal_jatuh_tempo}. Silakan lakukan pembayaran dan unggah buktinya di portal: {tautan_portal} | 300 | Admin → klien |
| global.wa.progress_update | Halo {nama_klien}, ada pembaruan progres untuk proyek "{nama_proyek}". Lihat detailnya di portal: {tautan_portal} | 200 | Admin → klien (Iterasi 2) |
| global.wa.bast_sent | Halo {nama_klien}, BAST untuk proyek "{nama_proyek}" sudah siap. Silakan review dan setujui di portal: {tautan_portal} | 200 | Admin → klien (Iterasi 2) |
| global.wa.client_approved | Halo, saya telah menyetujui penawaran untuk proyek "{nama_proyek}". Nomor dokumen: {nomor_dokumen}. | 150 | Klien → admin |
| global.wa.client_rejected | Halo, saya meminta perubahan pada penawaran untuk proyek "{nama_proyek}". Silakan cek catatan saya di portal. | 150 | Klien → admin |
| global.wa.client_payment | Halo, saya telah mengunggah bukti transfer untuk invoice {nomor_invoice} proyek "{nama_proyek}". Mohon diverifikasi. | 150 | Klien → admin |
| global.wa.client_revision | Halo, saya mengajukan revisi untuk proyek "{nama_proyek}". Silakan cek detailnya di portal. | 150 | Klien → admin (Iterasi 2) |
| global.wa.client_warranty | Halo, saya mengajukan klaim garansi untuk proyek "{nama_proyek}". Silakan cek detailnya di portal. | 150 | Klien → admin (Iterasi 3) |
| global.wa.new_portal_link | Halo {nama_klien}, tautan portal Anda yang baru untuk proyek "{nama_proyek}": {tautan_portal} — PIN baru dikirim terpisah. | 200 | Admin → klien (setelah cabut + buat ulang) |

---

## 6. Teks per layar

### S-01 · Login Admin

| Key | Teks | Maks | Catatan |
|---|---|---|---|
| s01.title | Masuk ke Portal Proyek | 40 | |
| s01.field.email.label | Email | 28 | |
| s01.field.email.placeholder | nama@email.com | 40 | |
| s01.field.password.label | Kata sandi | 28 | |
| s01.field.password.placeholder | Masukkan kata sandi | 40 | |
| s01.cta.login | Masuk | 24 | |
| s01.totp.title | Verifikasi dua langkah | 40 | Step 2 |
| s01.totp.body | Masukkan kode 6 digit dari aplikasi autentikasi Anda. | 80 | |
| s01.field.totp.label | Kode TOTP | 28 | |
| s01.field.totp.placeholder | 000000 | 40 | |
| s01.cta.verify | Verifikasi | 24 | |
| s01.error.credentials | Email atau kata sandi salah. | 70 | Tidak spesifik field mana |
| s01.error.totp | Kode tidak valid. Periksa kembali kode dari aplikasi Anda. | 70 | |
| s01.error.locked | Terlalu banyak percobaan. Coba lagi dalam {durasi_lockout} menit. | 70 | |
| s01.loading | Memverifikasi... | 20 | |

### S-02 · Setup 2FA

| Key | Teks | Maks | Catatan |
|---|---|---|---|
| s02.title | Aktifkan Verifikasi Dua Langkah | 40 | |
| s02.body | Pindai kode QR berikut dengan aplikasi autentikasi (Google Authenticator, Authy, dsb.), lalu masukkan kode 6 digit untuk mengonfirmasi. | 200 | Instruksi panjang, di bawah QR |
| s02.field.totp.label | Kode konfirmasi | 28 | |
| s02.field.totp.placeholder | 000000 | 40 | |
| s02.cta.activate | Aktifkan 2FA | 24 | |
| s02.error.totp | Kode tidak cocok. Pastikan waktu perangkat Anda sinkron. | 70 | |
| s02.toast.success | Verifikasi dua langkah berhasil diaktifkan. | 60 | |

### S-03 · Dashboard

| Key | Teks | Maks | Catatan |
|---|---|---|---|
| s03.title | Dashboard | 40 | |
| s03.greeting | Halo! | 40 | Tanpa nama — admin tunggal |
| s03.card.active_projects | Proyek Aktif | 48 | Kartu ringkasan |
| s03.card.active_projects.value | {jumlah_proyek_aktif} | 24 | Angka besar |
| s03.card.unpaid_invoices | Tagihan Belum Lunas | 48 | |
| s03.card.unpaid_invoices.value | {total_belum_lunas} | 20 | Format Rupiah |
| s03.card.monthly_income | Pemasukan Bulan Ini | 48 | |
| s03.card.monthly_income.value | {pemasukan_bulan} | 20 | Format Rupiah |
| s03.section.actions | Menunggu Tindakan | 40 | |
| s03.action.payment_pending | Pembayaran menunggu verifikasi | 48 | + badge count |
| s03.action.quotation_rejected | Penawaran ditolak / diminta perubahan | 48 | |
| s03.action.warranty_claim | Klaim garansi baru | 48 | Iterasi 3 |
| s03.section.overdue | Invoice Jatuh Tempo | 40 | |
| s03.section.recent_projects | Proyek Terakhir Diperbarui | 40 | |
| s03.cta.new_project | + Proyek Baru | 24 | |
| s03.cta.new_client | + Klien Baru | 24 | |
| s03.empty.title | Belum ada proyek | 36 | |
| s03.empty.body | Mulai dengan menambah klien, lalu buat proyek pertama Anda. | 90 | |
| s03.empty.cta | Tambah Klien | 24 | |
| s03.loading | Memuat dashboard... | 20 | |

### S-04 · Daftar Klien

| Key | Teks | Maks | Catatan |
|---|---|---|---|
| s04.title | Klien | 40 | |
| s04.cta.add | + Tambah Klien | 24 | |
| s04.field.search.placeholder | Cari nama atau usaha... | 40 | |
| s04.table.name | Nama | 28 | Kolom |
| s04.table.business | Usaha | 28 | |
| s04.table.whatsapp | WhatsApp | 28 | |
| s04.table.projects | Proyek | 28 | Jumlah |
| s04.empty.title | Belum ada klien | 36 | |
| s04.empty.body | Tambah klien pertama untuk mulai membuat proyek. | 90 | |
| s04.empty.cta | Tambah Klien | 24 | |

### S-05 · Form Klien

| Key | Teks | Maks | Catatan |
|---|---|---|---|
| s05.title.create | Tambah Klien | 40 | |
| s05.title.edit | Edit Klien | 40 | |
| s05.field.name.label | Nama lengkap | 28 | |
| s05.field.name.placeholder | Nama lengkap klien | 40 | |
| s05.field.business.label | Nama usaha | 28 | |
| s05.field.business.placeholder | PT / CV / Toko (opsional) | 40 | |
| s05.field.whatsapp.label | Nomor WhatsApp | 28 | |
| s05.field.whatsapp.placeholder | 08123456789 | 40 | |
| s05.field.email.label | Email | 28 | |
| s05.field.email.placeholder | nama@email.com (opsional) | 40 | |
| s05.cta.save | Simpan Klien | 24 | |
| s05.error.name_required | Nama klien wajib diisi. | 70 | |
| s05.error.whatsapp_required | Nomor WhatsApp wajib diisi. | 70 | |
| s05.error.whatsapp_format | Nomor WhatsApp harus diawali 08 atau +62. | 70 | |
| s05.error.email_format | Format email tidak valid. | 70 | |
| s05.toast.created | Klien berhasil ditambahkan. | 60 | |
| s05.toast.updated | Data klien berhasil diperbarui. | 60 | |

### S-06 · Detail Klien

| Key | Teks | Maks | Catatan |
|---|---|---|---|
| s06.title | Detail Klien | 40 | |
| s06.label.name | Nama | 28 | |
| s06.label.business | Usaha | 28 | |
| s06.value.business | {nama_usaha} | 60 | Data klien |
| s06.label.whatsapp | WhatsApp | 28 | |
| s06.value.whatsapp | {nomor_whatsapp} | 16 | Data klien |
| s06.label.email | Email | 28 | |
| s06.section.projects | Proyek | 40 | |
| s06.cta.edit | Edit Klien | 24 | |
| s06.cta.new_project | + Buat Proyek | 24 | |
| s06.empty.projects.title | Belum ada proyek | 36 | |
| s06.empty.projects.body | Buat proyek pertama untuk klien ini. | 90 | |

### S-07 · Daftar Proyek

| Key | Teks | Maks | Catatan |
|---|---|---|---|
| s07.title | Proyek | 40 | |
| s07.cta.add | + Proyek Baru | 24 | |
| s07.field.search.placeholder | Cari nama proyek... | 40 | |
| s07.field.filter_status.label | Status | 28 | Dropdown filter |
| s07.field.filter_status.all | Semua Status | 14 | |
| s07.table.name | Nama Proyek | 28 | |
| s07.table.client | Klien | 28 | |
| s07.table.status | Status | 28 | |
| s07.table.status.value | {status_proyek} | 24 | Badge status |
| s07.table.updated | Terakhir Diperbarui | 28 | |
| s07.empty.title | Belum ada proyek | 36 | |
| s07.empty.body | Buat proyek baru dari halaman klien. | 90 | |

### S-08 · Detail Proyek

| Key | Teks | Maks | Catatan |
|---|---|---|---|
| s08.tab.overview | Overview | 12 | |
| s08.tab.documents | Dokumen | 12 | |
| s08.tab.billing | Tagihan | 12 | |
| s08.tab.progress | Progres | 12 | Iterasi 2 |
| s08.tab.revisions | Revisi | 12 | Iterasi 2 |
| s08.tab.warranty | Garansi | 12 | Iterasi 3 |
| s08.tab.log | Log | 12 | |
| s08.label.client | Klien | 28 | |
| s08.label.status | Status | 28 | |
| s08.label.portal_link | Tautan Portal | 28 | |
| s08.label.initial_pin | PIN Awal | 28 | Hanya jika belum diganti |
| s08.cta.create_quotation | Buat Penawaran | 24 | Status = draft |
| s08.cta.cancel_project | Batalkan Proyek | 24 | Danger |
| s08.cta.manage_link | Kelola Tautan | 24 | |
| s08.cta.copy_link | Salin Tautan | 24 | |
| s08.cta.send_whatsapp | Kirim WhatsApp | 24 | |
| s08.cta.new_version | Buat Versi Baru | 24 | Tab Dokumen |
| s08.cta.create_addendum | Buat Addendum | 24 | Tab Dokumen, Iterasi 2 |
| s08.cta.create_bast | Buat BAST | 24 | Tab Dokumen, Iterasi 2 |
| s08.cta.view_approval | Lihat Jejak Persetujuan | 24 | |
| s08.cta.record_payment | Catat Pembayaran | 24 | Tab Tagihan |
| s08.cta.verify_payment | Verifikasi Bukti | 24 | Tab Tagihan |
| s08.cta.send_reminder | Kirim Pengingat | 24 | Tab Tagihan |
| s08.banner.cancelled | Proyek Dibatalkan | 40 | Banner merah |
| s08.banner.cancelled_reason | Alasan: {alasan} | 90 | |
| s08.status.draft.desc | Penawaran belum dibuat atau belum dikirim. | 90 | Overview |
| s08.status.quotation_sent.desc | Menunggu respons klien terhadap penawaran. | 90 | |
| s08.status.awaiting_dp.desc | Menunggu pembayaran dan verifikasi DP. | 90 | |
| s08.status.in_progress.desc | Proyek sedang dikerjakan. | 90 | |
| s08.status.client_review.desc | Menunggu review klien atas hasil kerja. | 90 | |
| s08.status.handover_sent.desc | BAST sudah dikirim, menunggu persetujuan klien. | 90 | |
| s08.status.warranty.desc | Proyek dalam masa garansi. | 90 | |
| s08.status.completed.desc | Proyek selesai. Semua invoice lunas dan garansi berakhir. | 90 | |
| s08.status.cancelled.desc | Proyek dibatalkan. Data tetap tersimpan. | 90 | |
| s08.empty.documents.title | Belum ada dokumen | 36 | Tab Dokumen |
| s08.empty.documents.body | Buat penawaran untuk memulai proyek ini. | 90 | |
| s08.empty.billing.title | Belum ada tagihan | 36 | Tab Tagihan |
| s08.empty.billing.body | Tagihan akan muncul setelah penawaran disetujui. | 90 | |
| s08.empty.progress.title | Belum ada pembaruan | 36 | Tab Progres, Iterasi 2 |
| s08.empty.progress.body | Tambah milestone dan tulis pembaruan progres. | 90 | |
| s08.empty.revisions.title | Belum ada permintaan revisi | 36 | Tab Revisi, Iterasi 2 |
| s08.empty.revisions.body | Permintaan revisi dari klien akan muncul di sini. | 90 | |
| s08.empty.warranty.title | Garansi belum aktif | 36 | Tab Garansi, Iterasi 3 |
| s08.empty.warranty.body | Garansi dimulai setelah klien menyetujui BAST. | 90 | |
| s08.empty.log.title | Belum ada aktivitas | 36 | Tab Log |
| s08.empty.log.body | Riwayat aktivitas proyek akan tercatat di sini. | 90 | |

### S-09 · Form Proyek

| Key | Teks | Maks | Catatan |
|---|---|---|---|
| s09.title | Buat Proyek Baru | 40 | |
| s09.field.client.label | Klien | 28 | Dropdown, pre-selected jika dari S-06 |
| s09.field.client.placeholder | Pilih klien | 40 | |
| s09.field.name.label | Nama proyek | 28 | |
| s09.field.name.placeholder | Website Toko Kue Manis | 40 | |
| s09.field.description.label | Deskripsi | 28 | |
| s09.field.description.placeholder | Deskripsi singkat proyek (opsional) | 40 | |
| s09.cta.save | Simpan Proyek | 24 | |
| s09.error.client_required | Pilih klien terlebih dahulu. | 70 | |
| s09.error.name_required | Nama proyek wajib diisi. | 70 | |
| s09.toast.created | Proyek berhasil dibuat. | 60 | |

### S-10 · Form Penawaran

| Key | Teks | Maks | Catatan |
|---|---|---|---|
| s10.title.create | Buat Penawaran | 40 | |
| s10.title.edit | Edit Penawaran v{versi_dokumen} | 40 | |
| s10.field.template.label | Template | 28 | Dropdown opsional |
| s10.field.template.placeholder | Pilih template (opsional) | 40 | |
| s10.field.scope.label | Lingkup kerja | 28 | |
| s10.field.scope.placeholder | Jelaskan lingkup pekerjaan proyek... | 40 | |
| s10.section.items | Item Pekerjaan | 40 | |
| s10.item.name.label | Nama item | 28 | |
| s10.item.name.placeholder | Desain halaman utama | 40 | |
| s10.item.desc.label | Deskripsi | 28 | |
| s10.item.desc.placeholder | Detail pekerjaan item ini (opsional) | 40 | |
| s10.item.price.label | Harga | 28 | |
| s10.item.price.placeholder | 0 | 40 | |
| s10.cta.add_item | + Tambah Item | 24 | Ghost button |
| s10.label.total | Total | 28 | |
| s10.section.installments | Skema Termin | 40 | |
| s10.installment.label.label | Label | 28 | |
| s10.installment.label.placeholder | DP 50% | 40 | |
| s10.installment.type.percent | Persen (%) | 14 | Toggle |
| s10.installment.type.nominal | Nominal (Rp) | 14 | Toggle |
| s10.installment.value.placeholder | 50 | 40 | |
| s10.cta.add_installment | + Tambah Termin | 24 | Ghost button |
| s10.error.installment_mismatch | Total termin ({jumlah_termin}) tidak sama dengan total harga ({total_harga}). Selisih: {selisih}. | 120 | Di bawah tabel termin |
| s10.section.revision | Kuota Revisi | 40 | |
| s10.field.revision_quota.label | Jumlah revisi | 28 | |
| s10.field.revision_quota.placeholder | 3 | 40 | |
| s10.field.revision_def.label | Definisi revisi | 28 | |
| s10.field.revision_def.placeholder | Jelaskan apa yang termasuk revisi dan apa yang termasuk perubahan lingkup... | 80 | |
| s10.section.warranty | Garansi | 40 | |
| s10.field.warranty_duration.label | Durasi garansi | 28 | |
| s10.field.warranty_duration.placeholder | 90 | 40 | |
| s10.field.warranty_unit.days | Hari | 12 | |
| s10.field.warranty_unit.months | Bulan | 12 | |
| s10.field.warranty_scope.label | Cakupan garansi | 28 | |
| s10.field.warranty_scope.placeholder | Jelaskan apa saja yang termasuk dalam garansi... | 80 | |
| s10.cta.preview | Pratinjau PDF | 24 | |
| s10.cta.save_draft | Simpan Draft | 24 | |
| s10.error.no_items | Tambah minimal satu item pekerjaan. | 70 | |
| s10.error.item_price | Harga harus lebih dari 0. | 70 | |
| s10.error.item_name | Nama item wajib diisi. | 70 | |
| s10.error.scope_required | Lingkup kerja wajib diisi. | 70 | |
| s10.error.revision_quota | Jumlah revisi wajib diisi. | 70 | |
| s10.error.warranty_duration | Durasi garansi wajib diisi. | 70 | |

### S-11 · Pratinjau Penawaran

| Key | Teks | Maks | Catatan |
|---|---|---|---|
| s11.title | Pratinjau Penawaran | 40 | |
| s11.cta.send | Kirim ke Klien | 24 | Primary |
| s11.cta.back_edit | Kembali ke Editor | 24 | Secondary |
| s11.loading | Memuat pratinjau... | 20 | |

### S-12 · Dialog Kirim Penawaran

| Key | Teks | Maks | Catatan |
|---|---|---|---|
| s12.title | Kirim Penawaran? | 48 | Modal |
| s12.body | Setelah dikirim, penawaran ini akan terkunci dan tidak bisa diubah. Klien akan menerima tautan portal untuk melihat dan menyetujuinya. | 200 | |
| s12.label.pin_initial | PIN Awal Klien | 28 | Ditampilkan sekali |
| s12.pin_note | Catat PIN ini. PIN hanya ditampilkan sekali dan harus dikirim terpisah ke klien lewat WhatsApp. | 120 | |
| s12.cta.send | Kirim Penawaran | 24 | Primary |
| s12.cta.cancel | Batal | 20 | Secondary |
| s12.cta.copy_wa | Salin Pesan WhatsApp | 24 | Setelah kirim berhasil |
| s12.cta.open_wa | Buka WhatsApp | 24 | wa.me link |
| s12.toast.sent | Penawaran berhasil dikirim. | 60 | |

### S-13 · Riwayat Versi Dokumen

| Key | Teks | Maks | Catatan |
|---|---|---|---|
| s13.title | Riwayat Dokumen | 40 | |
| s13.label.version | Versi {versi_dokumen} | 28 | |
| s13.label.sent_at | Dikirim pada {tanggal} | 40 | |
| s13.label.approved_at | Disetujui pada {tanggal} | 40 | |
| s13.label.rejected_at | Ditolak pada {tanggal} | 40 | |
| s13.label.approval_by | Disetujui oleh: {nama_klien} | 60 | |
| s13.label.hash | Sidik dokumen (SHA-256) | 40 | Untuk jejak persetujuan |
| s13.cta.new_version | Buat Versi Baru | 24 | |
| s13.cta.download_pdf | Unduh PDF | 20 | |
| s13.empty.title | Belum ada dokumen | 36 | |

### S-14 · Daftar Invoice

| Key | Teks | Maks | Catatan |
|---|---|---|---|
| s14.title | Invoice | 40 | |
| s14.field.filter.placeholder | Cari nomor invoice... | 40 | |
| s14.field.filter_status.label | Status | 28 | |
| s14.table.number | Nomor | 28 | |
| s14.table.project | Proyek | 28 | |
| s14.table.client | Klien | 28 | |
| s14.table.amount | Jumlah | 28 | |
| s14.table.due_date | Jatuh Tempo | 28 | |
| s14.table.status | Status | 28 | |
| s14.overdue_badge | Lewat {hari_terlambat} hari | 28 | Badge merah |
| s14.empty.title | Belum ada invoice | 36 | |
| s14.empty.body | Invoice akan muncul setelah penawaran disetujui klien. | 90 | |

### S-15 · Detail Invoice

| Key | Teks | Maks | Catatan |
|---|---|---|---|
| s15.title | Invoice {nomor_invoice} | 40 | |
| s15.label.project | Proyek | 28 | |
| s15.label.client | Klien | 28 | |
| s15.label.installment | Termin | 28 | |
| s15.label.amount | Jumlah Tagihan | 28 | |
| s15.label.due_date | Jatuh Tempo | 28 | |
| s15.label.status | Status | 28 | |
| s15.section.payments | Riwayat Pembayaran | 40 | |
| s15.cta.record_payment | Catat Pembayaran | 24 | |
| s15.cta.verify | Verifikasi Bukti | 24 | Jika ada pending |
| s15.cta.send_reminder | Kirim Pengingat | 24 | |
| s15.empty.payments.title | Belum ada pembayaran | 36 | |
| s15.empty.payments.body | Pembayaran yang tercatat dan diunggah klien akan muncul di sini. | 90 | |

### S-16 · Form Pembayaran Manual

| Key | Teks | Maks | Catatan |
|---|---|---|---|
| s16.title | Catat Pembayaran Manual | 40 | |
| s16.field.amount.label | Nominal | 28 | |
| s16.field.amount.placeholder | 0 | 40 | |
| s16.field.date.label | Tanggal transfer | 28 | |
| s16.field.date.placeholder | Pilih tanggal | 40 | |
| s16.field.note.label | Catatan | 28 | |
| s16.field.note.placeholder | Catatan tambahan (opsional) | 40 | |
| s16.field.attachment.label | Lampiran | 28 | |
| s16.cta.save | Simpan Pembayaran | 24 | |
| s16.error.amount_required | Nominal wajib diisi. | 70 | |
| s16.error.amount_zero | Nominal harus lebih dari 0. | 70 | |
| s16.error.date_required | Tanggal transfer wajib diisi. | 70 | |
| s16.toast.saved | Pembayaran berhasil dicatat. | 60 | |

### S-17 · Verifikasi Pembayaran

| Key | Teks | Maks | Catatan |
|---|---|---|---|
| s17.title | Verifikasi Pembayaran | 40 | |
| s17.label.invoice | Invoice | 28 | |
| s17.label.amount_claimed | Nominal yang diklaim | 28 | |
| s17.label.transfer_date | Tanggal transfer | 28 | |
| s17.label.proof | Bukti Transfer | 28 | Gambar/PDF viewer |
| s17.cta.verify | Verifikasi | 24 | Primary |
| s17.cta.reject | Tolak | 20 | Danger |
| s17.confirm.verify.title | Verifikasi pembayaran ini? | 48 | |
| s17.confirm.verify.body | Status invoice akan diperbarui sesuai nominal yang diverifikasi. | 90 | |
| s17.confirm.reject.title | Tolak bukti pembayaran ini? | 48 | |
| s17.confirm.reject.body | Klien dapat mengunggah bukti baru setelah ditolak. | 90 | |
| s17.field.reject_reason.label | Alasan penolakan | 28 | |
| s17.field.reject_reason.placeholder | Jelaskan alasan penolakan... | 40 | |
| s17.toast.verified | Pembayaran berhasil diverifikasi. | 60 | |
| s17.toast.rejected | Bukti pembayaran ditolak. | 60 | |

### S-18 · Rekap Pemasukan

| Key | Teks | Maks | Catatan |
|---|---|---|---|
| s18.title | Rekap Pemasukan | 40 | |
| s18.field.month.label | Bulan | 28 | Dropdown filter |
| s18.label.total | Total Pemasukan | 28 | |
| s18.table.date | Tanggal | 28 | |
| s18.table.project | Proyek | 28 | |
| s18.table.invoice | Invoice | 28 | |
| s18.table.amount | Nominal | 28 | |
| s18.empty.title | Belum ada pemasukan | 36 | |
| s18.empty.body | Pemasukan akan tercatat setelah pembayaran diverifikasi. | 90 | |

### S-19 · Form Milestone (Iterasi 2)

| Key | Teks | Maks | Catatan |
|---|---|---|---|
| s19.title | Tambah Milestone | 40 | |
| s19.field.name.label | Nama milestone | 28 | |
| s19.field.name.placeholder | Desain selesai | 40 | |
| s19.field.description.label | Deskripsi | 28 | |
| s19.field.description.placeholder | Detail milestone ini (opsional) | 40 | |
| s19.field.target_date.label | Target tanggal | 28 | |
| s19.cta.save | Simpan Milestone | 24 | |
| s19.error.name_required | Nama milestone wajib diisi. | 70 | |
| s19.toast.saved | Milestone berhasil ditambahkan. | 60 | |

### S-20 · Form Pembaruan Progres (Iterasi 2)

| Key | Teks | Maks | Catatan |
|---|---|---|---|
| s20.title | Tulis Pembaruan Progres | 40 | |
| s20.field.content.label | Pembaruan | 28 | |
| s20.field.content.placeholder | Tuliskan progres terbaru... | 40 | |
| s20.field.attachment.label | Lampiran | 28 | |
| s20.field.staging_url.label | Tautan staging | 28 | |
| s20.field.staging_url.placeholder | https://staging.example.com (opsional) | 40 | |
| s20.cta.send | Kirim & Beri Tahu Klien | 24 | |
| s20.cta.save_draft | Simpan Draft | 20 | |
| s20.confirm.send.title | Kirim pembaruan ini? | 48 | Dialog |
| s20.confirm.send.body | Klien akan menerima notifikasi lewat WhatsApp. | 90 | |
| s20.error.content_required | Isi pembaruan wajib diisi. | 70 | |
| s20.toast.sent | Pembaruan progres berhasil dikirim. | 60 | |

### S-21 · Klasifikasi Revisi (Iterasi 2)

| Key | Teks | Maks | Catatan |
|---|---|---|---|
| s21.title | Klasifikasi Permintaan | 40 | |
| s21.label.request | Permintaan dari klien | 28 | |
| s21.label.quota | Sisa kuota revisi: {sisa_kuota_revisi}/{total_kuota_revisi} | 60 | |
| s21.cta.classify_revision | Tandai sebagai Revisi | 24 | Mengurangi kuota |
| s21.cta.classify_scope | Perubahan Lingkup | 24 | Buat addendum |
| s21.confirm.revision.title | Tandai sebagai revisi? | 48 | |
| s21.confirm.revision.body | Kuota revisi akan berkurang 1. Sisa: {sisa_kuota_revisi}. | 90 | |
| s21.confirm.scope.title | Tandai sebagai perubahan lingkup? | 48 | |
| s21.confirm.scope.body | Anda akan diarahkan untuk membuat Addendum baru. | 90 | |
| s21.toast.classified | Permintaan berhasil diklasifikasikan. | 60 | |

### S-22 · Form BAST (Iterasi 2)

| Key | Teks | Maks | Catatan |
|---|---|---|---|
| s22.title | Buat BAST | 40 | |
| s22.body | Buat Berita Acara Serah Terima berisi daftar hasil pekerjaan yang diserahkan kepada klien. | 120 | |
| s22.field.items.label | Daftar hasil kerja | 28 | |
| s22.field.items.placeholder | Nama item yang diserahkan | 40 | |
| s22.cta.add_item | + Tambah Item | 24 | |
| s22.cta.preview | Pratinjau PDF | 24 | |
| s22.cta.send | Kirim ke Klien | 24 | |
| s22.error.no_items | Tambah minimal satu item hasil kerja. | 70 | |
| s22.toast.sent | BAST berhasil dikirim ke klien. | 60 | |

### S-23 · Kelola Klaim Garansi (Iterasi 3)

| Key | Teks | Maks | Catatan |
|---|---|---|---|
| s23.title | Klaim Garansi | 40 | |
| s23.label.warranty_period | Garansi: {tanggal_mulai_garansi} — {tanggal_akhir_garansi} | 60 | |
| s23.label.out_of_scope | Di luar cakupan garansi | 28 | Badge kuning |
| s23.label.out_of_period | Di luar masa garansi | 28 | Badge merah |
| s23.cta.close_claim | Tutup Klaim | 24 | |
| s23.field.resolution.label | Catatan penyelesaian | 28 | |
| s23.field.resolution.placeholder | Jelaskan cara penyelesaian klaim ini... | 40 | |
| s23.confirm.close.title | Tutup klaim garansi ini? | 48 | |
| s23.confirm.close.body | Klaim akan ditandai selesai dengan catatan penyelesaian. | 90 | |
| s23.toast.closed | Klaim garansi berhasil ditutup. | 60 | |
| s23.empty.title | Belum ada klaim garansi | 36 | |
| s23.empty.body | Klaim garansi dari klien akan muncul di sini. | 90 | |

### S-24 · Pengaturan

| Key | Teks | Maks | Catatan |
|---|---|---|---|
| s24.title | Pengaturan | 40 | |
| s24.tab.profile | Profil & Keamanan | 20 | |
| s24.tab.bank | Rekening Bank | 14 | |
| s24.tab.templates | Template | 12 | |
| s24.field.admin_name.label | Nama | 28 | |
| s24.field.admin_email.label | Email | 28 | |
| s24.cta.change_password | Ubah Kata Sandi | 24 | |
| s24.cta.manage_2fa | Kelola 2FA | 24 | |
| s24.section.bank | Rekening Bank | 40 | |
| s24.field.bank_name.label | Nama bank | 28 | |
| s24.field.bank_name.placeholder | BCA | 40 | |
| s24.field.account_number.label | Nomor rekening | 28 | |
| s24.field.account_number.placeholder | 1234567890 | 40 | |
| s24.field.account_holder.label | Atas nama | 28 | |
| s24.field.account_holder.placeholder | Nama pemilik rekening | 40 | |
| s24.cta.save_bank | Simpan Rekening | 24 | |
| s24.toast.profile_saved | Profil berhasil diperbarui. | 60 | |
| s24.toast.bank_saved | Rekening bank berhasil disimpan. | 60 | |

### S-25 · Kelola Tautan Portal

| Key | Teks | Maks | Catatan |
|---|---|---|---|
| s25.title | Kelola Tautan Portal | 40 | |
| s25.label.status_active | Aktif | 14 | Badge hijau |
| s25.label.status_revoked | Dicabut | 14 | Badge merah |
| s25.label.status_frozen | Dibekukan | 14 | Badge kuning |
| s25.label.pin_changed | PIN sudah diganti klien | 40 | |
| s25.label.pin_initial | PIN awal belum diganti | 40 | |
| s25.cta.reset_pin | Reset PIN | 24 | |
| s25.cta.revoke | Cabut Tautan | 24 | Danger |
| s25.cta.create_new | Buat Tautan Baru | 24 | |
| s25.cta.copy_link | Salin Tautan | 20 | |
| s25.confirm.reset.title | Reset PIN klien? | 48 | |
| s25.confirm.reset.body | PIN lama tidak berlaku. Semua sesi aktif akan dicabut. PIN awal baru akan ditampilkan sekali. | 120 | |
| s25.confirm.revoke.title | Cabut tautan portal ini? | 48 | |
| s25.confirm.revoke.body | Klien tidak akan bisa mengakses portal dengan tautan ini. Semua sesi aktif akan dicabut. | 120 | |
| s25.toast.pin_reset | PIN berhasil direset. Kirim PIN awal baru ke klien lewat WhatsApp. | 80 | |
| s25.toast.revoked | Tautan portal berhasil dicabut. | 60 | |
| s25.toast.created | Tautan portal baru berhasil dibuat. | 60 | |

### S-26 · Log Aktivitas

| Key | Teks | Maks | Catatan |
|---|---|---|---|
| s26.title | Log Aktivitas | 40 | |
| s26.table.time | Waktu | 28 | |
| s26.table.actor | Aktor | 28 | |
| s26.table.action | Aksi | 28 | |
| s26.table.object | Objek | 28 | |
| s26.table.detail | Detail | 28 | |
| s26.empty.title | Belum ada aktivitas | 36 | |
| s26.empty.body | Semua perubahan status dan tindakan akan tercatat di sini. | 90 | |

---

### S-30 · Masukkan PIN (Portal)

| Key | Teks | Maks | Catatan |
|---|---|---|---|
| s30.title | Masukkan PIN | 36 | |
| s30.subtitle | {nama_proyek} | 90 | Nama proyek ditampilkan |
| s30.body | Masukkan PIN untuk melanjutkan. | 80 | |
| s30.field.pin.label | PIN | 28 | |
| s30.field.pin.placeholder | 6 digit PIN | 40 | masked input |
| s30.cta.login | Masuk | 24 | |
| s30.error.wrong_pin | PIN salah. {sisa_percobaan} percobaan tersisa. | 70 | |
| s30.error.wrong_pin_last | PIN salah. Ini percobaan terakhir Anda. | 70 | |
| s30.helper.forgot | Lupa PIN? Hubungi penyedia jasa Anda. | 80 | |
| s30.loading | Memverifikasi... | 20 | |

### S-31 · Buat PIN Baru (Portal)

| Key | Teks | Maks | Catatan |
|---|---|---|---|
| s31.title | Buat PIN Baru | 36 | |
| s31.body | Anda harus membuat PIN baru untuk melanjutkan. | 80 | |
| s31.field.new_pin.label | PIN baru | 28 | |
| s31.field.new_pin.placeholder | Minimal 6 digit | 40 | |
| s31.field.confirm_pin.label | Konfirmasi PIN baru | 28 | |
| s31.field.confirm_pin.placeholder | Masukkan ulang PIN baru | 40 | |
| s31.helper.rules | Minimal 6 digit. Tidak boleh angka berurutan (123456) atau berulang (000000). | 120 | Di bawah field |
| s31.cta.save | Simpan PIN | 24 | |
| s31.error.too_short | PIN minimal 6 digit. | 70 | |
| s31.error.weak_sequential | PIN tidak boleh berupa angka berurutan. | 70 | |
| s31.error.weak_repeated | PIN tidak boleh berupa angka yang sama berulang. | 70 | |
| s31.error.mismatch | Konfirmasi PIN tidak cocok. | 70 | |
| s31.toast.saved | PIN baru berhasil disimpan. | 60 | |

### S-32 · Ringkasan Proyek (Portal)

| Key | Teks | Maks | Catatan |
|---|---|---|---|
| s32.title | Ringkasan | 36 | Bottom nav / sidebar label |
| s32.card.status | Status Proyek | 48 | |
| s32.card.billing | Tagihan | 48 | |
| s32.card.billing.total | Total tagihan | 28 | |
| s32.card.billing.paid | Sudah dibayar | 28 | |
| s32.card.billing.remaining | Sisa tagihan | 28 | |
| s32.card.billing.next_due | Jatuh tempo terdekat | 28 | |
| s32.card.progress | Progres Terbaru | 48 | Iterasi 2 |
| s32.card.revision | Kuota Revisi | 48 | Iterasi 2 |
| s32.card.revision.remaining | Sisa: {sisa_kuota_revisi}/{total_kuota_revisi} | 48 | |
| s32.card.warranty | Garansi | 48 | Iterasi 3 |
| s32.card.warranty.active | Aktif — berakhir {tanggal_akhir_garansi} ({sisa_hari_garansi} hari lagi) | 90 | |
| s32.card.warranty.expired | Garansi telah berakhir pada {tanggal_akhir_garansi}. | 90 | |
| s32.status.draft | Penawaran sedang disiapkan | 48 | |
| s32.status.quotation_sent | Penawaran menunggu persetujuan Anda | 48 | Highlight |
| s32.status.awaiting_dp | Menunggu pembayaran uang muka (DP) | 48 | |
| s32.status.in_progress | Proyek sedang dikerjakan | 48 | |
| s32.status.client_review | Menunggu review Anda | 48 | |
| s32.status.handover_sent | BAST menunggu persetujuan Anda | 48 | |
| s32.status.warranty | Proyek dalam masa garansi | 48 | |
| s32.status.completed | Proyek telah selesai | 48 | Banner |
| s32.status.cancelled | Proyek dibatalkan | 48 | Banner |
| s32.status.cancelled_reason | Alasan: {alasan} | 90 | |
| s32.cta.view_quotation | Lihat Penawaran | 24 | |
| s32.cta.approve_quotation | Lihat & Setujui | 24 | Primary, highlight |
| s32.cta.pay | Bayar Invoice | 24 | Primary, highlight |
| s32.cta.upload_proof | Unggah Bukti | 24 | |
| s32.cta.submit_revision | Ajukan Revisi | 24 | Iterasi 2 |
| s32.cta.approve_bast | Setujui BAST | 24 | Iterasi 2 |
| s32.cta.submit_claim | Ajukan Klaim | 24 | Iterasi 3 |

### S-33 · Detail Penawaran (Portal)

| Key | Teks | Maks | Catatan |
|---|---|---|---|
| s33.title | Penawaran | 36 | |
| s33.label.version | Versi {versi_dokumen} | 28 | |
| s33.label.date | Tanggal: {tanggal} | 40 | |
| s33.section.scope | Lingkup Kerja | 40 | |
| s33.section.items | Item Pekerjaan | 40 | |
| s33.table.item_name | Item | 28 | |
| s33.table.item_desc | Deskripsi | 28 | |
| s33.table.item_price | Harga | 28 | |
| s33.label.total | Total | 28 | |
| s33.section.installments | Skema Termin | 40 | |
| s33.table.installment_label | Termin | 28 | |
| s33.table.installment_amount | Jumlah | 28 | |
| s33.section.revision | Kuota Revisi | 40 | |
| s33.label.revision_quota | Jumlah revisi: {total_kuota_revisi} kali | 40 | |
| s33.section.warranty | Garansi | 40 | |
| s33.label.warranty_duration | Durasi: {durasi_garansi} | 40 | |
| s33.cta.approve | Setujui Penawaran | 24 | Primary |
| s33.cta.reject | Tolak / Minta Perubahan | 24 | Secondary |
| s33.cta.download | Unduh PDF | 20 | |
| s33.banner.approved | Penawaran disetujui pada {tanggal} | 90 | State: sudah disetujui |
| s33.banner.rejected | Penawaran ditolak. Catatan: {catatan} | 90 | State: ditolak |
| s33.banner.old_version | Ini versi lama. | 48 | |
| s33.banner.old_version_link | Lihat versi terbaru | 24 | Link |

### S-34 · Setujui Penawaran (Portal)

| Key | Teks | Maks | Catatan |
|---|---|---|---|
| s34.title | Setujui Penawaran | 36 | |
| s34.summary | {jumlah_item} item · Total: {total_harga} · {skema_termin} | 90 | Ringkasan di atas form |
| s34.field.name.label | Nama lengkap | 28 | |
| s34.field.name.placeholder | Nama lengkap Anda | 40 | |
| s34.field.checkbox.label | Saya menyetujui penawaran ini beserta syarat dan ketentuan yang tercantum | 120 | Checkbox |
| s34.field.pin.label | PIN | 28 | Re-autentikasi |
| s34.field.pin.placeholder | Masukkan PIN Anda | 40 | |
| s34.cta.confirm | Konfirmasi Persetujuan | 24 | Primary — disabled sampai semua terisi |
| s34.cta.cancel | Batal | 20 | → S-33 |
| s34.helper.legal | Persetujuan Anda akan tercatat beserta waktu, perangkat, dan alamat IP. | 90 | Teks kecil |
| s34.error.name_required | Nama lengkap wajib diisi. | 70 | |
| s34.error.checkbox_required | Anda harus mencentang persetujuan. | 70 | |
| s34.error.pin_wrong | PIN salah. Periksa kembali PIN Anda. | 70 | |
| s34.loading | Memproses persetujuan... | 30 | |

### S-35 · Penawaran Disetujui (Portal)

| Key | Teks | Maks | Catatan |
|---|---|---|---|
| s35.title | Penawaran Disetujui | 36 | + ikon sukses ✓ |
| s35.body | Penawaran berhasil disetujui pada {tanggal}. | 90 | |
| s35.label.document | Nomor dokumen: {nomor_dokumen} | 60 | |
| s35.next_step | Langkah berikutnya: pembayaran uang muka (DP). | 90 | |
| s35.cta.whatsapp | Konfirmasi ke WhatsApp | 24 | Primary, besar |
| s35.cta.back | Kembali ke Ringkasan | 24 | Link |

### S-36 · Tolak / Minta Perubahan (Portal)

| Key | Teks | Maks | Catatan |
|---|---|---|---|
| s36.title | Minta Perubahan Penawaran | 36 | |
| s36.body | Tuliskan catatan Anda. Penyedia jasa akan menerima permintaan ini dan dapat merevisi penawaran. | 120 | |
| s36.field.note.label | Catatan | 28 | |
| s36.field.note.placeholder | Jelaskan perubahan yang Anda inginkan... | 40 | |
| s36.cta.send | Kirim Permintaan | 24 | |
| s36.cta.cancel | Batal | 20 | → S-33 |
| s36.error.note_required | Catatan wajib diisi. | 70 | |
| s36.toast.sent | Permintaan perubahan berhasil dikirim. | 60 | |

### S-37 · Daftar Invoice Portal

| Key | Teks | Maks | Catatan |
|---|---|---|---|
| s37.title | Invoice | 36 | Bottom nav label |
| s37.card.number | {nomor_invoice} | 16 | |
| s37.card.installment | {label_termin} | 24 | |
| s37.card.amount | {jumlah_rupiah} | 20 | |
| s37.card.due_date | Jatuh tempo: {tanggal_jatuh_tempo} | 40 | |
| s37.card.overdue | Lewat {hari_terlambat} hari | 28 | Badge merah |
| s37.section.bank | Rekening Tujuan | 40 | |
| s37.label.bank | {nama_bank} — {nomor_rekening} a.n. {atas_nama} | 80 | |
| s37.section.summary | Ringkasan | 40 | |
| s37.label.total_paid | Sudah dibayar: {jumlah_rupiah} | 40 | |
| s37.label.total_all | Total: {jumlah_rupiah} | 40 | |
| s37.cta.upload | Unggah Bukti Transfer | 24 | Per invoice |
| s37.cta.download | Unduh Invoice | 20 | |
| s37.empty.title | Belum ada invoice | 36 | |
| s37.empty.body | Invoice akan tersedia setelah penawaran disetujui. | 90 | |

### S-38 · Unggah Bukti Transfer (Portal)

| Key | Teks | Maks | Catatan |
|---|---|---|---|
| s38.title | Unggah Bukti Transfer | 36 | |
| s38.label.invoice | Invoice: {nomor_invoice} | 40 | |
| s38.label.amount | Jumlah tagihan: {jumlah_rupiah} | 40 | |
| s38.label.bank | Transfer ke: {nama_bank} {nomor_rekening} a.n. {atas_nama} | 80 | |
| s38.field.file.label | Bukti transfer | 28 | |
| s38.field.file.placeholder | Seret file ke sini atau klik untuk memilih | 60 | Drag-drop area |
| s38.field.file.helper | Format: JPG, PNG, atau PDF. Maksimal {ukuran_maks_file} MB. | 80 | |
| s38.field.amount.label | Nominal yang ditransfer | 28 | |
| s38.field.amount.placeholder | 0 | 40 | |
| s38.field.date.label | Tanggal transfer | 28 | |
| s38.field.date.placeholder | Pilih tanggal | 40 | |
| s38.field.pin.label | PIN | 28 | Re-autentikasi |
| s38.field.pin.placeholder | Masukkan PIN Anda | 40 | |
| s38.cta.send | Kirim Bukti | 24 | |
| s38.cta.cancel | Batal | 20 | → S-37 |
| s38.error.file_required | Pilih file bukti transfer. | 70 | |
| s38.error.amount_required | Nominal yang ditransfer wajib diisi. | 70 | |
| s38.error.amount_zero | Nominal harus lebih dari 0. | 70 | |
| s38.error.date_required | Tanggal transfer wajib diisi. | 70 | |
| s38.error.pin_wrong | PIN salah. Periksa kembali PIN Anda. | 70 | |
| s38.loading | Mengunggah bukti... | 20 | Progress bar |
| s38.error.upload_failed | Gagal mengunggah. Periksa koneksi internet Anda lalu coba lagi. | 70 | |
| s38.toast.success | Bukti transfer berhasil dikirim. Menunggu verifikasi. | 60 | |
| s38.cta.whatsapp | Konfirmasi ke WhatsApp | 24 | Setelah sukses |

### S-39 · Linimasa Progres (Iterasi 2)

| Key | Teks | Maks | Catatan |
|---|---|---|---|
| s39.title | Progres | 36 | Bottom nav label |
| s39.label.milestone | Milestone | 28 | |
| s39.label.update | Pembaruan | 28 | |
| s39.label.date | {tanggal} | 12 | Per entry |
| s39.empty.title | Belum ada pembaruan progres | 36 | |
| s39.empty.body | Pembaruan progres dari penyedia jasa akan muncul di sini. | 90 | |

### S-40 · Ajukan Revisi (Iterasi 2)

| Key | Teks | Maks | Catatan |
|---|---|---|---|
| s40.title | Ajukan Revisi | 36 | |
| s40.label.quota | Sisa kuota: {sisa_kuota_revisi}/{total_kuota_revisi} revisi | 60 | |
| s40.field.description.label | Deskripsi revisi | 28 | |
| s40.field.description.placeholder | Jelaskan perubahan yang Anda inginkan... | 40 | |
| s40.field.screenshot.label | Tangkapan layar | 28 | |
| s40.field.screenshot.helper | Lampirkan tangkapan layar untuk memperjelas (opsional). | 80 | |
| s40.cta.send | Kirim Permintaan Revisi | 24 | |
| s40.error.description_required | Deskripsi revisi wajib diisi. | 70 | |
| s40.toast.sent | Permintaan revisi berhasil dikirim. | 60 | |
| s40.cta.whatsapp | Konfirmasi ke WhatsApp | 24 | |
| s40.disabled.title | Kuota revisi habis | 36 | State: kuota = 0 |
| s40.disabled.body | Kuota revisi Anda sudah habis. Hubungi penyedia jasa untuk revisi berbayar. | 90 | |

### S-41 · Setujui BAST (Iterasi 2)

| Key | Teks | Maks | Catatan |
|---|---|---|---|
| s41.title | Setujui Serah Terima (BAST) | 36 | |
| s41.body | Periksa daftar hasil kerja yang diserahkan. Dengan menyetujui, masa garansi akan dimulai. | 120 | |
| s41.section.items | Daftar Hasil Kerja | 40 | |
| s41.field.name.label | Nama lengkap | 28 | Sama dengan S-34 |
| s41.field.checkbox.label | Saya menyetujui serah terima ini dan mengonfirmasi bahwa hasil kerja telah sesuai | 120 | |
| s41.field.pin.label | PIN | 28 | |
| s41.field.pin.placeholder | Masukkan PIN Anda | 40 | |
| s41.cta.confirm | Konfirmasi Persetujuan | 24 | |
| s41.cta.reject | Tolak BAST | 20 | Secondary → kembali ke S-32 |
| s41.helper.legal | Persetujuan Anda akan tercatat beserta waktu, perangkat, dan alamat IP. | 90 | |
| s41.error.name_required | Nama lengkap wajib diisi. | 70 | |
| s41.error.checkbox_required | Anda harus mencentang persetujuan. | 70 | |
| s41.error.pin_wrong | PIN salah. Periksa kembali PIN Anda. | 70 | |
| s41.toast.approved | BAST berhasil disetujui. Masa garansi dimulai. | 60 | |
| s41.cta.whatsapp | Konfirmasi ke WhatsApp | 24 | |

### S-42 · Info Garansi (Iterasi 3)

| Key | Teks | Maks | Catatan |
|---|---|---|---|
| s42.title | Garansi | 36 | Bottom nav label |
| s42.label.start | Mulai: {tanggal_mulai_garansi} | 40 | |
| s42.label.end | Berakhir: {tanggal_akhir_garansi} | 40 | |
| s42.label.remaining | {sisa_hari_garansi} hari lagi | 30 | |
| s42.label.expired | Garansi telah berakhir | 28 | |
| s42.section.scope | Cakupan Garansi | 40 | |
| s42.section.claims | Riwayat Klaim | 40 | |
| s42.cta.submit_claim | Ajukan Klaim Garansi | 24 | Primary |
| s42.empty.claims.title | Belum ada klaim | 36 | |
| s42.empty.claims.body | Ajukan klaim jika ada masalah yang termasuk dalam cakupan garansi. | 90 | |

### S-43 · Ajukan Klaim Garansi (Iterasi 3)

| Key | Teks | Maks | Catatan |
|---|---|---|---|
| s43.title | Ajukan Klaim Garansi | 36 | |
| s43.label.warranty | Garansi aktif sampai {tanggal_akhir_garansi} | 48 | |
| s43.field.description.label | Deskripsi masalah | 28 | |
| s43.field.description.placeholder | Jelaskan masalah yang Anda temui... | 40 | |
| s43.field.screenshot.label | Tangkapan layar | 28 | |
| s43.field.screenshot.helper | Lampirkan tangkapan layar untuk memperjelas (opsional). | 80 | |
| s43.cta.send | Kirim Klaim | 24 | |
| s43.error.description_required | Deskripsi masalah wajib diisi. | 70 | |
| s43.toast.sent | Klaim garansi berhasil dikirim. | 60 | |
| s43.cta.whatsapp | Konfirmasi ke WhatsApp | 24 | |
| s43.warning.expired | Garansi telah berakhir. Klaim tetap bisa dikirim, namun akan ditandai di luar masa garansi. | 120 | |

### S-44 · Ganti PIN (Portal)

| Key | Teks | Maks | Catatan |
|---|---|---|---|
| s44.title | Ganti PIN | 36 | |
| s44.field.old_pin.label | PIN lama | 28 | |
| s44.field.old_pin.placeholder | Masukkan PIN lama | 40 | |
| s44.field.new_pin.label | PIN baru | 28 | |
| s44.field.new_pin.placeholder | Minimal 6 digit | 40 | |
| s44.field.confirm_pin.label | Konfirmasi PIN baru | 28 | |
| s44.field.confirm_pin.placeholder | Masukkan ulang PIN baru | 40 | |
| s44.cta.save | Simpan PIN | 24 | |
| s44.error.old_pin_wrong | PIN lama salah. | 70 | |
| s44.error.too_short | PIN minimal 6 digit. | 70 | |
| s44.error.weak | PIN tidak boleh berupa angka berurutan atau berulang. | 70 | |
| s44.error.mismatch | Konfirmasi PIN tidak cocok. | 70 | |
| s44.toast.success | PIN berhasil diganti. Sesi lain telah dicabut. | 60 | |

### S-45 · Unduh Dokumen (Portal)

| Key | Teks | Maks | Catatan |
|---|---|---|---|
| s45.title | Unduh Dokumen | 36 | |
| s45.label.type | Jenis | 28 | |
| s45.label.version | Versi | 28 | |
| s45.label.date | Tanggal | 28 | |
| s45.cta.download | Unduh PDF | 20 | Per dokumen |
| s45.empty.title | Belum ada dokumen | 36 | |
| s45.empty.body | Dokumen proyek akan tersedia untuk diunduh di sini. | 90 | |

### S-46 · Tautan Terkunci (Portal)

| Key | Teks | Maks | Catatan |
|---|---|---|---|
| s46.title | Tautan Terkunci | 36 | + ikon peringatan |
| s46.body.temporary | Tautan ini dikunci sementara karena terlalu banyak percobaan PIN yang salah. Coba lagi dalam {durasi_lockout} menit. | 120 | Lockout 1-2x |
| s46.body.frozen | Tautan ini dibekukan. Hubungi penyedia jasa Anda untuk membuka kunci. | 90 | Lockout 3x |
| s46.helper | Jika Anda membutuhkan bantuan, hubungi penyedia jasa Anda. | 80 | |

### S-47 · Tautan Dicabut (Portal)

| Key | Teks | Maks | Catatan |
|---|---|---|---|
| s47.title | Tautan Tidak Berlaku | 36 | + ikon stop |
| s47.body | Tautan ini tidak berlaku lagi. Hubungi penyedia jasa Anda jika membutuhkan tautan baru. | 120 | |

---

## 7. Matriks cakupan

| Layar | Judul | CTA | Kosong | Error | Loading | Sukses | Konfirmasi |
|---|---|---|---|---|---|---|---|
| S-01 | ok | ok | - | ok | ok | - | - |
| S-02 | ok | ok | - | ok | - | ok | - |
| S-03 | ok | ok | ok | - | ok | - | - |
| S-04 | ok | ok | ok | - | - | - | - |
| S-05 | ok | ok | - | ok | - | ok | - |
| S-06 | ok | ok | ok | - | - | - | - |
| S-07 | ok | ok | ok | - | - | - | - |
| S-08 | ok | ok | ok | - | - | - | ok |
| S-09 | ok | ok | - | ok | - | ok | - |
| S-10 | ok | ok | - | ok | - | - | - |
| S-11 | ok | ok | - | - | ok | - | - |
| S-12 | ok | ok | - | - | - | ok | ok |
| S-13 | ok | ok | ok | - | - | - | - |
| S-14 | ok | - | ok | - | - | - | - |
| S-15 | ok | ok | ok | - | - | - | - |
| S-16 | ok | ok | - | ok | - | ok | - |
| S-17 | ok | ok | - | - | - | ok | ok |
| S-18 | ok | - | ok | - | - | - | - |
| S-19 | ok | ok | - | ok | - | ok | - |
| S-20 | ok | ok | - | ok | - | ok | ok |
| S-21 | ok | ok | - | - | - | ok | ok |
| S-22 | ok | ok | - | ok | - | ok | - |
| S-23 | ok | ok | ok | - | - | ok | ok |
| S-24 | ok | ok | - | - | - | ok | - |
| S-25 | ok | ok | - | - | - | ok | ok |
| S-26 | ok | - | ok | - | - | - | - |
| S-30 | ok | ok | - | ok | ok | - | - |
| S-31 | ok | ok | - | ok | - | ok | - |
| S-32 | ok | ok | - | - | - | - | - |
| S-33 | ok | ok | - | - | - | - | - |
| S-34 | ok | ok | - | ok | ok | - | - |
| S-35 | ok | ok | - | - | - | ok | - |
| S-36 | ok | ok | - | ok | - | ok | - |
| S-37 | ok | ok | ok | - | - | - | - |
| S-38 | ok | ok | - | ok | ok | ok | - |
| S-39 | ok | - | ok | - | - | - | - |
| S-40 | ok | ok | - | ok | - | ok | - |
| S-41 | ok | ok | - | ok | - | ok | - |
| S-42 | ok | ok | ok | - | - | - | - |
| S-43 | ok | ok | - | ok | - | ok | - |
| S-44 | ok | ok | - | ok | - | ok | - |
| S-45 | ok | ok | ok | - | - | - | - |
| S-46 | ok | - | - | - | - | - | - |
| S-47 | ok | - | - | - | - | - | - |

---

## 8. Handoff

### Untuk FIXTURES.md

| Variabel | Maks | Uji ekstrem |
|---|---|---|
| {nama_proyek} | 80 | Nama 80 karakter penuh |
| {nama_klien} | 60 | Nama 60 karakter penuh |
| {nama_usaha} | 60 | Kosong (opsional), 60 karakter penuh |
| {nomor_invoice} | 16 | INV-2026-0001, INV-2026-9999 |
| {jumlah_rupiah} | 20 | Rp 1, Rp 1.000.000.000 |
| {label_termin} | 24 | "DP 50%", "Pelunasan 50%", "Termin 3 — 30%" |
| {sisa_kuota_revisi} | 2 | 0, 99 |
| {sisa_hari_garansi} | 3 | 0, 365 |
| {hari_terlambat} | 3 | 1, 999 |
| {sisa_percobaan} | 1 | 1, 5 |
| {durasi_lockout} | 2 | 1, 15 |
| {nomor_whatsapp} | 15 | 08123456789, +6281234567890 |
| Template WhatsApp | 300 | Semua variabel pada panjang maksimal |

### Untuk COMPONENTS.md

| Slot | Maks karakter | Catatan |
|---|---|---|
| Judul layar (admin) | 40 | Satu baris |
| Judul layar (portal) | 36 | Satu baris, layar sempit |
| Tombol primary | 24 | Verb + object |
| Tombol secondary | 20 | |
| Label field | 28 | |
| Placeholder | 40 | |
| Helper text | 80 | Satu baris di bawah field |
| Pesan error field | 70 | Teks + ikon |
| Badge status | 20 | "Penawaran Terkirim" terpanjang |
| Judul kartu | 48 | Dua baris maks |
| Tab / bottom nav | 12 | Satu kata jika bisa |
| Toast | 60 | Satu baris |
| Judul empty state | 36 | |
| Body empty state | 90 | Dua baris maks |
| Checkbox label | 120 | S-34, S-41 — teks persetujuan panjang |

---

## 9. Asumsi

- ASUMSI: Sapaan `Anda` digunakan konsisten di seluruh portal client karena konteks profesional B2B antara penyedia jasa dan klien bisnis.
- ASUMSI: Admin dashboard tidak menggunakan sapaan personal karena admin adalah pengguna tunggal — cukup "Halo!" tanpa nama.
- ASUMSI: Template pesan WhatsApp menggunakan format teks biasa (bukan rich text/markdown), karena dikirim lewat tautan wa.me.
- ASUMSI: PIN awal yang ditampilkan ke admin di S-12 harus dicatat karena hanya tampil sekali — tidak ada fitur "lihat lagi" setelah dialog ditutup.
- ASUMSI: "Konfirmasi ke WhatsApp" di portal hanya membuka wa.me — tidak ada jaminan pesan terkirim, dan tidak ada status yang bergantung pada pengiriman pesan WhatsApp.
- ASUMSI: Pesan error autentikasi admin di S-01 sengaja tidak spesifik ("Email atau kata sandi salah") untuk mencegah enumerasi akun.
- ASUMSI: Label status invoice "Sebagian" cukup singkat untuk badge; detail nominal ada di layar detail.
- ASUMSI: Teks bantuan "Lupa PIN? Hubungi penyedia jasa" tanpa tautan langsung, karena komunikasi klien-admin tetap lewat WhatsApp.
- ASUMSI: Screen admin Iterasi 2 & 3 (S-19–S-23) tidak punya wireframe Pencil — copy ditulis berdasarkan spesifikasi di UX.md dan PRD.
