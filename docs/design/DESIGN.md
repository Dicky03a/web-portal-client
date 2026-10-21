# DESIGN — Portal Proyek Jasa Website

Versi: 0.1 | Tanggal: 19 Okt 2026

---

## 1. Sumber dan kepemilikan

| Dokumen | Peran | Versi |
|---------|-------|-------|
| PRD — Portal Proyek Jasa Website | Janji produk, audiens, batasan | 0.1 |
| UX.md | Layar (S-01…S-47), alur (F-01…F-16), navigasi, state per layar | 0.1 |
| COPY.md | Suara, teks UI, variabel, glosarium | 0.1 |
| FIXTURES.md | Data realistis, edge case, data ekstrem | 0.1 |
| Pencil — 00 Foundations | Token visual, pola komponen, tema gelap | 0.1 |

**Kepemilikan pipeline:**

| Area | Pemilik | DESIGN.md |
|------|---------|-----------|
| Layar, alur, navigasi, state per layar | UX.md | Referensi S-xx, F-xx |
| Suara, terminologi, teks error | COPY.md | Nada visual selaras dengan COPY.md |
| Data contoh, edge case | FIXTURES.md | Daftar ekstrem visual saja |
| Anatomi komponen, varian | COMPONENTS.md | Token dan aturan saja |
| Token visual, tema, aksesibilitas visual | **DESIGN.md** | Penuh — sumber kebenaran |

---

## 2. Janji produk, tesis desain, tesis pengalaman

**Janji produk:** Satu tempat bagi freelancer web developer untuk mengelola seluruh siklus proyek — dari penawaran sampai garansi — tanpa spreadsheet, tanpa WhatsApp berantakan, tanpa invoice manual.

**Tesis desain:** Gelap, tenang, dan presisi. Warna hanya dipakai untuk status; hierarki dibangun dari ukuran, bobot, dan tingkat permukaan. Setiap elemen bekerja, tidak ada yang sekadar hiasan.

**Tesis pengalaman:** Freelancer yang membuka portal harus langsung tahu: proyek mana butuh perhatian, uang mana yang belum masuk, klien mana yang menunggu. Klien yang membuka portal harus langsung tahu: apa yang harus dilakukan sekarang.

**Non-goals:**

- Bukan dashboard analitik — tidak ada grafik tren, tidak ada forecasting.
- Bukan platform kolaborasi — tidak ada chat, tidak ada komentar real-time.
- Bukan tool desain — tidak ada drag-and-drop layout builder.
- Bukan marketplace — tidak ada fitur cari freelancer atau bidding.

---

## 3. Prinsip dan anti-prinsip

### Prinsip (testable)

1. **Status di atas segalanya.** Setiap layar daftar harus menampilkan badge status yang dapat dibedakan tanpa warna (bentuk + label teks selalu ada). Tolak layar yang menyembunyikan status.
2. **Angka tepat, format konsisten.** Semua nilai uang ditampilkan sebagai Rupiah tanpa desimal (Rp 15.000.000), menggunakan font monospace (Geist Mono). Tolak tampilan angka tanpa format ribuan.
3. **Satu aksi utama per layar.** Setiap layar memiliki tepat satu tombol primary. Tolak layar dengan dua tombol primary berdampingan.
4. **Permukaan menjelaskan hierarki.** Elemen lebih penting berada di permukaan lebih tinggi (surface → surface-2 → surface-3). Tolak card di dalam card yang membingungkan kedalaman.
5. **Mobile-first, desktop-enhanced.** Layout dirancang untuk 375px terlebih dahulu. Desktop menambah sidebar dan kolom, bukan mengubah hierarki. Tolak fitur yang hanya bisa diakses di desktop.

### Anti-prinsip

