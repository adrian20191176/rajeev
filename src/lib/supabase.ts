import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const url = import.meta.env.PUBLIC_SUPABASE_URL;
const anonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  throw new Error(
    'Missing PUBLIC_SUPABASE_URL or PUBLIC_SUPABASE_ANON_KEY - check your .env file.'
  );
}

// ── Database row types ────────────────────────────────────────────────
// Mirrors the schema in Supabase. Regenerate with `supabase gen types
// typescript` once you have the CLI set up if you want this auto-managed.

export interface BusinessRow {
  id: number;
  name: string;
  tagline: string | null;
  founded: number | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  hours: string | null;
  whatsapp: string | null;
  mission: string | null;
  vision: string | null;
  values: string[] | null;
  updated_at: string;
}

export interface BrandRow {
  name: string;
  logo: string | null;
  display_order: number;
}

export interface CategoryRow {
  slug: string;
  name: string;
  family: string;
  short: string | null;
  description: string | null;
  icon_type: string;
  image: string | null;
  display_order: number;
  created_at: string;
}

export interface ProductRow {
  id: number;
  code: string;
  name: string;
  category_slug: string;
  brand_name: string;
  bore: number | null;
  od: number | null;
  width: number | null;
  section: string | null;
  pitch: string | null;
  length: number | null;
  series: string | null;
  diameter: string | null;
  image: string | null;
  availability: 'In Stock' | 'Pre-order' | 'Out of Stock';
  created_at: string;
  updated_at: string;
}

export interface EnquiryRow {
  id: number;
  name: string;
  company: string | null;
  email: string | null;
  phone: string | null;
  message: string | null;
  status: 'new' | 'contacted' | 'quoted' | 'closed';
  source: string | null;
  created_at: string;
}

export interface EnquiryItemRow {
  enquiry_id: number;
  product_id: number;
  quantity: number;
  note: string | null;
}

export interface Database {
  public: {
    Tables: {
      business:      { Row: BusinessRow;     Insert: Partial<BusinessRow>     & { name: string };           Update: Partial<BusinessRow> };
      brands:        { Row: BrandRow;        Insert: Partial<BrandRow>        & { name: string };           Update: Partial<BrandRow> };
      categories:    { Row: CategoryRow;     Insert: Partial<CategoryRow>     & { slug: string; name: string; family: string; icon_type: string }; Update: Partial<CategoryRow> };
      products:      { Row: ProductRow;      Insert: Partial<ProductRow>      & { code: string; name: string; category_slug: string; brand_name: string }; Update: Partial<ProductRow> };
      enquiries:     { Row: EnquiryRow;      Insert: Partial<EnquiryRow>      & { name: string };           Update: Partial<EnquiryRow> };
      enquiry_items: { Row: EnquiryItemRow;  Insert: EnquiryItemRow;                                        Update: Partial<EnquiryItemRow> };
    };
  };
}

export const supabase: SupabaseClient<Database> = createClient<Database>(url, anonKey);
