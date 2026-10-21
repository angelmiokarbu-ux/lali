import React from 'react';
import { ServiceItem } from '../types';
import { STORE } from '../data/storeInfo';
import { Clock, MessageCircle, ShieldCheck } from 'lucide-react';

interface ServiceListProps {
  services: ServiceItem[];
}

export const ServiceList: React.FC<ServiceListProps> = ({ services }) => {
  const handleServiceWA = (srv: ServiceItem) => {
    const text = `Halo Multi Service HP Pulokulon,\nSaya mau konsultasi servis HP:\n\n🛠️ *Kendala:* ${srv.name}\n\nKira-kira untuk tipe HP saya biayanya berapa ya min dan apakah sparepartnya ready?`;
    window.open(`https://wa.me/${STORE.phoneWa}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="space-y-3.5">
      {/* 3 Key Highlights */}
      <div className="grid grid-cols-3 gap-2 text-center text-xs">
        <div className="bg-white border border-slate-200 rounded-xl p-2.5 shadow-2xs">
          <span className="font-extrabold text-emerald-700 block text-xs">Bisa Ditunggu</span>
          <span className="text-[10px] text-slate-500 mt-0.5 block">LCD & Ganti Baterai</span>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-2.5 shadow-2xs">
          <span className="font-extrabold text-emerald-700 block text-xs">Cek Gratis</span>
          <span className="text-[10px] text-slate-500 mt-0.5 block">Tanpa Biaya Batal</span>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-2.5 shadow-2xs">
          <span className="font-extrabold text-emerald-700 block text-xs">Ada Garansi</span>
          <span className="text-[10px] text-slate-500 mt-0.5 block">Garansi Toko Terjamin</span>
        </div>
      </div>

      {/* Services List */}
      <div className="space-y-2.5">
        {services.map((srv) => (
          <div
            key={srv.id}
            className="bg-white border border-slate-200 rounded-2xl p-3.5 shadow-xs hover:shadow-md transition-shadow space-y-2"
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-extrabold text-slate-900 text-sm leading-snug">
                {srv.name}
              </h3>
              <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200 shrink-0">
                {srv.priceEstimate}
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {srv.description}
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100 gap-2">
              <span className="text-[11px] text-slate-500 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{srv.duration}</span>
              </span>

              <button
                onClick={() => handleServiceWA(srv)}
                className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold py-1.5 px-3 rounded-xl flex items-center gap-1.5 shadow-xs transition"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Tanya Biaya</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Trust reassurance banner */}
      <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-3.5 flex items-center gap-3">
        <ShieldCheck className="w-7 h-7 text-emerald-600 shrink-0" />
        <div className="text-xs text-emerald-950">
          <p className="font-bold">Biaya Selalu Diinfokan di Awal</p>
          <p className="text-[11px] text-emerald-800/90 mt-0.5">
            HP dicek dulu secara gratis di konter. Biaya disepakati sebelum teknisi mulai membongkar unit.
          </p>
        </div>
      </div>
    </div>
  );
};