1. **Jangan gunakan warna sebagai satu-satunya pembeda.** Warna memperkuat, label menjelaskan.
2. **Jangan tampilkan data mentah.** Timestamp ditampilkan sebagai "5 Okt 2026", bukan "2026-10-05T00:00:00Z". Persen ditampilkan sebagai "50%", bukan "5000 bps".
3. **Jangan sembunyikan error.** Setiap form field yang gagal validasi menampilkan pesan spesifik di bawah field, bukan toast generik.
4. **Jangan pakai animasi berlebihan.** Motion hanya untuk transisi navigasi dan feedback aksi. Tidak ada parallax, tidak ada auto-scroll, tidak ada animasi loading yang memakan waktu.
5. **Jangan tiru SaaS besar.** Ini tool freelancer solo — tidak perlu role picker, team switcher, atau onboarding wizard 5 langkah.

---

## 4. Posisi visual dan signature move

### Posisi pada sumbu visual

| Sumbu | Posisi | Alasan |
|-------|--------|--------|
| Ekspresif — Restrained | **Restrained** (80%) | Data dan status bicara, bukan dekorasi |
| Warm — Clinical | **Clinical** (70%) | Presisi angka dan tabel mendominasi |
| Editorial — Utilitarian | **Utilitarian** (75%) | Tool kerja, bukan majalah |
| Airy — Dense | **Dense** (65%) | Freelancer butuh informasi padat di satu pandangan |
| Playful — Serious | **Serious** (80%) | Uang dan kontrak, bukan permainan |
| Familiar — Novel | **Familiar** (70%) | Admin panel konvensional, tidak perlu belajar ulang |

### Signature move

1. **Badge status pil berwarna.** Bentuk kapsul (999px radius) dengan dot + label, warna latar 10% opacity dari warna status. Ini satu-satunya tempat warna semantik digunakan secara mencolok. Muncul di: kartu proyek, header detail, daftar invoice.
2. **Angka monospace tabular.** Semua angka menggunakan Geist Mono 500 dengan tabular-nums, sehingga digit sejajar sempurna di tabel dan kartu. Ini membedakan portal ini dari admin panel generik yang memakai font proporsional untuk angka.

---

## 5. Aturan keras

1. Tidak ada warna di luar tabel token. Setiap warna yang muncul di UI harus merujuk ke token `color.*`.
2. Radius hanya dari skala radius: 999px, 20px, 14px, atau 8px. Tidak ada radius lain.
3. Spacing hanya dari skala spacing: 4, 8, 12, 16, 24, 32, atau 48px. Tidak ada angka di luar skala.
4. Satu tombol primary per layar — lihat prinsip #3.
5. Setiap badge status memiliki label teks plus indikator non-warna (dot). Warna memperkuat, bukan menggantikan teks.
6. Semua nilai moneter ditampilkan dalam Geist Mono dengan format `Rp XX.XXX.XXX` (pemisah titik ribuan, tanpa desimal).
7. Tidak ada font selain Instrument Sans (heading + body), Geist Mono (angka + kode), dan Inter (fallback sistem).
8. Kontras teks isi pada latar minimal 4.5:1 (WCAG AA). Teks besar dan elemen UI minimal 3:1.
9. Sentuh target minimal 44px × 44px di mobile, 32px × 32px di desktop.
10. Setiap form error ditampilkan inline di bawah field terkait, bukan hanya sebagai toast.
11. Tidak ada auto-play animasi. Semua motion menggunakan `prefers-reduced-motion: reduce` sebagai fallback diam.
12. Setiap layar harus bekerja pada lebar 320px tanpa horizontal scroll.

---

## 6. Token warna

### Palet

