# 📱 Multi Pusat Service HP & Gadget - Pulokulon, Grobogan

Web aplikasi modern, ringan, dan ramah pengguna awam untuk bisnis **Jual Beli HP Bekas/Baru, Tukar Tambah, & Servis HP Bergaransi**. Dibangun menggunakan **React + TypeScript + Vite + Tailwind CSS**.

📍 **Toko Fisik & Google Maps:**  
[Multi Pusat Service HP, Tawang, Jambon, Kec. Pulokulon, Kabupaten Grobogan, Jawa Tengah](https://maps.app.goo.gl/rPLD1EFEfyfR4hgPA)  
🌐 **Live Website (GitHub Pages):** [https://angelmiokarbu-ux.github.io/lali/](https://angelmiokarbu-ux.github.io/lali/)

---

## 🔒 Akses Panel Admin (Rahasia & Aman)

Di web toko publik **sama sekali tidak ada tombol atau link admin**. Pengunjung biasa tidak akan tahu ada panel kelola produk.

### Cara Masuk ke Panel Admin:
1. Buka link rahasia di browser HP / laptop:  
   👉 **`https://angelmiokarbu-ux.github.io/lali/#/kelola-konter-rahasia`**  
   *(Atau di server lokal: `http://localhost:5173/#/kelola-konter-rahasia`)*
2. Masukkan **PIN Keamanan** default: **`8899`**
3. Anda langsung masuk ke antarmuka **Kelola Unit HP & Upload Gambar**.

> [!TIP]
> Di tab **Pengaturan** pada panel admin, Anda bisa mengganti URL rahasia dan PIN keamanan sesuai keinginan kapan saja!

---

## ☁️ Upload Gambar Otomatis ke GitHub Storage

Panel admin dilengkapi integrasi **GitHub REST API**:
- Ketika admin memilih foto HP dari galeri HP atau laptop, foto otomatis diunggah langsung ke repositori GitHub (`public/uploads/`).
- Gambar langsung memiliki link CDN permanen (`jsDelivr / GitHub Raw`) berkecepatan tinggi yang tidak akan hilang atau kadaluarsa.
- **Cara Mengaktifkan GitHub Storage**:
  1. Buat token gratis di [github.com/settings/tokens](https://github.com/settings/tokens).
  2. Pilih **Generate new token (classic)** dan centang izin **`repo`**.
  3. Masukkan token tersebut pada tab **Pengaturan** di panel admin. Token tersimpan aman di browser perangkat Anda.

---

## 🛠️ Fitur Utama Aplikasi

1. **📱 Katalog HP Pilihan**:
   - Filter cepat berdasarkan merek (*Semua, iPhone, Samsung, Xiaomi, Vivo, Oppo*).
   - Pencarian instan berdasarkan nama/tipe HP.
   - Status unit **Ready** atau **Sudah Terjual (Sold Out)**.
   - Tombol ramah jempol WhatsApp: otomatis menyertakan nama HP, harga, kondisi, opsi tukar tambah, dan nego.

2. **🛠️ Daftar Biaya Servis HP**:
   - Estimasi biaya transparan (Ganti LCD, Baterai, Konektor Cas, HP Mati Total/Kena Air, dan Software).
   - Indikator durasi (*Bisa Ditunggu*).
   - Jaminan cek awal gratis tanpa biaya pembatalan.

3. **📍 Lokasi Toko & Google Maps**:
   - Tombol **Petunjuk Arah** satu klik untuk membuka rute navigasi langsung di Google Maps HP.
   - Salin alamat toko sekali klik dan jam operasional.

---

## 💻 Menjalankan di Komputer Lokal

```bash
# Install dependensi
npm install

# Jalankan server lokal
npm run dev

# Akses panel admin di lokal
# Buka http://localhost:5173/#/kelola-konter-rahasia (PIN: 8899)

# Build untuk produksi
npm run build
```
