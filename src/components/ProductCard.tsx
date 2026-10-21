import React from 'react';
import { Product } from '../types';
import { STORE_INFO } from '../data/storeInfo';
import { Shield, Battery, CheckCircle2, MessageCircle } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onTradeInWith: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect, onTradeInWith }) => {
  const formatIDR = (num: number) => {
    return 'Rp ' + num.toLocaleString('id-ID');
  };

  const handleBuyWA = (e: React.MouseEvent) => {
    e.stopPropagation();
    const msg = `Halo Admin ${STORE_INFO.name},\nSaya tertarik dengan unit:\n*${product.name}*\nHarga: ${formatIDR(product.price)}\nKondisi: ${product.condition}\nKelengkapan: ${product.completeness}\n\nApakah unit ini masih ready?`;
    window.open(`https://wa.me/${STORE_INFO.phoneWa}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div
      onClick={() => onSelect(product)}
      className="bg-neutral-800/80 hover:bg-neutral-800 border border-neutral-700/70 hover:border-neutral-600 rounded-2xl overflow-hidden transition-all duration-200 cursor-pointer flex flex-col group shadow-sm"
    >
      {/* Image Area */}
      <div className="relative aspect-[4/3] bg-neutral-900 overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          <span className="bg-neutral-900/85 backdrop-blur-md text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-md border border-emerald-500/30">
            {product.condition}
          </span>
          {product.isHot && (
            <span className="bg-rose-600/90 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded">
              Paling Dicari
            </span>
          )}
        </div>

        {product.batteryHealth && (
          <div className="absolute top-2 right-2 bg-neutral-900/85 backdrop-blur-md text-neutral-300 text-[10px] font-semibold px-1.5 py-0.5 rounded flex items-center gap-1 border border-neutral-700">
            <Battery className="w-3 h-3 text-emerald-400" />
            <span>BH {product.batteryHealth}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] text-neutral-400 font-medium">
            <span>{product.brand}</span>
            <span>•</span>
            <span className="text-neutral-300">{product.storage}</span>
            {product.ram && <span>({product.ram} RAM)</span>}
          </div>

          <h3 className="font-bold text-sm text-neutral-100 mt-1 line-clamp-1 group-hover:text-emerald-400 transition-colors">
            {product.name}
          </h3>

          <div className="mt-2 text-xs space-y-1">
            <div className="flex items-center gap-1 text-[11px] text-neutral-400">
              <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
              <span className="truncate">{product.completeness}</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-neutral-400">
              <Shield className="w-3 h-3 text-blue-400 shrink-0" />
              <span className="truncate">{product.warranty}</span>
            </div>
          </div>
        </div>

        {/* Pricing & CTA */}
        <div className="mt-3 pt-2.5 border-t border-neutral-700/60">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-extrabold text-emerald-400">
              {formatIDR(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-[11px] text-neutral-500 line-through">
                {formatIDR(product.originalPrice)}
              </span>
            )}
          </div>

          <div className="mt-2.5 grid grid-cols-2 gap-1.5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onTradeInWith(product);
              }}
              className="text-[11px] font-semibold bg-neutral-700/60 hover:bg-neutral-700 text-neutral-200 py-1.5 px-2 rounded-lg transition text-center"
            >
              Tukar Tambah
            </button>
            <button
              onClick={handleBuyWA}
              className="text-[11px] font-bold bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white py-1.5 px-2 rounded-lg transition flex items-center justify-center gap-1 shadow-sm"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Tanya WA</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
