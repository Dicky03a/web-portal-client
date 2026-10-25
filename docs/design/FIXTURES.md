# FIXTURES — Portal Proyek Jasa Website

Source: UX.md, COPY.md | Tanggal acuan: 18 Okt 2026 | Versi: 0.1

---

## 1. Pengguna aktif

| Field      | Nilai             |
| ---------- | ----------------- |
| nama       | Dimas Prasetyo    |
| email      | dimas@example.com |
| role       | admin             |
| whatsapp   | 0812-3456-7890    |
| bank_utama | `bk01` (BCA)      |

---

## 2. Variabel (dari COPY.md)

| Variabel                | Nilai normal                    | Nilai terpanjang                                                                 | Maks |
| ----------------------- | ------------------------------- | -------------------------------------------------------------------------------- | ---- |
| {nama_proyek}           | Website Toko Kue                | Website E-Commerce dan Sistem Manajemen Inventori PT Nusantara Makmur Sejahtera  | 80   |
| {nama_klien}            | Budi Santoso                    | Siti Nurhaliza Putri Maharani Kusuma Dewi Anggraeni Purnama                      | 60   |
| {nama_usaha}            | CV Bali Kreatif                 | PT Nusantara Digital Kreatif Teknologi Indonesia Sejahtera                       | 60   |
| {status_proyek}         | Dalam Pengerjaan                | Penawaran Terkirim                                                               | 24   |
| {nomor_invoice}         | INV-2026-0001                   | INV-2026-9999                                                                    | 16   |
| {jumlah_rupiah}         | Rp 15.000.000                   | Rp 1.000.000.000                                                                 | 20   |
| {tanggal}               | 5 Okt 2026                      | 18 Okt 2026                                                                      | 12   |
| {sisa_percobaan}        | 3                               | 5                                                                                | 1    |
| {durasi_lockout}        | 5                               | 15                                                                               | 2    |
| {versi_dokumen}         | 1                               | 12                                                                               | 2    |
| {label_termin}          | DP 50%                          | Termin Pelunasan — 50%                                                           | 24   |
| {jumlah_item}           | 5                               | 128                                                                              | 3    |
| {total_harga}           | Rp 15.000.000                   | Rp 1.000.000.000                                                                 | 20   |
| {sisa_kuota_revisi}     | 2                               | 99                                                                               | 2    |
| {total_kuota_revisi}    | 3                               | 10                                                                               | 2    |
| {tanggal_jatuh_tempo}   | 25 Okt 2026                     | 25 Okt 2026                                                                      | 12   |
| {hari_terlambat}        | 7                               | 999                                                                              | 3    |
| {tanggal_mulai_garansi} | 15 Agu 2026                     | 15 Agu 2026                                                                      | 12   |
| {tanggal_akhir_garansi} | 15 Nov 2026                     | 15 Nov 2026                                                                      | 12   |
| {sisa_hari_garansi}     | 28                              | 365                                                                              | 3    |
| {durasi_garansi}        | 90 hari                         | 365 hari                                                                         | 10   |
| {nama_bank}             | BCA                             | Bank Tabungan Negara                                                             | 20   |
| {nomor_rekening}        | 8730456218                      | 0012-01-054321-50-8                                                              | 20   |
| {atas_nama}             | Dimas Prasetyo                  | Siti Nurhaliza Putri Maharani Kusuma Dewi Anggraeni Purnama                      | 60   |
| {nomor_whatsapp}        | 08123456789                     | +6281234567890                                                                   | 15   |
| {tautan_portal}         | portal.domain.com/p/abc123      | portal.proyeksaya.com/p/a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6     | 80   |
| {jumlah_proyek_aktif}   | 3                               | 128                                                                              | 3    |
| {total_belum_lunas}     | Rp 25.000.000                   | Rp 1.000.000.000                                                                 | 20   |
| {pemasukan_bulan}       | Rp 10.000.000                   | Rp 1.000.000.000                                                                 | 20   |
| {ukuran_maks_file}      | 5                               | 50                                                                               | 2    |
| {nomor_dokumen}         | QUO-2026-0001                   | QUO-2026-0001-REV-2                                                              | 20   |
| {alasan}                | Klien meminta perubahan         | Klien memutuskan untuk menunda proyek karena restrukturisasi internal perusahaan | 80   |
| {catatan}               | Mohon revisi warna header       | Mohon revisi bagian header dan footer sesuai diskusi terakhir melalui WhatsApp   | 80   |
| {item}                  | Termin DP 50%                   | Integrasi Payment Gateway Midtrans dan Notifikasi Otomatis                       | 60   |
| {jumlah_termin}         | Rp 15.000.000                   | Rp 1.000.000.000                                                                 | 20   |
| {pin_awal}              | 482916                          | 827364                                                                           | 6    |
| {selisih}               | Rp 500.000                      | Rp 1.000.000.000                                                                 | 20   |
| {skema_termin}          | 2 termin: DP 50%, Pelunasan 50% | 3 termin: Down Payment 30%, Progres Pengerjaan 40%, Pelunasan Akhir 30%          | 80   |

---

## 3. Entitas

### Entitas Klien

| id  | nama                                                        | nama_usaha                   | email                      | telepon        | kota     | Tag                    |
| --- | ----------------------------------------------------------- | ---------------------------- | -------------------------- | -------------- | -------- | ---------------------- |
| c01 | Budi Santoso                                                | PT Mitra Digital Nusantara   | budi.santoso@example.com   | 0813-2000-1001 | Surabaya | normal                 |
| c02 | Siti Nurhaliza Putri Maharani Kusuma Dewi Anggraeni Purnama | CV Harmoni Kreatif Indonesia | siti.nurhaliza@example.com | 0857-3000-2002 | Jakarta  | ekstrem (nama panjang) |
| c03 | Made Wirawan                                                | —                            | made.wirawan@example.com   | 0821-4000-3003 | Denpasar | normal (tanpa usaha)   |
| c04 | Ayu                                                         | Ayu Photography              | ayu@example.com            | 0878-5000-4004 | Malang   | edge (nama satu kata)  |
| c05 | Rizky D'Angelo Pratama                                      | PT Sinar Teknologi Abadi     | rizky.dangelo@example.com  | 0856-6000-5005 | Bandung  | edge (apostrof)        |

