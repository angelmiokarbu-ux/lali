import React from 'react';
import { Product } from '../types';
import { STORE_INFO } from '../data/storeInfo';
import { X, Check, ShieldCheck, MapPin, MessageCircle, RefreshCw, Cpu, Smartphone, Camera, Zap } from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onStartTradeIn: (product: Product) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onStartTradeIn }) => {
  if (!product) return null;

  const formatIDR = (num: number) => 'Rp ' + num.toLocaleString('id-ID');

  const handleWhatsApp = () => {
    const msg = `Halo Admin ${STORE_INFO.name},\nSaya tertarik dengan unit:\n*${product.name}*\nHarga: ${formatIDR(product.price)}\nKondisi: ${product.condition}\nKelengkapan: ${product.completeness}\n\nApakah unit ini masih tersedia dan bisa saya cek langsung di toko?`;
    window.open(`https://wa.me/${STORE_INFO.phoneWa}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-neutral-900 border border-neutral-800 w-full max-w-lg max-h-[90vh] rounded-t-3xl sm:rounded-3xl overflow-hidden flex flex-col shadow-2xl">
        {/* Modal Header */}
        <div className="p-4 border-b border-neutral-800 flex items-center justify-between sticky top-0 bg-neutral-900/95 backdrop-blur-sm z-10">
          <div>
            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
              Detail Unit Terverifikasi
            </span>
            <h2 className="text-base font-bold text-white line-clamp-1">{product.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 overflow-y-auto space-y-4 no-scrollbar">
          {/* Main Image */}
          <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-neutral-950">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3 bg-neutral-900/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-bold text-emerald-400 border border-emerald-500/30">
              Kondisi: {product.condition}
            </div>
            {product.batteryHealth && (
              <div className="absolute top-3 right-3 bg-neutral-900/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-bold text-white border border-neutral-700">
                Battery Health: {product.batteryHealth}
              </div>
            )}
          </div>

          {/* Pricing Card */}
          <div className="bg-neutral-800/80 p-3.5 rounded-2xl border border-neutral-700/60 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-neutral-400 block font-medium">Harga Khusus Toko</span>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-black text-emerald-400">
                  {formatIDR(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-neutral-500 line-through">
                    {formatIDR(product.originalPrice)}
                  </span>
                )}
              </div>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center gap-1 text-[11px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-md font-semibold border border-emerald-500/20">
                <ShieldCheck className="w-3.5 h-3.5" />
                {product.warranty}
              </span>
            </div>
          </div>

          {/* Key Specs Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-neutral-800/50 p-2.5 rounded-xl border border-neutral-700/40">
              <div className="flex items-center gap-1.5 text-neutral-400 mb-1">
                <Smartphone className="w-3.5 h-3.5 text-neutral-300" />
                <span className="text-[11px]">Layar</span>
              </div>
              <p className="font-semibold text-neutral-200 line-clamp-2">{product.specs.screen}</p>
            </div>

            <div className="bg-neutral-800/50 p-2.5 rounded-xl border border-neutral-700/40">
              <div className="flex items-center gap-1.5 text-neutral-400 mb-1">
                <Cpu className="w-3.5 h-3.5 text-neutral-300" />
                <span className="text-[11px]">Prosesor</span>
              </div>
              <p className="font-semibold text-neutral-200 line-clamp-2">{product.specs.chipset}</p>
            </div>

            <div className="bg-neutral-800/50 p-2.5 rounded-xl border border-neutral-700/40">
              <div className="flex items-center gap-1.5 text-neutral-400 mb-1">
                <Camera className="w-3.5 h-3.5 text-neutral-300" />
                <span className="text-[11px]">Kamera</span>
              </div>
              <p className="font-semibold text-neutral-200 line-clamp-2">{product.specs.camera}</p>
            </div>

            <div className="bg-neutral-800/50 p-2.5 rounded-xl border border-neutral-700/40">
              <div className="flex items-center gap-1.5 text-neutral-400 mb-1">
                <Zap className="w-3.5 h-3.5 text-neutral-300" />
                <span className="text-[11px]">Baterai</span>
              </div>
              <p className="font-semibold text-neutral-200 line-clamp-2">{product.specs.battery}</p>
            </div>
          </div>

          {/* Quality Inspection Report */}
          <div className="bg-neutral-800/40 p-3.5 rounded-2xl border border-neutral-700/40">
            <h4 className="text-xs font-bold text-neutral-200 mb-2 flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Pemeriksaan Fungsi (Lolos QC Toko):</span>
            </h4>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              {product.features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-neutral-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>{feat}</span>
                </div>
              ))}
              <div className="flex items-center gap-1.5 text-neutral-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Speaker & Mic Jernih</span>
              </div>
              <div className="flex items-center gap-1.5 text-neutral-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>WiFi & Bluetooth Normal</span>
              </div>
            </div>
          </div>

          {/* Store Location Notice */}
          <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-xl flex items-start gap-2.5 text-xs text-neutral-400">
            <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-neutral-200">Tersedia di Toko Fisik</p>
              <p className="text-[11px] text-neutral-400 mt-0.5">
                Bisa langsung dites dan diambil di toko: {STORE_INFO.address}.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Action Bar */}
        <div className="p-3 bg-neutral-900 border-t border-neutral-800 grid grid-cols-2 gap-2">
          <button
            onClick={() => {
              onClose();
              onStartTradeIn(product);
            }}
            className="py-2.5 px-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Tukar Tambah</span>
          </button>

          <button
            onClick={handleWhatsApp}
            className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-98 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-lg shadow-emerald-900/40"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Tanya via WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};
