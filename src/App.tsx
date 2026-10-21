import React, { useState } from 'react';
import { MainTab } from './types';
import { PHONE_ITEMS, SERVICE_ITEMS } from './data/products';
import { STORE } from './data/storeInfo';
import { Navbar } from './components/Navbar';
import { PhoneCatalog } from './components/PhoneCatalog';
import { ServiceList } from './components/ServiceList';
import { StoreLocation } from './components/StoreLocation';
import { Smartphone, Wrench, MapPin, MessageCircle } from 'lucide-react';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<MainTab>('katalog');

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans pb-16">
      {/* Top Navbar */}
      <Navbar onOpenLocation={() => setActiveTab('lokasi')} />

      {/* Main Content Area */}
      <main className="max-w-xl w-full mx-auto px-4 py-4 space-y-4 flex-1">
        
        {/* Simple Info Banner */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
          <h2 className="font-bold text-slate-900 text-sm sm:text-base">
            Pusat Jual Beli HP & Servis Pulokulon
          </h2>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            Terima jual beli HP bekas/baru, tukar tambah, dan servis ganti LCD/baterai bergaransi. Bebas cek unit sepuasnya langsung di konter kami.
          </p>
        </div>

        {/* 3 Main Tab Buttons */}
        <div className="grid grid-cols-3 gap-1.5 bg-slate-200/80 p-1.5 rounded-2xl">
          <button
            onClick={() => setActiveTab('katalog')}
            className={`py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'katalog'
                ? 'bg-white text-emerald-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>Katalog HP</span>
          </button>

          <button
            onClick={() => setActiveTab('servis')}
            className={`py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'servis'
                ? 'bg-white text-emerald-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Wrench className="w-4 h-4" />
            <span>Biaya Servis</span>
          </button>

          <button
            onClick={() => setActiveTab('lokasi')}
            className={`py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'lokasi'
                ? 'bg-white text-emerald-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Lokasi Toko</span>
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'katalog' && <PhoneCatalog items={PHONE_ITEMS} />}
        {activeTab === 'servis' && <ServiceList services={SERVICE_ITEMS} />}
        {activeTab === 'lokasi' && <StoreLocation />}

      </main>

      {/* Simple Footer */}
      <footer className="text-center text-xs text-slate-400 py-6 px-4">
        <p className="font-medium text-slate-600">{STORE.name}</p>
        <p className="text-[11px] mt-0.5">{STORE.fullAddress}</p>
      </footer>

      {/* Floating WhatsApp Quick Action Button for Mobile */}
      <a
        href={`https://wa.me/${STORE.phoneWa}?text=${encodeURIComponent('Halo Multi Service HP Pulokulon, saya mau tanya...')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-50 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 px-4 rounded-full shadow-lg flex items-center gap-2 transition transform hover:scale-105 active:scale-95"
      >
        <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
        <span>Chat WhatsApp</span>
      </a>
    </div>
  );
};

export default App;
