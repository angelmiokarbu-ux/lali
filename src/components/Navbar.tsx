import React, { useState } from 'react';
import { STORE } from '../data/storeInfo';
import { MessageCircle } from 'lucide-react';

interface NavbarProps {
  onOpenLocation?: () => void;
  onOpenAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin }) => {
  const [tapCount, setTapCount] = useState(0);

  // Secret gesture: ketuk logo 4 kali untuk membuka panel admin rahasia
  const handleLogoTap = () => {
    const next = tapCount + 1;
    setTapCount(next);
    if (next >= 4) {
      setTapCount(0);
      onOpenAdmin?.();
    }
    setTimeout(() => setTapCount(0), 3000);
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200/80 shadow-xs">
      <div className="max-w-xl mx-auto px-4 py-2.5 flex items-center justify-between">
        {/* Brand identity with secret tap on logo */}
        <div className="flex items-center gap-2.5 select-none">
          <button
            type="button"
            onClick={handleLogoTap}
            aria-label="Logo Toko"
            className="w-9 h-9 rounded-xl bg-emerald-600 active:scale-95 text-white font-black flex items-center justify-center text-base shadow-xs shrink-0 cursor-pointer"
          >
            M
          </button>
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
