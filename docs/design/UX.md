# UX.md — Portal Proyek Jasa Website

**Tanggal:** 2026-10-18
**Sumber:** PRD — Portal Proyek Jasa Website (Oct 16, 2026)
**Wireframe:** Pencil `portal-jasa-website.pen` (portal client screens)
**Arsitektur:** Architecture Spec 2026-10-17

---

## 1. Aktor dan Tujuan

| Aktor                      | Deskripsi                                | Tujuan utama                                                                                                     |
| -------------------------- | ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| **Admin** (penyedia jasa)  | Freelancer tunggal yang mengelola proyek | Mengelola siklus proyek end-to-end dari dasbor: klien, penawaran, tagihan, progres, serah terima, garansi        |
| **Klien** (pemilik proyek) | Klien yang mengakses portal tanpa akun   | Melihat status proyek, menyetujui dokumen, membayar, mengajukan revisi/klaim — semua lewat tautan WhatsApp + PIN |

---

## 2. Screen Inventory

### 2.1 Admin Screens

| ID   | Nama Screen            | Tujuan                                                                              | Aktor | User Stories               | Iterasi   |
| ---- | ---------------------- | ----------------------------------------------------------------------------------- | ----- | -------------------------- | --------- |
| S-01 | Login Admin            | Autentikasi admin dengan email + password + 2FA                                     | Admin | US-44                      | MVP       |
| S-02 | Setup 2FA              | Pengaturan TOTP saat pertama kali                                                   | Admin | US-44                      | MVP       |
| S-03 | Dashboard              | Ringkasan: proyek aktif, invoice jatuh tempo, tindakan menunggu                     | Admin | US-3, US-24, US-58         | MVP       |
| S-04 | Daftar Klien           | Tabel semua klien dengan pencarian                                                  | Admin | US-1                       | MVP       |
| S-05 | Form Klien             | Tambah/edit data klien (nama, usaha, WhatsApp, email)                               | Admin | US-1                       | MVP       |
| S-06 | Detail Klien           | Info klien + daftar proyek terkait                                                  | Admin | US-1, US-2                 | MVP       |
| S-07 | Daftar Proyek          | Tabel semua proyek dengan filter status                                             | Admin | US-3                       | MVP       |
| S-08 | Detail Proyek          | Pusat kendali proyek: tab overview, dokumen, tagihan, progres, revisi, garansi, log | Admin | US-2, US-3, US-54          | MVP       |
| S-09 | Form Proyek            | Buat proyek baru terikat ke klien                                                   | Admin | US-2                       | MVP       |
| S-10 | Form Penawaran         | Buat/edit penawaran: item, harga, termin, kuota revisi, garansi                     | Admin | US-5, US-6, US-7, US-8     | MVP       |
| S-11 | Pratinjau Penawaran    | Pratinjau PDF sebelum kirim ke klien                                                | Admin | US-9                       | MVP       |
| S-12 | Dialog Kirim Penawaran | Modal konfirmasi kirim + salin pesan WhatsApp                                       | Admin | US-10, US-15               | MVP       |
| S-13 | Riwayat Versi Dokumen  | Daftar versi penawaran/addendum/BAST + jejak persetujuan                            | Admin | US-14, US-16               | MVP       |
| S-14 | Daftar Invoice         | Tabel invoice: filter belum lunas, jatuh tempo                                      | Admin | US-24                      | MVP       |
| S-15 | Detail Invoice         | Info invoice + riwayat pembayaran + verifikasi bukti                                | Admin | US-17, US-18, US-19        | MVP       |
| S-16 | Form Pembayaran Manual | Catat pembayaran tanpa unggahan klien                                               | Admin | US-23                      | MVP       |
| S-17 | Verifikasi Pembayaran  | Lihat bukti transfer, verifikasi/tolak                                              | Admin | US-22                      | MVP       |
| S-18 | Rekap Pemasukan        | Laporan pemasukan per bulan                                                         | Admin | US-26                      | MVP       |
| S-19 | Form Milestone         | Definisikan milestone proyek                                                        | Admin | US-28                      | Iterasi 2 |
| S-20 | Form Pembaruan Progres | Tulis pembaruan bertanggal + lampiran                                               | Admin | US-29, US-31               | Iterasi 2 |
| S-21 | Klasifikasi Revisi     | Klasifikasikan permintaan: revisi vs perubahan lingkup                              | Admin | US-33, US-35, US-36        | Iterasi 2 |
| S-22 | Form BAST              | Buat dan terbitkan BAST                                                             | Admin | US-37                      | Iterasi 2 |
| S-23 | Kelola Klaim Garansi   | Lihat klaim, tandai di luar cakupan, tutup klaim                                    | Admin | US-42, US-43               | Iterasi 3 |
| S-24 | Pengaturan             | Profil admin, rekening bank, template penawaran                                     | Admin | US-5                       | MVP       |
| S-25 | Kelola Tautan Portal   | Buat, cabut, reset PIN tautan klien                                                 | Admin | US-45, US-51, US-52, US-53 | MVP       |
| S-26 | Log Aktivitas          | Jejak audit semua perubahan status                                                  | Admin | US-54                      | MVP       |

### 2.2 Portal Client Screens

| ID   | Nama Screen             | Tujuan                                                                | Aktor | User Stories        | Iterasi   | Wireframe     |
| ---- | ----------------------- | --------------------------------------------------------------------- | ----- | ------------------- | --------- | ------------- |
| S-30 | Masukkan PIN            | Autentikasi klien dengan PIN                                          | Klien | US-46               | MVP       | `foqzv` (1a)  |
| S-31 | Buat PIN Baru           | Wajib ganti PIN awal saat pertama masuk                               | Klien | US-47               | MVP       | `oHbuo` (1b)  |
| S-32 | Ringkasan Proyek        | Halaman utama portal: status, progres, tagihan, kuota revisi, garansi | Klien | US-30, US-34, US-40 | MVP       | `eLG0K` (1c)  |
| S-33 | Detail Penawaran        | Lihat isi penawaran lengkap                                           | Klien | US-11               | MVP       | `i3m9g` (2a)  |
| S-34 | Setujui Penawaran       | Form persetujuan: nama, centang, PIN ulang                            | Klien | US-12               | MVP       | `owR8E` (2b)  |
| S-35 | Penawaran Disetujui     | Konfirmasi persetujuan berhasil + tombol WhatsApp                     | Klien | US-12, US-56, US-57 | MVP       | `ybBgL` (2c)  |
| S-36 | Tolak / Minta Perubahan | Form catatan penolakan penawaran                                      | Klien | US-13               | MVP       | —             |
| S-37 | Daftar Invoice Portal   | Daftar invoice + status pembayaran                                    | Klien | US-20               | MVP       | `a8HfpW` (3a) |
| S-38 | Unggah Bukti Transfer   | Form unggah bukti + pilih invoice                                     | Klien | US-21               | MVP       | `YJmCO` (3b)  |
| S-39 | Linimasa Progres        | Timeline pembaruan proyek                                             | Klien | US-30               | Iterasi 2 | —             |
| S-40 | Ajukan Revisi           | Form pengajuan revisi + sisa kuota                                    | Klien | US-32, US-34        | Iterasi 2 | —             |
| S-41 | Setujui BAST            | Persetujuan serah terima (sama dengan S-34)                           | Klien | US-38               | Iterasi 2 | —             |
| S-42 | Info Garansi            | Tanggal, cakupan, daftar klaim                                        | Klien | US-40, US-41        | Iterasi 3 | —             |
| S-43 | Ajukan Klaim Garansi    | Form klaim: deskripsi + tangkapan layar                               | Klien | US-41               | Iterasi 3 | —             |
| S-44 | Ganti PIN               | Form ganti PIN (PIN lama + PIN baru)                                  | Klien | US-50               | MVP       | —             |
| S-45 | Unduh Dokumen           | Daftar dokumen yang bisa diunduh                                      | Klien | US-55               | MVP       | —             |
| S-46 | Tautan Terkunci         | Pesan bahwa tautan dikunci akibat percobaan PIN                       | Klien | US-52               | MVP       | —             |
| S-47 | Tautan Dicabut          | Pesan bahwa tautan tidak berlaku lagi                                 | Klien | US-53               | MVP       | —             |

