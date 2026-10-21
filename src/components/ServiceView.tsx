import React, { useState } from 'react';
import { STORE_INFO } from '../data/storeInfo';
import { REPAIR_SERVICES } from '../data/products';
import { Wrench, Shield, Clock, Send } from 'lucide-react';

export const ServiceView: React.FC = () => {
  const [phoneType, setPhoneType] = useState('');
  const [selectedService, setSelectedService] = useState('Ganti Layar LCD / Touchscreen');
  const [issueDetail, setIssueDetail] = useState('');

  const handleConsultService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneType.trim()) {
      alert('Silakan tulis tipe HP Anda terlebih dahulu');
      return;
    }

    const message = `Halo Teknisi ${STORE_INFO.name}! 🔧\nSaya mau konsultasi / tanya servis HP:\n\n📱 *Tipe HP:* ${phoneType}\n🛠️ *Keluhan / Layanan:* ${selectedService}\n📝 *Detail Kendala:* ${issueDetail || 'Belum ada detail tambahan'}\n\nApakah sparepart tersedia dan bisa dikerjakan di toko Pulokulon? Berapa estimasi biayanya? Terima kasih!`;

    window.open(`https://wa.me/${STORE_INFO.phoneWa}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="space-y-4 pb-6">
      {/* Banner */}
      <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 border border-neutral-700/80 rounded-2xl p-4 shadow-sm">
        <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-1">
          <Wrench className="w-4 h-4" />
          <span>Pusat Servis HP Pulokulon</span>
        </div>
        <h2 className="text-lg font-bold text-white">Servis Hardware & Software Bergaransi</h2>
        <p className="text-xs text-neutral-300 mt-1">
          Dikerjakan langsung oleh teknisi berpengalaman. Pengecekan awal transparan dan bergaransi toko hingga 30 hari.
        </p>

        <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[10px]">
          <div className="bg-neutral-900/80 p-2 rounded-xl border border-neutral-800">
            <span className="text-emerald-400 font-bold block text-xs">Bisa Ditunggu</span>
            <span className="text-neutral-400">LCD & Baterai</span>
          </div>
          <div className="bg-neutral-900/80 p-2 rounded-xl border border-neutral-800">
            <span className="text-emerald-400 font-bold block text-xs">Cek Gratis</span>
            <span className="text-neutral-400">Tanpa Biaya Batal</span>
          </div>
          <div className="bg-neutral-900/80 p-2 rounded-xl border border-neutral-800">
            <span className="text-emerald-400 font-bold block text-xs">Garansi 30 Hari</span>
            <span className="text-neutral-400">Sparepart & Mesin</span>
          </div>
        </div>
      </div>

      {/* Repair Cost Form */}
      <form onSubmit={handleConsultService} className="bg-neutral-800/80 border border-neutral-700 p-4 rounded-2xl space-y-3">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-emerald-400" />
          <span>Cek Estimasi Biaya & Ketersediaan Part</span>
        </h3>

        <div>
          <label className="block text-[11px] font-medium text-neutral-300 mb-1">
            Tipe HP Anda <span className="text-rose-400">*</span>
          </label>
          <input
            type="text"
            required
            value={phoneType}
            onChange={(e) => setPhoneType(e.target.value)}
            placeholder="Contoh: Redmi Note 10 Pro / iPhone 11 / Oppo A54"
            className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div>
          <label className="block text-[11px] font-medium text-neutral-300 mb-1">
            Pilih Jenis Kendala / Servis
          </label>
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
          >
            {REPAIR_SERVICES.map((srv) => (
              <option key={srv.id} value={srv.name}>
                {srv.name} ({srv.priceStarting})
              </option>
            ))}
            <option value="Kendala Lainnya">Kendala Lainnya (Konsultasi Langsung)</option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-medium text-neutral-300 mb-1">
            Jelaskan Kronologi / Kondisi HP (Opsional)
          </label>
          <textarea
            rows={2}
            value={issueDetail}
            onChange={(e) => setIssueDetail(e.target.value)}
            placeholder="Contoh: Jatuh dari motor lalu layar gelap tapi masih ada getar/suara telpon."
            className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-98 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30 transition"
        >
          <Send className="w-4 h-4" />
          <span>Konsultasi Biaya ke Teknisi via WA</span>
        </button>
      </form>

      {/* Service List Details */}
      <div className="space-y-2.5">
        <h3 className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
          Daftar Layanan Servis Populer
        </h3>

        {REPAIR_SERVICES.map((srv) => (
          <div
            key={srv.id}
            className="bg-neutral-800/60 border border-neutral-700/60 rounded-xl p-3 text-xs space-y-1.5"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-sm">{srv.name}</span>
              <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                {srv.priceStarting}
              </span>
            </div>

            <p className="text-[11px] text-neutral-400 leading-relaxed">{srv.description}</p>

            <div className="flex items-center justify-between pt-1 text-[10px] text-neutral-500 border-t border-neutral-700/40">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-neutral-400" />
                {srv.estTime}
              </span>
              <span className="flex items-center gap-1 text-blue-400 font-medium">
                <Shield className="w-3 h-3" />
                {srv.warranty}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
