import React from 'react';
import { ActiveTab } from '../types';
import { Smartphone, RefreshCw, Wrench, MapPin } from 'lucide-react';

interface BottomNavProps {
  activeTab: ActiveTab;
  onChangeTab: (tab: ActiveTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onChangeTab }) => {
  const navItems = [
    { id: 'katalog' as ActiveTab, label: 'Katalog HP', icon: Smartphone },
    { id: 'tukar-tambah' as ActiveTab, label: 'Tukar Tambah', icon: RefreshCw },
    { id: 'servis' as ActiveTab, label: 'Servis HP', icon: Wrench },
    { id: 'lokasi' as ActiveTab, label: 'Lokasi Toko', icon: MapPin },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-neutral-900/95 backdrop-blur-lg border-t border-neutral-800 py-1.5 px-3">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChangeTab(item.id)}
              className={`flex-1 py-1.5 flex flex-col items-center justify-center transition-all ${
                isActive ? 'text-emerald-400 font-bold' : 'text-neutral-400 hover:text-neutral-200 font-medium'
              }`}
            >
              <div
                className={`w-9 h-7 flex items-center justify-center rounded-lg transition-colors ${
                  isActive ? 'bg-emerald-500/10' : ''
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
