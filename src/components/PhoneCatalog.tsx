import React, { useState } from 'react';
import { PhoneItem, BrandCategory } from '../types';
import { STORE } from '../data/storeInfo';
import { MessageCircle, Search, ShieldCheck, Check } from 'lucide-react';

interface PhoneCatalogProps {
  items: PhoneItem[];
}

export const PhoneCatalog: React.FC<PhoneCatalogProps> = ({ items }) => {
  const [selectedBrand, setSelectedBrand] = useState<BrandCategory>('semua');
  const [search, setSearch] = useState('');

  const brands: BrandCategory[] = ['semua', 'iPhone', 'Samsung', 'Xiaomi', 'Vivo', 'Oppo'];

  const filteredItems = items.filter((item) => {
    const matchBrand = selectedBrand === 'semua' || item.brand.toLowerCase() === selectedBrand.toLowerCase();
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    return matchBrand && matchSearch;
  });

  const handleAskWA = (item: PhoneItem) => {
    const text = item.isSold
      ? `Halo Multi Service HP Pulokulon,\nSaya lihat unit ini sudah terjual:\n*${item.name}*\nApakah ada unit serupa atau tipe lain yang ready di harga sekitar ini?`
      : `Halo Multi Service HP Pulokulon,\nSaya tertarik dengan unit ini:\n\n📱 *${item.name}*\n💰 *Harga:* Rp ${item.price.toLocaleString('id-ID')}\n✨ *Kondisi:* ${item.condition}\n📦 *Kelengkapan:* ${item.completeness}\n\nApakah unit ini masih ada di toko? Bisa tukar tambah / nego tipis kah min?`;

    window.open(`https://wa.me/${STORE.phoneWa}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="space-y-3.5">
      {/* Search box */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari HP (contoh: iPhone, Samsung, Redmi)..."
          className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 shadow-xs"
        />
      </div>

      {/* Brand filter buttons */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
        {brands.map((b) => (
          <button
            key={b}
            onClick={() => setSelectedBrand(b)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedBrand === b
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {b === 'semua' ? 'Semua Merek' : b}
          </button>
        ))}
      </div>

      {/* Products summary badge */}
      <div className="flex items-center justify-between text-[11px] text-slate-500 px-1">
        <span>Tersedia <strong>{filteredItems.filter((i) => !i.isSold).length}</strong> unit ready</span>
        <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-medium border border-emerald-100 flex items-center gap-1">
          <Check className="w-3 h-3 text-emerald-600" /> Bebas Cek Unit di Konter
        </span>
      </div>

      {/* Product List */}
      <div className="space-y-3">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className={`bg-white border rounded-2xl p-3 shadow-xs hover:shadow-md transition-shadow flex flex-col sm:flex-row gap-3 ${
              item.isSold ? 'border-slate-200 opacity-75' : 'border-slate-200'
            }`}
          >
            {/* Image */}
            <div className="w-full sm:w-32 h-44 sm:h-36 rounded-xl bg-slate-100 overflow-hidden shrink-0 relative">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <span className={`absolute top-2 left-2 text-white text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-xs ${
                item.isSold ? 'bg-rose-600/90' : 'bg-slate-900/80'
              }`}>
                {item.isSold ? 'SUDAH TERJUAL' : item.condition}
              </span>
            </div>

            {/* Product details */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-emerald-600 tracking-wider uppercase">
                  {item.brand}
                </span>
                <h3 className="font-extrabold text-slate-900 text-sm sm:text-base leading-snug">
                  {item.name}
                </h3>

                {/* Price */}
                <div className="mt-1 flex items-baseline gap-2">
                  <span className={`text-lg font-black ${item.isSold ? 'text-slate-400 line-through' : 'text-emerald-700'}`}>
                    Rp {item.price.toLocaleString('id-ID')}
                  </span>
                  {!item.isSold && (
                    <span className="text-[11px] text-slate-400 font-medium">
                      (Bisa TT / Nego)
                    </span>
                  )}
                </div>

                {/* Condition & Completeness */}
                <div className="mt-1.5 text-xs text-slate-600 space-y-0.5">
                  <p className="text-[11px] text-slate-600">
                    📦 <strong>Kelengkapan:</strong> {item.completeness}
                  </p>
                  <p className="text-[11px] text-slate-700 font-medium flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>{item.warranty}</span>
                  </p>
                  {item.highlight && (
                    <p className="text-[11px] text-slate-500 bg-slate-50 p-1.5 rounded-lg border border-slate-100 mt-1">
                      💡 {item.highlight}
                    </p>
                  )}
                </div>
              </div>

              {/* Single Clear Action Button */}
              <div className="mt-2.5 pt-2 border-t border-slate-100">
                <button
                  onClick={() => handleAskWA(item)}
                  className={`w-full text-white text-xs font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 shadow-xs transition active:scale-[0.98] ${
                    item.isSold
                      ? 'bg-slate-600 hover:bg-slate-700'
                      : 'bg-emerald-600 hover:bg-emerald-700'
                  }`}
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>{item.isSold ? 'Tanyakan Unit Serupa via WA' : 'Tanya Unit / Nego via WA'}</span>
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredItems.length === 0 && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center text-slate-500 space-y-2">
            <p className="font-bold text-slate-800 text-sm">Tipe HP tidak ditemukan</p>
            <p className="text-xs text-slate-500">
              Sedang cari tipe HP lain? Anda bisa langsung chat admin kami di WhatsApp untuk titip cari unit.
            </p>
            <a
              href={`https://wa.me/${STORE.phoneWa}?text=${encodeURIComponent('Halo Multi Service HP Pulokulon, saya sedang mencari tipe HP...')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-emerald-600 text-white font-bold text-xs px-4 py-2 rounded-xl mt-2 shadow-xs"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Request Tipe HP via WA</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
