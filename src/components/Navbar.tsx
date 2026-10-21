import React from 'react';
import { STORE } from '../data/storeInfo';
import { MessageCircle, MapPin } from 'lucide-react';

interface NavbarProps {
  onOpenLocation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenLocation }) => {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand identity */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-black flex items-center justify-center text-lg shadow-sm">
            M
          </div>
          <div>
            <h1 className="font-extrabold text-sm sm:text-base text-slate-900 leading-tight">
              {STORE.name}
            </h1>
            <p className="text-[12px] text-slate-500 flex items-center gap-1.5 mt-0.5">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="font-medium text-emerald-700">{STORE.locationBrief}</span>
              <span>•</span>
              <span>Buka Setiap Hari</span>
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenLocation}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition flex items-center justify-center"
            title="Lokasi Google Maps"
          >
            <MapPin className="w-4 h-4 text-rose-500" />
          </button>
          
          <a
            href={`https://wa.me/${STORE.phoneWa}?text=${encodeURIComponent('Halo Multi Service HP Pulokulon, saya mau tanya...')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 shadow-sm transition"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat WA</span>
          </a>
        </div>
      </div>
    </header>
  );
};
