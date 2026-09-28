# PlayTest ID — UI Design Brief

**Status:** Implementasi frontend prototype selesai; semua angka operasional adalah data demo.  
**Platform dan stack:** Web; Next.js, React, TypeScript, Tailwind CSS.  
**Workflow desain:** Code-first.  
**Cakupan:** Developer, Tester, dan Admin.

## Arah desain

### Purple/Pink SaaS Dashboard

Sistem visual mengikuti design system PlayTest ID yang diberikan pengguna: antarmuka dashboard putih dan abu terang, primary ungu, aksen pink, status semantik, komponen membulat, dan bayangan lembut. Produk terasa modern, ramah, profesional, mudah dipahami, dan berorientasi data.

- **Warna:** ungu untuk CTA/seleksi/progres utama, pink untuk emphasis dan reward, biru untuk informasi, oranye untuk perhatian; hijau, kuning, dan merah untuk status semantik. Warna selalu didampingi teks atau ikon.
- **Struktur:** sidebar putih di desktop, topbar putih 64px, area kerja fleksibel dengan lebar konten maksimal 1440px, dan workspace yang mengutamakan data pengujian.
- **Komponen:** kartu putih beradius, tabel, badge status, progres, form, aktivitas, serta grafik yang dibatasi pada beberapa warna.
- **Responsif:** Developer/Admin desktop-first dan menyusut menjadi rail pada tablet; Tester mobile-first dengan bottom navigation. Hero halaman awal memenuhi sekurangnya satu viewport.

## Pengguna, tugas, dan keberhasilan

- **Developer:** membuat pengujian Android dari APK dan ketentuannya, membayar sesuai konfigurasi, merekrut tester, lalu memantau progres, feedback, bug, dan hasil.
- **Tester:** menemukan pengujian yang memenuhi syarat, mengikuti misi harian, mengirim feedback/laporan bug, dan menukarkan poin yang sudah tervalidasi.
- **Admin/Super Admin:** mengawasi pengguna, aplikasi dan pengujian, transaksi, laporan, reward, konfigurasi, serta jejak audit.
- **Mode semua area:** Operate. Setiap layar mengutamakan status, langkah berikutnya, dan akses langsung ke tindakan yang sah untuk role tersebut.
- **Sinyal keberhasilan produk dari PRD:** completion rate pengujian dan misi, aktivasi tester, validitas bug, rating feedback, keberhasilan payout, developer repeat rate, dan waktu penyelesaian dukungan. Target angka belum ditetapkan.

## Struktur navigasi

### Area bersama

- Login, registrasi, verifikasi, dan pemulihan kata sandi.
- Header kontekstual dengan identitas role, notifikasi, bantuan, dan profil.
- Status akun, akses role, serta feedback untuk loading, sukses, gagal, dan tindakan yang tertahan.

### Developer

Navigasi utama: **Beranda · Pengujian · Riwayat · Profil/Pengaturan**.

- **Beranda:** ringkasan pengujian aktif/selesai/menunggu dan jumlah tester; CTA “Buat Pengujian Baru”; run sheet proyek terbaru; antrean feedback atau bug penting; aktivitas terakhir.
- **Pengujian:** daftar proyek dengan filter status, progres, jumlah tester, target, dan aksi; detail proyek menggabungkan progres kuota, daftar tester, APK/build, feedback, bug, serta timeline.
- **Buat pengujian:** wizard lima langkah dari upload APK → informasi aplikasi → kriteria tester dan misi → add-on/biaya → konfirmasi. Tampilkan validasi file, ringkasan biaya, serta status selanjutnya dengan jelas.
- **Riwayat:** pengujian, pembayaran, aktivitas, dan ekspor yang tersedia sesuai tahap MVP.
- **Profil/Pengaturan:** data developer, keamanan, notifikasi, serta bantuan.

### Tester

Navigasi mobile utama: **Beranda · Eksplorasi · Pengujian Saya · Reward · Profil**. Misi aktif dicapai dari kartu pengujian berjalan agar tugas hari ini tetap menjadi aksi utama.

- **Beranda:** pengujian aktif, misi yang perlu dikerjakan, progres hari ke-n, poin tersedia/dalam proses, reward baru, dan aktivitas.
- **Eksplorasi:** pencarian serta filter kategori/reward/kuota; kartu menampilkan nama aplikasi, versi, reward, sisa kuota, dan durasi.
- **Detail aplikasi:** kriteria kelayakan, periode, reward, syarat/NDA, dan tindakan bergabung. Cegah klaim ketika kuota penuh atau tester tidak memenuhi syarat.
- **Pengujian Saya dan Misi:** status pengujian; checklist misi locked/available/in progress/completed/needs review; instruksi dan validasi sesi; feedback atau pelaporan bug dari konteks misi.
- **Poin & Reward:** poin tersedia/dalam proses/terkumpul, katalog dan batas minimum redeem, metode tujuan, status payout, serta riwayat.
- **Profil:** biodata, verifikasi, akun payout, keamanan, ketentuan, bantuan, dan logout.

### Admin

