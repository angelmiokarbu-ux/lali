export type BrandCategory = 'semua' | 'iPhone' | 'Samsung' | 'Xiaomi' | 'Oppo' | 'Vivo' | 'Infinix' | 'Lainnya';

export interface PhoneItem {
  id: string;
  name: string;
  brand: string;
  price: number;
  condition: string;       // e.g. "Mulus 98% Seperti Baru"
  completeness: string;    // e.g. "HP + Dus + Charger"
  warranty: string;        // e.g. "Garansi Toko 1 Bulan"
  image: string;           // URL gambar (GitHub raw / CDN / external)
  highlight?: string;      // e.g. "Baterai Awet, Sinyal Aman"
  isSold?: boolean;        // Status sudah laku atau masih ready
}

export interface ServiceItem {
  id: string;
  name: string;
  priceEstimate: string;
  duration: string;
  description: string;
}

export type MainTab = 'katalog' | 'servis' | 'lokasi';

export interface AdminSettings {
  githubToken: string;
  repoOwner: string;
  repoName: string;
  branch: string;
  secretSlug: string;
  pin: string;
}
