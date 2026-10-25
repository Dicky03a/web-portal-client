# PRD — Portal Proyek Jasa Website

Oct 16, 2026 · @Dicky Adi Saputra

## Status dan Asumsi

PRD ini menutup fase **Analisis** SDLC dan menjadi masukan fase **Desain** (ERD, wireframe, arsitektur). Isinya disintesis dari dokumen analisis masalah P1–P6; belum ada codebase maupun issue tracker, jadi dokumen ini menjadi sumber kebenaran sementara.

Flowchart swimlane sistem usulan (ringkasan end-to-end + 5 proses) ada di [papan FigJam Portal Proyek](https://www.figma.com/board/dCR3xUrw1hIZHo6yevidA8).

Asumsi yang dipakai sampai dikonfirmasi:

- **A1.** Pengguna sistem hanya dua peran: penyedia jasa (admin tunggal) dan klien. Tidak ada tim atau multi-tenant.
- **A2.** Klien tidak membuat akun. Klien mengakses portal lewat tautan unik per proyek yang dikirim melalui WhatsApp, dilindungi PIN yang akhirnya dibuat klien sendiri, sesuai batasan "komunikasi utama tetap WhatsApp".
- **A3.** Stack: ( Tack Stack nya telah di rubah ke Next.Js )l 13 monolit + PostgreSQL 18, antarmuka Inertia + React (TypeScript). Diputuskan 16 Okt 2026 setelah membandingkan tiga opsi terhadap kebutuhan sistem, bukan terhadap kebiasaan; rinciannya di bagian Stack teknologi.
- **A4.** Uang disimpan dalam rupiah bulat (integer), tanpa desimal dan tanpa multi-mata uang.
- **A5.** Masa garansi dimulai saat BAST disetujui klien, bukan saat pelunasan.
- **A6.** Tabel baseline (bagian 6 dokumen analisis) belum terisi. Target perbaikan di bawah ditulis relatif terhadap baseline itu, bukan angka mutlak.

## Problem Statement

Sebagai penyedia jasa pembuatan website, saya mengelola seluruh siklus proyek (kesepakatan, uang muka, pengerjaan, revisi, serah terima, pelunasan, garansi) secara manual lewat Canva dan WhatsApp. Akibatnya administrasi lambat, bukti kesepakatan tidak terjamin, status proyek dan pembayaran sulit dilacak, dan pekerjaan di luar kesepakatan sering tidak tertagih.

Dari sisi klien, mereka harus bertanya untuk tahu progres, tidak punya satu tempat untuk melihat biaya dan tagihan, dan tidak tahu pasti hak revisi maupun garansinya.

| Kode | Masalah                                                   | Dampak utama                                      |
| ---- | --------------------------------------------------------- | ------------------------------------------------- |
| P1   | Invoice dibuat manual di Canva, tidak terhubung ke proyek | Salah hitung, nomor ganda, rekap sulit            |
| P2   | Persetujuan Penawaran/SPK dan BAST lewat tukar file       | Tidak ada versi resmi dan bukti persetujuan       |
| P3   | Progres dikirim lewat chat                                | Klien bertanya berulang, kesan kurang profesional |
| P4   | Status pembayaran hanya di chat dan mutasi rekening       | Lupa menagih, arus kas tidak terpantau            |
| P5   | Batas revisi tidak tertulis                               | Scope creep, rawan sengketa                       |
| P6   | Masa dan cakupan garansi tidak jelas                      | Klaim tanpa batas atau klien tidak tahu haknya    |

Akar masalahnya tiga: tidak ada single source of truth, aturan bisnis tidak tertulis, dan persetujuan tidak punya jejak yang bisa diverifikasi.

## Solution

Sebuah portal web yang menjadi satu tempat untuk seluruh siklus proyek: penyedia jasa mengelola dari dasbor admin, klien melihat dan menyetujui dari tautan portal yang dikirim lewat WhatsApp.

**Dari sisi penyedia jasa:**

- Membuat Penawaran dari template dengan item, harga, skema termin, kuota revisi, dan masa garansi; sistem menghitung total, uang muka, dan sisa tagihan otomatis.
- Mengirim tautan Penawaran ke klien lewat WhatsApp (tombol "salin pesan" atau tautan wa.me berisi teks siap kirim).
- Setelah Penawaran disetujui, proyek berjalan: termin dan invoice terbentuk dengan nomor unik, progres dicatat sebagai pembaruan bertanggal, revisi dicatat terhadap kuota.
- Mencatat pembayaran (nominal, tanggal, bukti transfer) dan melihat daftar tagihan jatuh tempo.
- Menerbitkan BAST; begitu disetujui, garansi berjalan dengan tanggal mulai dan berakhir yang jelas.

**Dari sisi klien (tanpa akun):**

- Membuka tautan portal, memasukkan PIN, lalu melihat ringkasan proyek: status, progres terbaru, tagihan, sisa kuota revisi, dan sisa masa garansi.
- Menyetujui Penawaran dan BAST dengan memasukkan ulang PIN, dan tindakan itu tercatat (siapa, versi mana, kapan).
- Mengunggah bukti transfer dan mengajukan revisi atau klaim garansi lewat portal.
- Mengunduh PDF dokumen resmi yang sama persis dengan versi yang disetujui.

Pembayaran tetap lewat transfer bank di luar sistem; sistem hanya mencatat dan melacaknya.

## User Stories

Setiap story diberi kode masalah yang diselesaikannya. "Penyedia" = penyedia jasa (admin), "Klien" = pemilik proyek.

**Klien dan proyek**

1. Sebagai penyedia, saya ingin menyimpan data klien (nama, usaha, nomor WhatsApp, email opsional), agar tidak mengetik ulang di setiap dokumen.
2. Sebagai penyedia, saya ingin membuat proyek yang terikat ke satu klien, agar semua dokumen, tagihan, dan riwayat terkumpul di satu tempat.
3. Sebagai penyedia, saya ingin melihat daftar proyek beserta statusnya di dasbor, agar saya tahu posisi terakhir setiap proyek tanpa membuka chat. (P3)
4. Sebagai penyedia, saya ingin membatalkan proyek dengan alasan tercatat, agar riwayat tetap utuh tanpa menghapus data.

**Penawaran / SPK (P2, P5, P6)**

5. Sebagai penyedia, saya ingin membuat Penawaran dari template berisi lingkup kerja, item, dan harga, agar dokumen cepat dibuat dan formatnya konsisten.
6. Sebagai penyedia, saya ingin menetapkan skema termin (misal DP 50%, pelunasan 50%) dalam persen atau nominal, agar perhitungan uang muka dan sisa tagihan otomatis. (P1)
7. Sebagai penyedia, saya ingin menuliskan kuota revisi dan definisi "revisi" vs "perubahan lingkup" di Penawaran, agar batasnya tertulis dan disepakati. (P5)
8. Sebagai penyedia, saya ingin menuliskan durasi dan cakupan garansi di Penawaran, agar klien tahu haknya sejak awal. (P6)
9. Sebagai penyedia, saya ingin melihat pratinjau PDF Penawaran sebelum dikirim, agar tampilannya rapi seperti buatan Canva.
10. Sebagai penyedia, saya ingin menghasilkan pesan WhatsApp siap kirim berisi tautan portal, agar pengiriman tetap lewat WhatsApp tanpa salin-tempel manual.
11. Sebagai klien, saya ingin membuka Penawaran dari tautan tanpa membuat akun, agar prosesnya semudah membuka chat.
12. Sebagai klien, saya ingin menyetujui Penawaran dengan mengetik nama, mencentang pernyataan setuju, dan memasukkan ulang PIN, agar persetujuan saya sah dan tercatat.
13. Sebagai klien, saya ingin menolak atau meminta perubahan Penawaran dengan catatan, agar negosiasi tidak hilang di chat.
14. Sebagai penyedia, saya ingin merevisi Penawaran yang belum disetujui menjadi versi baru, agar riwayat versi tetap terlihat.
15. Sebagai penyedia, saya ingin Penawaran yang sudah dikirim ke klien terkunci dan tidak bisa diubah, agar yang disetujui klien pasti sama dengan yang ia baca. (P2)
16. Sebagai penyedia, saya ingin melihat jejak persetujuan (nama, waktu, versi, sidik dokumen, alamat IP, perangkat), agar bukti persetujuan bisa ditelusuri saat sengketa. (P2)

**Tagihan dan pembayaran (P1, P4)**

17. Sebagai penyedia, saya ingin invoice terbentuk dari termin proyek secara otomatis, agar tidak membuat invoice satu per satu. (P1)
18. Sebagai penyedia, saya ingin setiap invoice punya nomor unik berurutan per tahun, agar tidak ada nomor ganda. (P1)
19. Sebagai penyedia, saya ingin menetapkan tanggal jatuh tempo per invoice, agar tahu kapan harus menagih. (P4)
20. Sebagai klien, saya ingin melihat invoice, rekening tujuan, dan sisa tagihan di portal, agar jelas berapa dan ke mana membayar.
21. Sebagai klien, saya ingin mengunggah bukti transfer untuk sebuah invoice, agar penyedia tidak perlu mencarinya di chat. (P4)
22. Sebagai penyedia, saya ingin memverifikasi atau menolak bukti transfer, agar status "lunas" hanya berasal dari pembayaran yang saya konfirmasi.
23. Sebagai penyedia, saya ingin mencatat pembayaran manual (tanpa unggahan klien), agar transfer yang dikabarkan lewat chat tetap tercatat.
24. Sebagai penyedia, saya ingin melihat daftar invoice belum lunas dan lewat jatuh tempo, agar tidak ada tagihan terlewat. (P4)
25. Sebagai penyedia, saya ingin pengingat tagihan berupa pesan WhatsApp siap kirim, agar menagih cukup satu klik.
26. Sebagai penyedia, saya ingin rekap pemasukan per bulan, agar arus kas terpantau. (P1, P4)
27. Sebagai penyedia, saya ingin pekerjaan tahap berikutnya hanya bisa dimulai setelah DP terverifikasi, agar tidak bekerja sebelum dibayar.

**Progres (P3)**

28. Sebagai penyedia, saya ingin mendefinisikan milestone proyek, agar progres terukur, bukan sekadar "sedang dikerjakan".
29. Sebagai penyedia, saya ingin menulis pembaruan progres bertanggal dengan lampiran atau tautan staging, agar klien melihat hasil nyata.
30. Sebagai klien, saya ingin melihat linimasa progres di portal, agar tidak perlu bertanya. (P3)
31. Sebagai penyedia, saya ingin pesan WhatsApp siap kirim setiap kali ada pembaruan penting, agar klien tahu ada yang baru tanpa saya menulis ulang.

**Revisi dan perubahan lingkup (P5)**

32. Sebagai klien, saya ingin mengajukan permintaan revisi lewat portal, agar tercatat dan tidak tertimbun chat.
33. Sebagai penyedia, saya ingin mengklasifikasikan setiap permintaan sebagai "revisi" atau "perubahan lingkup", agar fitur baru tidak menghabiskan kuota revisi secara diam-diam.
34. Sebagai klien, saya ingin melihat sisa kuota revisi, agar saya memakainya dengan sadar.
35. Sebagai penyedia, saya ingin sistem menahan revisi saat kuota habis dan menawarkan revisi berbayar, agar pekerjaan tambahan tertagih.
36. Sebagai penyedia, saya ingin perubahan lingkup menghasilkan Penawaran tambahan (addendum) yang perlu disetujui klien, agar pekerjaan di luar kesepakatan punya dasar tagihan.

**Serah terima / BAST (P2)**

37. Sebagai penyedia, saya ingin menerbitkan BAST berisi daftar hasil yang diserahkan, agar serah terima punya dokumen resmi.
38. Sebagai klien, saya ingin menyetujui BAST dengan cara yang sama seperti Penawaran, agar serah terima tercatat.
39. Sebagai penyedia, saya ingin invoice pelunasan menjadi aktif saat BAST disetujui, agar penagihan mengikuti serah terima.

**Garansi (P6)**

40. Sebagai klien, saya ingin melihat tanggal mulai, tanggal akhir, dan cakupan garansi, agar tahu hak saya.
41. Sebagai klien, saya ingin mengajukan klaim garansi dengan deskripsi dan tangkapan layar, agar perbaikan tercatat.
42. Sebagai penyedia, saya ingin klaim di luar masa atau cakupan garansi ditandai otomatis, agar saya bisa menolak atau menawarkan perbaikan berbayar.
43. Sebagai penyedia, saya ingin menutup klaim dengan catatan penyelesaian, agar riwayat dukungan utuh.

**Akses dan keamanan**

44. Sebagai penyedia, saya ingin masuk ke dasbor dengan email, kata sandi, dan 2FA, agar data keuangan klien aman.
45. Sebagai penyedia, saya ingin sistem membuat PIN awal 6 digit untuk setiap tautan portal, agar saya bisa mengirimkannya ke klien dalam pesan terpisah dari tautan.
46. Sebagai klien, saya ingin memasukkan PIN saat membuka tautan, agar orang yang menerima terusan tautan tidak bisa melihat proyek saya.
47. Sebagai klien, saya ingin wajib mengganti PIN awal dengan PIN buatan saya saat pertama masuk, agar hanya saya yang tahu PIN tersebut.
48. Sebagai klien, saya ingin tetap masuk di perangkat saya selama 30 hari, agar tidak mengetik PIN setiap kali membuka portal.
49. Sebagai klien, saya ingin memasukkan ulang PIN sebelum menyetujui dokumen atau mengunggah bukti transfer, agar persetujuan atas nama saya tidak bisa dilakukan orang lain, termasuk penyedia jasa.
50. Sebagai klien, saya ingin mengganti PIN kapan saja dari portal, agar bisa mengamankan akses jika curiga PIN diketahui orang lain.
51. Sebagai penyedia, saya ingin mereset PIN klien yang lupa, yang menerbitkan PIN awal baru dan mencabut semua sesi aktif, agar klien bisa masuk lagi tanpa membuka celah.
52. Sebagai penyedia, saya ingin tautan terkunci sementara setelah beberapa kali PIN salah dan kejadian itu tercatat, agar PIN tidak bisa ditebak.
53. Sebagai penyedia, saya ingin mencabut dan membuat ulang tautan portal klien, agar akses bisa diputus jika tautan bocor.
54. Sebagai penyedia, saya ingin semua perubahan status tercatat di log aktivitas, agar bisa menjelaskan kronologi saat sengketa.
55. Sebagai klien, saya ingin mengunduh semua dokumen proyek saya, agar punya arsip sendiri.

**Konfirmasi ke WhatsApp**

56. Sebagai klien, saya ingin tombol "Konfirmasi ke WhatsApp" muncul setelah saya menyetujui dokumen, mengunggah bukti transfer, atau mengajukan revisi atau klaim, agar penyedia jasa segera tahu ada yang perlu ditindaklanjuti.
57. Sebagai klien, saya ingin pesan WhatsApp itu sudah terisi otomatis (nama proyek, tindakan, nomor dokumen atau invoice, tautan ke dasbor), agar saya cukup menekan kirim.
58. Sebagai penyedia, saya ingin dasbor menandai semua tindakan klien yang menunggu tindak lanjut, agar saya tetap tahu meski klien tidak menekan tombol WhatsApp.

## Implementation Decisions

Proyek dimodelkan sebagai state machine; setiap modul lain hanya boleh mengubah status proyek lewat transisi yang sah, bukan dengan menulis kolom status langsung.

&#91;embedded content: state machine proyek · 9 status\]

Status pembayaran pelunasan disimpan di invoice, bukan di status proyek: garansi sudah berjalan sejak BAST disetujui, sementara proyek baru "Selesai" setelah garansi berakhir dan semua invoice lunas.

**Modul**

| Modul                 | Tanggung jawab                                                 | Antarmuka utama (perilaku)                                              |
| --------------------- | -------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Lifecycle Proyek      | Status proyek dan transisinya                                  | transisi(proyek, aksi) menolak aksi yang tidak sah dari status saat ini |
| Dokumen & Persetujuan | Penawaran, Addendum, BAST: versi, snapshot, kunci, persetujuan | terbitkanVersi, setujui(versi, bukti), tolak(versi, catatan)            |
| Penagihan             | Termin, invoice, penomoran, pembayaran, verifikasi             | jadwalkanTermin, terbitkanInvoice, catatPembayaran, verifikasi          |
| Progres               | Milestone dan pembaruan bertanggal                             | tambahPembaruan, tandaiMilestoneSelesai                                 |
| Revisi & Garansi      | Kuota revisi, klasifikasi permintaan, klaim garansi            | ajukanPermintaan, klasifikasikan, ajukanKlaim                           |
| Akses Portal          | Tautan klien, PIN, sesi, pencabutan                            | buatTautan, cabut, verifikasiPin, gantiPin, resetPin                    |
| Notifikasi WhatsApp   | Menyusun teks pesan dan tautan wa.me (tanpa API)               | pesanUntuk(peristiwa)                                                   |
| Log Aktivitas         | Jejak audit append-only                                        | catat(aktor, aksi, objek)                                               |

**Aturan bisnis yang dikunci**

- **Dokumen immutable setelah dikirim.** Saat versi dikirim ke klien, sistem membekukan isinya: snapshot data kanonik (JSON terurut, disimpan sebagai teks apa adanya, bukan kolom JSON yang dinormalkan database) beserta hash SHA-256 dari teks itu, dan PDF yang dirender sekali lalu disimpan. Hash dihitung dari data, bukan dari PDF, karena render PDF tidak dijamin menghasilkan byte yang sama. Perubahan setelahnya wajib lewat versi baru (bila belum disetujui) atau Addendum (bila sudah disetujui); versi lama dan keputusannya tetap tersimpan. Persetujuan mencatat hash yang dilihat klien dan harus sama dengan hash versi.
- **Bukti persetujuan** = nama yang diketik, centang pernyataan, waktu server, versi dokumen, hash, alamat IP, user-agent, dan konfirmasi ulang PIN milik klien, yang tidak diketahui penyedia jasa. Ini persetujuan elektronik biasa, bukan tanda tangan elektronik tersertifikasi.
- **Uang** disimpan sebagai integer rupiah. Termin persen dibulatkan ke rupiah terdekat, dan selisih pembulatan dibebankan ke termin terakhir agar jumlah termin selalu sama dengan total.
- **Nomor invoice** berformat prefiks-tahun-urutan (misal INV-2026-0001), dijamin unik oleh unique constraint di database dan dibuat di dalam transaksi dengan penguncian baris penghitung, sehingga aman dari dua request bersamaan.
- **Status lunas** sebuah invoice hanya berubah setelah penyedia memverifikasi pembayaran. Unggahan klien berstatus "menunggu verifikasi".
- **Kuota revisi** ditetapkan per proyek dari Penawaran yang disetujui. Hanya permintaan yang diklasifikasikan "revisi" yang memakai kuota; "perubahan lingkup" membuka Addendum. Sisa kuota dihitung (total kuota dari versi Penawaran dan Addendum yang disetujui dikurangi jumlah permintaan yang memakai kuota), bukan disimpan sebagai penghitung yang dikurangi.
- **Garansi** dimulai pada tanggal persetujuan BAST dan berakhir setelah durasi yang tertulis di Penawaran (asumsi A5). Tanggal mulai dan akhir disimpan beku di proyek saat BAST disetujui, dan setiap klaim mencatat apakah ia masuk masa garansi pada saat diajukan.
- **Tidak ada hapus permanen** untuk dokumen, invoice, dan pembayaran; yang ada pembatalan dengan alasan (soft cancel).

**Konfirmasi WhatsApp hanya pemberitahuan, bukan bagian dari persetujuan.** Persetujuan, unggahan bukti, dan pengajuan sudah tercatat di sistem sebelum tombol muncul. Tombol hanya membuka tautan wa.me berisi teks siap kirim ke nomor penyedia jasa; sistem tidak bisa dan tidak perlu tahu apakah pesan benar-benar terkirim. Karena itu, tidak ada status atau aturan yang bergantung pada pesan tersebut, dan antrean "menunggu tindak lanjut" di dasbor menjadi pengaman utama.

**Keamanan dan akses**

- Admin: login email + kata sandi, 2FA TOTP, rate limit pada login.
- Tautan klien berisi token acak minimal 128 bit; database menyimpan hash-nya untuk pencarian dan salinan terenkripsi (APP\_KEY) agar tautan yang sama bisa dimuat di pesan WhatsApp berikutnya; token tidak pernah masuk log; tautan bisa dicabut dan diganti.
- **PIN awal** 6 digit dibuat sistem, ditampilkan sekali di dasbor, dan dikirim dalam pesan terpisah dari tautan. Klien wajib menggantinya saat pertama masuk, sehingga penyedia jasa tidak lagi tahu PIN aktif.
- **PIN klien** minimal 6 digit; PIN lemah (deret seperti 123456, angka berulang seperti 000000) ditolak.
- **Penyimpanan PIN**: hanya hash (bcrypt/argon2), tidak pernah plaintext, tidak pernah di URL atau log.
- **Anti brute force**: 5 kali salah mengunci tautan 15 menit, dibatasi per token (bukan hanya per IP). Setelah 3 kali terkunci, tautan dibekukan sampai direset admin. Semua kejadian masuk Log Aktivitas.
- **Sesi**: setelah PIN benar, browser mendapat cookie sesi 30 hari (httpOnly, Secure, SameSite=Lax) yang terikat ke tautan itu. Ganti PIN, reset PIN, atau cabut tautan mencabut semua sesi aktif.
- **Re-autentikasi**: menyetujui dokumen dan mengunggah bukti transfer wajib memasukkan ulang PIN, meskipun sesi masih aktif.
- Berkas unggahan (bukti transfer, tangkapan layar) disimpan di storage privat, diakses lewat URL bertanda tangan berumur pendek; tipe dan ukuran berkas divalidasi di server.
- Setiap query portal klien dibatasi ke proyek pemilik token, untuk mencegah IDOR antar-klien.

**Skema data (entitas inti, tanpa detail kolom)**

Klien, Proyek, Dokumen (jenis: Penawaran/Addendum/BAST), VersiDokumen, Persetujuan, Termin, Invoice, Pembayaran, Milestone, PembaruanProgres, PermintaanRevisi, KlaimGaransi, TautanPortal, SesiPortal, Berkas, LogAktivitas. Rincian 22 tabel, kolom, dan constraint ada di [Desain Basis Data — Portal Proyek Jasa Website](https://claude.ai/code/artifact/5cd50b72-1239-4215-86c5-4129ff35870d) dan gambar ERD v2 di [papan FigJam Portal Proyek](https://www.figma.com/board/dCR3xUrw1hIZHo6yevidA8).

**Apa itu tes yang baik di proyek ini**

- Menguji perilaku eksternal: "klien dengan kuota revisi 0 tidak bisa mengajukan revisi", bukan "method X memanggil method Y".
- Tidak me-mock modul yang sedang diuji. Mock hanya di batas luar sistem (clock, penyimpanan berkas).
- Waktu dikendalikan lewat fake clock, karena jatuh tempo dan masa garansi bergantung pada tanggal.
- Satu tes bisa gagal karena satu alasan bisnis yang jelas.

**Seam dan cakupan**

| Seam                          | Modul                                    | Contoh skenario wajib                                                                                                                                                             |
| ----------------------------- | ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| HTTP (feature test)           | Semua alur portal klien dan dasbor admin | Klien wajib mengganti PIN awal; persetujuan tanpa PIN ulang ditolak; 5 PIN salah mengunci tautan; tautan yang dicabut ditolak; token proyek A tidak bisa membuka invoice proyek B |
| Domain (unit test tanpa HTTP) | Lifecycle Proyek                         | Setiap transisi sah berhasil, setiap transisi tidak sah ditolak (tabel transisi lengkap)                                                                                          |
| Domain                        | Penagihan: kalkulasi termin              | Jumlah termin selalu sama dengan total, termasuk kasus pembulatan seperti 3 termin dari Rp1.000.000                                                                               |
| Database (integration)        | Penagihan: penomoran                     | Dua penerbitan invoice bersamaan menghasilkan dua nomor berbeda, tanpa celah ganda                                                                                                |
| Domain                        | Dokumen & Persetujuan                    | Versi yang sudah dikirim tidak bisa diubah; hash data kanonik sama dengan hash yang dicatat saat persetujuan; PDF yang diunduh adalah berkas yang dibekukan saat dikirim          |
| Domain                        | Revisi & Garansi                         | Kuota berkurang hanya untuk "revisi"; klaim di luar masa garansi tertandai                                                                                                        |

Prior art: belum ada codebase, jadi pola tes ditetapkan di sini. Gunakan factory ( Tack Stack nya telah di rubah ke Next.Js )l untuk menyusun data proyek per status, supaya setiap tes bisa mulai dari "proyek yang BAST-nya sudah disetujui" dalam satu baris.

## Out of Scope

- Payment gateway dan pembayaran di dalam sistem; transfer tetap di luar, sistem hanya mencatat.
- Tanda tangan elektronik tersertifikasi (PSrE).
- OTP via email atau WhatsApp; PIN milik klien sudah menjadi faktor persetujuan. OTP bisa ditambahkan nanti untuk proyek bernilai besar.
- Pengiriman pesan otomatis lewat WhatsApp Business API; versi pertama hanya menyusun pesan siap kirim.
- Banyak penyedia jasa, tim, atau model SaaS untuk freelancer lain (kebutuhan mereka belum divalidasi).
- Chat di dalam portal; komunikasi tetap di WhatsApp.
- Pelacakan waktu kerja, akuntansi lengkap, dan pajak (PPN/PPh).
- Multi-mata uang dan multi-bahasa.
- Aplikasi mobile native; portal cukup responsif di browser ponsel.

## Further Notes

**Keputusan terbuka (perlu dijawab sebelum fase Desain selesai)**

- [ ] Garansi mulai saat BAST disetujui atau saat pelunasan? Pilihan kedua mendorong klien cepat melunasi.
- [x] Apakah satu proyek bisa punya lebih dari dua termin (misal 30/40/30)? PRD ini mengizinkan N termin.
- [ ] Apakah sistem ini juga menjadi topik tugas akhir? Jika ya, indikator di bagian 9 dokumen analisis harus terukur dan baseline wajib diisi sebelum implementasi.
- [ ] Batas pembatalan bila DP tidak dibayar: berapa hari setelah jatuh tempo proyek boleh dibatalkan, dan berapa kali pengingat dikirim lebih dulu?
- [x] Autentikasi klien: diputuskan PIN dengan PIN awal dari sistem yang wajib diganti klien (pendekatan C), menggantikan OTP.

**Risiko**

| Risiko                                                     | Akibat                          | Mitigasi                                                                                                                            |
| ---------------------------------------------------------- | ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Klien enggan memakai portal dan tetap membalas di chat     | Data kembali tersebar           | Tautan satu klik dari WhatsApp, tanpa akun, tampilan ringan di ponsel                                                               |
| Tautan portal diteruskan ke orang lain                     | Pihak lain melihat tagihan      | PIN untuk membuka portal, PIN ulang untuk tindakan penting, tautan bisa dicabut                                                     |
| Tautan dan PIN awal bocor sebelum klien masuk pertama kali | Orang lain mengganti PIN duluan | PIN awal dikirim terpisah dari tautan; klien yang tidak bisa masuk segera minta reset, yang mencabut semua sesi                     |
| Klien lupa PIN                                             | Klien tidak bisa masuk          | Reset oleh admin: PIN awal baru dan semua sesi dicabut                                                                              |
| Kekuatan hukum persetujuan elektronik biasa dipertanyakan  | Bukti lemah saat sengketa       | Jejak lengkap + hash snapshot + PIN yang hanya diketahui klien; untuk proyek bernilai besar, tetap bisa disertai tanda tangan basah |
| Lingkup melebar (scope creep di proyek sendiri)            | Tidak selesai tepat waktu       | MVP = Penawaran, persetujuan, termin/invoice, pembayaran; progres, revisi, garansi di iterasi kedua                                 |