### Entitas Proyek

| id  | klien | nama                                                                          | status                | harga         | kuota_revisi | durasi_garansi | tanggal_mulai | Tag                                  |
| --- | ----- | ----------------------------------------------------------------------------- | --------------------- | ------------- | ------------ | -------------- | ------------- | ------------------------------------ |
| p01 | `c01` | Website Company Profile PT Mitra Digital                                      | draft                 | Rp 8.500.000  | 3            | 90 hari        | —             | normal (baru)                        |
| p02 | `c02` | Toko Online Batik Nusantara                                                   | quotation_sent        | Rp 25.000.000 | 3            | 90 hari        | —             | normal                               |
| p03 | `c04` | Landing Page Ayu Photography                                                  | awaiting_down_payment | Rp 3.500.000  | 2            | 60 hari        | —             | normal (murah)                       |
| p04 | `c03` | Website E-Commerce CV Bali Kreatif                                            | in_progress           | Rp 35.000.000 | 3            | 90 hari        | 1 Sep 2026    | normal (aktif)                       |
| p05 | `c05` | Sistem Booking Online Spa & Wellness                                          | client_review         | Rp 18.750.000 | 3            | 90 hari        | 15 Agu 2026   | normal                               |
| p06 | `c05` | Portal Internal PT Sinar Teknologi Abadi                                      | handover_sent         | Rp 45.000.000 | 5            | 90 hari        | 1 Jul 2026    | normal (mahal)                       |
| p07 | `c04` | Website Portofolio Fotografi                                                  | warranty              | Rp 5.000.000  | 2            | 90 hari        | 1 Mei 2026    | normal (garansi)                     |
| p08 | `c02` | Redesign Website CV Harmoni Kreatif                                           | completed             | Rp 12.000.000 | 3            | 90 hari        | 1 Feb 2026    | normal (selesai)                     |
| p09 | `c01` | Aplikasi Inventori Gudang Multi-Cabang dan Sistem Pelaporan Stok Terintegrasi | cancelled             | Rp 50.000.000 | 5            | 90 hari        | —             | ekstrem (nama panjang, mahal, batal) |

### Entitas Penawaran

| id  | proyek | versi | status   | tanggal_buat | tanggal_kirim | tanggal_respon | Tag                 |
| --- | ------ | ----- | -------- | ------------ | ------------- | -------------- | ------------------- |
| q01 | `p01`  | 1     | draft    | 15 Okt 2026  | —             | —              | normal (draf)       |
| q02 | `p02`  | 1     | sent     | 10 Okt 2026  | 12 Okt 2026   | —              | normal (terkirim)   |
| q03 | `p03`  | 1     | accepted | 1 Okt 2026   | 2 Okt 2026    | 3 Okt 2026     | normal (disetujui)  |
| q04 | `p04`  | 2     | accepted | 20 Agu 2026  | 22 Agu 2026   | 25 Agu 2026    | edge (versi revisi) |
| q05 | `p05`  | 1     | accepted | 5 Agu 2026   | 7 Agu 2026    | 10 Agu 2026    | normal              |
| q06 | `p06`  | 1     | accepted | 20 Jun 2026  | 22 Jun 2026   | 25 Jun 2026    | normal              |
| q07 | `p07`  | 1     | accepted | 20 Apr 2026  | 22 Apr 2026   | 25 Apr 2026    | normal              |
| q08 | `p08`  | 1     | accepted | 15 Jan 2026  | 17 Jan 2026   | 20 Jan 2026    | normal              |
| q09 | `p09`  | 1     | rejected | 1 Sep 2026   | 3 Sep 2026    | 10 Sep 2026    | edge (ditolak)      |

### Entitas Item Penawaran

| id   | penawaran | nama                                                                   | harga        | Tag                    |
| ---- | --------- | ---------------------------------------------------------------------- | ------------ | ---------------------- |
| qi01 | `q01`     | Desain UI/UX (5 halaman)                                               | Rp 2.500.000 | normal                 |
| qi02 | `q01`     | Pengembangan Frontend Responsif                                        | Rp 2.000.000 | normal                 |
| qi03 | `q01`     | Integrasi CMS Sederhana                                                | Rp 1.500.000 | normal                 |
| qi04 | `q01`     | Optimasi SEO Dasar                                                     | Rp 750.000   | normal (harga ganjil)  |
| qi05 | `q01`     | Hosting & Domain (1 tahun)                                             | Rp 1.750.000 | normal                 |
| qi06 | `q03`     | Desain Landing Page                                                    | Rp 1.500.000 | normal                 |
| qi07 | `q03`     | Galeri Portofolio Responsif                                            | Rp 1.000.000 | normal                 |
| qi08 | `q03`     | Form Kontak & Integrasi WhatsApp                                       | Rp 1.000.000 | normal                 |
| qi09 | `q04`     | Desain UI/UX (12 halaman)                                              | Rp 6.000.000 | normal                 |
| qi10 | `q04`     | Pengembangan Frontend                                                  | Rp 5.000.000 | normal                 |
| qi11 | `q04`     | Halaman Katalog Produk                                                 | Rp 4.000.000 | normal                 |
| qi12 | `q04`     | Sistem Keranjang & Checkout                                            | Rp 5.500.000 | normal                 |
| qi13 | `q04`     | Integrasi Payment Gateway Midtrans                                     | Rp 3.500.000 | normal                 |
| qi14 | `q04`     | Panel Admin & Manajemen Produk                                         | Rp 6.000.000 | normal                 |
| qi15 | `q04`     | Optimasi SEO & Performa                                                | Rp 2.500.000 | normal                 |
| qi16 | `q04`     | Responsif Mobile & Testing                                             | Rp 2.500.000 | normal                 |
| qi17 | `q05`     | Desain UI/UX (8 halaman)                                               | Rp 3.750.000 | normal                 |
| qi18 | `q05`     | Halaman Layanan & Harga                                                | Rp 2.500.000 | normal                 |
| qi19 | `q05`     | Sistem Booking & Reservasi Online                                      | Rp 5.000.000 | normal                 |
| qi20 | `q05`     | Notifikasi WhatsApp & Email                                            | Rp 3.500.000 | normal                 |
| qi21 | `q05`     | Panel Admin Dashboard Booking                                          | Rp 4.000.000 | normal                 |
| qi22 | `q06`     | Desain UI/UX (15 halaman)                                              | Rp 7.500.000 | normal                 |
| qi23 | `q06`     | Dashboard & Visualisasi Data                                           | Rp 8.000.000 | normal                 |
| qi24 | `q06`     | Manajemen Pengguna & Hak Akses                                         | Rp 6.500.000 | normal                 |
| qi25 | `q06`     | Sistem Laporan & Ekspor Data                                           | Rp 6.000.000 | normal                 |
| qi26 | `q06`     | Integrasi API Internal                                                 | Rp 7.000.000 | normal                 |
| qi27 | `q06`     | Pengujian & Deployment                                                 | Rp 5.000.000 | normal                 |
| qi28 | `q06`     | Pelatihan & Dokumentasi Teknis                                         | Rp 5.000.000 | normal                 |
| qi29 | `q09`     | Desain UI/UX Sistem Inventori Multi-Gudang dan Pelaporan Stok Otomatis | Rp 8.000.000 | ekstrem (nama panjang) |

