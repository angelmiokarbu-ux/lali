import React, { useState } from 'react';
import { ActiveTab, Product } from './types';
import { INITIAL_PRODUCTS } from './data/products';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { CatalogView } from './components/CatalogView';
import { TradeInView } from './components/TradeInView';
import { ServiceView } from './components/ServiceView';
import { LocationView } from './components/LocationView';
import { ProductModal } from './components/ProductModal';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('katalog');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [tradeInTargetProduct, setTradeInTargetProduct] = useState<Product | null>(null);

  const handleStartTradeIn = (product: Product) => {
    setTradeInTargetProduct(product);
    setActiveTab('tukar-tambah');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans">
      {/* Top Header */}
      <Header onGoToLocation={() => setActiveTab('lokasi')} />

      {/* Main Container */}
      <main className="flex-1 max-w-md w-full mx-auto px-4 pt-3 pb-20">
        {activeTab === 'katalog' && (
          <CatalogView
            products={INITIAL_PRODUCTS}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onTradeInWith={handleStartTradeIn}
          />
        )}

        {activeTab === 'tukar-tambah' && (
          <TradeInView
            products={INITIAL_PRODUCTS}
            targetProduct={tradeInTargetProduct}
            onClearTargetProduct={() => setTradeInTargetProduct(null)}
          />
        )}

        {activeTab === 'servis' && <ServiceView />}

        {activeTab === 'lokasi' && <LocationView />}
      </main>

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onStartTradeIn={handleStartTradeIn}
      />

      {/* Bottom Sticky Tab Navigation */}
      <BottomNav activeTab={activeTab} onChangeTab={setActiveTab} />
    </div>
  );
};

export default App;
