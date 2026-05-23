// Catalogue data layer. Fetches BUSINESS / BRANDS / CATEGORIES / PRODUCTS
// from Supabase at module load (build time for SSG, request time for SSR).
//
// Consumers continue to import { BUSINESS, BRANDS, CATEGORIES, PRODUCTS }
// — same shape as before. Field name differences vs. the DB (icon_type → iconType,
// brand_name → brand, category_slug → category) are mapped here so the rest of
// the app doesn't need to change.

import { supabase } from '../lib/supabase';

function panic(label, error) {
  throw new Error(`[rcb.js] failed to load ${label}: ${error.message}`);
}

// ── business ──────────────────────────────────────────────────────────
const { data: bizRow, error: bizErr } = await supabase
  .from('business')
  .select('*')
  .eq('id', 1)
  .maybeSingle();
if (bizErr) panic('business', bizErr);

export const BUSINESS = bizRow ?? {
  name: '', tagline: '', founded: null, phone: '', email: '', website: '',
  hours: '', whatsapp: '', mission: '', vision: '', values: [],
};

// ── brands ────────────────────────────────────────────────────────────
const { data: brandRows, error: brandErr } = await supabase
  .from('brands')
  .select('name, logo, display_order')
  .order('display_order', { ascending: true });
if (brandErr) panic('brands', brandErr);

export const BRANDS = (brandRows ?? []).map((b) => ({
  name: b.name,
  logo: b.logo,
}));

// ── categories ────────────────────────────────────────────────────────
const { data: catRows, error: catErr } = await supabase
  .from('categories')
  .select('slug, name, family, short, description, icon_type, image, display_order')
  .order('display_order', { ascending: true });
if (catErr) panic('categories', catErr);

export const CATEGORIES = (catRows ?? []).map((c) => ({
  slug:        c.slug,
  name:        c.name,
  family:      c.family,
  short:       c.short ?? '',
  description: c.description ?? '',
  iconType:    c.icon_type,
  image:       c.image ?? undefined,
}));

// ── products ──────────────────────────────────────────────────────────
// Products are fetched on demand (not at module load) so that catalogue pages
// pick up admin changes without restarting the dev server. In production
// builds, this still runs once per page during build — re-run `npm run build`
// (or switch to SSR) to publish admin changes.
const catBySlug = new Map(CATEGORIES.map((c) => [c.slug, c]));

export async function getProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('id', { ascending: true });
  if (error) panic('products', error);
  return (data ?? []).map((p) => {
    const cat = catBySlug.get(p.category_slug);
    return {
      id:           p.id,
      code:         p.code,
      name:         p.name,
      category:     p.category_slug,
      brand:        p.brand_name,
      bore:         p.bore     ?? undefined,
      od:           p.od       ?? undefined,
      width:        p.width    ?? undefined,
      section:      p.section  ?? undefined,
      pitch:        p.pitch    ?? undefined,
      length:       p.length   ?? undefined,
      series:       p.series   ?? undefined,
      diameter:     p.diameter ?? '',
      family:       cat?.family   ?? '',
      iconType:     cat?.iconType ?? 'groove',
      image:        p.image,
    };
  });
}