### Entitas Termin

| id  | penawaran | label         | persen_bps | nominal       | Tag                     |
| --- | --------- | ------------- | ---------- | ------------- | ----------------------- |
| t01 | `q01`     | DP 50%        | 5000       | Rp 4.250.000  | normal                  |
| t02 | `q01`     | Pelunasan 50% | 5000       | Rp 4.250.000  | normal                  |
| t03 | `q02`     | DP 50%        | 5000       | Rp 12.500.000 | normal                  |
| t04 | `q02`     | Pelunasan 50% | 5000       | Rp 12.500.000 | normal                  |
| t05 | `q03`     | DP 50%        | 5000       | Rp 1.750.000  | normal                  |
| t06 | `q03`     | Pelunasan 50% | 5000       | Rp 1.750.000  | normal                  |
| t07 | `q04`     | DP 50%        | 5000       | Rp 17.500.000 | normal                  |
| t08 | `q04`     | Progres 30%   | 3000       | Rp 10.500.000 | normal                  |
| t09 | `q04`     | Pelunasan 20% | 2000       | Rp 7.000.000  | normal                  |
| t10 | `q05`     | DP 50%        | 5000       | Rp 9.375.000  | normal (ganjil)         |
| t11 | `q05`     | Pelunasan 50% | 5000       | Rp 9.375.000  | normal                  |
| t12 | `q06`     | DP 30%        | 3000       | Rp 13.500.000 | normal                  |
| t13 | `q06`     | Progres 40%   | 4000       | Rp 18.000.000 | normal                  |
| t14 | `q06`     | Pelunasan 30% | 3000       | Rp 13.500.000 | normal                  |
| t15 | `q07`     | DP 50%        | 5000       | Rp 2.500.000  | normal                  |
| t16 | `q07`     | Pelunasan 50% | 5000       | Rp 2.500.000  | normal                  |
| t17 | `q08`     | DP 50%        | 5000       | Rp 6.000.000  | normal                  |
| t18 | `q08`     | Pelunasan 50% | 5000       | Rp 6.000.000  | normal                  |
| t19 | `q09`     | DP 50%        | 5000       | Rp 25.000.000 | ekstrem (nominal besar) |
| t20 | `q09`     | Pelunasan 50% | 5000       | Rp 25.000.000 | ekstrem                 |

### Entitas Invoice

| id    | proyek | termin | nomor         | status         | nominal       | tanggal_terbit | jatuh_tempo | Tag                |
| ----- | ------ | ------ | ------------- | -------------- | ------------- | -------------- | ----------- | ------------------ |
| inv01 | `p04`  | `t07`  | INV-2026-0001 | paid           | Rp 17.500.000 | 1 Sep 2026     | 15 Sep 2026 | normal (lunas)     |
| inv02 | `p04`  | `t08`  | INV-2026-0002 | overdue        | Rp 10.500.000 | 1 Okt 2026     | 11 Okt 2026 | edge (jatuh tempo) |
| inv03 | `p05`  | `t10`  | INV-2026-0003 | paid           | Rp 9.375.000  | 15 Agu 2026    | 29 Agu 2026 | normal             |
| inv04 | `p06`  | `t12`  | INV-2026-0004 | paid           | Rp 13.500.000 | 1 Jul 2026     | 15 Jul 2026 | normal             |
| inv05 | `p06`  | `t13`  | INV-2026-0005 | paid           | Rp 18.000.000 | 1 Sep 2026     | 15 Sep 2026 | normal             |
| inv06 | `p06`  | `t14`  | INV-2026-0006 | partially_paid | Rp 13.500.000 | 5 Okt 2026     | 19 Okt 2026 | edge (sebagian)    |
| inv07 | `p07`  | `t15`  | INV-2026-0007 | paid           | Rp 2.500.000  | 1 Mei 2026     | 15 Mei 2026 | normal             |
| inv08 | `p07`  | `t16`  | INV-2026-0008 | paid           | Rp 2.500.000  | 1 Jul 2026     | 15 Jul 2026 | normal             |
| inv09 | `p08`  | `t17`  | INV-2026-0009 | paid           | Rp 6.000.000  | 1 Feb 2026     | 15 Feb 2026 | normal             |
| inv10 | `p08`  | `t18`  | INV-2026-0010 | paid           | Rp 6.000.000  | 15 Apr 2026    | 29 Apr 2026 | normal             |
| inv11 | `p03`  | `t05`  | INV-2026-0011 | sent           | Rp 1.750.000  | 5 Okt 2026     | 19 Okt 2026 | normal (terkirim)  |
| inv12 | `p04`  | `t09`  | INV-2026-0012 | draft          | Rp 7.000.000  | —              | —           | normal (draf)      |
| inv13 | `p09`  | `t19`  | INV-2026-0013 | cancelled      | Rp 25.000.000 | 5 Sep 2026     | 19 Sep 2026 | edge (dibatalkan)  |