---

## 3. Navigation & Information Architecture

### 3.1 Admin Navigation

```
Sidebar (selalu terlihat di desktop, drawer di mobile)
├── Dashboard                          → S-03
├── Klien                              → S-04
│   └── [Detail Klien]                 → S-06
│       └── [Form Klien]              → S-05
├── Proyek                             → S-07
│   └── [Detail Proyek]               → S-08 (tabs)
│       ├── Tab: Overview              → status, info proyek, tautan portal
│       ├── Tab: Dokumen               → penawaran, addendum, BAST
│       ├── Tab: Tagihan               → termin, invoice, pembayaran
│       ├── Tab: Progres               → milestone, pembaruan (Iterasi 2)
│       ├── Tab: Revisi                → permintaan revisi (Iterasi 2)
│       ├── Tab: Garansi               → info garansi, klaim (Iterasi 3)
│       └── Tab: Log Aktivitas         → jejak audit
├── Invoice                            → S-14
│   └── [Detail Invoice]              → S-15
├── Rekap Pemasukan                    → S-18
├── Pengaturan                         → S-24
│   ├── Profil & Keamanan
│   ├── Rekening Bank
│   └── Template Penawaran
└── [Login]                            → S-01 (hanya saat belum masuk)
```

**Navigasi kontekstual:**

- Dari daftar klien → klik baris → detail klien
- Dari detail klien → klik proyek → detail proyek
- Dari dashboard → klik kartu "invoice jatuh tempo" → daftar invoice (pre-filtered)
- Dari detail proyek tab Dokumen → klik "Buat Penawaran" → S-10
- Dari detail proyek tab Tagihan → klik invoice → S-15

### 3.2 Portal Client Navigation

```
App Bar (tetap di atas)
├── Nama proyek + status
└── Menu (☰)
    ├── Ganti PIN                      → S-44
    └── Unduh Dokumen                  → S-45

Bottom Navigation / Tab Bar (mobile) atau Sidebar (desktop)
├── Ringkasan                          → S-32
├── Penawaran                          → S-33
├── Invoice                            → S-37
├── Progres                            → S-39 (Iterasi 2)
└── Garansi                            → S-42 (Iterasi 3)
```

ASUMSI: Portal client menggunakan bottom navigation pada mobile (4-5 tab) dan sidebar pada desktop, karena jumlah menu sedikit dan klien mengakses terutama dari ponsel via tautan WhatsApp.

**Navigasi kontekstual:**

- Dari ringkasan → klik kartu "Penawaran menunggu persetujuan" → S-33
- Dari ringkasan → klik kartu "Invoice belum lunas" → S-37
- Dari detail penawaran → klik "Setujui" → S-34
- Dari daftar invoice → klik invoice → detail + tombol "Unggah Bukti" → S-38
- Setelah tindakan penting → layar konfirmasi + tombol "Konfirmasi ke WhatsApp"

### 3.3 Entry Points

| Jalur masuk                                           | Aktor | Screen pertama                           |
| ----------------------------------------------------- | ----- | ---------------------------------------- |
| URL admin (misal `portal.domain.com/admin`)           | Admin | S-01 (Login) → S-03 (Dashboard)          |
| Tautan WhatsApp (misal `portal.domain.com/p/{token}`) | Klien | S-30 (PIN) → S-32 (Ringkasan)            |
| Tautan WhatsApp (pertama kali)                        | Klien | S-30 (PIN awal) → S-31 (Buat PIN) → S-32 |
| Tautan WhatsApp (sesi aktif, <30 hari)                | Klien | Langsung S-32 (Ringkasan)                |
| Tautan dicabut                                        | Klien | S-47 (Tautan Dicabut)                    |

---

## 4. User Flows

### F-01 · Admin: Login

| #   | Langkah                   | Screen        | Catatan                             |
| --- | ------------------------- | ------------- | ----------------------------------- |
| 1   | Buka URL admin            | S-01          | Redirect ke S-03 jika sesi aktif    |
| 2   | Masukkan email + password | S-01          | Validasi inline                     |
| 3   | Masukkan kode TOTP        | S-01 (step 2) | Muncul setelah email+password benar |
| 4   | Masuk ke dashboard        | S-03          | Cookie sesi 24 jam                  |

**Alternatif:**

- 2a. Password salah → pesan error, coba lagi (max 5x → lockout 15 menit)
- 3a. TOTP salah → pesan error, coba lagi
- 3b. Belum setup 2FA → redirect ke S-02

### F-02 · Admin: Buat Klien dan Proyek Baru

| #   | Langkah                                     | Screen | Catatan                 |
| --- | ------------------------------------------- | ------ | ----------------------- |
| 1   | Klik "Tambah Klien" di S-04                 | S-05   |                         |
| 2   | Isi nama, usaha, WhatsApp, email (opsional) | S-05   | Validasi nomor WhatsApp |
| 3   | Simpan → redirect ke detail klien           | S-06   |                         |
| 4   | Klik "Buat Proyek"                          | S-09   | Klien sudah terpilih    |
| 5   | Isi nama proyek, deskripsi                  | S-09   | Status awal: `draft`    |
| 6   | Simpan → redirect ke detail proyek          | S-08   | Tab Overview aktif      |

### F-03 · Admin: Buat dan Kirim Penawaran

| #   | Langkah                                         | Screen | Catatan                              |
| --- | ----------------------------------------------- | ------ | ------------------------------------ |
| 1   | Dari S-08 tab Dokumen, klik "Buat Penawaran"    | S-10   | Bisa pilih template (US-5)           |
| 2   | Isi lingkup kerja, tambah item + harga          | S-10   | Kalkulasi total otomatis             |
| 3   | Atur skema termin (misal DP 50%, pelunasan 50%) | S-10   | Validasi: total termin = total harga |
| 4   | Isi kuota revisi + definisi revisi              | S-10   | US-7                                 |
| 5   | Isi durasi + cakupan garansi                    | S-10   | US-8                                 |
| 6   | Klik "Pratinjau"                                | S-11   | Render PDF preview                   |
| 7   | Klik "Kirim ke Klien"                           | S-12   | Modal konfirmasi                     |
| 8   | Sistem membuat tautan portal + PIN awal         | S-12   | PIN ditampilkan sekali               |
| 9   | Klik "Salin Pesan WhatsApp"                     | S-12   | Pesan siap kirim: tautan portal      |
| 10  | Kirim PIN awal lewat pesan WhatsApp terpisah    | —      | Manual, di luar sistem               |
| 11  | Status proyek → `quotation_sent`                | S-08   | Otomatis                             |

**Alternatif:**

- 6a. Ada kesalahan → kembali ke S-10, edit
- 7a. Batal kirim → kembali ke S-10, penawaran tetap draft

