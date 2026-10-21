import React, { useState } from 'react';
import { PhoneItem, AdminSettings } from '../types';
import {
  uploadImageToGitHub,
  syncProductsToGitHub,
  saveAdminSettings,
} from '../services/githubStorage';
import {
  Upload,
  Save,
  Plus,
  Trash2,
  Edit,
  ArrowLeft,
  KeyRound,
  Settings,
  Smartphone,
  ExternalLink,
  Copy,
  Check,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Image as ImageIcon,
  Loader2,
} from 'lucide-react';

interface AdminPanelProps {
  products: PhoneItem[];
  settings: AdminSettings;
  onUpdateProducts: (products: PhoneItem[]) => void;
  onUpdateSettings: (settings: AdminSettings) => void;
  onBackToStore: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  products,
  settings,
  onUpdateProducts,
  onUpdateSettings,
  onBackToStore,
}) => {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  // Active admin tab
  const [adminTab, setAdminTab] = useState<'products' | 'settings'>('products');

  // Form modal state for product
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<PhoneItem>>({
    brand: 'iPhone',
    name: '',
    price: 0,
    condition: 'Mulus 98% Seperti Baru',
    completeness: 'Dus + Kabel Charger',
    warranty: 'Garansi Toko 1 Bulan',
    image: '',
    highlight: '',
    isSold: false,
  });

  // Image upload state
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);

  // Sync to github state
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Settings form state
  const [settingsForm, setSettingsForm] = useState<AdminSettings>(settings);
  const [showToken, setShowToken] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Handle PIN unlock
  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === settings.pin) {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  // Open modal for add
  const handleOpenAdd = () => {
    setFormData({
      id: 'hp_' + Date.now(),
      brand: 'iPhone',
      name: '',
      price: 0,
      condition: 'Mulus 98% Seperti Baru',
      completeness: 'Dus + Kabel Charger',
      warranty: 'Garansi Toko 1 Bulan',
      image: '',
      highlight: '',
      isSold: false,
    });
    setEditingId(null);
    setIsEditing(true);
    setUploadStatus('');
  };

  // Open modal for edit
  const handleOpenEdit = (item: PhoneItem) => {
    setFormData({ ...item });
    setEditingId(item.id);
    setIsEditing(true);
    setUploadStatus('');
  };

  // Handle image file selection & automatic upload to GitHub
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!settings.githubToken) {
      alert('GitHub Token belum diisi! Silakan isi GitHub Token di tab "Pengaturan" agar foto otomatis tersimpan di GitHub.');
      // Fallback preview data URL
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
      return;
    }

    try {
      setIsUploading(true);
      setUploadStatus('Mengunggah foto ke GitHub...');
      const url = await uploadImageToGitHub(file, settings, (msg) => setUploadStatus(msg));
      setFormData((prev) => ({ ...prev, image: url }));
      setUploadStatus('✅ Foto berhasil tersimpan di GitHub!');
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Gagal upload gambar';
      alert('Gagal upload gambar: ' + errorMsg);
      setUploadStatus('');
    } finally {
      setIsUploading(false);
    }
  };

  // Save product to list & auto sync
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      alert('Mohon isi nama HP dan harga unit!');
      return;
    }

    const newItem: PhoneItem = {
      id: editingId || formData.id || 'hp_' + Date.now(),
      name: formData.name,
      brand: formData.brand || 'iPhone',
      price: Number(formData.price),
      condition: formData.condition || 'Mulus 98%',
      completeness: formData.completeness || 'Fullset',
      warranty: formData.warranty || 'Garansi Toko 1 Bulan',
      image: formData.image || 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&q=80',
      highlight: formData.highlight || '',
      isSold: Boolean(formData.isSold),
    };

    let updatedList: PhoneItem[];
    if (editingId) {
      updatedList = products.map((p) => (p.id === editingId ? newItem : p));
    } else {
      updatedList = [newItem, ...products];
    }

    onUpdateProducts(updatedList);
    setIsEditing(false);

    // Auto sync to GitHub
    triggerAutoSync(updatedList);
  };

  // Delete product
  const handleDeleteProduct = (id: string, name: string) => {
    if (confirm(`Yakin ingin menghapus ${name} dari daftar katalog?`)) {
      const updatedList = products.filter((p) => p.id !== id);
      onUpdateProducts(updatedList);
      triggerAutoSync(updatedList);
    }
  };

  // Toggle Sold status
  const handleToggleSold = (id: string) => {
    const updatedList = products.map((p) => (p.id === id ? { ...p, isSold: !p.isSold } : p));
    onUpdateProducts(updatedList);
    triggerAutoSync(updatedList);
  };

  // Trigger sync to GitHub
  const triggerAutoSync = async (listToSync: PhoneItem[]) => {
    if (!settings.githubToken) return;
    try {
      setIsSyncing(true);
      await syncProductsToGitHub(listToSync, settings);
      setSyncMessage({ type: 'success', text: 'Perubahan katalog berhasil dipublikasikan ke GitHub!' });
      setTimeout(() => setSyncMessage(null), 4000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Gagal sinkron data';
      setSyncMessage({ type: 'error', text: msg });
    } finally {
      setIsSyncing(false);
    }
  };

  // Save settings
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    saveAdminSettings(settingsForm);
    onUpdateSettings(settingsForm);
    alert('Pengaturan berhasil disimpan!');
  };

  // Current secret URL
  const currentSecretUrl = `${window.location.origin}${window.location.pathname}#/${settings.secretSlug}`;

  const handleCopySecretLink = () => {
    navigator.clipboard.writeText(currentSecretUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // --- 1. PIN Lock Screen ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4 font-sans">
        <div className="max-w-sm w-full bg-slate-800 border border-slate-700 rounded-3xl p-6 shadow-2xl space-y-6 text-center">
          <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
            <KeyRound className="w-8 h-8 text-white" />
          </div>

          <div>
            <h2 className="text-xl font-black text-white">Panel Kelola Konter</h2>
            <p className="text-xs text-slate-400 mt-1">
              Masukkan PIN Keamanan untuk membuka menu admin
            </p>
          </div>

          <form onSubmit={handleUnlock} className="space-y-4">
            <div>
              <input
                type="password"
                inputMode="numeric"
                maxLength={8}
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Masukkan PIN (Default: 8899)"
                className="w-full text-center text-xl tracking-widest bg-slate-900 border border-slate-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500 font-mono"
                autoFocus
              />
              {pinError && (
                <p className="text-rose-400 text-xs mt-1.5 font-medium">
                  PIN salah! Coba lagi (default: 8899)
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-sm py-3 rounded-xl transition shadow-md"
            >
              Buka Panel Admin
            </button>
          </form>

          <button
            onClick={onBackToStore}
            className="text-xs text-slate-400 hover:text-white flex items-center justify-center gap-1.5 mx-auto transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Halaman Toko</span>
          </button>
        </div>
      </div>
    );
  }

  // --- 2. Main Admin Dashboard ---
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans pb-16">
      {/* Admin Navbar */}
      <header className="sticky top-0 z-30 bg-slate-900 text-white border-b border-slate-800 shadow-md">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center font-black text-sm">
              M
            </div>
            <div>
              <h1 className="font-extrabold text-sm leading-tight">Admin Multi Konter</h1>
              <p className="text-[11px] text-slate-400 flex items-center gap-1">
                {settings.githubToken ? (
                  <span className="text-emerald-400 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    GitHub Storage Aktif
                  </span>
                ) : (
                  <span className="text-amber-400 font-medium">⚠️ Token Belum Diisi</span>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onBackToStore}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1 transition"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Lihat Web</span>
            </button>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="bg-rose-950/60 hover:bg-rose-900 text-rose-300 text-xs font-semibold px-2.5 py-1.5 rounded-lg transition"
              title="Kunci Panel"
            >
              Kunci
            </button>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="max-w-3xl mx-auto px-4 flex border-t border-slate-800">
          <button
            onClick={() => setAdminTab('products')}
            className={`py-2.5 px-4 text-xs font-bold border-b-2 flex items-center gap-1.5 transition ${
              adminTab === 'products'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>Katalog HP ({products.length})</span>
          </button>

          <button
            onClick={() => setAdminTab('settings')}
            className={`py-2.5 px-4 text-xs font-bold border-b-2 flex items-center gap-1.5 transition ${
              adminTab === 'settings'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Pengaturan & Link Rahasia</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-3xl w-full mx-auto px-4 py-4 space-y-4 flex-1">
        
        {/* Sync notification message */}
        {syncMessage && (
          <div
            className={`p-3 rounded-xl text-xs font-semibold flex items-center gap-2 ${
              syncMessage.type === 'success'
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                : 'bg-rose-100 text-rose-800 border border-rose-200'
            }`}
          >
            {syncMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            )}
            <span>{syncMessage.text}</span>
          </div>
        )}

        {/* --- TAB 1: KELOLA PRODUK HP --- */}
        {adminTab === 'products' && (
          <div className="space-y-4">
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
              <div>
                <h2 className="font-extrabold text-sm text-slate-900">Daftar Unit HP</h2>
                <p className="text-xs text-slate-500">
                  Total {products.length} unit ({products.filter((p) => !p.isSold).length} ready,{' '}
                  {products.filter((p) => p.isSold).length} terjual)
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => triggerAutoSync(products)}
                  disabled={isSyncing}
                  className="bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 text-xs font-bold py-2 px-3 rounded-xl flex items-center gap-1.5 transition disabled:opacity-50"
                  title="Simpan perubahan ke GitHub"
                >
                  {isSyncing ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-600" />
                  ) : (
                    <Save className="w-3.5 h-3.5 text-emerald-600" />
                  )}
                  <span>Simpan ke GitHub</span>
                </button>

                <button
                  onClick={handleOpenAdd}
                  className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold py-2 px-3.5 rounded-xl flex items-center gap-1.5 shadow-xs transition"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah HP Baru</span>
                </button>
              </div>
            </div>

            {/* Product List */}
            <div className="space-y-2.5">
              {products.map((item) => (
                <div
                  key={item.id}
                  className={`bg-white border rounded-2xl p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs transition ${
                    item.isSold ? 'border-slate-200 opacity-60 bg-slate-50' : 'border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 rounded-xl object-cover bg-slate-100 shrink-0 border border-slate-100"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                          {item.brand}
                        </span>
                        {item.isSold && (
                          <span className="bg-rose-500 text-white text-[9px] font-bold px-1.5 py-0.2 rounded">
                            LAKU / SOLD
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-sm text-slate-900 leading-tight">
                        {item.name}
                      </h3>
                      <p className="text-xs font-black text-emerald-700 mt-0.5">
                        Rp {item.price.toLocaleString('id-ID')}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        {item.condition} • {item.completeness}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5 self-end sm:self-center">
                    <button
                      onClick={() => handleToggleSold(item.id)}
                      className={`text-[11px] font-semibold px-2.5 py-1.5 rounded-lg border transition ${
                        item.isSold
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                          : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                      }`}
                    >
                      {item.isSold ? 'Tandai Ready' : 'Tandai Laku'}
                    </button>
                    <button
                      onClick={() => handleOpenEdit(item)}
                      className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition"
                      title="Edit Unit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(item.id, item.name)}
                      className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg transition"
                      title="Hapus Unit"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}

              {products.length === 0 && (
                <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-500">
                  <Smartphone className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p className="font-bold text-slate-700">Belum ada unit HP di katalog</p>
                  <p className="text-xs mt-1">Klik tombol &ldquo;Tambah HP Baru&rdquo; untuk memasukkan unit pertama.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* --- TAB 2: PENGATURAN & LINK RAHASIA --- */}
        {adminTab === 'settings' && (
          <div className="space-y-4">
            {/* Secret URL Card */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-3">
              <div className="flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-emerald-600" />
                <h3 className="font-extrabold text-sm text-slate-900">
                  Link Masuk Rahasia Admin
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pengunjung biasa tidak bisa melihat tombol admin di web toko. Anda hanya bisa membuka panel admin lewat link rahasia di bawah ini. Simpan atau bookmark link ini di HP Anda:
              </p>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 flex items-center justify-between gap-2">
                <span className="font-mono text-xs text-emerald-800 break-all select-all font-semibold">
                  {currentSecretUrl}
                </span>
                <button
                  onClick={handleCopySecretLink}
                  className="bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 shrink-0 transition"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? 'Tersalin' : 'Salin'}</span>
                </button>
              </div>
            </div>

            {/* Form Settings */}
            <form onSubmit={handleSaveSettings} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-4">
              <h3 className="font-extrabold text-sm text-slate-900">
                Pengaturan Penyimpanan GitHub & Keamanan
              </h3>

              {/* GitHub Token */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  GitHub Personal Access Token (PAT):
                </label>
                <div className="relative">
                  <input
                    type={showToken ? 'text' : 'password'}
                    value={settingsForm.githubToken}
                    onChange={(e) => setSettingsForm({ ...settingsForm, githubToken: e.target.value })}
                    placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-emerald-500 font-mono pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowToken(!showToken)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Token ini digunakan agar foto HP dan update katalog otomatis tersimpan ke repositori GitHub. Token disimpan di browser HP Anda.
                </p>
                <div className="mt-2 bg-emerald-50 border border-emerald-100 rounded-xl p-2.5 text-[11px] text-emerald-900 space-y-1">
                  <p className="font-bold">💡 Cara buat token GitHub gratis (1 menit):</p>
                  <ol className="list-decimal pl-4 space-y-0.5">
                    <li>Buka <a href="https://github.com/settings/tokens" target="_blank" rel="noreferrer" className="underline font-bold text-emerald-700">github.com/settings/tokens</a>.</li>
                    <li>Pilih <strong>Generate new token (classic)</strong>.</li>
                    <li>Centang izin <strong>repo</strong> (Full control of private repositories).</li>
                    <li>Klik <em>Generate token</em> dan salin token ke kolom di atas.</li>
                  </ol>
                </div>
              </div>

              {/* Repo & Branch info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Repo Owner:</label>
                  <input
                    type="text"
                    value={settingsForm.repoOwner}
                    onChange={(e) => setSettingsForm({ ...settingsForm, repoOwner: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Repo Name:</label>
                  <input
                    type="text"
                    value={settingsForm.repoName}
                    onChange={(e) => setSettingsForm({ ...settingsForm, repoName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Branch:</label>
                  <input
                    type="text"
                    value={settingsForm.branch}
                    onChange={(e) => setSettingsForm({ ...settingsForm, branch: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                  />
                </div>
              </div>

              {/* Slug rahasia & PIN */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2 border-t border-slate-100">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Slug URL Rahasia:
                  </label>
                  <div className="flex items-center gap-1">
                    <span className="text-slate-400 font-mono">#/</span>
                    <input
                      type="text"
                      value={settingsForm.secretSlug}
                      onChange={(e) => setSettingsForm({ ...settingsForm, secretSlug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    PIN Keamanan (4-8 angka):
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={8}
                    value={settingsForm.pin}
                    onChange={(e) => setSettingsForm({ ...settingsForm, pin: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono font-bold"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs py-2.5 rounded-xl shadow-xs transition"
              >
                Simpan Semua Pengaturan
              </button>
            </form>
          </div>
        )}
      </main>

      {/* --- MODAL FORM TAMBAH / EDIT HP --- */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-4 sm:p-6 shadow-2xl space-y-4 my-8">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-extrabold text-base text-slate-900">
                {editingId ? 'Edit Unit HP' : 'Tambah Unit HP Baru'}
              </h3>
              <button
                onClick={() => setIsEditing(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-3 text-xs">
              {/* Nama & Brand */}
              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-1">
                  <label className="block font-bold text-slate-700 mb-1">Merek:</label>
                  <select
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs"
                  >
                    <option value="iPhone">iPhone</option>
                    <option value="Samsung">Samsung</option>
                    <option value="Xiaomi">Xiaomi</option>
                    <option value="Oppo">Oppo</option>
                    <option value="Vivo">Vivo</option>
                    <option value="Infinix">Infinix</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">Nama Tipe HP & Memori:</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Contoh: iPhone 11 64GB Black"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs"
                  />
                </div>
              </div>

              {/* Harga */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">Harga Jual (Rp):</label>
                <input
                  type="number"
                  required
                  value={formData.price || ''}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  placeholder="Contoh: 3500000"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs font-bold text-emerald-700"
                />
              </div>

              {/* UPLOAD FOTO KE GITHUB STORAGE */}
              <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-3 space-y-2">
                <label className="block font-bold text-slate-800">
                  Foto Unit HP (Tersimpan di GitHub):
                </label>

                <div className="flex items-center gap-3">
                  {formData.image ? (
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-16 h-16 rounded-xl object-cover bg-slate-200 border border-slate-200 shrink-0"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-xl bg-slate-200 flex items-center justify-center text-slate-400 shrink-0">
                      <ImageIcon className="w-6 h-6" />
                    </div>
                  )}

                  <div className="flex-1 space-y-1">
                    <label className="cursor-pointer inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-1.5 px-3 rounded-xl transition shadow-xs">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{isUploading ? 'Mengunggah...' : 'Pilih Foto dari Galeri'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        disabled={isUploading}
                        className="hidden"
                      />
                    </label>

                    {uploadStatus && (
                      <p className="text-[11px] font-medium text-emerald-700">{uploadStatus}</p>
                    )}
                  </div>
                </div>

                <div>
                  <input
                    type="url"
                    value={formData.image || ''}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="Atau tempel URL gambar di sini..."
                    className="w-full bg-white border border-slate-200 rounded-lg p-1.5 text-[11px] text-slate-600"
                  />
                </div>
              </div>

              {/* Kondisi, Kelengkapan, Garansi */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kondisi Fisik:</label>
                  <input
                    type="text"
                    value={formData.condition}
                    onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                    placeholder="Mulus 98%"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kelengkapan:</label>
                  <input
                    type="text"
                    value={formData.completeness}
                    onChange={(e) => setFormData({ ...formData, completeness: e.target.value })}
                    placeholder="Fullset Dus Ori"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Garansi:</label>
                  <input
                    type="text"
                    value={formData.warranty}
                    onChange={(e) => setFormData({ ...formData, warranty: e.target.value })}
                    placeholder="Garansi Toko 1 Bulan"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs"
                  />
                </div>
              </div>

              {/* Highlight / Catatan */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">Catatan Tambahan / Nilai Plus:</label>
                <input
                  type="text"
                  value={formData.highlight || ''}
                  onChange={(e) => setFormData({ ...formData, highlight: e.target.value })}
                  placeholder="Contoh: BH 90%, Face ID normal, sinyal all operator"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs"
                />
              </div>

              {/* Checkbox Sold */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isSold"
                  checked={Boolean(formData.isSold)}
                  onChange={(e) => setFormData({ ...formData, isSold: e.target.checked })}
                  className="w-4 h-4 text-emerald-600 rounded"
                />
                <label htmlFor="isSold" className="text-xs font-semibold text-slate-700">
                  Tandai unit ini sudah laku / terjual (Sold Out)
                </label>
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2 px-4 rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold py-2 px-5 rounded-xl shadow-xs"
                >
                  Simpan Unit HP
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
