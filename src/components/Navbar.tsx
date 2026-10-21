import React from 'react';
import { STORE } from '../data/storeInfo';
import { MessageCircle } from 'lucide-react';

interface NavbarProps {
  onOpenLocation?: () => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200/80 shadow-xs">
      <div className="max-w-xl mx-auto px-4 py-2.5 flex items-center justify-between">
        {/* Brand identity */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white font-black flex items-center justify-center text-base shadow-xs shrink-0">
            M
          </div>
          <div>
            <h1 className="font-extrabold text-sm text-slate-900 leading-tight">
              {STORE.name}
            </h1>
            <p className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-medium text-emerald-700">{STORE.locationBrief}</span>
              <span>•</span>
              <span>Buka Tiap Hari</span>
            </p>
          </div>
        </div>

        {/* WhatsApp quick contact */}
        <a
          href={`https://wa.me/${STORE.phoneWa}?text=${encodeURIComponent('Halo Multi Service HP Pulokulon, saya mau tanya...')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-xs transition shrink-0"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>Chat WA</span>
        </a>
      </div>
    </header>
  );
};