### F-04 · Klien: Pertama Kali Masuk dan Setujui Penawaran

| #   | Langkah                                                  | Screen | Catatan                              |
| --- | -------------------------------------------------------- | ------ | ------------------------------------ |
| 1   | Buka tautan dari WhatsApp                                | S-30   | Wireframe `foqzv`                    |
| 2   | Masukkan PIN awal (dari pesan terpisah)                  | S-30   |                                      |
| 3   | Sistem deteksi PIN awal → wajib ganti                    | S-31   | Wireframe `oHbuo`                    |
| 4   | Masukkan PIN baru (min 6 digit, bukan lemah)             | S-31   | Validasi kekuatan PIN                |
| 5   | Konfirmasi PIN baru                                      | S-31   |                                      |
| 6   | Masuk ke ringkasan proyek                                | S-32   | Wireframe `eLG0K`                    |
| 7   | Klik kartu "Penawaran menunggu persetujuan"              | S-33   | Wireframe `i3m9g`                    |
| 8   | Baca isi penawaran: item, harga, termin, revisi, garansi | S-33   | Scroll lengkap                       |
| 9   | Klik "Setujui Penawaran"                                 | S-34   | Wireframe `owR8E`                    |
| 10  | Ketik nama, centang "Saya setuju", masukkan PIN          | S-34   | Re-autentikasi PIN (US-49)           |
| 11  | Klik "Konfirmasi Persetujuan"                            | S-35   | Wireframe `ybBgL`                    |
| 12  | Lihat konfirmasi + klik "Konfirmasi ke WhatsApp"         | S-35   | Buka wa.me siap kirim (US-56, US-57) |
| 13  | Status proyek → `awaiting_down_payment`                  | —      | Otomatis                             |

**Alternatif:**

- 2a. PIN salah 5x → tautan terkunci 15 menit → S-46
- 4a. PIN lemah (123456, 000000) → pesan error, coba lagi
- 9a. Klik "Tolak / Minta Perubahan" → S-36 → isi catatan → kirim → status proyek → `draft`

### F-05 · Klien: Bayar Invoice dan Unggah Bukti

| #   | Langkah                                                  | Screen            | Catatan                         |
| --- | -------------------------------------------------------- | ----------------- | ------------------------------- |
| 1   | Buka portal (sudah login)                                | S-32              |                                 |
| 2   | Klik kartu invoice atau tab Invoice                      | S-37              | Wireframe `a8HfpW`              |
| 3   | Lihat daftar invoice: nomor, jumlah, status, jatuh tempo | S-37              |                                 |
| 4   | Klik invoice yang ingin dibayar                          | S-37              | Detail invoice: rekening tujuan |
| 5   | Klik "Unggah Bukti Transfer"                             | S-38              | Wireframe `YJmCO`               |
| 6   | Masukkan PIN (re-autentikasi)                            | S-38              | US-49                           |
| 7   | Pilih file bukti transfer (gambar/PDF)                   | S-38              | Validasi tipe + ukuran          |
| 8   | Isi nominal transfer, tanggal transfer                   | S-38              |                                 |
| 9   | Klik "Kirim"                                             | S-38 → konfirmasi |                                 |
| 10  | Tombol "Konfirmasi ke WhatsApp" muncul                   | konfirmasi        | wa.me pesan otomatis            |
| 11  | Status pembayaran → `pending_verification`               | —                 | Menunggu admin verifikasi       |

**Alternatif:**

- 7a. File terlalu besar → pesan error, batas 5 MB
- 7b. Tipe file tidak valid → pesan error

### F-06 · Admin: Verifikasi Pembayaran

| #   | Langkah                                                      | Screen | Catatan                                        |
| --- | ------------------------------------------------------------ | ------ | ---------------------------------------------- |
| 1   | Dashboard menampilkan badge "pembayaran menunggu verifikasi" | S-03   | US-58                                          |
| 2   | Klik → masuk ke detail invoice                               | S-15   |                                                |
| 3   | Lihat bukti transfer yang diunggah klien                     | S-17   | Gambar/PDF viewer                              |
| 4a  | Klik "Verifikasi" → status → `verified`                      | S-17   | Invoice update ke `partially_paid` atau `paid` |
| 4b  | Klik "Tolak" + alasan → status → `rejected`                  | S-17   | Klien bisa unggah ulang                        |
| 5   | Jika DP terverifikasi → status proyek bisa → `in_progress`   | S-08   | US-27                                          |

### F-07 · Admin: Catat Pembayaran Manual

| #   | Langkah                                            | Screen | Catatan                 |
| --- | -------------------------------------------------- | ------ | ----------------------- |
| 1   | Dari S-15 detail invoice, klik "Catat Pembayaran"  | S-16   |                         |
| 2   | Isi nominal, tanggal, catatan, lampiran (opsional) | S-16   | US-23                   |
| 3   | Simpan                                             | S-15   | Invoice update otomatis |

### F-08 · Admin: Kirim Pengingat Tagihan

| #   | Langkah                                                         | Screen | Catatan    |
| --- | --------------------------------------------------------------- | ------ | ---------- |
| 1   | Dari S-14 atau S-15, klik "Kirim Pengingat"                     | dialog | US-25      |
| 2   | Pratinjau pesan WhatsApp (invoice, jumlah, jatuh tempo, tautan) | dialog |            |
| 3   | Klik "Salin" atau "Buka WhatsApp"                               | —      | wa.me link |

### F-09 · Admin: Revisi Penawaran (Iterasi MVP)

| #   | Langkah                                                                    | Screen     | Catatan                              |
| --- | -------------------------------------------------------------------------- | ---------- | ------------------------------------ |
| 1   | Dari S-08 tab Dokumen, klik versi penawaran yang ditolak/diminta perubahan | S-13       | US-14                                |
| 2   | Klik "Buat Versi Baru"                                                     | S-10       | Data terisi dari versi sebelumnya    |
| 3   | Edit item, harga, termin sesuai permintaan klien                           | S-10       |                                      |
| 4   | Pratinjau → Kirim (sama dengan F-03 langkah 6-11)                          | S-11, S-12 | Status proyek tetap `quotation_sent` |

### F-10 · Admin: Progres dan Milestone (Iterasi 2)

| #   | Langkah                                              | Screen | Catatan                      |
| --- | ---------------------------------------------------- | ------ | ---------------------------- |
| 1   | Dari S-08 tab Progres, klik "Tambah Milestone"       | S-19   | US-28                        |
| 2   | Isi nama milestone, deskripsi, target tanggal        | S-19   |                              |
| 3   | Klik "Tulis Pembaruan"                               | S-20   | US-29                        |
| 4   | Tulis pembaruan bertanggat + lampiran/tautan staging | S-20   |                              |
| 5   | Klik "Kirim & Beri Tahu Klien"                       | dialog | wa.me pesan otomatis (US-31) |

### F-11 · Admin: Serah Terima / BAST (Iterasi 2)

| #   | Langkah                                                                 | Screen       | Catatan     |
| --- | ----------------------------------------------------------------------- | ------------ | ----------- |
| 1   | Status proyek = `client_review`, dari S-08 tab Dokumen klik "Buat BAST" | S-22         | US-37       |
| 2   | Isi daftar hasil yang diserahkan                                        | S-22         |             |
| 3   | Pratinjau → Kirim ke klien                                              | S-12 (reuse) | wa.me pesan |
| 4   | Status proyek → `handover_sent`                                         | —            |             |
| 5   | Klien setujui BAST di portal (flow mirip F-04 langkah 9-12)             | S-41         | US-38       |
| 6   | Status proyek → `warranty`; invoice pelunasan aktif                     | —            | US-39       |

