import React from 'react';
import { STORE_INFO } from '../data/storeInfo';
import { Phone, MapPin, ShieldCheck, Clock } from 'lucide-react';

interface HeaderProps {
  onGoToLocation: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onGoToLocation }) => {
  return (
    <header className="sticky top-0 z-30 bg-neutral-900/95 backdrop-blur-md border-b border-neutral-800">
      {/* Top Banner Notice */}
      <div className="bg-emerald-600 text-white text-[11px] font-semibold py-1.5 px-3 text-center flex items-center justify-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
        <span>Melayani Jual Beli HP, Tukar Tambah & Servis di Pulokulon, Grobogan</span>
      </div>

      <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-black text-lg shadow-md shadow-emerald-900/30">
            M
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-sm font-bold text-white tracking-tight leading-none">
                {STORE_INFO.name}
              </h1>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="flex items-center gap-2 mt-1 text-[11px] text-neutral-400">
              <span className="flex items-center text-amber-400 font-semibold">
                ★ {STORE_INFO.rating}
                <span className="text-neutral-500 ml-1">({STORE_INFO.totalReviews})</span>
              </span>
              <span>•</span>
              <span className="flex items-center text-emerald-400 font-medium">
                <Clock className="w-3 h-3 mr-1 inline" />
                Buka
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={onGoToLocation}
            className="p-2 rounded-xl bg-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-700 transition flex items-center justify-center"
            title="Lokasi Google Maps"
          >
            <MapPin className="w-4 h-4 text-rose-400" />
          </button>
          <a
            href={`https://wa.me/${STORE_INFO.phoneWa}?text=${encodeURIComponent('Halo Multi Pusat Service HP Pulokulon, saya mau konsultasi...')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition flex items-center justify-center shadow-sm"
            title="Chat WhatsApp"
          >
            <Phone className="w-4 h-4" />
          </a>
        </div>
      </div>
    </header>
  );
};