| Token | Nilai | Peran |
|-------|-------|-------|
| `color.bg.base` | `#0A0A0A` | Latar utama aplikasi |
| `color.bg.surface` | `#151515` | Permukaan kartu, sidebar |
| `color.bg.surface-2` | `#1F1F1F` | Permukaan input, tombol secondary, nav item |
| `color.bg.surface-3` | `#2A2A2A` | Permukaan hover, elemen interaktif aktif |
| `color.text.primary` | `#FFFFFF` | Teks utama, heading, label |
| `color.text.secondary` | `#B4B4B8` | Teks pendukung, body paragraf |
| `color.text.muted` | `#85878D` | Teks tersier, placeholder, caption, help text |
| `color.accent` | `#FF7A3D` | Aksen utama, tautan, elemen interaktif menonjol |
| `color.state.success` | `#5BD68A` | Berhasil, dalam pengerjaan, selesai |
| `color.state.warning` | `#F5C451` | Peringatan, menunggu pembayaran |
| `color.state.danger` | `#FF6B6B` | Bahaya, error, batal, hapus |
| `color.state.info` | `#8AB4FF` | Informasi, terkirim, menunggu respons |
| `color.border.default` | `#252525` | Garis pemisah, border card (solid fallback dari 8% putih) |
| `color.border.strong` | `#3D3D3D` | Border input, outline tombol (solid fallback dari 16% putih) |
| `color.bg.button-primary` | `#FFFFFF` | Latar tombol utama |
| `color.text.button-primary` | `#0A0A0A` | Teks tombol utama |
| `color.bg.badge-draft` | `#1F1F1F` | Latar badge status Draf |
| `color.bg.overlay` | `#000000` | Overlay modal/dialog (gunakan dengan opacity 60%) |

### Pemetaan status proyek

| Status | Token warna | Token latar badge (10% opacity) | Label (COPY.md) |
|--------|-------------|-------------------------------|------------------|
| `draft` | `color.text.secondary` | `color.bg.badge-draft` | Draf |
| `quotation_sent` | `color.state.info` | 10% `color.state.info` | Penawaran Terkirim |
| `awaiting_down_payment` | `color.state.warning` | 10% `color.state.warning` | Menunggu DP |
| `in_progress` | `color.state.success` | 10% `color.state.success` | Dalam Pengerjaan |
| `client_review` | `color.accent` | 10% `color.accent` | Review Klien |
| `handover_sent` | `color.state.info` | 10% `color.state.info` | Handover Terkirim |
| `warranty` | `color.state.success` | 10% `color.state.success` | Garansi |
| `completed` | `color.state.success` | 10% `color.state.success` | Selesai |
| `cancelled` | `color.state.danger` | 10% `color.state.danger` | Dibatalkan |

### Pasangan kontras

| Teks | Latar | Min |
|------|-------|-----|
| `color.text.primary` | `color.bg.base` | 4.5 |
| `color.text.primary` | `color.bg.surface` | 4.5 |
| `color.text.primary` | `color.bg.surface-2` | 4.5 |
| `color.text.primary` | `color.bg.surface-3` | 4.5 |
| `color.text.secondary` | `color.bg.base` | 4.5 |
| `color.text.secondary` | `color.bg.surface` | 4.5 |
| `color.text.secondary` | `color.bg.surface-2` | 4.5 |
| `color.text.muted` | `color.bg.base` | 3 |
| `color.text.muted` | `color.bg.surface` | 3 |
| `color.text.muted` | `color.bg.surface-2` | 3 |
| `color.text.button-primary` | `color.bg.button-primary` | 4.5 |
| `color.accent` | `color.bg.base` | 3 |
| `color.accent` | `color.bg.surface` | 3 |
| `color.state.success` | `color.bg.base` | 3 |
| `color.state.success` | `color.bg.surface` | 3 |
| `color.state.warning` | `color.bg.base` | 3 |
| `color.state.warning` | `color.bg.surface` | 3 |
| `color.state.danger` | `color.bg.base` | 3 |
| `color.state.danger` | `color.bg.surface` | 3 |
| `color.state.info` | `color.bg.base` | 3 |
| `color.state.info` | `color.bg.surface` | 3 |

---

## 7. Tipografi

### Font stack

| Peran | Font | Fallback |
|-------|------|----------|
| Heading + Body | Instrument Sans | Inter, system-ui, sans-serif |
| Angka + Kode | Geist Mono | ui-monospace, monospace |
| Sistem (fallback) | Inter | system-ui, sans-serif |

### Skala tipografi