### F-12 · Klien: Ajukan Revisi (Iterasi 2)

| #   | Langkah                                           | Screen     | Catatan                 |
| --- | ------------------------------------------------- | ---------- | ----------------------- |
| 1   | Dari S-32 atau tab Revisi, klik "Ajukan Revisi"   | S-40       | US-32                   |
| 2   | Lihat sisa kuota revisi                           | S-40       | US-34                   |
| 3   | Isi deskripsi revisi + tangkapan layar (opsional) | S-40       |                         |
| 4   | Kirim                                             | konfirmasi | Tombol WhatsApp (US-56) |
| 5   | Admin menerima → klasifikasi di S-21              | S-21       | US-33                   |

**Alternatif:**

- 2a. Kuota habis → pesan bahwa revisi tidak bisa diajukan, tawarkan revisi berbayar (US-35)

### F-13 · Klien: Ajukan Klaim Garansi (Iterasi 3)

| #   | Langkah                                          | Screen     | Catatan |
| --- | ------------------------------------------------ | ---------- | ------- |
| 1   | Dari S-32 atau tab Garansi, klik "Ajukan Klaim"  | S-43       | US-41   |
| 2   | Lihat info garansi: tanggal, cakupan             | S-42       | US-40   |
| 3   | Isi deskripsi masalah + tangkapan layar          | S-43       |         |
| 4   | Kirim                                            | konfirmasi |         |
| 5   | Sistem tandai otomatis jika di luar masa/cakupan | —          | US-42   |
| 6   | Admin kelola di S-23 → tutup klaim (US-43)       | S-23       |         |

### F-14 · Admin: Batalkan Proyek

| #   | Langkah                                        | Screen | Catatan         |
| --- | ---------------------------------------------- | ------ | --------------- |
| 1   | Dari S-08 tab Overview, klik "Batalkan Proyek" | dialog | US-4            |
| 2   | Isi alasan pembatalan (wajib)                  | dialog |                 |
| 3   | Konfirmasi                                     | dialog |                 |
| 4   | Status proyek → `cancelled` (terminal)         | S-08   | Data tetap utuh |

### F-15 · Admin: Reset PIN Klien

| #   | Langkah                                                 | Screen | Catatan                    |
| --- | ------------------------------------------------------- | ------ | -------------------------- |
| 1   | Dari S-25 (kelola tautan portal) atau S-08 tab Overview | S-25   | US-51                      |
| 2   | Klik "Reset PIN"                                        | dialog |                            |
| 3   | Sistem buat PIN awal baru + cabut semua sesi            | dialog |                            |
| 4   | PIN awal ditampilkan sekali                             | dialog | Admin kirim lewat WhatsApp |

### F-16 · Admin: Cabut dan Buat Ulang Tautan Portal

| #   | Langkah                                                    | Screen | Catatan                   |
| --- | ---------------------------------------------------------- | ------ | ------------------------- |
| 1   | Dari S-25 atau S-08, klik "Cabut Tautan"                   | dialog | US-53                     |
| 2   | Konfirmasi → tautan lama tidak berlaku, semua sesi dicabut | —      |                           |
| 3   | Klik "Buat Tautan Baru"                                    | dialog | Token baru, PIN awal baru |
| 4   | Salin pesan WhatsApp (tautan + PIN terpisah)               | dialog |                           |

---

## 5. Per-Screen Spec

### S-01 · Login Admin

**Konten (urutan prioritas):**

1. Logo/nama aplikasi
2. Input email
3. Input password
4. Tombol "Masuk"
5. (Step 2) Input kode TOTP — muncul setelah email+password benar

**Aksi:**

| Aksi  | Jenis   | Tujuan                     |
| ----- | ------- | -------------------------- |
| Masuk | Primary | Validasi kredensial → S-03 |

**State:**

| State                   | Tampilan                                                    |
| ----------------------- | ----------------------------------------------------------- |
| Default                 | Form email + password                                       |
| Loading                 | Tombol disabled + spinner                                   |
| Error: kredensial salah | Pesan error di atas form (tidak spesifik field mana)        |
| Locked (5x gagal)       | Form disabled, pesan "coba lagi dalam 15 menit" + countdown |
| Step 2: TOTP            | Input 6 digit TOTP menggantikan email+password              |

### S-03 · Dashboard

**Konten (urutan prioritas):**

1. Greeting + tanggal hari ini
2. Kartu ringkasan: jumlah proyek aktif, total tagihan belum lunas, pemasukan bulan ini
3. Daftar tindakan menunggu (awaiting action):
   - Pembayaran menunggu verifikasi (badge count)
   - Penawaran ditolak / diminta perubahan
   - Klaim garansi baru (Iterasi 3)
4. Invoice jatuh tempo (tabel: klien, proyek, nomor, jumlah, jatuh tempo)
5. Proyek aktif terakhir diperbarui (tabel singkat)

**Aksi:**

| Aksi                 | Jenis     | Tujuan                  |
| -------------------- | --------- | ----------------------- |
| Klik kartu ringkasan | Navigasi  | Masuk ke daftar terkait |
| Klik item tindakan   | Navigasi  | Masuk ke detail terkait |
| + Proyek Baru        | Primary   | S-09                    |
| + Klien Baru         | Secondary | S-05                    |

**State:**

| State               | Tampilan                                                               |
| ------------------- | ---------------------------------------------------------------------- |
| Default             | Data terisi                                                            |
| Kosong (baru mulai) | Empty state: "Belum ada proyek. Mulai dengan menambah klien." + tombol |
| Loading             | Skeleton shimmer pada kartu                                            |

### S-08 · Detail Proyek

**Konten (urutan prioritas):**

1. Header: nama proyek, nama klien, badge status
2. Status bar dengan progress (sesuai state machine)
3. Tab navigation:
   - **Overview**: info proyek, tautan portal, PIN awal (jika belum diganti), tombol aksi status
   - **Dokumen**: daftar versi penawaran/addendum/BAST, jejak persetujuan
   - **Tagihan**: skema termin, daftar invoice, tombol "Catat Pembayaran"
   - **Progres**: milestone + pembaruan (Iterasi 2)
   - **Revisi**: permintaan revisi + kuota (Iterasi 2)
   - **Garansi**: info garansi + klaim (Iterasi 3)
   - **Log**: audit trail

**Aksi per tab:**

_Tab Overview:_

| Aksi                | Jenis     | Tujuan            | Kondisi                          |
| ------------------- | --------- | ----------------- | -------------------------------- |
| Buat Penawaran      | Primary   | S-10              | Status = `draft`                 |
| Batalkan Proyek     | Danger    | Dialog konfirmasi | Status ≠ `completed`/`cancelled` |
| Kelola Tautan       | Secondary | S-25              | Selalu                           |
| Salin Tautan Portal | Secondary | Clipboard         | Tautan aktif ada                 |
| Kirim WhatsApp      | Secondary | wa.me link        | Tautan aktif ada                 |

_Tab Dokumen:_

| Aksi                    | Jenis     | Tujuan               | Kondisi                                  |
| ----------------------- | --------- | -------------------- | ---------------------------------------- |
| Buat Versi Baru         | Primary   | S-10                 | Versi terakhir ditolak/diminta perubahan |
| Buat Addendum           | Primary   | S-10 (mode addendum) | Penawaran sudah disetujui (Iterasi 2)    |
| Buat BAST               | Primary   | S-22                 | Status = `client_review` (Iterasi 2)     |
| Lihat Jejak Persetujuan | Secondary | S-13                 | Versi sudah disetujui/ditolak            |
| Unduh PDF               | Secondary | Download file        | Versi sudah dikirim                      |

