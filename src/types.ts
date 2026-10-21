export type Category = 'all' | 'iphone' | 'samsung' | 'xiaomi' | 'oppo-vivo';

export type ProductCondition = 'Baru' | 'Like New (99%)' | 'Mulus (95-98%)' | 'Normal Pemakaian';

export interface Product {
  id: string;
  name: string;
  brand: 'iPhone' | 'Samsung' | 'Xiaomi' | 'Oppo' | 'Vivo' | 'Infinix';
  category: 'iphone' | 'samsung' | 'xiaomi' | 'oppo-vivo';
  price: number;
  originalPrice?: number;
  storage: string;
  ram?: string;
  color: string;
  condition: ProductCondition;
  batteryHealth?: string;
  warranty: string;
  completeness: 'Fullset Dus Ori' | 'Fullset OEM' | 'Unit Saja (Batangan)';
  images: string[];
  specs: {
    screen: string;
    chipset: string;
    camera: string;
    battery: string;
    network: string;
  };
  features: string[];
  isAvailable: boolean;
  isHot?: boolean;
}

export type ActiveTab = 'katalog' | 'tukar-tambah' | 'servis' | 'lokasi';

export interface RepairOption {
  id: string;
  name: string;
  description: string;
  estimatedTime: string;
  priceRange: string;
  warrantyDays: number;
}
