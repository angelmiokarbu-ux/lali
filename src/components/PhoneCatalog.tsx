import React, { useState } from 'react';
import { PhoneItem, BrandCategory } from '../types';
import { STORE } from '../data/storeInfo';
import { MessageCircle, RefreshCw, Search, ShieldCheck } from 'lucide-react';

interface PhoneCatalogProps {
  items: PhoneItem[];
}

export const PhoneCatalog: React.FC<PhoneCatalogProps> = ({ items }) => {
  const [selectedBrand, setSelectedBrand] = useState<BrandCategory>('semua');
  const [search, setSearch] = useState('');

  const brands: BrandCategory[] = ['semua', 'iPhone', 'Samsung', 'Xiaomi', 'Oppo', 'Vivo'];

  const filteredItems = items.filter((item) => {
    const matchBrand = selectedBrand === 'semua' || item.brand.toLowerCase() === selectedBrand.toLowerCase();
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    return matchBrand && matchSearch;
  });

  const handleAskWA = (item: PhoneItem) => {
    const text = `Halo Multi Service HP Pulokulon,\nSaya mau tanya unit HP ini:\n\n*${item.name}*\nHarga: Rp ${item.price.toLocaleString('id-ID')}\nKondisi: ${item.condition}\n\nApakah unit ini masih ada di toko?`;
    window.open(`https://wa.me/${STORE.phoneWa}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleTradeInWA = (item: PhoneItem) => {
    const text = `Halo Multi Service HP Pulokulon,\nSaya mau *Tukar Tambah* HP lama saya dengan:\n*${item.name}* (Rp ${item.price.toLocaleString('id-ID')})\n\nKira-kira prosedurnya bagaimana ya min?`;
    window.open(`https://wa.me/${STORE.phoneWa}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="space-y-4">
      {/* Search box */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari tipe HP (contoh: iPhone 11, Samsung S23)..."
          className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 shadow-sm"
        />
      </div>

      {/* Brand pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
        {brands.map((b) => (
          <button
            key={b}
            onClick={() => setSelectedBrand(b)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedBrand === b
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {b === 'semua' ? 'Semua Merek' : b}
          </button>
        ))}
      </div>

      {/* Catalog count */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>Menampilkan <strong>{filteredItems.length}</strong> unit pilihan</span>
        <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-medium border border-emerald-100">
          ✓ Bisa Cek & Tes di Toko
        </span>
      </div>

      {/* Product list */}
      <div className="space-y-3.5">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-slate-200 rounded-2xl p-3.5 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row gap-3.5"
          >
            {/* Image */}
            <div className="w-full sm:w-36 h-48 sm:h-auto rounded-xl bg-slate-100 overflow-hidden shrink-0 relative">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <span className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                {item.condition}
              </span>
            </div>

            {/* Details */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold text-emerald-600 tracking-wide uppercase">
                  {item.brand}
                </span>
                <h3 className="font-extrabold text-slate-900 text-base leading-snug mt-0.5">
                  {item.name}
                </h3>

                {/* Price */}
                <div className="mt-2">
                  <span className="text-lg font-black text-emerald-700">
                    Rp {item.price.toLocaleString('id-ID')}
                  </span>
                </div>

                {/* Info list */}
                <div className="mt-2 text-xs text-slate-600 space-y-1">
                  <p>📦 <strong>Kelengkapan:</strong> {item.completeness}</p>
                  <p className="flex items-center gap-1 text-slate-700 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>{item.warranty}</span>
                  </p>
                  {item.highlight && (
                    <p className="text-[11px] text-slate-500 bg-slate-50 p-1.5 rounded-lg border border-slate-100 mt-1.5">
                      💡 {item.highlight}
                    </p>
                  )}
                </div>
              </div>

              {/* Action buttons */}
              <div className="mt-3.5 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleTradeInWA(item)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold py-2 px-2.5 rounded-xl flex items-center justify-center gap-1.5 transition"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Tukar Tambah</span>
                </button>
                <button
                  onClick={() => handleAskWA(item)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2 px-2.5 rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Tanya via WA</span>
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredItems.length === 0 && (
          <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-500">
            <p className="font-semibold text-slate-700">Tipe HP tidak ditemukan</p>
            <p className="text-xs mt-1">Coba gunakan kata kunci lain atau langsung hubungi kami lewat WhatsApp untuk request tipe HP.</p>
          </div>
        )}
      </div>
    </div>
  );
};