_Tab Tagihan:_

| Aksi             | Jenis     | Tujuan       | Kondisi                          |
| ---------------- | --------- | ------------ | -------------------------------- |
| Catat Pembayaran | Primary   | S-16         | Invoice ada                      |
| Verifikasi Bukti | Primary   | S-17         | Ada bukti `pending_verification` |
| Kirim Pengingat  | Secondary | Dialog wa.me | Invoice belum lunas              |

**State:**

| State                 | Tampilan                                     |
| --------------------- | -------------------------------------------- |
| draft                 | Hanya tab Overview + Dokumen aktif           |
| quotation_sent        | Menunggu respons klien, badge "menunggu"     |
| awaiting_down_payment | Highlight invoice DP, tombol "Verifikasi DP" |
| in_progress           | Tab Progres aktif (Iterasi 2)                |
| cancelled             | Banner merah "Proyek Dibatalkan" + alasan    |

### S-10 · Form Penawaran

**Konten (urutan prioritas):**

1. Header: "Buat Penawaran" atau "Edit Penawaran v{n}"
2. Dropdown template (opsional)
3. Textarea lingkup kerja
4. Tabel item: nama, deskripsi, harga — bisa tambah/hapus baris
5. Total harga (kalkulasi otomatis)
6. Skema termin: tabel berisi label, persen atau nominal — bisa tambah/hapus baris
7. Validasi: total termin harus = total harga (pesan error jika tidak)
8. Input kuota revisi (angka) + textarea definisi revisi
9. Input durasi garansi (angka + satuan: hari/bulan) + textarea cakupan garansi

**Aksi:**

| Aksi          | Jenis     | Tujuan              |
| ------------- | --------- | ------------------- |
| Simpan Draft  | Secondary | Simpan tanpa kirim  |
| Pratinjau PDF | Secondary | S-11                |
| Tambah Item   | Ghost     | Tambah baris item   |
| Tambah Termin | Ghost     | Tambah baris termin |

**State:**

| State               | Tampilan                          |
| ------------------- | --------------------------------- |
| Default (buat baru) | Form kosong atau terisi template  |
| Edit versi          | Form terisi data versi sebelumnya |
| Validasi error      | Highlight field + pesan per field |

### S-30 · Masukkan PIN (Portal)

**Wireframe:** `foqzv` (1a · Masukkan PIN)

**Konten (urutan prioritas):**

1. Logo/nama portal
2. Nama proyek
3. Teks: "Masukkan PIN untuk melanjutkan"
4. Input PIN (6 digit, masked)
5. Tombol "Masuk"
6. Teks bantuan: "Lupa PIN? Hubungi penyedia jasa"

**Aksi:**

| Aksi  | Jenis   | Tujuan                                        |
| ----- | ------- | --------------------------------------------- |
| Masuk | Primary | Validasi PIN → S-32 (atau S-31 jika PIN awal) |

**State:**

| State            | Tampilan                                                               |
| ---------------- | ---------------------------------------------------------------------- |
| Default          | Input PIN kosong                                                       |
| Loading          | Spinner pada tombol                                                    |
| Error: PIN salah | Pesan error + sisa percobaan (misal "PIN salah. 3 percobaan tersisa.") |
| Locked           | S-46 — pesan tautan terkunci                                           |

### S-31 · Buat PIN Baru (Portal)

**Wireframe:** `oHbuo` (1b · Buat PIN baru)

**Konten (urutan prioritas):**

1. Teks: "Anda harus membuat PIN baru untuk melanjutkan"
2. Input PIN baru (min 6 digit)
3. Input konfirmasi PIN baru
4. Aturan PIN: minimal 6 digit, tidak boleh berurutan/berulang
5. Tombol "Simpan PIN"

**Aksi:**

| Aksi       | Jenis   | Tujuan                 |
| ---------- | ------- | ---------------------- |
| Simpan PIN | Primary | Simpan PIN baru → S-32 |

**State:**

| State                       | Tampilan                                                 |
| --------------------------- | -------------------------------------------------------- |
| Default                     | Form kosong                                              |
| Validasi error: PIN lemah   | Pesan spesifik: "PIN tidak boleh berupa angka berurutan" |
| Validasi error: tidak cocok | "Konfirmasi PIN tidak cocok"                             |

### S-32 · Ringkasan Proyek (Portal)

**Wireframe:** `eLG0K` (1c · Ringkasan proyek)

**Konten (urutan prioritas):**

1. App bar: nama proyek + badge status
2. Kartu status proyek (mengikuti state machine):
   - Status saat ini + penjelasan singkat
   - Aksi yang ditunggu (misal "Menunggu pembayaran DP")
3. Kartu tagihan: total tagihan, sudah dibayar, sisa, invoice jatuh tempo terdekat
4. Kartu progres terbaru (Iterasi 2): pembaruan terakhir, milestone terbaru
5. Kartu revisi: sisa kuota revisi / total (Iterasi 2)
6. Kartu garansi: status garansi, tanggal berakhir, sisa hari (Iterasi 3)

**Aksi:**

| Aksi              | Jenis            | Tujuan      | Kondisi                            |
| ----------------- | ---------------- | ----------- | ---------------------------------- |
| Lihat Penawaran   | Navigasi (kartu) | S-33        | Penawaran ada                      |
| Lihat Invoice     | Navigasi (kartu) | S-37        | Invoice ada                        |
| Setujui Penawaran | Primary (kartu)  | S-33 → S-34 | Status = `quotation_sent`          |
| Unggah Bukti      | Primary (kartu)  | S-38        | Invoice belum lunas                |
| Ajukan Revisi     | Secondary        | S-40        | Status = `in_progress` (Iterasi 2) |

**State per status proyek:**

| Status Proyek         | Kartu yang dominan                                     |
| --------------------- | ------------------------------------------------------ |
| draft                 | "Penawaran sedang disiapkan"                           |
| quotation_sent        | Kartu Penawaran + tombol "Lihat & Setujui" (highlight) |
| awaiting_down_payment | Kartu Tagihan: invoice DP + tombol "Bayar" (highlight) |
| in_progress           | Kartu Progres (Iterasi 2); kartu tagihan tetap         |
| client_review         | "Menunggu review Anda" + link ke deliverables          |
| handover_sent         | Kartu BAST + tombol "Setujui BAST" (highlight)         |
| warranty              | Kartu Garansi + sisa hari (Iterasi 3)                  |
| completed             | "Proyek selesai" banner                                |
| cancelled             | "Proyek dibatalkan" banner + alasan                    |

### S-33 · Detail Penawaran (Portal)

**Wireframe:** `i3m9g` (2a · Detail Penawaran)

**Konten (urutan prioritas):**

1. Header: "Penawaran" + versi + tanggal
2. Lingkup kerja (teks paragraf)
3. Tabel item: nama, deskripsi, harga — total di bawah
4. Skema termin: tabel label, jumlah
5. Kuota revisi + definisi
6. Durasi + cakupan garansi
7. Tombol aksi (bawah)

**Aksi:**

| Aksi                    | Jenis     | Tujuan   | Kondisi                              |
| ----------------------- | --------- | -------- | ------------------------------------ |
| Setujui Penawaran       | Primary   | S-34     | Status versi = sent, belum disetujui |
| Tolak / Minta Perubahan | Secondary | S-36     | Status versi = sent, belum disetujui |
| Unduh PDF               | Secondary | Download | Selalu                               |
| Kembali                 | Navigasi  | S-32     | Selalu                               |

