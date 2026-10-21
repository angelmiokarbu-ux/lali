import React, { useState } from 'react';
import { Product } from '../types';
import { STORE_INFO } from '../data/storeInfo';
import { Calculator, Send, Sparkles, Check } from 'lucide-react';

interface TradeInViewProps {
  products: Product[];
  targetProduct?: Product | null;
  onClearTargetProduct: () => void;
}

export const TradeInView: React.FC<TradeInViewProps> = ({
  products,
  targetProduct,
  onClearTargetProduct
}) => {
  const [userBrand, setUserBrand] = useState('Apple / iPhone');
  const [userModel, setUserModel] = useState('');
  const [userStorage, setUserStorage] = useState('128 GB');
  const [userCondition, setUserCondition] = useState('Mulus (95-98%)');
  const [userCompleteness, setUserCompleteness] = useState('Fullset (Dus + Charger)');
  const [userNotes, setUserNotes] = useState('');
  const [selectedTargetId, setSelectedTargetId] = useState<string>(targetProduct ? targetProduct.id : '');
  const [tradeType, setTradeType] = useState<'tukar-tambah' | 'jual-langsung'>('tukar-tambah');

  const selectedTarget = products.find((p) => p.id === selectedTargetId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userModel.trim()) {
      alert('Mohon isi tipe HP lama Anda terlebih dahulu');
      return;
    }

    let message = '';
    if (tradeType === 'tukar-tambah' && selectedTarget) {
      message = `Halo Admin ${STORE_INFO.name}! 🔄\nSaya ingin *TUKAR TAMBAH* HP:\n\n📱 *HP LAMA SAYA:*\n- Merek: ${userBrand}\n- Tipe: ${userModel}\n- Kapasitas: ${userStorage}\n- Kondisi: ${userCondition}\n- Kelengkapan: ${userCompleteness}\n- Catatan/Minus: ${userNotes || 'Tidak ada minus'}\n\n🎯 *HP TUJUAN YANG DIMINATI:*\n- ${selectedTarget.name} (Rp ${selectedTarget.price.toLocaleString('id-ID')})\n\nKira-kira saya perlu tambah berapa ya min?`;
    } else {
      message = `Halo Admin ${STORE_INFO.name}! 💵\nSaya ingin *JUAL HP (CAIR TUNAI)*:\n\n📱 *DATA HP SAYA:*\n- Merek: ${userBrand}\n- Tipe: ${userModel}\n- Kapasitas: ${userStorage}\n- Kondisi: ${userCondition}\n- Kelengkapan: ${userCompleteness}\n- Catatan/Minus: ${userNotes || 'Tidak ada minus'}\n\nKira-kira ditawar berapa ya min untuk dicek di toko? Terima kasih!`;
    }

    window.open(`https://wa.me/${STORE_INFO.phoneWa}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="space-y-4 pb-6">
      {/* Banner */}
      <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 border border-neutral-700/80 rounded-2xl p-4 shadow-sm">
        <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-1">
          <Calculator className="w-4 h-4" />
          <span>Kalkulator Tukar Tambah & Jual HP</span>
        </div>
        <h2 className="text-lg font-bold text-white">Hitung Taksiran HP Lama Anda</h2>
        <p className="text-xs text-neutral-300 mt-1">
          Bisa tukar tambah ke unit idaman di katalog atau langsung jual cair tunai di konter kami ({STORE_INFO.shortName} Pulokulon).
        </p>

        {/* Tab Toggle */}
        <div className="grid grid-cols-2 gap-2 mt-4 bg-neutral-950 p-1 rounded-xl border border-neutral-800">
          <button
            type="button"
            onClick={() => setTradeType('tukar-tambah')}
            className={`py-2 text-xs font-bold rounded-lg transition ${
              tradeType === 'tukar-tambah'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Tukar Tambah
          </button>
          <button
            type="button"
            onClick={() => {
              setTradeType('jual-langsung');
              onClearTargetProduct();
            }}
            className={`py-2 text-xs font-bold rounded-lg transition ${
              tradeType === 'jual-langsung'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Jual Langsung (Cair Tunai)
          </button>
        </div>
      </div>

      {/* Target Product Badge if selected */}
      {tradeType === 'tukar-tambah' && (
        <div className="bg-neutral-800/80 border border-neutral-700 p-3 rounded-2xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-neutral-300">HP Pilihan Anda di Katalog:</span>
            {selectedTarget && (
              <button
                type="button"
                onClick={onClearTargetProduct}
                className="text-[10px] text-rose-400 hover:underline"
              >
                Ganti Pilihan
              </button>
            )}
          </div>

          <select
            value={selectedTargetId}
            onChange={(e) => setSelectedTargetId(e.target.value)}
            className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
          >
            <option value="">-- Pilih HP Baru / Bekas yang Diincar --</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} - Rp {p.price.toLocaleString('id-ID')}
              </option>
            ))}
          </select>

          {selectedTarget && (
            <div className="mt-2.5 flex items-center gap-3 p-2 bg-neutral-900/60 rounded-xl border border-neutral-800">
              <img
                src={selectedTarget.images[0]}
                alt={selectedTarget.name}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="text-xs">
                <p className="font-bold text-white">{selectedTarget.name}</p>
                <p className="text-emerald-400 font-extrabold text-[11px]">
                  Rp {selectedTarget.price.toLocaleString('id-ID')}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Input Form HP Lama */}
      <form onSubmit={handleSubmit} className="bg-neutral-800/80 border border-neutral-700 p-4 rounded-2xl space-y-3.5">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>Informasi HP Lama Anda</span>
        </h3>

        {/* Brand */}
        <div>
          <label className="block text-[11px] font-medium text-neutral-300 mb-1">Merek HP</label>
          <select
            value={userBrand}
            onChange={(e) => setUserBrand(e.target.value)}
            className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
          >
            <option value="Apple / iPhone">Apple / iPhone</option>
            <option value="Samsung">Samsung</option>
            <option value="Xiaomi / Redmi / Poco">Xiaomi / Redmi / Poco</option>
            <option value="Oppo / Realme">Oppo / Realme</option>
            <option value="Vivo / iQOO">Vivo / iQOO</option>
            <option value="Infinix / Tecno">Infinix / Tecno</option>
            <option value="Lainnya">Merek Lainnya</option>
          </select>
        </div>

        {/* Model */}
        <div>
          <label className="block text-[11px] font-medium text-neutral-300 mb-1">
            Tipe HP Spesifik <span className="text-rose-400">*</span>
          </label>
          <input
            type="text"
            required
            value={userModel}
            onChange={(e) => setUserModel(e.target.value)}
            placeholder="Contoh: iPhone 11 atau Samsung A52"
            className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Storage & Condition */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-[11px] font-medium text-neutral-300 mb-1">Kapasitas</label>
            <select
              value={userStorage}
              onChange={(e) => setUserStorage(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="64 GB">64 GB</option>
              <option value="128 GB">128 GB</option>
              <option value="256 GB">256 GB</option>
              <option value="512 GB / Lebih">512 GB+</option>
              <option value="32 GB / Kurang">&lt; 64 GB</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-neutral-300 mb-1">Kondisi Fisik</label>
            <select
              value={userCondition}
              onChange={(e) => setUserCondition(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="Mulus Banget (98-99%)">Mulus (98-99%)</option>
              <option value="Lecet Pemakaian Wajar">Lecet Wajar (90-95%)</option>
              <option value="Ada Dent / Jamur Casing">Ada Dent / Lecet</option>
              <option value="LCD Retak / Ada Garis">LCD Retak / Garis</option>
            </select>
          </div>
        </div>

        {/* Completeness */}
        <div>
          <label className="block text-[11px] font-medium text-neutral-300 mb-1">Kelengkapan</label>
          <select
            value={userCompleteness}
            onChange={(e) => setUserCompleteness(e.target.value)}
            className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
          >
            <option value="Fullset Dus + Charger Original">Fullset Lengkap (Dus + Charger)</option>
            <option value="Unit HP + Charger Saja">Unit HP + Charger</option>
            <option value="Batangan (Hanya Unit HP)">Batangan (Hanya Unit)</option>
          </select>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-[11px] font-medium text-neutral-300 mb-1">Catatan Tambahan / Minus (Opsional)</label>
          <input
            type="text"
            value={userNotes}
            onChange={(e) => setUserNotes(e.target.value)}
            placeholder="Contoh: Baterai BH 79%, tombol volume agak keras, dll."
            className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Info Box */}
        <div className="p-3 bg-neutral-900/80 rounded-xl border border-neutral-800 text-[11px] text-neutral-400 space-y-1">
          <div className="flex items-center gap-1.5 text-neutral-300 font-semibold">
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span>Pengecekan Transparan di Toko:</span>
          </div>
          <p>
            Harga estimasi akan dikonfirmasi lewat WhatsApp. Unit fisik dicek langsung di toko {STORE_INFO.shortName} dalam 5-10 menit.
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-98 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/40 transition"
        >
          <Send className="w-4 h-4" />
          <span>Kirim Rincian ke WhatsApp Admin</span>
        </button>
      </form>
    </div>
  );
};
