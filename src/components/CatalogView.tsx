import React, { useState, useMemo } from 'react';
import { Product, Category } from '../types';
import { ProductCard } from './ProductCard';
import { Search, SlidersHorizontal, X } from 'lucide-react';

interface CatalogViewProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onTradeInWith: (product: Product) => void;
}

export const CatalogView: React.FC<CatalogViewProps> = ({
  products,
  onSelectProduct,
  onTradeInWith
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [sortBy, setSortBy] = useState<'recommended' | 'price-low' | 'price-high'>('recommended');

  const categories: { id: Category; label: string }[] = [
    { id: 'all', label: 'Semua Merek' },
    { id: 'iphone', label: 'iPhone' },
    { id: 'samsung', label: 'Samsung' },
    { id: 'xiaomi', label: 'Xiaomi' },
    { id: 'oppo-vivo', label: 'Oppo / Vivo' },
  ];

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
        const matchesSearch =
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.storage.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        return (b.isHot ? 1 : 0) - (a.isHot ? 1 : 0);
      });
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="space-y-3.5 pb-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari iPhone, Samsung, RAM, memori..."
          className="w-full bg-neutral-800/90 border border-neutral-700/80 rounded-2xl pl-10 pr-9 py-2.5 text-xs text-white placeholder-neutral-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition shadow-inner"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Category Pills & Sort */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`text-xs px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-neutral-800/80 text-neutral-400 hover:text-white border border-neutral-700/60'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Status Bar */}
        <div className="flex items-center justify-between text-[11px] text-neutral-400 px-1">
          <span>
            Menampilkan <strong className="text-white">{filteredProducts.length}</strong> unit ready
          </span>

          <div className="flex items-center gap-1.5">
            <SlidersHorizontal className="w-3 h-3 text-neutral-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-neutral-300 font-medium focus:outline-none cursor-pointer"
            >
              <option value="recommended" className="bg-neutral-900">Rekomendasi</option>
              <option value="price-low" className="bg-neutral-900">Harga Terendah</option>
              <option value="price-high" className="bg-neutral-900">Harga Tertinggi</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product List */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
              onTradeInWith={onTradeInWith}
            />
          ))}
        </div>
      ) : (
        <div className="p-8 text-center bg-neutral-800/40 rounded-2xl border border-neutral-700/50 space-y-2">
          <p className="text-sm font-semibold text-neutral-300">Unit tidak ditemukan</p>
          <p className="text-xs text-neutral-500">
            Coba kata kunci lain atau hubungi admin langsung untuk request tipe HP yang Anda cari.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="mt-3 text-xs text-emerald-400 font-bold hover:underline"
          >
            Reset Pencarian
          </button>
        </div>
      )}
    </div>
  );
};
