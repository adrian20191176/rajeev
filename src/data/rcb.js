// Catalogue data layer. Fetches BUSINESS / BRANDS / CATEGORIES / PRODUCTS
// from Supabase per request.
//
// Cloudflare Workers forbids fetch/setTimeout/random at module global scope,
// so we expose memoized async loaders instead of top-level awaits. Consumers
// import these loaders and `await` them from Astro frontmatter or handlers.
//
// Field name differences vs. the DB (icon_type → iconType, brand_name → brand,
// category_slug → category) are mapped here so the rest of the app doesn't need
// to change.

import { supabase } from '../lib/supabase';

function panic(label, error) {
  throw new Error(`[rcb.js] failed to load ${label}: ${error.message}`);
}

// ── business ──────────────────────────────────────────────────────────
let businessPromise;
export function getBusiness() {
  if (!businessPromise) {
    businessPromise = supabase
      .from('business')
      .select('*')
      .eq('id', 1)
      .maybeSingle()
      .then(({ data, error }) => {
        if (error) panic('business', error);
        return data ?? {
          name: '', tagline: '', founded: null, phone: '', email: '', website: '',
          hours: '', whatsapp: '', mission: '', vision: '', values: [],
        };
      });
  }
  return businessPromise;
}

// ── brands ────────────────────────────────────────────────────────────
let brandsPromise;
export function getBrands() {
  if (!brandsPromise) {
    brandsPromise = supabase
      .from('brands')
      .select('name, logo, display_order')
      .order('display_order', { ascending: true })
      .then(({ data, error }) => {
        if (error) panic('brands', error);
        return (data ?? []).map((b) => ({ name: b.name, logo: b.logo }));
      });
  }
  return brandsPromise;
}

// ── categories ────────────────────────────────────────────────────────
let categoriesPromise;
export function getCategories() {
  if (!categoriesPromise) {
    categoriesPromise = supabase
      .from('categories')
      .select('slug, name, family, short, description, icon_type, image, display_order')
      .order('display_order', { ascending: true })
      .then(({ data, error }) => {
        if (error) panic('categories', error);
        return (data ?? []).map((c) => ({
          slug:        c.slug,
          name:        c.name,
          family:      c.family,
          short:       c.short ?? '',
          description: c.description ?? '',
          iconType:    c.icon_type,
          image:       c.image ?? undefined,
        }));
      });
  }
  return categoriesPromise;
}

// ── products ──────────────────────────────────────────────────────────
// Not memoized: catalogue pages should pick up admin changes between page
// renders. (Each Astro page render still only triggers one fetch.)
export async function getProducts() {
  const categories = await getCategories();
  const catBySlug = new Map(categories.map((c) => [c.slug, c]));

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
      availability: p.availability ?? 'In Stock',
    };
  });
}
