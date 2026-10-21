import React, { useState } from 'react';
import { STORE_INFO } from '../data/storeInfo';
import { MapPin, Navigation, Phone, Clock, Star, Copy, Check, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const LocationView: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(STORE_INFO.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4 pb-6">
      {/* Location Card */}
      <div className="bg-neutral-800/80 border border-neutral-700/80 rounded-2xl overflow-hidden shadow-sm">
        {/* Google Maps Embed / Visual Card */}
        <div className="relative aspect-video w-full bg-neutral-900 border-b border-neutral-700 overflow-hidden">
          <iframe
            title="Google Maps Lokasi Toko"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.394852906371!2d111.007388!3d-7.165125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e70ad00273aee65%3A0x1c2cf4936defb804!2sMulti%20pusat%20service%20hp!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            className="filter grayscale contrast-125 opacity-90 hover:opacity-100 transition-opacity"
          />
          <div className="absolute top-2 left-2 bg-neutral-900/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-bold text-white flex items-center gap-1.5 border border-neutral-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span>Konter Aktif di Maps</span>
          </div>
        </div>

        {/* Store Detail Content */}
        <div className="p-4 space-y-3.5">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white">{STORE_INFO.name}</h2>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-1.5 py-0.5 rounded border border-emerald-500/30">
                Terverifikasi
              </span>
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">{STORE_INFO.tagline}</p>
          </div>

          {/* Address with copy */}
          <div className="bg-neutral-900 p-3 rounded-xl border border-neutral-700/60 flex items-start justify-between gap-2">
            <div className="flex items-start gap-2 text-xs text-neutral-300">
              <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">{STORE_INFO.address}</p>
                <p className="text-[11px] text-neutral-500 mt-0.5">Plus Code: {STORE_INFO.plusCode}</p>
              </div>
            </div>
            <button
              onClick={handleCopyAddress}
              className="p-1.5 rounded-lg bg-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-700 transition shrink-0"
              title="Salin Alamat"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Schedule */}
          <div className="flex items-center gap-2.5 text-xs text-neutral-300 px-1">
            <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong>Jam Operasional:</strong> {STORE_INFO.hours}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <a
              href={STORE_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-sm"
            >
              <Navigation className="w-4 h-4" />
              <span>Petunjuk Arah</span>
            </a>

            <a
              href={`https://wa.me/${STORE_INFO.phoneWa}?text=${encodeURIComponent(`Halo ${STORE_INFO.name}, saya mau tanya rute ke toko di Pulokulon...`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-sm"
            >
              <Phone className="w-4 h-4" />
              <span>Hubungi Toko</span>
            </a>
          </div>
        </div>
      </div>

      {/* Guarantees List */}
      <div className="bg-neutral-800/80 border border-neutral-700/80 rounded-2xl p-4 space-y-3">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Komitmen & Layanan Toko Kami</span>
        </h3>

        <div className="grid grid-cols-1 gap-2.5">
          {STORE_INFO.guarantees.map((item, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-neutral-200 block font-semibold">{item.title}</strong>
                <span className="text-neutral-400 text-[11px] leading-relaxed">{item.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Google Reviews Showcase */}
      <div className="bg-neutral-800/80 border border-neutral-700/80 rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-bold text-white uppercase tracking-wider">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>Ulasan Google Maps</span>
          </div>
          <span className="text-xs font-bold text-amber-400">4.9 / 5.0</span>
        </div>

        <div className="space-y-2 text-xs">
          <div className="bg-neutral-900 p-3 rounded-xl border border-neutral-800 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-neutral-200">Budi Santoso</span>
              <span className="text-amber-400 text-[10px]">★★★★★</span>
            </div>
            <p className="text-[11px] text-neutral-400">
              "Servis LCD Redmi Note 10 cepat banget ditunggu langsung jadi. Orangnya ramah, garansi beneran dikasih. Sukses terus!"
            </p>
          </div>

          <div className="bg-neutral-900 p-3 rounded-xl border border-neutral-800 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-neutral-200">Ahmad Fadli</span>
              <span className="text-amber-400 text-[10px]">★★★★★</span>
            </div>
            <p className="text-[11px] text-neutral-400">
              "Beli iPhone seken di sini mulus no minus sinyal aman gak pernah keblokir. Konter rekomendasi di daerah Pulokulon Grobogan."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
