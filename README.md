# 📱 Multi Pusat Service HP & Gadget - Pulokulon, Grobogan

Web aplikasi modern, responsif, dan *mobile-first* (bukan sekadar landing page statis) untuk bisnis **Jual Beli HP Bekas/Baru, Tukar Tambah, & Servis HP Bergaransi**. Dibangun menggunakan framework **React + TypeScript + Vite + Tailwind CSS** sehingga siap dikembangkan dengan fitur kompleks kapan saja.

📍 **Toko Fisik & Google Maps:**  
[Multi Pusat Service HP, Tawang, Jambon, Kec. Pulokulon, Kabupaten Grobogan, Jawa Tengah](https://maps.app.goo.gl/rPLD1EFEfyfR4hgPA)  
🌐 **Live Website (GitHub Pages):** [https://angelmiokarbu-ux.github.io/lali/](https://angelmiokarbu-ux.github.io/lali/)

---

## 🚀 Fitur Interaktif Web App (Tanpa AI-Slop)

1. **📱 Katalog HP Terverifikasi**:
   - Filter instan berdasarkan merek (*Apple iPhone, Samsung, Xiaomi, Oppo/Vivo*).
   - Urutkan berdasarkan rekomendasi, harga terendah, atau harga tertinggi.
   - Indikator kondisi fisik nyata (*Like New 99%*, *Mulus 95-98%*, *Battery Health*, garansi resmi SEIN/iBox).
   - Modal detail unit lengkap dengan laporan hasil uji Quality Check (QC 30 titik).

2. **🔄 Kalkulator Tukar Tambah & Jual HP**:
   - Form interaktif multi-langkah: input merek, tipe HP lama, kapasitas, kondisi, kelengkapan, dan minus.
   - Pilihan: **Tukar Tambah** ke salah satu unit di katalog atau **Jual Langsung (Cair Tunai)** di konter.
   - Otomatis membuat draf konsultasi lengkap yang siap dikirim langsung ke WhatsApp admin.

3. **🛠️ Pusat Servis HP Bergaransi**:
   - Pilihan servis hardware & software: Ganti LCD (bisa ditunggu), Ganti Baterai, Mati Total / Masuk Air, Konektor Cas, dan Software/Bootloop.
   - Form estimasi biaya & ketersediaan part langsung terhubung ke teknisi via WhatsApp.

4. **📍 Integrasi Google Maps & Profil Toko**:
   - Peta embed lokasi toko fisik di Pulokulon, Grobogan.
   - Tombol cepat **Petunjuk Arah** (langsung membuka navigasi Google Maps).
   - Fitur salin alamat toko sekali klik.
   - Jam operasional dan ulasan pelanggan Google Maps dengan rating 4.9⭐.

---

## 🛠️ Struktur Kode & Arsitektur Framework

```text
lali/
├── .github/workflows/deploy.yml # Auto-deploy CI/CD ke GitHub Pages
├── src/
│   ├── components/
│   │   ├── Header.tsx           # Navbar toko, status buka, & tombol kontak
│   │   ├── BottomNav.tsx        # Navigasi tab bawah mobile-app
│   │   ├── CatalogView.tsx      # Tampilan katalog & filter
│   │   ├── ProductCard.tsx      # Kartu produk dengan detail specs & harga
│   │   ├── ProductModal.tsx     # Modal detail spesifikasi & QC unit
│   │   ├── TradeInView.tsx      # Kalkulator tukar tambah interaktif
│   │   ├── ServiceView.tsx      # Estimator & konsultasi servis HP
│   │   └── LocationView.tsx     # Profil Google Maps & lokasi toko
│   ├── data/
│   │   ├── products.ts          # Mock data produk HP & servis
│   │   └── storeInfo.ts         # Data toko (nama, alamat, no WA, Google Maps)
│   ├── types.ts                 # Definisi tipe data TypeScript
│   ├── App.tsx                  # Controller utama & state tab
│   └── main.tsx                 # Entry point React
├── index.html                   # HTML entry point
├── vite.config.ts               # Konfigurasi Vite & base path GitHub Pages
└── package.json                 # Dependensi proyek
```

---

## ⚙️ Kustomisasi Data Toko & Produk

Untuk mengubah data toko atau daftar produk:
- **Data Toko & Nomor WA**: Buka [`src/data/storeInfo.ts`](src/data/storeInfo.ts) dan perbarui nomor `phoneWa`.
- **Daftar HP**: Buka [`src/data/products.ts`](src/data/products.ts) untuk menambah atau mengubah harga, foto, dan stok HP.

---

## 💻 Menjalankan di Lokal (Development)

```bash
# Install dependensi
npm install

# Jalankan server dev lokal
npm run dev

# Build untuk produksi
npm run build
```

Setiap kali melakukan `git push origin main`, GitHub Actions akan otomatis melakukan build dan memperbarui situs di GitHub Pages tanpa konfigurasi manual tambahan.