**State:**

| State                | Tampilan                                               |
| -------------------- | ------------------------------------------------------ |
| Menunggu persetujuan | Tombol Setujui + Tolak aktif                           |
| Sudah disetujui      | Banner "Disetujui pada [tanggal]" — tombol aksi hilang |
| Ditolak              | Banner "Ditolak" + catatan klien                       |
| Versi lama           | Label "Versi lama — lihat versi terbaru" + link        |

### S-34 · Setujui Penawaran (Portal)

**Wireframe:** `owR8E` (2b · Setujui dengan PIN ulang)

**Konten (urutan prioritas):**

1. Ringkasan penawaran: jumlah item, total harga, skema termin
2. Input nama lengkap (untuk bukti persetujuan)
3. Checkbox: "Saya menyetujui penawaran ini beserta syarat dan ketentuan yang tercantum"
4. Input PIN (re-autentikasi)
5. Tombol "Konfirmasi Persetujuan"
6. Teks kecil: penjelasan bahwa persetujuan tercatat (waktu, perangkat, IP)

**Aksi:**

| Aksi                   | Jenis     | Tujuan                    |
| ---------------------- | --------- | ------------------------- |
| Konfirmasi Persetujuan | Primary   | Proses persetujuan → S-35 |
| Batal                  | Secondary | Kembali ke S-33           |

**State:**

| State            | Tampilan                                        |
| ---------------- | ----------------------------------------------- |
| Default          | Form kosong, tombol disabled sampai semua diisi |
| Validasi error   | Highlight field kosong/salah                    |
| Error: PIN salah | Pesan error pada input PIN                      |
| Processing       | Spinner, semua input disabled                   |

### S-35 · Penawaran Disetujui (Portal)

**Wireframe:** `ybBgL` (2c · Penawaran disetujui)

**Konten (urutan prioritas):**

1. Ikon sukses (✓)
2. Teks: "Penawaran berhasil disetujui"
3. Ringkasan: tanggal persetujuan, nomor dokumen
4. Info selanjutnya: "Langkah berikutnya: pembayaran DP"
5. Tombol "Konfirmasi ke WhatsApp" (besar, primary)
6. Link "Kembali ke Ringkasan"

**Aksi:**

| Aksi                   | Jenis   | Tujuan                           |
| ---------------------- | ------- | -------------------------------- |
| Konfirmasi ke WhatsApp | Primary | Buka wa.me dengan pesan otomatis |
| Kembali ke Ringkasan   | Link    | S-32                             |

### S-37 · Daftar Invoice Portal

**Wireframe:** `a8HfpW` (3a · Invoice dibayar sebagian)

**Konten (urutan prioritas):**

1. Header: "Invoice"
2. Kartu per invoice:
   - Nomor invoice (INV-YYYY-NNNN)
   - Label termin (misal "DP 50%")
   - Jumlah tagihan
   - Status badge (belum bayar / sebagian / lunas / jatuh tempo)
   - Tanggal jatuh tempo
   - Rekening tujuan (nama bank, nomor, atas nama)
3. Total ringkasan: sudah dibayar / total keseluruhan

**Aksi:**

| Aksi                  | Jenis                 | Tujuan   | Kondisi             |
| --------------------- | --------------------- | -------- | ------------------- |
| Unggah Bukti Transfer | Primary (per invoice) | S-38     | Invoice belum lunas |
| Unduh Invoice PDF     | Secondary             | Download | Selalu              |

**State:**

| State                   | Tampilan                                     |
| ----------------------- | -------------------------------------------- |
| Belum ada invoice       | Empty state: "Belum ada invoice"             |
| Ada invoice belum lunas | Highlight invoice jatuh tempo                |
| Semua lunas             | Semua badge "Lunas", tidak ada tombol unggah |

### S-38 · Unggah Bukti Transfer (Portal)

**Wireframe:** `YJmCO` (3b · Unggah bukti transfer)

**Konten (urutan prioritas):**

1. Info invoice yang dibayar: nomor, jumlah, rekening tujuan
2. Input file: area drag-drop atau klik untuk pilih file
3. Input nominal yang ditransfer
4. Input tanggal transfer
5. Input PIN (re-autentikasi)
6. Tombol "Kirim Bukti"

**Aksi:**

| Aksi        | Jenis     | Tujuan                                  |
| ----------- | --------- | --------------------------------------- |
| Kirim Bukti | Primary   | Unggah + proses → konfirmasi + WhatsApp |
| Batal       | Secondary | Kembali ke S-37                         |

**State:**

| State                   | Tampilan                                                       |
| ----------------------- | -------------------------------------------------------------- |
| Default                 | Form kosong                                                    |
| File terpilih           | Preview gambar/nama file + ukuran                              |
| Error: file tidak valid | Pesan "Format file tidak didukung" atau "Ukuran melebihi 5 MB" |
| Error: PIN salah        | Pesan error pada input PIN                                     |
| Processing              | Upload progress bar                                            |
| Berhasil                | Redirect ke konfirmasi + tombol WhatsApp                       |

### S-44 · Ganti PIN (Portal)

**Konten (urutan prioritas):**

1. Teks: "Ganti PIN"
2. Input PIN lama
3. Input PIN baru (min 6 digit)
4. Input konfirmasi PIN baru
5. Tombol "Simpan"

**Aksi:**

| Aksi   | Jenis   | Tujuan                             |
| ------ | ------- | ---------------------------------- |
| Simpan | Primary | Ganti PIN + cabut sesi lain → S-32 |

**State:**

| State                 | Tampilan                          |
| --------------------- | --------------------------------- |
| Default               | Form kosong                       |
| Error: PIN lama salah | Pesan error                       |
| Error: PIN baru lemah | Pesan spesifik                    |
| Berhasil              | Notifikasi sukses → redirect S-32 |

### S-46 · Tautan Terkunci (Portal)

**Konten:**

1. Ikon peringatan
2. Teks: "Tautan ini dikunci sementara karena terlalu banyak percobaan PIN yang salah"
3. Countdown timer (15 menit) — ASUMSI: countdown ditampilkan untuk UX transparan
4. Teks bantuan: "Jika Anda membutuhkan bantuan, hubungi penyedia jasa"

**State:**

| State                     | Tampilan                                                            |
| ------------------------- | ------------------------------------------------------------------- |
| Terkunci sementara (1-2x) | Countdown + bisa coba lagi setelah                                  |
| Dibekukan (3x lockout)    | Pesan "Hubungi penyedia jasa untuk membuka kunci" — tanpa countdown |

### S-47 · Tautan Dicabut (Portal)

**Konten:**

1. Ikon stop
2. Teks: "Tautan ini tidak berlaku lagi"
3. Teks: "Hubungi penyedia jasa jika Anda membutuhkan tautan baru"

---

## 6. Edge Cases