| Token | Peran | Font | Ukuran | Line height | Berat | Tracking | Catatan |
|-------|-------|------|--------|-------------|-------|----------|---------|
| `font.display` | Display / hero | Instrument Sans | 40px | 1.1 (44px) | 500 | -0.8px (-2%) | Hanya S-03 dashboard |
| `font.h1` | Judul halaman | Instrument Sans | 28px | 1.2 (34px) | 500 | -0.28px (-1%) | Satu per layar |
| `font.h2` | Judul bagian | Instrument Sans | 17px | 1.3 (22px) | 500 | 0 | Section header |
| `font.body` | Isi paragraf | Instrument Sans | 15px | 1.55 (23px) | 400 | 0 | Warna: `color.text.secondary` |
| `font.caption` | Keterangan, help text | Instrument Sans | 13px | 1.45 (19px) | 400 | 0 | Warna: `color.text.muted` |
| `font.label` | Label input, nav | Instrument Sans | 14px | 1.4 (20px) | 500 | 0 | Warna: `color.text.primary` |
| `font.button` | Teks tombol | Instrument Sans | 15px | 1 | 500 | 0 | Di dalam tombol h-48 |
| `font.badge` | Label badge status | Instrument Sans | 12px | 1 | 500 | 0 | Di dalam badge h-26 |
| `font.mono` | Angka, kode, PIN | Geist Mono | inherit | inherit | 500 | -0.3px | `font-variant-numeric: tabular-nums` |

---

## 8. Spasi dan grid

### Skala spacing (4px grid)

| Token | Nilai | Penggunaan umum |
|-------|-------|-----------------|
| `space.4` | 4px | Gap antar ikon dan teks kecil |
| `space.8` | 8px | Padding dalam badge, gap antar item kecil |
| `space.12` | 12px | Gap antar nav items, padding tombol vertikal |
| `space.16` | 16px | Padding konten utama (mobile gutter), gap form field |
| `space.24` | 24px | Gap antar section kecil, margin antar card |
| `space.32` | 32px | Padding sidebar, gap antar section besar |
| `space.48` | 48px | Gap antar section utama halaman |

### Grid dan margin

| Breakpoint | Kolom | Gutter | Margin samping |
|------------|-------|--------|----------------|
| Mobile (< 768px) | 1 | 16px | 16px |
| Tablet (768–1023px) | 2 | 24px | 24px |
| Desktop (≥ 1024px) | 12 | 24px | 32px (konten), 0 (sidebar) |

### Layout sidebar (desktop)

- Lebar sidebar: 280px (248px konten + 32px padding)
- Latar: `color.bg.base`
- Border kanan: 1px solid `color.border.default`
- Konten utama: `calc(100vw - 280px)`, max-width 1200px, centered

---

## 9. Bentuk

### Skala radius

| Token | Nilai | Penggunaan |
|-------|-------|------------|
| `radius.pill` | 999px | Tombol, badge status, chip |
| `radius.card` | 20px | Card, modal, dialog, dropdown |
| `radius.input` | 14px | Input text, textarea, select |
| `radius.small` | 8px | Tooltip, small element, nav item highlight |

### Border

| Token | Nilai | Penggunaan |
|-------|-------|------------|
| `border.width.default` | 1px | Border card, input, divider |
| `border.width.focus` | 2px | Focus ring |

### Shadow / Elevation

Tidak ada box-shadow di dark theme. Hierarki dibangun dari perbedaan tingkat permukaan (`color.bg.base` → `surface` → `surface-2` → `surface-3`), bukan shadow. Satu-satunya pengecualian: dropdown dan modal menggunakan overlay `color.bg.overlay` pada 60% opacity di belakangnya.

---

## 10. Ikon dan gambar

### Ikon

- Library: Lucide Icons (sudah termasuk di shadcn/ui)
- Ukuran default: 18px (sidebar nav), 20px (inline), 24px (tombol ikon)
- Stroke width: 1.5px (konsisten dengan Lucide default)
- Warna default: `color.text.muted` (ikon dekoratif), `color.text.primary` (ikon aksi)

