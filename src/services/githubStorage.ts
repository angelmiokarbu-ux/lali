import { PhoneItem, AdminSettings } from '../types';
import { PHONE_ITEMS } from '../data/products';

const DEFAULT_SETTINGS: AdminSettings = {
  githubToken: '',
  repoOwner: 'angelmiokarbu-ux',
  repoName: 'lali',
  branch: 'main',
  secretSlug: 'kelola-konter-rahasia',
  pin: '8899',
};

const SETTINGS_KEY = 'multi_hp_admin_settings';
const PRODUCTS_CACHE_KEY = 'multi_hp_products_cache';

// Muat konfigurasi admin dari localStorage
export const getAdminSettings = (): AdminSettings => {
  try {
    const saved = localStorage.getItem(SETTINGS_KEY);
    if (saved) {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.error('Gagal membaca setting admin:', e);
  }
  return DEFAULT_SETTINGS;
};

// Simpan konfigurasi admin ke localStorage
export const saveAdminSettings = (settings: AdminSettings): void => {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
};

// Konversi string UTF-8 ke Base64 dengan aman
export const utf8ToBase64 = (str: string): string => {
  return window.btoa(unescape(encodeURIComponent(str)));
};

// Upload gambar langsung ke repositori GitHub sebagai storage
export const uploadImageToGitHub = async (
  file: File,
  settings: AdminSettings,
  onProgress?: (status: string) => void
): Promise<string> => {
  if (!settings.githubToken) {
    throw new Error('GitHub Token belum diisi. Masukkan token di tab Pengaturan Admin.');
  }

  onProgress?.('Membaca file gambar...');
  
  // Baca file sebagai Base64
  const base64Data = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  const cleanName = file.name
    .replace(/\.[^/.]+$/, '')
    .replace(/[^a-zA-Z0-9]/g, '-')
    .toLowerCase()
    .slice(0, 16);
  const filename = `${Date.now()}-${cleanName}.${ext}`;
  const filePath = `public/uploads/${filename}`;

  onProgress?.('Mengunggah gambar ke GitHub...');

  const url = `https://api.github.com/repos/${settings.repoOwner}/${settings.repoName}/contents/${filePath}`;

  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${settings.githubToken.trim()}`,
      'Content-Type': 'application/json',
      Accept: 'application/vnd.github.v3+json',
    },
    body: JSON.stringify({
      message: `Upload image: ${filename} via Admin Panel`,
      content: base64Data,
      branch: settings.branch || 'main',
    }),
  });

  if (!res.ok) {
    const errorJson = await res.json().catch(() => ({}));
    throw new Error(errorJson.message || `Gagal upload gambar ke GitHub (Status ${res.status})`);
  }

  // Gunakan jsDelivr CDN atau raw github
  const cdnUrl = `https://cdn.jsdelivr.net/gh/${settings.repoOwner}/${settings.repoName}@${settings.branch}/${filePath}`;
  return cdnUrl;
};

// Simpan & Commit daftar produk ke GitHub (public/data/products.json)
export const syncProductsToGitHub = async (
  products: PhoneItem[],
  settings: AdminSettings
): Promise<void> => {
  // Simpan di cache lokal terlebih dahulu
  localStorage.setItem(PRODUCTS_CACHE_KEY, JSON.stringify(products));

  if (!settings.githubToken) {
    // Jika belum setting token, hanya simpan di browser lokal
    return;
  }

  const filePath = 'public/data/products.json';
  const getFileUrl = `https://api.github.com/repos/${settings.repoOwner}/${settings.repoName}/contents/${filePath}?ref=${settings.branch}`;

  let existingSha: string | undefined;

  // Dapatkan SHA file yang sudah ada jika ada
  try {
    const getRes = await fetch(getFileUrl, {
      headers: {
        Authorization: `Bearer ${settings.githubToken.trim()}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });
    if (getRes.ok) {
      const data = await getRes.json();
      existingSha = data.sha;
    }
  } catch (err) {
    console.warn('File belum ada di repo, akan dibuat baru:', err);
  }

  const jsonContent = JSON.stringify(products, null, 2);
  const base64Content = utf8ToBase64(jsonContent);

  const putUrl = `https://api.github.com/repos/${settings.repoOwner}/${settings.repoName}/contents/${filePath}`;
  const putRes = await fetch(putUrl, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${settings.githubToken.trim()}`,
      'Content-Type': 'application/json',
      Accept: 'application/vnd.github.v3+json',
    },
    body: JSON.stringify({
      message: `Update katalog HP (${products.length} unit) via Admin Panel`,
      content: base64Content,
      sha: existingSha,
      branch: settings.branch || 'main',
    }),
  });

  if (!putRes.ok) {
    const errData = await putRes.json().catch(() => ({}));
    throw new Error(errData.message || `Gagal sinkron data ke GitHub (Status ${putRes.status})`);
  }
};

// Ambil daftar produk terkini (dari file public atau cache lokal atau fallback bawaan)
export const loadProducts = async (): Promise<PhoneItem[]> => {
  // 1. Cek cache lokal
  const cached = localStorage.getItem(PRODUCTS_CACHE_KEY);
  let localProducts: PhoneItem[] | null = null;
  if (cached) {
    try {
      localProducts = JSON.parse(cached);
    } catch {
      // ignore
    }
  }

  // 2. Coba fetch file JSON publik
  try {
    const res = await fetch(`./data/products.json?t=${Date.now()}`);
    if (res.ok) {
      const liveData = await res.json();
      if (Array.isArray(liveData) && liveData.length > 0) {
        localStorage.setItem(PRODUCTS_CACHE_KEY, JSON.stringify(liveData));
        return liveData;
      }
    }
  } catch (err) {
    console.warn('Gagal memuat ./data/products.json, menggunakan data cache/default:', err);
  }

  if (localProducts && localProducts.length > 0) {
    return localProducts;
  }

  return PHONE_ITEMS;
};
