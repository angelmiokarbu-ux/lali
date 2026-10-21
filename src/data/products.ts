import { Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'ip-13-128',
    name: 'iPhone 13 128GB Midnight',
    brand: 'iPhone',
    category: 'iphone',
    price: 7950000,
    originalPrice: 8800000,
    storage: '128 GB',
    color: 'Midnight Black',
    condition: 'Mulus (95-98%)',
    batteryHealth: '88%',
    warranty: 'Garansi Toko 30 Hari',
    completeness: 'Fullset Dus Ori',
    images: [
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&q=80',
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=600&q=80'
    ],
    specs: {
      screen: '6.1" Super Retina XDR OLED',
      chipset: 'Apple A15 Bionic (5nm)',
      camera: 'Dual 12MP (Wide + Ultra Wide, OIS)',
      battery: '3240 mAh (BH 88% Original Awet)',
      network: '5G All Operator Resmi'
    },
    features: ['Face ID Normal Responsif', 'TrueTone Aktif', 'Kamera Jernih No Dust', '3uTools Ijo Semua 100%'],
    isAvailable: true,
    isHot: true
  },
  {
    id: 'ip-11-64',
    name: 'iPhone 11 64GB Black Resmi iBox',
    brand: 'iPhone',
    category: 'iphone',
    price: 4100000,
    originalPrice: 4600000,
    storage: '64 GB',
    color: 'Black',
    condition: 'Mulus (95-98%)',
    batteryHealth: '85%',
    warranty: 'Garansi Toko 30 Hari',
    completeness: 'Fullset OEM',
    images: [
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=600&q=80'
    ],
    specs: {
      screen: '6.1" Liquid Retina IPS',
      chipset: 'Apple A13 Bionic',
      camera: 'Dual 12MP Ultra Wide',
      battery: '3110 mAh (BH 85% Sehat)',
      network: '4G LTE Resmi Indonesia (PA/A)'
    },
    features: ['Sinyal Permanen Tanpa Blokir', 'Layar Original', 'Face ID Lancar', 'Kamera Bening'],
    isAvailable: true,
    isHot: false
  },
  {
    id: 'sam-s23-256',
    name: 'Samsung Galaxy S23 5G 8/256GB',
    brand: 'Samsung',
    category: 'samsung',
    price: 8650000,
    originalPrice: 9900000,
    storage: '256 GB',
    ram: '8 GB',
    color: 'Botanic Green',
    condition: 'Like New (99%)',
    warranty: 'Garansi Resmi SEIN s/d Nov 2026',
    completeness: 'Fullset Dus Ori',
    images: [
      'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&q=80'
    ],
    specs: {
      screen: '6.1" Dynamic AMOLED 2X 120Hz',
      chipset: 'Snapdragon 8 Gen 2 for Galaxy',
      camera: 'Triple 50MP + 10MP Tele 3x + 12MP Ultrawide',
      battery: '3900 mAh Fast Charging 25W',
      network: 'Dual SIM 5G SEIN'
    },
    features: ['Fisik 99% Mulus Nyaris Baru', 'Layar Bersih No Shadow No Greenline', 'Kamera Zoom Jernih'],
    isAvailable: true,
    isHot: true
  },
  {
    id: 'sam-a54-128',
    name: 'Samsung Galaxy A54 5G 8/128GB',
    brand: 'Samsung',
    category: 'samsung',
    price: 3750000,
    originalPrice: 4200000,
    storage: '128 GB',
    ram: '8 GB',
    color: 'Awesome Violet',
    condition: 'Mulus (95-98%)',
    warranty: 'Garansi Toko 30 Hari',
    completeness: 'Fullset Dus Ori',
    images: [
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600&q=80'
    ],
    specs: {
      screen: '6.4" Super AMOLED 120Hz',
      chipset: 'Exynos 1380 (5nm)',
      camera: '50MP OIS + 12MP Ultrawide + 5MP Macro',
      battery: '5000 mAh Awet Seharian',
      network: '5G SEIN Indonesia'
    },
    features: ['IP67 Tahan Air & Debu', 'Speaker Stereo Kencang', 'Fingerprint Di Layar'],
    isAvailable: true,
    isHot: false
  },
  {
    id: 'redmi-n12pro-256',
    name: 'Redmi Note 12 Pro 5G 8/256GB',
    brand: 'Xiaomi',
    category: 'xiaomi',
    price: 2650000,
    originalPrice: 3100000,
    storage: '256 GB',
    ram: '8 GB',
    color: 'Sky Blue',
    condition: 'Mulus (95-98%)',
    warranty: 'Garansi Toko 30 Hari',
    completeness: 'Fullset Dus Ori',
    images: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&q=80'
    ],
    specs: {
      screen: '6.67" Flow AMOLED 120Hz Dolby Vision',
      chipset: 'MediaTek Dimensity 1080 (6nm)',
      camera: '50MP Sony IMX766 OIS Flagship',
      battery: '5000 mAh + Fast Charging 67W',
      network: 'Dual SIM 5G Resmi Xiaomi ID'
    },
    features: ['Charger 67W Bawaan Asli', 'Sensor Kamera Kelas Flagship', 'NFC Aktif'],
    isAvailable: true,
    isHot: true
  },
  {
    id: 'vivo-v27-256',
    name: 'Vivo V27 5G 8/256GB Aura Light',
    brand: 'Vivo',
    category: 'oppo-vivo',
    price: 3350000,
    originalPrice: 3800000,
    storage: '256 GB',
    ram: '8 GB',
    color: 'Noble Black',
    condition: 'Mulus (95-98%)',
    warranty: 'Garansi Toko 30 Hari',
    completeness: 'Fullset Dus Ori',
    images: [
      'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=600&q=80'
    ],
    specs: {
      screen: '6.78" 3D Curved AMOLED 120Hz',
      chipset: 'Dimensity 7200 (4nm Hemat Daya)',
      camera: '50MP Sony IMX766V OIS + Aura Light Portrait',
      battery: '4600 mAh FlashCharge 66W',
      network: '5G Resmi Indonesia'
    },
    features: ['Layar Lengkung Mewah', 'Hasil Foto Portrait Studio', 'Bodi Sangat Tipis & Elegan'],
    isAvailable: true,
    isHot: false
  }
];

