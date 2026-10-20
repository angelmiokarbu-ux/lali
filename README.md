# 📱 Lali Gadget - Jual Beli & Tukar Tambah HP Bekas

Landing page modern dan *mobile-first* untuk bisnis jual beli serta tukar tambah HP (smartphone) bekas bergaransi. Didesain khusus agar nyaman diakses lewat smartphone dan siap ditautkan langsung di profil **Google Maps**, **Instagram Bio**, maupun iklan media sosial.

🌐 **Live Demo (GitHub Pages):** [https://angelmiokarbu-ux.github.io/lali/](https://angelmiokarbu-ux.github.io/lali/)

---

## ✨ Fitur Utama

- 📱 **Mobile-First Experience**: Desain responsif menyerupai aplikasi mobile dengan navigasi melayang (*sticky bottom navigation*).
- 📦 **Katalog Unit Siap Kirim**: Filter kategori instan (Semua, iPhone, Samsung, Xiaomi/Android) lengkap dengan indikator kondisi unit, *battery health*, dan harga.
- 💬 **Direct WhatsApp Order**: Tombol "Beli" dan "Chat WA" langsung membuka WhatsApp dengan format pesan otomatis.
- 🧮 **Kalkulator Taksiran Harga Jual**: Form interaktif bagi calon pelanggan untuk memilih tipe HP & kondisinya, kemudian mengirimkan rincian langsung ke WhatsApp admin.
- 📍 **Integrasi Google Maps**:
  - Peta embed lokasi toko fisik.
  - Tombol pintas **"Petunjuk Arah"** ke Google Maps.
  - Tampilan rating bintang 4.9⭐ dan testimoni pelanggan untuk membangun reputasi & kepercayaan (*social proof*).
- ⚡ **Ringan & Cepat**: Dibangun dengan Tailwind CSS CDN murni tanpa dependensi build kompleks.

---

## 🛠️ Cara Kustomisasi Data Toko

Buka file [`index.html`](index.html) dan sesuaikan bagian berikut:

### 1. Nomor WhatsApp
Cari teks `6281234567890` dan ganti dengan nomor WhatsApp aktif toko Anda (gunakan format kode negara `62` tanpa awalan `0` atau tanda `+`).

### 2. Lokasi & Google Maps
- Cari bagian `id="lokasi"`.
- Ganti alamat pada tag `<p class="text-slate-600 text-[11px]">` sesuai alamat toko Anda.
- Ganti atribut `href="https://maps.google.com"` dengan link rute Google Maps bisnis Anda.
- Ganti `src` pada tag `<iframe>` dengan embed link Google Maps toko Anda.

### 3. Katalog Unit
Katalog berada di dalam container `<div id="productList">`. Anda dapat menduplikasi elemen `.product-item` untuk menambahkan unit HP baru beserta foto dan harganya.

---

## 🚀 Menjalankan Secara Lokal

Untuk menguji web di komputer lokal:

```bash
# Jalankan web server sederhana menggunakan Python:
python3 -m http.server 8080

# Buka di browser:
http://localhost:8080
```

---

## 📄 Lisensi
Proyek ini dibuat untuk mendukung digitalisasi UMKM dan bisnis konter HP lokal. Bebas dimodifikasi dan digunakan sesuai kebutuhan bisnis Anda.