### Gambar

| Konteks | Rasio | Fallback tanpa gambar |
|---------|-------|-----------------------|
| Bukti transfer | 3:4 (portrait) | Placeholder ikon receipt |
| Lampiran progres | 16:9 (landscape) | Placeholder ikon image |
| Avatar / logo usaha | 1:1 | Inisial 2 huruf di atas `color.bg.surface-2` |

Semua gambar: `object-fit: cover`, rounded sesuai konteks (`radius.small` untuk thumbnail, `radius.card` untuk preview besar).

---

## 11. Motion

### Durasi

| Token | Nilai | Penggunaan |
|-------|-------|------------|
| `motion.duration.fast` | 100ms | Hover state, focus ring |
| `motion.duration.base` | 200ms | Transisi warna, opacity, border |
| `motion.duration.slow` | 300ms | Slide-in sidebar, expand/collapse |

### Easing

- Masuk: `cubic-bezier(0.0, 0.0, 0.2, 1)` — ease-out
- Keluar: `cubic-bezier(0.4, 0.0, 1, 1)` — ease-in
- Standar: `cubic-bezier(0.4, 0.0, 0.2, 1)` — ease-in-out

### Yang boleh di-animasi

- Transisi warna background dan border (hover, focus, active)
- Opacity (toast masuk/keluar, modal overlay)
- Transform translateY (dropdown appear, toast slide-up)
- Height (accordion expand/collapse)

### Yang tidak boleh di-animasi

- Layout shift (tidak ada animasi yang memindahkan konten di sekitarnya)
- Loading skeleton (gunakan CSS animation sederhana, bukan gerakan kompleks)
- Data table sorting (instant, tanpa slide)

### Reduced motion (prefers-reduced-motion: reduce)

- Semua transisi durasi → 0ms
- Opacity tetap instant
- Skeleton pulse tetap aktif (tidak menyebabkan mual)
- `@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; } }`

---

## 12. Responsif

### Breakpoint

| Token | Titik henti | Target |
|-------|------------|--------|
| `breakpoint.sm` | 640px | Ponsel besar |
| `breakpoint.md` | 768px | Tablet portrait |
| `breakpoint.lg` | 1024px | Tablet landscape / desktop kecil |
| `breakpoint.xl` | 1280px | Desktop |

### Aturan reflow

| Komponen | Mobile (< 768px) | Desktop (≥ 1024px) |
|----------|-------------------|---------------------|
| Navigasi admin | Bottom tab bar (h-56, 5 item) | Sidebar kiri (w-280) |
| Navigasi portal | App bar (h-56) + back button | Tidak berubah (portal tetap mobile-first) |
| Tabel data | Card list (stack vertikal) | Tabel horizontal penuh |
| Form 2 kolom | Stack 1 kolom | Side-by-side |
| Dashboard cards | Stack vertikal | Grid 2–3 kolom |
| Modal | Fullscreen bottom sheet | Centered dialog max-w-480 |

### Safe area

- iOS notch/dynamic island: `env(safe-area-inset-top)` pada status bar
- Bottom nav: `env(safe-area-inset-bottom)` pada bottom tab bar
- Keyboard: form input viewport adjustment dengan `visualViewport` API

### Touch target minimum

- Mobile: 44px × 44px (mengikuti Apple HIG)
- Desktop: 32px × 32px (pointer device)
- Jarak antar target sentuh: minimal 8px

---

## 13. Aksesibilitas visual

### Kontras

- Teks isi (15px ke bawah): minimum 4.5:1 terhadap latar — lihat tabel pasangan kontras di §6
- Teks besar (17px semibold ke atas) dan elemen UI: minimum 3:1
- Elemen dekoratif murni (border, divider): dikecualikan

### Focus ring