export const REPAIR_SERVICES = [
  {
    id: 'ganti-lcd',
    name: 'Ganti Layar LCD / Touchscreen',
    category: 'Hardware',
    estTime: '30 - 60 Menit (Bisa Ditunggu)',
    priceStarting: 'Mulai Rp 150.000',
    description: 'Solusi untuk LCD pecah, bergaris, sentuh error, atau blank hitam. Tersedia opsi Original & OEM kualitas terbaik dengan garansi.',
    warranty: 'Garansi 30 Hari'
  },
  {
    id: 'ganti-baterai',
    name: 'Ganti Baterai HP (Baterai Drop/Kembung)',
    category: 'Hardware',
    estTime: '20 - 45 Menit (Bisa Ditunggu)',
    priceStarting: 'Mulai Rp 120.000',
    description: 'Baterai cepat habis, restart sendiri, atau kembung? Ganti baterai baru berkapasitas presisi & aman untuk mesin.',
    warranty: 'Garansi 30 Hari'
  },
  {
    id: 'mati-total',
    name: 'Servis HP Mati Total / Masuk Air',
    category: 'Mesin (IC)',
    estTime: '1 - 3 Hari (Analisa Teliti)',
    priceStarting: 'Cek Gratis / Sesuai Kerusakan',
    description: 'Pengecekan jalur power, IC Power, short circuit karena air atau benturan. Tanpa biaya jika batal setelah dicek.',
    warranty: 'Garansi 30 Hari'
  },
  {
    id: 'konektor-cas',
    name: 'Konektor Cas (Port Charger / Fleksibel)',
    category: 'Hardware',
    estTime: '30 Menit (Bisa Ditunggu)',
    priceStarting: 'Mulai Rp 75.000',
    description: 'HP tidak mau mengisi daya, harus ditekuk, atau lambat mengisi? Penggantian port Type-C/Lightning/Micro.',
    warranty: 'Garansi 30 Hari'
  },
  {
    id: 'software-bypass',
    name: 'Software, Bootloop & Lupa Akun',
    category: 'Software',
    estTime: '1 - 2 Jam',
    priceStarting: 'Mulai Rp 80.000',
    description: 'HP stuck logo, restart berulang, lupa pola/sandi/akun Google (FRP) dengan syarat verifikasi kepemilikan unit sah.',
    warranty: 'Garansi Berjalan'
  }
];