| #    | Kasus                                                    | Screen     | Perilaku                                                                                     |
| ---- | -------------------------------------------------------- | ---------- | -------------------------------------------------------------------------------------------- |
| E-01 | Nama klien sangat panjang (>100 karakter)                | S-06, S-32 | Truncate dengan ellipsis, tooltip untuk nama lengkap                                         |
| E-02 | Proyek tanpa item penawaran (total = 0)                  | S-10       | Tombol "Kirim" disabled, pesan "Tambah minimal satu item"                                    |
| E-03 | Total termin ≠ total harga (pembulatan)                  | S-10       | Sistem menampilkan selisih, otomatis bebankan ke termin terakhir                             |
| E-04 | Klien membuka tautan lama setelah dicabut                | S-47       | Tampilkan S-47, bukan error 404                                                              |
| E-05 | Klien membuka tautan di perangkat baru (sesi habis)      | S-30       | Masukkan PIN ulang — bukan PIN awal                                                          |
| E-06 | Dua browser/tab terbuka, persetujuan diklik dua kali     | S-34       | Cek server-side: jika sudah disetujui → redirect ke S-35                                     |
| E-07 | Upload file 0 byte                                       | S-38       | Tolak: "File kosong"                                                                         |
| E-08 | Nomor invoice konflik (concurrent request)               | S-15       | Row locking pada `number_sequences` — tidak ada gap                                          |
| E-09 | Admin belum setup 2FA                                    | S-01       | Redirect ke S-02 setelah login pertama                                                       |
| E-10 | Satu klien dengan banyak proyek                          | S-06       | Daftar proyek scrollable, pagination jika >10                                                |
| E-11 | Penawaran sudah disetujui, admin coba edit               | S-10       | Tombol "Edit" hidden; hanya "Buat Addendum"                                                  |
| E-12 | Klien mengunggah bukti untuk invoice yang sudah lunas    | S-37       | Tombol "Unggah" hidden pada invoice lunas                                                    |
| E-13 | Cookie sesi portal expired saat mengisi form persetujuan | S-34       | Simpan state form → redirect ke S-30 → setelah PIN benar, kembali ke form dengan data terisi |
| E-14 | Koneksi lambat/offline saat upload                       | S-38       | Retry otomatis 1x; jika gagal → pesan "Gagal mengunggah. Periksa koneksi internet."          |
| E-15 | Invoice jatuh tempo sudah lewat                          | S-37, S-14 | Badge merah "Jatuh Tempo" + jumlah hari terlambat                                            |
| E-16 | Kuota revisi habis, klien coba ajukan                    | S-40       | Form disabled, pesan "Kuota revisi habis. Hubungi penyedia untuk revisi berbayar."           |
| E-17 | Klaim garansi di luar masa garansi                       | S-43       | Sistem izinkan submit tapi tandai otomatis "di luar masa garansi" — admin putuskan           |
| E-18 | Harga item sangat besar (miliaran rupiah)                | S-10, S-33 | Format Rp dengan separator titik, tidak wrap                                                 |

---

## 7. Responsive Behavior

Platform target: web responsif (mobile-first). Klien mengakses terutama dari ponsel via tautan WhatsApp.

| Aspek                       | Mobile (<768px)                                      | Desktop (≥1024px)                     |
| --------------------------- | ---------------------------------------------------- | ------------------------------------- |
| **Admin sidebar**           | Drawer (hamburger button), overlay                   | Sidebar tetap terlihat di kiri        |
| **Admin tabel**             | Horizontal scroll, atau card view untuk tabel sempit | Tabel penuh                           |
| **Admin form penawaran**    | Stack vertikal, tabel item bisa di-scroll horizontal | Side-by-side sections                 |
| **Portal navigation**       | Bottom tab bar (4-5 item)                            | Sidebar kiri                          |
| **Portal kartu ringkasan**  | Stack vertikal, full-width                           | Grid 2 kolom                          |
| **Portal detail penawaran** | Single column, tabel item scroll horizontal          | Comfortable reading width (max 720px) |
| **Portal form persetujuan** | Stack vertikal, tombol full-width                    | Centered card (max 480px)             |
| **Upload area**             | Full-width, besar (mudah tap)                        | Centered, ukuran sedang               |
| **PDF preview**             | Inline viewer (atau link download langsung)          | Inline viewer di panel samping        |

ASUMSI: Breakpoint mengikuti konvensi Tailwind CSS (sm: 640px, md: 768px, lg: 1024px, xl: 1280px).

---

## 8. Accessibility

| #    | Aturan                      | Implementasi                                                                       |
| ---- | --------------------------- | ---------------------------------------------------------------------------------- |
| A-01 | Tap target minimum 44×44px  | Semua tombol dan input di portal mobile                                            |
| A-02 | Focus order logis pada form | Tab order: input → checkbox → tombol, sesuai visual order                          |
| A-03 | Error tidak hanya warna     | Pesan teks + ikon di samping field error, bukan hanya outline merah                |
| A-04 | Form labels                 | Setiap input punya `<label>` yang terhubung via `htmlFor`                          |
| A-05 | Loading state               | `aria-busy="true"` pada container yang loading; spinner punya `aria-label`         |
| A-06 | Status badges               | `aria-label` deskriptif: bukan hanya "merah" tapi "Jatuh Tempo"                    |
| A-07 | Modal/dialog                | Focus trap, ESC untuk tutup, focus kembali ke trigger setelah tutup                |
| A-08 | Kontras teks                | Minimum WCAG AA (4.5:1 untuk teks normal, 3:1 untuk teks besar)                    |
| A-09 | PIN input                   | Ketik digit, bukan select — support keyboard mobile numpad (`inputmode="numeric"`) |

---

## 9. Traceability Matrix: User Story → Screen

| User Story | Screen(s)                                        |
| ---------- | ------------------------------------------------ |
| US-1       | S-04, S-05, S-06                                 |
| US-2       | S-09, S-08                                       |
| US-3       | S-03, S-07, S-08                                 |
| US-4       | S-08 (dialog batalkan)                           |
| US-5       | S-10                                             |
| US-6       | S-10                                             |
| US-7       | S-10                                             |
| US-8       | S-10                                             |
| US-9       | S-11                                             |
| US-10      | S-12                                             |
| US-11      | S-33                                             |
| US-12      | S-34, S-35                                       |
| US-13      | S-36                                             |
| US-14      | S-13, S-10                                       |
| US-15      | S-12 (setelah kirim, terkunci)                   |
| US-16      | S-13                                             |
| US-17      | S-15                                             |
| US-18      | S-15                                             |
| US-19      | S-15                                             |
| US-20      | S-37                                             |
| US-21      | S-38                                             |
| US-22      | S-17                                             |
| US-23      | S-16                                             |
| US-24      | S-03, S-14                                       |
| US-25      | S-14, S-15 (dialog pengingat)                    |
| US-26      | S-18                                             |
| US-27      | S-08 (tab overview, transisi status)             |
| US-28      | S-19                                             |
| US-29      | S-20                                             |
| US-30      | S-32, S-39                                       |
| US-31      | S-20 (dialog wa.me)                              |
| US-32      | S-40                                             |
| US-33      | S-21                                             |
| US-34      | S-32, S-40                                       |
| US-35      | S-40 (kuota habis state)                         |
| US-36      | S-21 (buat addendum)                             |
| US-37      | S-22                                             |
| US-38      | S-41                                             |
| US-39      | S-08 (transisi status + invoice pelunasan aktif) |
| US-40      | S-32, S-42                                       |
| US-41      | S-43                                             |
| US-42      | S-23 (tandai otomatis)                           |
| US-43      | S-23                                             |
| US-44      | S-01, S-02                                       |
| US-45      | S-25                                             |
| US-46      | S-30                                             |
| US-47      | S-31                                             |
| US-48      | S-30 (cookie 30 hari, langsung ke S-32)          |
| US-49      | S-34, S-38 (PIN re-entry)                        |
| US-50      | S-44                                             |
| US-51      | S-25 (reset PIN)                                 |
| US-52      | S-46, S-25 (log)                                 |
| US-53      | S-25 (cabut tautan)                              |
| US-54      | S-26, S-08 tab Log                               |
| US-55      | S-45                                             |
| US-56      | S-35, konfirmasi umum                            |
| US-57      | S-35, konfirmasi umum                            |
| US-58      | S-03                                             |

