---
name: PlayTest ID
description: Platform manajemen pengujian Android dengan siklus kerja yang jelas.
colors:
  primary-50: "#F5F3FF"
  primary-100: "#EDE9FE"
  primary-200: "#DDD6FE"
  primary-300: "#C4B5FD"
  primary-400: "#A78BFA"
  primary-500: "#8B5CF6"
  primary-600: "#7C3AED"
  primary-700: "#6D28D9"
  primary-800: "#5B21B6"
  primary-900: "#4C1D95"
  pink-50: "#FDF2F8"
  pink-100: "#FCE7F3"
  pink-500: "#EC4899"
  pink-600: "#DB2777"
  blue-50: "#EFF6FF"
  blue-500: "#3B82F6"
  blue-600: "#2563EB"
  orange-500: "#F97316"
  orange-600: "#EA580C"
  success: "#22C55E"
  warning: "#F59E0B"
  error: "#EF4444"
  info: "#3B82F6"
  white: "#FFFFFF"
  gray-50: "#F8FAFC"
  gray-100: "#F1F5F9"
  gray-200: "#E2E8F0"
  gray-300: "#CBD5E1"
  gray-400: "#94A3B8"
  gray-500: "#64748B"
  gray-600: "#475569"
  gray-700: "#334155"
  gray-800: "#1E293B"
  gray-900: "#0F172A"
typography:
  display:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "32px"
    fontWeight: 700
    lineHeight: 1.25
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.43
rounded:
  xs: "4px"
  sm: "6px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  2xl: "20px"
  pill: "999px"
spacing:
  1: "4px"
  2: "8px"
  3: "12px"
  4: "16px"
  5: "20px"
  6: "24px"
  8: "32px"
  10: "40px"
  12: "48px"
  16: "64px"
  20: "80px"
components:
  button-primary:
    backgroundColor: "{colors.primary-600}"
    textColor: "{colors.white}"
    rounded: "{rounded.md}"
    height: "40px"
  card:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.lg}"
    padding: "20px 24px"
---

# Design System: PlayTest ID

## Overview

**Creative North Star: “Reliable, Modern, Simple, Transparent.”**

PlayTest ID adalah platform dashboard untuk mengatur pengujian aplikasi Android bagi Developer, Tester, dan Admin. Sistem visualnya bersih, ramah, dan berorientasi data. Bidang kerja yang putih dan abu terang menjadi kanvas bagi status, progres, daftar, dan tindakan yang harus mudah ditemukan.

Ungu menandai tindakan utama dan progres; pink memberi emphasis pada reward dan aktivitas; biru dan oranye membantu mengomunikasikan informasi serta perhatian. Gunakan Inter atau fallback sistem, kartu membulat, dan bayangan lembut. Hindari dekorasi yang mengurangi keterbacaan data.

**Key Characteristics:**
- Dashboard ringan dengan kontras permukaan yang jelas.
- Ungu sebagai warna aksi; warna semantik membawa arti status.
- Komponen membulat, tipografi terbaca, dan layout responsif lintas role.

## Colors

Palet netral abu terang menjaga bidang kerja terbuka; ungu dan pink memberi karakter tanpa mengambil alih informasi.

### Primary
- **Ungu PlayTest** ({colors.primary-600}): CTA, navigasi aktif, link, seleksi, dan progres.

### Secondary
- **Pink aksen** ({colors.pink-500}): highlight, reward, dan penekanan visual.
- **Biru informasi** ({colors.blue-500}): konteks informasi dan aktivitas.
- **Oranye perhatian** ({colors.orange-500}): peringatan dan item yang perlu ditinjau.

### Tertiary
- **Hijau sukses** ({colors.success}): aktivitas, pengujian, pembayaran, dan reward yang berhasil.
- **Kuning peringatan** ({colors.warning}): status pending atau processing.
- **Merah error** ({colors.error}): kegagalan, penolakan, dan isu kritis.

### Neutral
- **White** ({colors.white}): sidebar, topbar, kartu, dan kontrol.
- **Gray 50** ({colors.gray-50}): latar halaman.
- **Gray 100–300** ({colors.gray-100}, {colors.gray-200}, {colors.gray-300}): track, batas, dan pemisah.
- **Gray 500–600** ({colors.gray-500}, {colors.gray-600}): teks sekunder dan ikon.
- **Gray 700–900** ({colors.gray-700}, {colors.gray-800}, {colors.gray-900}): teks utama dan heading.

