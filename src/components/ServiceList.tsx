import React from 'react';
import { ServiceItem } from '../types';
import { STORE } from '../data/storeInfo';
import { Wrench, Clock, MessageCircle, CheckCircle } from 'lucide-react';

interface ServiceListProps {
  services: ServiceItem[];
}

export const ServiceList: React.FC<ServiceListProps> = ({ services }) => {
  const handleServiceWA = (srv: ServiceItem) => {
    const text = `Halo Multi Service HP Pulokulon,\nSaya mau konsultasi servis HP:\n\n*Kendala:* ${srv.name}\n\nKira-kira untuk tipe HP saya biayanya berapa ya min dan apakah sparepartnya ready?`;
    window.open(`https://wa.me/${STORE.phoneWa}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="space-y-4">
      {/* Intro card */}
      <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4">
        <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
          <Wrench className="w-4 h-4 text-emerald-600" />
          <span>Servis HP Cepat & Bergaransi di Pulokulon</span>
        </div>
        <p className="text-xs text-emerald-900/80 mt-1 leading-relaxed">
          Pengerjaan bisa ditunggu langsung di toko untuk ganti LCD dan baterai. Pengecekan awal gratis tanpa biaya pembatalan.
        </p>

        <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
          <div className="bg-white p-2 rounded-xl shadow-xs border border-emerald-100">
            <span className="font-bold text-emerald-700 block">Bisa Ditunggu</span>
            <span className="text-[11px] text-slate-500">LCD & Baterai</span>
          </div>
          <div className="bg-white p-2 rounded-xl shadow-xs border border-emerald-100">
            <span className="font-bold text-emerald-700 block">Cek Gratis</span>
            <span className="text-[11px] text-slate-500">Tanpa Biaya Batal</span>
          </div>
          <div className="bg-white p-2 rounded-xl shadow-xs border border-emerald-100">
            <span className="font-bold text-emerald-700 block">Ada Garansi</span>
            <span className="text-[11px] text-slate-500">Toko 30 Hari</span>
          </div>
        </div>
      </div>

      {/* Services list */}
      <div className="space-y-3">
        {services.map((srv) => (
          <div
            key={srv.id}
            className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow space-y-2.5"
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-bold text-slate-900 text-sm">{srv.name}</h3>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 shrink-0">
                {srv.priceEstimate}
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {srv.description}
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <span className="text-[11px] text-slate-500 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{srv.duration}</span>
              </span>

              <button
                onClick={() => handleServiceWA(srv)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-1.5 px-3 rounded-xl flex items-center gap-1.5 shadow-sm transition"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Tanya Biaya</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Trust points */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-2 text-xs text-slate-600">
        <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-1">
          Kenapa Servis di Multi Service HP?
        </h4>
        <div className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Biaya diinfokan di awal sebelum dikerjakan (transparan).</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Data pribadi di HP aman & tidak dihapus kecuali perlu instal ulang.</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Sparepart berkualitas & bergaransi toko jika ada kendala pasca-servis.</span>
        </div>
      </div>
    </div>
  );
};
