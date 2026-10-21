export type BrandCategory = 'semua' | 'iPhone' | 'Samsung' | 'Xiaomi' | 'Oppo' | 'Vivo';

export interface PhoneItem {
  id: string;
  name: string;
  brand: 'iPhone' | 'Samsung' | 'Xiaomi' | 'Oppo' | 'Vivo';
  price: number;
  condition: string;       // e.g. "Mulus 98% Normal"
  completeness: string;    // e.g. "HP + Dus + Charger"
  warranty: string;        // e.g. "Garansi Toko 1 Bulan"
  image: string;
  highlight?: string;      // e.g. "Baterai Awet, Sinyal Aman"
}

export interface ServiceItem {
  id: string;
  name: string;
  priceEstimate: string;
  duration: string;
  description: string;
}

export type MainTab = 'katalog' | 'servis' | 'lokasi';