**The Status Is Never Color-Only Rule.** Pasangkan warna status dengan label atau ikon yang dapat dibaca.

## Typography

**Display Font:** Inter (fallback system-ui, sans-serif)  
**Body Font:** Inter (fallback system-ui, sans-serif)

**Character:** Sans netral yang modern dan terbaca menjaga antarmuka tetap mudah dipahami saat memuat data operasional.

### Hierarchy
- **Display/H1** (700, 32px/40px): judul halaman dan hero.
- **H2** (700, 24px/32px): judul bagian.
- **H3** (600, 20px/28px): judul kartu atau kelompok.
- **H4** (600, 16px/24px): label konten dan subbagian.
- **Body large** (400, 16px/24px): pengantar dan deskripsi penting.
- **Body** (400, 14px/20px): teks utama.
- **Body small** (400, 12px/18px): bantuan dan metadata.
- **Caption** (500, 11px/16px): label sekunder.

## Layout

Developer dan Admin memakai sidebar desktop 240px, topbar 64px, lalu konten fleksibel dengan lebar maksimum 1440px. Halaman awal marketing dimulai dengan hero yang memenuhi satu viewport; detail lanjutannya muncul setelah fold. Dashboard mempertahankan urutan heading, tindakan, status, data, dan daftar operasional.

Pada tablet sidebar dapat menyusut menjadi rail; pada mobile navigasi workspace berubah menjadi drawer. Tester memakai navigasi bawah dan urutan mobile yang memprioritaskan misi aktif. Gunakan ritme berbasis 4px: kontrol rapat 8–12px, isi kartu 20–24px, jarak bagian 24–32px, dan padding layar lebar 48–80px. Konten tabel lebar bergulir di dalam pembungkus.

## Elevation & Depth

Kartu default memakai bayangan kecil yang hampir tidak terasa (0 1px 2px rgba(15, 23, 42, 0.05)); popover dan elemen penting memakai bayangan sedang (0 4px 12px rgba(15, 23, 42, 0.08)). Gunakan level tinggi (0 10px 30px rgba(15, 23, 42, 0.10)) hanya saat elemen benar-benar mengambang.

**The Quiet Elevation Rule.** Bayangan membantu membedakan lapisan, bukan menggantikan garis tepi atau hierarki.

## Shapes

Kontrol memakai radius 8px; kartu 12px; modal 16px; badge dan avatar berbentuk pill atau lingkaran. Gunakan border abu 200 yang tipis sebagai batas netral dan sisakan sudut besar hanya untuk panel utama.

## Components

### Buttons
- **Primary:** ungu 600 dan teks putih; tinggi 40px; radius 8px.
- **Secondary:** putih, border abu 200, teks abu 700.
- **Focus:** ring ungu 100 yang terlihat pada keyboard.
- **Sizes:** kecil 32px, medium 40px, besar 48px.

### Cards / Containers
- Putih dengan radius 12px, border abu 200, dan shadow kecil.
- Padding umum 20–24px; kelompok informasi terkait tetap berada bersama.

### Inputs / Fields
- Putih, tinggi 40px, border abu 200, radius 8px, padding 12px.
- Focus memakai border ungu 500 dan ring ungu 100; error memiliki border serta pesan merah.

### Navigation
- Sidebar putih 240px dan topbar putih 64px di desktop.
- Item aktif memakai permukaan ungu 50, teks dan ikon ungu 600, serta indikator sisi kiri.
- Tester mendapatkan bottom navigation yang mudah dijangkau pada mobile.

### Data, Status, and Progress
- KPI memakai kartu ringkas; tabel menggunakan header abu 50 dan hover abu 50.
- Status success, warning, error, info, dan neutral memakai warna semantik beserta label.
- Progress memakai track abu 100, fill ungu 600, tinggi 8px, dan radius pill.
- Grafik membatasi warna dan memilih line untuk tren, donut untuk distribusi, serta bar untuk perbandingan.

## Do's and Don'ts

### Do:
- **Do** gunakan latar Gray 50 dan permukaan putih untuk mengelompokkan data.
- **Do** gunakan spacing dalam kelipatan 4px dan radius sesuai tingkat komponen.
- **Do** pertahankan keterbacaan, fokus keyboard, dan layout yang responsif.

### Don't:
- **Don't** menggunakan warna status tanpa label yang menjelaskan maknanya.
- **Don't** memakai banyak warna chart pada satu visual.
- **Don't** menampilkan angka demo sebagai angka bisnis final.