**Verifikasi:** Semua 58 user stories terpetakan ke minimal satu screen. Tidak ada screen tanpa user story.

---

## 10. Asumsi

| #        | Asumsi                                                                                                                                            | Lokasi    |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| ASUMSI-1 | Portal client menggunakan bottom navigation di mobile dan sidebar di desktop, karena jumlah menu sedikit dan akses utama dari ponsel via WhatsApp | §3.2      |
| ASUMSI-2 | Breakpoint responsive mengikuti konvensi Tailwind CSS                                                                                             | §7        |
| ASUMSI-3 | Countdown lockout ditampilkan ke klien untuk transparansi UX                                                                                      | S-46      |
| ASUMSI-4 | Cookie sesi expired saat mengisi form → state form disimpan dan dikembalikan setelah re-login                                                     | E-13      |
| ASUMSI-5 | PDF preview di mobile menggunakan inline viewer atau fallback ke download langsung                                                                | §7        |
| ASUMSI-6 | Admin screens baru di Iterasi 2 dan 3 menggunakan pola tab yang sama pada S-08 Detail Proyek, bukan screen terpisah                               | S-19–S-23 |
| ASUMSI-7 | Wireframe Pencil hanya mencakup portal client; admin screens dirancang berdasarkan PRD + architecture spec tanpa wireframe reference              | §2.1      |

---

## 11. Handoff Lists

### 11.1 Component Needs (→ COMPONENTS.md)

| Komponen                                    | Digunakan di                                |
| ------------------------------------------- | ------------------------------------------- |
| Button (Primary, Secondary, Danger, Ghost)  | Semua screen                                |
| Badge (status: draft, sent, approved, dll.) | S-03, S-07, S-08, S-32, S-37                |
| Input Text                                  | Semua form                                  |
| Input PIN (6 digit, masked, numpad)         | S-30, S-31, S-34, S-38, S-44                |
| Textarea                                    | S-10, S-36, S-40, S-43                      |
| Checkbox                                    | S-34                                        |
| File Upload (drag-drop + click)             | S-38, S-43, S-20                            |
| Select / Dropdown                           | S-10 (template), S-09 (klien)               |
| Table (sortable, filterable)                | S-04, S-07, S-14                            |
| Card (ringkasan)                            | S-03, S-32                                  |
| Tab Navigation                              | S-08                                        |
| Sidebar Navigation                          | Admin layout                                |
| Bottom Tab Bar                              | Portal mobile layout                        |
| App Bar                                     | Portal layout                               |
| Modal / Dialog                              | S-12, S-14 (pengingat), S-25 (reset/cabut)  |
| Status Bar (progress)                       | S-08, S-32                                  |
| Timeline                                    | S-39 (Iterasi 2)                            |
| Toast / Notification                        | Konfirmasi aksi                             |
| Empty State                                 | S-03 (baru), S-37 (belum ada invoice), dll. |
| Error State                                 | Semua form                                  |
| Loading Skeleton                            | S-03, S-08                                  |
| PDF Viewer / Preview                        | S-11, S-33                                  |
| Countdown Timer                             | S-46                                        |
| Breadcrumb                                  | Admin: navigasi hierarkis                   |
| Pagination                                  | S-04, S-07, S-14, S-26                      |

### 11.2 Copy Needs (→ COPY.md)

| Screen | Jenis teks yang dibutuhkan                                                       |
| ------ | -------------------------------------------------------------------------------- |
| S-01   | Judul halaman, label input, pesan error (kredensial salah, lockout), placeholder |
| S-03   | Judul dashboard, label kartu ringkasan, empty state greeting                     |
| S-08   | Label tab, label status proyek (9 status), label tombol aksi per status          |
| S-10   | Label field, placeholder, pesan validasi (total termin ≠ harga, item kosong)     |
| S-12   | Teks konfirmasi kirim, template pesan WhatsApp (tautan + info penawaran)         |
| S-30   | Judul, instruksi, pesan error PIN, teks bantuan lupa PIN                         |
| S-31   | Instruksi ganti PIN, aturan PIN, pesan validasi                                  |
| S-32   | Judul kartu per status proyek (9 variasi), label ringkasan                       |
| S-33   | Label section penawaran, header tabel item/termin                                |
| S-34   | Instruksi persetujuan, teks checkbox, teks legalitas kecil                       |
| S-35   | Teks sukses, info langkah berikutnya, teks tombol WhatsApp                       |
| S-36   | Instruksi tolak/perubahan, placeholder textarea                                  |
| S-37   | Header daftar invoice, label status invoice (6 status), format nomor invoice     |
| S-38   | Instruksi upload, label field, pesan error file, teks konfirmasi                 |
| S-40   | Instruksi revisi, pesan kuota habis, label sisa kuota (Iterasi 2)                |
| S-42   | Info garansi: label tanggal, cakupan (Iterasi 3)                                 |
| S-43   | Instruksi klaim, label field (Iterasi 3)                                         |
| S-44   | Label ganti PIN, pesan sukses/error                                              |
| S-46   | Pesan tautan terkunci (sementara vs permanen)                                    |
| S-47   | Pesan tautan dicabut                                                             |
| Global | Template pesan WhatsApp: persetujuan, bukti transfer, revisi, klaim, pengingat   |

### 11.3 Fixture Needs (→ FIXTURES.md)

| Screen | Data yang dibutuhkan                                        | Edge case                                 |
| ------ | ----------------------------------------------------------- | ----------------------------------------- |
| S-03   | 3-5 proyek berbeda status, 2-3 invoice jatuh tempo          | Dashboard kosong (0 proyek)               |
| S-04   | 10 klien (variasi nama pendek/panjang, dengan/tanpa email)  | 1 klien, 50 klien (pagination)            |
| S-07   | 10 proyek (semua 9 status + cancelled)                      | 0 proyek                                  |
| S-08   | 1 proyek lengkap per status                                 | Proyek cancelled                          |
| S-10   | 1 penawaran dengan 5 item + 3 termin                        | 1 item, 10 item; termin 30/40/30          |
| S-32   | 1 proyek per status (9 variasi)                             | Proyek baru (minimal info)                |
| S-33   | 1 penawaran lengkap                                         | Penawaran ditolak, penawaran versi 3      |
| S-37   | 3 invoice: 1 lunas, 1 sebagian, 1 belum bayar + jatuh tempo | 0 invoice, 1 invoice                      |
| S-38   | Bukti transfer gambar (JPG, 2 MB)                           | File PNG 5 MB, file PDF                   |
| S-39   | 5 pembaruan + 3 milestone                                   | 0 pembaruan (Iterasi 2)                   |
| S-40   | Kuota 3, terpakai 2, sisa 1                                 | Kuota 0 (habis)                           |
| S-42   | Garansi aktif (30 hari tersisa)                             | Garansi berakhir                          |
| Global | Nominal: Rp500.000, Rp15.000.000, Rp150.000.000             | Rp1 (minimum), Rp1.000.000.000 (miliaran) |

---

_Langkah berikutnya: **COPY.md** — definisikan semua teks UI, pesan error, template WhatsApp, dan microcopy untuk setiap screen._
