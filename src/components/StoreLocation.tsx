import React, { useState } from 'react';
import { STORE } from '../data/storeInfo';
import { MapPin, Navigation, Clock, Copy, Check, MessageCircle, Star } from 'lucide-react';

export const StoreLocation: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(STORE.fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Location card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-4">
        <div>
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
            Lokasi Toko Fisik
          </span>
          <h2 className="font-extrabold text-slate-900 text-base mt-0.5">
            {STORE.name}
          </h2>
          <div className="flex items-center gap-1.5 text-xs text-amber-500 font-bold mt-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-slate-700">4.9 di Google Maps</span>
          </div>
        </div>

        {/* Google Map iframe */}
        <div className="w-full h-48 rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
          <iframe
            title="Google Maps Toko"
            src={STORE.embedMapUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
          />
        </div>

        {/* Address */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 flex items-start justify-between gap-2">
          <div className="flex items-start gap-2.5 text-xs text-slate-700">
            <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-900">Alamat Lengkap:</p>
              <p className="mt-0.5 leading-relaxed">{STORE.fullAddress}</p>
            </div>
          </div>

          <button
            onClick={handleCopy}
            className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-slate-900 shadow-2xs shrink-0"
            title="Salin Alamat"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>

        {/* Hours */}
        <div className="flex items-center gap-2 text-xs text-slate-600 px-1">
          <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
          <span><strong>Jam Buka:</strong> {STORE.hours}</span>
        </div>

        {/* Direction buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <a
            href={STORE.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition"
          >
            <Navigation className="w-4 h-4" />
            <span>Petunjuk Arah</span>
          </a>

          <a
            href={`https://wa.me/${STORE.phoneWa}?text=${encodeURIComponent('Halo, saya mau datang ke toko Multi Service HP Pulokulon...')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