Navigasi utama: **Beranda · Pengguna · Aplikasi & Pengujian · Transaksi & Keuangan · Laporan & Keluhan · Reward · Pengaturan**. Jejak audit tersedia pada perubahan dan detail operasional yang relevan.

- **Beranda:** KPI platform, antrean review/eskalasi, transaksi atau payout bermasalah, aktivitas terbaru, serta status infrastruktur bila datanya tersedia.
- **Pengguna:** pencarian, filter role/status/verifikasi, detail aktivitas, pengubahan status dengan konfirmasi, dan ekspor.
- **Aplikasi & Pengujian:** peninjauan aplikasi/build, status proyek, kuota, dan intervensi admin yang tercatat.
- **Transaksi & Keuangan:** volume, invoice, status pembayaran/payout, filter, detail, dan rekonsiliasi yang didukung integrasi.
- **Laporan & Keluhan:** daftar tiket menurut prioritas/kategori/status, detail konteks, assignment, resolusi, dan ekspor.
- **Reward:** skema poin, katalog, redeem, dan status payout.
- **Pengaturan:** biaya, ketentuan, konversi poin, minimum redeem, legal, maintenance mode, dan riwayat perubahan konfigurasi.

## Layout lintas perangkat

- **Desktop:** Developer dan Admin memakai navigasi samping, header konteks, ringkasan di bagian atas, lalu daftar kerja utama. Gunakan tabel untuk data yang perlu dibandingkan dan panel samping untuk detail/aksi yang berkaitan.
- **Tablet:** navigasi samping dapat diringkas; kurangi kolom tabel dan pertahankan prioritas status, identitas, progres, serta tindakan utama.
- **Mobile:** Tester menjadi mobile-first dengan navigasi bawah yang ringkas, satu aksi utama per area, kartu misi lebar, dan filter yang mudah dibuka. Developer/Admin tetap berfungsi pada layar sempit melalui navigasi lipat, tabel yang berubah menjadi baris/kartu, serta detail yang tidak bergantung pada hover.
- **Urutan baca:** identitas dan status → tindakan berikutnya → progres/isi utama → aktivitas dan detail pendukung.

## Komponen reusable

- `RoleShell` dan navigasi sesuai role.
- `CycleStatus`/`StatusBadge` dengan label teks dan ikon, bukan warna saja.
- `RunSheet` dan `RunSheetRow` untuk urutan proyek/tahap/aktivitas.
- `ProgressMeter` untuk target tester, progres misi, dan durasi.
- `MissionCueCard` untuk instruksi, status, validasi, reward, dan aksi.
- `IssueSlip` untuk bug, tiket, prioritas, dan status penyelesaian.
- `ActivityTimeline`/`AuditEntry` untuk histori dan jejak perubahan.
- `DataTable` responsif dengan filter, empty state, pagination, dan aksi role-aware.
- `RewardBalance` dan `RewardStatus` untuk poin dan redeem.
- `UploadDropzone` dan `CostSummary` untuk wizard developer.

## Status, validasi, dan batas data

- Tampilkan state loading, kosong, gagal, sukses, tidak memenuhi syarat, kuota penuh, perlu verifikasi, suspended, dan needs review jika relevan.
- Proyek memakai status PRD seperti Draft, Awaiting Payment, Review, Recruiting, Active, Paused, Completed, dan Cancelled.
- Misi memakai Locked, Available, In Progress, Completed, dan Needs Review/Failed; payout memakai Pending, Processing, Success, Failed, dan Cancelled.
- Durasi, target tester, kuota, biaya, reward, nilai konversi poin, dan minimum redeem tetap konfigurabel. Angka pada desain sumber adalah mock dan tidak boleh menjadi klaim bisnis final.
- Audit status akun, transaksi, payout, konfigurasi, serta intervensi admin.

## Aksesibilitas, keamanan, dan batas MVP

- Pastikan navigasi keyboard, fokus terlihat, label form dan pesan validasi yang jelas, kontras teks yang memadai, serta status yang tidak hanya dibedakan dengan warna. Standar konformansi khusus belum dipilih.
- Hormati role pada navigasi, data, APK, bukti pengujian, dan tindakan. Konfirmasi tindakan admin yang berdampak dan berikan catatan audit.
- Prioritaskan alur inti MVP: auth/RBAC, proyek dan APK, enrollment, misi, feedback/bug, ledger reward, serta operasi admin dasar. Payment gateway, payout, notifikasi, ekspor, filtering lanjutan, dan ticketing penuh mengikuti prioritas PRD P1.
- Di luar cakupan MVP: distribusi iOS, social network tester, jual-beli aplikasi, dan automated UI testing sebagai pengganti tester manusia.

## Hal yang masih terbuka

- Target deploy belum dipilih.
- Standar aksesibilitas formal, metode pembayaran final, angka bisnis, dan kebutuhan bahasa selain konten PRD berbahasa Indonesia belum ditetapkan.
- Prototype frontend sudah mencakup dashboard dan alur utama ketiga role. Tindakan dan data tetap lokal/demo; integrasi backend belum termasuk.
