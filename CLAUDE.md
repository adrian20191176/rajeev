# Repository Guidelines

## Project Overview
**Royal Crown Bearings** marketing site - a Sri Lankan supplier of bearings, V-belts, oil seals and industrial components. Static Astro 6 site styled with Tailwind CSS v4 (via `@tailwindcss/vite`), TypeScript strict mode, deployed as static files on Cloudflare Pages.

The site is brochure + lightweight catalogue: 18 product categories x ~1,000 products (catalogue + business data fetched from Supabase at build time), a client-side enquiry list (localStorage) that submits to Supabase, a Cmd/Ctrl+K search palette, and an enquiry modal with real Supabase-backed submission.

## Project Structure & Module Organization

### Routes (`src/pages/`)
- `index.astro` â€” homepage (hero, brand marquee, featured categories, why-RCB, brand grid, mission/vision, contact CTA)
- `about.astro`, `contact.astro` â€” static info pages
- `enquiry-list.astro` â€” renders the localStorage-backed enquiry list, hydrates client-side
- `categories/index.astro` â€” all categories with a family filter (client-side)
- `categories/[slug].astro` â€” dynamic per-category page (`getStaticPaths` from `CATEGORIES`)
- `product/[id].astro` - dynamic per-product page (`getStaticPaths` from `PRODUCTS`)

### Components (`src/components/`)
- `Nav.astro` â€” sticky header, utility bar, mobile menu, search trigger, enquiry-count badge. Accepts `activeNav` prop.
- `Footer.astro` â€” brand block, category links (first 9), company links.
- `BearingVisual.astro` â€” parametric SVG visual; switches rendering by `iconType` (`groove`, `mini`, `angular`, `selfalign`, `cylindrical`, `needle`, `tapered`, `spherical`, `thrust`, `vbelt`, `tooth`, `seal`, `housing`, `uc`).

### Layout (`src/layouts/Layout.astro`)
The global shell. Owns Nav, Footer, **and the entire client runtime**:
- `<dialog id="search-dialog">` â€” Cmd/Ctrl+K search palette; data serialized into `#rcb-search-data` JSON script tag (PRODUCTS + CATEGORIES indices).
- `<dialog id="enquiry-dialog">` â€” enquiry form modal; submission is real, via `window.submitEnquiry` â†’ Supabase (`enquiries` + `enquiry_items` tables).
- Toast stack rendered into `#toast-stack`.
- Exposes globals on `window`: `rcbList` (`get/add/remove/clear`, backed by `localStorage` key `rcb.enquiryList.v1`), `openEnquiry(products[])`, `showToast({title, message, tone})`.
- Dispatches custom event `rcb:list-updated` when the list changes; Nav listens to update the badge.
- Accepts props: `title`, `description`, `activeNav`, `waMessage`, `canonicalPath`, `image`, `type`, `noindex`, `jsonLd`.

### Data (`src/data/rcb.js`)
**Single source of truth for the frontend â€” backed by Supabase, not in-memory arrays.** Exports memoized async loaders that fetch from Supabase (via `src/lib/supabase.ts`) and adapt DB column names to the shapes the rest of the app expects. Pages `await` these from Astro frontmatter:
- `getBusiness()` â€” phone, email, whatsapp, mission, vision, etc.
- `getBrands()` â€” manufacturers (NTN, NSK, FAG, SKF, â€¦), ordered by `display_order`.
- `getCategories()` â€” categories with `slug`, `name`, `family`, `short`, `description`, `iconType` (mapped from `icon_type`), optional `image`.
- `getProducts()` - one entry per product: `id`, `code`, `name`, `bore/od/width` or `section/length` or `pitch/length` or `series/bore`, `diameter`, `availability` (`In Stock` / `Pre-order` / `Out of Stock`), plus `category`, `family`, `iconType`, `image`. Product brand names are intentionally not exposed in public product data.

The admin console (`src/pages/admin/`, `src/scripts/admin.ts`) writes to the same `products` table. Touch this file carefully â€” it powers the homepage cards, search index, footer, every dynamic route, and product specs.

### Styles (`src/styles/global.css`)
Tailwind v4 with custom `@theme` tokens:
- **Ink scale** `--color-ink-900..100` (graphite palette; page background is `ink-900` / `#05080F`).
- **Chrome scale** `--color-chrome-50..200` (silver text).
- **Brand accents** `--color-gold` (`#d4af37`), `--color-gold-dark`. Aliases `--color-cyan-brand` and `--color-amber-signal` exist so existing Tailwind classes (`bg-amber-signal`, `shadow-glow-cyan`, etc.) keep working â€” don't rename without auditing usages.
- **Fonts** Space Grotesk (display), Manrope (body), JetBrains Mono (mono) â€” loaded from Google Fonts in `Layout.astro` head.
- **Custom utility classes** (used widely, plain CSS not Tailwind): `hairline`, `hairline-strong`, `chrome-border`, `tech-grid`, `tech-grid-fine`, `spot`, `placeholder-stripe`, `btn-shine`, `spin-slow` / `spin-slower` / `spin-rev`, `fade-up`, `toast-in`, `marquee`.