- Style: 2px solid `color.accent` (#FF7A3D), offset 2px
- Muncul hanya pada `:focus-visible` (keyboard navigation), bukan pada click
- Berlaku untuk semua elemen interaktif: button, input, link, tab, card yang bisa di-klik

### Isyarat non-warna

- Badge status: selalu memiliki label teks + dot indicator. Bentuk pil memperkuat pembedaan.
- Form error: border merah + ikon peringatan + teks error spesifik. Warna bukan satu-satunya sinyal.
- Tabel sortable: ikon panah (↑↓) selain highlight kolom

### Text scaling

- Semua ukuran font dalam `px` di token, diimplementasi sebagai `rem` di CSS (base 16px)
- Layout tidak rusak pada 200% text zoom (diuji dengan browser zoom)
- Truncation: `text-overflow: ellipsis` dengan `title` attribute untuk teks lengkap

---

## 14. Ketahanan data (dari FIXTURES.md)

Visual system harus bertahan pada data ekstrem berikut:

| Dimensi | Nilai ekstrem | Contoh |
|---------|---------------|--------|
| Nama proyek terpanjang | 79 karakter | "Aplikasi Inventori Gudang Multi-Cabang dan Sistem Pelaporan Stok Terintegrasi" |
| Nama klien terpanjang | 59 karakter | "Siti Nurhaliza Putri Maharani Kusuma Dewi Anggraeni Purnama" |
| Nama usaha terpanjang | 58 karakter | "PT Nusantara Digital Kreatif Teknologi Indonesia Sejahtera" |
| Label status terpanjang | 19 karakter | "Menunggu Verifikasi" (invoice) |
| Nominal terbesar | Rp 1.000.000.000 | 13 karakter termasuk "Rp" dan titik |
| Item penawaran terbanyak | 8 item + 3 termin | Tabel harus scroll vertikal |
| Daftar proyek | 50 proyek | Pagination 10 per halaman |
| Daftar klien | 50 klien | Pagination 10 per halaman |
| Rasio gambar | 3:4 (portrait), 16:9 (landscape) | Object-fit cover |

### Strategi penanganan

- **Teks panjang:** `text-overflow: ellipsis` + `white-space: nowrap` untuk single-line (nama di card, breadcrumb). Multi-line clamp (`-webkit-line-clamp: 2`) untuk deskripsi.
- **Angka besar:** Geist Mono tabular-nums memastikan digit sejajar. Lebar kolom angka minimal 140px.
- **Daftar kosong:** Empty state dengan ikon + pesan + CTA (lihat COPY.md `global.empty.*`).
- **Tidak ada gambar:** Placeholder ikon generik di atas `color.bg.surface-2`.

---

## 15. Filter layar baru dan kriteria penerimaan

Sebelum menambah layar baru, jawab pertanyaan berikut. Jika ada jawaban "tidak", layar harus direvisi.

### Filter filosofis

1. Apakah layar ini membantu freelancer tahu "apa yang harus dilakukan sekarang"? Jika hanya menampilkan informasi tanpa aksi → tolak.
2. Apakah layar ini bisa diakses dari navigasi yang ada (sidebar/bottom tab/breadcrumb)? Jika memerlukan menu baru → pertanyakan.
3. Apakah layar ini bekerja untuk klien yang hanya punya satu proyek? Jika tidak → perbaiki.

### Filter UX (lihat UX.md untuk daftar layar lengkap)

4. Apakah layar memiliki state loading, empty, dan error? Lihat UX.md S-xx.
5. Apakah flow masuk dan keluar layar terdefinisi? Lihat UX.md F-xx.

### Filter visual

6. Apakah semua warna menggunakan token dari §6? Tidak ada hex literal.
7. Apakah spacing menggunakan skala §8? Tidak ada angka di luar skala.
8. Apakah ada tepat satu tombol primary?
9. Apakah layar bekerja di 320px tanpa horizontal scroll?
10. Apakah data ekstrem dari §14 tidak merusak layout?

---

## 16. Penundaan keputusan

| Keputusan | Alasan ditunda | Trigger untuk memutuskan |
|-----------|----------------|--------------------------|
| Light theme | MVP hanya dark theme sesuai Pencil. Pertimbangkan jika ada permintaan klien enterprise. | Feedback pengguna setelah 3 bulan launch |
| Chart/grafik dashboard | Non-goal di PRD. Dashboard hanya menampilkan angka ringkasan dan daftar. | Jika user research menunjukkan kebutuhan visualisasi tren |
| Custom branding per klien | Portal klien menggunakan branding freelancer, bukan branding klien. | Jika fitur multi-tenant/white-label diminta |
| Print stylesheet | Penawaran dan invoice dikirim sebagai PDF, bukan di-print dari browser. | Jika ada kebutuhan cetak langsung |
| Notification badge angka | Iterasi 1 tidak ada notifikasi in-app. | Iterasi 2 jika fitur notifikasi ditambahkan |

---

## 17. Handoff untuk COMPONENTS.md

### Token yang harus digunakan

COMPONENTS.md **wajib** merujuk token berikut, bukan nilai mentah:

- Warna: `color.*` dari §6
- Tipografi: `font.*` dari §7
- Spasi: `space.*` dari §8
- Radius: `radius.*` dari §9
- Motion: `motion.*` dari §11
- Breakpoint: `breakpoint.*` dari §12

### Kebutuhan komponen (dari UX.md §11.1)

| Komponen | Layar utama | Token khusus | Uji ekstrem |
|----------|-------------|--------------|--------------|
| Button (Primary, Secondary, Danger, Ghost) | Semua | `color.bg.button-primary`, `color.text.button-primary`, `radius.pill`, h-48px | Label maks 24 karakter |
| Badge status (9 status proyek + 6 invoice) | S-03, S-07, S-08, S-32, S-37 | Lihat pemetaan status §6, `radius.pill`, `font.badge`, h-26px | "Menunggu Verifikasi" 19 karakter |
| Input Text | Semua form | `color.bg.surface`, `color.border.strong`, `radius.input`, h-52px | Placeholder maks 40 karakter |
| Input PIN (6 digit) | S-30, S-31, S-34, S-38, S-44 | `font.mono`, tracking 4px | Semua digit terisi |
| Textarea | S-10, S-36, S-40, S-43 | `color.bg.surface`, `radius.input` | 80 karakter (alasan/catatan) |
| File Upload | S-38, S-43, S-20 | `color.border.strong` dashed, `radius.card` | File 5 MB, nama panjang |
| Select / Dropdown | S-10, S-09 | `radius.input`, h-52px | 10+ opsi |
| Table | S-04, S-07, S-14 | `font.mono` untuk kolom angka | 50 baris + pagination |
| Card | S-03, S-32 | `color.bg.surface`, `radius.card`, `space.24` padding | Nama proyek 79 karakter |
| Tab Navigation | S-08 | `color.accent` active indicator | 5 tab |
| Sidebar Navigation | Admin layout | w-280, `color.bg.base`, nav item h-40 `radius.small` | 8 menu item |
| Bottom Tab Bar | Portal mobile | h-56, `color.bg.base` | 4 tab |
| App Bar | Portal layout | h-56, back button 44px circle `color.bg.surface-2` | Judul 20 karakter |
| Modal / Dialog | S-12, S-14, S-25 | `color.bg.overlay` 60%, `radius.card`, max-w-480 (desktop) | Fullscreen di mobile |
| Toast / Notification | Konfirmasi aksi | `radius.card`, `space.16` padding, auto-dismiss 4s | Teks maks 60 karakter |
| Empty State | S-03, S-37 | Ikon 48px, `font.body`, `color.text.muted` | — |
| Loading Skeleton | S-03, S-08 | `color.bg.surface-2` pulse animation | — |
| Pagination | S-04, S-07, S-14 | h-40, `radius.small` | 5 halaman |
| Breadcrumb | Admin hierarkis | `font.caption`, `color.text.muted` separator | 3 level |

---

*Langkah berikutnya: **COMPONENTS.md** — definisikan anatomi, varian, dan state untuk setiap komponen menggunakan token dari DESIGN.md.*
