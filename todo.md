# TODO

Captured 2026-05-24 after the Supabase migration commit. Pick up here next session.

## Critical — security

- [ ] **Replace the localStorage admin gate with Supabase Auth.**
  - `src/scripts/admin.ts` reads `PUBLIC_ADMIN_USERNAME` / `PUBLIC_ADMIN_PASSWORD`. The `PUBLIC_` prefix inlines them into the client JS bundle — anyone viewing source on the deployed site can read the credentials.
  - `isAuthed()` only checks `sessionStorage`, which is trivially bypassed from the browser console.
  - Plan: use `supabase.auth.signInWithPassword`, swap out `isAuthed / login / logout` in `admin.ts`, delete the two `PUBLIC_ADMIN_*` env vars.

- [ ] **Verify Supabase RLS policies.** Without RLS, the anon key lets anyone `delete from products` from the browser console.
  - Tables: `business`, `brands`, `categories`, `products`, `enquiries`, `enquiry_items`.
  - Storage bucket: `products`.
  - Expected: anon can `SELECT` everything except enquiries, and can `INSERT` enquiries + enquiry_items only. All other writes require an authenticated admin.

## After deploy

- [ ] Set env vars in Cloudflare Pages: `PUBLIC_SUPABASE_URL`, `PUBLIC_SUPABASE_ANON_KEY`, and (until Supabase Auth lands) `PUBLIC_ADMIN_USERNAME` / `PUBLIC_ADMIN_PASSWORD`.
- [ ] Smoke-test admin product CRUD on production (add, edit, delete, image upload).

## Functional gaps

- [x] **Catalog updates require a rebuild by design.** `getProducts()` runs at build time for the prerendered catalog pages (`index.astro`, `categories/index.astro`, `categories/[slug].astro`, `product/[id].astro`) and sitemap generation. Admin edits appear publicly after a Cloudflare Pages redeploy.
  - Accepted workflow: products are added rarely, so trigger a deployment after catalogue changes instead of adding SSR.

- [ ] **Availability is hardcoded to "In Stock".** Admin form always inserts `'In Stock'`; public pages render the string literally. If you want pre-order / out-of-stock badges back, add a selector to the admin dialog (`src/pages/admin/index.astro`) and restore the conditional render in `src/pages/categories/[slug].astro` and `src/pages/product/[id].astro`.

## Nice-to-have

- [ ] `public/logo.svg` diff is whitespace-only — consider reverting to keep the commit clean.
- [ ] Auto-generate Supabase types with `supabase gen types typescript` instead of the hand-maintained types in `src/lib/supabase.ts`.
