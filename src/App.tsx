import React, { useState, useEffect } from 'react';
import { MainTab, PhoneItem, AdminSettings } from './types';
import { PHONE_ITEMS, SERVICE_ITEMS } from './data/products';
import { STORE } from './data/storeInfo';
import { Navbar } from './components/Navbar';
import { PhoneCatalog } from './components/PhoneCatalog';
import { ServiceList } from './components/ServiceList';
import { StoreLocation } from './components/StoreLocation';
import { AdminPanel } from './components/AdminPanel';
import { getAdminSettings, loadProducts } from './services/githubStorage';
import { Smartphone, Wrench, MapPin, MessageCircle } from 'lucide-react';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<MainTab>('katalog');
  const [products, setProducts] = useState<PhoneItem[]>(PHONE_ITEMS);
  const [settings, setSettings] = useState<AdminSettings>(getAdminSettings());
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);

  // Check URL hash for secret admin route
  useEffect(() => {
    const checkAdminRoute = () => {
      const currentSlug = window.location.hash.replace(/^#\/?/, '');
      if (currentSlug && currentSlug === settings.secretSlug) {
        setIsAdminMode(true);
      } else {
        setIsAdminMode(false);
      }
    };

    checkAdminRoute();
    window.addEventListener('hashchange', checkAdminRoute);
    return () => window.removeEventListener('hashchange', checkAdminRoute);
  }, [settings.secretSlug]);

  // Load latest dynamic products from storage / cache
  useEffect(() => {
    loadProducts().then((loaded) => {
      if (loaded && loaded.length > 0) {
        setProducts(loaded);
      }
    });
  }, []);

  const handleBackToStore = () => {
    window.location.hash = '';
    setIsAdminMode(false);
  };

  // --- RENDER ADMIN PANEL JIKA MASUK LEWAT LINK RAHASIA ---
  if (isAdminMode) {
    return (
      <AdminPanel
        products={products}
        settings={settings}
        onUpdateProducts={setProducts}
        onUpdateSettings={setSettings}
        onBackToStore={handleBackToStore}
      />
    );
  }

  // --- RENDER WEB TOKO PUBLIK UNTUK PENGUNJUNG BIASA ---
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans pb-20">
      {/* Top Navbar Toko */}
      <Navbar onOpenLocation={() => setActiveTab('lokasi')} />

      {/* Main Container */}
      <main className="max-w-xl w-full mx-auto px-3.5 sm:px-4 py-3.5 space-y-3.5 flex-1">
        
        {/* 3 Main Tab Buttons */}
        <div className="grid grid-cols-3 gap-1 bg-slate-200/90 p-1 rounded-2xl shadow-inner">
          <button
            onClick={() => setActiveTab('katalog')}
            className={`py-2 px-1 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'katalog'
                ? 'bg-white text-emerald-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Smartphone className="w-4 h-4 shrink-0" />
            <span>Katalog HP</span>
          </button>

          <button
            onClick={() => setActiveTab('servis')}
            className={`py-2 px-1 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'servis'
                ? 'bg-white text-emerald-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Wrench className="w-4 h-4 shrink-0" />
            <span>Biaya Servis</span>
          </button>

          <button
            onClick={() => setActiveTab('lokasi')}
            className={`py-2 px-1 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'lokasi'
                ? 'bg-white text-emerald-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <MapPin className="w-4 h-4 shrink-0" />
            <span>Lokasi Toko</span>
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'katalog' && <PhoneCatalog items={products} />}
        {activeTab === 'servis' && <ServiceList services={SERVICE_ITEMS} />}
        {activeTab === 'lokasi' && <StoreLocation />}

      </main>

      {/* Simple Clean Footer */}
      <footer className="text-center text-xs text-slate-400 py-6 px-4 border-t border-slate-200/60 mt-4">
        <p className="font-bold text-slate-700">{STORE.name}</p>
        <p className="text-[11px] text-slate-500 mt-0.5">{STORE.fullAddress}</p>
        <p className="text-[11px] text-slate-400 mt-1">{STORE.hours}</p>
      </footer>

      {/* Floating WhatsApp Quick Action Button for Mobile */}
      <a
        href={`https://wa.me/${STORE.phoneWa}?text=${encodeURIComponent('Halo Multi Service HP Pulokulon, saya mau tanya...')}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat WhatsApp"
        className="fixed bottom-4 right-4 z-40 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 px-3.5 rounded-full shadow-lg flex items-center gap-2 transition transform active:scale-95"
      >
        <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
        <span>Chat WA</span>
      </a>
    </div>
  );
};

export default App;
