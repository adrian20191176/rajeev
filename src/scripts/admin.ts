// Admin runtime - Supabase-backed product CRUD.
//
// Auth is still the legacy localStorage admin/royal123 gate, kept as-is for now.
// When you switch to Supabase Auth, replace isAuthed/login/logout with
// supabase.auth.* calls and add RLS policies that restrict writes to authenticated
// users.

import { supabase } from '../lib/supabase';

export type Product = {
  id: number;
  code: string;
  name: string;
  brand: string;
  category: string;
  family: string;
  iconType: string;
  bore?: number;
  od?: number;
  width?: number;
  section?: string;
  pitch?: string;
  length?: number;
  series?: string;
  diameter: string;
  image: string | null;
};

export type Category = {
  slug: string;
  name: string;
  family: string;
  short: string;
  description: string;
  iconType: string;
  image?: string;
};

export type Brand = { name: string; logo?: string };

declare global {
  interface Window {
    RCBAdmin: typeof Admin;
    __RCB_CATEGORIES__?: Category[];
    __RCB_BRANDS__?: Brand[];
  }
}

const AUTH_KEY = 'rcb.admin.auth.v1';
const ADMIN_USER = import.meta.env.PUBLIC_ADMIN_USERNAME;
const ADMIN_PASS = import.meta.env.PUBLIC_ADMIN_PASSWORD;

if (!ADMIN_USER || !ADMIN_PASS) {
  console.warn(
    '[admin] PUBLIC_ADMIN_USERNAME / PUBLIC_ADMIN_PASSWORD are not set - admin login will always fail. Add them to your .env (and to Cloudflare Pages env vars for deployment).'
  );
}

function loadJson<T>(id: string): T | null {
  const el = document.getElementById(id);
  if (!el?.textContent) return null;
  try { return JSON.parse(el.textContent) as T; } catch { return null; }
}

// Categories + brands are static enough to hydrate from the SSR JSON tags;
// products are mutated by the admin UI, so we keep them in memory and re-fetch
// after each mutation.
let productsCache: Product[] = [];

function categoriesIndex(): Map<string, Category> {
  const cats = window.__RCB_CATEGORIES__ ?? [];
  return new Map(cats.map((c) => [c.slug, c]));
}

function rowToProduct(row: any): Product {
  const cat = categoriesIndex().get(row.category_slug);
  return {
    id:           row.id,
    code:         row.code,
    name:         row.name,
    brand:        row.brand_name,
    category:     row.category_slug,
    family:       cat?.family   ?? '',
    iconType:     cat?.iconType ?? 'groove',
    bore:         row.bore     ?? undefined,
    od:           row.od       ?? undefined,
    width:        row.width    ?? undefined,
    section:      row.section  ?? undefined,
    pitch:        row.pitch    ?? undefined,
    length:       row.length   ?? undefined,
    series:       row.series   ?? undefined,
    diameter:     row.diameter ?? '',
    image:        row.image,
  };
}

function productToRow(p: Partial<Product>) {
  // Strip derived fields (family/iconType) and rename to DB columns.
  const out: Record<string, any> = {};
  if (p.code     !== undefined) out.code          = p.code;
  if (p.name     !== undefined) out.name          = p.name;
  if (p.brand    !== undefined) out.brand_name    = p.brand;
  if (p.category !== undefined) out.category_slug = p.category;
  if (p.bore     !== undefined) out.bore          = p.bore ?? null;
  if (p.od       !== undefined) out.od            = p.od ?? null;
  if (p.width    !== undefined) out.width         = p.width ?? null;
  if (p.section  !== undefined) out.section       = p.section ?? null;
  if (p.pitch    !== undefined) out.pitch         = p.pitch ?? null;
  if (p.length   !== undefined) out.length        = p.length ?? null;
  if (p.series   !== undefined) out.series        = p.series ?? null;
  if (p.diameter !== undefined) out.diameter      = p.diameter ?? null;
  if (p.image    !== undefined) out.image         = p.image;
  return out;
}

const Admin = {
  // ── Auth - tab-scoped sessionStorage; cleared on tab close ──
  // (Replace with Supabase Auth for real cross-tab session management later.)
  isAuthed(): boolean {
    try {
      const raw = JSON.parse(sessionStorage.getItem(AUTH_KEY) || 'null');
      return raw?.user === ADMIN_USER;
    } catch { return false; }
  },
  login(user: string, pass: string): boolean {
    if (!ADMIN_USER || !ADMIN_PASS) return false;
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
      sessionStorage.setItem(AUTH_KEY, JSON.stringify({ user, at: Date.now() }));
      return true;
    }
    return false;
  },
  logout() { sessionStorage.removeItem(AUTH_KEY); },

  // ── Reference data (hydrated from SSR JSON tags) ──
  categories(): Category[] { return window.__RCB_CATEGORIES__ || []; },
  brands(): Brand[]        { return window.__RCB_BRANDS__     || []; },

  // ── Products (live from Supabase) ──
  products(): Product[] { return productsCache; },

  async refreshProducts(): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('id', { ascending: true });
    if (error) throw new Error(`Failed to load products: ${error.message}`);
    productsCache = (data ?? []).map(rowToProduct);
    window.dispatchEvent(new CustomEvent('rcb:data-change'));
    return productsCache;
  },

  async addProduct(p: Omit<Product, 'id'>): Promise<Product> {
    const { data, error } = await supabase
      .from('products')
      .insert({ ...productToRow(p), availability: 'In Stock' })
      .select()
      .single();
    if (error) throw new Error(error.message);
    await this.refreshProducts();
    return rowToProduct(data);
  },

  async updateProduct(id: number, patch: Partial<Product>): Promise<Product> {
    const { data, error } = await supabase
      .from('products')
      .update(productToRow(patch))
      .eq('id', id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    await this.refreshProducts();
    return rowToProduct(data);
  },

  async deleteProduct(id: number): Promise<void> {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) throw new Error(error.message);
    await this.refreshProducts();
  },

  // Uploads a data-URL image to the `products` storage bucket and returns the
  // public URL. Pass through any http(s) URL unchanged.
  async uploadProductImage(image: string): Promise<string> {
    if (!image.startsWith('data:')) return image;

    const blob = await (await fetch(image)).blob();
    const ext = blob.type === 'image/png' ? 'png' : 'jpg';
    const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

    const { error } = await supabase.storage
      .from('products')
      .upload(path, blob, { contentType: blob.type, upsert: false });
    if (error) throw new Error(`Image upload failed: ${error.message}`);

    const { data } = supabase.storage.from('products').getPublicUrl(path);
    return data.publicUrl;
  },
};

window.RCBAdmin = Admin;

// Hydrate reference data from the SSR JSON tags emitted by the admin pages.
window.__RCB_CATEGORIES__ = loadJson<Category[]>('rcb-admin-categories') || [];
window.__RCB_BRANDS__     = loadJson<Brand[]>('rcb-admin-brands')         || [];

export {};