### Entitas Pembayaran

| id    | invoice | nominal       | metode   | status   | tanggal     | bukti                                                        | Tag            |
| ----- | ------- | ------------- | -------- | -------- | ----------- | ------------------------------------------------------------ | -------------- |
| pay01 | `inv01` | Rp 17.500.000 | transfer | verified | 12 Sep 2026 | img:bukti-pay01 (3:4) bukti transfer BCA                     | normal         |
| pay02 | `inv03` | Rp 9.375.000  | transfer | verified | 25 Agu 2026 | img:bukti-pay02 (3:4) bukti transfer Mandiri                 | normal         |
| pay03 | `inv04` | Rp 13.500.000 | transfer | verified | 10 Jul 2026 | img:bukti-pay03 (3:4) bukti transfer BCA                     | normal         |
| pay04 | `inv05` | Rp 18.000.000 | transfer | verified | 12 Sep 2026 | img:bukti-pay04 (3:4) bukti transfer BRI                     | normal         |
| pay05 | `inv06` | Rp 7.000.000  | transfer | verified | 10 Okt 2026 | img:bukti-pay05 (3:4) bukti transfer BCA sebagian            | edge (parsial) |
| pay06 | `inv07` | Rp 2.500.000  | transfer | verified | 10 Mei 2026 | img:bukti-pay06 (3:4) bukti transfer Mandiri                 | normal         |
| pay07 | `inv08` | Rp 2.500.000  | transfer | verified | 8 Jul 2026  | img:bukti-pay07 (3:4) bukti transfer BCA                     | normal         |
| pay08 | `inv09` | Rp 6.000.000  | transfer | verified | 10 Feb 2026 | img:bukti-pay08 (3:4) bukti transfer BRI                     | normal         |
| pay09 | `inv10` | Rp 6.000.000  | transfer | verified | 20 Apr 2026 | img:bukti-pay09 (3:4) bukti transfer Mandiri                 | normal         |
| pay10 | `inv11` | Rp 1.750.000  | transfer | pending  | 17 Okt 2026 | img:bukti-pay10 (3:4) bukti transfer BCA menunggu verifikasi | edge (pending) |
| pay11 | `inv02` | Rp 5.000.000  | transfer | rejected | 12 Okt 2026 | img:bukti-pay11 (3:4) bukti blur tidak terbaca               | edge (ditolak) |

### Entitas Rekening Bank

| id   | nama_bank             | nomor_rekening      | atas_nama      | aktif | Tag                    |
| ---- | --------------------- | ------------------- | -------------- | ----- | ---------------------- |
| bk01 | BCA                   | 8730456218          | Dimas Prasetyo | ya    | normal                 |
| bk02 | Bank Rakyat Indonesia | 0012-01-054321-50-8 | Dimas Prasetyo | ya    | normal (nomor panjang) |
| bk03 | Bank Mandiri          | 1570012345678       | Dimas Prasetyo | ya    | normal                 |

### Entitas Tautan Portal

| id   | klien | proyek | token  | status | pin_hash | percobaan_gagal | Tag             |
| ---- | ----- | ------ | ------ | ------ | -------- | --------------- | --------------- |
| pl01 | `c01` | `p01`  | a1b2c3 | active | •••••••  | 0               | normal          |
| pl02 | `c02` | `p02`  | d4e5f6 | active | •••••••  | 0               | normal          |
| pl03 | `c03` | `p04`  | g7h8i9 | active | •••••••  | 0               | normal          |
| pl04 | `c04` | `p03`  | j0k1l2 | active | •••••••  | 0               | normal          |
| pl05 | `c05` | `p05`  | m3n4o5 | active | •••••••  | 0               | normal          |
| pl06 | `c05` | `p06`  | p6q7r8 | locked | •••••••  | 5               | edge (terkunci) |

### Entitas Milestone (Iterasi 2)

| id   | proyek | nama                        | status      | target      | Tag    |
| ---- | ------ | --------------------------- | ----------- | ----------- | ------ |
| ms01 | `p04`  | Desain UI/UX                | completed   | 15 Sep 2026 | normal |
| ms02 | `p04`  | Development Frontend        | in_progress | 20 Okt 2026 | normal |
| ms03 | `p04`  | Integrasi Backend & Testing | pending     | 10 Nov 2026 | normal |

### Entitas Pembaruan Progres (Iterasi 2)

| id    | proyek | isi                                                                                   | tanggal     | lampiran                                         | Tag    |
| ----- | ------ | ------------------------------------------------------------------------------------- | ----------- | ------------------------------------------------ | ------ |
| upd01 | `p04`  | Wireframe 12 halaman selesai, mulai desain visual sesuai brand guideline klien.       | 5 Sep 2026  | —                                                | normal |
| upd02 | `p04`  | Desain UI halaman beranda dan katalog disetujui klien. Revisi minor pada warna aksen. | 15 Sep 2026 | img:desain-preview (16:9) preview desain beranda | normal |
| upd03 | `p04`  | Slicing halaman beranda, katalog, dan detail produk selesai. Responsif mobile OK.     | 1 Okt 2026  | —                                                | normal |
| upd04 | `p04`  | Integrasi API produk dan keranjang belanja. Checkout flow sudah berjalan di staging.  | 10 Okt 2026 | —                                                | normal |
| upd05 | `p04`  | Sistem keranjang & checkout selesai. Mulai integrasi payment gateway Midtrans.        | 17 Okt 2026 | —                                                | normal |

### Entitas Permintaan Revisi (Iterasi 2)