### Public (`public/`)
- `logo.svg` â€” used as a CSS mask in Nav and Footer to render a gold-gradient logo mark.

## Build, Test, and Development Commands
Use Node.js `>=22.12.0`.

- `npm install` installs dependencies.
- `npm run dev` starts the Astro development server.
- `npm run build` creates the production build.
- `npm run preview` serves the production build locally.

## Architecture Notes & Gotchas
- **Supabase backend.** All catalogue/business data and enquiry submission go through Supabase (`src/lib/supabase.ts`; env vars `PUBLIC_SUPABASE_URL` / `PUBLIC_SUPABASE_ANON_KEY`). Enquiry submission logic lives in `window.submitEnquiry` in `Layout.astro`, shared by the enquiry modal, the enquiry-list page, and the contact form.
- **Globals leak across pages by design.** Any page that uses `onclick="openEnquiry(...)"` or buttons with `.open-search` relies on `Layout.astro` having set up those handlers. Don't drop pages out of `<Layout>`.
- **All public catalogue routes are static-generated** via `getStaticPaths`, fetching from Supabase through `rcb.js` at build time - no SSR and no Node server in production. When products/categories are added or changed in Supabase, trigger a new Cloudflare Pages deployment so the HTML, search data, and sitemap are regenerated. This is the accepted workflow because product additions are rare.
- **Sitemap and canonical URLs omit trailing slashes.** `astro.config.mjs` sets `trailingSlash: 'never'`, and `src/lib/seo.ts` normalizes same-site absolute URLs so canonicals, OpenGraph URLs, JSON-LD, and `@astrojs/sitemap` output all agree. Keep `/admin`, `/admin/login`, and `/enquiry-list` excluded from the sitemap; those pages also use `noindex`.
- **Search index is a JSON `<script>` tag** in the rendered HTML, parsed once on page load. Keep `PRODUCTS` reasonably sized.
- **Tailwind v4 + Vite plugin** (not the PostCSS workflow). Config lives in `astro.config.mjs` and theme tokens in `src/styles/global.css` â€” there is no `tailwind.config.js`.

## Build, Test, and Development Commands
Use Node.js `>=22.12.0`.

- `npm install` installs dependencies.
- `npm run dev` starts the Astro development server.
- `npm run build` creates the production build.
- `npm run preview` serves the production build locally.

## Coding Style & Naming Conventions
Follow the current Astro, CSS, and Tailwind conventions:

- Use 2-tab indentation in `.astro` files and CSS.
- Lowercase route filenames (`about.astro`, `enquiry-list.astro`); `PascalCase` for reusable components (`BearingVisual.astro`, `Nav.astro`).
- Tailwind CSS is part of the project toolchain and must not be removed. Existing plain CSS in `src/styles/global.css` may stay as-is; use Tailwind utilities where they make new UI work faster and clearer.
- Prefer the custom utility classes already in `global.css` (`hairline`, `tech-grid`, `chrome-border`, `btn-shine`, `fade-up`, etc.) over redefining the same effect inline.
- Keep design tokens consistent: graphite ink for surfaces, chrome for text, gold (`text-gold` / `bg-gold`) for brand/identity accents, `amber-signal` for action CTAs. Keep one filled/primary CTA per section â€” demote the rest to the outline (`border hairline-strong`) style.

## Testing Guidelines
There is no test suite yet. Build checks are not required unless explicitly requested.

- Do not run or check `npm run build` by default.
- Verify layout and spacing in `npm run dev` only when explicitly requested, especially on narrow screens.

## Responsive Design Priority
Mobile responsive design is the number one priority in this repository.

- Start with mobile layouts first, then scale up to larger breakpoints.
- Check that spacing, typography, and navigation remain usable on small screens.
- Avoid fixed widths that break on phones. Prefer fluid layouts, flexible spacing, and responsive units.

## Tailwind CSS Context
This project will use Tailwind CSS throughout development.

- Keep `tailwindcss` and `@tailwindcss/vite` installed and configured in `astro.config.mjs`.
- Do not remove Tailwind imports or configuration unless explicitly requested by the project owner.
- For the current initial setup, the global CSS implementation is acceptable and does not need to be converted to Tailwind utilities.

## Commit & Pull Request Guidelines
Use short, imperative commit messages, such as `Add responsive hero`.

Pull requests should include:

- A clear summary of the change.
- Build or manual verification notes.
- Screenshots for UI changes, including mobile views when relevant.