| id    | proyek | deskripsi                                                                    | status   | tanggal     | Tag    |
| ----- | ------ | ---------------------------------------------------------------------------- | -------- | ----------- | ------ |
| rev01 | `p05`  | Warna header kurang cocok dengan brand, minta diganti ke biru tua (#1a365d). | open     | 16 Okt 2026 | normal |
| rev02 | `p05`  | Tombol CTA di halaman beranda kurang menonjol, minta ukuran lebih besar.     | resolved | 14 Okt 2026 | normal |

### Entitas Klaim Garansi (Iterasi 3)

| id   | proyek | deskripsi                                                                    | status   | tanggal     | Tag    |
| ---- | ------ | ---------------------------------------------------------------------------- | -------- | ----------- | ------ |
| wc01 | `p07`  | Gambar di halaman galeri tidak muncul saat dibuka di Safari versi terbaru.   | open     | 15 Okt 2026 | normal |
| wc02 | `p07`  | Form kontak menampilkan error 500 saat submit dengan lampiran gambar > 3 MB. | resolved | 5 Okt 2026  | normal |

---

## 5. Fixture per layar

### S-01 Login Admin

| Skenario | Data | Jumlah | Catatan                                                |
| -------- | ---- | ------ | ------------------------------------------------------ |
| normal   | —    | —      | Email + password + kode TOTP                           |
| ekstrem  | —    | —      | 5× gagal login → lockout 15 menit; pesan error generik |

### S-02 Setup 2FA

| Skenario | Data | Jumlah | Catatan                              |
| -------- | ---- | ------ | ------------------------------------ |
| normal   | —    | —      | QR code TOTP + 8 recovery codes      |
| ekstrem  | —    | —      | Recovery codes sudah digunakan semua |

### S-03 Dashboard

| Skenario | Data                                                  | Jumlah               | Catatan                                           |
| -------- | ----------------------------------------------------- | -------------------- | ------------------------------------------------- |
| normal   | `p03`, `p04`, `p05`, `p06`; `inv02`, `inv06`, `inv11` | 4 proyek, 3 invoice  | 4 proyek aktif, 2 invoice menunggu, 1 jatuh tempo |
| kosong   | —                                                     | 0                    | Admin baru, belum ada proyek                      |
| ekstrem  | `p01`..`p09`; `inv01`..`inv13`                        | 9 proyek, 13 invoice | Semua proyek dan invoice tampil                   |

### S-04 Daftar Klien

| Skenario | Data                         | Jumlah | Catatan                                         |
| -------- | ---------------------------- | ------ | ----------------------------------------------- |
| normal   | `c01`..`c05`                 | 5      | Variasi nama pendek/panjang, dengan/tanpa usaha |
| kosong   | —                            | 0      | Belum ada klien                                 |
| satu     | `c04`                        | 1      | Satu klien, nama satu kata                      |
| ekstrem  | `c01`..`c05` + 45 klien lain | 50     | Pagination aktif, 10 per halaman                |

### S-05 Form Klien

| Skenario | Data  | Jumlah | Catatan                                    |
| -------- | ----- | ------ | ------------------------------------------ |
| normal   | `c01` | —      | Edit klien existing                        |
| ekstrem  | `c02` | —      | Nama 59 karakter, semua field terisi penuh |

### S-06 Detail Klien

| Skenario | Data                 | Jumlah   | Catatan                                  |
| -------- | -------------------- | -------- | ---------------------------------------- |
| normal   | `c01` + `p01`, `p09` | 2 proyek | Klien dengan 2 proyek (1 aktif, 1 batal) |
| kosong   | `c04` tanpa proyek   | 0 proyek | Klien baru belum ada proyek              |
| ekstrem  | `c05` + `p05`, `p06` | 2 proyek | Klien dengan 2 proyek aktif bersamaan    |

### S-07 Daftar Proyek

| Skenario | Data                          | Jumlah | Catatan                                               |
| -------- | ----------------------------- | ------ | ----------------------------------------------------- |
| normal   | `p01`..`p09`                  | 9      | Semua 9 status tampil, filter aktif                   |
| kosong   | —                             | 0      | Belum ada proyek                                      |
| ekstrem  | `p01`..`p09` + 41 proyek lain | 50     | Pagination, 10 per halaman, filter "Dalam Pengerjaan" |

### S-08 Detail Proyek

| Skenario | Data                                                                          | Jumlah | Catatan                                                  |
| -------- | ----------------------------------------------------------------------------- | ------ | -------------------------------------------------------- |
| normal   | `p04` + `q04` + `inv01`, `inv02`, `inv12` + `ms01`..`ms03` + `upd01`..`upd05` | —      | Proyek in_progress, tab overview/dokumen/tagihan/progres |
| satu     | `p01` + `q01`                                                                 | —      | Proyek draft, hanya tab overview + dokumen draf          |
| ekstrem  | `p09`                                                                         | —      | Proyek cancelled, nama panjang, data minimal             |

### S-09 Form Proyek

| Skenario | Data         | Jumlah | Catatan                                     |
| -------- | ------------ | ------ | ------------------------------------------- |
| normal   | `c01`, `p01` | —      | Buat proyek baru, pilih klien existing      |
| ekstrem  | `c02`, `p09` | —      | Klien nama panjang, nama proyek 79 karakter |

### S-10 Form Penawaran

| Skenario | Data                                | Jumlah           | Catatan                                |
| -------- | ----------------------------------- | ---------------- | -------------------------------------- |
| normal   | `q01`: `qi01`..`qi05`, `t01`..`t02` | 5 item, 2 termin | Penawaran draf, DP 50% + Pelunasan 50% |
| satu     | `q03`: `qi06`, `t05`..`t06`         | 1 item, 2 termin | Satu item saja                         |
| ekstrem  | `q04`: `qi09`..`qi16`, `t07`..`t09` | 8 item, 3 termin | Banyak item, termin 50/30/20           |

### S-11 Pratinjau Penawaran

| Skenario | Data                         | Jumlah | Catatan                                       |
| -------- | ---------------------------- | ------ | --------------------------------------------- |
| normal   | `q01` + items + terms        | —      | Preview PDF penawaran draf                    |
| ekstrem  | `q04` v2 + 8 items + 3 terms | —      | Versi revisi, banyak item, format PDF panjang |

### S-12 Dialog Kirim Penawaran

| Skenario | Data                | Jumlah | Catatan                                          |
| -------- | ------------------- | ------ | ------------------------------------------------ |
| normal   | `q01`, `c01`, `p01` | —      | Modal konfirmasi + template WhatsApp + PIN awal  |
| ekstrem  | `q04`, `c03`, `p04` | —      | Pengiriman ulang (versi 2), PIN baru di-generate |

### S-13 Riwayat Versi Dokumen

| Skenario | Data               | Jumlah  | Catatan                                                   |
| -------- | ------------------ | ------- | --------------------------------------------------------- |
| normal   | `q04` v1, `q04` v2 | 2 versi | Penawaran dengan revisi, jejak persetujuan                |
| satu     | `q01` v1           | 1 versi | Satu versi draf                                           |
| ekstrem  | —                  | 5 versi | Dokumen dengan 5 revisi (128 total catatan, tampilkan 12) |

### S-14 Daftar Invoice

| Skenario | Data                               | Jumlah | Catatan                                             |
| -------- | ---------------------------------- | ------ | --------------------------------------------------- |
| normal   | `inv01`..`inv06`                   | 6      | Campuran status: lunas, jatuh tempo, sebagian, draf |
| kosong   | —                                  | 0      | Proyek belum ada invoice                            |
| ekstrem  | `inv01`..`inv13` + 37 invoice lain | 50     | Pagination, filter "Jatuh Tempo"                    |

### S-15 Detail Invoice

| Skenario | Data              | Jumlah       | Catatan                                                    |
| -------- | ----------------- | ------------ | ---------------------------------------------------------- |
| normal   | `inv01` + `pay01` | 1 pembayaran | Invoice lunas, 1 bukti terverifikasi                       |
| satu     | `inv11` + `pay10` | 1 pembayaran | Invoice terkirim, bukti pending verifikasi                 |
| ekstrem  | `inv06` + `pay05` | 1 pembayaran | Invoice sebagian bayar (Rp 7jt dari 13.5jt), sisa Rp 6.5jt |

### S-16 Form Pembayaran Manual

| Skenario | Data            | Jumlah | Catatan                                                   |
| -------- | --------------- | ------ | --------------------------------------------------------- |
| normal   | `inv02`, `bk01` | —      | Catat pembayaran manual untuk invoice jatuh tempo         |
| ekstrem  | `inv06`, `bk02` | —      | Pembayaran parsial, nominal besar, nomor rekening panjang |

### S-17 Verifikasi Pembayaran

| Skenario | Data              | Jumlah | Catatan                              |
| -------- | ----------------- | ------ | ------------------------------------ |
| normal   | `pay10` + `inv11` | —      | Bukti transfer pending, gambar jelas |
| ekstrem  | `pay11` + `inv02` | —      | Bukti blur ditolak, alasan penolakan |

### S-18 Rekap Pemasukan

| Skenario | Data             | Jumlah       | Catatan                                      |
| -------- | ---------------- | ------------ | -------------------------------------------- |
| normal   | `pay01`..`pay09` | 9 pembayaran | Rekap Okt 2026: beberapa pembayaran verified |
| kosong   | —                | 0            | Bulan tanpa pemasukan                        |
| ekstrem  | 50 pembayaran    | 50           | Bulan sibuk, total Rp 150.000.000            |

### S-19 Form Milestone (Iterasi 2)

| Skenario | Data                  | Jumlah      | Catatan                             |
| -------- | --------------------- | ----------- | ----------------------------------- |
| normal   | `p04`, `ms01`..`ms03` | 3 milestone | Milestone: selesai, sedang, pending |
| satu     | `p03`, 1 milestone    | 1           | Proyek kecil, satu milestone saja   |
| ekstrem  | `p06`, 8 milestone    | 8           | Proyek besar, banyak milestone      |

### S-20 Form Pembaruan Progres (Iterasi 2)

| Skenario | Data           | Jumlah | Catatan                                   |
| -------- | -------------- | ------ | ----------------------------------------- |
| normal   | `p04`, `upd05` | —      | Tulis pembaruan baru + lampiran gambar    |
| ekstrem  | `p04`          | —      | Teks panjang 3 paragraf + 3 lampiran file |

### S-21 Klasifikasi Revisi (Iterasi 2)

| Skenario | Data    | Jumlah | Catatan                                                  |
| -------- | ------- | ------ | -------------------------------------------------------- |
| normal   | `rev01` | —      | Revisi masuk, klasifikasikan sebagai revisi minor        |
| ekstrem  | `rev01` | —      | Klasifikasikan sebagai perubahan lingkup (di luar kuota) |

### S-22 Form BAST (Iterasi 2)

| Skenario | Data  | Jumlah | Catatan                                          |
| -------- | ----- | ------ | ------------------------------------------------ |
| normal   | `p06` | —      | Buat BAST untuk proyek handover_sent             |
| ekstrem  | `p06` | —      | BAST dengan daftar deliverable panjang (10 item) |

### S-23 Kelola Klaim Garansi (Iterasi 3)

| Skenario | Data           | Jumlah  | Catatan                       |
| -------- | -------------- | ------- | ----------------------------- |
| normal   | `wc01`, `wc02` | 2 klaim | 1 open, 1 resolved            |
| kosong   | —              | 0       | Belum ada klaim garansi       |
| ekstrem  | 10 klaim       | 10      | Banyak klaim, campuran status |

### S-24 Pengaturan

| Skenario | Data                         | Jumlah     | Catatan                            |
| -------- | ---------------------------- | ---------- | ---------------------------------- |
| normal   | Profil admin, `bk01`..`bk03` | 3 rekening | Profil lengkap, 3 rekening bank    |
| ekstrem  | Profil admin + 5 rekening    | 5          | Banyak rekening bank, nama panjang |

### S-25 Kelola Tautan Portal

| Skenario | Data           | Jumlah   | Catatan                                |
| -------- | -------------- | -------- | -------------------------------------- |
| normal   | `pl01`..`pl06` | 6 tautan | Campuran active dan locked             |
| kosong   | —              | 0        | Belum ada tautan portal                |
| ekstrem  | 20 tautan      | 20       | Banyak tautan, beberapa locked/revoked |

### S-26 Log Aktivitas

| Skenario | Data                         | Jumlah    | Catatan                                                  |
| -------- | ---------------------------- | --------- | -------------------------------------------------------- |
| normal   | 10 entri log                 | 10        | Campuran: buat proyek, kirim penawaran, verifikasi bayar |
| kosong   | —                            | 0         | Belum ada aktivitas                                      |
| ekstrem  | 128 entri log (tampilkan 12) | 128 total | Pagination, filter tanggal                               |

### S-30 Masukkan PIN

| Skenario | Data   | Jumlah | Catatan                                            |
| -------- | ------ | ------ | -------------------------------------------------- |
| normal   | `pl03` | —      | Klien masukkan PIN 6 digit                         |
| ekstrem  | `pl06` | —      | 4× salah PIN, sisa 1 percobaan; lockout setelah 5× |

### S-31 Buat PIN Baru

| Skenario | Data                  | Jumlah | Catatan                                 |
| -------- | --------------------- | ------ | --------------------------------------- |
| normal   | `pl01` (pertama kali) | —      | Wajib ganti PIN awal, input PIN baru 2× |
| ekstrem  | —                     | —      | PIN baru sama dengan PIN lama (ditolak) |

### S-32 Ringkasan Proyek

| Skenario | Data                                      | Jumlah | Catatan                                    |
| -------- | ----------------------------------------- | ------ | ------------------------------------------ |
| normal   | `p04` + `inv01`, `inv02` + `ms01`..`ms03` | —      | Proyek in_progress, 2 invoice, 3 milestone |
| satu     | `p01`                                     | —      | Proyek draft, info minimal                 |
| ekstrem  | `p09`                                     | —      | Proyek cancelled, nama panjang 79 karakter |

### S-33 Detail Penawaran

| Skenario | Data                                   | Jumlah           | Catatan                               |
| -------- | -------------------------------------- | ---------------- | ------------------------------------- |
| normal   | `q05`: `qi17`..`qi21`, `t10`..`t11`    | 5 item, 2 termin | Penawaran disetujui, tampilan lengkap |
| satu     | `q03`: `qi06`, `t05`..`t06`            | 1 item, 2 termin | Penawaran sederhana                   |
| ekstrem  | `q04` v2: `qi09`..`qi16`, `t07`..`t09` | 8 item, 3 termin | Versi 2, item terbanyak               |

### S-34 Setujui Penawaran

| Skenario | Data                | Jumlah | Catatan                                    |
| -------- | ------------------- | ------ | ------------------------------------------ |
| normal   | `q02`, `c02`, `p02` | —      | Form: nama, centang persetujuan, input PIN |
| ekstrem  | `q04` v2, `c03`     | —      | Penawaran revisi, konfirmasi ulang         |

### S-35 Penawaran Disetujui

| Skenario | Data         | Jumlah | Catatan                                                |
| -------- | ------------ | ------ | ------------------------------------------------------ |
| normal   | `q05`, `p05` | —      | Sukses, tampilkan langkah berikutnya + tombol WhatsApp |
| ekstrem  | `q04`, `p04` | —      | Nama proyek panjang di pesan sukses                    |

### S-36 Tolak / Minta Perubahan

| Skenario | Data         | Jumlah | Catatan                                 |
| -------- | ------------ | ------ | --------------------------------------- |
| normal   | `q02`, `p02` | —      | Textarea alasan, kirim catatan ke admin |
| ekstrem  | `q09`, `p09` | —      | Alasan panjang 80 karakter              |

### S-37 Daftar Invoice Portal

| Skenario | Data                      | Jumlah | Catatan                                  |
| -------- | ------------------------- | ------ | ---------------------------------------- |
| normal   | `inv01`, `inv02`, `inv06` | 3      | 1 lunas, 1 jatuh tempo, 1 sebagian bayar |
| kosong   | —                         | 0      | Belum ada invoice                        |
| satu     | `inv11`                   | 1      | Satu invoice terkirim                    |
| ekstrem  | 12 invoice                | 12     | Banyak invoice, scroll, campuran status  |

### S-38 Unggah Bukti Transfer

| Skenario | Data            | Jumlah | Catatan                                            |
| -------- | --------------- | ------ | -------------------------------------------------- |
| normal   | `inv11`, `bk01` | —      | Upload JPG 2 MB, pilih rekening tujuan             |
| ekstrem  | `inv06`, `bk02` | —      | File PNG 5 MB (batas maks), nomor rekening panjang |

### S-39 Linimasa Progres (Iterasi 2)

| Skenario | Data                             | Jumlah                | Catatan                         |
| -------- | -------------------------------- | --------------------- | ------------------------------- |
| normal   | `upd01`..`upd05`, `ms01`..`ms03` | 5 update, 3 milestone | Timeline kronologis             |
| kosong   | —                                | 0                     | Proyek baru belum ada pembaruan |
| ekstrem  | 20 update, 8 milestone           | 28 total              | Proyek lama, scroll panjang     |

### S-40 Ajukan Revisi (Iterasi 2)

| Skenario | Data                                                  | Jumlah | Catatan                                                |
| -------- | ----------------------------------------------------- | ------ | ------------------------------------------------------ |
| normal   | `p05`, kuota 3, terpakai 2 (`rev01`, `rev02`), sisa 1 | —      | Sisa 1 kuota revisi                                    |
| ekstrem  | `p05`, kuota 3, terpakai 3, sisa 0                    | —      | Kuota habis, form disabled, pesan "kuota revisi habis" |

### S-41 Setujui BAST (Iterasi 2)

| Skenario | Data  | Jumlah | Catatan                                           |
| -------- | ----- | ------ | ------------------------------------------------- |
| normal   | `p06` | —      | Form persetujuan BAST: centang, PIN, tanda tangan |
| ekstrem  | `p06` | —      | Nama proyek panjang, daftar deliverable 10 item   |

### S-42 Info Garansi (Iterasi 3)

| Skenario | Data                                                  | Jumlah  | Catatan                                     |
| -------- | ----------------------------------------------------- | ------- | ------------------------------------------- |
| normal   | `p07`, garansi aktif, 28 hari tersisa, `wc01`, `wc02` | 2 klaim | Garansi berjalan                            |
| ekstrem  | `p07`, garansi berakhir (0 hari tersisa)              | —       | Garansi habis, tidak bisa ajukan klaim baru |

### S-43 Ajukan Klaim Garansi (Iterasi 3)

| Skenario | Data  | Jumlah | Catatan                                                      |
| -------- | ----- | ------ | ------------------------------------------------------------ |
| normal   | `p07` | —      | Form: deskripsi bug + upload tangkapan layar                 |
| ekstrem  | `p07` | —      | Deskripsi panjang 3 paragraf + 3 gambar (masing-masing 5 MB) |

### S-44 Ganti PIN

| Skenario | Data | Jumlah | Catatan                              |
| -------- | ---- | ------ | ------------------------------------ |
| normal   | —    | —      | Input PIN lama + PIN baru 2×         |
| ekstrem  | —    | —      | PIN lama salah 3×, lockout sementara |

### S-45 Unduh Dokumen

| Skenario | Data                                         | Jumlah    | Catatan                          |
| -------- | -------------------------------------------- | --------- | -------------------------------- |
| normal   | `q05` (penawaran PDF), `inv03` (invoice PDF) | 2 dokumen | Daftar dokumen yang bisa diunduh |
| kosong   | —                                            | 0         | Belum ada dokumen                |
| ekstrem  | 8 dokumen (3 penawaran, 4 invoice, 1 BAST)   | 8         | Banyak dokumen, scroll           |

### S-46 Tautan Terkunci

| Skenario | Data   | Jumlah | Catatan                                       |
| -------- | ------ | ------ | --------------------------------------------- |
| normal   | `pl06` | —      | Terkunci sementara, durasi lockout 15 menit   |
| ekstrem  | `pl06` | —      | Terkunci permanen, hubungi admin via WhatsApp |

### S-47 Tautan Dicabut

| Skenario | Data  | Jumlah | Catatan                                   |
| -------- | ----- | ------ | ----------------------------------------- |
| normal   | —     | —      | Pesan tautan tidak berlaku + kontak admin |
| ekstrem  | `p09` | —      | Proyek cancelled, nama panjang di pesan   |

---

## 6. Handoff

### Untuk DESIGN.md

- **Teks terpanjang:** nama proyek 79 karakter (`p09`); nama klien 59 karakter (`c02`); nama usaha 58 karakter; alasan/catatan 80 karakter
- **Angka terbesar:** Rp 50.000.000 (harga proyek); Rp 25.000.000 (nominal termin); Rp 1.000.000.000 (uji ekstrem variabel)
- **Angka ganjil:** Rp 9.375.000, Rp 750.000 — pastikan format ribuan konsisten
- **Rasio gambar:** bukti transfer 3:4 (potret); lampiran progres 16:9 (landscape)
- **Tanggal rentang:** Feb 2026 – Nov 2026 (10 bulan data)
- **Status badge terpanjang:** "Penawaran Terkirim" (18 karakter), "Menunggu Verifikasi" (19 karakter)

### Untuk COMPONENTS.md

- **Kartu proyek:** uji dengan `p09` (nama 79 karakter, status cancelled) dan `p03` (nama pendek, harga kecil)
- **Baris invoice:** uji dengan `inv06` (partially_paid, nominal Rp 13.500.000) dan `inv11` (sent, Rp 1.750.000)
- **Badge status:** 9 status proyek + 6 status invoice + 3 status pembayaran — uji semua panjang teks
- **Daftar klien:** uji dengan `c02` (nama 59 karakter) dan `c04` (nama 3 karakter "Ayu")
- **Tabel item penawaran:** uji dengan `q04` (8 item) dan `q03` (1 item — tampilan satu baris)
- **Form upload:** uji dengan file 5 MB (batas maks) dan file nama panjang
- **Timeline progres:** uji dengan `upd01`..`upd05` (5 entri, campuran dengan/tanpa lampiran)
- **Rekening bank:** uji dengan `bk02` (nama bank 21 karakter, nomor 19 karakter)

---

## 7. Asumsi

- ASUMSI: Tanggal acuan 18 Okt 2026. Semua tanggal absolut relatif terhadap tanggal ini.
- ASUMSI: Admin adalah pengguna tunggal (freelancer), sehingga pengguna aktif hanya satu.
- ASUMSI: Setiap klien memiliki maksimal 2-3 proyek untuk skala freelancer.
- ASUMSI: Semua harga sudah termasuk pajak (tidak ada komponen PPN terpisah) sesuai asumsi COPY.md.
- ASUMSI: Metode pembayaran hanya transfer bank — tidak ada e-wallet, kartu kredit, atau tunai.
- ASUMSI: Durasi garansi standar 90 hari (3 bulan), kecuali proyek kecil 60 hari.
- ASUMSI: Kuota revisi default 3, proyek besar bisa sampai 5.
- ASUMSI: Format invoice INV-YYYY-NNNN (4 digit sequential) sudah cukup untuk skala freelancer.
- ASUMSI: Entitas Iterasi 2 (milestone, pembaruan, revisi) dan Iterasi 3 (klaim garansi) disertakan untuk kelengkapan fixture layar portal, meskipun belum diimplementasi di MVP.
- ASUMSI: Setiap proyek memiliki tepat satu penawaran aktif (versi terbaru). Versi lama tersimpan di riwayat.
- ASUMSI: `{status_proyek}` terpanjang "Penawaran Terkirim" (18 karakter) di bawah 80% Maks (24) karena semua label status sudah final dan tidak ada yang lebih panjang.
